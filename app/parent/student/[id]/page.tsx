"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"

// Mock data
const studentData = {
  id: 1,
  name: "Emma Johnson",
  grade: "Grade 5",
  avatar: "/placeholder.svg?height=80&width=80",
  subjects: [
    { name: "Mathematics", grade: "A", percentage: 92 },
    { name: "Science", grade: "A-", percentage: 88 },
    { name: "English", grade: "B+", percentage: 85 },
    { name: "History", grade: "A", percentage: 90 },
    { name: "Art", grade: "A+", percentage: 95 },
  ],
  attendance: {
    present: 42,
    absent: 3,
    late: 5,
    percentage: 85,
  },
  messages: [
    {
      id: 1,
      sender: "Ms. Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Emma did very well on her math test today!",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for letting me know. We've been practicing at home.",
      timestamp: "1 day ago",
    },
  ],
  homework: [
    {
      id: 1,
      subject: "Mathematics",
      title: "Fractions Worksheet",
      dueDate: "Tomorrow",
    },
    {
      id: 2,
      subject: "English",
      title: "Book Report",
      dueDate: "Next Monday",
    },
  ],
  announcements: [
    {
      id: 1,
      title: "Field Trip Permission",
      content: "Please sign the permission slip for next week's science museum trip.",
    },
  ],
}

// Chart data
const chartData = [
  { name: "Term 1", Math: 78, Science: 82, English: 75, History: 80 },
  { name: "Term 2", Math: 85, Science: 88, English: 80, History: 85 },
  { name: "Term 3", Math: 92, Science: 88, English: 85, History: 90 },
]

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this to an API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={studentData.name} />
          <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{studentData.name}</h2>
          <p className="text-muted-foreground">{studentData.grade}</p>
        </div>
      </div>

      <Tabs defaultValue="subjects">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="daily-check">Daily Check-Up</TabsTrigger>
        </TabsList>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Overview of {studentData.name}'s academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.subjects.map((subject) => (
                    <TableRow key={subject.name}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>{subject.grade}</TableCell>
                      <TableCell className="text-right">{subject.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>Term-by-term performance across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Math" fill="#8884d8" />
                    <Bar dataKey="Science" fill="#82ca9d" />
                    <Bar dataKey="English" fill="#ffc658" />
                    <Bar dataKey="History" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>{studentData.name}'s attendance for the current term</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg bg-green-100 p-4">
                  <p className="text-2xl font-bold text-green-800">{studentData.attendance.present}</p>
                  <p className="text-sm text-green-800">Present</p>
                </div>
                <div className="rounded-lg bg-red-100 p-4">
                  <p className="text-2xl font-bold text-red-800">{studentData.attendance.absent}</p>
                  <p className="text-sm text-red-800">Absent</p>
                </div>
                <div className="rounded-lg bg-amber-100 p-4">
                  <p className="text-2xl font-bold text-amber-800">{studentData.attendance.late}</p>
                  <p className="text-sm text-amber-800">Late</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Badge className="text-lg" variant="outline">
                  Total Attendance: {studentData.attendance.percentage}% this term
                </Badge>
              </div>

              <div className="rounded-lg border p-4">
                <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Teacher</CardTitle>
              <CardDescription>Communicate with {studentData.name}'s teachers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-[300px] overflow-y-auto space-y-4 border rounded-md p-4">
                {studentData.messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === "You" ? "justify-end" : ""}`}>
                    {message.sender !== "You" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div className="flex justify-between gap-2">
                        <p className="text-xs font-medium">{message.sender}</p>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage()
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Check-Up Tab */}
        <TabsContent value="daily-check" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Homework</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {studentData.homework.map((item) => (
                  <li key={item.id} className="rounded-md border p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.subject}</p>
                      </div>
                      <Badge variant="outline">{item.dueDate}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentData.announcements.map((announcement) => (
                <div key={announcement.id} className="rounded-md border p-3">
                  <p className="font-medium">{announcement.title}</p>
                  <p className="text-sm">{announcement.content}</p>
                </div>
              ))}

              <Button className="w-full">Mark As Reviewed</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
