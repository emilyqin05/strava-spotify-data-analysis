import { StatCard } from "@/components/ui/stat-card"
import { Activity } from "lucide-react"

export function AvgBpmCard() {
  return <StatCard title="Avg BPM" value="128" subtitle="Perfect pace" icon={Activity} iconColor="chart-4" />
}
