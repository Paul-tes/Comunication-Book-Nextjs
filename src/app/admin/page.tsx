import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  UserRound,
  GraduationCap,
  CalendarCheck,
  MessageSquare,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

// Mock data for statistics
const stats = {
  users: {
    total: 482,
    parents: 215,
    teachers: 32,
    students: 235,
    growth: 5.2,
  },
  attendance: {
    average: 92,
    present: 218,
    absent: 12,
    late: 5,
  },
  messages: {
    total: 583,
    thisWeek: 124,
    lastWeek: 98,
    growth: 26.5,
  },
  alerts: [
    {
      id: 1,
      title: "System Backup",
      description: "Daily backup completed successfully",
      type: "success",
    },
    {
      id: 2,
      title: "New User Registrations",
      description: "5 new parent accounts await approval",
      type: "warning",
    },
    {
      id: 3,
      title: "Storage Capacity",
      description: "Server storage is at 82% capacity",
      type: "warning",
    },
  ],
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor school system performance and user statistics.</p>
      </div>

      {/* Key Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={`flex items-center ${stats.users.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                {stats.users.growth > 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(stats.users.growth)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendance.average}%</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-green-500" style={{ width: `${stats.attendance.average}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages.thisWeek}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className={`flex items-center ${stats.messages.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                {stats.messages.growth > 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(stats.messages.growth)}%
              </span>
              <span className="ml-1">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.alerts.length}</div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                {stats.alerts.filter((a) => a.type === "warning").length} Warnings
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {stats.alerts.filter((a) => a.type === "success").length} OK
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User breakdown and attendance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Breakdown</CardTitle>
            <CardDescription>Distribution of users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-blue-500" />
                  <span>Parents</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stats.users.parents}</span>
                  <Badge variant="outline">{Math.round((stats.users.parents / stats.users.total) * 100)}%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-green-500" />
                  <span>Teachers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stats.users.teachers}</span>
                  <Badge variant="outline">{Math.round((stats.users.teachers / stats.users.total) * 100)}%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span>Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{stats.users.students}</span>
                  <Badge variant="outline">{Math.round((stats.users.students / stats.users.total) * 100)}%</Badge>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full">View User Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Overview of attendance for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-green-100 p-4">
                <p className="text-2xl font-bold text-green-800">{stats.attendance.present}</p>
                <p className="text-sm text-green-800">Present</p>
              </div>
              <div className="rounded-lg bg-red-100 p-4">
                <p className="text-2xl font-bold text-red-800">{stats.attendance.absent}</p>
                <p className="text-sm text-red-800">Absent</p>
              </div>
              <div className="rounded-lg bg-amber-100 p-4">
                <p className="text-2xl font-bold text-amber-800">{stats.attendance.late}</p>
                <p className="text-sm text-amber-800">Late</p>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full">View Full Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
          <CardDescription>Recent system events and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.alerts.map((alert) => (
              <Alert key={alert.id} variant={alert.type === "warning" ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
