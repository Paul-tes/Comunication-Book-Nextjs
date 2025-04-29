"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Calendar, CheckCircle, Clock, GraduationCap } from "lucide-react"

// Mock data for children
const children = [
  {
    id: 1,
    name: "Kidest Getenet",
    grade: "Grade 5",
    performance: "Excellent",
    performanceColor: "bg-green-100 text-green-800",
    avatar: "/studentPlaceholder.jpg",
    attendance: 95,
    homeworkPending: 2,
    recentGrade: "A-",
    subjects: ["Math", "Science", "English", "History"],
    nextExam: "Math - May 15",
  },
  {
    id: 2,
    name: "Nahom Desalegn",
    grade: "Grade 3",
    performance: "Needs Attention",
    performanceColor: "bg-amber-100 text-amber-800",
    avatar: "/studentPlaceholder2.jpg",
    attendance: 88,
    homeworkPending: 4,
    recentGrade: "B",
    subjects: ["Reading", "Math", "Art", "Science"],
    nextExam: "Reading - May 12",
  },
]

export default function MyKidsPage() {
  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Kids Overview</h2>
      </div>

      <div className="space-y-6">
        {children.map((child, index) => (
          <Card
            key={child.id}
            className="group overflow-hidden border-0 bg-gradient-to-r from-white to-gray-50 shadow-md transition-all duration-300 hover:shadow-lg dark:from-gray-900 dark:to-gray-800"
            style={{
              animationDelay: `${index * 150}ms`,
              animation: "fadeInUp 0.5s ease-out forwards",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            <style jsx global>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              
              @keyframes pulse {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}</style>

            <div className="flex flex-col md:flex-row">
              {/* Left section with avatar and basic info */}
              <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:w-1/4">
                <div className="absolute -right-4 top-1/2 hidden h-16 w-8 -translate-y-1/2 overflow-hidden md:block">
                  <div className="h-full w-full rounded-l-full bg-white shadow-md dark:bg-gray-800"></div>
                </div>
                <Avatar className="h-24 w-24 ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40 md:h-32 md:w-32">
                  <AvatarImage src={child.avatar || "/placeholder.svg"} alt={child.name} />
                  <AvatarFallback className="text-2xl">{child.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-center text-xl font-bold">{child.name}</h3>
                <p className="text-center text-sm text-muted-foreground">{child.grade}</p>
                <Badge
                  variant="outline"
                  className={`mt-2 transition-all duration-300 group-hover:animate-pulse ${child.performanceColor}`}
                >
                  {child.performance}
                </Badge>
              </div>

              {/* Right section with details */}
              <div className="flex flex-1 flex-col p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Academic Stats */}
                  <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-md dark:bg-gray-800">
                    <h4 className="flex items-center gap-2 font-semibold text-primary">
                      <GraduationCap className="h-5 w-5" />
                      Academic Performance
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium">Attendance</span>
                          <span className="text-sm">{child.attendance}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-1000 ease-in-out group-hover:bg-primary/80"
                            style={{ width: `${child.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Recent Grade:</span>
                        <span className="rounded-md bg-primary/10 px-2 py-1 text-sm font-semibold text-primary">
                          {child.recentGrade}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Next Exam:</span>
                        <span className="text-sm">{child.nextExam}</span>
                      </div>
                    </div>
                  </div>

                  {/* Homework & Activities */}
                  <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 group-hover:shadow-md dark:bg-gray-800">
                    <h4 className="flex items-center gap-2 font-semibold text-primary">
                      <BookOpen className="h-5 w-5" />
                      Homework & Activities
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-4 w-4 text-amber-500" />
                          Pending Homework:
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            child.homeworkPending > 3 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                          }
                        >
                          {child.homeworkPending} items
                        </Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Subjects:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {child.subjects.map((subject) => (
                            <span
                              key={subject}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-transform duration-300 group-hover:scale-105"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer with action buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="flex-1 gap-2 transition-transform duration-300 group-hover:translate-y-[-2px]"
                  >
                    <Link href={`/parent/student/${child.id}`}>
                      <CheckCircle className="h-4 w-4" />
                      View Full Details
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 gap-2">
                    <Link href={`/parent/messages`}>
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
