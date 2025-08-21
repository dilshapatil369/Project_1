"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Shield,
  Bell,
  Palette,
  Eye,
  Lock,
  Smartphone,
  Globe,
  Download,
  Upload,
  Edit,
  Save,
  X,
} from "lucide-react"

interface UserProfile {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    bio: string
    avatar?: string
  }
  professional: {
    title: string
    company?: string
    experience: string
    skills: string[]
    linkedin?: string
    github?: string
    portfolio?: string
  }
  education: {
    degree: string
    school: string
    graduationYear: string
    gpa?: string
    major: string
  }
  preferences: {
    jobTypes: string[]
    locations: string[]
    salaryRange: {
      min: number
      max: number
    }
    remoteWork: boolean
  }
}

const mockProfile: UserProfile = {
  personalInfo: {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    bio: "Computer Science student passionate about full-stack development and creating innovative solutions. Looking for opportunities to grow and contribute to meaningful projects.",
    avatar: "/placeholder.svg?height=100&width=100&text=AJ",
  },
  professional: {
    title: "Software Engineering Student",
    experience: "2+ years",
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"],
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    portfolio: "alexjohnson.dev",
  },
  education: {
    degree: "Bachelor of Science",
    school: "University of California, Berkeley",
    graduationYear: "2024",
    gpa: "3.8",
    major: "Computer Science",
  },
  preferences: {
    jobTypes: ["Full-time", "Internship"],
    locations: ["San Francisco", "Remote"],
    salaryRange: {
      min: 80000,
      max: 120000,
    },
    remoteWork: true,
  },
}

export function UserProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    jobAlerts: true,
    messageAlerts: true,
    eventReminders: true,
    weeklyDigest: true,
  })
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
  })
  const [accessibility, setAccessibility] = useState({
    fontSize: "medium",
    theme: "system",
    highContrast: false,
    reducedMotion: false,
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset any unsaved changes
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Overview */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Overview</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={profile.personalInfo.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {profile.personalInfo.firstName[0]}
                      {profile.personalInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">
                    {profile.personalInfo.firstName} {profile.personalInfo.lastName}
                  </h3>
                  <p className="text-muted-foreground">{profile.professional.title}</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.education.school}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.professional.skills.slice(0, 6).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.professional.skills.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.professional.skills.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.personalInfo.firstName}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            personalInfo: { ...profile.personalInfo, firstName: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.personalInfo.lastName}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            personalInfo: { ...profile.personalInfo, lastName: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.personalInfo.email}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            personalInfo: { ...profile.personalInfo, email: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.personalInfo.phone}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            personalInfo: { ...profile.personalInfo, phone: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.personalInfo.location}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, location: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.personalInfo.bio}
                      disabled={!isEditing}
                      rows={3}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          personalInfo: { ...profile.personalInfo, bio: e.target.value },
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="title">Current Title</Label>
                      <Input
                        id="title"
                        value={profile.professional.title}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            professional: { ...profile.professional, title: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Select
                        value={profile.professional.experience}
                        disabled={!isEditing}
                        onValueChange={(value) =>
                          setProfile({
                            ...profile,
                            professional: { ...profile.professional, experience: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1 years">0-1 years</SelectItem>
                          <SelectItem value="1-2 years">1-2 years</SelectItem>
                          <SelectItem value="2+ years">2+ years</SelectItem>
                          <SelectItem value="3+ years">3+ years</SelectItem>
                          <SelectItem value="5+ years">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profile.professional.linkedin || ""}
                        disabled={!isEditing}
                        placeholder="linkedin.com/in/username"
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            professional: { ...profile.professional, linkedin: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={profile.professional.github || ""}
                        disabled={!isEditing}
                        placeholder="github.com/username"
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            professional: { ...profile.professional, github: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio">Portfolio</Label>
                      <Input
                        id="portfolio"
                        value={profile.professional.portfolio || ""}
                        disabled={!isEditing}
                        placeholder="yourwebsite.com"
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            professional: { ...profile.professional, portfolio: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        value={profile.education.degree}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            education: { ...profile.education, degree: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        value={profile.education.major}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            education: { ...profile.education, major: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="school">School</Label>
                      <Input
                        id="school"
                        value={profile.education.school}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            education: { ...profile.education, school: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="graduationYear">Graduation Year</Label>
                      <Input
                        id="graduationYear"
                        value={profile.education.graduationYear}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            education: { ...profile.education, graduationYear: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="gpa">GPA (Optional)</Label>
                      <Input
                        id="gpa"
                        value={profile.education.gpa || ""}
                        disabled={!isEditing}
                        placeholder="3.8"
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            education: { ...profile.education, gpa: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Account Security
                </CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Login Alerts</h4>
                      <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={security.loginAlerts}
                      onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout</Label>
                    <Select
                      value={security.sessionTimeout}
                      onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Chrome on Windows</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA • Current session</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Mobile App</p>
                        <p className="text-xs text-muted-foreground">San Francisco, CA • 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Revoke All Other Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified about important updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Email Notifications</h5>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Push Notifications</h5>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">SMS Notifications</h5>
                      <p className="text-sm text-muted-foreground">Receive text message notifications</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Job Alerts</h5>
                      <p className="text-sm text-muted-foreground">New job opportunities matching your preferences</p>
                    </div>
                    <Switch
                      checked={notifications.jobAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, jobAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Message Alerts</h5>
                      <p className="text-sm text-muted-foreground">New messages from recruiters and connections</p>
                    </div>
                    <Switch
                      checked={notifications.messageAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, messageAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Event Reminders</h5>
                      <p className="text-sm text-muted-foreground">Reminders for upcoming events and sessions</p>
                    </div>
                    <Switch
                      checked={notifications.eventReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, eventReminders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Weekly Digest</h5>
                      <p className="text-sm text-muted-foreground">Weekly summary of your activity and opportunities</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accessibility Tab */}
        <TabsContent value="accessibility" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Display Settings
                </CardTitle>
                <CardDescription>Customize the appearance and accessibility of the interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select
                    value={accessibility.fontSize}
                    onValueChange={(value) => setAccessibility({ ...accessibility, fontSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="extra-large">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={accessibility.theme}
                    onValueChange={(value) => setAccessibility({ ...accessibility, theme: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">High Contrast</h4>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch
                    checked={accessibility.highContrast}
                    onCheckedChange={(checked) => setAccessibility({ ...accessibility, highContrast: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reduced Motion</h4>
                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                  </div>
                  <Switch
                    checked={accessibility.reducedMotion}
                    onCheckedChange={(checked) => setAccessibility({ ...accessibility, reducedMotion: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Color Themes
                </CardTitle>
                <CardDescription>Choose your preferred color scheme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
                    <div>
                      <p className="font-medium">Professional Green</p>
                      <p className="text-sm text-muted-foreground">Current theme</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                    <div>
                      <p className="font-medium">Ocean Blue</p>
                      <p className="text-sm text-muted-foreground">Calm and focused</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
                    <div>
                      <p className="font-medium">Creative Purple</p>
                      <p className="text-sm text-muted-foreground">Inspiring and modern</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
