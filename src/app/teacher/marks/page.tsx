"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Save, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for students
const students = [
  { id: 1, name: "Emma Johnson" },
  { id: 2, name: "Noah Smith" },
  { id: 3, name: "Olivia Davis" },
  { id: 4, name: "Liam Wilson" },
  { id: 5, name: "Ava Brown" },
]

// Mock data for subjects
const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Science" },
  { id: 3, name: "English" },
  { id: 4, name: "History" },
]

// Mock data for assessment types
const assessmentTypes = [
  { id: 1, name: "Quiz 1", maxMarks: 20 },
  { id: 2, name: "Quiz 2", maxMarks: 20 },
  { id: 3, name: "Mid-Term Exam", maxMarks: 50 },
  { id: 4, name: "Final Exam", maxMarks: 100 },
  { id: 5, name: "Assignment 1", maxMarks: 10 },
  { id: 6, name: "Assignment 2", maxMarks: 10 },
]

type Mark = {
  studentId: number
  assessmentId: number
  marks: string
}

export default function MarksPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("1")
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>(["1", "3", "4"])
  const [marks, setMarks] = useState<Mark[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // Initialize marks if not already set
  if (marks.length === 0) {
    const initialMarks: Mark[] = []
    students.forEach((student) => {
      selectedAssessments.forEach((assessmentId) => {
        initialMarks.push({
          studentId: student.id,
          assessmentId: Number.parseInt(assessmentId),
          marks: "",
        })
      })
    })
    setMarks(initialMarks)
  }

  const handleMarkChange = (studentId: number, assessmentId: number, value: string) => {
    // Validate input to ensure it's a number and within range
    const assessment = assessmentTypes.find((a) => a.id === assessmentId)
    const maxMarks = assessment?.maxMarks || 100

    // Allow empty string or valid number
    if (value === "" || (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= maxMarks)) {
      setMarks((prevMarks) => {
        const newMarks = [...prevMarks]
        const markIndex = newMarks.findIndex(
          (mark) => mark.studentId === studentId && mark.assessmentId === assessmentId,
        )

        if (markIndex !== -1) {
          newMarks[markIndex].marks = value
        } else {
          newMarks.push({
            studentId,
            assessmentId,
            marks: value,
          })
        }

        return newMarks
      })
    }
  }

  const getMark = (studentId: number, assessmentId: number): string => {
    const mark = marks.find((mark) => mark.studentId === studentId && mark.assessmentId === assessmentId)
    return mark?.marks || ""
  }

  const handleSaveMarks = () => {
    setIsSaving(true)

    // In a real app, you would save this to a database
    console.log("Saving marks:", marks)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert("Marks saved successfully!")
    }, 1000)
  }

  const handleExportMarks = () => {
    // In a real app, you would generate a CSV or PDF
    console.log("Exporting marks")
    alert("Marks exported successfully!")
  }

  const handleAssessmentChange = (assessmentId: string) => {
    setSelectedAssessments((prev) => {
      if (prev.includes(assessmentId)) {
        return prev.filter((id) => id !== assessmentId)
      } else {
        return [...prev, assessmentId]
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mark List</h2>
        <p className="text-muted-foreground">Record and manage student marks for various assessments.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Subject</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject-select">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger id="subject-select">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id.toString()}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Assessments</Label>
              <div className="space-y-2">
                {assessmentTypes.map((assessment) => (
                  <div key={assessment.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`assessment-${assessment.id}`}
                      checked={selectedAssessments.includes(assessment.id.toString())}
                      onChange={() => handleAssessmentChange(assessment.id.toString())}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={`assessment-${assessment.id}`} className="text-sm">
                      {assessment.name} (Max: {assessment.maxMarks})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{subjects.find((s) => s.id.toString() === selectedSubject)?.name || "Subject"} Marks</CardTitle>
            <CardDescription>Enter marks for each student and assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  {selectedAssessments.map((assessmentId) => {
                    const assessment = assessmentTypes.find((a) => a.id.toString() === assessmentId)
                    return (
                      <TableHead key={assessmentId}>
                        {assessment?.name} (/{assessment?.maxMarks})
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    {selectedAssessments.map((assessmentId) => {
                      const assessment = assessmentTypes.find((a) => a.id.toString() === assessmentId)
                      return (
                        <TableCell key={assessmentId}>
                          <Input
                            type="text"
                            value={getMark(student.id, Number.parseInt(assessmentId))}
                            onChange={(e) =>
                              handleMarkChange(student.id, Number.parseInt(assessmentId), e.target.value)
                            }
                            placeholder={`/${assessment?.maxMarks}`}
                            className="w-20"
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleExportMarks}>
              <Download className="mr-2 h-4 w-4" />
              Export Marks
            </Button>
            <Button onClick={handleSaveMarks} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save All Marks"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
