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

export const CREATE_DEGREE_SCHEDULE_MUTATION = gql`
  mutation CreateDegreeSchedule($input: CreateDegreeScheduleInput!) {
    createDegreeSchedule(input: $input) {
      id
      degreeId
      semesterId
      plannerId
    }
  }
`;

export const UPDATE_DEGREE_SCHEDULE_MUTATION = gql`
  mutation UpdateDegreeSchedule($input: UpdateDegreeScheduleInput!) {
    updateDegreeSchedule(input: $input) {
      id
      semesterId
    }
  }
`;

export const DELETE_DEGREE_SCHEDULE_MUTATION = gql`
  mutation DeleteDegreeSchedule($id: Int!) {
    deleteDegreeSchedule(id: $id) {
      id
    }
  }
`;

export const ADD_CLASS_TO_DEGREE_SCHEDULE_MUTATION = gql`
  mutation AddClassToDegreeSchedule($input: AddClassToDegreeScheduleInput!) {
    addClassToDegreeSchedule(input: $input) {
      id
      degreeScheduleId
      classId
    }
  }
`;

export const REMOVE_CLASS_FROM_DEGREE_SCHEDULE_MUTATION = gql`
  mutation RemoveClassFromDegreeSchedule($input: RemoveClassFromDegreeScheduleInput!) {
    removeClassFromDegreeSchedule(input: $input) {
      id
    }
  }
`;


export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      dueDate
      stageId
      userId
      classCode
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      dueDate
      stageId
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