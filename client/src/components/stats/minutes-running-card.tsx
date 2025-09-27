import { StatCard } from "@/components/ui/stat-card"
import { TrendingUp } from "lucide-react"

export function MinutesRunningCard() {
  return <StatCard title="Minutes Running" value="2,847" subtitle="This year" icon={TrendingUp} iconColor="primary" />
}
