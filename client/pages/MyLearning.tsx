import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
} from "@/components/Animated";
import { sampleCourses, formatDuration, type Course } from "@/data/lms";
import {
  Play,
  BookOpen,
  Award,
  Clock,
  Calendar,
  TrendingUp,
  Download,
  Star,
} from "lucide-react";

export default function MyLearning() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("enrolled");

  // Mock enrolled courses with progress
  const enrolledCourses = sampleCourses.slice(0, 2).map((course) => ({
    ...course,
    progress: Math.floor(Math.random() * 100),
    lastAccessed: "2024-01-15",
    timeSpent: Math.floor(Math.random() * 20) + 5,
  }));

  const completedCourses = sampleCourses.slice(2, 3).map((course) => ({
    ...course,
    progress: 100,
    completedDate: "2024-01-10",
    certificateEarned: true,
  }));

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleResumeLesson = (courseId: string) => {
    // Navigate to current lesson
    navigate(`/course/${courseId}/lesson/lesson-1-1`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  My Learning
                </h1>
                <p className="text-xl text-muted-foreground">
                  Track your progress and continue learning
                </p>
              </div>
              <Button onClick={() => navigate("/courses")}>
                Browse More Courses
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Learning Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold">
                    {enrolledCourses.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Courses Enrolled
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold">
                    {completedCourses.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Courses Completed
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-sm text-muted-foreground">
                    Total Learning Time
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">
                    Learning Streak (days)
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>

          {/* Courses Tabs */}
          <AnimatedSection delay={0.2}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="enrolled">
                  Enrolled ({enrolledCourses.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedCourses.length})
                </TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist (0)</TabsTrigger>
              </TabsList>

              <TabsContent value="enrolled" className="space-y-6 mt-8">
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No enrolled courses yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start your learning journey by enrolling in a course
                    </p>
                    <Button onClick={() => navigate("/courses")}>
                      Browse Courses
                    </Button>
                  </div>
                ) : (
                  <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                      <StaggeredItem key={course.id}>
                        <HoverScale>
                          <Card className="overflow-hidden h-full">
                            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative">
                              <Play className="h-12 w-12 text-primary" />
                              <Badge className="absolute top-2 right-2">
                                {course.progress}% Complete
                              </Badge>
                            </div>
                            <CardHeader className="pb-3">
                              <CardTitle className="line-clamp-2">
                                {course.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                By {course.instructor.name}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Progress</span>
                                  <span>{course.progress}%</span>
                                </div>
                                <Progress
                                  value={course.progress}
                                  className="w-full"
                                />
                              </div>

                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{course.timeSpent}h learned</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    Last:{" "}
                                    {new Date(
                                      course.lastAccessed,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleResumeLesson(course.id)}
                                  className="flex-1"
                                  size="sm"
                                >
                                  <Play className="mr-2 h-4 w-4" />
                                  Continue
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleCourseClick(course.id)}
                                  size="sm"
                                >
                                  Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </HoverScale>
                      </StaggeredItem>
                    ))}
                  </StaggeredContainer>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-6 mt-8">
                {completedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      No completed courses yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Complete your enrolled courses to see them here
                    </p>
                  </div>
                ) : (
                  <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedCourses.map((course) => (
                      <StaggeredItem key={course.id}>
                        <HoverScale>
                          <Card className="overflow-hidden h-full">
                            <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
                              <Award className="h-12 w-12 text-green-600" />
                              <Badge className="absolute top-2 right-2 bg-green-600">
                                Completed
                              </Badge>
                            </div>
                            <CardHeader className="pb-3">
                              <CardTitle className="line-clamp-2">
                                {course.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                By {course.instructor.name}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1 text-green-600">
                                  <Award className="h-4 w-4" />
                                  <span>Certificate Earned</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{course.rating}</span>
                                </div>
                              </div>

                              <div className="text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    Completed:{" "}
                                    {new Date(
                                      course.completedDate,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => handleCourseClick(course.id)}
                                  className="flex-1"
                                  size="sm"
                                >
                                  <Play className="mr-2 h-4 w-4" />
                                  Review
                                </Button>
                                <Button size="sm" className="flex-1">
                                  <Download className="mr-2 h-4 w-4" />
                                  Certificate
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </HoverScale>
                      </StaggeredItem>
                    ))}
                  </StaggeredContainer>
                )}
              </TabsContent>

              <TabsContent value="wishlist" className="space-y-6 mt-8">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💝</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Save courses you're interested in to your wishlist
                  </p>
                  <Button onClick={() => navigate("/courses")}>
                    Browse Courses
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
