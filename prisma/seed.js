import { PrismaClient, PublicationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create Personal Data
    const personalData = await prisma.personalData.upsert({
        where: { email1: 'rashed@example.com' },
        update: {},
        create: {
            greetings: "Hello, I'm",
            name: "Dr. Rashed",
            designation: "Professor",
            department: "Computer Science and Engineering",
            institution: "University of Example",
            short_description: "Experienced professor with expertise in AI and Machine Learning",
            contact_me_button_email: "contact@example.com",
            city: "Dhaka",
            country: "Bangladesh",
            email1: "rashed@example.com",
            email2: "rashed.alt@example.com",
            phone: "+880 1234567890",
            office: "Room 101, CS Building",
            address: "123 University Avenue",
            linkedin: "https://linkedin.com/in/rashed",
            github: "https://github.com/rashed",
            twitter: "https://twitter.com/rashed",
            researchGate: "https://researchgate.net/profile/rashed"
        },
    });

    // Create Education entries
    const educations = await Promise.all([
        prisma.education.upsert({
            where: { id: 1 },
            update: {},
            create: {
                degree: "Ph.D. in Computer Science",
                institute: "Stanford University",
                year: "2015-2019",
                short_description: "Specialized in Machine Learning",
                result: "3.95/4.00"
            },
        }),
        prisma.education.upsert({
            where: { id: 2 },
            update: {},
            create: {
                degree: "M.Sc. in Computer Science",
                institute: "MIT",
                year: "2013-2015",
                short_description: "Focus on Artificial Intelligence",
                result: "3.90/4.00"
            },
        }),
    ]);

    // Create Experience entries
    const experiences = await Promise.all([
        prisma.experience.upsert({
            where: { id: 1 },
            update: {},
            create: {
                position: "Professor",
                department: "Computer Science",
                institution: "University of Example",
                duration: "2020-Present",
                responsibilities: ["Teaching advanced courses", "Leading research projects", "Mentoring graduate students"]
            },
        }),
        prisma.experience.upsert({
            where: { id: 2 },
            update: {},
            create: {
                position: "Assistant Professor",
                department: "Computer Science",
                institution: "Previous University",
                duration: "2019-2020",
                responsibilities: ["Teaching undergraduate courses", "Conducting research", "Supervising student projects"]
            },
        }),
    ]);

    // Create News entries
    const news = await Promise.all([
        prisma.news.upsert({
            where: { id: 1 },
            update: {},
            create: {
                title: "New Research Grant Awarded",
                date: new Date("2024-01-15"),
                description: "Received a major research grant for AI project",
                link: "https://example.com/news/1"
            },
        }),
        prisma.news.upsert({
            where: { id: 2 },
            update: {},
            create: {
                title: "Keynote Speaker at International Conference",
                date: new Date("2024-02-01"),
                description: "Invited as keynote speaker at AI Conference 2024",
                link: "https://example.com/news/2"
            },
        }),
    ]);

    // Create Publications
    const publications = await Promise.all([
        prisma.publications.upsert({
            where: { title: "Advanced Machine Learning Techniques" },
            update: {},
            create: {
                title: "Advanced Machine Learning Techniques",
                authors: "Rashed, A., Smith, B., Johnson, C.",
                year: 2023,
                link: "https://example.com/pub/1",
                type: PublicationType.JOURNAL
            },
        }),
        prisma.publications.upsert({
            where: { title: "AI in Healthcare Systems" },
            update: {},
            create: {
                title: "AI in Healthcare Systems",
                authors: "Rashed, A., Brown, D.",
                year: 2022,
                link: "https://example.com/pub/2",
                type: PublicationType.CONFERENCE
            },
        }),
    ]);

    // Create Projects
    const projects = await Promise.all([
        prisma.project.upsert({
            where: { title: "AI-Powered Healthcare Assistant" },
            update: {},
            create: {
                title: "AI-Powered Healthcare Assistant",
                description: "Development of an AI system for healthcare diagnosis",
                year: 2023,
                link: "https://example.com/project/1"
            },
        }),
        prisma.project.upsert({
            where: { title: "Smart City Solutions" },
            update: {},
            create: {
                title: "Smart City Solutions",
                description: "IoT-based smart city infrastructure project",
                year: 2022,
                link: "https://example.com/project/2"
            },
        }),
    ]);

    // Create Research Interests
    const researchInterests = await Promise.all([
        prisma.researchInterest.upsert({
            where: { title: "Machine Learning" },
            update: {},
            create: {
                title: "Machine Learning"
            },
        }),
        prisma.researchInterest.upsert({
            where: { title: "Artificial Intelligence" },
            update: {},
            create: {
                title: "Artificial Intelligence"
            },
        }),
    ]);

    // Create Scholarships and Awards
    const scholarships = await Promise.all([
        prisma.scholarshipAndAwards.upsert({
            where: { title: "Best Researcher Award 2023" },
            update: {},
            create: {
                title: "Best Researcher Award 2023",
                year: 2023,
                description: "Awarded for outstanding contributions to AI research",
                organization: "International AI Society"
            },
        }),
        prisma.scholarshipAndAwards.upsert({
            where: { title: "Excellence in Teaching Award" },
            update: {},
            create: {
                title: "Excellence in Teaching Award",
                year: 2022,
                description: "Recognized for innovative teaching methods",
                organization: "University of Example"
            },
        }),
    ]);

    console.log('Seed data created successfully!');
    console.log({
        personalData,
        educations,
        experiences,
        news,
        publications,
        projects,
        researchInterests,
        scholarships
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 