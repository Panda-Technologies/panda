/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AddClassToDegreeScheduleInput = {
  classId: Scalars["Int"]["input"];
  degreeScheduleId: Scalars["Int"]["input"];
};

export type AddClassToScheduleInput = {
  classId: Scalars["Int"]["input"];
  classScheduleId: Scalars["Int"]["input"];
};

export type Class = {
  __typename?: "Class";
  classCode: Scalars["String"]["output"];
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  color: Scalars["String"]["output"];
  coreDegreeId: Scalars["Int"]["output"];
  courseType: Scalars["String"]["output"];
  dayOfWeek: Scalars["String"]["output"];
  endTime: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  professor: Scalars["String"]["output"];
  rateMyProfessorRating: Scalars["Float"]["output"];
  startTime: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type ClassSchedule = {
  __typename?: "ClassSchedule";
  entries?: Maybe<Array<Maybe<ClassScheduleEntry>>>;
  id: Scalars["Int"]["output"];
  semesterId: Scalars["Int"]["output"];
  user?: Maybe<User>;
  userId: Scalars["Int"]["output"];
};

export type ClassScheduleEntry = {
  __typename?: "ClassScheduleEntry";
  class?: Maybe<Class>;
  classId: Scalars["Int"]["output"];
  classSchedule?: Maybe<ClassSchedule>;
  classScheduleId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
};

export type CreateClassInput = {
  classCode: Scalars["String"]["input"];
  color: Scalars["String"]["input"];
  coreDegreeId: Scalars["Int"]["input"];
  courseType: Scalars["String"]["input"];
  dayOfWeek: Scalars["String"]["input"];
  endTime: Scalars["String"]["input"];
  professor: Scalars["String"]["input"];
  rateMyProfessorRating: Scalars["Float"]["input"];
  startTime: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateClassScheduleInput = {
  semesterId: Scalars["Int"]["input"];
  userId: Scalars["Int"]["input"];
};

export type CreateDegreeInput = {
  name: Scalars["String"]["input"];
  numberOfCores: Scalars["Int"]["input"];
  numberOfElectives: Scalars["Int"]["input"];
};

export type CreateDegreeScheduleInput = {
  degreeId: Scalars["Int"]["input"];
  plannerId: Scalars["Int"]["input"];
  semesterId: Scalars["Int"]["input"];
  userId: Scalars["Int"]["input"];
};

export type CreateTaskInput = {
  classCode: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  dueDate: Scalars["String"]["input"];
  stageId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type Degree = {
  __typename?: "Degree";
  degreeSchedules?: Maybe<Array<Maybe<DegreeSchedule>>>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  numberOfCores: Scalars["Int"]["output"];
  numberOfElectives: Scalars["Int"]["output"];
  users?: Maybe<Array<Maybe<User>>>;
};

export type DegreeSchedule = {
  __typename?: "DegreeSchedule";
  degree?: Maybe<Degree>;
  degreeId: Scalars["Int"]["output"];
  entries?: Maybe<Array<Maybe<DegreeScheduleEntry>>>;
  id: Scalars["Int"]["output"];
  plannerId: Scalars["Int"]["output"];
  semesterId: Scalars["Int"]["output"];
  user?: Maybe<User>;
  userId: Scalars["Int"]["output"];
};

export type DegreeScheduleEntry = {
  __typename?: "DegreeScheduleEntry";
  class?: Maybe<Class>;
  classId: Scalars["Int"]["output"];
  degreeSchedule?: Maybe<DegreeSchedule>;
  degreeScheduleId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
};

export type DeleteClassInput = {
  id: Scalars["Int"]["input"];
};

export type DeleteDegreeInput = {
  id: Scalars["Int"]["input"];
};

export type DeleteTaskInput = {
  id: Scalars["Int"]["input"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  addClassToClassSchedule?: Maybe<ClassScheduleEntry>;
  addClassToDegreeSchedule?: Maybe<DegreeScheduleEntry>;
  createClass?: Maybe<Class>;
  createClassSchedule?: Maybe<ClassSchedule>;
  createDegree?: Maybe<Degree>;
  createDegreeSchedule?: Maybe<DegreeSchedule>;
  createTask?: Maybe<Task>;
  deleteClass?: Maybe<Class>;
  deleteClassSchedule?: Maybe<ClassSchedule>;
  deleteDegree?: Maybe<Degree>;
  deleteDegreeSchedule?: Maybe<DegreeSchedule>;
  deleteTask?: Maybe<Task>;
  login?: Maybe<Scalars["String"]["output"]>;
  logout?: Maybe<Scalars["Boolean"]["output"]>;
  register?: Maybe<Scalars["String"]["output"]>;
  removeClassFromClassSchedule?: Maybe<ClassScheduleEntry>;
  removeClassFromDegreeSchedule?: Maybe<DegreeScheduleEntry>;
  updateClass?: Maybe<Class>;
  updateClassSchedule?: Maybe<ClassSchedule>;
  updateDegree?: Maybe<Degree>;
  updateDegreeSchedule?: Maybe<DegreeSchedule>;
  updateTask?: Maybe<Task>;
  updateUserAcademicInfo?: Maybe<User>;
  updateUserProfile?: Maybe<User>;
};

export type MutationAddClassToClassScheduleArgs = {
  input: AddClassToScheduleInput;
};

export type MutationAddClassToDegreeScheduleArgs = {
  input: AddClassToDegreeScheduleInput;
};

export type MutationCreateClassArgs = {
  input: CreateClassInput;
};

export type MutationCreateClassScheduleArgs = {
  input: CreateClassScheduleInput;
};

export type MutationCreateDegreeArgs = {
  input: CreateDegreeInput;
};

export type MutationCreateDegreeScheduleArgs = {
  input: CreateDegreeScheduleInput;
};

export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};

export type MutationDeleteClassArgs = {
  input: DeleteClassInput;
};

export type MutationDeleteClassScheduleArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationDeleteDegreeArgs = {
  input: DeleteDegreeInput;
};

export type MutationDeleteDegreeScheduleArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationRemoveClassFromClassScheduleArgs = {
  input: RemoveClassFromScheduleInput;
};

export type MutationRemoveClassFromDegreeScheduleArgs = {
  input: RemoveClassFromDegreeScheduleInput;
};

export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};

export type MutationUpdateClassScheduleArgs = {
  input: UpdateClassScheduleInput;
};

export type MutationUpdateDegreeArgs = {
  input: UpdateDegreeInput;
};

export type MutationUpdateDegreeScheduleArgs = {
  input: UpdateDegreeScheduleInput;
};

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

export type MutationUpdateUserAcademicInfoArgs = {
  assignmentCompletionPercentage?: InputMaybe<Scalars["Float"]["input"]>;
  attendancePercentage?: InputMaybe<Scalars["Float"]["input"]>;
  gpa?: InputMaybe<Scalars["Float"]["input"]>;
  id: Scalars["String"]["input"];
};

export type MutationUpdateUserProfileArgs = {
  degreeId: Scalars["Int"]["input"];
  id: Scalars["String"]["input"];
  university: Scalars["String"]["input"];
  yearInUniversity: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  getAllDegrees?: Maybe<Array<Maybe<Degree>>>;
  getClass?: Maybe<Class>;
  getClassScheduleEntries?: Maybe<Array<Maybe<ClassScheduleEntry>>>;
  getClassSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  getClasses?: Maybe<Array<Maybe<Class>>>;
  getDegree?: Maybe<Degree>;
  getDegreeScheduleEntries?: Maybe<Array<Maybe<DegreeScheduleEntry>>>;
  getDegreeSchedules?: Maybe<Array<Maybe<DegreeSchedule>>>;
  getTasks?: Maybe<Array<Maybe<Task>>>;
  getUser?: Maybe<User>;
};

export type QueryGetClassArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryGetClassScheduleEntriesArgs = {
  classScheduleId: Scalars["Int"]["input"];
};

export type QueryGetClassSchedulesArgs = {
  userId: Scalars["Int"]["input"];
};

export type QueryGetDegreeArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryGetDegreeScheduleEntriesArgs = {
  degreeScheduleId: Scalars["Int"]["input"];
};

export type QueryGetDegreeSchedulesArgs = {
  userId: Scalars["Int"]["input"];
};

export type QueryGetTasksArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["String"]["input"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type RemoveClassFromDegreeScheduleInput = {
  id: Scalars["Int"]["input"];
};

export type RemoveClassFromScheduleInput = {
  id: Scalars["Int"]["input"];
};

export type Task = {
  __typename?: "Task";
  classCode: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  dueDate: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  stageId: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type UpdateClassInput = {
  classCode?: InputMaybe<Scalars["String"]["input"]>;
  color?: InputMaybe<Scalars["String"]["input"]>;
  coreDegreeId?: InputMaybe<Scalars["Int"]["input"]>;
  courseType?: InputMaybe<Scalars["String"]["input"]>;
  dayOfWeek?: InputMaybe<Scalars["String"]["input"]>;
  endTime?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  professor?: InputMaybe<Scalars["String"]["input"]>;
  rateMyProfessorRating?: InputMaybe<Scalars["Float"]["input"]>;
  startTime?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateClassScheduleInput = {
  id: Scalars["Int"]["input"];
  semesterId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateDegreeInput = {
  id: Scalars["Int"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  numberOfCores?: InputMaybe<Scalars["Int"]["input"]>;
  numberOfElectives?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateDegreeScheduleInput = {
  id: Scalars["Int"]["input"];
  plannerId?: InputMaybe<Scalars["Int"]["input"]>;
  semesterId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateTaskInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  stageId?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  assignmentCompletionPercentage?: Maybe<Scalars["Float"]["output"]>;
  attendancePercentage?: Maybe<Scalars["Float"]["output"]>;
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  degree?: Maybe<Degree>;
  degreeId?: Maybe<Scalars["Int"]["output"]>;
  degreeSchedules?: Maybe<Array<Maybe<DegreeSchedule>>>;
  email: Scalars["String"]["output"];
  gpa?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["String"]["output"];
  tasks?: Maybe<Array<Maybe<Task>>>;
  university?: Maybe<Scalars["String"]["output"]>;
  yearInUniversity?: Maybe<Scalars["Int"]["output"]>;
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register?: string | null;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation"; login?: string | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: "Mutation";
  logout?: boolean | null;
};

export type UpdateUserProfileMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  university: Scalars["String"]["input"];
  yearInUniversity: Scalars["Int"]["input"];
  degreeId: Scalars["Int"]["input"];
}>;

export type UpdateUserProfileMutation = {
  __typename?: "Mutation";
  updateUserProfile?: {
    __typename?: "User";
    id: string;
    university?: string | null;
    yearInUniversity?: number | null;
    degreeId?: number | null;
  } | null;
};

export type UpdateUserAcademicInfoMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  gpa?: InputMaybe<Scalars["Float"]["input"]>;
  attendancePercentage?: InputMaybe<Scalars["Float"]["input"]>;
  assignmentCompletionPercentage?: InputMaybe<Scalars["Float"]["input"]>;
}>;

export type UpdateUserAcademicInfoMutation = {
  __typename?: "Mutation";
  updateUserAcademicInfo?: {
    __typename?: "User";
    id: string;
    gpa?: number | null;
    attendancePercentage?: number | null;
    assignmentCompletionPercentage?: number | null;
  } | null;
};

export type CreateClassMutationVariables = Exact<{
  input: CreateClassInput;
}>;

export type CreateClassMutation = {
  __typename?: "Mutation";
  createClass?: {
    __typename?: "Class";
    id: number;
    classCode: string;
    courseType: string;
    title: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
    rateMyProfessorRating: number;
    coreDegreeId: number;
  } | null;
};

export type CreateClassScheduleMutationVariables = Exact<{
  input: CreateClassScheduleInput;
}>;

export type CreateClassScheduleMutation = {
  __typename?: "Mutation";
  createClassSchedule?: {
    __typename?: "ClassSchedule";
    id: number;
    userId: number;
    semesterId: number;
  } | null;
};

export type AddClassToClassScheduleMutationVariables = Exact<{
  input: AddClassToScheduleInput;
}>;

export type AddClassToClassScheduleMutation = {
  __typename?: "Mutation";
  addClassToClassSchedule?: {
    __typename?: "ClassScheduleEntry";
    id: number;
    classScheduleId: number;
    classId: number;
  } | null;
};

export type RemoveClassFromClassScheduleMutationVariables = Exact<{
  input: RemoveClassFromScheduleInput;
}>;

export type RemoveClassFromClassScheduleMutation = {
  __typename?: "Mutation";
  removeClassFromClassSchedule?: {
    __typename?: "ClassScheduleEntry";
    id: number;
  } | null;
};

export type CreateDegreeScheduleMutationVariables = Exact<{
  input: CreateDegreeScheduleInput;
}>;

export type CreateDegreeScheduleMutation = {
  __typename?: "Mutation";
  createDegreeSchedule?: {
    __typename?: "DegreeSchedule";
    id: number;
    userId: number;
    plannerId: number;
    degreeId: number;
    semesterId: number;
  } | null;
};

export type AddClassToDegreeScheduleMutationVariables = Exact<{
  input: AddClassToDegreeScheduleInput;
}>;

export type AddClassToDegreeScheduleMutation = {
  __typename?: "Mutation";
  addClassToDegreeSchedule?: {
    __typename?: "DegreeScheduleEntry";
    id: number;
    degreeScheduleId: number;
    classId: number;
  } | null;
};

export type RemoveClassFromDegreeScheduleMutationVariables = Exact<{
  input: RemoveClassFromDegreeScheduleInput;
}>;

export type RemoveClassFromDegreeScheduleMutation = {
  __typename?: "Mutation";
  removeClassFromDegreeSchedule?: {
    __typename?: "DegreeScheduleEntry";
    id: number;
  } | null;
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;

export type CreateTaskMutation = {
  __typename?: "Mutation";
  createTask?: {
    __typename?: "Task";
    id: number;
    userId: string;
    dueDate: string;
    stageId: number;
    classCode: string;
    description: string;
    title: string;
  } | null;
};

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
  __typename?: "Mutation";
  updateTask?: {
    __typename?: "Task";
    id: number;
    dueDate: string;
    stageId: number;
    description: string;
    title: string;
  } | null;
};

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;

export type DeleteTaskMutation = {
  __typename?: "Mutation";
  deleteTask?: { __typename?: "Task"; id: number } | null;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser?: {
    __typename?: "User";
    id: string;
    email: string;
    university?: string | null;
    yearInUniversity?: number | null;
    gpa?: number | null;
    attendancePercentage?: number | null;
    assignmentCompletionPercentage?: number | null;
    degreeId?: number | null;
    tasks?: Array<{
      __typename?: "Task";
      id: number;
      title: string;
      dueDate: string;
      stageId: number;
      classCode: string;
      description: string;
    } | null> | null;
    classSchedules?: Array<{
      __typename?: "ClassSchedule";
      id: number;
      semesterId: number;
      entries?: Array<{
        __typename?: "ClassScheduleEntry";
        id: number;
        classId: number;
        class?: {
          __typename?: "Class";
          id: number;
          classCode: string;
          title: string;
          dayOfWeek: string;
          startTime: string;
          endTime: string;
          color: string;
          professor: string;
        } | null;
      } | null> | null;
    } | null> | null;
    degreeSchedules?: Array<{
      __typename?: "DegreeSchedule";
      id: number;
      plannerId: number;
      semesterId: number;
      entries?: Array<{
        __typename?: "DegreeScheduleEntry";
        id: number;
        classId: number;
        class?: {
          __typename?: "Class";
          id: number;
          classCode: string;
          title: string;
        } | null;
      } | null> | null;
    } | null> | null;
    degree?: {
      __typename?: "Degree";
      id: number;
      name: string;
      numberOfCores: number;
      numberOfElectives: number;
    } | null;
  } | null;
};

export type GetClassesQueryVariables = Exact<{ [key: string]: never }>;

export type GetClassesQuery = {
  __typename?: "Query";
  getClasses?: Array<{
    __typename?: "Class";
    id: number;
    classCode: string;
    courseType: string;
    title: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
    rateMyProfessorRating: number;
    coreDegreeId: number;
  } | null> | null;
};

export type GetClassSchedulesQueryVariables = Exact<{
  userId: Scalars["Int"]["input"];
}>;

export type GetClassSchedulesQuery = {
  __typename?: "Query";
  getClassSchedules?: Array<{
    __typename?: "ClassSchedule";
    id: number;
    userId: number;
    semesterId: number;
    entries?: Array<{
      __typename?: "ClassScheduleEntry";
      id: number;
      classId: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        title: string;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        color: string;
        professor: string;
      } | null;
    } | null> | null;
  } | null> | null;
};

export type GetDegreeSchedulesQueryVariables = Exact<{
  userId: Scalars["Int"]["input"];
}>;

export type GetDegreeSchedulesQuery = {
  __typename?: "Query";
  getDegreeSchedules?: Array<{
    __typename?: "DegreeSchedule";
    id: number;
    userId: number;
    plannerId: number;
    degreeId: number;
    semesterId: number;
    entries?: Array<{
      __typename?: "DegreeScheduleEntry";
      id: number;
      classId: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        title: string;
      } | null;
    } | null> | null;
  } | null> | null;
};

export type GetAllDegreesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllDegreesQuery = {
  __typename?: "Query";
  getAllDegrees?: Array<{
    __typename?: "Degree";
    id: number;
    name: string;
    numberOfCores: number;
    numberOfElectives: number;
  } | null> | null;
};

export type GetTasksQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetTasksQuery = {
  __typename?: "Query";
  getTasks?: Array<{
    __typename?: "Task";
    id: number;
    userId: string;
    dueDate: string;
    stageId: number;
    classCode: string;
    description: string;
    title: string;
  } | null> | null;
};

export type GetClassQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type GetClassQuery = {
  __typename?: "Query";
  getClass?: {
    __typename?: "Class";
    id: number;
    classCode: string;
    courseType: string;
    title: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
    rateMyProfessorRating: number;
    coreDegreeId: number;
  } | null;
};

export type GetClassScheduleEntriesQueryVariables = Exact<{
  classScheduleId: Scalars["Int"]["input"];
}>;

export type GetClassScheduleEntriesQuery = {
  __typename?: "Query";
  getClassScheduleEntries?: Array<{
    __typename?: "ClassScheduleEntry";
    id: number;
    classScheduleId: number;
    classId: number;
    class?: {
      __typename?: "Class";
      id: number;
      classCode: string;
      title: string;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      color: string;
      professor: string;
    } | null;
  } | null> | null;
};

export type GetDegreeScheduleEntriesQueryVariables = Exact<{
  degreeScheduleId: Scalars["Int"]["input"];
}>;

export type GetDegreeScheduleEntriesQuery = {
  __typename?: "Query";
  getDegreeScheduleEntries?: Array<{
    __typename?: "DegreeScheduleEntry";
    id: number;
    degreeScheduleId: number;
    classId: number;
    class?: {
      __typename?: "Class";
      id: number;
      classCode: string;
      title: string;
    } | null;
  } | null> | null;
};

export type GetDegreeQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type GetDegreeQuery = {
  __typename?: "Query";
  getDegree?: {
    __typename?: "Degree";
    id: number;
    name: string;
    numberOfCores: number;
    numberOfElectives: number;
  } | null;
};

export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RegisterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Logout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "logout" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const UpdateUserProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUserProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "university" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "yearInUniversity" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "degreeId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUserProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "university" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "university" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "yearInUniversity" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "yearInUniversity" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "degreeId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "degreeId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "university" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "yearInUniversity" },
                },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>;
export const UpdateUserAcademicInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUserAcademicInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "gpa" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "attendancePercentage" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "assignmentCompletionPercentage" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUserAcademicInfo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "gpa" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "gpa" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "attendancePercentage" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "attendancePercentage" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "assignmentCompletionPercentage" },
                value: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "assignmentCompletionPercentage",
                  },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "gpa" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attendancePercentage" },
                },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "assignmentCompletionPercentage",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserAcademicInfoMutation,
  UpdateUserAcademicInfoMutationVariables
>;
export const CreateClassDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateClass" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateClassInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createClass" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "classCode" } },
                { kind: "Field", name: { kind: "Name", value: "courseType" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "dayOfWeek" } },
                { kind: "Field", name: { kind: "Name", value: "startTime" } },
                { kind: "Field", name: { kind: "Name", value: "endTime" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
                { kind: "Field", name: { kind: "Name", value: "professor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rateMyProfessorRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "coreDegreeId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateClassMutation, CreateClassMutationVariables>;
export const CreateClassScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateClassSchedule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateClassScheduleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createClassSchedule" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "semesterId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateClassScheduleMutation,
  CreateClassScheduleMutationVariables
>;
export const AddClassToClassScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddClassToClassSchedule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddClassToScheduleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addClassToClassSchedule" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "classScheduleId" },
                },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddClassToClassScheduleMutation,
  AddClassToClassScheduleMutationVariables
>;
export const RemoveClassFromClassScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveClassFromClassSchedule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RemoveClassFromScheduleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeClassFromClassSchedule" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveClassFromClassScheduleMutation,
  RemoveClassFromClassScheduleMutationVariables
>;
export const CreateDegreeScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDegreeSchedule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateDegreeScheduleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDegreeSchedule" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "plannerId" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                { kind: "Field", name: { kind: "Name", value: "semesterId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDegreeScheduleMutation,
  CreateDegreeScheduleMutationVariables
>;
export const AddClassToDegreeScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddClassToDegreeSchedule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddClassToDegreeScheduleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addClassToDegreeSchedule" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "degreeScheduleId" },
                },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddClassToDegreeScheduleMutation,
  AddClassToDegreeScheduleMutationVariables
>;
export const RemoveClassFromDegreeScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveClassFromDegreeSchedule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "RemoveClassFromDegreeScheduleInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeClassFromDegreeSchedule" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveClassFromDegreeScheduleMutation,
  RemoveClassFromDegreeScheduleMutationVariables
>;
export const CreateTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTaskInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                { kind: "Field", name: { kind: "Name", value: "stageId" } },
                { kind: "Field", name: { kind: "Name", value: "classCode" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTaskInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                { kind: "Field", name: { kind: "Name", value: "stageId" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DeleteTaskInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "university" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "yearInUniversity" },
                },
                { kind: "Field", name: { kind: "Name", value: "gpa" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attendancePercentage" },
                },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "assignmentCompletionPercentage",
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tasks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dueDate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "stageId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classCode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "classSchedules" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "semesterId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entries" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "classId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "class" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "classCode" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "title" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "dayOfWeek" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "startTime" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "endTime" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "color" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "professor" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "degreeSchedules" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "semesterId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entries" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "classId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "class" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "classCode" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "title" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "degree" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "numberOfCores" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "numberOfElectives" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetClassesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetClasses" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getClasses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "classCode" } },
                { kind: "Field", name: { kind: "Name", value: "courseType" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "dayOfWeek" } },
                { kind: "Field", name: { kind: "Name", value: "startTime" } },
                { kind: "Field", name: { kind: "Name", value: "endTime" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
                { kind: "Field", name: { kind: "Name", value: "professor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rateMyProfessorRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "coreDegreeId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetClassesQuery, GetClassesQueryVariables>;
export const GetClassSchedulesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetClassSchedules" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getClassSchedules" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "semesterId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "entries" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "class" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "classCode" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dayOfWeek" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "startTime" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "endTime" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "color" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "professor" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetClassSchedulesQuery,
  GetClassSchedulesQueryVariables
>;
export const GetDegreeSchedulesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetDegreeSchedules" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDegreeSchedules" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "plannerId" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                { kind: "Field", name: { kind: "Name", value: "semesterId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "entries" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "class" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "classCode" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDegreeSchedulesQuery,
  GetDegreeSchedulesQueryVariables
>;
export const GetAllDegreesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAllDegrees" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAllDegrees" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "numberOfCores" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "numberOfElectives" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllDegreesQuery, GetAllDegreesQueryVariables>;
export const GetTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTasks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                { kind: "Field", name: { kind: "Name", value: "stageId" } },
                { kind: "Field", name: { kind: "Name", value: "classCode" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const GetClassDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetClass" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getClass" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "classCode" } },
                { kind: "Field", name: { kind: "Name", value: "courseType" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "dayOfWeek" } },
                { kind: "Field", name: { kind: "Name", value: "startTime" } },
                { kind: "Field", name: { kind: "Name", value: "endTime" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
                { kind: "Field", name: { kind: "Name", value: "professor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rateMyProfessorRating" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "coreDegreeId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetClassQuery, GetClassQueryVariables>;
export const GetClassScheduleEntriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetClassScheduleEntries" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "classScheduleId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getClassScheduleEntries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "classScheduleId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "classScheduleId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "classScheduleId" },
                },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "class" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classCode" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dayOfWeek" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endTime" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "professor" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetClassScheduleEntriesQuery,
  GetClassScheduleEntriesQueryVariables
>;
export const GetDegreeScheduleEntriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetDegreeScheduleEntries" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "degreeScheduleId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDegreeScheduleEntries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "degreeScheduleId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "degreeScheduleId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "degreeScheduleId" },
                },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "class" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classCode" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDegreeScheduleEntriesQuery,
  GetDegreeScheduleEntriesQueryVariables
>;
export const GetDegreeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetDegree" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDegree" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "numberOfCores" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "numberOfElectives" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDegreeQuery, GetDegreeQueryVariables>;
