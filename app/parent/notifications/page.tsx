"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, Calendar, FileText, MessageSquare } from "lucide-react"

// Mock notification data
const notifications = [
  {
    id: 1,
    title: "Homework Assigned",
    description: "New Math homework due on Friday",
    time: "2 hours ago",
    type: "homework",
    read: false,
  },
  {
    id: 2,
    title: "Attendance Alert",
    description: "Emma was marked late today",
    time: "Yesterday",
    type: "attendance",
    read: false,
  },
  {
    id: 3,
    title: "Grade Posted",
    description: "Science test grade has been posted",
    time: "2 days ago",
    type: "grade",
    read: true,
  },
  {
    id: 4,
    title: "School Announcement",
    description: "Parent-teacher conferences next week",
    time: "3 days ago",
    type: "announcement",
    read: true,
  },
  {
    id: 5,
    title: "Message from Teacher",
    description: "Ms. Smith sent you a message",
    time: "1 week ago",
    type: "message",
    read: true,
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationState, setNotificationState] = useState(notifications)

  // Filter notifications based on active tab
  const filteredNotifications = notificationState.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    if (activeTab === "important") return notification.type === "attendance" || notification.type === "grade"
    return true
  })

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationState((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case "homework":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "attendance":
        return <Calendar className="h-5 w-5 text-orange-500" />
      case "grade":
        return <BookOpen className="h-5 w-5 text-green-500" />
      case "announcement":
        return <Bell className="h-5 w-5 text-purple-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-pink-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">Stay updated with your child's school activities and performance.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">No notifications to display</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      <p className="text-sm">{notification.description}</p>
                    </div>
                    {!notification.read && (
                      <Badge variant="secondary" className="ml-2">
                        New
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
