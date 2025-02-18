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

export type Class = {
  __typename?: "Class";
  category: Scalars["String"]["output"];
  classCode: Scalars["String"]["output"];
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  color: Scalars["String"]["output"];
  coreDegreeId: Array<Maybe<Scalars["Int"]["output"]>>;
  courseType: Scalars["String"]["output"];
  credits: Scalars["Int"]["output"];
  description: Scalars["String"]["output"];
  electiveDegreeId?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  id: Scalars["Int"]["output"];
  rateMyProfessorRating: Scalars["Float"]["output"];
  sections?: Maybe<Array<Maybe<ClassSection>>>;
  title: Scalars["String"]["output"];
};

export type ClassScheduleUpdateInput = {
  classCode: Scalars["String"]["input"];
  classScheduleId: Scalars["Int"]["input"];
  sectionId: Scalars["String"]["input"];
};

export type CreateClassInput = {
  category: Scalars["String"]["input"];
  classCode: Scalars["String"]["input"];
  color: Scalars["String"]["input"];
  coreDegreeId: Scalars["Int"]["input"];
  courseType: Scalars["String"]["input"];
  credits: Scalars["Int"]["input"];
  dayOfWeek: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  electiveDegreeId: Array<InputMaybe<Scalars["Int"]["input"]>>;
  endTime: Scalars["String"]["input"];
  professor: Scalars["String"]["input"];
  rateMyProfessorRating: Scalars["Float"]["input"];
  startTime: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateRequirementInput = {
  category: Scalars["String"]["input"];
  classIds: Array<InputMaybe<Scalars["Int"]["input"]>>;
  degreeId: Scalars["Int"]["input"];
  reqType: Scalars["String"]["input"];
};

export type DegreePlannerDegreeInput = {
  degreeId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
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
  createDegreeAndRequirements?: Maybe<Scalars["Boolean"]["output"]>;
  createDegreePlanner?: Maybe<DegreePlanner>;
  createRequirement?: Maybe<Requirement>;
  createSemester?: Maybe<Semester>;
  createTask?: Maybe<Task>;
  deleteClass?: Maybe<Class>;
  deleteClassSchedule?: Maybe<ClassSchedule>;
  deleteDegree?: Maybe<Degree>;
  deleteDegreePlanner?: Maybe<DegreePlanner>;
  deleteSemester?: Maybe<Semester>;
  deleteTask?: Maybe<Task>;
  generateClassesFromScrape?: Maybe<Class>;
  importCanvasClasses?: Maybe<Class>;
  importCanvasTasks?: Maybe<Task>;
  login?: Maybe<Scalars["String"]["output"]>;
  logout?: Maybe<Scalars["Boolean"]["output"]>;
  register?: Maybe<Scalars["String"]["output"]>;
  removeClassFromClassSchedule?: Maybe<ClassScheduleEntry>;
  removeClassFromSemester?: Maybe<SemesterEntry>;
  resetClassSchedule?: Maybe<ClassSchedule>;
  resetDegreePlanner?: Maybe<DegreePlanner>;
  setUserGraduationSemester?: Maybe<User>;
  updateClass?: Maybe<Class>;
  updateClassSchedule?: Maybe<ClassSchedule>;
  updateDegree?: Maybe<Degree>;
  updatePremiumStatus?: Maybe<User>;
  updateRequirement?: Maybe<Requirement>;
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
  input?: InputMaybe<CreateClassScheduleInput>;
};

export type MutationCreateDegreeArgs = {
  input: CreateDegreeInput;
};

export type MutationCreateDegreePlannerArgs = {
  input: CreateDegreePlannerInput;
};

export type MutationCreateRequirementArgs = {
  data: CreateRequirementInput;
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

export type MutationImportCanvasClassesArgs = {
  input: ImportCanvasClassesInput;
};

export type MutationImportCanvasTasksArgs = {
  input?: InputMaybe<ImportCanvasTasksInput>;
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

export type MutationResetClassScheduleArgs = {
  input: ResetClassScheduleInput;
};

export type MutationResetDegreePlannerArgs = {
  input: ResetDegreePlannerInput;
};

export type MutationSetUserGraduationSemesterArgs = {
  input: GraduationSemesterInput;
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

export type MutationUpdatePremiumStatusArgs = {
  id: Scalars["String"]["input"];
  isPremium: Scalars["Boolean"]["input"];
};

export type MutationUpdateRequirementArgs = {
  data: UpdateRequirementInput;
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
  takenClassIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type MutationUpdateUserProfileArgs = {
  degreeIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  questionnaireCompleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  university?: InputMaybe<Scalars["String"]["input"]>;
  yearInUniversity?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  classTaken?: Maybe<ClassTakenResult>;
  getAllDegrees?: Maybe<Array<Maybe<Degree>>>;
  getClass?: Maybe<Class>;
  getClassScheduleEntries?: Maybe<Array<Maybe<ClassScheduleEntry>>>;
  getClassSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  getClasses?: Maybe<Array<Maybe<Class>>>;
  getDegree?: Maybe<Degree>;
  getDegreePlanners?: Maybe<Array<Maybe<DegreePlanner>>>;
  getGraduationSemester?: Maybe<Scalars["String"]["output"]>;
  getPremiumStatus?: Maybe<Scalars["Boolean"]["output"]>;
  getRequirement?: Maybe<Array<Maybe<Requirement>>>;
  getRequirements?: Maybe<Array<Maybe<Requirement>>>;
  getSemester?: Maybe<Semester>;
  getSemesters?: Maybe<Array<Maybe<Semester>>>;
  getTasks?: Maybe<Array<Maybe<Task>>>;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
};

export type QueryClassTakenArgs = {
  input: ClassTakenInput;
};

export type QueryGetClassArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryGetClassScheduleEntriesArgs = {
  classScheduleId: Scalars["Int"]["input"];
};

export type QueryGetGraduationSemesterArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetPremiumStatusArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetRequirementArgs = {
  category: Scalars["String"]["input"];
  degreeId: Scalars["Int"]["input"];
};

export type QueryGetRequirementsArgs = {
  degreeId: Scalars["Int"]["input"];
};

export type QueryGetSemesterArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryGetSemestersArgs = {
  plannerId: Scalars["Int"]["input"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type UpdateClassInput = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  classCode?: InputMaybe<Scalars["String"]["input"]>;
  color?: InputMaybe<Scalars["String"]["input"]>;
  coreDegreeId?: InputMaybe<Scalars["Int"]["input"]>;
  courseType?: InputMaybe<Scalars["String"]["input"]>;
  credits?: InputMaybe<Scalars["Int"]["input"]>;
  dayOfWeek?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  electiveDegreeId?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  endTime?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["Int"]["input"];
  professor?: InputMaybe<Scalars["String"]["input"]>;
  rateMyProfessorRating?: InputMaybe<Scalars["Float"]["input"]>;
  startTime?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateRequirementInput = {
  category?: InputMaybe<Scalars["String"]["input"]>;
  classIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  degreeId?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["Int"]["input"];
  reqType?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddClassToScheduleInput = {
  id: Scalars["String"]["input"];
  update: ClassScheduleUpdateInput;
};

export type AddClassToSemesterInput = {
  classId: Scalars["Int"]["input"];
  semesterId: Scalars["Int"]["input"];
};

export type ClassSchedule = {
  __typename?: "classSchedule";
  entries?: Maybe<Array<Maybe<ClassScheduleEntry>>>;
  id: Scalars["Int"]["output"];
  isCurrent?: Maybe<Scalars["Boolean"]["output"]>;
  semesterId: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type ClassScheduleEntry = {
  __typename?: "classScheduleEntry";
  class?: Maybe<Class>;
  classId: Scalars["Int"]["output"];
  classSchedule?: Maybe<ClassSchedule>;
  classScheduleId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  sectionId: Scalars["Int"]["output"];
};

export type ClassSection = {
  __typename?: "classSection";
  classId: Scalars["Int"]["output"];
  dayOfWeek: Scalars["String"]["output"];
  endTime: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  professor: Scalars["String"]["output"];
  rateMyProfessorRating?: Maybe<Scalars["String"]["output"]>;
  section: Scalars["Int"]["output"];
  startTime: Scalars["String"]["output"];
};

export type ClassTakenInput = {
  id: Scalars["String"]["input"];
};

export type ClassTakenResult = {
  __typename?: "classTakenResult";
  classIds: Array<Maybe<Scalars["Int"]["output"]>>;
};

export type CreateClassScheduleInput = {
  semesterId?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateDegreeInput = {
  coreCategories: Array<InputMaybe<Scalars["String"]["input"]>>;
  electiveCategories: Array<InputMaybe<Scalars["String"]["input"]>>;
  gatewayCategories: Array<InputMaybe<Scalars["String"]["input"]>>;
  name: Scalars["String"]["input"];
  numberOfCores: Scalars["Int"]["input"];
  numberOfElectives: Scalars["Int"]["input"];
};

export type CreateDegreePlannerInput = {
  degree: DegreePlannerDegreeInput;
};

export type CreateSemesterInput = {
  classIds?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  degreeId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  plannerId: Scalars["Int"]["input"];
};

export type CreateTaskInput = {
  task?: InputMaybe<TaskInputFields>;
};

export type Degree = {
  __typename?: "degree";
  coreCategories: Array<Maybe<Scalars["String"]["output"]>>;
  electiveCategories: Array<Maybe<Scalars["String"]["output"]>>;
  gatewayCategories: Array<Maybe<Scalars["String"]["output"]>>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  numberOfCores: Scalars["Float"]["output"];
  numberOfElectives: Scalars["Float"]["output"];
  semesters?: Maybe<Array<Maybe<Semester>>>;
  type: Scalars["String"]["output"];
  users?: Maybe<Array<Maybe<User>>>;
};

export type DegreePlanner = {
  __typename?: "degreePlanner";
  degree?: Maybe<Degree>;
  degreeId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  semester?: Maybe<Array<Maybe<Semester>>>;
  title: Scalars["String"]["output"];
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

export type GraduationSemesterInput = {
  id: Scalars["String"]["input"];
  semesterName: Scalars["String"]["input"];
  year: Scalars["Int"]["input"];
};

export type ImportCanvasClassesInput = {
  courseInput?: InputMaybe<Array<InputMaybe<ListClassInput>>>;
};

export type ImportCanvasTasksInput = {
  taskInput?: InputMaybe<Array<InputMaybe<ListTaskInput>>>;
};

export type ListClassInput = {
  classCode: Scalars["String"]["input"];
  color: Scalars["String"]["input"];
  sectionId: Scalars["String"]["input"];
  semesterId: Scalars["String"]["input"];
};

export type ListTaskInput = {
  assignment: Array<InputMaybe<TaskInputFields>>;
  classCode: Scalars["String"]["input"];
};

export type RemoveClassFromScheduleInput = {
  id: Scalars["String"]["input"];
  update: ClassScheduleUpdateInput;
};

export type RemoveClassFromSemesterInput = {
  classId: Scalars["Int"]["input"];
  semesterId: Scalars["Int"]["input"];
};

export type Requirement = {
  __typename?: "requirement";
  category: Scalars["String"]["output"];
  classIds: Array<Maybe<Scalars["Int"]["output"]>>;
  degreeId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  reqType: Scalars["String"]["output"];
};

export type ResetClassScheduleInput = {
  id: Scalars["String"]["input"];
  update: ResetClassScheduleUpdateInput;
};

export type ResetClassScheduleUpdateInput = {
  id: Scalars["Int"]["input"];
};

export type ResetDegreePlannerInput = {
  id: Scalars["Int"]["input"];
};

export type Semester = {
  __typename?: "semester";
  credits: Scalars["Int"]["output"];
  degreeId: Scalars["Int"]["output"];
  degreePlanner?: Maybe<DegreePlanner>;
  entries?: Maybe<Array<Maybe<SemesterEntry>>>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  plannerId: Scalars["Int"]["output"];
};

export type SemesterEntry = {
  __typename?: "semesterEntry";
  class?: Maybe<Class>;
  classId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  semester?: Maybe<Semester>;
  semesterId: Scalars["Int"]["output"];
};

export type SemesterEntryInput = {
  classId: Scalars["Int"]["input"];
};

export type Task = {
  __typename?: "task";
  classCode?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  dueDate: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  source: Scalars["String"]["output"];
  stageId: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type TaskInputFields = {
  classCode?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  dueDate: Scalars["String"]["input"];
  source?: InputMaybe<Scalars["String"]["input"]>;
  stageId?: InputMaybe<Scalars["Int"]["input"]>;
  title: Scalars["String"]["input"];
};

export type UpdateClassScheduleInput = {
  id: Scalars["Int"]["input"];
  semesterId?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateDegreeInput = {
  coreCategories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  electiveCategories?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  gatewayCategories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
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
  __typename?: "user";
  assignmentCompletionPercentage?: Maybe<Scalars["Float"]["output"]>;
  attendancePercentage?: Maybe<Scalars["Float"]["output"]>;
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  degreePlanners?: Maybe<Array<Maybe<DegreePlanner>>>;
  degrees?: Maybe<Array<Maybe<Degree>>>;
  email: Scalars["String"]["output"];
  gpa?: Maybe<Scalars["Float"]["output"]>;
  graduationSemesterName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  isPremium?: Maybe<Scalars["Boolean"]["output"]>;
  isQuestionnaireCompleted?: Maybe<Scalars["Boolean"]["output"]>;
  takenClassIds?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
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
  university: Scalars["String"]["input"];
  yearInUniversity: Scalars["Int"]["input"];
  degreeIds:
    | Array<InputMaybe<Scalars["Int"]["input"]>>
    | InputMaybe<Scalars["Int"]["input"]>;
}>;

export type UpdateUserProfileMutation = {
  __typename?: "Mutation";
  updateUserProfile?: {
    __typename?: "user";
    id: string;
    university?: string | null;
    yearInUniversity?: number | null;
    degrees?: Array<{
      __typename?: "degree";
      id: number;
      name: string;
    } | null> | null;
  } | null;
};

export type UpdateUserAcademicInfoMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  gpa?: InputMaybe<Scalars["Float"]["input"]>;
  attendancePercentage?: InputMaybe<Scalars["Float"]["input"]>;
  assignmentCompletionPercentage?: InputMaybe<Scalars["Float"]["input"]>;
  takenClassIds?: InputMaybe<
    | Array<InputMaybe<Scalars["Int"]["input"]>>
    | InputMaybe<Scalars["Int"]["input"]>
  >;
}>;

export type UpdateUserAcademicInfoMutation = {
  __typename?: "Mutation";
  updateUserAcademicInfo?: {
    __typename?: "user";
    id: string;
    gpa?: number | null;
    attendancePercentage?: number | null;
    assignmentCompletionPercentage?: number | null;
    takenClassIds?: Array<number | null> | null;
  } | null;
};

export type SetUserGraduationSemesterMutationVariables = Exact<{
  input: GraduationSemesterInput;
}>;

export type SetUserGraduationSemesterMutation = {
  __typename?: "Mutation";
  setUserGraduationSemester?: {
    __typename?: "user";
    id: string;
    graduationSemesterName?: string | null;
  } | null;
};

export type UpdatePremiumStatusMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  isPremium: Scalars["Boolean"]["input"];
}>;

export type UpdatePremiumStatusMutation = {
  __typename?: "Mutation";
  updatePremiumStatus?: {
    __typename?: "user";
    id: string;
    isPremium?: boolean | null;
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
    description: string;
    category: string;
    color: string;
    rateMyProfessorRating: number;
    coreDegreeId: Array<number | null>;
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
    description: string;
    category: string;
    color: string;
    rateMyProfessorRating: number;
    coreDegreeId: Array<number | null>;
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
    __typename?: "classSchedule";
    id: number;
    title: string;
    semesterId: string;
    entries?: Array<{
      __typename?: "classScheduleEntry";
      id: number;
      classScheduleId: number;
      classId: number;
      sectionId: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        credits: number;
        courseType: string;
        title: string;
        description: string;
        category: string;
        color: string;
        sections?: Array<{
          __typename?: "classSection";
          id: number;
          section: number;
          classId: number;
          dayOfWeek: string;
          startTime: string;
          endTime: string;
          professor: string;
          rateMyProfessorRating?: string | null;
        } | null> | null;
      } | null;
    } | null> | null;
  } | null;
};

export type UpdateClassScheduleMutationVariables = Exact<{
  input: UpdateClassScheduleInput;
}>;

export type UpdateClassScheduleMutation = {
  __typename?: "Mutation";
  updateClassSchedule?: {
    __typename?: "classSchedule";
    id: number;
    semesterId: string;
  } | null;
};

export type DeleteClassScheduleMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type DeleteClassScheduleMutation = {
  __typename?: "Mutation";
  deleteClassSchedule?: { __typename?: "classSchedule"; id: number } | null;
};

export type ResetClassScheduleMutationVariables = Exact<{
  input: ResetClassScheduleInput;
}>;

export type ResetClassScheduleMutation = {
  __typename?: "Mutation";
  resetClassSchedule?: { __typename?: "classSchedule"; id: number } | null;
};

export type AddClassToClassScheduleMutationVariables = Exact<{
  input: AddClassToScheduleInput;
}>;

export type AddClassToClassScheduleMutation = {
  __typename?: "Mutation";
  addClassToClassSchedule?: {
    __typename?: "classScheduleEntry";
    id: number;
    classScheduleId: number;
    sectionId: number;
    class?: {
      __typename?: "Class";
      id: number;
      classCode: string;
      credits: number;
      courseType: string;
      title: string;
      description: string;
      category: string;
      color: string;
      sections?: Array<{
        __typename?: "classSection";
        id: number;
        section: number;
        classId: number;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        professor: string;
        rateMyProfessorRating?: string | null;
      } | null> | null;
    } | null;
  } | null;
};

export type RemoveClassFromClassScheduleMutationVariables = Exact<{
  input: RemoveClassFromScheduleInput;
}>;

export type RemoveClassFromClassScheduleMutation = {
  __typename?: "Mutation";
  removeClassFromClassSchedule?: {
    __typename?: "classScheduleEntry";
    id: number;
  } | null;
};

export type CreateDegreePlannerMutationVariables = Exact<{
  input: CreateDegreePlannerInput;
}>;

export type CreateDegreePlannerMutation = {
  __typename?: "Mutation";
  createDegreePlanner?: {
    __typename?: "degreePlanner";
    id: number;
    title: string;
    userId: string;
    degreeId: number;
    semester?: Array<{
      __typename?: "semester";
      id: number;
      name: string;
      credits: number;
      degreeId: number;
      plannerId: number;
    } | null> | null;
  } | null;
};

export type ResetDegreePlannerMutationVariables = Exact<{
  input: ResetDegreePlannerInput;
}>;

export type ResetDegreePlannerMutation = {
  __typename?: "Mutation";
  resetDegreePlanner?: {
    __typename?: "degreePlanner";
    id: number;
    title: string;
    userId: string;
    degreeId: number;
  } | null;
};

export type DeleteDegreePlannerMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type DeleteDegreePlannerMutation = {
  __typename?: "Mutation";
  deleteDegreePlanner?: { __typename?: "degreePlanner"; id: number } | null;
};

export type CreateSemesterMutationVariables = Exact<{
  input: CreateSemesterInput;
}>;

export type CreateSemesterMutation = {
  __typename?: "Mutation";
  createSemester?: {
    __typename?: "semester";
    id: number;
    name: string;
    credits: number;
    degreeId: number;
    plannerId: number;
    entries?: Array<{
      __typename?: "semesterEntry";
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
  } | null;
};

export type UpdateSemesterMutationVariables = Exact<{
  input: UpdateSemesterInput;
}>;

export type UpdateSemesterMutation = {
  __typename?: "Mutation";
  updateSemester?: {
    __typename?: "semester";
    id: number;
    name: string;
    credits: number;
    entries?: Array<{
      __typename?: "semesterEntry";
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
  } | null;
};

export type DeleteSemesterMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type DeleteSemesterMutation = {
  __typename?: "Mutation";
  deleteSemester?: { __typename?: "semester"; id: number } | null;
};

export type AddClassToSemesterMutationVariables = Exact<{
  input: AddClassToSemesterInput;
}>;

export type AddClassToSemesterMutation = {
  __typename?: "Mutation";
  addClassToSemester?: {
    __typename?: "semesterEntry";
    id: number;
    semesterId: number;
    classId: number;
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
  removeClassFromSemester?: {
    __typename?: "semesterEntry";
    id: number;
    class?: {
      __typename?: "Class";
      id: number;
      classCode: string;
      title: string;
      credits: number;
    } | null;
  } | null;
};

export type CreateDegreeMutationVariables = Exact<{
  input: CreateDegreeInput;
}>;

export type CreateDegreeMutation = {
  __typename?: "Mutation";
  createDegree?: {
    __typename?: "degree";
    id: number;
    name: string;
    coreCategories: Array<string | null>;
    gatewayCategories: Array<string | null>;
    electiveCategories: Array<string | null>;
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
    __typename?: "degree";
    id: number;
    name: string;
    coreCategories: Array<string | null>;
    gatewayCategories: Array<string | null>;
    electiveCategories: Array<string | null>;
    numberOfCores: number;
    numberOfElectives: number;
  } | null;
};

export type DeleteDegreeMutationVariables = Exact<{
  input: DeleteDegreeInput;
}>;

export type DeleteDegreeMutation = {
  __typename?: "Mutation";
  deleteDegree?: { __typename?: "degree"; id: number } | null;
};

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;

export type CreateTaskMutation = {
  __typename?: "Mutation";
  createTask?: {
    __typename?: "task";
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
    __typename?: "task";
    id: number;
    title: string;
    dueDate: string;
    stageId: number;
    classCode?: string | null;
    description?: string | null;
  } | null;
};

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;

export type DeleteTaskMutation = {
  __typename?: "Mutation";
  deleteTask?: { __typename?: "task"; id: number } | null;
};

export type MarkQuestionnaireCompletedMutationVariables = Exact<{
  isQuestionnaireCompleted?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type MarkQuestionnaireCompletedMutation = {
  __typename?: "Mutation";
  updateUserProfile?: {
    __typename?: "user";
    id: string;
    isQuestionnaireCompleted?: boolean | null;
  } | null;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: "Query";
  getUser?: {
    __typename?: "user";
    id: string;
    email: string;
    university?: string | null;
    isPremium?: boolean | null;
    yearInUniversity?: number | null;
    graduationSemesterName?: string | null;
    gpa?: number | null;
    attendancePercentage?: number | null;
    assignmentCompletionPercentage?: number | null;
    takenClassIds?: Array<number | null> | null;
    degrees?: Array<{
      __typename?: "degree";
      id: number;
      name: string;
      type: string;
      coreCategories: Array<string | null>;
      gatewayCategories: Array<string | null>;
      electiveCategories: Array<string | null>;
      numberOfCores: number;
      numberOfElectives: number;
    } | null> | null;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "user";
    id: string;
    email: string;
    university?: string | null;
    isPremium?: boolean | null;
    yearInUniversity?: number | null;
    graduationSemesterName?: string | null;
    gpa?: number | null;
    attendancePercentage?: number | null;
    assignmentCompletionPercentage?: number | null;
    takenClassIds?: Array<number | null> | null;
    degrees?: Array<{
      __typename?: "degree";
      id: number;
      name: string;
    } | null> | null;
  } | null;
};

export type ClassTakenQueryVariables = Exact<{
  input: ClassTakenInput;
}>;

export type ClassTakenQuery = {
  __typename?: "Query";
  classTaken?: {
    __typename?: "classTakenResult";
    classIds: Array<number | null>;
  } | null;
};

export type GetGraduationSemesterQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetGraduationSemesterQuery = {
  __typename?: "Query";
  getGraduationSemester?: string | null;
};

export type GetPremiumStatusQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetPremiumStatusQuery = {
  __typename?: "Query";
  getPremiumStatus?: boolean | null;
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
    description: string;
    category: string;
    color: string;
    coreDegreeId: Array<number | null>;
    electiveDegreeId?: Array<number | null> | null;
    sections?: Array<{
      __typename?: "classSection";
      id: number;
      section: number;
      classId: number;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      professor: string;
      rateMyProfessorRating?: string | null;
    } | null> | null;
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
    description: string;
    category: string;
    color: string;
    coreDegreeId: Array<number | null>;
    electiveDegreeId?: Array<number | null> | null;
    sections?: Array<{
      __typename?: "classSection";
      id: number;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      professor: string;
      rateMyProfessorRating?: string | null;
    } | null> | null;
  } | null;
};

export type GetClassSchedulesQueryVariables = Exact<{ [key: string]: never }>;

export type GetClassSchedulesQuery = {
  __typename?: "Query";
  getClassSchedules?: Array<{
    __typename?: "classSchedule";
    id: number;
    title: string;
    semesterId: string;
    entries?: Array<{
      __typename?: "classScheduleEntry";
      id: number;
      classScheduleId: number;
      classId: number;
      sectionId: number;
      class?: {
        __typename?: "Class";
        id: number;
        classCode: string;
        credits: number;
        courseType: string;
        title: string;
        description: string;
        category: string;
        color: string;
        sections?: Array<{
          __typename?: "classSection";
          id: number;
          section: number;
          classId: number;
          dayOfWeek: string;
          startTime: string;
          endTime: string;
          professor: string;
          rateMyProfessorRating?: string | null;
        } | null> | null;
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
    __typename?: "classScheduleEntry";
    id: number;
    classScheduleId: number;
    classId: number;
    sectionId: number;
    class?: {
      __typename?: "Class";
      id: number;
      classCode: string;
      credits: number;
      courseType: string;
      title: string;
      description: string;
      category: string;
      color: string;
      sections?: Array<{
        __typename?: "classSection";
        id: number;
        section: number;
        classId: number;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
        professor: string;
        rateMyProfessorRating?: string | null;
      } | null> | null;
    } | null;
  } | null> | null;
};

export type GetDegreePlannersQueryVariables = Exact<{ [key: string]: never }>;

export type GetDegreePlannersQuery = {
  __typename?: "Query";
  getDegreePlanners?: Array<{
    __typename?: "degreePlanner";
    id: number;
    title: string;
    userId: string;
    degreeId: number;
    semester?: Array<{
      __typename?: "semester";
      id: number;
      name: string;
      credits: number;
      entries?: Array<{
        __typename?: "semesterEntry";
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
  } | null> | null;
};

export type GetSemestersQueryVariables = Exact<{
  plannerId: Scalars["Int"]["input"];
}>;

export type GetSemestersQuery = {
  __typename?: "Query";
  getSemesters?: Array<{
    __typename?: "semester";
    id: number;
    name: string;
    credits: number;
    degreeId: number;
    plannerId: number;
    entries?: Array<{
      __typename?: "semesterEntry";
      id: number;
      classId: number;
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
    __typename?: "semester";
    id: number;
    name: string;
    credits: number;
    degreeId: number;
    plannerId: number;
    entries?: Array<{
      __typename?: "semesterEntry";
      id: number;
      classId: number;
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
    __typename?: "degree";
    id: number;
    name: string;
    coreCategories: Array<string | null>;
    gatewayCategories: Array<string | null>;
    electiveCategories: Array<string | null>;
    numberOfCores: number;
    numberOfElectives: number;
  } | null> | null;
};

export type GetDegreeQueryVariables = Exact<{ [key: string]: never }>;

export type GetDegreeQuery = {
  __typename?: "Query";
  getDegree?: {
    __typename?: "degree";
    id: number;
    name: string;
    coreCategories: Array<string | null>;
    gatewayCategories: Array<string | null>;
    electiveCategories: Array<string | null>;
    numberOfCores: number;
    numberOfElectives: number;
  } | null;
};

export type GetTasksQueryVariables = Exact<{ [key: string]: never }>;

export type GetTasksQuery = {
  __typename?: "Query";
  getTasks?: Array<{
    __typename?: "task";
    id: number;
    userId: string;
    dueDate: string;
    stageId: number;
    classCode?: string | null;
    description?: string | null;
    title: string;
  } | null> | null;
};

export type GetRequirementQueryVariables = Exact<{
  category: Scalars["String"]["input"];
  degreeId: Scalars["Int"]["input"];
}>;

export type GetRequirementQuery = {
  __typename?: "Query";
  getRequirement?: Array<{
    __typename?: "requirement";
    id: number;
    category: string;
    reqType: string;
    classIds: Array<number | null>;
    degreeId: number;
  } | null> | null;
};

export type GetRequirementsQueryVariables = Exact<{
  degreeId: Scalars["Int"]["input"];
}>;

export type GetRequirementsQuery = {
  __typename?: "Query";
  getRequirements?: Array<{
    __typename?: "requirement";
    id: number;
    category: string;
    reqType: string;
    classIds: Array<number | null>;
    degreeId: number;
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
            name: { kind: "Name", value: "degreeIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
            },
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
                name: { kind: "Name", value: "degreeIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "degreeIds" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "degrees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "takenClassIds" },
          },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
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
              {
                kind: "Argument",
                name: { kind: "Name", value: "takenClassIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "takenClassIds" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "takenClassIds" },
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
export const SetUserGraduationSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetUserGraduationSemester" },
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
              name: { kind: "Name", value: "graduationSemesterInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setUserGraduationSemester" },
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
                  name: { kind: "Name", value: "graduationSemesterName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetUserGraduationSemesterMutation,
  SetUserGraduationSemesterMutationVariables
>;
export const UpdatePremiumStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePremiumStatus" },
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
            name: { kind: "Name", value: "isPremium" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePremiumStatus" },
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
                name: { kind: "Name", value: "isPremium" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isPremium" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "isPremium" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatePremiumStatusMutation,
  UpdatePremiumStatusMutationVariables
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
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
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
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
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
              name: { kind: "Name", value: "deleteClassInput" },
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
              name: { kind: "Name", value: "createClassScheduleInput" },
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
                { kind: "Field", name: { kind: "Name", value: "title" } },
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
                        name: { kind: "Name", value: "classScheduleId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sectionId" },
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
                              name: { kind: "Name", value: "courseType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sections" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "section" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "classId" },
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
                                    name: { kind: "Name", value: "professor" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "rateMyProfessorRating",
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "color" },
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
  CreateClassScheduleMutation,
  CreateClassScheduleMutationVariables
>;
export const UpdateClassScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateClassSchedule" },
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
              name: { kind: "Name", value: "updateClassScheduleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateClassSchedule" },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateClassScheduleMutation,
  UpdateClassScheduleMutationVariables
>;
export const DeleteClassScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteClassSchedule" },
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
            name: { kind: "Name", value: "deleteClassSchedule" },
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
  DeleteClassScheduleMutation,
  DeleteClassScheduleMutationVariables
>;
export const ResetClassScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetClassSchedule" },
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
              name: { kind: "Name", value: "resetClassScheduleInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetClassSchedule" },
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
  ResetClassScheduleMutation,
  ResetClassScheduleMutationVariables
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
              name: { kind: "Name", value: "addClassToScheduleInput" },
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
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "credits" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "courseType" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sections" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "section" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "classId" },
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
                              name: { kind: "Name", value: "professor" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "rateMyProfessorRating",
                              },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
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
              name: { kind: "Name", value: "removeClassFromScheduleInput" },
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
              name: { kind: "Name", value: "createDegreePlannerInput" },
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
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "semester" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "credits" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "degreeId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "plannerId" },
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
export const ResetDegreePlannerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetDegreePlanner" },
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
              name: { kind: "Name", value: "resetDegreePlannerInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetDegreePlanner" },
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
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetDegreePlannerMutation,
  ResetDegreePlannerMutationVariables
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
              name: { kind: "Name", value: "createSemesterInput" },
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
              name: { kind: "Name", value: "updateSemesterInput" },
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
              name: { kind: "Name", value: "addClassToSemesterInput" },
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
              name: { kind: "Name", value: "removeClassFromSemesterInput" },
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
              name: { kind: "Name", value: "createDegreeInput" },
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
                  name: { kind: "Name", value: "coreCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "gatewayCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveCategories" },
                },
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
              name: { kind: "Name", value: "updateDegreeInput" },
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
                  name: { kind: "Name", value: "coreCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "gatewayCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveCategories" },
                },
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
              name: { kind: "Name", value: "deleteDegreeInput" },
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
              name: { kind: "Name", value: "createTaskInput" },
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
              name: { kind: "Name", value: "updateTaskInput" },
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
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                { kind: "Field", name: { kind: "Name", value: "stageId" } },
                { kind: "Field", name: { kind: "Name", value: "classCode" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
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
              name: { kind: "Name", value: "deleteTaskInput" },
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
export const MarkQuestionnaireCompletedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MarkQuestionnaireCompleted" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isQuestionnaireCompleted" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
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
                name: { kind: "Name", value: "questionnaireCompleted" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isQuestionnaireCompleted" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isQuestionnaireCompleted" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MarkQuestionnaireCompletedMutation,
  MarkQuestionnaireCompletedMutationVariables
>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "university" } },
                { kind: "Field", name: { kind: "Name", value: "isPremium" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "yearInUniversity" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "graduationSemesterName" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "takenClassIds" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "degrees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coreCategories" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gatewayCategories" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "electiveCategories" },
                      },
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
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "university" } },
                { kind: "Field", name: { kind: "Name", value: "isPremium" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "yearInUniversity" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "graduationSemesterName" },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "takenClassIds" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "degrees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
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
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const ClassTakenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ClassTaken" },
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
              name: { kind: "Name", value: "classTakenInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "classTaken" },
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
                { kind: "Field", name: { kind: "Name", value: "classIds" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClassTakenQuery, ClassTakenQueryVariables>;
export const GetGraduationSemesterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetGraduationSemester" },
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
            name: { kind: "Name", value: "getGraduationSemester" },
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
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetGraduationSemesterQuery,
  GetGraduationSemesterQueryVariables
>;
export const GetPremiumStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPremiumStatus" },
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
            name: { kind: "Name", value: "getPremiumStatus" },
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
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPremiumStatusQuery,
  GetPremiumStatusQueryVariables
>;
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
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sections" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "section" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classId" },
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
                        name: { kind: "Name", value: "professor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rateMyProfessorRating" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "color" } },
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
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sections" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
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
                        name: { kind: "Name", value: "professor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rateMyProfessorRating" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "color" } },
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
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getClassSchedules" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
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
                        name: { kind: "Name", value: "classScheduleId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "classId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sectionId" },
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
                              name: { kind: "Name", value: "courseType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "title" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "description" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sections" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "section" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "classId" },
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
                                    name: { kind: "Name", value: "professor" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "rateMyProfessorRating",
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "color" },
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
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "credits" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "courseType" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sections" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "section" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "classId" },
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
                              name: { kind: "Name", value: "professor" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "rateMyProfessorRating",
                              },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "color" } },
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
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDegreePlanners" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "semester" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "credits" },
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
                { kind: "Field", name: { kind: "Name", value: "credits" } },
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
                  name: { kind: "Name", value: "coreCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "gatewayCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveCategories" },
                },
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
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDegree" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "coreCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "gatewayCategories" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "electiveCategories" },
                },
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
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTasks" },
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
export const GetRequirementDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRequirement" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "category" },
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
            name: { kind: "Name", value: "getRequirement" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "category" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "category" },
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
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "reqType" } },
                { kind: "Field", name: { kind: "Name", value: "classIds" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetRequirementQuery, GetRequirementQueryVariables>;
export const GetRequirementsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRequirements" },
      variableDefinitions: [
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
            name: { kind: "Name", value: "getRequirements" },
            arguments: [
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
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "reqType" } },
                { kind: "Field", name: { kind: "Name", value: "classIds" } },
                { kind: "Field", name: { kind: "Name", value: "degreeId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetRequirementsQuery,
  GetRequirementsQueryVariables
>;
