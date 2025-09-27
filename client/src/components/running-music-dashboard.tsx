"use client"

import { Clock } from "lucide-react"
import { MinutesRunningCard } from "./stats/minutes-running-card"
import { TopGenreCard } from "./stats/top-genre-card"
import { TotalSongsCard } from "./stats/total-songs-card"
import { AvgBpmCard } from "./stats/total-km-card"

export function RunningMusicDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Running Music Analytics</h1>
          <p className="text-muted-foreground mt-1">Your soundtrack to every mile</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last 4 weeks
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MinutesRunningCard />
        <TopGenreCard />
        <TotalSongsCard />
        <AvgBpmCard />
      </div>
    </div>
  )
}
