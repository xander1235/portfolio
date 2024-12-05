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
      "Mentored 5 junior developers"
    ]
  },
  {
    company: "Threedots",
    role: "Software Engineer",
    period: "Mar 2022 - Aug 2023",
    description: "Backend development of scalable web applications.",
    technologies: ["Golang", "Java", "PostgreSQL", "Redis"],
    achievements: [
      "Improved system performance by 40%",
      "Implemented real-time analytics dashboard",
      "Led team of 3 developers"
    ]
  },
  {
    company: "Ola Electric",
    role: "Software Engineer",
    period: "July 2020 - Feb 2022",
    description: "Backend development of scalable web applications.",
    technologies: ["Java", "PostgreSQL", "Redis"],
    achievements: [
      "Improved system performance by 40%",
      "Implemented real-time analytics dashboard",
      "Led team of 3 developers"
    ]
  }
];