"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Download, Save } from "lucide-react"
import { format } from "date-fns"

// Mock data for students
const students = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "Grade 5",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Noah Smith",
    grade: "Grade 5",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Olivia Davis",
    grade: "Grade 5",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Liam Wilson",
    grade: "Grade 5",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Ava Brown",
    grade: "Grade 5",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for classes
const classes = [
  { id: 1, name: "Grade 5A - Mathematics" },
  { id: 2, name: "Grade 3B - Science" },
  { id: 3, name: "Grade 4C - English" },
]

type AttendanceStatus = "present" | "absent" | "late"

export default function AttendancePage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState<string>("1")
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>(
    students.reduce(
      (acc, student) => {
        acc[student.id] = "present"
        return acc
      },
      {} as Record<number, AttendanceStatus>,
    ),
  )

  const handleAttendanceChange = (studentId: number, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const handleSaveAttendance = () => {
    // In a real app, you would save this to a database
    console.log("Saving attendance for", format(date, "PPP"), ":", attendance)
    alert("Attendance saved successfully!")
  }

  const handleExportAttendance = () => {
    // In a real app, you would generate a CSV or PDF
    console.log("Exporting attendance for", format(date, "PPP"))
    alert("Attendance exported successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Attendance Taker</h2>
        <p className="text-muted-foreground">Record daily attendance for your classes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Date & Class</CardTitle>
            <CardDescription>Choose the date and class for attendance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="class-select">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class-select">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id.toString()}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <div className="rounded-md border">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="mx-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Attendance for {format(date, "PPP")}</CardTitle>
            <CardDescription>
              {classes.find((c) => c.id.toString() === selectedClass)?.name || "Select a class"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {students.map((student) => (
                <div key={student.id} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-[150px]">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.grade}</p>
                  </div>
                  <RadioGroup
                    className="flex flex-1 gap-4"
                    value={attendance[student.id]}
                    onValueChange={(value) => handleAttendanceChange(student.id, value as AttendanceStatus)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="present" id={`present-${student.id}`} />
                      <Label htmlFor={`present-${student.id}`} className="text-green-600">
                        Present
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                      <Label htmlFor={`absent-${student.id}`} className="text-red-600">
                        Absent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="late" id={`late-${student.id}`} />
                      <Label htmlFor={`late-${student.id}`} className="text-amber-600">
                        Late
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleExportAttendance}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleSaveAttendance}>
              <Save className="mr-2 h-4 w-4" />
              Save Attendance
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
