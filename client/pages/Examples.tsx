import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
} from "@/components/Animated";
import {
  programmingLanguages,
  type ProgrammingLanguage,
  type CodeExample,
} from "@/data/languages";
import {
  Search,
  Code2,
  Plus,
  Edit,
  Trash2,
  Copy,
  Filter,
  BookOpen,
  Zap,
} from "lucide-react";

export default function Examples() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddingExample, setIsAddingExample] = useState(false);
  const [editingExample, setEditingExample] = useState<CodeExample | null>(
    null,
  );

  const [newExample, setNewExample] = useState({
    title: "",
    description: "",
    code: "",
  });

  const filteredExamples = useMemo(() => {
    let allExamples: Array<
      CodeExample & { language: string; category: string }
    > = [];

    programmingLanguages.forEach((lang) => {
      if (selectedLanguage === "all" || lang.id === selectedLanguage) {
        lang.categories.forEach((cat) => {
          if (selectedCategory === "all" || cat.name === selectedCategory) {
            cat.examples.forEach((example) => {
              allExamples.push({
                ...example,
                language: lang.name,
                category: cat.name,
              });
            });
          }
        });
      }
    });

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      allExamples = allExamples.filter(
        (example) =>
          example.title.toLowerCase().includes(query) ||
          example.description.toLowerCase().includes(query) ||
          example.code.toLowerCase().includes(query) ||
          example.language.toLowerCase().includes(query) ||
          example.category.toLowerCase().includes(query),
      );
    }

    return allExamples;
  }, [searchQuery, selectedLanguage, selectedCategory]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    programmingLanguages.forEach((lang) => {
      lang.categories.forEach((cat) => categories.add(cat.name));
    });
    return Array.from(categories);
  }, []);

  const handleAddExample = () => {
    // In a real app, this would save to a database
    console.log("Adding example:", newExample);
    setNewExample({ title: "", description: "", code: "" });
    setIsAddingExample(false);
  };

  const handleEditExample = (example: CodeExample) => {
    setEditingExample(example);
  };

  const handleDeleteExample = (example: CodeExample) => {
    // In a real app, this would delete from a database
    console.log("Deleting example:", example);
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
                Code Examples{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Management
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Browse, edit, and manage all programming language examples and
                code snippets
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Search & Filter Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search examples..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select
                    value={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Languages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      {programmingLanguages.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.icon} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Dialog
                    open={isAddingExample}
                    onOpenChange={setIsAddingExample}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Example
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Code Example</DialogTitle>
                        <DialogDescription>
                          Create a new code example for the selected language
                          and category.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            value={newExample.title}
                            onChange={(e) =>
                              setNewExample({
                                ...newExample,
                                title: e.target.value,
                              })
                            }
                            placeholder="Example title..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Description
                          </label>
                          <Textarea
                            value={newExample.description}
                            onChange={(e) =>
                              setNewExample({
                                ...newExample,
                                description: e.target.value,
                              })
                            }
                            placeholder="Example description..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Code</label>
                          <Textarea
                            value={newExample.code}
                            onChange={(e) =>
                              setNewExample({
                                ...newExample,
                                code: e.target.value,
                              })
                            }
                            placeholder="Paste your code here..."
                            rows={10}
                            className="font-mono"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsAddingExample(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleAddExample}>
                            Add Example
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Examples ({filteredExamples.length})
              </h2>
              <div className="flex gap-2">
                <Badge variant="secondary">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {filteredExamples.length} Examples
                </Badge>
              </div>
            </div>
          </div>

          {filteredExamples.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-12">
                <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No examples found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or add a new example
                </p>
                <Button onClick={() => setIsAddingExample(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Example
                </Button>
              </div>
            </AnimatedSection>
          ) : (
            <StaggeredContainer className="grid lg:grid-cols-2 gap-6">
              {filteredExamples.map((example, index) => (
                <StaggeredItem
                  key={`${example.language}-${example.category}-${index}`}
                >
                  <HoverScale>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="flex items-center gap-2">
                              <Zap className="h-5 w-5 text-primary" />
                              {example.title}
                            </CardTitle>
                            <CardDescription>
                              {example.description}
                            </CardDescription>
                            <div className="flex gap-2">
                              <Badge variant="outline">
                                {example.language}
                              </Badge>
                              <Badge variant="secondary">
                                {example.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditExample(example)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteExample(example)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <SyntaxHighlighter
                          code={example.code}
                          language={
                            selectedLanguage !== "all"
                              ? selectedLanguage
                              : "javascript"
                          }
                          title={example.title}
                        />
                      </CardContent>
                    </Card>
                  </HoverScale>
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          )}
        </div>
      </section>
    </div>
  );
}
