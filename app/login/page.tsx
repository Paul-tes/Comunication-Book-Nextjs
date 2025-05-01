"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [loginTab, setLoginTab] = useState("parent");

  return (
    <div className="grid w-full min-h-screen md:grid-cols-2 lg:grid-cols-2">
      <Link
        href="/"
        className="absolute left-8 top-8 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 mr-2"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        Back to Home
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="/auth_bg.jpg"
            alt="Authentication background"
            fill
            className="block h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src="/Logo.png" alt="Logo" width={200} height={200} />
          <span className="ml-2">Sky Academy</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Skytech Academy has revolutionized how we communicate with parents.
            It's made tracking student progress so much easier."
            </p>
            <footer className="text-sm">Ms. Nathan, Math Teacher</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access your account
            </p>
          </div>

          <Tabs
            defaultValue="parent"
            value={loginTab}
            onValueChange={setLoginTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="parent">
              <Card>
                <CardHeader>
                  <CardTitle>Parent Login</CardTitle>
                  <CardDescription>
                    Access your child's academic information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent-email">Email</Label>
                    <Input
                      id="parent-email"
                      type="email"
                      placeholder="parent@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="parent-password">Password</Label>
                      <Link
                        href="#"
                        className="text-xs text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="parent-password" type="password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="parent-remember" />
                    <label
                      htmlFor="parent-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/parent">Login as Parent</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="teacher">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Login</CardTitle>
                  <CardDescription>
                    Access your classroom management tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="teacher@school.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="teacher-password">Password</Label>
                      <Link
                        href="#"
                        className="text-xs text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="teacher-password" type="password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="teacher-remember" />
                    <label
                      htmlFor="teacher-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/teacher">Login as Teacher</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Login</CardTitle>
                  <CardDescription>
                    Access system administration tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@school.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="admin-password">Password</Label>
                      <Link
                        href="#"
                        className="text-xs text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="admin-password" type="password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin-remember" />
                    <label
                      htmlFor="admin-remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/admin">Login as Admin</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Contact your school administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
