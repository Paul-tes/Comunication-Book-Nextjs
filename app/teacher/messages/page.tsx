"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Search, Paperclip, Mic, ImageIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for parents
const parents = [
  {
    id: 1,
    name: "John Doe",
    studentName: "Emma Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for the update on Emma's progress.",
    lastMessageTime: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    name: "Sarah Smith",
    studentName: "Noah Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When is the next parent-teacher meeting?",
    lastMessageTime: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Michael Davis",
    studentName: "Olivia Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Olivia will be absent tomorrow due to a doctor's appointment.",
    lastMessageTime: "3 days ago",
    unread: false,
  },
]

// Mock data for students
const students = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "Grade 5",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I have a question about the homework.",
    lastMessageTime: "1 day ago",
    unread: true,
  },
  {
    id: 2,
    name: "Noah Smith",
    grade: "Grade 5",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've submitted my assignment.",
    lastMessageTime: "3 days ago",
    unread: false,
  },
]

// Mock conversation data
const conversations = {
  "parent-1": [
    {
      id: 1,
      sender: "John Doe",
      content: "Hello Ms. Smith, how is Emma doing in class?",
      timestamp: "3 days ago",
    },
    {
      id: 2,
      sender: "You",
      content:
        "Hi Mr. Doe, Emma is doing very well. She's been very active in class discussions and her math skills are improving.",
      timestamp: "3 days ago",
    },
    {
      id: 3,
      sender: "John Doe",
      content: "That's great to hear! We've been practicing math at home.",
      timestamp: "2 days ago",
    },
    {
      id: 4,
      sender: "You",
      content: "It definitely shows. She scored very well on her recent quiz.",
      timestamp: "2 days ago",
    },
    {
      id: 5,
      sender: "John Doe",
      content: "Thank you for the update on Emma's progress.",
      timestamp: "2 hours ago",
    },
  ],
  "student-1": [
    {
      id: 1,
      sender: "Emma Johnson",
      content: "Hello Ms. Smith, I have a question about the homework.",
      timestamp: "1 day ago",
    },
    {
      id: 2,
      sender: "You",
      content: "Hi Emma, what's your question?",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      sender: "Emma Johnson",
      content: "For problem #5, do we need to show all the steps or just the answer?",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      sender: "You",
      content: "Please show all your steps. It helps me understand your thought process.",
      timestamp: "1 day ago",
    },
  ],
}

type Contact = {
  id: number
  name: string
  studentName?: string
  grade?: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: boolean
}

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("parents")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(parents[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Get the appropriate conversation based on selected contact
  const getConversation = () => {
    if (!selectedContact) return []

    const conversationKey = `${activeTab.slice(0, -1)}-${selectedContact.id}`
    return conversations[conversationKey as keyof typeof conversations] || []
  }

  // Filter contacts based on search query
  const filteredContacts = (activeTab === "parents" ? parents : students).filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.studentName && contact.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.grade && contact.grade.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      // In a real app, you would send this to an API
      console.log("Sending message to", selectedContact.name, ":", newMessage)
      setNewMessage("")
    }
  }

  // Handle selecting a contact
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact)
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Communicate with parents and students.</p>
      </div>

      <div className="grid h-[calc(100vh-12rem)] w-full grid-cols-1 gap-6 md:grid-cols-3">
        {/* Contact List */}
        <Card className="md:col-span-1">
          <CardHeader className="space-y-2 pb-2">
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="parents" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="parents">Parents</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>

              <div className="relative mb-2 px-4">
                <Search className="absolute left-6 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <ScrollArea className="h-[calc(100vh-22rem)]">
                <TabsContent value="parents" className="m-0">
                  {filteredContacts.length === 0 ? (
                    <div className="flex h-20 items-center justify-center">
                      <p className="text-sm text-muted-foreground">No parents found</p>
                    </div>
                  ) : (
                    filteredContacts.map((parent) => (
                      <div key={parent.id}>
                        <div
                          className={`flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-muted/50 ${
                            selectedContact?.id === parent.id && activeTab === "parents" ? "bg-muted" : ""
                          }`}
                          onClick={() => handleSelectContact(parent)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={parent.avatar || "/placeholder.svg"} alt={parent.name} />
                            <AvatarFallback>{parent.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{parent.name}</p>
                              <p className="text-xs text-muted-foreground">{parent.lastMessageTime}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">Parent of {parent.studentName}</p>
                            <p className="text-sm line-clamp-1">{parent.lastMessage}</p>
                          </div>
                          {parent.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                        </div>
                        <Separator />
                      </div>
                    ))
                  )}
                </TabsContent>
                <TabsContent value="students" className="m-0">
                  {filteredContacts.length === 0 ? (
                    <div className="flex h-20 items-center justify-center">
                      <p className="text-sm text-muted-foreground">No students found</p>
                    </div>
                  ) : (
                    filteredContacts.map((student) => (
                      <div key={student.id}>
                        <div
                          className={`flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-muted/50 ${
                            selectedContact?.id === student.id && activeTab === "students" ? "bg-muted" : ""
                          }`}
                          onClick={() => handleSelectContact(student)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.lastMessageTime}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{student.grade}</p>
                            <p className="text-sm line-clamp-1">{student.lastMessage}</p>
                          </div>
                          {student.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                        </div>
                        <Separator />
                      </div>
                    ))
                  )}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>

        {/* Conversation */}
        <Card className="md:col-span-2">
          {selectedContact ? (
            <>
              <CardHeader className="flex flex-row items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedContact.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact.studentName ? `Parent of ${selectedContact.studentName}` : selectedContact.grade}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex h-[calc(100vh-22rem)] flex-col justify-between gap-4">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {getConversation().map((message) => (
                      <div key={message.id} className={`flex gap-3 ${message.sender === "You" ? "justify-end" : ""}`}>
                        {message.sender !== "You" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={selectedContact.avatar || "/placeholder.svg"}
                              alt={selectedContact.name}
                            />
                            <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
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

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" title="Attach file">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Attach image">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Voice note">
                      <Mic className="h-4 w-4" />
                    </Button>
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
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
