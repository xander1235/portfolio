export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    company: "Pixis",
    role: "Senior Software Engineer",
    period: "Sep 2023 - Present",
    description: "Leading development of enterprise-scale applications and mentoring team members.",
    technologies: ["Golang", "Java", "Flink", "Docker", "Gin framework", "NewRelic", "PostgreSQL", "Redis"],
    achievements: [
      "Led development of microservices architecture",
      "Reduced deployment time by 60%",
      "Mentored 5 junior developers",
      "Implemented real-time data processing pipeline using Apache Flink",
      "Designed and implemented high-performance APIs serving 1M+ requests/day"
    ]
  },
  {
    company: "Threedots",
    role: "Software Engineer",
    period: "Mar 2022 - Aug 2023",
    description: "Developed scalable backend services and microservices architecture.",
    technologies: ["Golang", "Java", "PostgreSQL", "Redis", "Kubernetes", "gRPC", "RabbitMQ"],
    achievements: [
      "Improved system performance by 40%",
      "Implemented real-time analytics dashboard",
      "Led team of 3 developers",
      "Designed and implemented distributed caching system",
      "Reduced infrastructure costs by 30%"
    ]
  },
  {
    company: "Ola Electric",
    role: "Software Engineer",
    period: "July 2020 - Feb 2022",
    description: "Built scalable backend services for electric vehicle management system.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka", "AWS"],
    achievements: [
      "Developed vehicle telemetry processing system",
      "Implemented real-time monitoring dashboard",
      "Optimized database queries reducing latency by 50%",
      "Built RESTful APIs for mobile applications",
      "Contributed to microservices architecture design"
    ]
  }
];