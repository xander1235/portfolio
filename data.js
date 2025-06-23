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
        { href: "#about", text: "About" },
        { href: "#timeline", text: "Experience" },
        { href: "skills.html", text: "Skills" },
        { href: "projects.html", text: "Projects" },
        { href: "contact.html", text: "Contact" }
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
            github: "#"
        },
        {
            title: "Real-Time Data Processing Pipeline",
            description: "Architected a real-time Kafka stream processing pipeline with Apache Iceberg, handling 1M+ events/sec at sub-second latency, leveraging fault-tolerant designs and transformation logic.",
            technologies: ["Apache Flink", "Kafka", "Apache Iceberg", "Data Transformation"],
            github: "#"
        },
        {
            title: "Online Gaming Platform",
            description: "Led development of a gaming service with League, Prediction, Trading, and Quiz Match formats. Introduced a live leaderboard that boosted DAU/MAU ratio from 5% to 50%.",
            technologies: ["GoLang", "Java", "Microservices", "PostgreSQL"],
            github: "#"
        },
        {
            title: "Multi-Tenant Auth & SSO Solution",
            description: "Created a scalable User Auth and SSO solution using JWT authentication, supporting concurrent logins across devices and multi-organization sign-ups at 50K requests per minute.",
            technologies: ["Java", "SpringBoot", "JWT", "Security"],
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