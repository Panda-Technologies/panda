/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n":
    types.RegisterDocument,
  "\n  mutation Login($input: LoginInput!) {\n    login(input: $input)\n  }\n":
    types.LoginDocument,
  "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
  "\n  mutation UpdateUserProfile($id: String!, $university: String!, $yearInUniversity: Int!, $degreeId: Int!) {\n    updateUserProfile(id: $id, university: $university, yearInUniversity: $yearInUniversity, degreeId: $degreeId) {\n      id\n      university\n      yearInUniversity\n      degreeId\n    }\n  }\n":
    types.UpdateUserProfileDocument,
  "\n  mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float) {\n    updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage) {\n      id\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n    }\n  }\n":
    types.UpdateUserAcademicInfoDocument,
  "\n  mutation CreateClass($input: CreateClassInput!) {\n    createClass(input: $input) {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n":
    types.CreateClassDocument,
  "\n  mutation CreateClassSchedule($input: CreateClassScheduleInput!) {\n    createClassSchedule(input: $input) {\n      id\n      userId\n      semesterId\n    }\n  }\n":
    types.CreateClassScheduleDocument,
  "\n  mutation AddClassToClassSchedule($input: AddClassToScheduleInput!) {\n    addClassToClassSchedule(input: $input) {\n      id\n      classScheduleId\n      classId\n    }\n  }\n":
    types.AddClassToClassScheduleDocument,
  "\n  mutation RemoveClassFromClassSchedule($input: RemoveClassFromScheduleInput!) {\n    removeClassFromClassSchedule(input: $input) {\n      id\n    }\n  }\n":
    types.RemoveClassFromClassScheduleDocument,
  "\n  mutation CreateDegreeSchedule($input: CreateDegreeScheduleInput!) {\n    createDegreeSchedule(input: $input) {\n      id\n      userId\n      plannerId\n      degreeId\n      semesterId\n    }\n  }\n":
    types.CreateDegreeScheduleDocument,
  "\n  mutation AddClassToDegreeSchedule($input: AddClassToDegreeScheduleInput!) {\n    addClassToDegreeSchedule(input: $input) {\n      id\n      degreeScheduleId\n      classId\n    }\n  }\n":
    types.AddClassToDegreeScheduleDocument,
  "\n  mutation RemoveClassFromDegreeSchedule($input: RemoveClassFromDegreeScheduleInput!) {\n    removeClassFromDegreeSchedule(input: $input) {\n      id\n    }\n  }\n":
    types.RemoveClassFromDegreeScheduleDocument,
  "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      userId\n      dueDate\n      stageId\n      classCode\n      description\n      title\n    }\n  }\n":
    types.CreateTaskDocument,
  "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      id\n      dueDate\n      stageId\n      description\n      title\n    }\n  }\n":
    types.UpdateTaskDocument,
  "\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n    }\n  }\n":
    types.DeleteTaskDocument,
  "\n  query GetUser($id: String!) {\n    getUser(id: $id) {\n      id\n      email\n      university\n      yearInUniversity\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n      degreeId\n      tasks {\n        id\n        title\n        dueDate\n        stageId\n        classCode\n        description\n      }\n      classSchedules {\n        id\n        semesterId\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n          }\n        }\n      }\n      degreeSchedules {\n        id\n        plannerId\n        semesterId\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n          }\n        }\n      }\n      degree {\n        id\n        name\n        numberOfCores\n        numberOfElectives\n      }\n    }\n  }\n":
    types.GetUserDocument,
  "\n  query GetClasses {\n    getClasses {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n":
    types.GetClassesDocument,
  "\n  query GetClassSchedules($userId: Int!) {\n    getClassSchedules(userId: $userId) {\n      id\n      userId\n      semesterId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          title\n          dayOfWeek\n          startTime\n          endTime\n          color\n          professor\n        }\n      }\n    }\n  }\n":
    types.GetClassSchedulesDocument,
  "\n  query GetDegreeSchedules($userId: Int!) {\n    getDegreeSchedules(userId: $userId) {\n      id\n      userId\n      plannerId\n      degreeId\n      semesterId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          title\n        }\n      }\n    }\n  }\n":
    types.GetDegreeSchedulesDocument,
  "\n  query GetAllDegrees {\n    getAllDegrees {\n      id\n      name\n      numberOfCores\n      numberOfElectives\n    }\n  }\n":
    types.GetAllDegreesDocument,
  "\n  query GetTasks($userId: String!) {\n    getTasks(userId: $userId) {\n      id\n      userId\n      dueDate\n      stageId\n      classCode\n      description\n      title\n    }\n  }\n":
    types.GetTasksDocument,
  "\n  query GetClass($id: Int!) {\n    getClass(id: $id) {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n":
    types.GetClassDocument,
  "\n  query GetClassScheduleEntries($classScheduleId: Int!) {\n    getClassScheduleEntries(classScheduleId: $classScheduleId) {\n      id\n      classScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n        dayOfWeek\n        startTime\n        endTime\n        color\n        professor\n      }\n    }\n  }\n":
    types.GetClassScheduleEntriesDocument,
  "\n  query GetDegreeScheduleEntries($degreeScheduleId: Int!) {\n    getDegreeScheduleEntries(degreeScheduleId: $degreeScheduleId) {\n      id\n      degreeScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n      }\n    }\n  }\n":
    types.GetDegreeScheduleEntriesDocument,
  "\n  query GetDegree($id: Int!) {\n    getDegree(id: $id) {\n      id\n      name\n      numberOfCores\n      numberOfElectives\n    }\n  }\n":
    types.GetDegreeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n"
): (typeof documents)["\n  mutation Register($input: RegisterInput!) {\n    register(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input)\n  }\n"
): (typeof documents)["\n  mutation Login($input: LoginInput!) {\n    login(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Logout {\n    logout\n  }\n"
): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateUserProfile($id: String!, $university: String!, $yearInUniversity: Int!, $degreeId: Int!) {\n    updateUserProfile(id: $id, university: $university, yearInUniversity: $yearInUniversity, degreeId: $degreeId) {\n      id\n      university\n      yearInUniversity\n      degreeId\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateUserProfile($id: String!, $university: String!, $yearInUniversity: Int!, $degreeId: Int!) {\n    updateUserProfile(id: $id, university: $university, yearInUniversity: $yearInUniversity, degreeId: $degreeId) {\n      id\n      university\n      yearInUniversity\n      degreeId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float) {\n    updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage) {\n      id\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float) {\n    updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage) {\n      id\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateClass($input: CreateClassInput!) {\n    createClass(input: $input) {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateClass($input: CreateClassInput!) {\n    createClass(input: $input) {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateClassSchedule($input: CreateClassScheduleInput!) {\n    createClassSchedule(input: $input) {\n      id\n      userId\n      semesterId\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateClassSchedule($input: CreateClassScheduleInput!) {\n    createClassSchedule(input: $input) {\n      id\n      userId\n      semesterId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddClassToClassSchedule($input: AddClassToScheduleInput!) {\n    addClassToClassSchedule(input: $input) {\n      id\n      classScheduleId\n      classId\n    }\n  }\n"
): (typeof documents)["\n  mutation AddClassToClassSchedule($input: AddClassToScheduleInput!) {\n    addClassToClassSchedule(input: $input) {\n      id\n      classScheduleId\n      classId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveClassFromClassSchedule($input: RemoveClassFromScheduleInput!) {\n    removeClassFromClassSchedule(input: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveClassFromClassSchedule($input: RemoveClassFromScheduleInput!) {\n    removeClassFromClassSchedule(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateDegreeSchedule($input: CreateDegreeScheduleInput!) {\n    createDegreeSchedule(input: $input) {\n      id\n      userId\n      plannerId\n      degreeId\n      semesterId\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateDegreeSchedule($input: CreateDegreeScheduleInput!) {\n    createDegreeSchedule(input: $input) {\n      id\n      userId\n      plannerId\n      degreeId\n      semesterId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddClassToDegreeSchedule($input: AddClassToDegreeScheduleInput!) {\n    addClassToDegreeSchedule(input: $input) {\n      id\n      degreeScheduleId\n      classId\n    }\n  }\n"
): (typeof documents)["\n  mutation AddClassToDegreeSchedule($input: AddClassToDegreeScheduleInput!) {\n    addClassToDegreeSchedule(input: $input) {\n      id\n      degreeScheduleId\n      classId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveClassFromDegreeSchedule($input: RemoveClassFromDegreeScheduleInput!) {\n    removeClassFromDegreeSchedule(input: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation RemoveClassFromDegreeSchedule($input: RemoveClassFromDegreeScheduleInput!) {\n    removeClassFromDegreeSchedule(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      userId\n      dueDate\n      stageId\n      classCode\n      description\n      title\n    }\n  }\n"
): (typeof documents)["\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      userId\n      dueDate\n      stageId\n      classCode\n      description\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      id\n      dueDate\n      stageId\n      description\n      title\n    }\n  }\n"
): (typeof documents)["\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(input: $input) {\n      id\n      dueDate\n      stageId\n      description\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation DeleteTask($input: DeleteTaskInput!) {\n    deleteTask(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetUser($id: String!) {\n    getUser(id: $id) {\n      id\n      email\n      university\n      yearInUniversity\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n      degreeId\n      tasks {\n        id\n        title\n        dueDate\n        stageId\n        classCode\n        description\n      }\n      classSchedules {\n        id\n        semesterId\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n          }\n        }\n      }\n      degreeSchedules {\n        id\n        plannerId\n        semesterId\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n          }\n        }\n      }\n      degree {\n        id\n        name\n        numberOfCores\n        numberOfElectives\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetUser($id: String!) {\n    getUser(id: $id) {\n      id\n      email\n      university\n      yearInUniversity\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n      degreeId\n      tasks {\n        id\n        title\n        dueDate\n        stageId\n        classCode\n        description\n      }\n      classSchedules {\n        id\n        semesterId\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n          }\n        }\n      }\n      degreeSchedules {\n        id\n        plannerId\n        semesterId\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n          }\n        }\n      }\n      degree {\n        id\n        name\n        numberOfCores\n        numberOfElectives\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClasses {\n    getClasses {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n"
): (typeof documents)["\n  query GetClasses {\n    getClasses {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClassSchedules($userId: Int!) {\n    getClassSchedules(userId: $userId) {\n      id\n      userId\n      semesterId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          title\n          dayOfWeek\n          startTime\n          endTime\n          color\n          professor\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetClassSchedules($userId: Int!) {\n    getClassSchedules(userId: $userId) {\n      id\n      userId\n      semesterId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          title\n          dayOfWeek\n          startTime\n          endTime\n          color\n          professor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetDegreeSchedules($userId: Int!) {\n    getDegreeSchedules(userId: $userId) {\n      id\n      userId\n      plannerId\n      degreeId\n      semesterId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          title\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetDegreeSchedules($userId: Int!) {\n    getDegreeSchedules(userId: $userId) {\n      id\n      userId\n      plannerId\n      degreeId\n      semesterId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetAllDegrees {\n    getAllDegrees {\n      id\n      name\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"
): (typeof documents)["\n  query GetAllDegrees {\n    getAllDegrees {\n      id\n      name\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetTasks($userId: String!) {\n    getTasks(userId: $userId) {\n      id\n      userId\n      dueDate\n      stageId\n      classCode\n      description\n      title\n    }\n  }\n"
): (typeof documents)["\n  query GetTasks($userId: String!) {\n    getTasks(userId: $userId) {\n      id\n      userId\n      dueDate\n      stageId\n      classCode\n      description\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClass($id: Int!) {\n    getClass(id: $id) {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n"
): (typeof documents)["\n  query GetClass($id: Int!) {\n    getClass(id: $id) {\n      id\n      classCode\n      courseType\n      title\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClassScheduleEntries($classScheduleId: Int!) {\n    getClassScheduleEntries(classScheduleId: $classScheduleId) {\n      id\n      classScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n        dayOfWeek\n        startTime\n        endTime\n        color\n        professor\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetClassScheduleEntries($classScheduleId: Int!) {\n    getClassScheduleEntries(classScheduleId: $classScheduleId) {\n      id\n      classScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n        dayOfWeek\n        startTime\n        endTime\n        color\n        professor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetDegreeScheduleEntries($degreeScheduleId: Int!) {\n    getDegreeScheduleEntries(degreeScheduleId: $degreeScheduleId) {\n      id\n      degreeScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetDegreeScheduleEntries($degreeScheduleId: Int!) {\n    getDegreeScheduleEntries(degreeScheduleId: $degreeScheduleId) {\n      id\n      degreeScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetDegree($id: Int!) {\n    getDegree(id: $id) {\n      id\n      name\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"
): (typeof documents)["\n  query GetDegree($id: Int!) {\n    getDegree(id: $id) {\n      id\n      name\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
