import React, { useState, useEffect } from 'react';

// Types
interface Course {
  id: string;
  name: string;
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

interface Semester {
  id: string;
  name: string;
  courses: Course[];
  credits: number;
}

interface ComputerScienceMajorRequirementsProps {
  semesters: Semester[];
  handleRequirementClick: (requirement: Requirement) => void;
  handleFindCourses: (requirement: Requirement) => void;
}

export const csCoreCourses: Course[] = [
  { id: 'COMP110', name: 'Introduction to Programming and Data Science', credits: 3 },
  { id: 'COMP210', name: 'Data Structures and Analysis', credits: 3 },
  { id: 'COMP211', name: 'Systems Fundamentals', credits: 3 },
  { id: 'COMP301', name: 'Foundations of Programming', credits: 3 },
  { id: 'COMP311', name: 'Computer Organization', credits: 3 },
  { id: 'COMP283', name: 'Discrete Structures', credits: 3 },
];

export const csElectives: Course[] = [
  { id: 'COMP420', name: 'Web Programming', credits: 3 },
  { id: 'COMP421', name: 'Files and Databases', credits: 3 },
  { id: 'COMP426', name: 'Modern Web Programming', credits: 3 },
  // Add more CS electives here
];

export const csAdditionalElectives: Course[] = [
  { id: 'BIOL525', name: 'Analysis and Interpretation of Sequence-Based Functional Genomics Experiments', credits: 3 },
  { id: 'BIOL554', name: 'Introduction to Computational Neuroscience', credits: 3 },
  // Add more additional electives here
];

export const csAdditionalRequirements: Course[] = [
  { id: 'MATH231', name: 'Calculus of Functions of One Variable I', credits: 4 },
  { id: 'STOR155', name: 'Introduction to Data Models and Inference', credits: 3 },
];

export const allCsCourses: Course[] = [
  ...csCoreCourses,
  ...csElectives,
  ...csAdditionalElectives,
  ...csAdditionalRequirements
];

const ComputerScienceMajorRequirements: React.FC<ComputerScienceMajorRequirementsProps> = ({ 
  semesters, 
  handleRequirementClick,
  handleFindCourses,
}) => {
  const [csMajorRequirements, setCsMajorRequirements] = useState<{
    name: string;
    requirements: Requirement[];
  }>({
    name: 'Computer Science',
    requirements: [
      {
        id: 'cs_core',
        name: 'Core Courses',
        courses: csCoreCourses.map(course => course.id),
        completed: 0,
        required: csCoreCourses.length
      },
      {
        id: 'cs_electives',
        name: 'COMP Electives (420 or higher)',
        courses: csElectives.map(course => course.id),
        completed: 0,
        required: 2,
        isElective: true
      },
      {
        id: 'cs_additional_electives',
        name: 'Additional Electives',
        courses: csAdditionalElectives.map(course => course.id),
        completed: 0,
        required: 4,
        isElective: true
      },
      {
        id: 'cs_additional_req',
        name: 'Additional Requirements',
        courses: csAdditionalRequirements.map(course => course.id),
        completed: 0,
        required: csAdditionalRequirements.length
      }
    ]
  });

  useEffect(() => {
    updateCsMajorRequirements();
  }, [semesters]);

  const updateCsMajorRequirements = () => {
    const allSelectedCourses = semesters.flatMap(semester => semester.courses);
    
    setCsMajorRequirements(prevRequirements => ({
      ...prevRequirements,
      requirements: prevRequirements.requirements.map(requirement => 
        updateRequirement(requirement, allSelectedCourses)
      )
    }));
  };

  const updateRequirement = (req: Requirement, selectedCourses: Course[]): Requirement => {
    if (req.isElective) {
      const completedCourses = selectedCourses.filter(course => 
        req.courses.includes(course.id)
      );
      return { ...req, completed: completedCourses.length };
    } else {
      const completed = req.courses.filter(courseId => 
        selectedCourses.some(c => c.id === courseId)
      ).length;
      return { ...req, completed: Math.min(completed, req.required) };
    }
  };

  const RequirementItem: React.FC<{
    requirement: Requirement;
    onRequirementClick: (requirement: Requirement) => void;
  }> = ({ requirement, onRequirementClick }) => (
    <div 
      style={{
        cursor: 'pointer',
        marginBottom: '16px',
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: '#f3f4f6',
        transition: 'background-color 0.2s',
      }}
      onClick={() => onRequirementClick(requirement)}
    >
      <h3 style={{
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'space-between',
        color: '#1f2937',
        marginBottom: '8px',
      }}>
        <span>{requirement.name}</span>
        <span>{requirement.completed}/{requirement.required}</span>
      </h3>
      <div style={{
        width: '100%',
        backgroundColor: '#e5e7eb',
        borderRadius: '9999px',
        height: '8px',
      }}>
        <div 
          style={{
            width: `${(requirement.completed / requirement.required) * 100}%`,
            backgroundColor: '#3b82f6',
            height: '8px',
            borderRadius: '9999px',
            transition: 'width 0.3s ease-in-out',
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div style={{
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#111827',
      }}>
        {csMajorRequirements.name}
      </h2>
      
      {csMajorRequirements.requirements.map(requirement => (
        <RequirementItem 
          key={requirement.id} 
          requirement={requirement} 
          onRequirementClick={handleRequirementClick} 
        />
      ))}
    </div>
  );
};

export default ComputerScienceMajorRequirements;