-- CreateEnum
CREATE TYPE "PublicationType" AS ENUM ('JOURNAL', 'CONFERENCE', 'TECHNICAL_PAPER', 'SURVEY_PAPER');

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "degree" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "short_description" TEXT,
    "result" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "responsibilities" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publications" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "link" TEXT,
    "type" "PublicationType" NOT NULL,

    CONSTRAINT "Publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchInterest" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResearchInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipAndAwards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER,
    "description" TEXT,
    "organization" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScholarshipAndAwards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalData" (
    "id" TEXT NOT NULL,
    "greetings" TEXT,
    "name" TEXT NOT NULL,
    "cv_link" TEXT,
    "designation" TEXT,
    "department" TEXT,
    "institution" TEXT,
    "short_description" TEXT,
    "contact_me_button_email" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "email1" TEXT NOT NULL,
    "email2" TEXT,
    "phone" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "address" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "twitter" TEXT,
    "researchGate" TEXT,
    "profilePhoto" TEXT,

    CONSTRAINT "PersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publications_title_key" ON "Publications"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Publications_link_key" ON "Publications"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_link_key" ON "Project"("link");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchInterest_title_key" ON "ResearchInterest"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipAndAwards_title_key" ON "ScholarshipAndAwards"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalData_email1_key" ON "PersonalData"("email1");
