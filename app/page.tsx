"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold">EduConnect</span>
          </div>

          <nav className="hidden space-x-8 md:flex">
            <Link href="#home" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="#demo" className="text-sm font-medium transition-colors hover:text-primary">
              Demo
            </Link>
          </nav>

          <div>
            <Button asChild variant="outline">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* Hero Section */}
        <section id="home" className="relative flex min-h-[80vh] w-full items-center justify-center">
          <Image src="/placeholder.svg?height=1080&width=1920" alt="Students" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="animate-gradient-text bg-gradient-to-r from-blue-500 via-white to-pink-500 bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
              Parent-Student Communication Portal
            </h1>
            <p className="mt-4 text-lg text-white/80">Bridging the gap between parents, students, and educators</p>
            <Button size="lg" className="mt-8">
              Let&apos;s communicate
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=800&width=600" alt="About us" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold tracking-tight">About Our Platform</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum
                    vestibulum. Cras porttitor metus in enim tincidunt, vel faucibus mi pulvinar. Nulla facilisi.
                  </p>
                  <p>
                    Praesent venenatis, nunc in bibendum fringilla, quam risus feugiat turpis, nec blandit eros dui eget
                    nisi. Maecenas non mauris sapien. Fusce non eros et ex scelerisque imperdiet ac quis risus.
                  </p>
                  <p>
                    Etiam suscipit, nisi id posuere dapibus, nisl ipsum ultrices ex, at feugiat orci neque eu urna. Sed
                    lobortis imperdiet sem, vel tempus turpis porttitor at.
                  </p>
                </div>
                <Button variant="outline" className="mt-6 w-fit">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-muted py-20">
          <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to keep in touch with your student&apos;s progress
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Real-time Communication",
                  description: "Direct messaging between parents and teachers for timely updates.",
                  icon: "💬",
                },
                {
                  title: "Grade Tracking",
                  description: "Monitor academic performance with easy-to-read visualizations.",
                  icon: "📊",
                },
                {
                  title: "Attendance Monitoring",
                  description: "Stay informed about your child's attendance and punctuality.",
                  icon: "📅",
                },
                {
                  title: "Homework Tracking",
                  description: "Never miss an assignment with our comprehensive homework system.",
                  icon: "📝",
                },
                {
                  title: "Event Calendar",
                  description: "Keep up with school events, meetings, and important dates.",
                  icon: "🗓️",
                },
                {
                  title: "Progress Reports",
                  description: "Detailed insights into your child's academic and personal development.",
                  icon: "📈",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="text-4xl transition-transform duration-300 hover:scale-110">{service.icon}</div>
                    <CardTitle className="mt-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="mt-2 w-full justify-between">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section id="demo" className="py-20">
          <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">See It In Action</h2>
              <p className="mt-4 text-muted-foreground">
                Watch how our platform makes parent-student-teacher communication seamless
              </p>
            </div>

            <div className="mt-12 aspect-video w-full overflow-hidden rounded-lg bg-black relative">
              <video className="w-full h-full object-cover" poster="/placeholder.svg?height=1080&width=1920" controls>
                <source src="#" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:opacity-0 transition-opacity pointer-events-none">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 pointer-events-auto"
                >
                  <div className="mr-2 h-6 w-6 rounded-full bg-primary" />
                  Play Demo Video
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-16 text-gray-300">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Column 1: Logo & Contact Form */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} />
                <span className="text-xl font-bold text-white">EduConnect</span>
              </div>
              <p className="mt-4 text-sm">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none bg-gray-800 text-white" />
                <Button size="sm" className="rounded-l-none">
                  Submit
                </Button>
              </div>
            </div>

            {/* Column 2: Support */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Support</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@educonnect.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Account */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Account</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Social Media */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary/80">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary/80">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary/80">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary/80">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} EduConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <style jsx global>{`
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      
      @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: rgba(255, 255, 255, 0.5) }
      }

      @keyframes gradient-text {
        0% { background-position: 0% 50% }
        50% { background-position: 100% 50% }
        100% { background-position: 0% 50% }
      }

      .animate-gradient-text {
        animation: gradient-text 3s ease infinite;
      }
    `}</style>
    </div>
  )
}
