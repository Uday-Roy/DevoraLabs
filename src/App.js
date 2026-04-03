import "./index.css";

import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";

import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import {
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  CheckCircle,
  Star,
  Layout,
  Sparkles,
  School,
  Coffee,
  Scissors,
  Briefcase,
  Cpu,
  Zap,
  TrendingUp,
  DollarSign,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react";

// Theme Context
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

// Custom hook for scroll reveal animation (fixed cleanup)
const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  return ref;
};

// Navbar Component
const Navbar = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e, href, name) => {
    e.preventDefault();
    setActiveLink(name.toLowerCase());
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    // <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    //<nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <nav className="sticky top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg ...">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home", "home")}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Devora Labs
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.name)}
                className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${
                  activeLink === link.name.toLowerCase()
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : ""
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.name)}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const [animatedTextIndex, setAnimatedTextIndex] = useState(0);
  const animatedTexts = ["Web Apps", "Mobile Apps", "AI Solutions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20">
              <Sparkles
                size={16}
                className="text-blue-600 dark:text-blue-400"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🚀 AI-Powered Development Agency
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                We Build Smart, Scalable Software
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                for Modern Businesses
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              We design and develop high-performance web and mobile applications
              for schools, businesses, restaurants, and startups.
            </p>

            <div className="flex items-center gap-2 text-lg">
              <span className="text-gray-600 dark:text-gray-400">
                Delivering:
              </span>
              <div className="relative h-8 overflow-hidden">
                <div
                  className="absolute w-full transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateY(-${animatedTextIndex * 100}%)`,
                  }}
                >
                  {animatedTexts.map((text, idx) => (
                    <div
                      key={idx}
                      className="h-8 flex items-center text-blue-600 dark:text-blue-400 font-semibold"
                    >
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2">
                Get Started{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                View Projects
              </button>
            </div>

            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  10+ Projects Delivered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-yellow-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layout size={20} className="text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Modern UI/UX
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                  dashboard.devoralabs.com
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                    <p className="text-sm opacity-90">Total Revenue</p>
                    <p className="text-2xl font-bold">$48,293</p>
                    <p className="text-xs opacity-80">+20.1% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                    <p className="text-sm opacity-90">Active Users</p>
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-xs opacity-80">+15% this week</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Monthly Growth
                    </span>
                    <span className="text-green-500">+34%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Apps
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        24
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Clients
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        18
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Satisfaction
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        98%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const services = [
  {
    icon: School,
    title: "School Management System",
    desc: "Complete ERP solution for educational institutions with admin, teacher, parent portals.",
  },
  {
    icon: Coffee,
    title: "Restaurant App",
    desc: "Online ordering, table reservation, loyalty programs, and delivery management system.",
  },
  {
    icon: Scissors,
    title: "Salon Booking System",
    desc: "Appointment scheduling, staff management, client history, and automated reminders.",
  },
  {
    icon: Briefcase,
    title: "Business Websites",
    desc: "Custom corporate websites, e-commerce platforms, and landing pages that convert.",
  },
  {
    icon: Cpu,
    title: "AI Automation Solutions",
    desc: "Intelligent chatbots, predictive analytics, and workflow automation for efficiency.",
  },
];

const Services = () => {
  const revealRef = useScrollReveal();
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" ref={revealRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            End-to-end software solutions tailored to your business needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const projects = [
  {
    title: "EduTrack School System",
    category: "School Management",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop",
    desc: "Complete school management platform with gradebook, attendance, and parent communication.",
    demo: "#",
  },
  {
    title: "FoodieDash Restaurant App",
    category: "Restaurant Tech",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    desc: "Online ordering system with real-time order tracking and payment integration.",
    demo: "#",
  },
  {
    title: "SalonBook Pro",
    category: "Booking System",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=400&fit=crop",
    desc: "Appointment scheduling with automated reminders and staff management.",
    demo: "#",
  },
];

const Projects = () => {
  const revealRef = useScrollReveal();
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" ref={revealRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real solutions delivering real results
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.desc}
                </p>
                <a
                  href={project.demo}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                >
                  View Demo <ChevronRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us
const whyChoose = [
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Agile methodology ensuring rapid development and deployment.",
  },
  {
    icon: Layout,
    title: "Modern UI/UX",
    desc: "Beautiful, intuitive interfaces that users love to interact with.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    desc: "Built to grow with your business, handling millions of users.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Competitive rates without compromising on quality.",
  },
];

const WhyChooseUs = () => {
  const revealRef = useScrollReveal();
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" ref={revealRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Why Choose Devora Labs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Partner with us for exceptional results
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChoose.map((item, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "School Principal",
    content:
      "Devora Labs transformed our school management. The system is intuitive and support is outstanding. Parent engagement has increased significantly.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Restaurant Owner",
    content:
      "Our online orders increased by 150% after launching the FoodieDash app. The team understood our needs perfectly.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Salon Chain Owner",
    content:
      "The booking system saved us hours of manual work. Clients love the seamless experience. Highly recommended!",
    rating: 5,
  },
  {
    name: "David Williams",
    role: "Startup Founder",
    content:
      "Exceptional development team. They delivered our MVP ahead of schedule and the quality is top-notch.",
    rating: 5,
  },
];

const Testimonials = () => {
  const revealRef = useScrollReveal();
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" ref={revealRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Trusted by businesses worldwide
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Let's Build Your Project
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Ready to turn your idea into intelligent software? Get in touch today.
        </p>
        <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
          Contact Now
        </button>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Have a project in mind? Let's discuss how we can bring your ideas
              to life.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  udayroytech@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  +91 9142620172
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  Narpatganj 854335, Araria, Bihar
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📞 Available for immediate consultation. Call or WhatsApp for
                quick response.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Send Message
              </button>
              {submitted && (
                <p className="text-green-600 dark:text-green-400 text-center">
                  Message sent successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer (fixed duplicate GitHub icon)
const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Devora Labs
            </h3>
            <p className="text-sm">Where Ideas Become Intelligent Software</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p>Uday Roy</p>
            <p>udayroytech@gmail.com</p>
            <p>+91 9142620172</p>
            <p>Narpatganj, Araria, Bihar</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <FaGithub
                  size={20}
                  className="hover:scale-110 transition-transform"
                />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter
                  size={20}
                  className="hover:scale-110 transition-transform"
                />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedin
                  size={20}
                  className="hover:scale-110 transition-transform"
                />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram
                  size={20}
                  className="hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 Devora Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Floating WhatsApp Button
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919142620172?text=Hello%20Devora%20Labs%2C%20I'm%20interested%20in%20your%20software%20development%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <MessageCircle
        size={24}
        className="group-hover:scale-110 transition-transform"
      />
    </a>
  );
};

// Main App Component (with system preference detection)
const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar isDark={theme === "dark"} toggleTheme={toggleTheme} />
        <Hero />
        <Services />
        <Projects />
        <WhyChooseUs />
        <Testimonials />
        <CTASection />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
