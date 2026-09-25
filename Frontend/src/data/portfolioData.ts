import talhaAvatar from "../assets/talha.jpg";
import betteruptimeImg from "../assets/betteruptime.png";

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: "Live" | "Building";
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  youtubeEmbedUrl?: string;
  coverImage?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface CertificationItem {
  title: string;
  description: string;
  link?: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  link?: string;
}

export const portfolioData = {
  personal: {
    name: "Mohd Abdul Wasay Talha",
    alias: "talha",
    roleTitle: "Full Stack Engineer & AI",
    subtitle: "SWE & Product Builder",
    location: "Hyderabad, India",
    timeZone: "Asia/Kolkata",
    availability: "AVAILABLE FOR WORK",
    email: "mawtalha5112004@gmail.com",
    phone: "+91 81259 53062",
    avatar: talhaAvatar,
    aboutBio: [
      "Hey, I'm Talha! I'm Full-Stack Developer who balances out-of-the-box creativity with serious, fast execution. I thrive on that builder energy to craft polished, high-performance systems.",
      "I love building at the intersection of slick frontends, robust backends, and AI workflows. Whether designing micro-interactions or architecting LLM-backed services, I care deeply about the user experience.",
      "When it comes to building products, my philosophy is simple: listen to what people genuinely want, build with speed and taste, and iterate relentlessly.",
    ],
    // career: {
    //   now: {
    //     role: "Full Stack Engineer",
    //     company: "Freelance / Independent Builder",
    //   },
    //   previously: {
    //     role: "Software Developer Intern",
    //     company: "Tech Startups",
    //   },
    // },
    socials: {
      github: "https://github.com/Talha9509",
      x: "https://x.com/MohdTalha732677",
      linkedin: "https://www.linkedin.com/in/mohd-talha5",
      discord: "https://discord.com",
    },
  },

  skills: {
    Frontend: [
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    Backend: [
      "Node.js",
      "Express.js",
      "Python",
      "WebSocket",
      "BullMQ",
    ],
    "DB & Tools": [
      "PostgreSQL",
      "MongoDB",
      "pgvector",
      "Redis",
      "BullMQ",
    ],
    "Cloud & Deployment": [
      "Linux",
      "Docker",
      "Kubernetes",
      "AWS",
      "GitHub Actions",
    ],
    "AI Tools": [
      "LangChain",
      "AI Coding CLI"
    ],
  },

  projects: [
    {
      id: "tradex",
      title: "TradeX",
      tagline: "Highly concurrent Spot Trading Exchange",
      description:
        "Architected a highly concurrent spot trading exchange using Redis Streams to decouple distributed services including the backend, matching engine, WebSocket server, WebSocket client, and background workers, enabling asynchronous communication and scalable order processing. Engineered an in-memory matching engine supporting order execution and partial fills, achieving a 90ms p95 latency. Implemented a zero-data-loss disaster recovery system based on Event Sourcing, combining automated Redis RDB snapshots backed up to AWS S3 with deterministic stream replay to restore volatile engine state after crashes. Developed a real-time market data WebSocket server that consumes asynchronous engine events to fan out orderbook depth updates to subscribers with minimal latency. Ensured durable, eventually consistent financial record-keeping by sinking executed trades into PostgreSQL via a dedicated Prisma consumer worker.",
      status: "Live",
      techStack: ["Bun", "TypeScript", "Redis Streams", "PostgreSQL", "WebSockets", "Express"],
      githubUrl: "https://github.com/Talha9509/TradeX",
    },
    {
      id: "build-my-idea",
      title: "Build My Idea",
      tagline: "Collaboration platform for startup founders and developers",
      description:
        "Engineered a full-stack monorepo platform with seamless collaboration and team formation between early-stage startups and developers through scalable backend services and real-time communication. Launched instant push notifications via Redis Pub/Sub, broadcasting critical platform alerts. Improved transaction throughput by 30% by eliminating N+1 queries and integrating bulk inserts for payment processing and automated Razorpay payouts. Built a background worker to generate embeddings for projects, powering pgvector-based semantic search that matches projects by skill relevance rather than keywords. Offloading generation from the request path kept the API responsive and increased matched outputs by 25%.",
      status: "Live",
      techStack: ["Express", "PostgreSQL", "Docker", "Redis", "BullMQ", "pgvector", "WebSockets"],
      liveUrl: "https://buildmyidea.duckdns.org",
      githubUrl: "https://github.com/Talha9509/BuildMyIdea",
      youtubeEmbedUrl: "https://www.youtube.com/embed/-Gi8sKOeNOY?si=1roqN81f_21PWEAd"
    },
    {
      id: "better-up-time",
      title: "Better Up Time",
      tagline: "Fault-tolerant website Monitoring Platform",
      description:
        "Developed a full-stack uptime monitoring platform performing continuous website health checks, delivering real-time status dashboards and historical performance tracking that reduced critical incidents by 20%. Designed a fault-tolerant monitoring architecture with a multi-region Redis-backed job queue to coordinate globally distributed monitoring workers, enabling reliable asynchronous task scheduling, failure handling, and low-latency response-time collection. Deployed serverless monitoring workers on AWS Lambda to process asynchronous checks, reducing end-to-end system latency by 35% and maximizing polling throughput.",
      status: "Live",
      techStack: ["TypeScript", "Express.js", "Redis", "AWS Lambda"],
      liveUrl: "https://betteruptime.duckdns.org",
      githubUrl: "https://github.com/Talha9509/Better-Up-Time",
      coverImage: betteruptimeImg,
    },
  ] as ProjectItem[],

  experience: [] as ExperienceItem[],

  certifications: [
    {
      title: "AWS Certification",
      description:
        "Gained practical knowledge in cloud architecture fundamentals, setting up infrastructure, and utilizing key AWS services such as EC2, S3, and IAM.",
    },
  ] as CertificationItem[],

  achievements: [
    {
      title: "BuildMyIdea - Founder & Developer",
      description:
        "Independently designed, built, and publicly launched BuildMyIdea, a startup-developer marketplace with live payment and escrow infrastructure, iterated the product twice based on direct user feedback, and grew it to organically acquired users without funding, a team, or marketing spend.",
      link: "https://www.producthunt.com/products/build-my-idea",
    },
  ] as AchievementItem[],
};

