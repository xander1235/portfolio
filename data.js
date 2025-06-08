// Portfolio Data Configuration
// data.js - Portfolio Data Configuration
const portfolioData = {
    // Personal Information
    personal: {
        name: "Veerender Rathod",
        title: "Senior Software & Data Engineer",
        tagline: "Building Scalable Solutions",
        description: "Passionate about creating efficient, scalable solutions that bridge the gap between complex data systems and user-friendly applications.",
        profileImage: "images/my_pic.jpg", // Add your profile image path here
        resume: "resume.pdf", // Add your resume path here
        email: "veerender.rathod@example.com",
        location: "Bengaluru, Karnataka, IN"
    },

    // Navigation Links
    navigation: [
        { href: "#about", text: "About" },
        { href: "#timeline", text: "Experience" },
        { href: "#skills", text: "Skills" },
        { href: "projects.html", text: "Projects" }
    ],

    // Social Links
    social: [
        { icon: "fab fa-linkedin", url: "https://linkedin.com/in/veerender-rathod", label: "LinkedIn" },
        { icon: "fab fa-github", url: "https://github.com/veerender-rathod", label: "GitHub" },
        { icon: "fab fa-twitter", url: "https://twitter.com/veerender_rathod", label: "Twitter" },
        { icon: "fas fa-envelope", url: "mailto:veerender.rathod@example.com", label: "Email" },
        { icon: "fab fa-medium", url: "https://medium.com/@veerender-rathod", label: "Medium" }
    ],

    // Hero CTA Buttons
    heroCTA: [
        { text: "View Projects", href: "#projects", class: "btn btn-primary" },
        { text: "Download Resume", href: "#", class: "btn btn-outline", download: true }
    ],

    // Technologies for the orbit
    technologies: [
        { 
            id: "python", 
            icon: "fab fa-python", 
            name: "Python",
            description: "Expert in Python for data engineering, automation, and backend development"
        },
        { 
            id: "javascript", 
            icon: "fab fa-js", 
            name: "JavaScript",
            description: "Full-stack development with modern JS frameworks and Node.js"
        },
        { 
            id: "database", 
            icon: "fas fa-database", 
            name: "Database",
            description: "SQL & NoSQL databases including PostgreSQL, MongoDB, and Redis"
        },
        { 
            id: "aws", 
            icon: "fab fa-aws", 
            name: "AWS",
            description: "Cloud architecture and services including EC2, S3, Lambda, and more"
        },
        { 
            id: "docker", 
            icon: "fab fa-docker", 
            name: "Docker",
            description: "Containerization and orchestration with Docker and Kubernetes"
        },
        { 
            id: "git", 
            icon: "fab fa-git-alt", 
            name: "Git",
            description: "Version control and collaborative development workflows"
        },
        { 
            id: "cloud", 
            icon: "fas fa-cloud", 
            name: "Cloud",
            description: "Multi-cloud expertise across AWS, GCP, and Azure"
        }
    ],

    // About Section
    about: {
        title: "About Me",
        content: `
            <p>I'm a Senior Software & Data Engineer with over 8 years of experience in building scalable, data-driven applications. 
            My expertise spans from designing robust backend systems to implementing complex data pipelines that process millions of records daily.</p>
            
            <p>I specialize in cloud-native architectures, distributed systems, and real-time data processing. 
            My passion lies in solving complex technical challenges and creating solutions that make a real impact.</p>
            
            <p>When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
            or sharing my knowledge through technical blogs and mentoring.</p>
        `
    },

    // Timeline/Experience
    timeline: [
        {
            year: "2023-Present",
            title: "Senior Software Engineer",
            company: "Tech Innovations Inc.",
            description: "Leading the data engineering team, architecting scalable microservices, and implementing real-time analytics pipelines processing 100M+ events daily.",
            technologies: ["Python", "AWS", "Kubernetes", "Apache Kafka", "PostgreSQL"]
        },
        {
            year: "2020-2023",
            title: "Data Engineer",
            company: "DataCorp Solutions",
            description: "Designed and implemented ETL pipelines, reduced data processing time by 60%, and built automated data quality monitoring systems.",
            technologies: ["Python", "Apache Spark", "AWS", "Airflow", "Redshift"]
        },
        {
            year: "2018-2020",
            title: "Software Developer",
            company: "StartupXYZ",
            description: "Full-stack development of SaaS platform, implemented RESTful APIs, and improved application performance by 40%.",
            technologies: ["JavaScript", "Node.js", "React", "MongoDB", "Docker"]
        },
        {
            year: "2016-2018",
            title: "Junior Developer",
            company: "Digital Agency Co.",
            description: "Developed web applications, collaborated on agile teams, and contributed to multiple client projects.",
            technologies: ["JavaScript", "PHP", "MySQL", "HTML/CSS"]
        }
    ],

    // Skills
    skills: [
        {
            category: "Backend Development",
            items: [
                { name: "Python", level: 95 },
                { name: "Node.js", level: 85 },
                { name: "Java", level: 75 },
                { name: "Go", level: 70 }
            ]
        },
        {
            category: "Data Engineering",
            items: [
                { name: "Apache Spark", level: 90 },
                { name: "Apache Kafka", level: 85 },
                { name: "Airflow", level: 88 },
                { name: "ETL/ELT", level: 92 }
            ]
        },
        {
            category: "Cloud & DevOps",
            items: [
                { name: "AWS", level: 90 },
                { name: "Docker/Kubernetes", level: 85 },
                { name: "CI/CD", level: 88 },
                { name: "Terraform", level: 75 }
            ]
        },
        {
            category: "Databases",
            items: [
                { name: "PostgreSQL", level: 90 },
                { name: "MongoDB", level: 85 },
                { name: "Redis", level: 80 },
                { name: "Elasticsearch", level: 75 }
            ]
        }
    ],

    // Projects
    projects: [
        {
            title: "Real-Time Analytics Platform",
            description: "Built a scalable real-time analytics platform processing over 100 million events daily with sub-second latency.",
            technologies: ["Python", "Apache Kafka", "Apache Spark", "AWS", "PostgreSQL"],
            github: "https://github.com/username/analytics-platform",
            demo: "https://demo.example.com"
        },
        {
            title: "Automated Data Pipeline Framework",
            description: "Developed a framework for building self-healing data pipelines with automated quality checks and monitoring.",
            technologies: ["Python", "Airflow", "Docker", "AWS Lambda", "Prometheus"],
            github: "https://github.com/username/pipeline-framework"
        },
        {
            title: "Microservices E-Commerce Platform",
            description: "Architected and implemented a microservices-based e-commerce platform handling 50K+ daily transactions.",
            technologies: ["Node.js", "React", "MongoDB", "Redis", "Kubernetes"],
            github: "https://github.com/username/ecommerce-platform"
        },
        {
            title: "ML-Powered Recommendation Engine",
            description: "Created a machine learning recommendation system that increased user engagement by 35%.",
            technologies: ["Python", "TensorFlow", "FastAPI", "Redis", "PostgreSQL"],
            github: "https://github.com/username/recommendation-engine"
        }
    ],

    // Footer
    footer: {
        copyright: "Veerender Rathod. All rights reserved."
    }
};

// Make the data available globally
window.portfolioData = portfolioData;