import { StatCard } from "@/components/ui/stat-card"
import { Headphones } from "lucide-react"

export function TotalSongsCard() {
  return <StatCard title="Total Songs" value="1,247" subtitle="Unique tracks" icon={Headphones} iconColor="chart-3" />
}
