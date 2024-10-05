import gql from "graphql-tag";

export const GET_USER_QUERY = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      email
      university
      yearInUniversity
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

export const CLASS_TAKEN_QUERY = gql`
  query ClassTaken($input: classTakenInput!) {
    classTaken(input: $input) {
      classId
      taken
    }
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
      dayOfWeek
      startTime
      endTime
      color
      professor
      rateMyProfessorRating
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
      dayOfWeek
      startTime
      endTime
      color
      professor
      rateMyProfessorRating
      coreDegreeId
      electiveDegreeId
    }
  }
`;

export const GET_CLASS_SCHEDULES_QUERY = gql`
  query GetClassSchedules($userId: String!) {
    getclassSchedules(userId: $userId) {
      id
      userId
      semesterId
      entries {
        id
        classId
        class {
          id
          classCode
          credits
          title
          dayOfWeek
          startTime
          endTime
          color
          professor
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
      class {
        id
        classCode
        title
        credits
        dayOfWeek
        startTime
        endTime
        color
        professor
      }
    }
  }
`;

export const GET_DEGREE_PLANNERS_QUERY = gql`
  query GetDegreePlanners($userId: String!) {
    getdegreePlanners(userId: $userId) {
      id
      userId
      degreeId
      semester {
        id
        name
        credits
        entries {
          id
          classId
          index
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
        index
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
        index
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
  query GetDegree($id: Int!) {
    getDegree(id: $id) {
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
  query GetTasks($userId: String!) {
    getTasks(userId: $userId) {
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