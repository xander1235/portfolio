// Portfolio Data Configuration
// data.js - Portfolio Data Configuration
// Dynamic experience text (from July 2020 to current month/year)
const EXPERIENCE_START = { year: 2020, monthIndex: 6 }; // July is 6 (0-based)
function computeExperienceYearsDecimal(start) {
    const now = new Date();
    let months = (now.getFullYear() - start.year) * 12 + (now.getMonth() - start.monthIndex);
    if (months < 0) months = 0;
    const decimalYears = months / 12;
    const rounded = Math.round(decimalYears * 10) / 10; // one decimal place
    if (Number.isInteger(rounded)) {
        return `${rounded} years`;
    }
    return `${rounded.toFixed(1)} years`;
}
const experienceYearsText = computeExperienceYearsDecimal(EXPERIENCE_START);

const portfolioData = {
    // Personal Information
    personal: {
        name: "Veerender Rathod",
        title: "Senior Software Engineer",
        tagline: "Building Scalable Systems & Microservices",
        description: `Experienced Software Engineer with ${experienceYearsText} of expertise in scalable systems, microservices, and distributed architectures. Skilled in designing and optimizing high-throughput systems using Java, Golang, and Apache Flink. Demonstrated success in reducing system latencies, improving data reliability, and delivering end-to-end solutions for data processing and API integrations.`,
        profileImage: "images/my_pic.jpg", // Add your profile image path here
        resume: "pdfs/Rathod_Veerender.pdf", // Add your resume path here
        email: "rathodveerender25@gmail.com",
        location: "Bangalore"
    },

    // Navigation Links
    navigation: [
        { href: "index.html#about", text: "About" },
        { href: "index.html#timeline", text: "Experience" },
        { href: "skills.html", text: "Skills" },
        { href: "projects.html", text: "Projects" },
        { href: "blogs.html", text: "Blogs" },
        { href: "contact.html", text: "Contact" }
    ],

    // Blog Posts
    blogs: [
        {
            title: "Cut 80% Cloud Costs with Pandas & Polars Memory Optimization",
            description: "As a engineer, I’ve always believed that efficiency isn’t just about faster code — it’s about smarter resource usage. When our Flink jobs and analytics pipelines started to buckle under the weight of ever-growing datasets, memory consumption became a pressing concern. The cloud bills were climbing, and our data processing services were hitting their limits.",
            url: "https://medium.com/@rathodWrites/cut-80-cloud-costs-with-pandas-polars-memory-optimization-d9893be92768?source=friends_link&sk=ed63812074cf27ca8f977fef320235c2",
            category: "Medium"
        },
        {
            title: "The $500K IDE Extension Scam: How a Fake Extension Tricked an Experienced Developer",
            description: "An experienced developer lost $500K to a malicious IDE extension. Learn how the attack worked, how to spot fake extensions, and the security steps every developer should take to stay safe.",
            url: "https://levelup.gitconnected.com/how-a-fake-ide-extension-stole-500k-from-an-experienced-developer-2912518c57b8?source=friends_link&sk=b5cddbe4651d264d754c9901a69a8851",
            category: "Medium"
        },
        {
            title: "Mastering Go for Backend Development: A Comprehensive Guide",
            description: "In the world of backend development, Go (or Golang) has emerged as a powerful language that combines the performance of compiled languages with the simplicity of modern scripting languages. Developed at Google, Go has gained immense popularity for building scalable and efficient backend services. In this comprehensive guide, we’ll explore Go’s core concepts, from basic syntax to advanced concurrency patterns, equipping you with the knowledge to build robust backend services.",
            url: "https://levelup.gitconnected.com/mastering-go-for-backend-development-a-comprehensive-guide-3971c4a6de66?source=friends_link&sk=6230b28030a8785e5800e4b3f1d2fd32",
            category: "Medium"
        },
        {
            title: "Tired of Repetitive AI Prompts? Slash Commands Changed Everything",
            description: "If you’ve ever found yourself typing “explain this in simple words” for the hundredth time — you’re not alone. I was there too. Until a tiny trick completely changed the way I interact with AI tools — and saved me hours every week.",
            url: "https://levelup.gitconnected.com/tired-of-repetitive-ai-prompts-slash-commands-changed-everything-df49350d8ce8?source=friends_link&sk=41470c69805d6313e4590ca037cd5736",
            category: "Medium"
        },
        {
            title: "Building Production-Ready APIs with Gorest: The Ultimate Go HTTP Client Library",
            description: "When I first started out, I was working with Java and Spring Boot — frameworks that made backend development feel pretty straightforward. Then Go started getting a lot of attention, and I was curious about all the talk around its performance and efficiency. So I gave it a shot and began building microservices with Gin.",
            url: "https://levelup.gitconnected.com/building-production-ready-apis-with-gorest-the-ultimate-go-http-client-library-2898be48067c?source=friends_link&sk=764e26f0c9c057a67343a1a743fed61e",
            category: "Medium"
        }
    ],

    // Social Links
    social: [
        { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/rathod-veerender-97371a11b/", label: "LinkedIn" },
        { icon: "fab fa-github", url: "https://github.com/xander1235", label: "GitHub" },
        { icon: "fas fa-code", url: "https://leetcode.com/rathod1235", label: "LeetCode" },
        { icon: "fas fa-envelope", url: "mailto:rathodveerender25@gmail.com", label: "Email" }
    ],

    // Hero CTA Buttons
    heroCTA: [
        { text: "View Projects", href: "projects.html", class: "btn btn-primary" },
        { text: "Download Resume", href: "#", class: "btn btn-outline", download: true }
    ],

    // Technologies for the orbit
    technologies: [
        { 
            id: "golang", 
            icon: "fas fa-code", 
            name: "GoLang",
            description: "Expert in GoLang for scalable services and event processing systems"
        },
        { 
            id: "java", 
            icon: "fab fa-java", 
            name: "Java",
            description: "Proficient in Java & SpringBoot for microservices development"
        },
        { 
            id: "database", 
            icon: "fas fa-database", 
            name: "Databases",
            description: "Experience with MySQL, Scylla, Redis, and DynamoDB"
        },
        { 
            id: "kafka", 
            icon: "fas fa-stream", 
            name: "Kafka",
            description: "Stream processing with Apache Kafka and Apache Flink"
        },
        { 
            id: "docker", 
            icon: "fab fa-docker", 
            name: "Docker",
            description: "Containerization with Docker for scalable deployments"
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
            description: "Familiar with AWS and cloud-native architectures"
        }
    ],

    // About Section
    about: {
        title: "About Me",
        content: `
            <p>Experienced Software Engineer with ${experienceYearsText} of expertise in scalable systems, microservices, and distributed architectures. Skilled in designing and optimizing high-throughput systems using Java, Golang, and Apache Flink. Demonstrated success in reducing system latencies, improving data reliability, and delivering end-to-end solutions for data processing and API integrations.</p>
        `
    },

    // Timeline/Experience
    timeline: [
        {
            year: "Sep 2023 – Present",
            title: "Senior Software Engineer",
            company: "Pixis",
            description: "Developed a scalable Golang event processing service handling 100K rpm with retries/DLQ (99% reduced data loss). Built Flink CDC to Iceberg and a Flink job registry for versioned lifecycle management; architected real-time Kafka → Iceberg pipelines at sub-second latency.",
            technologies: ["GoLang", "Kafka", "Apache Flink", "Apache Iceberg", "Microservices"],
            companySummary: "Built and scaled real-time data infrastructure and event pipelines powering marketing intelligence and analytics, with reliability and observability at scale.",
            achievements: [
                "Reduced data loss by ~99% via resilient retry + DLQ patterns in event processing",
                "Shipped Flink CDC → Iceberg pipelines improving query performance and freshness",
                "Introduced a Flink job registry to standardize versioning and lifecycle management",
                "Delivered real-time Kafka → Iceberg pipeline at sub‑second latency"
            ],
            learnings: [
                "Designing fault‑tolerant, idempotent, and backpressure‑aware stream processors",
                "Schema evolution and table formats (Iceberg) for analytics at scale",
                "Operational excellence: monitoring, alerting, and on‑call for high‑throughput systems"
            ]
        },
        {
            year: "Mar 2022 – Aug 2023",
            title: "Software Engineer",
            company: "Threedots",
            description: "Led online gaming platform (League, Prediction, Trading, Quiz). Introduced live leaderboard (DAU/MAU 5% → 50%). Migrated Java → Golang (2× throughput, 3× lower latency, 2× lower CPU/heap). Managed virtual currency wallet (20K+ tx/day). Built Flink PostgreSQL CDC → Kafka with transforms.",
            technologies: ["GoLang", "Java", "Kafka", "PostgreSQL", "Microservices"],
            companySummary: "Built user‑facing gaming experiences and the real‑time backend that powers leaderboards, wallets, and gameplay flows.",
            achievements: [
                "Boosted DAU/MAU from ~5% → ~50% with live leaderboard & real‑time updates",
                "2× throughput, 3× latency reduction, 2× lower CPU/heap by moving core services to Go",
                "Operated a virtual currency wallet processing 20K+ tx/day with strong consistency",
                "Standardized CDC → Kafka ingestion with transformation for downstream consumers"
            ],
            learnings: [
                "Real‑time system design for gaming workloads (low‑latency, high‑fan‑out)",
                "Concurrency & profiling in Go for throughput and latency wins",
                "Consistency models and idempotency for wallet & financial workflows"
            ]
        },
        {
            year: "July 2020 – Feb 2022",
            title: "Software Engineer",
            company: "Ola Electric",
            description: "Created scalable JWT-based Auth & SSO (50–80K rpm). Built multi-organization user platform and secure multi-tenant wallet; implemented Flink jobs integrating Kafka, transforming proto → JSON/Java for downstream analytics.",
            technologies: ["Java", "SpringBoot", "Kafka", "Apache Flink", "JWT"],
            companySummary: "Worked across identity, access, and fintech workflows to enable secure, multi‑tenant experiences at scale.",
            achievements: [
                "Delivered robust JWT Auth & SSO handling 50–80K rpm",
                "Launched multi‑organization user platform and secure multi‑tenant wallet",
                "Built Flink ingestion and transform pipelines improving processing speed by ~25%"
            ],
            learnings: [
                "AuthN/AuthZ patterns (JWT, SSO) and session management at scale",
                "Designing multi‑tenant services with partitioning and isolation",
                "Streaming transforms and contracts between producers/consumers"
            ]
        },
        {
            year: "Jan 2020 – Jun 2020",
            title: "Software Intern",
            company: "Ola Electric",
            description: "Contributed to multi-tenant user management & tags; built Flink Kafka ingestion to onboard user wallets; worked on payment integrations.",
            technologies: ["Java", "Kafka", "Payment Integration"],
            companySummary: "Hands‑on exposure to microservices and data pipelines through contributions to user, wallet onboarding, and payments flows.",
            achievements: [
                "Shipped Kafka ingestion to onboard wallets asynchronously",
                "Contributed to user management & tags for tenancy",
                "Helped integrate multiple payment providers"
            ],
            learnings: [
                "Event‑driven design and asynchronous onboarding patterns",
                "Working with Kafka/Flink and schema contracts",
                "Integration best practices with external payment services"
            ]
        }
    ],

    // Skills (synced from data.json)
    skills: [
        {
            category: "Proficient",
            items: [
                { name: "GoLang", level: 92 },
                { name: "Gin Framework", level: 90 },
                { name: "Java", level: 90 },
                { name: "MySQL", level: 88 },
                { name: "Scylla", level: 80 },
                { name: "SpringBoot", level: 90 },
                { name: "Redis", level: 85 },
                { name: "Git", level: 90 },
                { name: "Docker", level: 85 },
                { name: "Microservices", level: 92 },
                { name: "Kafka", level: 90 },
                { name: "DynamoDB", level: 80 },
                { name: "Apache Flink", level: 85 },
                { name: "MCP", level: 75 },
                { name: "Windsurf", level: 75 }
            ]
        },
        {
            category: "Familiar",
            items: [
                { name: "Python", level: 75 },
                { name: "AWS", level: 75 },
                { name: "Kubernetes", level: 70 },
                { name: "Jmeter", level: 65 },
                { name: "C/C++", level: 65 },
                { name: "Newrelic", level: 60 }
            ]
        }
    ],

    // Contact Information
    contact: {
        message: "Feel free to reach out for collaborations or just a friendly chat.",
        email: "rathodveerender25@gmail.com",
        location: "Bangalore"
    },

    // Projects (each responsibility from experience is a project)
    projects: [
        // Pixis (5)
        {
            title: "Golang Event Processing Service",
            description: "Develop a scalable Golang event processing service handling 100K rpm with 99% reduced data loss, integrating Kafka for data ingestion and secure API transfers. Retry mechanisms with exponential backoff and improved system resilience and reliability, integrating Dead Letter queues to reduce retry failures by 40%.",
            technologies: ["GoLang", "Kafka", "Apache Flink", "Apache Iceberg", "Microservices"],
            company: "Pixis",
            type: "company"
        },
        {
            title: "Golang Network Interface",
            description: "Built a Golang network interface to standardize request/response marshaling, introducing a plugin-based architecture to streamline error or response handling and boost team efficiency by 20%.",
            technologies: ["GoLang", "Kafka", "Apache Flink", "Apache Iceberg", "Microservices"],
            company: "Pixis",
            type: "company"
        },
        {
            title: "Flink PostgreSQL CDC → Iceberg Data Lakehouse",
            description: "Engineered a Flink job PostgreSQL CDC stream and marketing platform data into an Iceberg Data Lakehouse, optimizing data query times by 15% through advanced transformation techniques.",
            technologies: ["GoLang", "Kafka", "Apache Flink", "Apache Iceberg", "Microservices"],
            company: "Pixis",
            type: "company"
        },
        {
            title: "Flink Job Registry Service",
            description: "Designed a Flink job registry service for version control and lifecycle management, reducing deployment time by 25% and improving job traceability by 40% through Decodable and prefect integration.",
            technologies: ["GoLang", "Kafka", "Apache Flink", "Apache Iceberg", "Microservices"],
            company: "Pixis",
            type: "company"
        },
        {
            title: "Real-time Kafka → Iceberg Pipeline",
            description: "Architected a real-time Kafka stream processing pipeline with Apache Iceberg, handling 1M+ events/sec at sub-second latency, leveraging fault-tolerant designs and transformation logic to boost throughput by 25%.",
            technologies: ["GoLang", "Kafka", "Apache Flink", "Apache Iceberg", "Microservices"],
            company: "Pixis",
            type: "company"
        },

        // Threedots (3)
        {
            title: "Online Gaming Platform & Live Leaderboard",
            description: "Led the development of an online gaming service in Java offering League, Prediction, Trading, and Quiz Match formats. Introduced a live leaderboard that boosted DAU/MAU ratio from 5% to 50%. Transitioned the service to Golang, achieving a 2x reduction in Heap storage/CPU usage, a 2x throughput improvement, and a 3x latency decrease.",
            technologies: ["GoLang", "Java", "Kafka", "PostgreSQL", "Microservices"],
            company: "Threedots",
            type: "company"
        },
        {
            title: "Virtual Currency Wallet",
            description: "Managed and enhanced a virtual currency wallet for seamless gaming transactions, enabling users to add currency, play games, and convert virtual currency to real money, processing 20K+ transactions daily.",
            technologies: ["GoLang", "Java", "Kafka", "PostgreSQL", "Microservices"],
            company: "Threedots",
            type: "company"
        },
        {
            title: "Flink PostgreSQL CDC → Kafka",
            description: "Engineered a Flink job to migrate PostgreSQL CDC data to Kafka, applying transformation logic to standardize and enrich data streams, improving downstream data accuracy by 30%.",
            technologies: ["GoLang", "Java", "Kafka", "PostgreSQL", "Microservices"],
            company: "Threedots",
            type: "company"
        },

        // Ola Electric — Software Engineer (4)
        {
            title: "Auth & SSO Platform",
            description: "Created a scalable User Auth and SSO solution using JWT authentication, supporting concurrent logins across devices and multi-organization sign-ups. Achieved robust authentication at 50K rpm with reinforced validation mechanisms, reducing unauthorized access attempts by 25%.",
            technologies: ["Java", "SpringBoot", "Kafka", "Apache Flink", "JWT"],
            company: "Ola Electric",
            type: "company"
        },
        {
            title: "Multi-organization User Platform",
            description: "Developed a multi-organization user service platform that supports concurrent multi-tenancy and owner-employee features, reducing onboarding time by 30% while efficiently handling 80K rpm.",
            technologies: ["Java", "SpringBoot", "Kafka", "Apache Flink", "JWT"],
            company: "Ola Electric",
            type: "company"
        },
        {
            title: "Multi-tenant Wallet Platform",
            description: "Designed a secure multi-tenant wallet platform with owner-employee features, processing 50K rpm. Optimized transactional security and reduced adjustment request turnaround by 20%.",
            technologies: ["Java", "SpringBoot", "Kafka", "Apache Flink", "JWT"],
            company: "Ola Electric",
            type: "company"
        },
        {
            title: "Flink Kafka Ingestion & Proto Transformation",
            description: "Implemented a Flink job integrating Kafka, transforming data from proto to JSON and Java code for downstream services, improving processing speed by 25% and enabling real-time analytics.",
            technologies: ["Java", "SpringBoot", "Kafka", "Apache Flink", "JWT"],
            company: "Ola Electric",
            type: "company"
        },

        // Ola Electric — Intern (3)
        {
            title: "Multi-tenant User Management & Tags",
            description: "Contributed to multi-tenant user management and tags module for the tenant.",
            technologies: ["Java", "Kafka", "Payment Integration"],
            company: "Ola Electric(Intern)",
            type: "company"
        },
        {
            title: "Flink Kafka Ingestion for Wallet Onboarding",
            description: "Made a contribution to a flink job to ingest events from Kafka and onboard user wallets to the wallet service asynchronously.",
            technologies: ["Java", "Kafka", "Payment Integration"],
            company: "Ola Electric(Intern)",
            type: "company"
        },
        {
            title: "Payment Service Integrations",
            description: "Had a hand in payment service for various payment integrations with different payment platforms.",
            technologies: ["Java", "Kafka", "Payment Integration"],
            company: "Ola Electric(Intern)",
            type: "company"
        }
    ],

    // Achievements
    achievements: [
        { title: "Qualified GATE 2019", description: "Qualified in the Graduate Aptitude Test in Engineering" },
        { title: "The Spot Light Award", description: "Awarded at Ola Electric, Bangalore" },
        { title: "The Warthog of Backend", description: "Awarded at Threedots, Bangalore" },
        { title: "Pixis Trailblazers", description: "Awarded at Pixis, Bangalore" }
    ],

    // Education
    education: {
        degree: "Bachelor of Technology and Master of Technology in Information Technology (Dual Degree)",
        institution: "Indian institute of information Technology Allahabad",
        period: "Aug 2015 – July 2020",
        location: "Allahabad"
    },

    // Footer
    footer: {
        copyright: "© 2025 Veerender Rathod. All rights reserved."
    }
};

// Make the data available globally
window.portfolioData = portfolioData;