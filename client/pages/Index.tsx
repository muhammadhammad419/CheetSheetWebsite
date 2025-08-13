import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
  ParticleBackground,
} from "@/components/Animated";
import { 
  categories, 
  sampleCourses, 
  getPopularCourses, 
  getTopRatedCourses, 
  searchCourses,
  formatDuration,
  formatPrice,
  calculateDiscountPercentage,
  type Course 
} from "@/data/lms";
import {
  Search,
  Star,
  Users,
  Clock,
  Play,
  BookOpen,
  Award,
  TrendingUp,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    let courses = sampleCourses;

    if (selectedCategory !== "all") {
      courses = courses.filter(course => 
        course.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }

    if (selectedLevel !== "all") {
      courses = courses.filter(course => course.level === selectedLevel);
    }

    if (searchQuery) {
      courses = searchCourses(searchQuery);
    }

    return courses;
  }, [searchQuery, selectedCategory, selectedLevel]);

  const popularCourses = getPopularCourses();
  const topRatedCourses = getTopRatedCourses();

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <HoverScale>
      <Card 
        className="cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden"
        onClick={() => handleCourseClick(course.id)}
      >
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative">
          <Play className="h-12 w-12 text-primary" />
          {course.originalPrice && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              {calculateDiscountPercentage(course.originalPrice, course.price)}% OFF
            </Badge>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">{course.shortDescription}</CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{course.instructor.name}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-sm text-muted-foreground">({course.reviewsCount})</span>
            </div>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.totalDuration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.studentsEnrolled.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{formatPrice(course.price)}</span>
              {course.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>
            <Badge variant="secondary">{course.category}</Badge>
          </div>
        </CardContent>
      </Card>
    </HoverScale>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-accent/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Learn Without{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Limits
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Join millions of learners from around the world mastering new skills through our expert-led courses
                </motion.p>
              </div>

              <motion.div 
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="What do you want to learn?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg"
                  />
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {sampleCourses.length} Courses
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  57,000+ Students
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Award className="h-4 w-4 mr-2" />
                  Certificates Available
                </Badge>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose from our wide range of courses across different fields
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <StaggeredItem key={category.id}>
                <HoverScale>
                  <Card 
                    className="cursor-pointer transition-all duration-300 hover:shadow-xl group text-center"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardHeader>
                      <div className="text-6xl mb-4">{category.icon}</div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          {category.courseCount} courses
                        </Badge>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-accent/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Courses</h2>
                <p className="text-xl text-muted-foreground">
                  Most enrolled courses by our students
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/courses')}
                className="hidden md:flex"
              >
                View All Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <StaggeredItem key={course.id}>
                <CourseCard course={course} />
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Filters and Search Results */}
      {(searchQuery || selectedCategory !== "all") && (
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-auto">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full md:w-auto">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {filteredCourses.length} courses found
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {filteredCourses.length === 0 ? (
              <AnimatedSection>
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or browse our categories
                  </p>
                  <Button onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedLevel("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              </AnimatedSection>
            ) : (
              <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <StaggeredItem key={course.id}>
                    <CourseCard course={course} />
                  </StaggeredItem>
                ))}
              </StaggeredContainer>
            )}
          </div>
        </section>
      )}

      {/* Top Rated */}
      {!searchQuery && selectedCategory === "all" && (
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Courses</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Highest rated courses by our student community
                </p>
              </div>
            </AnimatedSection>

            <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topRatedCourses.map((course) => (
                <StaggeredItem key={course.id}>
                  <CourseCard course={course} />
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-accent/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LearnHub?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join thousands of learners who trust us for their skill development
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-4 gap-8">
            <StaggeredItem>
              <HoverScale>
                <Card className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4">📚</div>
                    <CardTitle className="text-3xl font-bold text-primary">500+</CardTitle>
                    <CardDescription>Expert-led Courses</CardDescription>
                  </CardHeader>
                </Card>
              </HoverScale>
            </StaggeredItem>

            <StaggeredItem>
              <HoverScale>
                <Card className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4">🎓</div>
                    <CardTitle className="text-3xl font-bold text-primary">57k+</CardTitle>
                    <CardDescription>Active Students</CardDescription>
                  </CardHeader>
                </Card>
              </HoverScale>
            </StaggeredItem>

            <StaggeredItem>
              <HoverScale>
                <Card className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4">⭐</div>
                    <CardTitle className="text-3xl font-bold text-primary">4.8</CardTitle>
                    <CardDescription>Average Rating</CardDescription>
                  </CardHeader>
                </Card>
              </HoverScale>
            </StaggeredItem>

            <StaggeredItem>
              <HoverScale>
                <Card className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4">🏆</div>
                    <CardTitle className="text-3xl font-bold text-primary">95%</CardTitle>
                    <CardDescription>Completion Rate</CardDescription>
                  </CardHeader>
                </Card>
              </HoverScale>
            </StaggeredItem>
          </StaggeredContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">LearnHub</h3>
                <p className="text-sm">Empowering learners worldwide with quality education.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li>Web Development</li>
                  <li>Data Science</li>
                  <li>Design</li>
                  <li>Business</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Refund Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t">
              <p>&copy; 2024 LearnHub. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
