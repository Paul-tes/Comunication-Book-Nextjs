"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, FileUp, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"

// Mock data for classes
const classes = [
  { id: 1, name: "Grade 5A - Mathematics" },
  { id: 2, name: "Grade 3B - Science" },
  { id: 3, name: "Grade 4C - English" },
]

// Mock data for homework assignments
const initialHomework = [
  {
    id: 1,
    title: "Fractions Worksheet",
    description: "Complete the fractions worksheet from pages 45-46 in the textbook.",
    classId: 1,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    attachments: ["worksheet.pdf"],
    status: "active",
  },
  {
    id: 2,
    title: "Science Project",
    description: "Prepare a model of the solar system using recycled materials.",
    classId: 2,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    attachments: ["project_guidelines.pdf"],
    status: "active",
  },
  {
    id: 3,
    title: "Book Report",
    description: "Write a 2-page report on the book we read in class.",
    classId: 3,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    attachments: ["report_template.docx"],
    status: "active",
  },
  {
    id: 4,
    title: "Multiplication Tables",
    description: "Practice multiplication tables from 1 to 12.",
    classId: 1,
    dueDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    attachments: [],
    status: "past",
  },
]

type Homework = {
  id: number
  title: string
  description: string
  classId: number
  dueDate: Date
  attachments: string[]
  status: "active" | "past"
}

export default function HomeworkPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [homework, setHomework] = useState<Homework[]>(initialHomework)
  const [newHomework, setNewHomework] = useState<Omit<Homework, "id" | "status">>({
    title: "",
    description: "",
    classId: 1,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    attachments: [],
  })
  const [attachmentName, setAttachmentName] = useState("")

  const handleCreateHomework = () => {
    if (!newHomework.title) {
      alert("Please enter a title for the homework")
      return
    }

    const newId = Math.max(0, ...homework.map((h) => h.id)) + 1
    setHomework([
      ...homework,
      {
        ...newHomework,
        id: newId,
        status: "active",
      },
    ])

    // Reset form
    setNewHomework({
      title: "",
      description: "",
      classId: 1,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      attachments: [],
    })
    setAttachmentName("")
  }

  const handleAddAttachment = () => {
    if (!attachmentName) return

    setNewHomework({
      ...newHomework,
      attachments: [...newHomework.attachments, attachmentName],
    })
    setAttachmentName("")
  }

  const handleRemoveAttachment = (index: number) => {
    setNewHomework({
      ...newHomework,
      attachments: newHomework.attachments.filter((_, i) => i !== index),
    })
  }

  const filteredHomework = homework.filter((h) => h.status === activeTab)

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Homework & Engagement</h2>
        <p className="text-muted-foreground">Create and manage homework assignments for your classes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Create New Assignment</CardTitle>
            <CardDescription>Add a new homework assignment for your class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter assignment title"
                value={newHomework.title}
                onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select
                value={newHomework.classId.toString()}
                onValueChange={(value) => setNewHomework({ ...newHomework, classId: Number.parseInt(value) })}
              >
                <SelectTrigger id="class">
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

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter assignment details"
                rows={4}
                value={newHomework.description}
                onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newHomework.dueDate ? format(newHomework.dueDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newHomework.dueDate}
                    onSelect={(date) => date && setNewHomework({ ...newHomework, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Attachment name"
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                />
                <Button variant="outline" size="icon" onClick={handleAddAttachment}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {newHomework.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {newHomework.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <span className="text-sm">{attachment}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveAttachment(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleCreateHomework}>
              <FileUp className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredHomework.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <p className="text-muted-foreground">No {activeTab} assignments</p>
                </div>
              ) : (
                filteredHomework.map((assignment) => (
                  <div key={assignment.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {classes.find((c) => c.id === assignment.classId)?.name}
                        </p>
                      </div>
                      <Badge variant="outline">Due: {format(assignment.dueDate, "MMM d, yyyy")}</Badge>
                    </div>
                    <p className="mt-2 text-sm">{assignment.description}</p>
                    {assignment.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-muted-foreground">Attachments:</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {assignment.attachments.map((attachment, index) => (
                            <Badge key={index} variant="secondary">
                              {attachment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
