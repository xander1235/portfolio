// Portfolio Data Configuration
// data.js - Portfolio Data Configuration
const portfolioData = {
    // Personal Information
    personal: {
        name: "Veerender Rathod",
        title: "Senior Software Engineer",
        tagline: "Building Scalable Systems & Microservices",
        description: "More than 4.6+ years of experience using Java, SpringBoot, GoLang, System Design, Data structure and Algorithms. Proficient in scalable Systems, Microservices, RestFul APIs, Distributed Systems. Skilled in end-to-end project planning, scope management, risk analysis, and quality control.",
        profileImage: "images/my_pic.jpg", // Add your profile image path here
        resume: "resume.pdf", // Add your resume path here
        email: "rathodveerender25@gmail.com",
        phone: "+91-9129382373",
        location: "Bengaluru, Karnataka, IN"
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
        { icon: "fab fa-linkedin", url: "https://linkedin.com/in/rathod-veerender", label: "LinkedIn" },
        { icon: "fab fa-github", url: "https://github.com/Xander", label: "GitHub" },
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
            <p>I'm a Senior Software Engineer with 4.6+ years of experience in building scalable, distributed systems and microservices. 
            My expertise spans from designing robust backend systems to implementing high-throughput event processing services.</p>
            
            <p>I specialize in GoLang, Java, SpringBoot, and stream processing technologies like Apache Kafka and Apache Flink. 
            My passion lies in solving complex technical challenges and creating solutions that make a real impact.</p>
            
            <p>When I'm not coding, you'll find me exploring new technologies, solving algorithmic challenges on LeetCode, 
            and continuously expanding my knowledge in system design and architecture.</p>
        `
    },

    // Timeline/Experience
    timeline: [
        {
            year: "2023-Present",
            title: "Senior Software Engineer",
            company: "Pixis",
            description: "Developed a scalable GoLang event processing service handling 100K rpm with 99% reduced data loss, integrating Kafka for data ingestion and secure API transfers. Built real-time Kafka stream processing pipelines with Apache Iceberg, handling 1M+ events/sec at sub-second latency.",
            technologies: ["GoLang", "Kafka", "Apache Flink", "Apache Iceberg", "Microservices"]
        },
        {
            year: "2022-2023",
            title: "Software Engineer",
            company: "Threedots",
            description: "Led the development of an online gaming service in Java, later transitioning to GoLang, achieving 2x reduction in Heap storage/CPU usage, 2x throughput improvement, and 3x latency decrease. Managed a virtual currency wallet processing 20K+ transactions daily.",
            technologies: ["GoLang", "Java", "Kafka", "PostgreSQL", "Microservices"]
        },
        {
            year: "2020-2022",
            title: "Software Engineer",
            company: "Ola Electric",
            description: "Created a scalable User Auth and SSO solution using JWT authentication at 50K rpm. Developed a multi-organization user service platform and secure multi-tenant wallet platform handling 80K rpm.",
            technologies: ["Java", "SpringBoot", "Kafka", "Apache Flink", "JWT"]
        },
        {
            year: "2020",
            title: "Software Intern",
            company: "Ola Electric",
            description: "Contributed to multi-tenant user management and tags module. Worked on a Flink job to ingest events from Kafka and onboard user wallets asynchronously.",
            technologies: ["Java", "Kafka", "Payment Integration"]
        }
    ],

    // Skills
    skills: [
        {
            category: "Programming Languages",
            items: [
                { name: "GoLang", level: 95 },
                { name: "Java", level: 90 },
                { name: "Python", level: 75 },
                { name: "C/C++", level: 65 }
            ]
        },
        {
            category: "Frameworks & Technologies",
            items: [
                { name: "SpringBoot", level: 90 },
                { name: "Gin Framework", level: 88 },
                { name: "Microservices", level: 92 },
                { name: "Apache Flink", level: 85 }
            ]
        },
        {
            category: "Databases & Messaging",
            items: [
                { name: "MySQL", level: 88 },
                { name: "Kafka", level: 90 },
                { name: "Redis", level: 85 },
                { name: "DynamoDB", level: 80 },
                { name: "Scylla", level: 78 }
            ]
        },
        {
            category: "DevOps & Tools",
            items: [
                { name: "Docker", level: 85 },
                { name: "Git", level: 90 },
                { name: "AWS", level: 75 },
                { name: "Kubernetes", level: 70 },
                { name: "Jmeter", level: 65 }
            ]
        }
    ],

    // Contact Information
    contact: {
        message: "Feel free to reach out for collaborations or just a friendly chat.",
        email: "rathodveerender25@gmail.com",
        phone: "+91-9129382373",
        location: "Bengaluru, Karnataka, IN"
    },

    // Projects (based on work experience)
    projects: [
        {
            title: "Scalable Event Processing Service",
            description: "Built a high-throughput GoLang event processing service handling 100K requests per minute with 99% reduced data loss, integrating with Kafka and implementing retry mechanisms with exponential backoff.",
            technologies: ["GoLang", "Kafka", "Microservices", "API Design"],
            type: "company",
            github: "#"
        },
        {
            title: "Real-Time Data Processing Pipeline",
            description: "Architected a real-time Kafka stream processing pipeline with Apache Iceberg, handling 1M+ events/sec at sub-second latency, leveraging fault-tolerant designs and transformation logic.",
            technologies: ["Apache Flink", "Kafka", "Apache Iceberg", "Data Transformation"],
            type: "company",
            github: "#"
        },
        {
            title: "Online Gaming Platform",
            description: "Led development of a gaming service with League, Prediction, Trading, and Quiz Match formats. Introduced a live leaderboard that boosted DAU/MAU ratio from 5% to 50%.",
            technologies: ["GoLang", "Java", "Microservices", "PostgreSQL"],
            type: "company",
            github: "#"
        },
        {
            title: "Multi-Tenant Auth & SSO Solution",
            description: "Created a scalable User Auth and SSO solution using JWT authentication, supporting concurrent logins across devices and multi-organization sign-ups at 50K requests per minute.",
            technologies: ["Java", "SpringBoot", "JWT", "Security"],
            type: "company",
            github: "#"
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
        institution: "Indian Institute of Information Technology Allahabad",
        period: "Aug 2015 - July 2020",
        location: "Allahabad"
    },

    // Footer
    footer: {
        copyright: "© 2025 Veerender Rathod. All rights reserved."
    }
};

// Make the data available globally
window.portfolioData = portfolioData;