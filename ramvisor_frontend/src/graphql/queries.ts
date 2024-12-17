import gql from 'graphql-tag';

export const GET_USER_QUERY = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      email
      university
      isPremium
      yearInUniversity
      graduationSemesterName
      gpa
      attendancePercentage
      assignmentCompletionPercentage
      degreeId
      takenClassIds
      degree {
        id
        name
        coreCategories
        electiveCategories
        numberOfCores
        numberOfElectives
      }
    }
  }
`;

export const ME = gql`
    query Me {
        me {
        id
        email
        university
        isPremium
        yearInUniversity
        graduationSemesterName
        gpa
        attendancePercentage
        assignmentCompletionPercentage
        degreeId
        takenClassIds
        degree {
            id
            name
            }
        }
    }
`

export const CLASS_TAKEN_QUERY = gql`
  query ClassTaken($input: classTakenInput!) {
    classTaken(input: $input) {
      classIds
    }
  }
`;

export const GET_GRADUATION_SEMESTER_QUERY = gql`
  query GetGraduationSemester($id: String!) {
    getGraduationSemester(id: $id)
  }
`;

export const GET_PREMIUM_STATUS_QUERY = gql`
  query GetPremiumStatus($id: String!) {
    getPremiumStatus(id: $id)
  }
`;

export const GET_CLASSES_QUERY = gql`
  query GetClasses {
    getClasses {
      id
      classCode
      credits
      courseType
      title
      description
      category
      sections {
        id
        section
        classId
        dayOfWeek
        startTime
        endTime
        professor
        rateMyProfessorRating
      }
      color
      coreDegreeId
      electiveDegreeId
    }
  }
`;

export const GET_CLASS_QUERY = gql`
  query GetClass($id: Int!) {
    getClass(id: $id) {
      id
      classCode
      credits
      courseType
      title
      description
      category
      sections {
        id
        dayOfWeek
        startTime
        endTime
        professor
        rateMyProfessorRating
      }
      color
      coreDegreeId
      electiveDegreeId
    }
  }
`;

export const GET_CLASS_SCHEDULES_QUERY = gql`
  query GetClassSchedules {
    getClassSchedules {
      id
      userId
      semesterId
      entries {
        id
        classScheduleId
        classId
        sectionId
        class {
          id
          classCode
          credits
          courseType
          title
          description
          category
          sections {
            id
            section
            classId
            dayOfWeek
            startTime
            endTime
            professor
            rateMyProfessorRating
          }
          color
        }
      }
    }
  }
`;

export const GET_CLASS_SCHEDULE_ENTRIES_QUERY = gql`
  query GetClassScheduleEntries($classScheduleId: Int!) {
    getClassScheduleEntries(classScheduleId: $classScheduleId) {
      id
      classScheduleId
      classId
      sectionId
      class {
        id
        classCode
        credits
        courseType
        title
        description
        category
        sections {
          id
          section
          classId
          dayOfWeek
          startTime
          endTime
          professor
          rateMyProfessorRating
        }
        color
      }
    }
  }
`;

export const GET_DEGREE_PLANNERS_QUERY = gql`
  query GetDegreePlanners($userId: String!) {
    getdegreePlanners(userId: $userId) {
      id
      title
      userId
      degreeId
      semester {
        id
        name
        credits
        entries {
          id
          classId
          class {
            id
            classCode
            title
            credits
          }
        }
      }
    }
  }
`;

export const GET_SEMESTERS_QUERY = gql`
  query GetSemesters($plannerId: Int!) {
    getsemesters(plannerId: $plannerId) {
      id
      name
      credits
      degreeId
      plannerId
      entries {
        id
        classId
        class {
          id
          classCode
          credits
          title
        }
      }
    }
  }
`;

export const GET_SEMESTER_QUERY = gql`
  query GetSemester($id: Int!) {
    getSemester(id: $id) {
      id
      name
      credits
      degreeId
      plannerId
      entries {
        id
        classId
        class {
          id
          classCode
          credits
          title
        }
      }
    }
  }
`;

export const GET_ALL_DEGREES_QUERY = gql`
  query GetAllDegrees {
    getAlldegrees {
      id
      name
      coreCategories
      electiveCategories
      numberOfCores
      numberOfElectives
    }
  }
`;

export const GET_DEGREE_QUERY = gql`
  query GetDegree($userId: String!) {
    getDegree(userId: $userId) {
      id
      name
      coreCategories
      electiveCategories
      numberOfCores
      numberOfElectives
    }
  }
`;

export const GET_TASKS_QUERY = gql`
  query GetTasks {
    getTasks {
      id
      userId
      dueDate
      stageId
      classCode
      description
      title
    }
  }
`;

export const GET_REQUIREMENT_QUERY = gql`
  query GetRequirement($category: String!, $degreeId: Int!) {
    getRequirement(category: $category, degreeId: $degreeId) {
      id
      category
      isElective
      classIds
      degreeId
    }
  }
`;

export const GET_REQUIREMENTS_QUERY = gql`
  query GetRequirements($degreeId: Int!) {
    getRequirements(degreeId: $degreeId) {
      id
      category
      isElective
      classIds
      degreeId
    }
  }
`;