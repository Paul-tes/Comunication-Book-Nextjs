"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

// Mock data for students
const students = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "Grade 5",
    attendance: 95,
    performance: "Excellent",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Noah Smith",
    grade: "Grade 5",
    attendance: 88,
    performance: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Olivia Davis",
    grade: "Grade 5",
    attendance: 92,
    performance: "Excellent",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Liam Wilson",
    grade: "Grade 5",
    attendance: 78,
    performance: "Needs Improvement",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Ava Brown",
    grade: "Grade 5",
    attendance: 90,
    performance: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "William Taylor",
    grade: "Grade 5",
    attendance: 85,
    performance: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    grade: "Grade 5",
    attendance: 98,
    performance: "Excellent",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "James Anderson",
    grade: "Grade 5",
    attendance: 82,
    performance: "Good",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.performance.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get badge color based on performance
  const getPerformanceBadge = (performance: string) => {
    switch (performance.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "needs improvement":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get badge color based on attendance
  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 90) return "bg-green-100 text-green-800"
    if (attendance >= 80) return "bg-blue-100 text-blue-800"
    return "bg-amber-100 text-amber-800"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Students</h2>
        <p className="text-muted-foreground">Manage and view information about your students.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Student List</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getAttendanceBadge(student.attendance)}>
                      {student.attendance}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPerformanceBadge(student.performance)}>
                      {student.performance}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/teacher/student/${student.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/teacher/messages?student=${student.id}`}>
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Class Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Students:</span>
                <span className="font-medium">{students.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Attendance:</span>
                <span className="font-medium">
                  {Math.round(students.reduce((acc, student) => acc + student.attendance, 0) / students.length)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Performance Breakdown:</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Excellent</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {students.filter((s) => s.performance === "Excellent").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Good</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {students.filter((s) => s.performance === "Good").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Needs Improvement</span>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    {students.filter((s) => s.performance === "Needs Improvement").length}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
