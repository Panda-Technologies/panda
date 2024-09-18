import gql from "graphql-tag";

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfile($id: String!, $university: String!, $yearInUniversity: Int!, $degreeId: Int!) {
    updateUserProfile(id: $id, university: $university, yearInUniversity: $yearInUniversity, degreeId: $degreeId) {
      id
      university
      yearInUniversity
      degreeId
    }
  }
`;

export const UPDATE_USER_ACADEMIC_INFO_MUTATION = gql`
  mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float) {
    updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage) {
      id
      gpa
      attendancePercentage
      assignmentCompletionPercentage
    }
  }
`;

export const CREATE_CLASS_MUTATION = gql`
  mutation CreateClass($input: CreateClassInput!) {
    createClass(input: $input) {
      id
      classCode
      credits
      courseType
      title
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

export const UPDATE_CLASS_MUTATION = gql`
  mutation UpdateClass($input: UpdateClassInput!) {
    updateClass(input: $input) {
      id
      classCode
      credits
      courseType
      title
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

export const DELETE_CLASS_MUTATION = gql`
  mutation DeleteClass($input: DeleteClassInput!) {
    deleteClass(input: $input) {
      id
    }
  }
`;

export const CREATE_CLASS_SCHEDULE_MUTATION = gql`
  mutation CreateClassSchedule($input: CreateClassScheduleInput!) {
    createClassSchedule(input: $input) {
      id
      userId
      semesterId
    }
  }
`;

export const ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION = gql`
  mutation AddClassToClassSchedule($input: AddClassToScheduleInput!) {
    addClassToClassSchedule(input: $input) {
      id
      classScheduleId
      classId
    }
  }
`;

export const REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION = gql`
  mutation RemoveClassFromClassSchedule($input: RemoveClassFromScheduleInput!) {
    removeClassFromClassSchedule(input: $input) {
      id
    }
  }
`;

export const CREATE_DEGREE_PLANNER_MUTATION = gql`
  mutation CreateDegreePlanner($input: CreateDegreePlannerInput!) {
    createDegreePlanner(input: $input) {
      id
      userId
      degreeId
      Semester {
        id
        name
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

export const DELETE_DEGREE_PLANNER_MUTATION = gql`
  mutation DeleteDegreePlanner($id: Int!) {
    deleteDegreePlanner(id: $id) {
      id
    }
  }
`;

export const CREATE_SEMESTER_MUTATION = gql`
  mutation CreateSemester($input: CreateSemesterInput!) {
    createSemester(input: $input) {
      id
      name
      degreeId
      plannerId
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
`;

export const UPDATE_SEMESTER_MUTATION = gql`
  mutation UpdateSemester($input: UpdateSemesterInput!) {
    updateSemester(input: $input) {
      id
      name
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
`;

export const DELETE_SEMESTER_MUTATION = gql`
  mutation DeleteSemester($id: Int!) {
    deleteSemester(id: $id) {
      id
    }
  }
`;

export const ADD_CLASS_TO_SEMESTER_MUTATION = gql`
  mutation AddClassToSemester($input: AddClassToSemesterInput!) {
    addClassToSemester(input: $input) {
      id
      semesterId
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
`;

export const REMOVE_CLASS_FROM_SEMESTER_MUTATION = gql`
  mutation RemoveClassFromSemester($input: RemoveClassFromSemesterInput!) {
    removeClassFromSemester(input: $input) {
      id
    }
  }
`;

export const CREATE_DEGREE_MUTATION = gql`
  mutation CreateDegree($input: CreateDegreeInput!) {
    createDegree(input: $input) {
      id
      name
      numberOfCores
      numberOfElectives
    }
  }
`;

export const UPDATE_DEGREE_MUTATION = gql`
  mutation UpdateDegree($input: UpdateDegreeInput!) {
    updateDegree(input: $input) {
      id
      name
      numberOfCores
      numberOfElectives
    }
  }
`;

export const DELETE_DEGREE_MUTATION = gql`
  mutation DeleteDegree($input: DeleteDegreeInput!) {
    deleteDegree(input: $input) {
      id
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      dueDate
      stageId
      classCode
      description
      title
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;