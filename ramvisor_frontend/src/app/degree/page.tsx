"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  rectIntersection,
  DragOverEvent,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComputerScienceMajorRequirements, {
  csCoreCourses,
  csElectives,
  csAdditionalElectives,
  csAdditionalRequirements,
} from "@/components/degree/comp-sci-req";
import { allCsCourses } from "@/components/degree/comp-sci-req";
import GenEdRequirements from "@/components/degree/gen-ed-req";
import { allCourses } from "@/components/degree/course-data";

interface Course {
  id: string;
  name: string;
  credits: number;
  category?: string;
  requirementId?: string;
  isPreloaded?: boolean;
  satisfies?: string;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
  credits: number;
}

interface Requirement {
  id: string;
  name: string;
  courses: string[];
  completed: number;
  required: number;
  isElective?: boolean;
}

interface CollapsibleRequirement {
  id: string;
  name: string;
  isCollapsible: true;
  subRequirements: Requirement[];
}

interface MajorRequirements {
  name: string;
  requirements: (Requirement | CollapsibleRequirement)[];
}

interface ApCredits {
  calculus: boolean;
  statistics: boolean;
  microeconomics: boolean;
  macroeconomics: boolean;
}

const DegreePlanning: React.FC = () => {
  const coreCourses = [
    {
      id: "BUSI401",
      name: "Management Communication",
      credits: 3,
      category: "core",
    },
    {
      id: "BUSI403",
      name: "Operations Management",
      credits: 3,
      category: "core",
    },
    {
      id: "BUSI404",
      name: "Legal & Ethical Environment of Business",
      credits: 1.5,
    },
    {
      id: "BUSI405",
      name: "Leading and Managing",
      credits: 3,
      category: "core",
    },
    {
      id: "BUSI406",
      name: "Principles of Marketing",
      credits: 3,
      category: "core",
    },
    {
      id: "BUSI407",
      name: "Financial Accounting",
      credits: 3,
      category: "core",
    },
    { id: "BUSI408", name: "Corporate Finance", credits: 3, category: "core" },
    { id: "BUSI410", name: "Business Analytics", credits: 3, category: "core" },
    {
      id: "BUSI411",
      name: "Strategic Management",
      credits: 1.5,
      category: "core",
    },
    {
      id: "BUSI412",
      name: "Strategic Management in the Modern Corporation",
      credits: 1.5,
      category: "core",
    },
  ];

  const prerequisiteCourses = [
    {
      id: "MATH152",
      name: "Calculus for Business and Social Sciences",
      credits: 3,
      requirementId: "calculus",
    },
    {
      id: "MATH231",
      name: "Calculus of Functions of One Variable I",
      credits: 3,
      requirementId: "calculus",
    },
    {
      id: "STOR113",
      name: "Decision Models for Business and Economics",
      credits: 3,
      requirementId: "calculus",
    },
    {
      id: "STOR155",
      name: "Introduction to Data Models and Inference",
      credits: 3,
      requirementId: "statistics",
    },
    {
      id: "ECON101",
      name: "Introduction to Economics",
      credits: 3,
      requirementId: "economics",
    },
    {
      id: "ECON101H",
      name: "Introduction to Economics (Honors)",
      credits: 3,
      requirementId: "economics",
    },
    {
      id: "BUSI100",
      name: "Introduction to Business: People, Profits, Planet",
      credits: 3,
      requirementId: "intro_business",
    },
  ];

  const electiveCourses = [
    {
      id: "BUSI188",
      name: "Foundations of Leadership: Discovering Your Strengths",
      credits: 1.5,
    },
    { id: "BUSI211", name: "Hodges Scholars Leadership course", credits: 1 },
    { id: "BUSI350", name: "Symposium Core Committee", credits: 1.5 },
    { id: "BUSI409H", name: "Advanced Corp Finance", credits: 1.5 },
    {
      id: "BUSI470",
      name: "Storytelling to Influence and Inspire",
      credits: 3,
    },
    { id: "BUSI488", name: "Data Science in the Business World", credits: 3 },
    {
      id: "BUSI490",
      name: "Business Topics: Thinking Creatively: Cognitive Tools for Individuals and Teams",
      credits: 3,
    },
    {
      id: "BUSI490A",
      name: "Business Topics: Artificial Intelligence and Business Writing",
      credits: 3,
    },
    {
      id: "BUSI500H",
      name: "Entrepreneurship & Business Planning",
      credits: 3,
    },
    {
      id: "BUSI501",
      name: "Professional Selling Strategies and Skills",
      credits: 3,
    },
    { id: "BUSI502", name: "Entrepreneurial Finance", credits: 3 },
    { id: "BUSI505", name: "Entrepreneurial Consulting", credits: 3 },
    { id: "BUSI506", name: "Venture Capital Strategy", credits: 3 },
    {
      id: "BUSI507H",
      name: "Sustainable Business and Social Enterprise",
      credits: 3,
    },
    { id: "BUSI517", name: "Private Equity and Debt Markets", credits: 3 },
    { id: "BUSI518", name: "Applied Private Equity", credits: 3 },
    { id: "BUSI520", name: "Advanced Spreadsheet Modeling", credits: 3 },
    {
      id: "BUSI521",
      name: "Design Thinking: The Innovation Process for Complex Problems",
      credits: 3,
    },
    {
      id: "BUSI522",
      name: "Personal Branding and Professional Relationships",
      credits: 3,
    },
    { id: "BUSI523", name: "Diversity and Inclusion at Work", credits: 3 },
    { id: "BUSI524", name: "Applied Improvisation", credits: 3 },
    { id: "BUSI527", name: "Gender at Work", credits: 3 },
    { id: "BUSI528", name: "Leadership Communication", credits: 1.5 },
    {
      id: "BUSI529",
      name: "Intercultural Communication in the Global Workplace",
      credits: 1.5,
    },
    { id: "BUSI533H", name: "Supply Chain Management", credits: 3 },
    { id: "BUSI536", name: "Project Management", credits: 1.5 },
    { id: "BUSI537", name: "Retail Operations", credits: 1.5 },
    { id: "BUSI545", name: "Negotiations", credits: 1.5 },
    { id: "BUSI548", name: "Financing Affordable Housing", credits: 1.5 },
    { id: "BUSI554H", name: "Consulting Skills and Framework", credits: 3 },
    { id: "BUSI555", name: "Groups & Teams in Organizations", credits: 1.5 },
    { id: "BUSI562", name: "Consumer Behavior", credits: 3 },
    {
      id: "BUSI564",
      name: "Product Development & Design Thinking",
      credits: 3,
    },
    {
      id: "BUSI565",
      name: "Marketing Research Design and Analysis",
      credits: 3,
    },
    { id: "BUSI566", name: "Marketing Strategy", credits: 3 },
    { id: "BUSI567", name: "Customer Journeys", credits: 3 },
    {
      id: "BUSI571",
      name: "Strategic Cost Analysis and Performance Management",
      credits: 1.5,
    },
    { id: "BUSI583H", name: "Applied Investment Management", credits: 3 },
    { id: "BUSI584", name: "Financial Modeling", credits: 3 },
    { id: "BUSI585", name: "Introduction to Real Estate", credits: 3 },
    { id: "BUSI588H", name: "Derivative Securities", credits: 1.5 },
    { id: "BUSI592", name: "Real Estate Fund", credits: 3 },
    { id: "BUSI597", name: "Sustainable Finance", credits: 1.5 },
    { id: "BUSI601", name: "Real Estate Finance", credits: 1.5 },
    { id: "BUSI603", name: "Real Estate Development", credits: 1.5 },
    {
      id: "BUSI607",
      name: "Inside the Capital Markets – Institutions, Players & Regulators",
      credits: 1.5,
    },
    {
      id: "BUSI608",
      name: "Introduction to FinTech – Blockchain Technologies and Cryptocurrencies",
      credits: 1.5,
    },
    { id: "BUSI625", name: "Global Healthcare Management", credits: 1.5 },
    { id: "BUSI691H", name: "Honors Research Proposal", credits: 3 },
  ];
  const preloadedSchedule = [
    {
      id: "Fall2024",
      name: "Fall 2024",
      courses: [
        {
          id: "IDST101",
          name: "College Thriving",
          credits: 1,
          isPreloaded: true,
        },
        {
          id: "POLI150",
          name: "International Relations",
          credits: 3,
          isPreloaded: true,
          satisfies: "globalUnderstanding",
        },
        {
          id: "ENGL105",
          name: "English Compositions and Rhetoric, writing in the natural sciences",
          credits: 3,
          isPreloaded: true,
          satisfies: "writing",
        },
        {
          id: "STOR155",
          name: "Statistics",
          credits: 3,
          isPreloaded: true,
          satisfies: "quantReasoning",
        },
        {
          id: "ECON101",
          name: "Economics",
          credits: 4,
          isPreloaded: true,
          satisfies: "waysKnowing",
        },
        {
          id: "HIST140",
          name: "World After 1945",
          credits: 3,
          isPreloaded: true,
          satisfies: "humanPast",
        },
      ],
      credits: 17,
    },
    {
      id: "Spring2025",
      name: "Spring 2025",
      courses: [
        {
          id: "ECON310",
          name: "Intermediate Microeconomics",
          credits: 3,
          isPreloaded: true,
        },
        {
          id: "PHIL101",
          name: "Philosophy",
          credits: 3,
          isPreloaded: true,
          satisfies: "ethicValues",
        },
        {
          id: "IDST126L",
          name: "Lab",
          credits: 1,
          isPreloaded: true,
          satisfies: "dataLiteracy",
        },
        {
          id: "IDST126",
          name: "Values and Prices",
          credits: 3,
          isPreloaded: true,
          satisfies: "tripleI",
        },
        {
          id: "HIST53",
          name: "Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.",
          credits: 3,
          isPreloaded: true,
          satisfies: "firstYearSeminar",
        },
        {
          id: "ECON125",
          name: "Entrepreneurship",
          credits: 3,
          isPreloaded: true,
          satisfies: "creativeExpression",
        },
      ],
      credits: 16,
    },
    {
      id: "Fall2025",
      name: "Fall 2025",
      courses: [
        {
          id: "ECON410",
          name: "Intermediate Micro",
          credits: 4,
          isPreloaded: true,
        },
        { id: "LFIT111", name: "Swimming", credits: 1, isPreloaded: true },
        {
          id: "HIST364",
          name: "History of American Business",
          credits: 3,
          isPreloaded: true,
        },
        {
          id: "BUSI100",
          name: "Intro to Business",
          credits: 1.5,
          isPreloaded: true,
        },
        {
          id: "COMM348",
          name: "Algorithms in Society",
          credits: 3,
          isPreloaded: true,
          satisfies: "powerDifference",
        },
        {
          id: "ECON325",
          name: "Entrepreneurship",
          credits: 3,
          isPreloaded: true,
        },
      ],
      credits: 15.5,
    },
    {
      id: "Spring2026",
      name: "Spring 2026",
      courses: [
        {
          id: "BUSI488",
          name: "Data Science in the Business World",
          credits: 3,
          isPreloaded: true,
        },
        {
          id: "COMP110",
          name: "Intro to Programming",
          credits: 3,
          isPreloaded: true,
        },
        { id: "BUSI407", name: "Accounting", credits: 3, isPreloaded: true },
        { id: "ECON327", name: "Branding", credits: 3, isPreloaded: true },
        {
          id: "BUSI506",
          name: "Venture Capital",
          credits: 3,
          isPreloaded: true,
        },
        {
          id: "BUSI505",
          name: "Entrepreneurial Consulting",
          credits: 3,
          isPreloaded: true,
          satisfies: "highImpact",
        },
      ],
      credits: 18,
    },
    {
      id: "Fall2026",
      name: "Fall 2026",
      courses: [
        { id: "BUSI406", name: "Marketing", credits: 3, isPreloaded: true },
        {
          id: "COMP283",
          name: "Discrete Structures",
          credits: 3,
          isPreloaded: true,
        },
        {
          id: "BUSI408",
          name: "Corporate Finance",
          credits: 3,
          isPreloaded: true,
        },
        {
          id: "BUSI405",
          name: "Organizational Behavior",
          credits: 3,
          isPreloaded: true,
        },
        {
          id: "BUSI403",
          name: "Operations and Technology Management",
          credits: 3,
          isPreloaded: true,
        },
      ],
      credits: 15,
    },
  ];

  const genEdReq = {
    firstYearFoundations: {
      writingResearch: [
        { id: "ENGL105", name: "Writing at the Research University", credits: 3 },
        { id: "ENGL105I", name: "Writing at the Research University (Interdisciplinary)", credits: 3 },
        { id: "ENGL105H", name: "Writing at the Research University (Honors)", credits: 3 },
      ],
      collegeThriving: [
        { id: "MUST101", name: "College Thriving", credits: 1 },
        { id: "IDST101i", name: "College Thriving", credits: 1 },
      ],
      firstYearSeminar: [
        { id: "COMM88", name: "Technologies of Popular Culture", credits: 3 },
        { id: "HIST53", name: "Traveling to European Cities: American Writers/Cultural Identities, 1830-2000.", credits: 3 },
        { id: "COMP50", name: "Everyday Computing", credits: 3 },
        { id: "DRAM79", name: "The Heart of the Play", credits: 3 },
        { id: "ECON54", name: "Entrepreneurial Imagination", credits: 3 },
        { id: "PSYC62", name: "Positive Psychology", credits: 3 },
      ],
      tripleI: [
        { id: "IDST111", name: "Triple I: Ethics, Economics, and Public Policy", credits: 3 },
        { id: "IDST112", name: "Triple I: Death and Dying", credits: 3 },
        { id: "IDST113", name: "Triple I: The Idea of Race", credits: 3 },
        { id: "IDST114", name: "Triple I: Science Fiction and Environment", credits: 3 },
        { id: "IDST115", name: "Triple I: Understanding Health and Happiness", credits: 3 },
        { id: "IDST126", name: "Triple-I: Values and Prices", credits: 3 },
      ],
      dataLiteracy: [
        { id: "IDST111L", name: "Triple I: Ethics, Economics, and Public Policy Lab", credits: 1 },
        { id: "IDST112L", name: "Triple I: Death and Dying Lab", credits: 1 },
        { id: "IDST113L", name: "Triple I: The Idea of Race Lab", credits: 1 },
        { id: "IDST114L", name: "Triple I: Science Fiction and Environment Lab", credits: 1 },
        { id: "IDST115L", name: "Triple I: Understanding Health and Happiness Lab", credits: 1 },
        { id: "IDST126L", name: "Triple-I: Values and Prices Lab", credits: 1 },
      ],
      globalLanguage: [
        { id: "SPAN203", name: "Intermediate Spanish I", credits: 3 },
        { id: "FREN203", name: "Intermediate French I", credits: 3 },
        { id: "CHIN203", name: "Intermediate Chinese I", credits: 3 },
        { id: "GERM203", name: "Intermediate German I", credits: 3 },
        { id: "JAPN203", name: "Intermediate Japanese I", credits: 3 },
      ],
    },
    focusCapacities: {
      aestheticAnalysis: [
        { id: "ARTS101", name: "Introduction to Art", credits: 3 },
        { id: "ENGL121", name: "Introduction to Literature", credits: 3 },
        { id: "MUSC143", name: "Introduction to Rock Music", credits: 3 },
        { id: "DRAM115", name: "Perspectives in Drama", credits: 3 },
        { id: "COMM140", name: "Introduction to Media Studies", credits: 3 },
      ],
      creativeExpression: [
        { id: "ARTS102", name: "Basic Drawing", credits: 3 },
        { id: "MUSC166", name: "Introduction to Composition", credits: 3 },
        { id: "DRAM135", name: "Acting I", credits: 3 },
        { id: "ENGL130", name: "Introduction to Creative Writing", credits: 3 },
        { id: "COMM230", name: "Audio Production", credits: 3 },
        { id: "ECON125", name: "Entrepreneurship", credits: 3 },
      ],
      humanPast: [
        { id: "HIST127", name: "American History to 1865", credits: 3 },
        { id: "CLAS131", name: "Classical Mythology", credits: 3 },
        { id: "HIST140", name: "The World Since 1945", credits: 3 },
        { id: "RELI103", name: "Introduction to the Hebrew Bible/Old Testament", credits: 3 },
        { id: "HIST151", name: "European History to 1650", credits: 3 },
      ],
      ethicValues: [
        { id: "PHIL160", name: "Introduction to Ethics", credits: 3 },
        { id: "POLI150", name: "International Relations and World Politics", credits: 3 },
        { id: "RELI140", name: "Religion in America", credits: 3 },
        { id: "PHIL165", name: "Bioethics", credits: 3 },
        { id: "POLI203", name: "Race, Innocence, and the End of the Death Penalty", credits: 3 },
        { id: "PHIL101", name: "Introduction to Philosophy", credits: 3 },
      ],
      globalUnderstanding: [
        { id: "ANTH102", name: "Introduction to Cultural Anthropology", credits: 3 },
        { id: "GEOG120", name: "World Regional Geography", credits: 3 },
        { id: "POLI150", name: "International Relations and World Politics", credits: 3 },
        { id: "GLBL210", name: "Global Issues and Globalization", credits: 3 },
        { id: "SOCI130", name: "Family and Society", credits: 3 },
      ],
      naturalScience: [
        { id: "BIOL101", name: "Principles of Biology", credits: 4 },
        { id: "CHEM101", name: "General Descriptive Chemistry I", credits: 4 },
        { id: "PHYS104", name: "General Physics I", credits: 4 },
        { id: "ENEC202", name: "Environmental Science", credits: 4 },
        { id: "ASTR101", name: "Introduction to Astronomy", credits: 3 },
      ],
      powerDifference: [
        { id: "SOC101", name: "Introduction to Sociology", credits: 3 },
        { id: "WGST101", name: "Introduction to Womens and Gender Studies", credits: 3 },
        { id: "POLI100", name: "Introduction to Government in the United States", credits: 3 },
        { id: "HIST110", name: "Introduction to the Cultures and Histories of Native North America", credits: 3 },
        { id: "AFAM101", name: "Introduction to African American Studies", credits: 3 },
        { id: "COMM348", name: "Algorithms in Society", credits: 3 },
      ],
      quantReasoning: [
        { id: "MATH110", name: "Algebra", credits: 3 },
        { id: "STOR151", name: "Introduction to Data Analysis", credits: 3 },
        { id: "ECON101", name: "Introduction to Economics", credits: 3 },
        { id: "PHIL155", name: "Introduction to Mathematical Logic", credits: 3 },
        { id: "COMP110", name: "Introduction to Programming", credits: 3 },
        { id: "STOR155", name: "Statistics", credits: 3 },
      ],
      waysKnowing: [
        { id: "PHIL101", name: "Introduction to Philosophy", credits: 3 },
        { id: "ANTH101", name: "General Anthropology", credits: 3 },
        { id: "PSYC101", name: "General Psychology", credits: 3 },
        { id: "RELI101", name: "Introduction to Religion", credits: 3 },
        { id: "LING101", name: "Introduction to Language", credits: 3 },
        { id: "ECON101", name: "Introduction to Economics", credits: 3 },
      ],
    },
    empiricalInvestigativeLab: [
      { id: "BIOL101L", name: "Principles of Biology Laboratory", credits: 1 },
      { id: "CHEM101L", name: "General Descriptive Chemistry Laboratory I", credits: 1 },
      { id: "PHYS104L", name: "General Physics I Laboratory", credits: 1 },
      { id: "ENEC202L", name: "Environmental Science Laboratory", credits: 1 },
      { id: "ASTR101L", name: "Introduction to Astronomy Laboratory", credits: 1 },
    ],
    reflectionAndIntegration: {
      research: [
        { id: "BIOL395", name: "Undergraduate Research in Biology", credits: 3 },
        { id: "CHEM395", name: "Undergraduate Research in Chemistry", credits: 3 },
        { id: "PSYC395", name: "Research in Psychology", credits: 3 },
        { id: "HIST398", name: "Undergraduate Seminar in History", credits: 3 },
        { id: "ENGL395", name: "Undergraduate Research in English", credits: 3 },
      ],
      highImpact: [
        { id: "BIOL293", name: "Internship in Biology", credits: 3 },
        { id: "ENGL293", name: "Internship in English", credits: 3 },
        { id: "POLI293", name: "Internship in Political Science", credits: 3 },
        { id: "PSYC293", name: "Internship in Psychology", credits: 3 },
        { id: "SOCI293", name: "Internship in Sociology", credits: 3 },
        { id: "BUSI505", name: "Entrepreneurial Consulting", credits: 3 },
      ],
      communication: [
        { id: "COMM113", name: "Public Speaking", credits: 3 },
        { id: "ENGL313", name: "Writing in the Disciplines", credits: 3 },
        { id: "BUSI401", name: "Business Communication", credits: 3 },
        { id: "JOMC153", name: "News Writing", credits: 3 },
        { id: "SPAN300", name: "Advanced Spanish Communication", credits: 3 },
      ],
      lifetimeFitness: [
        { id: "LFIT101", name: "Lifetime Fitness: Aerobics", credits: 1 },
        { id: "LFIT102", name: "Lifetime Fitness: Weight Training", credits: 1 },
        { id: "LFIT103", name: "Lifetime Fitness: Yoga", credits: 1 },
        { id: "LFIT104", name: "Lifetime Fitness: Swimming", credits: 1 },
        { id: "LFIT105", name: "Lifetime Fitness: Running", credits: 1 },
        { id: "LFIT111", name: "Swimming", credits: 1 },
      ],
    },
  };
  

  const [courses, setCourses] = useState<Course[]>([
    ...coreCourses,
    ...prerequisiteCourses,
    ...electiveCourses,
    ...allCsCourses,
    ...Object.values(genEdReq.firstYearFoundations).flat(),
    ...Object.values(genEdReq.focusCapacities).flat(),
    ...genEdReq.empiricalInvestigativeLab,
    ...Object.values(genEdReq.reflectionAndIntegration).flat()
  ]);
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "Fall2024", name: "Fall 2024", courses: [], credits: 0 },
    { id: "Spring2025", name: "Spring 2025", courses: [], credits: 0 },
    { id: "Fall2025", name: "Fall 2025", courses: [], credits: 0 },
    { id: "Spring2026", name: "Spring 2026", courses: [], credits: 0 },
    { id: "Fall2026", name: "Fall 2026", courses: [], credits: 0 },
    { id: "Spring2027", name: "Spring 2027", courses: [], credits: 0 },
    { id: "Fall2027", name: "Fall 2027", courses: [], credits: 0 },
    { id: "Spring2028", name: "Spring 2028", courses: [], credits: 0 },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeSemester, setActiveSemester] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [showRequirementDetails, setShowRequirementDetails] =
    useState<boolean>(false);
  const [selectedRequirement, setSelectedRequirement] =
    useState<Requirement | null>(null);
  const [activeTab, setActiveTab] = useState<"requirements" | "apCredits">(
    "requirements"
  );
  const [apCredits, setApCredits] = useState<ApCredits>({
    calculus: false,
    statistics: false,
    microeconomics: false,
    macroeconomics: false,
  });
  const [majorRequirements, setMajorRequirements] = useState<MajorRequirements>(
    {
      name: "Business Administration",
      requirements: [
        {
          id: "prerequisites",
          name: "Prerequisites",
          isCollapsible: true,
          subRequirements: [
            {
              id: "calculus",
              name: "Calculus",
              courses: ["MATH152", "MATH231", "STOR113"],
              completed: 0,
              required: 1,
            },
            {
              id: "statistics",
              name: "Statistics",
              courses: ["STOR155"],
              completed: 0,
              required: 1,
            },
            {
              id: "economics",
              name: "Economics",
              courses: ["ECON101", "ECON101H"],
              completed: 0,
              required: 1,
            },
            {
              id: "intro_business",
              name: "Intro to Business",
              courses: ["BUSI100"],
              completed: 0,
              required: 1,
            },
          ],
        },
        {
          id: "core",
          name: "Core Courses",
          courses: [
            "BUSI401",
            "BUSI403",
            "BUSI404",
            "BUSI405",
            "BUSI406",
            "BUSI407",
            "BUSI408",
            "BUSI410",
            "BUSI411",
            "BUSI412",
          ],
          completed: 0,
          required: 10,
        },
        {
          id: "electives",
          name: "Electives",
          courses: [
            "BUSI188",
            "BUSI211",
            "BUSI350",
            "BUSI409H",
            "BUSI470",
            "BUSI488",
            "BUSI490",
            "BUSI490A",
            "BUSI500H",
            "BUSI501",
            "BUSI502",
            "BUSI505",
            "BUSI506",
            "BUSI507H",
            "BUSI517",
            "BUSI518",
            "BUSI520",
            "BUSI521",
            "BUSI522",
            "BUSI523",
            "BUSI524",
            "BUSI527",
            "BUSI528",
            "BUSI529",
            "BUSI533H",
            "BUSI536",
            "BUSI537",
            "BUSI545",
            "BUSI548",
            "BUSI554H",
            "BUSI555",
            "BUSI562",
            "BUSI564",
            "BUSI565",
            "BUSI566",
            "BUSI567",
            "BUSI571",
            "BUSI583H",
            "BUSI584",
            "BUSI585",
            "BUSI588H",
            "BUSI592",
            "BUSI597",
            "BUSI601",
            "BUSI603",
            "BUSI607",
            "BUSI608",
            "BUSI625",
            "BUSI691H",
          ],
          completed: 0,
          required: 15,
          isElective: true,
        },
      ],
    }
  );
  const [activeView, setActiveView] = useState<"basic" | "premium">("basic");
  const [activeMajor, setActiveMajor] = useState<"business" | "cs" | "genEd">(
    "business"
  );
  const [preloadedCourses, setPreloadedCourses] = useState<Course[]>([]);
  const [planners, setPlanners] = useState<
    { id: number; name: string; semesters: Semester[] }[]
  >([]);
  const [activePlanner, setActivePlanner] = useState<{
    id: number;
    name: string;
    semesters: Semester[];
  } | null>(null);
  const [showNewPlannerModal, setShowNewPlannerModal] =
    useState<boolean>(false);
  const [newPlannerName, setNewPlannerName] = useState<string>("");
  const [graduationSemester, setGraduationSemester] =
    useState<string>("Spring2028");
  const [showAIPlanModal, setShowAIPlanModal] = useState<boolean>(false);
  const [selectedMajor, setSelectedMajor] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over && over.data.current && (over.data.current as any).type === 'semester') {
      setActiveSemester(over.id as string);
    } else {
      setActiveSemester(null);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (!over || !over.data.current) {
      setActiveId(null);
      setActiveSemester(null);
      return;
    }
  
    const course = semesters
      .flatMap((sem) => sem.courses)
      .find((c) => c.id === active.id);
    if (course && course.isPreloaded) {
      toast.error("Preloaded courses cannot be moved.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setActiveId(null);
      setActiveSemester(null);
      return;
    }
  
    if ((over.data.current as any).type === 'semester') {
      handleDropIntoSemester(active.id as string, over.id as string);
    } else {
      handleReorderWithinSemester(
        active.id as string,
        over.id as string,
        (over.data.current as any).semesterId as string
      );
    }
  
    setActiveId(null);
    setActiveSemester(null);
  };

  const handleDropIntoSemester = (courseId: string, semesterId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;
  
    setSemesters((prevSemesters) => {
      return prevSemesters.map((semester) => {
        if (semester.id === semesterId) {
          // Check if adding this course would exceed the credit limit
          if (semester.credits + course.credits > 18) {
            toast.error("Cannot add course. It would exceed the 18 credit limit.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            return semester;
          }
  
          // Check if the course is already in this semester
          if (semester.courses.some((c) => c.id === course.id)) {
            return semester;
          }
  
          // Add the course to this semester
          const updatedCourses = [...semester.courses, course];
          const updatedCredits = updatedCourses.reduce((sum, c) => sum + c.credits, 0);
  
          toast.success(`Added ${course.id} to ${semester.name}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
  
          return { ...semester, courses: updatedCourses, credits: updatedCredits };
        }
  
        // Remove the course from other semesters
        const updatedCourses = semester.courses.filter((c) => c.id !== course.id);
        const updatedCredits = updatedCourses.reduce((sum, c) => sum + c.credits, 0);
  
        return { ...semester, courses: updatedCourses, credits: updatedCredits };
      });
    });
  };
  
  const handleReorderWithinSemester = (activeId: string, overId: string, semesterId: string) => {
    setSemesters((prevSemesters) => {
      const updatedSemesters = prevSemesters.map((semester) => {
        if (semester.id === semesterId) {
          const oldIndex = semester.courses.findIndex((c) => c.id === activeId);
          const newIndex = semester.courses.findIndex((c) => c.id === overId);
          
          if (oldIndex !== -1 && newIndex !== -1) {
            const newCourses = [...semester.courses];
            const [reorderedItem] = newCourses.splice(oldIndex, 1);
            newCourses.splice(newIndex, 0, reorderedItem);
            
            return { ...semester, courses: newCourses };
          }
        }
        return semester;
      });
  
      return updatedSemesters;
    });
  };
  
  const removeCourseFromSemester = (semesterId: string, courseId: string) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) => {
        if (semester.id === semesterId) {
          const courseToRemove = semester.courses.find(
            (c) => c.id === courseId
          );
          return {
            ...semester,
            courses: semester.courses.filter(
              (course) => course.id !== courseId
            ),
            credits:
              semester.credits - (courseToRemove ? courseToRemove.credits : 0),
          };
        }
        return semester;
      })
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      setSearchResults(
        courses.filter(
          (course) =>
            (course.id.toLowerCase().includes(term) ||
              course.name.toLowerCase().includes(term)) &&
            !isCourseTaken(course.id)
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  const isCourseTaken = (courseId: string): boolean => {
    return (
      semesters.some((sem: Semester) =>
        sem.courses.some((c: Course) => c.id === courseId)
      ) ||
      preloadedSchedule.some((sem: { courses: Course[] }) =>
        sem.courses.some((c: Course) => c.id === courseId)
      )
    );
  };

  const handleFindCourses = (requirement: Requirement) => {
    if (!requirement || !requirement.courses) {
      console.error("Invalid requirement object:", requirement);
      return;
    }
    const filteredCourses = allCourses.filter(
      (course) =>
        requirement.courses.includes(course.id) && !isCourseTaken(course.id)
    );

    const uniqueFilteredCourses = filteredCourses.reduce(
      (acc: Course[], current: Course) => {
        const x = acc.find((item: Course) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      },
      [] as Course[]
    );

    setSearchResults(uniqueFilteredCourses);
    setShowRequirementDetails(false);
  };

  const updateMajorRequirements = () => {
    const allSelectedCourses = semesters.flatMap(
      (semester) => semester.courses
    );

    setMajorRequirements((prevRequirements) => ({
      ...prevRequirements,
      requirements: prevRequirements.requirements.map((requirement) => {
        if ("isCollapsible" in requirement) {
          return {
            ...requirement,
            subRequirements: requirement.subRequirements.map((subReq) =>
              updateRequirement(subReq, allSelectedCourses)
            ),
          };
        } else {
          return updateRequirement(requirement, allSelectedCourses);
        }
      }),
    }));
  };

  const updateRequirement = (
    req: Requirement,
    selectedCourses: Course[]
  ): Requirement => {
    if (req.isElective) {
      const completedCredits = selectedCourses
        .filter((course) => req.courses.includes(course.id))
        .reduce((sum, course) => sum + course.credits, 0);
      return { ...req, completed: completedCredits };
    } else {
      let completed = req.courses.filter((courseId) =>
        selectedCourses.some((c) => c.id === courseId)
      ).length;

      if (req.id === "calculus" && apCredits.calculus) completed = 1;
      if (req.id === "statistics" && apCredits.statistics) completed = 1;
      if (
        req.id === "economics" &&
        (apCredits.microeconomics || apCredits.macroeconomics)
      )
        completed = 1;

      return { ...req, completed: Math.min(completed, req.required) };
    }
  };

  const handleRequirementClick = (requirement: Requirement) => {
    setSelectedRequirement(requirement);
    setShowRequirementDetails(true);
  };

  const getCourseColor = (course: Course | undefined): React.CSSProperties => {
    if (!course) return {};

    const colors: { [key: string]: React.CSSProperties } = {
      core: { backgroundColor: "#e9d5ff", color: "#581c87" },
      prerequisite: { backgroundColor: "#fce7f3", color: "#831843" },
      elective: { backgroundColor: "#dbeafe", color: "#1e3a8a" },
      default: { backgroundColor: "#e0e7ff", color: "#312e81" },
    };

    if (course.category === "core") return colors.core;
    if (course.requirementId) return colors.prerequisite;
    if (
      majorRequirements.requirements.find(
        (r) => "courses" in r && r.courses.includes(course.id)
      )?.id === "electives"
    )
      return colors.elective;

    return colors.default;
  };

  const SortableCourse: React.FC<{
    course: Course;
    semesterId?: string;
    removeCourseFromSemester: (semesterId: string, courseId: string) => void;
    semesters: Semester[];
  }> = ({ course, semesterId, removeCourseFromSemester, semesters }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: course.id,
        disabled: course.isPreloaded,
      });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      ...getCourseColor(course),
      marginBottom: "4px",
      borderRadius: "4px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      display: "flex",
      alignItems: "center",
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (semesterId) {
        removeCourseFromSemester(semesterId, course.id);
      }
    };

    const getScheduleInfo = () => {
      for (const semester of semesters) {
        if (semester.courses.some((c) => c.id === course.id)) {
          return `Already added to ${semester.name}`;
        }
      }
      return null;
    };

    const scheduleInfo = getScheduleInfo();

    if (semesterId) {
      return (
        <div style={style}>
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
              flexGrow: 1,
              padding: "4px",
              cursor: "move",
              fontSize: "12px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{course.id}</span>
          </div>
          <div>
            <button
              onClick={handleRemove}
              style={{
                padding: "0 4px",
                color: "#dc2626",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
            >
              ×
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          marginBottom: "8px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={{
            ...style,
            padding: "8px",
            cursor: "move",
          }}
        >
          <span style={{ fontWeight: "bold" }}>{course.id}</span>
        </div>
        <div
          style={{ padding: "8px", backgroundColor: "white", color: "#374151" }}
        >
          <div
            style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}
          >
            {course.name}
          </div>
          <div style={{ fontSize: "12px", color: "#2563eb" }}>
            Previously offered in Fall 2024
          </div>
          {scheduleInfo && (
            <div
              style={{ fontSize: "12px", color: "#d97706", marginTop: "4px" }}
            >
              {scheduleInfo}
            </div>
          )}
        </div>
      </div>
    );
  };

  const DroppableSemester: React.FC<{
    semester: Semester;
    children: React.ReactNode;
  }> = ({ semester, children }) => {
    const { setNodeRef } = useSortable({
      id: semester.id,
      data: {
        type: "semester",
        semester: semester,
      },
    });
  
    const isActive = activeSemester === semester.id;
    const isOverCreditLimit = semester.credits > 18;
  
    return (
      <div
        ref={setNodeRef}
        style={{
          padding: "12px",
          borderRadius: "8px",
          minHeight: "320px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          transition: "background-color 0.2s",
          backgroundColor: isActive ? "#dbeafe" : "white",
          border: "1px solid #bfdbfe",
        }}
      >
        <h3
          style={{
            marginBottom: "8px",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "14px",
            padding: "8px 0",
            borderRadius: "4px",
            backgroundColor: "#bfdbfe",
            color: "#1e40af",
          }}
        >
          {semester.name}
        </h3>
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            marginBottom: "8px",
            color: isOverCreditLimit ? "#dc2626" : "#2563eb",
            fontWeight: isOverCreditLimit ? "bold" : "normal",
          }}
        >
          Credits: {semester.credits}
        </p>
        {isOverCreditLimit && (
          <p
            style={{
              color: "#dc2626",
              fontSize: "12px",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Maximum credits (18) exceeded!
          </p>
        )}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  const CollapsibleRequirement: React.FC<{
    requirement: CollapsibleRequirement;
    onRequirementClick: (requirement: Requirement) => void;
  }> = ({ requirement, onRequirementClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <h3
          style={{
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            color: "#111827",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{requirement.name}</span>
          <span>{isOpen ? "▲" : "▼"}</span>
        </h3>
        {isOpen && (
          <div style={{ marginLeft: "16px", marginTop: "8px" }}>
            {requirement.subRequirements.map((subReq) => (
              <RequirementItem
                key={subReq.id}
                requirement={subReq}
                onRequirementClick={onRequirementClick}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  const RequirementItem: React.FC<{
    requirement: Requirement;
    onRequirementClick: (requirement: Requirement) => void;
  }> = ({ requirement, onRequirementClick }) => (
    <div
      style={{ cursor: "pointer", marginBottom: "8px" }}
      onClick={() => onRequirementClick(requirement)}
    >
      <h3
        style={{
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          color: "#1f2937",
        }}
      >
        <span>{requirement.name}</span>
        <span>
          {requirement.isElective
            ? `${requirement.completed}/${requirement.required} credits`
            : `${requirement.completed}/${requirement.required}`}
        </span>
      </h3>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e5e7eb",
          borderRadius: "9999px",
          height: "10px",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            backgroundColor: "#2563eb",
            height: "10px",
            borderRadius: "9999px",
            width: `${(requirement.completed / requirement.required) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );

  useEffect(() => {
    updateMajorRequirements();
  }, [semesters, apCredits]);

  useEffect(() => {
    if (activeView === "premium") {
      setSemesters((prevSemesters) => {
        const updatedSemesters = [...prevSemesters];
        preloadedSchedule.forEach((preloadedSemester) => {
          const index = updatedSemesters.findIndex(
            (sem) => sem.id === preloadedSemester.id
          );
          if (index !== -1) {
            updatedSemesters[index] = {
              ...updatedSemesters[index],
              courses: [
                ...preloadedSemester.courses,
                ...updatedSemesters[index].courses,
              ],
              credits:
                preloadedSemester.credits + updatedSemesters[index].credits,
            };
          }
        });
        return updatedSemesters;
      });

      setApCredits((prevCredits) => ({
        ...prevCredits,
        calculus: true,
      }));
    } else {
      setSemesters((prevSemesters) =>
        prevSemesters.map((semester) => ({
          ...semester,
          courses: semester.courses.filter((course) => !course.isPreloaded),
          credits: semester.courses
            .filter((course) => !course.isPreloaded)
            .reduce((sum, course) => sum + course.credits, 0),
        }))
      );

      setApCredits({
        calculus: false,
        statistics: false,
        microeconomics: false,
        macroeconomics: false,
      });
    }
  }, [activeView]);

  const createNewPlanner = () => {
    if (newPlannerName.trim() === "") {
      toast.error("Please enter a name for your planner.");
      return;
    }
    const newPlanner = {
      id: Date.now(),
      name: newPlannerName,
      semesters: [...semesters],
    };
    setPlanners([...planners, newPlanner]);
    setActivePlanner(newPlanner);
    setShowNewPlannerModal(false);
    setNewPlannerName("");
    toast.success(`Created new planner: ${newPlannerName}`);
  };

  const saveCurrentPlanner = () => {
    if (!activePlanner) {
      toast.error("No active planner to save.");
      return;
    }
    const updatedPlanners = planners.map((planner) =>
      planner.id === activePlanner.id ? { ...planner, semesters } : planner
    );
    setPlanners(updatedPlanners);
    toast.success("Planner saved successfully.");
  };

  const loadPlanner = (planner: {
    id: number;
    name: string;
    semesters: Semester[];
  }) => {
    setActivePlanner(planner);
    setSemesters(planner.semesters);
    toast.info(`Loaded planner: ${planner.name}`);
  };

  const resetPlanner = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the planner? This will remove all manually added courses."
    );

    if (confirmReset) {
      setSemesters((prevSemesters) =>
        prevSemesters.map((semester) => ({
          ...semester,
          courses: semester.courses.filter((course) => course.isPreloaded),
          credits: semester.courses
            .filter((course) => course.isPreloaded)
            .reduce((sum, course) => sum + course.credits, 0),
        }))
      );
      toast.info(
        "Planner has been reset. All manually added courses have been removed."
      );
    }
  };

  const generateAIPlan = () => {
    if (!selectedMajor) {
      toast.error("Please select a major.");
      return;
    }

    // Helper function to check if a requirement is fulfilled
    const isRequirementFulfilled = (requirement: Requirement) => {
      if (requirement.isElective) {
        return requirement.completed >= requirement.required;
      }
      return requirement.completed === requirement.required;
    };

    // Get unfulfilled requirements
    let unfulfilledRequirements: Requirement[] = [];
    if (selectedMajor === "business") {
      majorRequirements.requirements.forEach((requirement) => {
        if ("isCollapsible" in requirement) {
          requirement.subRequirements.forEach((subReq) => {
            if (!isRequirementFulfilled(subReq)) {
              unfulfilledRequirements.push(subReq);
            }
          });
        } else if (!isRequirementFulfilled(requirement)) {
          unfulfilledRequirements.push(requirement);
        }
      });
    } else if (selectedMajor === "cs") {
      const csRequirements = [
        {
          courses: csCoreCourses,
          required: csCoreCourses.length,
          isElective: false,
        },
        { courses: csElectives, required: 2, isElective: true },
        { courses: csAdditionalElectives, required: 5, isElective: true },
        {
          courses: csAdditionalRequirements,
          required: csAdditionalRequirements.length,
          isElective: false,
        },
      ];

      csRequirements.forEach((req) => {
        const completedCourses = semesters
          .flatMap((sem) => sem.courses)
          .filter((course) =>
            req.courses.some((reqCourse) => reqCourse.id === course.id)
          );
        const completed = completedCourses.length;
        if (completed < req.required) {
          unfulfilledRequirements.push({
            id: req.courses[0].id,
            name: req.courses[0].name,
            courses: req.courses.map((course) => course.id),
            completed: completed,
            required: req.required,
            isElective: req.isElective,
          });
        }
      });
    }

    // Get courses to suggest
    let coursesToSuggest: Course[] = [];
    unfulfilledRequirements.forEach((req) => {
      const remainingCount = req.isElective
        ? Math.ceil((req.required - req.completed) / 1.5) // Assuming most electives are 3 credit hours
        : req.required - req.completed;

      const availableCourses = req.courses
        .filter((courseId) => !isCourseTaken(courseId))
        .map((courseId) => courses.find((c) => c.id === courseId))
        .filter((course): course is Course => course !== undefined);

      // For electives, prefer 500+ level courses
      if (req.isElective) {
        availableCourses.sort((a, b) => {
          const levelA = parseInt(a.id.match(/\d+/)?.[0] || "0");
          const levelB = parseInt(b.id.match(/\d+/)?.[0] || "0");
          return levelB - levelA;
        });
      }

      coursesToSuggest = coursesToSuggest.concat(
        availableCourses.slice(0, remainingCount)
      );
    });

    // Add courses to semesters
    const newSemesters = [...semesters];
    let courseIndex = 0;

    for (
      let i = newSemesters.findIndex((sem) => sem.id === "Fall2026");
      i < newSemesters.length;
      i++
    ) {
      let semester = newSemesters[i];
      const semesterCourses = [...semester.courses];
      let semesterCredits = semester.credits;

      while (semesterCredits < 18 && courseIndex < coursesToSuggest.length) {
        const course = coursesToSuggest[courseIndex];

        if (course && semesterCredits + course.credits <= 18) {
          semesterCourses.push(course);
          semesterCredits += course.credits;
          courseIndex++;
        } else {
          break;
        }
      }

      newSemesters[i] = {
        ...semester,
        courses: semesterCourses,
        credits: semesterCredits,
      };

      if (courseIndex >= coursesToSuggest.length) break;
    }

    if (courseIndex < coursesToSuggest.length) {
      toast.warning(
        `Not all suggested courses could be added. ${
          coursesToSuggest.length - courseIndex
        } courses remaining.`
      );
    } else {
      toast.success("All suggested courses have been added to the plan.");
    }

    setSemesters(newSemesters);
    setShowAIPlanModal(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#f3f4f6",
        }}
      >
        {/* Header with tabs and Premium info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "white",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              borderRadius: "0.375rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <button
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                borderTopLeftRadius: "0.375rem",
                borderBottomLeftRadius: "0.375rem",
                backgroundColor: activeView === "basic" ? "#3B82F6" : "white",
                color: activeView === "basic" ? "white" : "#1F2937",
              }}
              onClick={() => setActiveView("basic")}
            >
              Basic
            </button>
            <button
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                borderTopRightRadius: "0.375rem",
                borderBottomRightRadius: "0.375rem",
                backgroundColor: activeView === "premium" ? "#3B82F6" : "white",
                color: activeView === "premium" ? "white" : "#1F2937",
              }}
              onClick={() => setActiveView("premium")}
            >
              Premium
            </button>
          </div>
          {activeView === "premium" && (
            <div
              style={{
                fontSize: "14px",
                color: "#1F2937",
                display: "flex",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setShowNewPlannerModal(true)}
                style={{
                  marginRight: "8px",
                  padding: "4px 8px",
                  backgroundColor: "#3B82F6",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                New Planner
              </button>
              <button
                onClick={saveCurrentPlanner}
                style={{
                  marginRight: "8px",
                  padding: "4px 8px",
                  backgroundColor: "#10B981",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Save Planner
              </button>
              <button
                onClick={() => setShowAIPlanModal(true)}
                style={{
                  marginRight: "8px",
                  padding: "4px 8px",
                  backgroundColor: "#8B5CF6",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                AI Plan
              </button>
              <button
                onClick={resetPlanner}
                style={{
                  marginRight: "8px",
                  padding: "4px 8px",
                  backgroundColor: "#EF4444",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Reset
              </button>
              <select
                value={activePlanner ? activePlanner.id.toString() : ""}
                onChange={(e) => {
                  const selectedPlanner = planners.find(
                    (p) => p.id.toString() === e.target.value
                  );
                  if (selectedPlanner) {
                    loadPlanner(selectedPlanner);
                  }
                }}
                style={{
                  marginRight: "8px",
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#1F2937",
                  borderRadius: "4px",
                }}
                aria-label="Select a planner"
              >
                <option value="">Select a planner</option>
                {planners.map((planner) => (
                  <option key={planner.id} value={planner.id.toString()}>
                    {planner.name}
                  </option>
                ))}
              </select>
              <select
                value={graduationSemester}
                onChange={(e) => setGraduationSemester(e.target.value)}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "white",
                  color: "#1F2937",
                  borderRadius: "4px",
                }}
                aria-label="Select graduation semester"
              >
                {["Spring2027", "Fall2027", "Spring2028"].map((semester) => (
                  <option key={semester} value={semester}>
                    Graduate {semester.replace(/(\d{4})/, " $1")}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Search section */}
          <div
            style={{
              width: "20%",
              padding: "16px",
              backgroundColor: "white",
              overflowY: "auto",
              borderRight: "1px solid #e5e7eb",
            }}
          >
            <input
              type="text"
              placeholder="Search courses"
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                color: "#111827",
              }}
            />
            <div style={{ marginBottom: "8px", color: "#4B5563" }}>
              Total items: {searchResults.length}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {searchResults.map((course) => (
                <SortableCourse
                key={course.id}
                course={course}
                removeCourseFromSemester={removeCourseFromSemester}
                semesters={semesters}
                />
              ))}
            </div>
          </div>

          {/* Semester grid */}
          <div
            style={{
              width: "60%",
              padding: "16px",
              backgroundColor: "#f3f4f6",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
            >
              {semesters.map((semester) => (
                <DroppableSemester key={semester.id} semester={semester}>
                  <SortableContext
                    items={semester.courses.map((course) => course.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {semester.courses.map((course) => (
                      <SortableCourse
                        key={course.id}
                        course={course}
                        semesterId={semester.id}
                        removeCourseFromSemester={(semesterId, courseId) => {
                          setSemesters((prevSemesters) =>
                            prevSemesters.map((sem) =>
                              sem.id === semesterId
                                ? {
                                    ...sem,
                                    courses: sem.courses.filter(
                                      (c) => c.id !== courseId
                                    ),
                                    credits: sem.courses
                                      .filter((c) => c.id !== courseId)
                                      .reduce((sum, c) => sum + c.credits, 0),
                                  }
                                : sem
                            )
                          );
                        }}
                        semesters={semesters}
                      />
                    ))}
                  </SortableContext>
                </DroppableSemester>
              ))}
            </div>
          </div>

          {/* Major Requirements Sidebar */}
          <div
            style={{
              width: "20%",
              padding: "16px",
              backgroundColor: "white",
              color: "#111827",
              overflowY: "auto",
              borderLeft: "1px solid #e5e7eb",
            }}
          >
            {/* Major toggle buttons */}
            <div style={{ display: "flex", marginBottom: "16px" }}>
              <button
                style={{
                  marginRight: "8px",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  backgroundColor:
                    activeMajor === "business" ? "#3B82F6" : "#E5E7EB",
                  color: activeMajor === "business" ? "white" : "#374151",
                }}
                onClick={() => setActiveMajor("business")}
              >
                Business
              </button>
              <button
                style={{
                  marginRight: "8px",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  backgroundColor: activeMajor === "cs" ? "#3B82F6" : "#E5E7EB",
                  color: activeMajor === "cs" ? "white" : "#374151",
                }}
                onClick={() => setActiveMajor("cs")}
              >
                CS
              </button>
              <button
                style={{
                  padding: "4px 12px",
                  borderRadius: "4px",
                  backgroundColor:
                    activeMajor === "genEd" ? "#3B82F6" : "#E5E7EB",
                  color: activeMajor === "genEd" ? "white" : "#374151",
                }}
                onClick={() => setActiveMajor("genEd")}
              >
                Gen-Ed
              </button>
            </div>

            {activeMajor === "business" ? (
              // Business Administration requirements
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: "#111827",
                  }}
                >
                  {majorRequirements.name}
                </h2>

                {/* Tab buttons */}
                <div style={{ display: "flex", marginBottom: "16px" }}>
                  <button
                    style={{
                      marginRight: "8px",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      backgroundColor:
                        activeTab === "requirements" ? "#3B82F6" : "#E5E7EB",
                      color: activeTab === "requirements" ? "white" : "#374151",
                    }}
                    onClick={() => setActiveTab("requirements")}
                  >
                    Requirements
                  </button>
                  <button
                    style={{
                      padding: "4px 12px",
                      borderRadius: "4px",
                      backgroundColor:
                        activeTab === "apCredits" ? "#3B82F6" : "#E5E7EB",
                      color: activeTab === "apCredits" ? "white" : "#374151",
                    }}
                    onClick={() => setActiveTab("apCredits")}
                  >
                    AP Credits
                  </button>
                </div>

                {/* Tab content */}
                {activeTab === "requirements" ? (
                  <div>
                    {majorRequirements.requirements.map((requirement) => (
                      <div
                        key={requirement.id}
                        style={{ marginBottom: "16px" }}
                      >
                        {"isCollapsible" in requirement ? (
                          <CollapsibleRequirement
                            requirement={requirement}
                            onRequirementClick={handleRequirementClick}
                          />
                        ) : (
                          <RequirementItem
                            requirement={requirement}
                            onRequirementClick={handleRequirementClick}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h3
                      style={{
                        fontWeight: 600,
                        marginBottom: "8px",
                        color: "#111827",
                      }}
                    >
                      Pre-College Credits
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {Object.entries(apCredits).map(([credit, value]) => (
                        <label
                          key={credit}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                            color: "#374151",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() =>
                              setApCredits((prev) => ({
                                ...prev,
                                [credit]: !prev[credit as keyof ApCredits],
                              }))
                            }
                            style={{ marginRight: "8px" }}
                          />
                          {credit.charAt(0).toUpperCase() + credit.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : activeMajor === "cs" ? (
              // Computer Science requirements
              <ComputerScienceMajorRequirements
                semesters={semesters}
                handleRequirementClick={handleRequirementClick}
                handleFindCourses={handleFindCourses}
              />
            ) : (
              // Gen-Ed requirements
              <GenEdRequirements
                semesters={semesters}
                handleFindCourses={(requirement) => {
                    setSearchResults([
                    ...requirement.availableCourses,
                    ...requirement.takenCourses.map((course: Course) => ({
                      ...course,
                      isTaken: true,
                    })),
                    ]);
                }}
                preloadedCourses={preloadedCourses}
                apCredits={apCredits}
                genEdCourses={genEdReq}
              />
            )}
          </div>
        </div>

        {/* Requirement Details Popup */}
        {showRequirementDetails && selectedRequirement && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                padding: "24px",
                borderRadius: "8px",
                maxWidth: "28rem",
                backgroundColor: "white",
                color: "#111827",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                {selectedRequirement.name}
              </h2>
              {selectedRequirement.isElective ? (
                <p style={{ color: "#374151" }}>
                  Kenan-Flagler Business School requires 15 credit hours of
                  electives to provide students with the flexibility to explore
                  various aspects of business and tailor their education to
                  their specific interests and career goals. These electives
                  allow students to gain deeper knowledge in specific areas,
                  complement their core business education, and develop a
                  well-rounded skill set that is highly valued in the business
                  world.
                </p>
              ) : (
                <p style={{ color: "#374151" }}>
                  This requirement is essential for your degree. Make sure to
                  complete all required courses.
                </p>
              )}
              <button
                onClick={() => handleFindCourses(selectedRequirement)}
                style={{
                  marginTop: "16px",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  backgroundColor: "#3B82F6",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Find Courses for this Requirement
              </button>
              <button
                onClick={() => setShowRequirementDetails(false)}
                style={{
                  marginTop: "16px",
                  marginLeft: "8px",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  backgroundColor: "#D1D5DB",
                  color: "#1F2937",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* New Planner Modal */}
        {showNewPlannerModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                padding: "24px",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "#111827",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                Create New Planner
              </h2>
              <input
                type="text"
                value={newPlannerName}
                onChange={(e) => setNewPlannerName(e.target.value)}
                placeholder="Enter planner name"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "16px",
                  borderRadius: "4px",
                  border: "1px solid #D1D5DB",
                  backgroundColor: "white",
                  color: "#111827",
                }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowNewPlannerModal(false)}
                  style={{
                    marginRight: "8px",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    backgroundColor: "#D1D5DB",
                    color: "#1F2937",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={createNewPlanner}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    backgroundColor: "#3B82F6",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Plan Modal */}
        {showAIPlanModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                padding: "24px",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "#111827",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                Generate AI Plan
              </h2>
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "16px",
                  borderRadius: "4px",
                  border: "1px solid #D1D5DB",
                  backgroundColor: "white",
                  color: "#111827",
                }}
                aria-label="Select a major"
              >
                <option value="">Select a major</option>
                <option value="business">Business Administration</option>
                <option value="cs">Computer Science</option>
              </select>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowAIPlanModal(false)}
                  style={{
                    marginRight: "8px",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    backgroundColor: "#D1D5DB",
                    color: "#1F2937",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={generateAIPlan}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "4px",
                    backgroundColor: "#3B82F6",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Generate Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <DragOverlay>
        {activeId ? (
          <div
            style={{
              padding: "8px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              ...getCourseColor(courses.find((c) => c.id === activeId)),
            }}
          >
            <span style={{ fontWeight: "bold" }}>{activeId}</span>
          </div>
        ) : null}
      </DragOverlay>
      <ToastContainer />
    </DndContext>
  );
};

export default DegreePlanning;
