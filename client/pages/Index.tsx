import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import SyntaxHighlighter from "@/components/SyntaxHighlighter";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  HoverScale,
  ParticleBackground,
} from "@/components/Animated";
import { programmingLanguages, searchLanguages, type ProgrammingLanguage } from "@/data/languages";
import {
  Search,
  Code2,
  Book,
  Zap,
  Star,
  Filter,
  ChevronRight,
  Copy,
  ExternalLink,
} from "lucide-react";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return programmingLanguages;
    return searchLanguages(searchQuery);
  }, [searchQuery]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    programmingLanguages.forEach(lang => {
      lang.categories.forEach(cat => categories.add(cat.name));
    });
    return Array.from(categories);
  }, []);

  const handleLanguageSelect = (language: ProgrammingLanguage) => {
    setSelectedLanguage(language);
    setSelectedCategory(language.categories[0]?.name || "");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-background to-accent/20 relative z-10">
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
                  Programming Language{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Cheat Sheets
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Quick reference guides for popular programming languages. Copy, paste, and code faster.
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
                    placeholder="Search languages, syntax, or concepts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg"
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
                  <Star className="h-4 w-4 mr-2" />
                  {programmingLanguages.length} Languages
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Code2 className="h-4 w-4 mr-2" />
                  200+ Examples
                </Badge>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy-Paste Ready
                </Badge>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Languages Grid */}
      <section id="languages" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Language</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Select a programming language to explore syntax examples and quick references
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredLanguages.map((language) => (
              <StaggeredItem key={language.id}>
                <HoverScale>
                  <Card 
                    className="cursor-pointer transition-all duration-300 hover:shadow-xl group"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <CardHeader className="text-center">
                      <div className="text-6xl mb-4">{language.icon}</div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {language.name}
                      </CardTitle>
                      <CardDescription>{language.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {language.categories.slice(0, 3).map((category) => (
                          <Badge key={category.name} variant="outline" className="text-xs">
                            {category.name}
                          </Badge>
                        ))}
                        {language.categories.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{language.categories.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <Button className="w-full mt-4 group-hover:bg-primary/90 transition-colors">
                        View Examples
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </HoverScale>
              </StaggeredItem>
            ))}
          </StaggeredContainer>

          {searchQuery && filteredLanguages.length === 0 && (
            <AnimatedSection>
              <div className="text-center py-12">
                <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No languages found</h3>
                <p className="text-muted-foreground">
                  Try searching for "JavaScript", "Python", "React", or other programming terms
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Language Details */}
      {selectedLanguage && (
        <section id="details" className="py-20 bg-accent/20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="text-6xl mb-4">{selectedLanguage.icon}</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedLanguage.name}</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {selectedLanguage.description}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Categories Sidebar */}
              <AnimatedSection direction="left">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedLanguage.categories.map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </AnimatedSection>

              {/* Examples Content */}
              <div className="lg:col-span-3">
                <AnimatedSection direction="right">
                  {selectedCategory && (
                    <div className="space-y-8">
                      {selectedLanguage.categories
                        .find(cat => cat.name === selectedCategory)
                        ?.examples.map((example, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Zap className="h-5 w-5 text-primary" />
                                  {example.title}
                                </CardTitle>
                                <CardDescription>{example.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <SyntaxHighlighter
                                  code={example.code}
                                  language={selectedLanguage.id}
                                  title={example.title}
                                />
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  )}
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use CodeCheat?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The fastest way to find and copy code snippets for your projects
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-3 gap-8">
            <StaggeredItem>
              <HoverScale>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="text-4xl mb-4">⚡</div>
                    <CardTitle>Lightning Fast</CardTitle>
                    <CardDescription>
                      Find the syntax you need in seconds, not minutes
                    </CardDescription>
                  </CardHeader>
                </Card>
              </HoverScale>
            </StaggeredItem>

            <StaggeredItem>
              <HoverScale>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="text-4xl mb-4">📚</div>
                    <CardTitle>Comprehensive</CardTitle>
                    <CardDescription>
                      Covers the most popular programming languages and frameworks
                    </CardDescription>
                  </CardHeader>
                </Card>
              </HoverScale>
            </StaggeredItem>

            <StaggeredItem>
              <HoverScale>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="text-4xl mb-4">🔄</div>
                    <CardTitle>Copy & Paste</CardTitle>
                    <CardDescription>
                      One-click copying for all code examples and snippets
                    </CardDescription>
                  </CardHeader>
                </Card>
              </HoverScale>
            </StaggeredItem>
          </StaggeredContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>&copy; 2024 CodeCheat. Built for developers, by developers.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
