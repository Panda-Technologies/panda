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
import { Alert } from "antd";

interface Course {
  id: string;
  name: string;
  credits: number;
  category?: string;
  requirementId?: string;
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
  const coreCourses: Course[] = [
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

  const prerequisiteCourses: Course[] = [
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

  const electiveCourses: Course[] = [
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

  const [courses] = useState<Course[]>([
    ...coreCourses,
    ...prerequisiteCourses,
    ...electiveCourses,
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    updateMajorRequirements();
  }, [semesters, apCredits]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over && over.data.current && over.data.current.type === "semester") {
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

    if (over.data.current.type === "semester") {
      handleDropIntoSemester(active.id as string, over.id as string);
    } else {
      handleReorderWithinSemester(
        active.id as string,
        over.id as string,
        over.data.current.semesterId as string
      );
    }

    setActiveId(null);
    setActiveSemester(null);
  };

  const handleDropIntoSemester = (courseId: string, semesterId: string) => {
    const course = courses.find((c) => c.id === courseId);
    const semesterIndex = semesters.findIndex((s) => s.id === semesterId);

    if (!course || semesterIndex === -1) return;

    setSemesters((prevSemesters) => {
      const newSemesters = [...prevSemesters];
      const targetSemester = newSemesters[semesterIndex];

      if (targetSemester.credits + course.credits > 18) {
        toast.error("Cannot add course. It would exceed the 18 credit limit.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return prevSemesters;
      }

      // Remove course from other semesters
      newSemesters.forEach((sem) => {
        const removedCourse = sem.courses.find((c) => c.id === course.id);
        if (removedCourse) {
          sem.courses = sem.courses.filter((c) => c.id !== course.id);
          sem.credits -= removedCourse.credits;
        }
      });

      // Add course to target semester
      if (!targetSemester.courses.some((c) => c.id === course.id)) {
        targetSemester.courses.push({ ...course });
        targetSemester.credits += course.credits;
        toast.success(`Added ${course.id} to ${targetSemester.name}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      return newSemesters;
    });
  };

  const handleReorderWithinSemester = (
    activeId: string,
    overId: string,
    semesterId: string
  ) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              courses: arrayMove(
                semester.courses,
                semester.courses.findIndex((c) => c.id === activeId),
                semester.courses.findIndex((c) => c.id === overId)
              ),
            }
          : semester
      )
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
            !semesters.some((sem) =>
              sem.courses.some((c) => c.id === course.id)
            )
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  const updateMajorRequirements = () => {
    const allSelectedCourses = semesters.flatMap(
      (semester) => semester.courses
    );

    setMajorRequirements((prevRequirements) => ({
      ...prevRequirements,
      requirements: prevRequirements.requirements.map((requirement) => {
        if ("isCollapsible" in requirement && requirement.isCollapsible) {
          return {
            ...requirement,
            subRequirements: requirement.subRequirements.map((subReq) =>
              updateRequirement(subReq, allSelectedCourses)
            ),
          };
        } else {
          return updateRequirement(requirement as Requirement, allSelectedCourses);
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

      // Check for AP credits
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

  const handleFindCourses = () => {
    if (selectedRequirement) {
      setSearchResults(
        courses.filter(
          (course) =>
            selectedRequirement.courses.includes(course.id) &&
            !semesters.some((sem) =>
              sem.courses.some((c) => c.id === course.id)
            )
        )
      );
      setShowRequirementDetails(false);
    }
  };

  const getCourseColor = (course: Course | undefined): React.CSSProperties => {
    if (!course) return {};
  
    if (prerequisiteCourses.some((pc) => pc.id === course.id)) {
      return { backgroundColor: '#fce7f3', color: '#831843' };
    } else if (coreCourses.some((cc) => cc.id === course.id)) {
      return { backgroundColor: '#e9d5ff', color: '#581c87' };
    } else if (electiveCourses.some((ec) => ec.id === course.id)) {
      return { backgroundColor: '#dbeafe', color: '#1e3a8a' };
    } else {
      return { backgroundColor: '#e0e7ff', color: '#312e81' };
    }
  };

  interface SortableCourseProps {
    course: Course;
    semesterId?: string;
    removeCourseFromSemester: (semesterId: string, courseId: string) => void;
    semesters: Semester[];
  }

  const SortableCourse: React.FC<SortableCourseProps> = ({
    course,
    semesterId,
    removeCourseFromSemester,
    semesters,
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: course.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (semesterId) {
        removeCourseFromSemester(semesterId, course.id);
      }
    };

    const courseColor = getCourseColor(course);

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
          <div
            style={{
              ...courseColor,
              marginBottom: '4px',
              borderRadius: '4px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              ref={setNodeRef}
              style={{
                ...style,
                flexGrow: 1,
                padding: '4px',
                cursor: 'move',
                fontSize: '12px',
              }}
              {...attributes}
              {...listeners}
            >
              <span style={{ fontWeight: 'bold' }}>{course.id}</span>
            </div>
            <div>
              <button
                onClick={handleRemove}
                style={{
                  padding: '0 4px',
                  color: '#dc2626',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
          </div>
        );
      }

    // Full version for search results
    return (
        <div style={{ marginBottom: '8px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
              ...style,
              ...courseColor,
              padding: '8px',
              cursor: 'move',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{course.id}</span>
          </div>
          <div style={{ padding: '8px', backgroundColor: 'white', color: '#374151' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{course.name}</div>
            <div style={{ fontSize: '12px', color: '#2563eb' }}>
              Previously offered in Fall 2024
            </div>
            {scheduleInfo && (
              <div style={{ fontSize: '12px', color: '#d97706', marginTop: '4px' }}>{scheduleInfo}</div>
            )}
          </div>
        </div>
      );
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

  interface DroppableSemesterProps {
    semester: Semester;
    children: React.ReactNode;
  }

  const DroppableSemester: React.FC<DroppableSemesterProps> = ({
    semester,
    children,
  }) => {
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
            padding: '12px',
            borderRadius: '8px',
            minHeight: '320px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            transition: 'background-color 0.2s',
            backgroundColor: isActive ? '#dbeafe' : 'white',
            border: '1px solid #bfdbfe',
          }}
        >
          <h3 style={{
            marginBottom: '8px',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '14px',
            padding: '8px 0',
            borderRadius: '4px',
            backgroundColor: '#bfdbfe',
            color: '#1e40af',
          }}>
            {semester.name}
          </h3>
          <p style={{
            textAlign: 'center',
            fontSize: '12px',
            marginBottom: '8px',
            color: isOverCreditLimit ? '#dc2626' : '#2563eb',
            fontWeight: isOverCreditLimit ? 'bold' : 'normal',
          }}>
            Credits: {semester.credits}
          </p>
          {isOverCreditLimit && (
            <p style={{
              color: '#dc2626',
              fontSize: '12px',
              textAlign: 'center',
              marginBottom: '8px',
            }}>
              Maximum credits (18) exceeded!
            </p>
          )}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {children}
          </div>
        </div>
      );
    };

  interface CollapsibleRequirementProps {
    requirement: CollapsibleRequirement;
    onRequirementClick: (requirement: Requirement) => void;
  }

  const CollapsibleRequirement: React.FC<CollapsibleRequirementProps> = ({
    requirement,
    onRequirementClick,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <h3
          style={{
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#111827',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{requirement.name}</span>
          <span>{isOpen ? "▲" : "▼"}</span>
        </h3>
        {isOpen && (
          <div style={{ marginLeft: '16px', marginTop: '8px' }}>
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

  interface RequirementItemProps {
    requirement: Requirement;
    onRequirementClick: (requirement: Requirement) => void;
  }

  const RequirementItem: React.FC<RequirementItemProps> = ({
    requirement,
    onRequirementClick,
  }) => (
    <div
      style={{ cursor: 'pointer', marginBottom: '8px' }}
      onClick={() => onRequirementClick(requirement)}
    >
      <h3 style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between', color: '#1f2937' }}>
        <span>{requirement.name}</span>
        <span>
          {requirement.isElective
            ? `${requirement.completed}/${requirement.required} credits`
            : `${requirement.completed}/${requirement.required}`}
        </span>
      </h3>
      <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '10px', marginTop: '4px' }}>
        <div
          style={{
            backgroundColor: '#2563eb',
            height: '10px',
            borderRadius: '9999px',
            width: `${(requirement.completed / requirement.required) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
        {/* Search section */}
        <div style={{ width: '20%', padding: '16px', backgroundColor: 'white', overflowY: 'auto', borderRight: '1px solid #e5e7eb' }}>
          <input
            type="text"
            placeholder="Search courses"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              color: '#111827',
            }}
          />
          <div style={{ marginBottom: '8px', color: '#4b5563' }}>
            Total items: {searchResults.length}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
        <div style={{ width: '60%', padding: '16px', backgroundColor: '#f3f4f6', overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
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
                      removeCourseFromSemester={removeCourseFromSemester}
                      semesters={semesters}
                    />
                  ))}
                </SortableContext>
              </DroppableSemester>
            ))}
          </div>
        </div>

        {/* Major Requirements Sidebar */}
        <div style={{ width: '20%', padding: '16px', backgroundColor: 'white', color: '#111827', overflowY: 'auto', borderLeft: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
            {majorRequirements.name}
          </h2>

          {/* Tab buttons */}
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <button
              style={{
                marginRight: '8px',
                padding: '4px 12px',
                borderRadius: '4px',
                transition: 'background-color 0.3s',
                backgroundColor: activeTab === "requirements" ? '#2563eb' : '#e5e7eb',
                color: activeTab === "requirements" ? 'white' : '#374151',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab("requirements")}
            >
              Requirements
            </button>
            <button
              style={{
                padding: '4px 12px',
                borderRadius: '4px',
                transition: 'background-color 0.3s',
                backgroundColor: activeTab === "apCredits" ? '#2563eb' : '#e5e7eb',
                color: activeTab === "apCredits" ? 'white' : '#374151',
                cursor: 'pointer',
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
                <div key={requirement.id} style={{ marginBottom: '16px' }}>
                  {"isCollapsible" in requirement &&
                  requirement.isCollapsible ? (
                    <CollapsibleRequirement
                      requirement={requirement}
                      onRequirementClick={handleRequirementClick}
                    />
                  ) : (
                    <RequirementItem
                      requirement={requirement as Requirement}
                      onRequirementClick={handleRequirementClick}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3 style={{ fontWeight: 600, marginBottom: '8px', color: '#111827' }}>
                Pre-College Credits
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {Object.entries(apCredits).map(([credit, value]) => (
                  <label
                    key={credit}
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#374151' }}
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() =>
                        setApCredits((prev) => ({
                          ...prev,
                          [credit]: !prev[credit],
                        }))
                      }
                      style={{ marginRight: '8px' }}
                    />
                    {credit.charAt(0).toUpperCase() + credit.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Requirement Details Popup */}
        {showRequirementDetails && selectedRequirement && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '28rem',
              backgroundColor: 'white',
              color: '#111827',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                {selectedRequirement.name}
              </h2>
              {selectedRequirement.isElective ? (
                <p style={{ color: '#374151' }}>
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
                <p style={{ color: '#374151' }}>
                  This requirement is essential for your degree. Make sure to
                  complete all required courses.
                </p>
              )}
              <button
                onClick={handleFindCourses}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Find Courses for this Requirement
              </button>
              <button
                onClick={() => setShowRequirementDetails(false)}
                style={{
                  marginTop: '16px',
                  marginLeft: '8px',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: '#d1d5db',
                  color: '#1f2937',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <DragOverlay>
        {activeId ? (
          <div
            style={{
              padding: '8px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              ...getCourseColor(courses.find((c) => c.id === activeId)),
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{activeId}</span>
          </div>
        ) : null}
      </DragOverlay>
      <ToastContainer />
    </DndContext>
  );
};

export default DegreePlanning;