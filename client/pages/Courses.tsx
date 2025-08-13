import { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
} from "@/components/Animated";
import {
  categories,
  sampleCourses,
  searchCourses,
  formatDuration,
  formatPrice,
  calculateDiscountPercentage,
  type Course,
} from "@/data/lms";
import {
  Search,
  Star,
  Users,
  Clock,
  Play,
  Filter,
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronDown,
} from "lucide-react";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const filteredAndSortedCourses = useMemo(() => {
    let courses = sampleCourses;

    // Apply filters
    if (selectedCategory !== "all") {
      courses = courses.filter(
        (course) =>
          course.category.toLowerCase().replace(/\s+/g, "-") ===
          selectedCategory,
      );
    }

    if (selectedLevel !== "all") {
      courses = courses.filter((course) => course.level === selectedLevel);
    }

    if (selectedRating !== "all") {
      const minRating = parseFloat(selectedRating);
      courses = courses.filter((course) => course.rating >= minRating);
    }

    if (priceRange !== "all") {
      courses = courses.filter((course) => {
        switch (priceRange) {
          case "free":
            return course.price === 0;
          case "under-50":
            return course.price > 0 && course.price < 50;
          case "50-100":
            return course.price >= 50 && course.price <= 100;
          case "over-100":
            return course.price > 100;
          default:
            return true;
        }
      });
    }

    if (searchQuery) {
      courses = searchCourses(searchQuery);
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        courses = courses.sort(
          (a, b) => b.studentsEnrolled - a.studentsEnrolled,
        );
        break;
      case "rating":
        courses = courses.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        courses = courses.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        );
        break;
      case "price-low":
        courses = courses.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        courses = courses.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return courses;
  }, [
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedRating,
    priceRange,
    sortBy,
  ]);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedRating("all");
    setPriceRange("all");
    setSortBy("popular");
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <HoverScale>
      <Card
        className="cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden h-full"
        onClick={() => handleCourseClick(course.id)}
      >
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative">
          <Play className="h-12 w-12 text-primary" />
          {course.originalPrice && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              {calculateDiscountPercentage(course.originalPrice, course.price)}%
              OFF
            </Badge>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.shortDescription}
          </CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{course.instructor.name}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({course.reviewsCount})
              </span>
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
              <span className="text-lg font-bold">
                {formatPrice(course.price)}
              </span>
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

  const CourseListItem = ({ course }: { course: Course }) => (
    <HoverScale>
      <Card
        className="cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={() => handleCourseClick(course.id)}
      >
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-32 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded flex items-center justify-center flex-shrink-0">
              <Play className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {course.shortDescription}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    By {course.instructor.name}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                      <span>({course.reviewsCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(course.totalDuration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.studentsEnrolled.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{course.level}</Badge>
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold mb-1">
                    {formatPrice(course.price)}
                  </div>
                  {course.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      {formatPrice(course.originalPrice)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </HoverScale>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  All Courses
                </h1>
                <p className="text-xl text-muted-foreground">
                  Discover our comprehensive collection of expert-led courses
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between lg:hidden">
                  <h3 className="font-semibold">Filters</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    {showFilters ? "Hide" : "Show"} Filters
                  </Button>
                </div>

                <div
                  className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Category</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedCategory === "all"}
                            onCheckedChange={() => setSelectedCategory("all")}
                          />
                          <span className="text-sm">All Categories</span>
                        </label>
                        {categories.map((category) => (
                          <label
                            key={category.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={selectedCategory === category.id}
                              onCheckedChange={() =>
                                setSelectedCategory(category.id)
                              }
                            />
                            <span className="text-sm">{category.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({category.courseCount})
                            </span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={selectedLevel}
                        onValueChange={setSelectedLevel}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={selectedRating}
                        onValueChange={setSelectedRating}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Ratings" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Ratings</SelectItem>
                          <SelectItem value="4.5">4.5 & up</SelectItem>
                          <SelectItem value="4.0">4.0 & up</SelectItem>
                          <SelectItem value="3.5">3.5 & up</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={priceRange} onValueChange={setPriceRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Prices" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="under-50">Under $50</SelectItem>
                          <SelectItem value="50-100">$50 - $100</SelectItem>
                          <SelectItem value="over-100">Over $100</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Results Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {filteredAndSortedCourses.length} courses found
                    </h2>
                    {searchQuery && (
                      <p className="text-sm text-muted-foreground">
                        Search results for "{searchQuery}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-auto">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Course Results */}
                {filteredAndSortedCourses.length === 0 ? (
                  <AnimatedSection>
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-semibold mb-2">
                        No courses found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search criteria or browse our
                        categories
                      </p>
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    </div>
                  </AnimatedSection>
                ) : viewMode === "grid" ? (
                  <StaggeredContainer className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedCourses.map((course) => (
                      <StaggeredItem key={course.id}>
                        <CourseCard course={course} />
                      </StaggeredItem>
                    ))}
                  </StaggeredContainer>
                ) : (
                  <div className="space-y-4">
                    {filteredAndSortedCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <CourseListItem course={course} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
