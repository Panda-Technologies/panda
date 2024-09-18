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

export type AddClassToScheduleInput = {
  classId: Scalars["Int"]["input"];
  classScheduleId: Scalars["Int"]["input"];
};

export type AddClassToSemesterInput = {
  classId: Scalars["Int"]["input"];
  semesterId: Scalars["Int"]["input"];
};

export type Class = {
  __typename?: "Class";
  classCode: Scalars["String"]["output"];
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  color: Scalars["String"]["output"];
  coreDegreeId: Scalars["Int"]["output"];
  courseType: Scalars["String"]["output"];
  credits: Scalars["Int"]["output"];
  dayOfWeek: Scalars["String"]["output"];
  electiveDegreeId?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
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
  semesterId: Scalars["String"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
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
  credits: Scalars["Int"]["input"];
  dayOfWeek: Scalars["String"]["input"];
  electiveDegreeId: Array<InputMaybe<Scalars["Int"]["input"]>>;
  endTime: Scalars["String"]["input"];
  professor: Scalars["String"]["input"];
  rateMyProfessorRating: Scalars["Float"]["input"];
  startTime: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateClassScheduleInput = {
  semesterId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type CreateDegreeInput = {
  name: Scalars["String"]["input"];
  numberOfCores: Scalars["Int"]["input"];
  numberOfElectives: Scalars["Int"]["input"];
};

export type CreateDegreePlannerInput = {
  degreeId: Scalars["Int"]["input"];
  userId: Scalars["String"]["input"];
};

export type CreateSemesterInput = {
  classIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  degreeId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  plannerId: Scalars["Int"]["input"];
};

export type CreateTaskInput = {
  task?: InputMaybe<TaskInputFields>;
};

export type Degree = {
  __typename?: "Degree";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  numberOfCores: Scalars["Int"]["output"];
  numberOfElectives: Scalars["Int"]["output"];
  semesters?: Maybe<Array<Maybe<Semester>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type DegreePlanner = {
  __typename?: "DegreePlanner";
  Semester?: Maybe<Array<Maybe<Semester>>>;
  degree?: Maybe<Degree>;
  degreeId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
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
  addClassToSemester?: Maybe<SemesterEntry>;
  createClass?: Maybe<Class>;
  createClassSchedule?: Maybe<ClassSchedule>;
  createDegree?: Maybe<Degree>;
  createDegreePlanner?: Maybe<DegreePlanner>;
  createSemester?: Maybe<Semester>;
  createTask?: Maybe<Task>;
  deleteClass?: Maybe<Class>;
  deleteClassSchedule?: Maybe<ClassSchedule>;
  deleteDegree?: Maybe<Degree>;
  deleteDegreePlanner?: Maybe<DegreePlanner>;
  deleteSemester?: Maybe<Semester>;
  deleteTask?: Maybe<Task>;
  login?: Maybe<Scalars["String"]["output"]>;
  logout?: Maybe<Scalars["Boolean"]["output"]>;
  register?: Maybe<Scalars["String"]["output"]>;
  removeClassFromClassSchedule?: Maybe<ClassScheduleEntry>;
  removeClassFromSemester?: Maybe<SemesterEntry>;
  updateClass?: Maybe<Class>;
  updateClassSchedule?: Maybe<ClassSchedule>;
  updateDegree?: Maybe<Degree>;
  updateSemester?: Maybe<Semester>;
  updateTask?: Maybe<Task>;
  updateUserAcademicInfo?: Maybe<User>;
  updateUserProfile?: Maybe<User>;
};

export type MutationAddClassToClassScheduleArgs = {
  input: AddClassToScheduleInput;
};

export type MutationAddClassToSemesterArgs = {
  input: AddClassToSemesterInput;
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

export type MutationCreateDegreePlannerArgs = {
  input: CreateDegreePlannerInput;
};

export type MutationCreateSemesterArgs = {
  input: CreateSemesterInput;
};

export type MutationCreateTaskArgs = {
  input?: InputMaybe<CreateTaskInput>;
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

export type MutationDeleteDegreePlannerArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationDeleteSemesterArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationDeleteTaskArgs = {
  input?: InputMaybe<DeleteTaskInput>;
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

export type MutationRemoveClassFromSemesterArgs = {
  input: RemoveClassFromSemesterInput;
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

export type MutationUpdateSemesterArgs = {
  input: UpdateSemesterInput;
};

export type MutationUpdateTaskArgs = {
  input?: InputMaybe<UpdateTaskInput>;
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
  getDegreePlanners?: Maybe<Array<Maybe<DegreePlanner>>>;
  getSemester?: Maybe<Semester>;
  getSemesters?: Maybe<Array<Maybe<Semester>>>;
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
  userId: Scalars["String"]["input"];
};

export type QueryGetDegreeArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryGetDegreePlannersArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetSemesterArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryGetSemestersArgs = {
  plannerId: Scalars["Int"]["input"];
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

export type RemoveClassFromScheduleInput = {
  id: Scalars["Int"]["input"];
};

export type RemoveClassFromSemesterInput = {
  classId: Scalars["Int"]["input"];
};

export type Semester = {
  __typename?: "Semester";
  degreeId: Scalars["Int"]["output"];
  degreePlanner?: Maybe<DegreePlanner>;
  entries?: Maybe<Array<Maybe<SemesterEntry>>>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  plannerId: Scalars["Int"]["output"];
};

export type SemesterEntry = {
  __typename?: "SemesterEntry";
  class?: Maybe<Class>;
  classId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  index: Scalars["Int"]["output"];
  semester?: Maybe<Semester>;
  semesterId: Scalars["Int"]["output"];
};

export type SemesterEntryInput = {
  classId: Scalars["Int"]["input"];
  index: Scalars["Int"]["input"];
};

export type Task = {
  __typename?: "Task";
  classCode?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  dueDate: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  stageId: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type TaskInputFields = {
  classCode?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate: Scalars["String"]["input"];
  stageId?: InputMaybe<Scalars["Int"]["input"]>;
  title: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type UpdateClassInput = {
  classCode?: InputMaybe<Scalars["String"]["input"]>;
  color?: InputMaybe<Scalars["String"]["input"]>;
  coreDegreeId?: InputMaybe<Scalars["Int"]["input"]>;
  courseType?: InputMaybe<Scalars["String"]["input"]>;
  credits?: InputMaybe<Scalars["Int"]["input"]>;
  dayOfWeek?: InputMaybe<Scalars["String"]["input"]>;
  electiveDegreeId?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  endTime?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  professor?: InputMaybe<Scalars["String"]["input"]>;
  rateMyProfessorRating?: InputMaybe<Scalars["Float"]["input"]>;
  startTime?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateClassScheduleInput = {
  id: Scalars["Int"]["input"];
  semesterId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateDegreeInput = {
  id: Scalars["Int"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  numberOfCores?: InputMaybe<Scalars["Int"]["input"]>;
  numberOfElectives?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateSemesterInput = {
  entries?: InputMaybe<Array<SemesterEntryInput>>;
  id: Scalars["Int"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTaskFields = {
  classCode?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  stageId?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTaskInput = {
  id: Scalars["Int"]["input"];
  update?: InputMaybe<UpdateTaskFields>;
};

export type User = {
  __typename?: "User";
  assignmentCompletionPercentage?: Maybe<Scalars["Float"]["output"]>;
  attendancePercentage?: Maybe<Scalars["Float"]["output"]>;
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  degree?: Maybe<Degree>;
  degreeId?: Maybe<Scalars["Int"]["output"]>;
  degreePlanners?: Maybe<Array<Maybe<DegreePlanner>>>;
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
    credits: number;
    courseType: string;
    title: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
    rateMyProfessorRating: number;
    coreDegreeId: number;
    electiveDegreeId?: Array<number | null> | null;
  } | null;
};

export type UpdateClassMutationVariables = Exact<{
  input: UpdateClassInput;
}>;

export type UpdateClassMutation = {
  __typename?: "Mutation";
  updateClass?: {
    __typename?: "Class";
    id: number;
    classCode: string;
    credits: number;
    courseType: string;
    title: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
    rateMyProfessorRating: number;
    coreDegreeId: number;
    electiveDegreeId?: Array<number | null> | null;
  } | null;
};

export type DeleteClassMutationVariables = Exact<{
  input: DeleteClassInput;
}>;

export type DeleteClassMutation = {
  __typename?: "Mutation";
  deleteClass?: { __typename?: "Class"; id: number } | null;
};

export type CreateClassScheduleMutationVariables = Exact<{
  input: CreateClassScheduleInput;
}>;

export type CreateClassScheduleMutation = {
  __typename?: "Mutation";
  createClassSchedule?: {
    __typename?: "ClassSchedule";
    id: number;
    userId: string;
    semesterId: string;
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

export type CreateDegreePlannerMutationVariables = Exact<{
  input: CreateDegreePlannerInput;
}>;

export type CreateDegreePlannerMutation = {
  __typename?: "Mutation";
  createDegreePlanner?: {
    __typename?: "DegreePlanner";
    id: number;
    userId: string;
    degreeId: number;
    Semester?: Array<{
      __typename?: "Semester";
      id: number;
      name: string;
      entries?: Array<{
        __typename?: "SemesterEntry";
        id: number;
        classId: number;
        class?: {
          __typename?: "Class";
          id: number;
          classCode: string;
          title: string;
          credits: number;
        } | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type DeleteDegreePlannerMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type DeleteDegreePlannerMutation = {
  __typename?: "Mutation";
  deleteDegreePlanner?: { __typename?: "DegreePlanner"; id: number } | null;
};

export type CreateSemesterMutationVariables = Exact<{
  input: CreateSemesterInput;
}>;

export type CreateSemesterMutation = {
  __typename?: "Mutation";
  createSemester?: {
    __typename?: "Semester";
    id: number;
    name: string;
    degreeId: number;
    plannerId: number;
    entries?: Array<{
      __typename?: "SemesterEntry";
      id: number;
      classId: number;
      index: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        title: string;
        credits: number;
      } | null;
    } | null> | null;
  } | null;
};

export type UpdateSemesterMutationVariables = Exact<{
  input: UpdateSemesterInput;
}>;

export type UpdateSemesterMutation = {
  __typename?: "Mutation";
  updateSemester?: {
    __typename?: "Semester";
    id: number;
    name: string;
    entries?: Array<{
      __typename?: "SemesterEntry";
      id: number;
      classId: number;
      index: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        title: string;
        credits: number;
      } | null;
    } | null> | null;
  } | null;
};

export type DeleteSemesterMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type DeleteSemesterMutation = {
  __typename?: "Mutation";
  deleteSemester?: { __typename?: "Semester"; id: number } | null;
};

export type AddClassToSemesterMutationVariables = Exact<{
  input: AddClassToSemesterInput;
}>;

export type AddClassToSemesterMutation = {
  __typename?: "Mutation";
  addClassToSemester?: {
    __typename?: "SemesterEntry";
    id: number;
    semesterId: number;
    classId: number;
    index: number;
    class?: {
      __typename?: "Class";
      id: number;
      classCode: string;
      title: string;
      credits: number;
    } | null;
  } | null;
};

export type RemoveClassFromSemesterMutationVariables = Exact<{
  input: RemoveClassFromSemesterInput;
}>;

export type RemoveClassFromSemesterMutation = {
  __typename?: "Mutation";
  removeClassFromSemester?: { __typename?: "SemesterEntry"; id: number } | null;
};

export type CreateDegreeMutationVariables = Exact<{
  input: CreateDegreeInput;
}>;

export type CreateDegreeMutation = {
  __typename?: "Mutation";
  createDegree?: {
    __typename?: "Degree";
    id: number;
    name: string;
    numberOfCores: number;
    numberOfElectives: number;
  } | null;
};

export type UpdateDegreeMutationVariables = Exact<{
  input: UpdateDegreeInput;
}>;

export type UpdateDegreeMutation = {
  __typename?: "Mutation";
  updateDegree?: {
    __typename?: "Degree";
    id: number;
    name: string;
    numberOfCores: number;
    numberOfElectives: number;
  } | null;
};

export type DeleteDegreeMutationVariables = Exact<{
  input: DeleteDegreeInput;
}>;

export type DeleteDegreeMutation = {
  __typename?: "Mutation";
  deleteDegree?: { __typename?: "Degree"; id: number } | null;
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
    classCode?: string | null;
    description?: string | null;
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
    classCode?: string | null;
    description?: string | null;
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
    credits: number;
    courseType: string;
    title: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
    rateMyProfessorRating: number;
    coreDegreeId: number;
    electiveDegreeId?: Array<number | null> | null;
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
    credits: number;
    courseType: string;
    title: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    color: string;
    professor: string;
    rateMyProfessorRating: number;
    coreDegreeId: number;
    electiveDegreeId?: Array<number | null> | null;
  } | null;
};

export type GetClassSchedulesQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetClassSchedulesQuery = {
  __typename?: "Query";
  getClassSchedules?: Array<{
    __typename?: "ClassSchedule";
    id: number;
    userId: string;
    semesterId: string;
    entries?: Array<{
      __typename?: "ClassScheduleEntry";
      id: number;
      classId: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        credits: number;
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
      credits: number;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      color: string;
      professor: string;
    } | null;
  } | null> | null;
};

export type GetDegreePlannersQueryVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type GetDegreePlannersQuery = {
  __typename?: "Query";
  getDegreePlanners?: Array<{
    __typename?: "DegreePlanner";
    id: number;
    userId: string;
    degreeId: number;
    Semester?: Array<{
      __typename?: "Semester";
      id: number;
      name: string;
      entries?: Array<{
        __typename?: "SemesterEntry";
        id: number;
        classId: number;
        index: number;
        class?: {
          __typename?: "Class";
          id: number;
          classCode: string;
          title: string;
          credits: number;
        } | null;
      } | null> | null;
    } | null> | null;
  } | null> | null;
};

export type GetSemestersQueryVariables = Exact<{
  plannerId: Scalars["Int"]["input"];
}>;

export type GetSemestersQuery = {
  __typename?: "Query";
  getSemesters?: Array<{
    __typename?: "Semester";
    id: number;
    name: string;
    degreeId: number;
    plannerId: number;
    entries?: Array<{
      __typename?: "SemesterEntry";
      id: number;
      classId: number;
      index: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        credits: number;
        title: string;
      } | null;
    } | null> | null;
  } | null> | null;
};

export type GetSemesterQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type GetSemesterQuery = {
  __typename?: "Query";
  getSemester?: {
    __typename?: "Semester";
    id: number;
    name: string;
    degreeId: number;
    plannerId: number;
    entries?: Array<{
      __typename?: "SemesterEntry";
      id: number;
      classId: number;
      index: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        credits: number;
        title: string;
      } | null;
    } | null> | null;
  } | null;
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
    classCode?: string | null;
    description?: string | null;
    title: string;
  } | null> | null;
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveDegreeId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateClassMutation, CreateClassMutationVariables>;
export const UpdateClassDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateClass" },
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
              name: { kind: "Name", value: "UpdateClassInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateClass" },
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveDegreeId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateClassMutation, UpdateClassMutationVariables>;
export const DeleteClassDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteClass" },
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
              name: { kind: "Name", value: "DeleteClassInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteClass" },
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
} as unknown as DocumentNode<DeleteClassMutation, DeleteClassMutationVariables>;
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
export const CreateDegreePlannerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDegreePlanner" },
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
              name: { kind: "Name", value: "CreateDegreePlannerInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDegreePlanner" },
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
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "Semester" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
                                    name: { kind: "Name", value: "credits" },
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
      },
    },
  ],
} as unknown as DocumentNode<
  CreateDegreePlannerMutation,
  CreateDegreePlannerMutationVariables
>;
export const DeleteDegreePlannerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteDegreePlanner" },
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
            name: { kind: "Name", value: "deleteDegreePlanner" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDegreePlannerMutation,
  DeleteDegreePlannerMutationVariables
>;
export const CreateSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateSemester" },
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
              name: { kind: "Name", value: "CreateSemesterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createSemester" },
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
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                { kind: "Field", name: { kind: "Name", value: "plannerId" } },
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
                      { kind: "Field", name: { kind: "Name", value: "index" } },
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
                              name: { kind: "Name", value: "credits" },
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
  CreateSemesterMutation,
  CreateSemesterMutationVariables
>;
export const UpdateSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSemester" },
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
              name: { kind: "Name", value: "UpdateSemesterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSemester" },
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
                { kind: "Field", name: { kind: "Name", value: "name" } },
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
                      { kind: "Field", name: { kind: "Name", value: "index" } },
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
                              name: { kind: "Name", value: "credits" },
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
  UpdateSemesterMutation,
  UpdateSemesterMutationVariables
>;
export const DeleteSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteSemester" },
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
            name: { kind: "Name", value: "deleteSemester" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteSemesterMutation,
  DeleteSemesterMutationVariables
>;
export const AddClassToSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddClassToSemester" },
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
              name: { kind: "Name", value: "AddClassToSemesterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addClassToSemester" },
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
                { kind: "Field", name: { kind: "Name", value: "semesterId" } },
                { kind: "Field", name: { kind: "Name", value: "classId" } },
                { kind: "Field", name: { kind: "Name", value: "index" } },
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
                        name: { kind: "Name", value: "credits" },
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
  AddClassToSemesterMutation,
  AddClassToSemesterMutationVariables
>;
export const RemoveClassFromSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveClassFromSemester" },
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
              name: { kind: "Name", value: "RemoveClassFromSemesterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeClassFromSemester" },
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
  RemoveClassFromSemesterMutation,
  RemoveClassFromSemesterMutationVariables
>;
export const CreateDegreeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateDegree" },
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
              name: { kind: "Name", value: "CreateDegreeInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createDegree" },
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
} as unknown as DocumentNode<
  CreateDegreeMutation,
  CreateDegreeMutationVariables
>;
export const UpdateDegreeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateDegree" },
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
              name: { kind: "Name", value: "UpdateDegreeInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateDegree" },
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
} as unknown as DocumentNode<
  UpdateDegreeMutation,
  UpdateDegreeMutationVariables
>;
export const DeleteDegreeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteDegree" },
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
              name: { kind: "Name", value: "DeleteDegreeInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteDegree" },
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
  DeleteDegreeMutation,
  DeleteDegreeMutationVariables
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveDegreeId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetClassesQuery, GetClassesQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveDegreeId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetClassQuery, GetClassQueryVariables>;
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
                              name: { kind: "Name", value: "credits" },
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
                        name: { kind: "Name", value: "credits" },
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
export const GetDegreePlannersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetDegreePlanners" },
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
            name: { kind: "Name", value: "getDegreePlanners" },
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
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "Semester" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
                              name: { kind: "Name", value: "index" },
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
                                    name: { kind: "Name", value: "credits" },
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
      },
    },
  ],
} as unknown as DocumentNode<
  GetDegreePlannersQuery,
  GetDegreePlannersQueryVariables
>;
export const GetSemestersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSemesters" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "plannerId" },
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
            name: { kind: "Name", value: "getSemesters" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "plannerId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "plannerId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                { kind: "Field", name: { kind: "Name", value: "plannerId" } },
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
                      { kind: "Field", name: { kind: "Name", value: "index" } },
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
                              name: { kind: "Name", value: "credits" },
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
} as unknown as DocumentNode<GetSemestersQuery, GetSemestersQueryVariables>;
export const GetSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSemester" },
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
            name: { kind: "Name", value: "getSemester" },
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
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                { kind: "Field", name: { kind: "Name", value: "plannerId" } },
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
                      { kind: "Field", name: { kind: "Name", value: "index" } },
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
                              name: { kind: "Name", value: "credits" },
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
} as unknown as DocumentNode<GetSemesterQuery, GetSemesterQueryVariables>;
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
