import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { TypingAnimation } from "@/components/TypingAnimation";
import {
  AnimatedSection,
  StaggeredContainer,
  StaggeredItem,
  FloatingIcon,
  HoverScale,
  ParticleBackground,
  GlowingButton,
} from "@/components/Animated";
import { useCountAnimation } from "@/hooks/useScrollAnimation";
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

  const projectsCount = useCountAnimation(50);
  const experienceCount = useCountAnimation(5);
  const clientsCount = useCountAnimation(25);

  useEffect(() => {
    const timer = setTimeout(() => {
      projectsCount.startAnimation();
      experienceCount.startAnimation();
      clientsCount.startAnimation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-background to-accent/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Alex Johnson
                    </span>
                  </motion.h1>
                  <motion.div
                    className="text-xl md:text-2xl text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <TypingAnimation
                      words={["Full Stack Developer", "React Specialist", "Node.js Expert", "UI/UX Enthusiast"]}
                      className="font-semibold"
                    />
                  </motion.div>
                  <motion.p
                    className="text-lg text-muted-foreground max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    I craft exceptional digital experiences by combining creative design with robust development.
                    Specializing in modern web technologies and scalable solutions.
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <GlowingButton
                    size="lg"
                    className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-all duration-300"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </GlowingButton>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex space-x-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  {[Github, Linkedin, Mail].map((Icon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button variant="ghost" size="icon" className="h-12 w-12">
                        <Icon className="h-6 w-6" />
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div className="relative">
                <motion.div
                  className="relative h-96 w-96 mx-auto"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  <div className="relative bg-gradient-to-br from-primary/10 to-transparent rounded-full h-full w-full flex items-center justify-center border border-primary/20">
                    <FloatingIcon>
                      <Code2 className="h-32 w-32 text-primary" />
                    </FloatingIcon>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Passionate about creating digital solutions that make a difference
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" delay={0.2}>
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
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div className="grid grid-cols-2 gap-6">
                <HoverScale>
                  <Card className="transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                      </motion.div>
                      <h3 className="font-semibold mb-2">{projectsCount.count}+ Projects</h3>
                      <p className="text-sm text-muted-foreground">Delivered worldwide</p>
                    </CardContent>
                  </Card>
                </HoverScale>
                <HoverScale>
                  <Card className="transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Server className="h-12 w-12 text-primary mx-auto mb-4" />
                      </motion.div>
                      <h3 className="font-semibold mb-2">{experienceCount.count}+ Years</h3>
                      <p className="text-sm text-muted-foreground">Experience</p>
                    </CardContent>
                  </Card>
                </HoverScale>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-accent/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The tools and technologies I use to bring ideas to life
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-3 gap-8">
            <StaggeredItem>
              <HoverScale>
                <Card className="h-full transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Smartphone className="h-6 w-6 text-primary" />
                      </motion.div>
                      Frontend
                    </CardTitle>
                    <CardDescription>
                      Building responsive and interactive user interfaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="secondary">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </StaggeredItem>

            <StaggeredItem>
              <HoverScale>
                <Card className="h-full transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Database className="h-6 w-6 text-primary" />
                      </motion.div>
                      Backend
                    </CardTitle>
                    <CardDescription>
                      Developing robust server-side applications and APIs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="secondary">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </StaggeredItem>

            <StaggeredItem>
              <HoverScale>
                <Card className="h-full transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Palette className="h-6 w-6 text-primary" />
                      </motion.div>
                      Tools & Others
                    </CardTitle>
                    <CardDescription>
                      Development tools and platforms I work with
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="secondary">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </HoverScale>
            </StaggeredItem>
          </StaggeredContainer>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A showcase of my recent work and personal projects
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <StaggeredItem key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-primary/10"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <FloatingIcon>
                        <Code2 className="h-12 w-12 text-primary" />
                      </FloatingIcon>
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: techIndex * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button variant="outline" size="sm" className="w-full">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </Button>
                        </motion.div>
                        <motion.div
                          className="flex-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button size="sm" className="w-full">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-accent/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to start your next project? Let's discuss how we can work together
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left" delay={0.2}>
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
                  {[
                    { icon: Mail, text: "alex.johnson@email.com" },
                    { icon: Linkedin, text: "linkedin.com/in/alex-johnson" },
                    { icon: Github, text: "github.com/alex-johnson" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <HoverScale>
                <Card className="transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle>Send me a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Input
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Input
                          type="email"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Textarea
                          placeholder="Your Message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <GlowingButton
                          type="submit"
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium transition-all duration-300"
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </GlowingButton>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </HoverScale>
            </AnimatedSection>
          </div>
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
            <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
