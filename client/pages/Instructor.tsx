import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
} from "@/components/Animated";
import { 
  sampleCourses, 
  formatDuration,
  formatPrice,
} from "@/data/lms";
import {
  Play,
  Plus,
  Users,
  DollarSign,
  TrendingUp,
  Star,
  Edit,
  Eye,
  BarChart,
  BookOpen,
  Award,
  Calendar,
} from "lucide-react";

export default function Instructor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock instructor courses (using sample courses)
  const instructorCourses = sampleCourses.map(course => ({
    ...course,
    earnings: Math.floor(Math.random() * 5000) + 1000,
    newStudents: Math.floor(Math.random() * 50) + 10,
  }));

  const totalStudents = instructorCourses.reduce((acc, course) => acc + course.studentsEnrolled, 0);
  const totalEarnings = instructorCourses.reduce((acc, course) => acc + course.earnings, 0);
  const averageRating = instructorCourses.reduce((acc, course) => acc + course.rating, 0) / instructorCourses.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Instructor Dashboard</h1>
                <p className="text-xl text-muted-foreground">
                  Manage your courses and track your teaching success
                </p>
              </div>
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Create New Course
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 mt-8">
              {/* Stats Cards */}
              <AnimatedSection>
                <div className="grid md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Students</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold">{instructorCourses.length}</div>
                      <div className="text-sm text-muted-foreground">Published Courses</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Star className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Total Earnings</div>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedSection>

              {/* Recent Activity */}
              <AnimatedSection delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest course performance and student activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {instructorCourses.slice(0, 3).map((course, index) => (
                        <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded flex items-center justify-center">
                              <Play className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {course.newStudents} new students this month
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${course.earnings}</div>
                            <div className="text-sm text-muted-foreground">This month</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Quick Actions */}
              <AnimatedSection delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks to manage your teaching business</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto p-6 flex-col gap-3">
                        <Plus className="h-8 w-8" />
                        <div className="text-center">
                          <div className="font-medium">Create Course</div>
                          <div className="text-sm text-muted-foreground">Start building a new course</div>
                        </div>
                      </Button>

                      <Button variant="outline" className="h-auto p-6 flex-col gap-3">
                        <BarChart className="h-8 w-8" />
                        <div className="text-center">
                          <div className="font-medium">View Analytics</div>
                          <div className="text-sm text-muted-foreground">Track course performance</div>
                        </div>
                      </Button>

                      <Button variant="outline" className="h-auto p-6 flex-col gap-3">
                        <Users className="h-8 w-8" />
                        <div className="text-center">
                          <div className="font-medium">Student Messages</div>
                          <div className="text-sm text-muted-foreground">Reply to student questions</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
              </div>

              <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructorCourses.map((course) => (
                  <StaggeredItem key={course.id}>
                    <HoverScale>
                      <Card className="overflow-hidden h-full">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative">
                          <Play className="h-12 w-12 text-primary" />
                          <Badge className="absolute top-2 right-2" variant={course.status === "Published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{course.studentsEnrolled}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Price: {formatPrice(course.price)}</span>
                            <span>Earnings: ${course.earnings}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverScale>
                  </StaggeredItem>
                ))}
              </StaggeredContainer>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Performance Analytics</CardTitle>
                  <CardDescription>Track how your courses are performing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Detailed analytics and insights coming soon
                    </p>
                    <Button variant="outline">
                      View Sample Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6 mt-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-600">${totalEarnings.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Earnings</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">${Math.floor(totalEarnings * 0.3).toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold">+23%</div>
                    <div className="text-sm text-muted-foreground">Growth Rate</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings by Course</CardTitle>
                  <CardDescription>Revenue breakdown from your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {instructorCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {course.studentsEnrolled} students • {formatPrice(course.price)} per enrollment
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">${course.earnings}</div>
                          <div className="text-sm text-muted-foreground">Total earnings</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
