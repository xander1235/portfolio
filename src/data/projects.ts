export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "Built a scalable e-commerce platform using microservices architecture, handling millions of transactions.",
    tech: ["Node.js", "React", "MongoDB", "Docker"],
    link: "#",
    image: "/projects/ecommerce.jpg",
    github: "https://github.com/username/ecommerce"
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard processing millions of events daily with interactive visualizations.",
    tech: ["Python", "Vue.js", "PostgreSQL", "Redis"],
    link: "#",
    image: "/projects/analytics.jpg",
    github: "https://github.com/username/analytics"
  }
];