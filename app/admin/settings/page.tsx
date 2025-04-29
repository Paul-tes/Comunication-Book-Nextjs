"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Save, Trash2, Plus, CalendarIcon, RefreshCw, UploadCloud, Mail, Bell } from "lucide-react"
import { format } from "date-fns"

// Mock data for system settings
const academicYears = [
  { id: 1, name: "2023-2024" },
  { id: 2, name: "2024-2025" },
  { id: 3, name: "2025-2026" },
]

const grades = [
  { id: 1, name: "Grade 1", sections: ["A", "B", "C"] },
  { id: 2, name: "Grade 2", sections: ["A", "B"] },
  { id: 3, name: "Grade 3", sections: ["A", "B", "C"] },
  { id: 4, name: "Grade 4", sections: ["A", "B"] },
  { id: 5, name: "Grade 5", sections: ["A", "B", "C"] },
]

const notificationTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to School Management System",
    body: "Dear {{name}},\n\nWelcome to our school management system. Your account has been created successfully.\n\nUsername: {{email}}\nPassword: {{password}}\n\nPlease login and change your password.\n\nRegards,\nSchool Administration",
  },
  {
    id: 2,
    name: "Password Reset",
    subject: "Password Reset Request",
    body: "Dear {{name}},\n\nYou have requested to reset your password. Please click on the link below to reset your password:\n\n{{reset_link}}\n\nIf you did not request this, please ignore this email.\n\nRegards,\nSchool Administration",
  },
  {
    id: 3,
    name: "Attendance Alert",
    subject: "Attendance Alert for {{student_name}}",
    body: "Dear {{parent_name}},\n\nThis is to inform you that {{student_name}} was marked {{status}} today.\n\nPlease contact the school administration if you have any questions.\n\nRegards,\nSchool Administration",
  },
]

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState("academic")
  const [startDate, setStartDate] = useState<Date>(new Date("2023-09-01"))
  const [endDate, setEndDate] = useState<Date>(new Date("2024-06-15"))
  const [selectedTemplate, setSelectedTemplate] = useState(notificationTemplates[0])
  const [templateSubject, setTemplateSubject] = useState(notificationTemplates[0].subject)
  const [templateBody, setTemplateBody] = useState(notificationTemplates[0].body)

  const handleTemplateChange = (templateId: string) => {
    const template = notificationTemplates.find((t) => t.id.toString() === templateId)
    if (template) {
      setSelectedTemplate(template)
      setTemplateSubject(template.subject)
      setTemplateBody(template.body)
    }
  }

  const saveSettings = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Configure and customize the school management system.</p>
      </div>

      <Card>
        <Tabs defaultValue="academic" value={selectedTab} onValueChange={setSelectedTab}>
          <CardHeader>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="academic">Academic Year</TabsTrigger>
              <TabsTrigger value="structure">Grade Structure</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-6">
            <TabsContent value="academic" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-year">Current Academic Year</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="current-year">
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        {academicYears.map((year) => (
                          <SelectItem key={year.id} value={year.id.toString()}>
                            {year.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => date && setStartDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => date && setEndDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Semester Configuration</Label>

                    <div className="mt-2 space-y-2 rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">First Semester</p>
                          <p className="text-sm text-muted-foreground">
                            {format(startDate, "MMM d, yyyy")} - {format(new Date("2023-12-22"), "MMM d, yyyy")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Second Semester</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date("2024-01-08"), "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Holidays & Breaks</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="font-medium">Winter Break</p>
                          <p className="text-sm text-muted-foreground">Dec 23, 2023 - Jan 7, 2024</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div>
                          <p className="font-medium">Spring Break</p>
                          <p className="text-sm text-muted-foreground">Mar 25, 2024 - Apr 5, 2024</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Holiday/Break
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-lg">Grade Levels & Sections</Label>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Grade
                  </Button>
                </div>

                <div className="space-y-4">
                  {grades.map((grade) => (
                    <div key={grade.id} className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{grade.name}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Delete
                          </Button>
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">Sections</p>
                        <div className="flex flex-wrap gap-2">
                          {grade.sections.map((section) => (
                            <div key={section} className="rounded-md border px-3 py-1">
                              {grade.name} - {section}
                            </div>
                          ))}
                          <Button variant="outline" size="sm">
                            <Plus className="mr-1 h-3 w-3" />
                            Add Section
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-select">Notification Template</Label>
                    <Select defaultValue={selectedTemplate.id.toString()} onValueChange={handleTemplateChange}>
                      <SelectTrigger id="template-select">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-subject">Email Subject</Label>
                    <Input
                      id="template-subject"
                      value={templateSubject}
                      onChange={(e) => setTemplateSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template-body">Email Body</Label>
                    <Textarea
                      id="template-body"
                      rows={10}
                      value={templateBody}
                      onChange={(e) => setTemplateBody(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Use {"{{"} variable {"}}"} syntax for dynamic content.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Template
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg">Notification Settings</Label>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-4 font-medium">Email Notifications</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="email-new-user">New User Registration</Label>
                        </div>
                        <Switch id="email-new-user" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="email-attendance">Daily Attendance Report</Label>
                        </div>
                        <Switch id="email-attendance" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="email-grades">Grade Updates</Label>
                        </div>
                        <Switch id="email-grades" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-4 font-medium">System Notifications</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="system-new-message">New Messages</Label>
                        </div>
                        <Switch id="system-new-message" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="system-user-activity">User Activity</Label>
                        </div>
                        <Switch id="system-user-activity" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="system-maintenance">System Maintenance</Label>
                        </div>
                        <Switch id="system-maintenance" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="mb-4 font-medium">Email Configuration</h3>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="email-sender">Sender Email</Label>
                        <Input id="email-sender" defaultValue="admin@school.edu" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-reply-to">Reply-to Email</Label>
                        <Input id="email-reply-to" defaultValue="no-reply@school.edu" />
                      </div>

                      <Button variant="outline" className="w-full">
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload SMTP Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
          <CardFooter className="border-t p-6">
            <div className="flex w-full justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save All Settings
              </Button>
            </div>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  )
}
