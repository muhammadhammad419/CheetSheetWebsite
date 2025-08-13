import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
} from "@/components/Animated";
import { 
  dsaProblems, 
  problemCategories, 
  getDifficultyColor, 
  searchProblems,
  type DSAProblem, 
  type Difficulty 
} from "@/data/dsaProblems";
import {
  Search,
  Code2,
  Plus,
  Edit,
  Trash2,
  Play,
  Filter,
  BookOpen,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Lightbulb,
  Building,
} from "lucide-react";

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedProblem, setSelectedProblem] = useState<DSAProblem | null>(null);
  const [isAddingProblem, setIsAddingProblem] = useState(false);

  const filteredProblems = useMemo(() => {
    let problems = dsaProblems;

    if (selectedCategory !== "all") {
      problems = problems.filter(p => p.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      problems = problems.filter(p => p.difficulty === selectedDifficulty);
    }

    if (searchQuery) {
      problems = searchProblems(searchQuery);
    }

    return problems;
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const difficultyStats = useMemo(() => {
    const stats = { Easy: 0, Medium: 0, Hard: 0 };
    filteredProblems.forEach(p => stats[p.difficulty]++);
    return stats;
  }, [filteredProblems]);

  const handleProblemClick = (problem: DSAProblem) => {
    setSelectedProblem(problem);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center space-y-4">
              <motion.h1 
                className="text-3xl md:text-5xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                DSA Problems{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  & Solutions
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Practice data structures and algorithms with curated problems and detailed solutions
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Filters */}
              <AnimatedSection direction="left">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {problemCategories.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Difficulties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="Easy">🟢 Easy</SelectItem>
                        <SelectItem value="Medium">🟡 Medium</SelectItem>
                        <SelectItem value="Hard">🔴 Hard</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button className="w-full" onClick={() => setIsAddingProblem(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Problem
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection direction="left" delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Problems</span>
                      <Badge variant="secondary">{filteredProblems.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-600">Easy</span>
                      <Badge className="bg-green-500">{difficultyStats.Easy}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-yellow-600">Medium</span>
                      <Badge className="bg-yellow-500">{difficultyStats.Medium}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-600">Hard</span>
                      <Badge className="bg-red-500">{difficultyStats.Hard}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Categories */}
              <AnimatedSection direction="left" delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {problemCategories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.name ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                        <Badge variant="outline" className="ml-auto">
                          {category.problems.length}
                        </Badge>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedProblem ? (
              /* Problem Detail View */
              <AnimatedSection>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedProblem(null)}
                            >
                              ← Back
                            </Button>
                            <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                              {selectedProblem.difficulty}
                            </Badge>
                            <Badge variant="outline">{selectedProblem.category}</Badge>
                          </div>
                          <CardTitle className="text-2xl">{selectedProblem.title}</CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            {selectedProblem.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Solve
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Tabs defaultValue="description" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="solutions">Solutions</TabsTrigger>
                      <TabsTrigger value="hints">Hints</TabsTrigger>
                      <TabsTrigger value="companies">Companies</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Problem Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="prose max-w-none">
                            <p className="whitespace-pre-line">{selectedProblem.description}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Examples</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {selectedProblem.examples.map((example, index) => (
                            <div key={index} className="border rounded-lg p-4 bg-muted/50">
                              <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                              <div className="space-y-2 text-sm">
                                <div><strong>Input:</strong> {example.input}</div>
                                <div><strong>Output:</strong> {example.expectedOutput}</div>
                                {example.explanation && (
                                  <div><strong>Explanation:</strong> {example.explanation}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {selectedProblem.constraints && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Constraints</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {selectedProblem.constraints.map((constraint, index) => (
                                <li key={index}>{constraint}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>

                    <TabsContent value="solutions" className="space-y-4">
                      {selectedProblem.solutions.map((solution, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span>Solution {index + 1} - {solution.language}</span>
                              <div className="flex gap-2 text-sm">
                                <Badge variant="outline">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {solution.timeComplexity}
                                </Badge>
                                <Badge variant="outline">
                                  <Target className="h-3 w-3 mr-1" />
                                  {solution.spaceComplexity}
                                </Badge>
                              </div>
                            </CardTitle>
                            {solution.explanation && (
                              <CardDescription>{solution.explanation}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <SyntaxHighlighter
                              code={solution.code}
                              language={solution.language}
                              title={`${solution.language} Solution`}
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="hints" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5" />
                            Hints
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedProblem.hints ? (
                            <div className="space-y-3">
                              {selectedProblem.hints.map((hint, index) => (
                                <div key={index} className="border rounded-lg p-3 bg-muted/50">
                                  <div className="flex items-start gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      Hint {index + 1}
                                    </Badge>
                                  </div>
                                  <p className="mt-2 text-sm">{hint}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No hints available for this problem.</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="companies" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            Companies
                          </CardTitle>
                          <CardDescription>
                            Companies that have asked this problem in interviews
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {selectedProblem.companies ? (
                            <div className="flex flex-wrap gap-2">
                              {selectedProblem.companies.map((company, index) => (
                                <Badge key={index} variant="outline">
                                  {company}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No company data available.</p>
                          )}
                          
                          {selectedProblem.frequency && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Interview Frequency:</span>
                                <Badge className="bg-blue-500">
                                  {selectedProblem.frequency}%
                                </Badge>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </AnimatedSection>
            ) : (
              /* Problems List */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Problems ({filteredProblems.length})
                  </h2>
                </div>

                {filteredProblems.length === 0 ? (
                  <AnimatedSection>
                    <div className="text-center py-12">
                      <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No problems found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search criteria or add a new problem
                      </p>
                      <Button onClick={() => setIsAddingProblem(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add First Problem
                      </Button>
                    </div>
                  </AnimatedSection>
                ) : (
                  <StaggeredContainer className="space-y-4">
                    {filteredProblems.map((problem, index) => (
                      <StaggeredItem key={problem.id}>
                        <HoverScale>
                          <Card 
                            className="cursor-pointer transition-all duration-200 hover:shadow-lg"
                            onClick={() => handleProblemClick(problem)}
                          >
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Badge className={getDifficultyColor(problem.difficulty)}>
                                      {problem.difficulty}
                                    </Badge>
                                    <Badge variant="outline">{problem.category}</Badge>
                                    {problem.frequency && problem.frequency > 80 && (
                                      <Badge variant="secondary">🔥 Popular</Badge>
                                    )}
                                  </div>
                                  <CardTitle className="hover:text-primary transition-colors">
                                    {problem.title}
                                  </CardTitle>
                                  <CardDescription className="overflow-hidden" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                  }}>
                                    {problem.description}
                                  </CardDescription>
                                  <div className="flex gap-1 flex-wrap">
                                    {problem.tags.slice(0, 3).map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {problem.tags.length > 3 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{problem.tags.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </HoverScale>
                      </StaggeredItem>
                    ))}
                  </StaggeredContainer>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
