"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Mock data for teachers
const teachers = [
  {
    id: 1,
    name: "Ms. Smith",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Emma did very well on her math test today!",
    lastMessageTime: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    name: "Mr. Johnson",
    subject: "Science",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "We'll be having a science fair next month.",
    lastMessageTime: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Mrs. Davis",
    subject: "English",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Please remind Emma to bring her book tomorrow.",
    lastMessageTime: "3 days ago",
    unread: false,
  },
]

// Mock conversation data
const conversations = {
  1: [
    {
      id: 1,
      sender: "Ms. Smith",
      content: "Hello! I wanted to let you know that Emma did very well on her math test today!",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      sender: "You",
      content: "That's great to hear! We've been practicing at home.",
      timestamp: "2 days ago",
    },
    {
      id: 3,
      sender: "Ms. Smith",
      content: "It definitely shows. She's making excellent progress with fractions.",
      timestamp: "2 days ago",
    },
    {
      id: 4,
      sender: "You",
      content: "Is there anything specific we should focus on next?",
      timestamp: "2 days ago",
    },
    {
      id: 5,
      sender: "Ms. Smith",
      content: "We'll be starting decimals next week, so any preparation on that would be helpful.",
      timestamp: "2 hours ago",
    },
  ],
  2: [
    {
      id: 1,
      sender: "Mr. Johnson",
      content: "We'll be having a science fair next month. Students will need to prepare a project.",
      timestamp: "Yesterday",
    },
  ],
  3: [
    {
      id: 1,
      sender: "Mrs. Davis",
      content: "Please remind Emma to bring her book tomorrow for our reading session.",
      timestamp: "3 days ago",
    },
    {
      id: 2,
      sender: "You",
      content: "I'll make sure she packs it tonight. Thank you for the reminder!",
      timestamp: "3 days ago",
    },
  ],
}

export default function MessagesPage() {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this to an API
      console.log("Sending message to", selectedTeacher.name, ":", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Communicate with your child's teachers.</p>
      </div>

      <div className="grid h-[calc(100vh-12rem)] grid-cols-1 gap-6 md:grid-cols-3">
        {/* Teacher List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-18rem)]">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id}>
                  <div
                    className={`flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-muted/50 ${
                      selectedTeacher.id === teacher.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedTeacher(teacher)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                      <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-xs text-muted-foreground">{teacher.lastMessageTime}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                      <p className="text-sm line-clamp-1">{teacher.lastMessage}</p>
                    </div>
                    {teacher.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                  </div>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedTeacher.avatar || "/placeholder.svg"} alt={selectedTeacher.name} />
              <AvatarFallback>{selectedTeacher.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{selectedTeacher.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{selectedTeacher.subject}</p>
            </div>
          </CardHeader>
          <CardContent className="flex h-[calc(100vh-22rem)] flex-col justify-between gap-4">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {conversations[selectedTeacher.id as keyof typeof conversations].map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === "You" ? "justify-end" : ""}`}>
                    {message.sender !== "You" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedTeacher.avatar || "/placeholder.svg"} alt={selectedTeacher.name} />
                        <AvatarFallback>{selectedTeacher.name[0]}</AvatarFallback>
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
            </ScrollArea>

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
      </div>
    </div>
  )
}
