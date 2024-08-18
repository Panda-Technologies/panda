import gql from "graphql-tag";

// Query to get user details
export const GET_USER_QUERY = gql`
  query GetUser($id: Int!) {
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
        plannerId
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
  query GetClassSchedules($userId: Int!) {
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

export const GET_DEGREE_SCHEDULES_QUERY = gql`
  query GetDegreeSchedules($userId: Int!) {
    getDegreeSchedules(userId: $userId) {
      id
      userId
      plannerId
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
  query GetTasks($userId: Int!) {
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