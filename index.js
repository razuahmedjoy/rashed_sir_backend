import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import cors from "cors"
import { Database, Resource } from '@adminjs/prisma'
import { resources } from './resources.js';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

// CORS configuration for public API
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET']
}));

app.use(express.json());

// Public API Routes
app.get('/api/education', async (req, res) => {
    try {
        const education = await prisma.education.findMany();
        res.json(education);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch education data' });
    }
});

app.get('/api/experience', async (req, res) => {
    try {
        const experience = await prisma.experience.findMany();
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch experience data' });
    }
});

app.get('/api/publications', async (req, res) => {
    try {
        const publications = await prisma.publications.findMany();
        res.json(publications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch publications data' });
    }
});

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects data' });
    }
});

app.get('/api/research-interests', async (req, res) => {
    try {
        const researchInterests = await prisma.researchInterest.findMany();
        res.json(researchInterests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch research interests data' });
    }
});

app.get('/api/scholarships', async (req, res) => {
    try {
        const scholarships = await prisma.scholarshipAndAwards.findMany();
        res.json(scholarships);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch scholarships data' });
    }
});
app.get('/api/news', async (req, res) => {
    try {
        const news = await prisma.news.findMany();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
});

app.get('/api/personal-data', async (req, res) => {
    try {
        const personalData = await prisma.personalData.findFirst();
        res.json(personalData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch personal data' });
    }
});

// AdminJS configuration (protected routes)
const authenticate = async (email, password) => {
    if (email === process.env.ADMIN_EMAIL || email === 'admin@example.com') {
        if (password === process.env.ADMIN_PASSWORD || password === 'admin123') {
            return Promise.resolve({ email });
        }
    }
    return null;
};

AdminJS.registerAdapter({ Database, Resource })

const adminOptions = {
    resources: resources,
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    auth: {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: process.env.COOKIE_SECRET || 'somepassword',
    }
}

const admin = new AdminJS(adminOptions)

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: process.env.COOKIE_SECRET || 'somepassword',
    },
    null,
    {
        store: new session.MemoryStore(),
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET || 'somepassword',
        cookie: {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        },
        name: 'adminjs',
    }
)

// Mount admin routes
app.use(admin.options.rootPath, adminRouter)

// Basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`AdminJS started on http://localhost:${port}${admin.options.rootPath}`);
});