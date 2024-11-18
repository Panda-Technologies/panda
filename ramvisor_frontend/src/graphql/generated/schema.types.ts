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
  category: Scalars["String"]["output"];
  classCode: Scalars["String"]["output"];
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  color: Scalars["String"]["output"];
  coreDegreeId: Array<Maybe<Scalars["Int"]["output"]>>;
  courseType: Scalars["String"]["output"];
  credits: Scalars["Int"]["output"];
  dayOfWeek: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  electiveDegreeId?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
  endTime: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  professor: Scalars["String"]["output"];
  rateMyProfessorRating: Scalars["Float"]["output"];
  startTime: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
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
  isElective: Scalars["Boolean"]["input"];
};

export type DegreePlannerDegreeInput = {
  degreeId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  addClassToClassSchedule?: Maybe<ClassScheduleEntry>;
  addClassTosemester?: Maybe<SemesterEntry>;
  createClass?: Maybe<Class>;
  createClassSchedule?: Maybe<ClassSchedule>;
  createDegree?: Maybe<Degree>;
  createDegreePlanner?: Maybe<DegreePlanner>;
  createDegreeRequirements?: Maybe<Scalars["Boolean"]["output"]>;
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
  login?: Maybe<Scalars["String"]["output"]>;
  logout?: Maybe<Scalars["Boolean"]["output"]>;
  register?: Maybe<Scalars["String"]["output"]>;
  removeClassFromClassSchedule?: Maybe<ClassScheduleEntry>;
  removeClassFromSemester?: Maybe<SemesterEntry>;
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

export type MutationAddClassTosemesterArgs = {
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

export type MutationCreateDegreeRequirementsArgs = {
  degreeId: Scalars["Int"]["input"];
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
  degreeId?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["String"]["input"];
  questionnaireCompleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  university?: InputMaybe<Scalars["String"]["input"]>;
  yearInUniversity?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Query = {
  classTaken?: Maybe<ClassTakenResult>;
  getAlldegrees?: Maybe<Array<Maybe<Degree>>>;
  getClass?: Maybe<Class>;
  getClassScheduleEntries?: Maybe<Array<Maybe<ClassScheduleEntry>>>;
  getClassSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  getClasses?: Maybe<Array<Maybe<Class>>>;
  getDegree?: Maybe<Degree>;
  getGraduationSemester?: Maybe<Scalars["String"]["output"]>;
  getPremiumStatus?: Maybe<Scalars["Boolean"]["output"]>;
  getRequirement?: Maybe<Array<Maybe<Requirement>>>;
  getRequirements?: Maybe<Array<Maybe<Requirement>>>;
  getSemester?: Maybe<Semester>;
  getTasks?: Maybe<Array<Maybe<Task>>>;
  getUser?: Maybe<User>;
  getdegreePlanners?: Maybe<Array<Maybe<DegreePlanner>>>;
  getsemesters?: Maybe<Array<Maybe<Semester>>>;
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

export type QueryGetClassSchedulesArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetDegreeArgs = {
  userId: Scalars["String"]["input"];
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

export type QueryGetUserArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetdegreePlannersArgs = {
  userId: Scalars["String"]["input"];
};

export type QueryGetsemestersArgs = {
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
  isElective?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AddClassToScheduleInput = {
  classId: Scalars["Int"]["input"];
  classScheduleId: Scalars["Int"]["input"];
};

export type AddClassToSemesterInput = {
  classId: Scalars["Int"]["input"];
  semesterId: Scalars["Int"]["input"];
};

export type ClassSchedule = {
  entries?: Maybe<Array<Maybe<ClassScheduleEntry>>>;
  id: Scalars["Int"]["output"];
  semesterId: Scalars["String"]["output"];
  user?: Maybe<User>;
  userId: Scalars["String"]["output"];
};

export type ClassScheduleEntry = {
  class?: Maybe<Class>;
  classId: Scalars["Int"]["output"];
  classSchedule?: Maybe<ClassSchedule>;
  classScheduleId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
};

export type ClassTakenInput = {
  id: Scalars["String"]["input"];
};

export type ClassTakenResult = {
  classIds: Array<Maybe<Scalars["Int"]["output"]>>;
};

export type CreateClassScheduleInput = {
  semesterId?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type CreateDegreeInput = {
  coreCategories: Array<InputMaybe<Scalars["String"]["input"]>>;
  electiveCategories: Array<InputMaybe<Scalars["String"]["input"]>>;
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
  coreCategories: Array<Maybe<Scalars["String"]["output"]>>;
  electiveCategories: Array<Maybe<Scalars["String"]["output"]>>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  numberOfCores: Scalars["Int"]["output"];
  numberOfElectives: Scalars["Int"]["output"];
  semesters?: Maybe<Array<Maybe<Semester>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type DegreePlanner = {
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

export type RemoveClassFromScheduleInput = {
  id: Scalars["Int"]["input"];
};

export type RemoveClassFromSemesterInput = {
  classId: Scalars["Int"]["input"];
  semesterId: Scalars["Int"]["input"];
};

export type Requirement = {
  category: Scalars["String"]["output"];
  classIds: Array<Maybe<Scalars["Int"]["output"]>>;
  degreeId: Scalars["Int"]["output"];
  id: Scalars["Int"]["output"];
  isElective: Scalars["Boolean"]["output"];
};

export type ResetDegreePlannerInput = {
  id: Scalars["Int"]["input"];
};

export type Semester = {
  credits: Scalars["Int"]["output"];
  degreeId: Scalars["Int"]["output"];
  degreePlanner?: Maybe<DegreePlanner>;
  entries?: Maybe<Array<Maybe<SemesterEntry>>>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  plannerId: Scalars["Int"]["output"];
};

export type SemesterEntry = {
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
};

export type UpdateClassScheduleInput = {
  id: Scalars["Int"]["input"];
  semesterId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateDegreeInput = {
  coreCategories?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  electiveCategories?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
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
  assignmentCompletionPercentage?: Maybe<Scalars["Float"]["output"]>;
  attendancePercentage?: Maybe<Scalars["Float"]["output"]>;
  classSchedules?: Maybe<Array<Maybe<ClassSchedule>>>;
  degree?: Maybe<Degree>;
  degreeId?: Maybe<Scalars["Int"]["output"]>;
  degreePlanners?: Maybe<Array<Maybe<DegreePlanner>>>;
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
