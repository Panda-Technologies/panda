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
      tasks {
        id
        title
        dueDate
        stageId
        classCode
        description
      }
      classSchedules {
        id
        semesterId
        entries {
          id
          classId
          class {
            id
            classCode
            title
            dayOfWeek
            startTime
            endTime
            color
            professor
          }
        }
      }
      degreeSchedules {
        id
        semesterId
        entries {
          id
          classId
          class {
            id
            classCode
            title
          }
        }
      }
      degree {
        id
        name
        numberOfCores
        numberOfElectives
      }
    }
  }
`;

export const GET_CLASSES_QUERY = gql`
  query GetClasses {
    getClasses {
      id
      classCode
      courseType
      title
      dayOfWeek
      startTime
      endTime
      color
      professor
      rateMyProfessorRating
      coreDegreeId
    }
  }
`;

export const GET_CLASS_SCHEDULES_QUERY = gql`
  query GetClassSchedules($userId: String!) {
    getClassSchedules(userId: $userId) {
      id
      userId
      semesterId
      entries {
        id
        classId
        class {
          id
          classCode
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

export const GET_DEGREE_PLANNERS_QUERY = gql`
  query GetDegreePlanners($userId: String!) {
    getDegreePlanners(userId: $userId) {
      id
      userId
      degreeId
      degreeSchedule {
        id
        degreeId
        semesterId
        entries {
          id
          classId
          class {
            id
            classCode
            title
          }
        }
      }
    }
  }
`;

export const GET_DEGREE_SCHEDULES_QUERY = gql`
  query GetDegreeSchedules($plannerId: Int!) {
    getDegreeSchedules(plannerId: $plannerId) {
      id
      degreeId
      semesterId
      entries {
        id
        classId
        class {
          id
          classCode
          title
        }
      }
    }
  }
`;

export const GET_ALL_DEGREES_QUERY = gql`
  query GetAllDegrees {
    getAllDegrees {
      id
      name
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

export const GET_CLASS_QUERY = gql`
  query GetClass($id: Int!) {
    getClass(id: $id) {
      id
      classCode
      courseType
      title
      dayOfWeek
      startTime
      endTime
      color
      professor
      rateMyProfessorRating
      coreDegreeId
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
        dayOfWeek
        startTime
        endTime
        color
        professor
      }
    }
  }
`;

export const GET_DEGREE_SCHEDULE_ENTRIES_QUERY = gql`
  query GetDegreeScheduleEntries($degreeScheduleId: Int!) {
    getDegreeScheduleEntries(degreeScheduleId: $degreeScheduleId) {
      id
      degreeScheduleId
      classId
      class {
        id
        classCode
        title
      }
    }
  }
`;

export const GET_DEGREE_QUERY = gql`
  query GetDegree($id: Int!) {
    getDegree(id: $id) {
      id
      name
      numberOfCores
      numberOfElectives
    }
  }
`;