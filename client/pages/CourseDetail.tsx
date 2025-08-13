import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
} from "@/components/Animated";
import { 
  getCourseById, 
  formatDuration, 
  formatPrice, 
  calculateDiscountPercentage,
  type Course,
  type Chapter 
} from "@/data/lms";
import {
  Star,
  Users,
  Clock,
  Play,
  BookOpen,
  Award,
  Download,
  Globe,
  ChevronDown,
  ChevronRight,
  Check,
  Lock,
  ArrowLeft,
  Share,
  Heart,
  ShoppingCart,
} from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (courseId) {
      const foundCourse = getCourseById(courseId);
      setCourse(foundCourse || null);
      // Expand first chapter by default
      if (foundCourse && foundCourse.chapters.length > 0) {
        setExpandedChapters(new Set([foundCourse.chapters[0].id]));
      }
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/courses")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    // In a real app, this would make an API call
    console.log("Enrolled in course:", course.id);
  };

  const handleStartLearning = () => {
    // Navigate to first lesson
    if (course.chapters.length > 0 && course.chapters[0].lessons.length > 0) {
      navigate(`/course/${course.id}/lesson/${course.chapters[0].lessons[0].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Course Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/courses")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Course Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge className={
                      course.level === "Beginner" ? "bg-green-500" :
                      course.level === "Intermediate" ? "bg-yellow-500" : "bg-red-500"
                    }>
                      {course.level}
                    </Badge>
                  </div>
                  
                  <motion.h1 
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {course.title}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-muted-foreground mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {course.shortDescription}
                  </motion.p>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviewsCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.studentsEnrolled.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(course.totalDuration)} total length</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      <span>{course.language}</span>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={course.instructor.avatar} />
                    <AvatarFallback>
                      {course.instructor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{course.instructor.name}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{course.instructor.totalStudents?.toLocaleString()} students</span>
                      <span>{course.instructor.totalCourses} courses</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{course.instructor.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="overflow-hidden">
                    {/* Course Preview */}
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative">
                      <Play className="h-16 w-16 text-primary" />
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="absolute top-4 right-4"
                      >
                        Preview
                      </Button>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold">{formatPrice(course.price)}</span>
                            {course.originalPrice && (
                              <>
                                <span className="text-lg text-muted-foreground line-through">
                                  {formatPrice(course.originalPrice)}
                                </span>
                                <Badge className="bg-red-500">
                                  {calculateDiscountPercentage(course.originalPrice, course.price)}% OFF
                                </Badge>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">30-day money-back guarantee</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {isEnrolled ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="font-medium">You're enrolled!</span>
                          </div>
                          <Progress value={0} className="w-full" />
                          <p className="text-sm text-muted-foreground">0% complete</p>
                          <Button 
                            onClick={handleStartLearning} 
                            className="w-full" 
                            size="lg"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Start Learning
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Button 
                            onClick={handleEnroll} 
                            className="w-full" 
                            size="lg"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Enroll Now
                          </Button>
                          <Button variant="outline" className="w-full">
                            Add to Wishlist
                            <Heart className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      <div className="flex justify-center">
                        <Button variant="ghost" size="sm">
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                      </div>

                      {/* Course includes */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">This course includes:</h4>
                        <ul className="space-y-2 text-sm">
                          {course.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          <li className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-green-600" />
                            <span>{course.totalLessons} lessons</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-600" />
                            <span>{formatDuration(course.totalDuration)} on-demand video</span>
                          </li>
                          {course.certificate && (
                            <li className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-green-600" />
                              <span>Certificate of completion</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p className={showFullDescription ? "" : "line-clamp-4"}>
                          {course.description}
                        </p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto"
                          onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                          {showFullDescription ? "Show less" : "Show more"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>What you'll learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.learningObjectives.map((objective, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Course Content</h3>
                    <div className="text-sm text-muted-foreground">
                      {course.chapters.length} sections • {course.totalLessons} lectures • {formatDuration(course.totalDuration)} total length
                    </div>
                  </div>

                  <div className="space-y-4">
                    {course.chapters.map((chapter, index) => (
                      <Card key={chapter.id}>
                        <CardHeader 
                          className="cursor-pointer hover:bg-accent/50 transition-colors"
                          onClick={() => toggleChapter(chapter.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                Section {index + 1}: {chapter.title}
                              </CardTitle>
                              <CardDescription>
                                {chapter.lessons.length} lectures • {formatDuration(
                                  chapter.lessons.reduce((acc, lesson) => acc + lesson.duration, 0)
                                )}
                              </CardDescription>
                            </div>
                            {expandedChapters.has(chapter.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </CardHeader>

                        {expandedChapters.has(chapter.id) && (
                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              {chapter.lessons.map((lesson) => (
                                <div 
                                  key={lesson.id} 
                                  className="flex items-center justify-between p-3 hover:bg-accent/20 rounded-lg transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    {lesson.isFree ? (
                                      <Play className="h-4 w-4 text-primary" />
                                    ) : (
                                      <Lock className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <div>
                                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                                      <p className="text-xs text-muted-foreground">{lesson.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline" className="text-xs">
                                      {lesson.type}
                                    </Badge>
                                    <span>{formatDuration(lesson.duration)}</span>
                                    {lesson.isFree && (
                                      <Button variant="link" size="sm" className="text-xs h-auto p-0">
                                        Preview
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={course.instructor.avatar} />
                          <AvatarFallback>
                            {course.instructor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{course.instructor.name}</CardTitle>
                          <CardDescription className="text-base">
                            {course.instructor.specialization?.join(', ')}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.instructor.rating} instructor rating</span>
                            </div>
                            <span>{course.instructor.totalStudents?.toLocaleString()} students</span>
                            <span>{course.instructor.totalCourses} courses</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{course.instructor.bio}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Feedback</CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold">{course.rating}</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Course Rating • {course.reviewsCount} reviews
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Sample reviews */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">Student {i}</h4>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">2 days ago</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Great course! The instructor explains concepts clearly and the hands-on projects really help solidify the learning.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              {/* Related Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>More courses by {course.instructor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-3 p-3 hover:bg-accent/20 rounded-lg transition-colors cursor-pointer">
                      <div className="w-16 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded flex items-center justify-center">
                        <Play className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">Advanced React Patterns Course {i}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">4.8</span>
                        </div>
                        <div className="text-sm font-medium text-primary">$79.99</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
