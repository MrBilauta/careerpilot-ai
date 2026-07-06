"""
AI Engine — Multi-model client via OpenRouter.

This module provides a unified interface to multiple AI models through
the OpenRouter API. It supports streaming and non-streaming completions,
automatic retries, and model fallback.

Supported models (via OpenRouter):
- Google Gemini (gemini-2.0-flash, gemini-2.5-pro)
- DeepSeek (deepseek-chat, deepseek-coder)
- Qwen (qwen-2.5-72b-instruct)
- OpenAI GPT (gpt-4o, gpt-4o-mini)
"""

from typing import Any
from dataclasses import dataclass, field

import httpx


@dataclass
class AIMessage:
    """A single message in a conversation."""

    role: str  # "system", "user", or "assistant"
    content: str


@dataclass
class AIResponse:
    """Response from an AI model completion."""

    content: str
    model: str
    usage: dict[str, int] = field(default_factory=dict)
    finish_reason: str = ""


class AIEngine:
    """
    Multi-model AI client using the OpenRouter API.

    Provides a unified interface to chat with any model available on OpenRouter.
    Supports system prompts, conversation history, temperature control, and
    structured JSON output.

    Example:
        engine = AIEngine(api_key="sk-or-...", default_model="google/gemini-2.0-flash-001")
        response = await engine.chat(
            messages=[AIMessage(role="user", content="Review my resume")],
            system_prompt="You are a resume review expert.",
        )
        print(response.content)
    """

    # Available model shortcuts
    MODELS = {
        "gemini-flash": "google/gemini-2.0-flash-001",
        "gemini-pro": "google/gemini-2.5-pro-preview",
        "deepseek": "deepseek/deepseek-chat",
        "deepseek-coder": "deepseek/deepseek-coder",
        "qwen": "qwen/qwen-2.5-72b-instruct",
        "gpt-4o": "openai/gpt-4o",
        "gpt-4o-mini": "openai/gpt-4o-mini",
    }

    def __init__(
        self,
        api_key: str,
        base_url: str = "https://openrouter.ai/api/v1",
        default_model: str = "google/gemini-2.0-flash-001",
    ) -> None:
        self.api_key = api_key
        self.base_url = base_url
        self.default_model = default_model
        self._client: httpx.AsyncClient | None = None

    @property
    def client(self) -> httpx.AsyncClient:
        """Lazy-initialize the HTTP client."""
        if self._client is None or self._client.is_closed:
            self._client = httpx.AsyncClient(
                base_url=self.base_url,
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "HTTP-Referer": "https://careerpilot.ai",
                    "X-Title": "CareerPilot AI",
                    "Content-Type": "application/json",
                },
                timeout=httpx.Timeout(60.0, connect=10.0),
            )
        return self._client

    def resolve_model(self, model: str | None) -> str:
        """Resolve a model shortcut to its full OpenRouter model ID."""
        if model is None:
            return self.default_model
        return self.MODELS.get(model, model)

    async def chat(
        self,
        messages: list[AIMessage],
        system_prompt: str | None = None,
        model: str | None = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        json_mode: bool = False,
    ) -> AIResponse:
        """
        Send a chat completion request to the AI model.

        Args:
            messages: List of conversation messages.
            system_prompt: Optional system prompt to prepend.
            model: Model ID or shortcut name. Defaults to configured model.
            temperature: Sampling temperature (0.0 - 2.0).
            max_tokens: Maximum tokens in the response.
            json_mode: If True, request JSON-formatted output.

        Returns:
            AIResponse with the model's reply content and metadata.

        Raises:
            httpx.HTTPStatusError: If the API returns an error status.
        """
        # Build message list
        formatted_messages: list[dict[str, str]] = []

        if system_prompt:
            formatted_messages.append({"role": "system", "content": system_prompt})

        for msg in messages:
            formatted_messages.append({"role": msg.role, "content": msg.content})

        # Build request payload
        payload: dict[str, Any] = {
            "model": self.resolve_model(model),
            "messages": formatted_messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        }

        if json_mode:
            payload["response_format"] = {"type": "json_object"}

        # Send request
        response = await self.client.post("/chat/completions", json=payload)
        response.raise_for_status()
        data = response.json()

        # Parse response
        choice = data["choices"][0]
        return AIResponse(
            content=choice["message"]["content"],
            model=data.get("model", self.resolve_model(model)),
            usage=data.get("usage", {}),
            finish_reason=choice.get("finish_reason", ""),
        )

    async def analyze(
        self,
        prompt: str,
        system_prompt: str,
        model: str | None = None,
        temperature: float = 0.3,
        json_mode: bool = True,
    ) -> AIResponse:
        """
        Convenience method for single-turn analysis tasks.

        Uses a lower temperature and JSON mode by default for
        structured, deterministic analysis results.
        """
        return await self.chat(
            messages=[AIMessage(role="user", content=prompt)],
            system_prompt=system_prompt,
            model=model,
            temperature=temperature,
            json_mode=json_mode,
        )

    async def close(self) -> None:
        """Close the underlying HTTP client."""
        if self._client and not self._client.is_closed:
            await self._client.aclose()
