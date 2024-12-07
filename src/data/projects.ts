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
    title: "Real-time Analytics Platform",
    description: "Built a scalable real-time analytics platform processing millions of events daily with interactive visualizations.",
    tech: ["Golang", "Apache Flink", "Redis", "PostgreSQL", "React", "Docker"],
    link: "#",
    image: "/projects/analytics.jpg",
    github: "https://github.com/yourusername/analytics"
  },
  {
    title: "Vehicle Management System",
    description: "Developed a comprehensive vehicle management system handling telemetry data from thousands of electric vehicles.",
    tech: ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "AWS"],
    link: "#",
    image: "/projects/ecommerce.jpg",
    github: "https://github.com/yourusername/vehicle-management"
  }
];