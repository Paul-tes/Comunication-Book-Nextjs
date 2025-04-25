import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for children
const children = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "Grade 5",
    performance: "Excellent",
    performanceColor: "bg-green-100 text-green-800",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Noah Johnson",
    grade: "Grade 3",
    performance: "Needs Attention",
    performanceColor: "bg-amber-100 text-amber-800",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function MyKidsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Kids Overview</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((child) => (
          <Card key={child.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{child.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{child.grade}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Performance:</span>
                  <Badge variant="outline" className={child.performanceColor}>
                    {child.performance}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attendance:</span>
                  <span className="text-sm">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Homework:</span>
                  <span className="text-sm">2 pending</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/parent/student/${child.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
