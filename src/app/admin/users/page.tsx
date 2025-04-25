"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, MoreHorizontal, Edit2, Trash2, UserPlus, Download, Upload, UserCheck, UserX } from "lucide-react"

// Mock data for users
const teachers = [
  { id: 1, name: "Ms. Smith", email: "smith@school.edu", subject: "Mathematics", classes: 5, status: "active" },
  { id: 2, name: "Mr. Johnson", email: "johnson@school.edu", subject: "Science", classes: 4, status: "active" },
  { id: 3, name: "Mrs. Davis", email: "davis@school.edu", subject: "English", classes: 6, status: "active" },
  { id: 4, name: "Mr. Wilson", email: "wilson@school.edu", subject: "History", classes: 3, status: "inactive" },
  { id: 5, name: "Ms. Brown", email: "brown@school.edu", subject: "Art", classes: 4, status: "active" },
]

const parents = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", children: 2, status: "active" },
  { id: 2, name: "Sarah Smith", email: "sarah.smith@example.com", children: 1, status: "active" },
  { id: 3, name: "Michael Davis", email: "michael.davis@example.com", children: 2, status: "pending" },
  { id: 4, name: "Jessica Wilson", email: "jessica.wilson@example.com", children: 3, status: "active" },
  { id: 5, name: "Robert Brown", email: "robert.brown@example.com", children: 1, status: "inactive" },
]

const students = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.j@school.edu",
    grade: "Grade 5",
    parent: "John Johnson",
    status: "active",
  },
  { id: 2, name: "Noah Smith", email: "noah.s@school.edu", grade: "Grade 5", parent: "Sarah Smith", status: "active" },
  {
    id: 3,
    name: "Olivia Davis",
    email: "olivia.d@school.edu",
    grade: "Grade 5",
    parent: "Michael Davis",
    status: "active",
  },
  {
    id: 4,
    name: "Liam Wilson",
    email: "liam.w@school.edu",
    grade: "Grade 5",
    parent: "Jessica Wilson",
    status: "active",
  },
  { id: 5, name: "Ava Brown", email: "ava.b@school.edu", grade: "Grade 5", parent: "Robert Brown", status: "active" },
  {
    id: 6,
    name: "William Taylor",
    email: "william.t@school.edu",
    grade: "Grade 5",
    parent: "Thomas Taylor",
    status: "inactive",
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("teachers")

  // Filter users based on search query and selected tab
  const filteredUsers = () => {
    let users = []
    switch (selectedTab) {
      case "teachers":
        users = teachers
        break
      case "parents":
        users = parents
        break
      case "students":
        users = students
        break
      default:
        users = teachers
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Render a different table based on the selected tab
  const renderTable = () => {
    const users = filteredUsers()

    switch (selectedTab) {
      case "teachers":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((teacher: any) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={teacher.name} />
                        <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{teacher.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.classes}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(teacher.status)}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign Classes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "parents":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Children</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((parent: any) => (
                <TableRow key={parent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={parent.name} />
                        <AvatarFallback>{parent.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{parent.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>{parent.children}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(parent.status)}>
                      {parent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign Students
                        </DropdownMenuItem>
                        {parent.status === "pending" ? (
                          <>
                            <DropdownMenuItem>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserX className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      case "students":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={student.name} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.parent}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign Class
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">Manage and organize all users in the school system.</p>
      </div>

      <Card>
        <Tabs defaultValue="teachers" value={selectedTab} onValueChange={setSelectedTab}>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="teachers">
              <div className="space-y-4">{renderTable()}</div>
            </TabsContent>
            <TabsContent value="parents">
              <div className="space-y-4">{renderTable()}</div>
            </TabsContent>
            <TabsContent value="students">
              <div className="space-y-4">{renderTable()}</div>
            </TabsContent>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredUsers().length} of{" "}
              {selectedTab === "teachers"
                ? teachers.length
                : selectedTab === "parents"
                  ? parents.length
                  : students.length}{" "}
              {selectedTab}
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  )
}
