export const firstYearFoundations = [
    { 
      title: "Writing At the Research University",
      status: "satisfied",
      course: { code: "ENGL 105" }
    },
    { 
      title: "College Thriving",
      status: "satisfied",
      course: { code: "IDST 101" }
    },
    { 
      title: "First Year Seminar or Launch",
      status: "satisfied",
      course: { code: "HIST 53" }
    },
    { 
      title: "Triple I: Ideas, Information & Inquiry",
      status: "satisfied",
      course: { code: "IDST 126" }
    },
    { 
      title: "Data Literacy",
      status: "satisfied",
      course: { code: "IDST 126L" }
    },
    { 
      title: "Global Language Level 3 or Higher",
      status: "not_satisfied",
      course: null
    }
  ];
  
  export const focusCapacities = [
    { 
      title: "Aesthetic & Interpretive Analysis",
      status: "not_satisfied",
      course: null
    },
    { 
      title: "Creative Expression, Practice, & Production",
      status: "satisfied",
      course: { code: "ECON 125" }
    },
    { 
      title: "Engagement with the Human Past",
      status: "satisfied",
      course: { code: "HIST 140" }
    },
    { 
      title: "Ethical & Civic Values",
      status: "satisfied",
      course: { code: "PHIL 101" }
    },
    { 
      title: "Global Understanding & Engagement",
      status: "satisfied",
      course: { code: "PWAD 150" }
    },
    { 
      title: "Natural Scientific Investigation",
      status: "satisfied",
      course: { code: "PHYS 114" }
    },
    { 
      title: "Power, Difference, & Inequality",
      status: "satisfied",
      course: { code: "COMM 348" }
    },
    { 
      title: "Quantitative Reasoning",
      status: "satisfied",
      course: { code: "MATH 231" }
    },
    { 
      title: "Ways of Knowing",
      status: "satisfied",
      course: { code: "ECON 101" }
    },
    
  ];
  
  export const bSchoolPrerequisites = [
    { 
      title: "Calculus",
      status: "satisfied",
      course: { 
        code: "MATH 231",
        description: "CALC FUNC ONE VAR I",
        status: "AP Credit"
      }
    },
    { 
      title: "Statistics",
      status: "satisfied",
      course: { 
        code: "STOR 155",
        description: "INTRO TO DATA MODELS AND INFERENCE"
      }
    },
    { 
      title: "Intro to Business",
      status: "satisfied",
      course: { 
        code: "BUSI 100",
        description: "INTRODUCTION TO BUSINESS"
      }
    },
    { 
      title: "Intro to Economics",
      status: "satisfied",
      course: { 
        code: "ECON 101",
        description: "INTRODUCTION TO ECONOMICS"
      }
    }
  ];
  
  export const empiricalInvestigativeLab = [
    { 
      title: "Empirical Laboratory",
      status: "satisfied",
      course: { code: "PHYS 114" }
    }
  ];
  
  export const reflectionAndIntegration = [
    { 
      title: "Research and Discovery",
      status: "not_satisfied",
      course: null
    },
    { 
      title: "High Impact Experience",
      status: "satisfied",
      course: { code: "BUSI 505" }
    },
    { 
      title: "Communication Beyond Carolina",
      status: "satisfied",
      course: { code: "BUSI 401" }
    },
    { 
      title: "Lifetime Fitness (LFIT)",
      status: "satisfied",
      course: { code: "LFIT 111" }
    }
  ];
  
  export const majorCourses = [
    { code: "BUSI 401", status: "not_satisfied" },
    { code: "BUSI 403", status: "not_satisfied" },
    { code: "BUSI 405", status: "not_satisfied" },
    { code: "BUSI 406", status: "not_satisfied" },
    { code: "BUSI 407", status: "not_satisfied" },
    { code: "BUSI 408", status: "not_satisfied" },
    { code: "BUSI 410", status: "not_satisfied" },
    { code: "BUSI 411", status: "not_satisfied" },
    { code: "BUSI 412", status: "not_satisfied" }
  ];
  
  export const totalHours = [
    { name: 'Taken', value: 60, color: '#4CAF50' },
    { name: 'In Progress', value: 15, color: '#FFC107' },
    { name: 'Needed', value: 45, color: '#F44336' },
  ];
  
  export const disciplinaryDistribution = [
    { name: 'Math & Science', value: 30, color: '#3F51B5' },
    { name: 'Humanity', value: 40, color: '#E91E63' },
    { name: 'Social Science', value: 30, color: '#009688' },
  ];

  // courseData.js

// ... (keep all the existing data)

// Add the following at the end of the file:

export const majors = {
    businessAdministration: {
      name: "Business Administration B.S.B.A",
      requirements: [
        { id: 'BUSI401', name: 'Management Communication', credits: 3, category: 'core' },
        { id: 'BUSI403', name: 'Operations Management', credits: 3, category: 'core' },
        { id: 'BUSI404', name: 'Legal & Ethical Environment of Business', credits: 1.5, category: 'core' },
        { id: 'BUSI405', name: 'Leading and Managing', credits: 3, category: 'core' },
        { id: 'BUSI406', name: 'Principles of Marketing', credits: 3, category: 'core' },
        { id: 'BUSI407', name: 'Financial Accounting', credits: 3, category: 'core' },
        { id: 'BUSI408', name: 'Corporate Finance', credits: 3, category: 'core' },
        { id: 'BUSI410', name: 'Business Analytics', credits: 3, category: 'core' },
        { id: 'BUSI411', name: 'Strategic Management', credits: 1.5, category: 'core' },
        { id: 'BUSI412', name: 'Strategic Management in the Modern Corporation', credits: 1.5, category: 'core' },
      ],
      electives: [
        // ... (add all the elective courses from the previous DegreePlanning.js)
      ]
    },
    computerScience: {
      name: "Computer Science B.A",
      requirements: [
        { id: 'COMP110', name: 'Introduction to Programming and Data Science', credits: 3, category: 'core' },
        { id: 'COMP210', name: 'Data Structures and Analysis', credits: 3, category: 'core' },
        { id: 'COMP211', name: 'Systems Fundamentals', credits: 3, category: 'core' },
        { id: 'COMP301', name: 'Foundations of Programming', credits: 3, category: 'core' },
        { id: 'COMP311', name: 'Computer Organization', credits: 3, category: 'core' },
        { id: 'COMP283', name: 'Discrete Structures', credits: 3, category: 'core' },
        { id: 'MATH231', name: 'Calculus of Functions of One Variable I', credits: 4, category: 'additional' },
        { id: 'STOR155', name: 'Introduction to Data Models and Inference', credits: 3, category: 'additional' },
      ],
      electives: [
        { id: 'COMP420', name: 'Elective Course 420+', credits: 3, category: 'elective' },
        { id: 'COMP421', name: 'Elective Course 420+', credits: 3, category: 'elective' },
        { id: 'COMPE1', name: 'Additional Elective 1', credits: 3, category: 'elective' },
        { id: 'COMPE2', name: 'Additional Elective 2', credits: 3, category: 'elective' },
        { id: 'COMPE3', name: 'Additional Elective 3', credits: 3, category: 'elective' },
        { id: 'COMPE4', name: 'Additional Elective 4', credits: 3, category: 'elective' },
      ],
      additionalElectives: [
        'BIOL 525', 'BIOL 554', 'BIOS 512', 'BIOS 611', 'BIOS 635', 'ECON 525', 'ECON 573',
        'INLS 318', 'INLS 418', 'INLS 509', 'INLS 512', 'INLS 523', 'INLS 609', 'INLS 613',
        'INLS 623', 'INLS 672', 'INLS 718', 'LING 401', 'LING 540', 'MATH 566', 'MATH 661',
        'ENVR 661', 'PHYS 231', 'PHYS 331', 'PSYC 559', 'STOR 520', 'STOR 565', 'STOR 566'
      ]
    }
  };
  
  export const minors = {
    entrepreneurship: {
      name: "Entrepreneurship",
      requirements: [
        { id: 'ECON101', name: 'Introduction to Economics', credits: 3, category: 'core' },
        { id: 'ECON125', name: 'Introduction to Entrepreneurship', credits: 3, category: 'core' },
        { id: 'ECON325', name: 'Entrepreneurship: Principles, Concepts, Frameworks, and Fluency', credits: 3, category: 'core' },
        { id: 'ECON393', name: 'Practicum in Entrepreneurship', credits: 3, category: 'capstone' },
      ],
      trackCourses: [
        { id: 'COMP325', name: 'How to Build a Software Startup', credits: 3 },
        { id: 'ECON327', name: 'Venture-Creation Workshop', credits: 3 },
        { id: 'ENEC473', name: 'Business and Finance Fundamentals for Change Makers', credits: 3 },
        { id: 'MEJO592', name: 'Workroom FashionMash Product Design', credits: 3 },
        { id: 'PLCY326', name: 'Social Entrepreneurship', credits: 3 },
        { id: 'SPHG428H', name: 'Public Health Entrepreneurship', credits: 3 },
        { id: 'SOCI302', name: 'Fieldwork in Entrepreneurship', credits: 3 },
        { id: 'SOCI427', name: 'The Labor Force', credits: 3 },
      ],
      additionalRequirements: "Complete a 320-hour internship with a start-up or employer approved by the internship coordinator of the minor."
    }
  };
  // Consolidate general education requirements
export const generalEducation = {
  firstYearFoundations,
  focusCapacities,
  empiricalInvestigativeLab,
  reflectionAndIntegration
};

// Modify course objects to include more details
export const allCourses = [
  ...majors.businessAdministration.requirements,
  ...majors.computerScience.requirements,
  ...minors.entrepreneurship.requirements,
  ...minors.entrepreneurship.trackCourses,
  // Add all other courses here
].map(course => ({
  ...course,
  description: "Course description placeholder", // Add actual descriptions
  prerequisites: [], // Add actual prerequisites
}));

  export const semesterData = {
    previouslyCompleted: [
      { id: 'MATH232', name: 'Calculus of Functions of One Variable II', credits: 4 },
      { id: 'HIST104', name: 'Ancient World History', credits: 3 },
      { id: 'PHYS114', name: 'General Physics I', credits: 4 },
    ],
    pastSemesters: [
      {
        id: 'Fall2022',
        name: 'Fall 2022',
        courses: [
          { id: 'IDST101', name: 'College Thriving', credits: 1 },
          { id: 'POLI150', name: 'International Relations', credits: 3 },
          { id: 'ENGL105', name: 'English', credits: 3 },
          { id: 'STOR155', name: 'Statistics', credits: 3 },
          { id: 'ECON101', name: 'Economics', credits: 3 },
          { id: 'HIST140', name: 'World After 1945', credits: 3 },
        ],
        credits: 17,
        type: 'past'
      },
      {
        id: 'Spring2023',
        name: 'Spring 2023',
        courses: [
          { id: 'ECON310', name: 'Intermediate Microeconomics', credits: 3 },
          { id: 'PHIL101', name: 'Philosophy', credits: 3 },
          { id: 'IDST126L', name: 'Lab', credits: 1 },
          { id: 'IDST126', name: 'Values and Prices', credits: 3 },
          { id: 'HIST53', name: 'Hemingway and Others', credits: 3 },
          { id: 'ECON125', name: 'Entrepreneurship', credits: 3 },
        ],
        credits: 16,
        type: 'past'
      },
      {
        id: 'Fall2023',
        name: 'Fall 2023',
        courses: [
          { id: 'ECON410', name: 'Intermediate Micro', credits: 3 },
          { id: 'LFIT111', name: 'Swimming', credits: 1 },
          { id: 'HIST364', name: 'History of American Business', credits: 3 },
          { id: 'BUSI100', name: 'Intro to Business', credits: 3 },
          { id: 'COMM348', name: 'Algorithms in Society', credits: 3 },
          { id: 'ECON325', name: 'Entrepreneurship', credits: 3 },
        ],
        credits: 15.5,
        type: 'past'
      },
      {
        id: 'Spring2024',
        name: 'Spring 2024',
        courses: [
          { id: 'BUSI488', name: 'Data Science in the Business World', credits: 3 },
          { id: 'COMP110', name: 'Intro to Programming', credits: 3 },
          { id: 'BUSI407', name: 'Accounting', credits: 3 },
          { id: 'ECON327', name: 'Branding', credits: 3 },
          { id: 'BUSI506', name: 'Venture Capital', credits: 3 },
          { id: 'BUSI505', name: 'Entrepreneurial Consulting', credits: 3 },
        ],
        credits: 18,
        type: 'past'
      },
    ],
    inProgress: {
      id: 'Fall2024',
      name: 'Fall 2024',
      courses: [
        { id: 'BUSI406', name: 'Marketing', credits: 3 },
        { id: 'COMP283', name: 'Discrete Structures', credits: 3 },
        { id: 'BUSI408', name: 'Finance', credits: 3 },
        { id: 'BUSI405', name: 'Organizational Behavior', credits: 3 },
        { id: 'BUSI403', name: 'Operations and Technology Management', credits: 3 },
      ],
      credits: 15,
      type: 'inProgress'
    },
    futureSemesters: [
      { id: 'Spring2025', name: 'Spring 2025', courses: [], credits: 0, type: 'future' },
      { id: 'Fall2025', name: 'Fall 2025', courses: [], credits: 0, type: 'future' },
      { id: 'Spring2026', name: 'Spring 2026', courses: [], credits: 0, type: 'future' },
    ]
  };