"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Video,
  Calendar,
  Users,
  Send,
  Phone,
  MoreVertical,
  Search,
  Plus,
  Clock,
  ExternalLink,
  Mic,
  Camera,
  Share2,
} from "lucide-react"
import { format } from "date-fns"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  type: "text" | "image" | "file"
}

interface Chat {
  id: string
  name: string
  type: "direct" | "group"
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  avatar?: string
  isOnline?: boolean
}

interface Event {
  id: string
  title: string
  type: "webinar" | "job-fair" | "qa-session" | "networking"
  date: Date
  duration: number
  participants: number
  maxParticipants?: number
  host: string
  description: string
  isLive?: boolean
  joinUrl?: string
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Wilson (TechCorp Recruiter)",
    type: "direct",
    participants: ["user", "sarah"],
    lastMessage: {
      id: "1",
      senderId: "sarah",
      senderName: "Sarah Wilson",
      content: "Thanks for your interest in the Frontend Developer position. I'd love to schedule a call this week.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: "text",
    },
    unreadCount: 2,
    avatar: "/placeholder.svg?height=40&width=40&text=SW",
    isOnline: true,
  },
  {
    id: "2",
    name: "CS Students Group",
    type: "group",
    participants: ["user", "john", "mary", "alex"],
    lastMessage: {
      id: "2",
      senderId: "john",
      senderName: "John Doe",
      content: "Anyone attending the virtual job fair tomorrow?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "text",
    },
    unreadCount: 5,
    avatar: "/placeholder.svg?height=40&width=40&text=CS",
  },
  {
    id: "3",
    name: "Mike Chen (StartupXYZ)",
    type: "direct",
    participants: ["user", "mike"],
    lastMessage: {
      id: "3",
      senderId: "user",
      senderName: "You",
      content: "I'm very interested in the internship opportunity. When would be a good time to discuss?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      type: "text",
    },
    unreadCount: 0,
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    isOnline: false,
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "sarah",
    senderName: "Sarah Wilson",
    senderAvatar: "/placeholder.svg?height=32&width=32&text=SW",
    content: "Hi Alex! I saw your application for the Frontend Developer position at TechCorp.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: "text",
  },
  {
    id: "2",
    senderId: "user",
    senderName: "You",
    content: "Hi Sarah! Yes, I'm very excited about the opportunity. I'd love to learn more about the role.",
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    type: "text",
  },
  {
    id: "3",
    senderId: "sarah",
    senderName: "Sarah Wilson",
    senderAvatar: "/placeholder.svg?height=32&width=32&text=SW",
    content:
      "Great! Your background in React and TypeScript looks impressive. The team is looking for someone with exactly your skills.",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    type: "text",
  },
  {
    id: "4",
    senderId: "sarah",
    senderName: "Sarah Wilson",
    senderAvatar: "/placeholder.svg?height=32&width=32&text=SW",
    content: "Thanks for your interest in the Frontend Developer position. I'd love to schedule a call this week.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: "text",
  },
]

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Career Fair 2024",
    type: "job-fair",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 180,
    participants: 234,
    maxParticipants: 500,
    host: "PlacementPro Team",
    description: "Connect with top tech companies and explore exciting career opportunities.",
    joinUrl: "#",
  },
  {
    id: "2",
    title: "Q&A with Google Recruiters",
    type: "qa-session",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    duration: 60,
    participants: 89,
    maxParticipants: 100,
    host: "Google Recruitment Team",
    description: "Ask questions about Google's hiring process, culture, and available positions.",
    joinUrl: "#",
  },
  {
    id: "3",
    title: "System Design Workshop",
    type: "webinar",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: 90,
    participants: 156,
    host: "Dr. Sarah Smith",
    description: "Learn system design fundamentals with hands-on examples and real-world case studies.",
    joinUrl: "#",
  },
  {
    id: "4",
    title: "Startup Networking Event",
    type: "networking",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duration: 120,
    participants: 67,
    maxParticipants: 150,
    host: "Startup Community",
    description: "Network with startup founders, employees, and fellow job seekers in the startup ecosystem.",
    joinUrl: "#",
  },
]

export function ChatInteractionHub() {
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "webinar":
        return "bg-chart-1 text-white"
      case "job-fair":
        return "bg-chart-2 text-white"
      case "qa-session":
        return "bg-chart-3 text-white"
      case "networking":
        return "bg-chart-4 text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return Video
      case "job-fair":
        return Users
      case "qa-session":
        return MessageSquare
      case "networking":
        return Share2
      default:
        return Calendar
    }
  }

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage?.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const upcomingEvents = mockEvents.filter((event) => event.date > new Date())
  const liveEvents = mockEvents.filter((event) => event.isLive)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Interaction Hub</h1>
        <p className="text-muted-foreground mt-2">Connect with recruiters and join networking events</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-chart-1" />
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Active Chats</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-chart-2" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-chart-3" />
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-chart-4" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Events Attended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="live">Live Sessions</TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chat List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Messages</CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  <div className="space-y-1 p-4">
                    {filteredChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat?.id === chat.id ? "bg-primary/10" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{chat.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {chat.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-chart-1 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                              {chat.lastMessage && (
                                <span className="text-xs text-muted-foreground">
                                  {format(chat.lastMessage.timestamp, "HH:mm")}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {chat.lastMessage?.senderId === "user" ? "You: " : ""}
                              {chat.lastMessage?.content}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant={chat.type === "group" ? "secondary" : "outline"} className="text-xs">
                                {chat.type === "group" ? "Group" : "Direct"}
                              </Badge>
                              {chat.unreadCount > 0 && (
                                <Badge className="text-xs px-2 py-0.5">{chat.unreadCount}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-2">
              {selectedChat ? (
                <>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedChat.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{selectedChat.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedChat.isOnline ? "Online" : "Last seen recently"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-96 p-4">
                      <div className="space-y-4">
                        {mockMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.senderId === "user" ? "flex-row-reverse" : ""}`}
                          >
                            {message.senderId !== "user" && (
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                                <AvatarFallback>{message.senderName.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.senderId === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.senderId === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                }`}
                              >
                                {format(message.timestamp, "HH:mm")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              setMessageInput("")
                            }
                          }}
                        />
                        <Button size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a chat from the sidebar to start messaging</p>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Join networking events, webinars, and career fairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const Icon = getEventTypeIcon(event.type)
                  return (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4 flex-1">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${getEventTypeColor(event.type)}`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{event.title}</h3>
                                  <p className="text-muted-foreground">Hosted by {event.host}</p>
                                </div>
                                <Badge className={getEventTypeColor(event.type)} variant="secondary">
                                  {event.type.replace("-", " ").toUpperCase()}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {format(event.date, "PPP 'at' p")}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {event.duration} minutes
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {event.participants} {event.maxParticipants && `/ ${event.maxParticipants}`}{" "}
                                  participants
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                              <div className="flex gap-2">
                                <Button>
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Join Event
                                </Button>
                                <Button variant="outline">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Add to Calendar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Sessions Tab */}
        <TabsContent value="live" className="space-y-6">
          {liveEvents.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  Live Now
                </CardTitle>
                <CardDescription>Join active sessions happening right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveEvents.map((event) => {
                    const Icon = getEventTypeIcon(event.type)
                    return (
                      <Card key={event.id} className="border-red-200 bg-red-50/50">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-500 text-white rounded-lg flex items-center justify-center">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {event.participants} participants • Hosted by {event.host}
                                </p>
                              </div>
                            </div>
                            <Button className="bg-red-500 hover:bg-red-600">
                              <Video className="w-4 h-4 mr-2" />
                              Join Live
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Live Sessions</h3>
                <p className="text-muted-foreground mb-4">There are no live sessions happening right now.</p>
                <Button variant="outline" onClick={() => setActiveTab("events")}>
                  View Upcoming Events
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Virtual Meeting Room */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Meeting Room</CardTitle>
              <CardDescription>Start an instant video call with recruiters or peers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm opacity-75">Your video will appear here</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="sm">
                  <Mic className="w-4 h-4 mr-2" />
                  Mute
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Camera
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Screen
                </Button>
                <Button>
                  <Video className="w-4 h-4 mr-2" />
                  Start Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
