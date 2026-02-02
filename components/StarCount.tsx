"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

interface GitHubRepoResponse {
  stargazers_count: number
}

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return String(num)
}

export function StarCount({ owner = "ShellyDeng08", repo = "youtube-connector-mcp" }: { owner?: string; repo?: string }) {
  const [stars, setStars] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
          signal: abortController.signal,
        })

        if (!response.ok) {
          throw new Error("Failed to fetch repository data")
        }

        const data: GitHubRepoResponse = await response.json()
        if (!abortController.signal.aborted) {
          setStars(data.stargazers_count)
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching GitHub stars:", err)
          setError(true)
        }
      }
    }

    fetchStars()

    return () => {
      abortController.abort()
    }
  }, [owner, repo])

  if (error || stars === null) {
    return null
  }

  return (
    <span className="inline-flex items-center text-sm text-slate-400 ml-2 bg-slate-800/50 px-2 py-1 rounded-md">
      <Star className="h-3.5 w-3.5 mr-1 text-yellow-500 fill-yellow-500/20" />
      {formatNumber(stars)}
    </span>
  )
}
