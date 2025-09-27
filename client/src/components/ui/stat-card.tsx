import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = "primary" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className={`h-8 w-8 bg-${iconColor}/10 rounded-lg flex items-center justify-center`}>
            <Icon className={`h-4 w-4 text-${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
