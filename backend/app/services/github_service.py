"""
GitHub profile analysis service.

Fetches and analyzes a user's GitHub profile including repositories,
languages, contribution patterns, and README quality using the GitHub API.
"""

import httpx

from app.config import settings
from app.models.project import GitHubAnalysisResponse, RepositoryAnalysis


class GitHubService:
    """Service for analyzing GitHub profiles using the GitHub REST API."""

    BASE_URL = "https://api.github.com"

    def __init__(self) -> None:
        headers: dict[str, str] = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "CareerPilot-AI",
        }
        if settings.has_github_token:
            headers["Authorization"] = f"Bearer {settings.github_token}"

        self._client = httpx.AsyncClient(
            base_url=self.BASE_URL,
            headers=headers,
            timeout=httpx.Timeout(30.0),
        )

    async def analyze_profile(self, username: str) -> GitHubAnalysisResponse:
        """
        Fetch and analyze a GitHub user's profile and repositories.

        Args:
            username: GitHub username to analyze.

        Returns:
            GitHubAnalysisResponse with profile stats, repo analysis, and suggestions.
        """
        # Fetch user profile
        user_resp = await self._client.get(f"/users/{username}")
        user_resp.raise_for_status()
        user = user_resp.json()

        # Fetch repositories (sorted by stars)
        repos_resp = await self._client.get(
            f"/users/{username}/repos",
            params={"sort": "stars", "direction": "desc", "per_page": 30, "type": "owner"},
        )
        repos_resp.raise_for_status()
        repos = repos_resp.json()

        # Analyze repositories
        repo_analyses: list[RepositoryAnalysis] = []
        language_counts: dict[str, int] = {}
        total_stars = 0

        for repo in repos:
            if repo.get("fork"):
                continue

            lang = repo.get("language") or "Unknown"
            stars = repo.get("stargazers_count", 0)
            total_stars += stars

            language_counts[lang] = language_counts.get(lang, 0) + 1

            # Check for README
            has_readme = False
            readme_quality = "missing"
            try:
                readme_resp = await self._client.get(
                    f"/repos/{username}/{repo['name']}/readme"
                )
                if readme_resp.status_code == 200:
                    has_readme = True
                    readme_data = readme_resp.json()
                    size = readme_data.get("size", 0)
                    if size > 2000:
                        readme_quality = "excellent"
                    elif size > 500:
                        readme_quality = "good"
                    elif size > 100:
                        readme_quality = "basic"
                    else:
                        readme_quality = "minimal"
            except httpx.HTTPError:
                pass

            # Calculate quality score
            quality_score = self._calculate_repo_quality(repo, has_readme, readme_quality)

            repo_analyses.append(
                RepositoryAnalysis(
                    name=repo["name"],
                    description=repo.get("description") or "",
                    language=lang,
                    stars=stars,
                    forks=repo.get("forks_count", 0),
                    has_readme=has_readme,
                    readme_quality=readme_quality,
                    topics=repo.get("topics", []),
                    last_updated=repo.get("updated_at", ""),
                    quality_score=quality_score,
                )
            )

        # Calculate overall scores
        profile_score = self._calculate_profile_score(user, repo_analyses, total_stars)
        contribution_score = min(100, (user.get("public_repos", 0) * 3) + (total_stars * 2))

        # Generate feedback
        strengths = self._identify_strengths(user, repo_analyses, total_stars)
        improvements = self._identify_improvements(user, repo_analyses)
        portfolio_suggestions = self._generate_suggestions(language_counts, repo_analyses)

        return GitHubAnalysisResponse(
            username=username,
            name=user.get("name") or username,
            bio=user.get("bio") or "",
            avatar_url=user.get("avatar_url") or "",
            public_repos=user.get("public_repos", 0),
            followers=user.get("followers", 0),
            following=user.get("following", 0),
            total_stars=total_stars,
            top_languages=dict(sorted(language_counts.items(), key=lambda x: x[1], reverse=True)[:10]),
            contribution_score=min(contribution_score, 100),
            profile_score=profile_score,
            repositories=repo_analyses[:10],  # Top 10
            strengths=strengths,
            improvements=improvements,
            portfolio_suggestions=portfolio_suggestions,
            summary=f"GitHub profile analysis for {username}: {len(repo_analyses)} original repos, "
            f"{total_stars} total stars, {len(language_counts)} languages used.",
        )

    def _calculate_repo_quality(
        self, repo: dict, has_readme: bool, readme_quality: str
    ) -> int:
        """Calculate a quality score for a single repository (0-100)."""
        score = 0
        if repo.get("description"):
            score += 15
        if has_readme:
            score += {"excellent": 25, "good": 20, "basic": 10, "minimal": 5}.get(
                readme_quality, 0
            )
        if repo.get("topics"):
            score += min(len(repo["topics"]) * 3, 15)
        if repo.get("homepage"):
            score += 10
        if repo.get("license"):
            score += 10
        score += min(repo.get("stargazers_count", 0) * 5, 25)
        return min(score, 100)

    def _calculate_profile_score(
        self, user: dict, repos: list[RepositoryAnalysis], total_stars: int
    ) -> int:
        """Calculate an overall profile score (0-100)."""
        score = 0
        if user.get("bio"):
            score += 10
        if user.get("blog"):
            score += 5
        if user.get("company"):
            score += 5
        if user.get("location"):
            score += 5
        score += min(len(repos) * 3, 25)
        score += min(total_stars * 2, 20)
        score += min(user.get("followers", 0), 15)
        avg_quality = (
            sum(r.quality_score for r in repos) / len(repos) if repos else 0
        )
        score += int(avg_quality * 0.15)
        return min(score, 100)

    def _identify_strengths(
        self, user: dict, repos: list[RepositoryAnalysis], total_stars: int
    ) -> list[str]:
        """Identify profile strengths."""
        strengths = []
        if len(repos) >= 10:
            strengths.append(f"Active developer with {len(repos)} original repositories")
        if total_stars >= 10:
            strengths.append(f"Community recognition with {total_stars} total stars")
        readme_good = sum(1 for r in repos if r.readme_quality in ("good", "excellent"))
        if readme_good >= 3:
            strengths.append(f"Well-documented projects ({readme_good} repos with quality READMEs)")
        if user.get("bio") and user.get("blog"):
            strengths.append("Complete profile with bio and website")
        return strengths or ["Getting started — keep building and sharing!"]

    def _identify_improvements(
        self, user: dict, repos: list[RepositoryAnalysis]
    ) -> list[str]:
        """Identify areas for improvement."""
        improvements = []
        if not user.get("bio"):
            improvements.append("Add a bio to your GitHub profile")
        no_readme = sum(1 for r in repos if not r.has_readme)
        if no_readme > 0:
            improvements.append(f"Add READMEs to {no_readme} repositories")
        no_desc = sum(1 for r in repos if not r.description)
        if no_desc > 0:
            improvements.append(f"Add descriptions to {no_desc} repositories")
        no_topics = sum(1 for r in repos if not r.topics)
        if no_topics > 0:
            improvements.append(f"Add topics/tags to {no_topics} repositories")
        return improvements

    def _generate_suggestions(
        self, languages: dict[str, int], repos: list[RepositoryAnalysis]
    ) -> list[str]:
        """Generate portfolio improvement suggestions."""
        suggestions = []
        top_lang = max(languages, key=languages.get) if languages else None
        if top_lang:
            suggestions.append(
                f"Build a standout project in {top_lang} to showcase your primary skill"
            )
        if not any(r.quality_score >= 70 for r in repos):
            suggestions.append(
                "Create at least one 'flagship' project with excellent README, demo, and documentation"
            )
        suggestions.append("Pin your 6 best repositories on your GitHub profile")
        suggestions.append("Add a profile README (username/username repository)")
        return suggestions

    async def close(self) -> None:
        """Close the HTTP client."""
        await self._client.aclose()
