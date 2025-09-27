import { StatCard } from "@/components/ui/stat-card"
import { Music } from "lucide-react"

export function TopGenreCard() {
  return <StatCard title="Top Genre Time" value="35%" subtitle="Pop music" icon={Music} iconColor="chart-2" />
}
