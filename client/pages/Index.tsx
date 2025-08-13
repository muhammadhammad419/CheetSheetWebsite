import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Palette,
  Send,
  Download,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const skills = {
    frontend: [
      "React",
      "TypeScript",
      "Next.js",
      "Vue.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "SASS",
    ],
    backend: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "GraphQL",
    ],
    tools: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "Figma",
      "VS Code",
      "Postman",
      "Jest",
    ],
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "#",
      live: "#",
      image: "/placeholder.svg",
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, file sharing, and team communication features.",
      tech: ["Next.js", "TypeScript", "MongoDB", "Socket.io"],
      github: "#",
      live: "#",
      image: "/placeholder.svg",
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Data visualization platform with machine learning insights and custom reporting capabilities.",
      tech: ["Vue.js", "Python", "TensorFlow", "Chart.js"],
      github: "#",
      live: "#",
      image: "/placeholder.svg",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Alex Johnson
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  Full Stack Developer
                </p>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  I craft exceptional digital experiences by combining creative design with robust development. 
                  Specializing in modern web technologies and scalable solutions.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>

              <div className="flex space-x-6">
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Github className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12">
                  <Mail className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 w-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-primary/10 to-transparent rounded-full h-full w-full flex items-center justify-center border border-primary/20">
                  <Code2 className="h-32 w-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate about creating digital solutions that make a difference
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                With over 5 years of experience in full-stack development, I've had the privilege of 
                working with startups and enterprises to build scalable web applications that serve 
                millions of users.
              </p>
              <p className="text-lg leading-relaxed">
                I specialize in modern JavaScript frameworks, cloud architecture, and user experience 
                design. My approach combines technical expertise with creative problem-solving to 
                deliver exceptional results.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you'll find me contributing to open-source projects, mentoring 
                junior developers, or exploring the latest technologies in web development.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">50+ Projects</h3>
                  <p className="text-sm text-muted-foreground">Delivered worldwide</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Server className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">5+ Years</h3>
                  <p className="text-sm text-muted-foreground">Experience</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The tools and technologies I use to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-6 w-6 text-primary" />
                  Frontend
                </CardTitle>
                <CardDescription>
                  Building responsive and interactive user interfaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  Backend
                </CardTitle>
                <CardDescription>
                  Developing robust server-side applications and APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-6 w-6 text-primary" />
                  Tools & Others
                </CardTitle>
                <CardDescription>
                  Development tools and platforms I work with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <Code2 className="h-12 w-12 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your next project? Let's discuss how we can work together
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Let's create something amazing together</h3>
                <p className="text-muted-foreground mb-6">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you're a company looking to hire, or you have a project idea, 
                  I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>alex.johnson@email.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span>linkedin.com/in/alex-johnson</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-primary" />
                  <span>github.com/alex-johnson</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
