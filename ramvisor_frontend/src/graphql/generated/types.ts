import type * as Types from "./schema.types";

export type RegisterMutationVariables = Types.Exact<{
  input: Types.RegisterInput;
}>;

export type RegisterMutation = Pick<Types.Mutation, "register">;

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutation = Pick<Types.Mutation, "login">;

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type LogoutMutation = Pick<Types.Mutation, "logout">;

export type UpdateUserProfileMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  university: Types.Scalars["String"]["input"];
  yearInUniversity: Types.Scalars["Int"]["input"];
  degreeId: Types.Scalars["Int"]["input"];
}>;

export type UpdateUserProfileMutation = {
  updateUserProfile?: Types.Maybe<
    Pick<Types.User, "id" | "university" | "yearInUniversity" | "degreeId">
  >;
};

export type UpdateUserAcademicInfoMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  gpa?: Types.InputMaybe<Types.Scalars["Float"]["input"]>;
  attendancePercentage?: Types.InputMaybe<Types.Scalars["Float"]["input"]>;
  assignmentCompletionPercentage?: Types.InputMaybe<
    Types.Scalars["Float"]["input"]
  >;
  takenClassIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars["Int"]["input"]>>
    | Types.InputMaybe<Types.Scalars["Int"]["input"]>
  >;
}>;

export type UpdateUserAcademicInfoMutation = {
  updateUserAcademicInfo?: Types.Maybe<
    Pick<
      Types.User,
      | "id"
      | "gpa"
      | "attendancePercentage"
      | "assignmentCompletionPercentage"
      | "takenClassIds"
    >
  >;
};

export type SetUserGraduationSemesterMutationVariables = Types.Exact<{
  input: Types.GraduationSemesterInput;
}>;

export type SetUserGraduationSemesterMutation = {
  setUserGraduationSemester?: Types.Maybe<
    Pick<Types.User, "id" | "graduationSemesterName">
  >;
};

export type UpdatePremiumStatusMutationVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  isPremium: Types.Scalars["Boolean"]["input"];
}>;

export type UpdatePremiumStatusMutation = {
  updatePremiumStatus?: Types.Maybe<Pick<Types.User, "id" | "isPremium">>;
};

export type CreateClassMutationVariables = Types.Exact<{
  input: Types.CreateClassInput;
}>;

export type CreateClassMutation = {
  createClass?: Types.Maybe<
    Pick<
      Types.Class,
      | "id"
      | "classCode"
      | "credits"
      | "courseType"
      | "title"
      | "description"
      | "category"
      | "dayOfWeek"
      | "startTime"
      | "endTime"
      | "color"
      | "professor"
      | "rateMyProfessorRating"
      | "coreDegreeId"
      | "electiveDegreeId"
    >
  >;
};

export type UpdateClassMutationVariables = Types.Exact<{
  input: Types.UpdateClassInput;
}>;

export type UpdateClassMutation = {
  updateClass?: Types.Maybe<
    Pick<
      Types.Class,
      | "id"
      | "classCode"
      | "credits"
      | "courseType"
      | "title"
      | "description"
      | "category"
      | "dayOfWeek"
      | "startTime"
      | "endTime"
      | "color"
      | "professor"
      | "rateMyProfessorRating"
      | "coreDegreeId"
      | "electiveDegreeId"
    >
  >;
};

export type DeleteClassMutationVariables = Types.Exact<{
  input: Types.DeleteClassInput;
}>;

export type DeleteClassMutation = {
  deleteClass?: Types.Maybe<Pick<Types.Class, "id">>;
};

export type CreateClassScheduleMutationVariables = Types.Exact<{
  input: Types.CreateClassScheduleInput;
}>;

export type CreateClassScheduleMutation = {
  createClassSchedule?: Types.Maybe<
    Pick<Types.ClassSchedule, "id" | "userId" | "semesterId">
  >;
};

export type UpdateClassScheduleMutationVariables = Types.Exact<{
  input: Types.UpdateClassScheduleInput;
}>;

export type UpdateClassScheduleMutation = {
  updateClassSchedule?: Types.Maybe<
    Pick<Types.ClassSchedule, "id" | "semesterId">
  >;
};

export type DeleteClassScheduleMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type DeleteClassScheduleMutation = {
  deleteClassSchedule?: Types.Maybe<Pick<Types.ClassSchedule, "id">>;
};

export type AddClassToClassScheduleMutationVariables = Types.Exact<{
  input: Types.AddClassToScheduleInput;
}>;

export type AddClassToClassScheduleMutation = {
  addClassToClassSchedule?: Types.Maybe<
    Pick<Types.ClassScheduleEntry, "id" | "classScheduleId" | "classId"> & {
      class?: Types.Maybe<
        Pick<
          Types.Class,
          | "id"
          | "classCode"
          | "title"
          | "credits"
          | "dayOfWeek"
          | "startTime"
          | "endTime"
          | "color"
          | "professor"
        >
      >;
    }
  >;
};

export type RemoveClassFromClassScheduleMutationVariables = Types.Exact<{
  input: Types.RemoveClassFromScheduleInput;
}>;

export type RemoveClassFromClassScheduleMutation = {
  removeClassFromClassSchedule?: Types.Maybe<
    Pick<Types.ClassScheduleEntry, "id"> & {
      class?: Types.Maybe<
        Pick<Types.Class, "id" | "classCode" | "title" | "credits">
      >;
    }
  >;
};

export type CreateDegreePlannerMutationVariables = Types.Exact<{
  input: Types.CreateDegreePlannerInput;
}>;

export type CreateDegreePlannerMutation = {
  createDegreePlanner?: Types.Maybe<
    Pick<Types.DegreePlanner, "id" | "title" | "userId" | "degreeId"> & {
      semester?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<
              Types.Semester,
              "id" | "name" | "credits" | "degreeId" | "plannerId"
            >
          >
        >
      >;
    }
  >;
};

export type ResetDegreePlannerMutationVariables = Types.Exact<{
  input: Types.ResetDegreePlannerInput;
}>;

export type ResetDegreePlannerMutation = {
  resetDegreePlanner?: Types.Maybe<
    Pick<Types.DegreePlanner, "id" | "title" | "userId" | "degreeId">
  >;
};

export type DeleteDegreePlannerMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type DeleteDegreePlannerMutation = {
  deleteDegreePlanner?: Types.Maybe<Pick<Types.DegreePlanner, "id">>;
};

export type CreateSemesterMutationVariables = Types.Exact<{
  input: Types.CreateSemesterInput;
}>;

export type CreateSemesterMutation = {
  createSemester?: Types.Maybe<
    Pick<
      Types.Semester,
      "id" | "name" | "credits" | "degreeId" | "plannerId"
    > & {
      entries?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<Types.SemesterEntry, "id" | "classId"> & {
              class?: Types.Maybe<
                Pick<Types.Class, "id" | "classCode" | "title" | "credits">
              >;
            }
          >
        >
      >;
    }
  >;
};

export type UpdateSemesterMutationVariables = Types.Exact<{
  input: Types.UpdateSemesterInput;
}>;

export type UpdateSemesterMutation = {
  updateSemester?: Types.Maybe<
    Pick<Types.Semester, "id" | "name" | "credits"> & {
      entries?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<Types.SemesterEntry, "id" | "classId"> & {
              class?: Types.Maybe<
                Pick<Types.Class, "id" | "classCode" | "title" | "credits">
              >;
            }
          >
        >
      >;
    }
  >;
};

export type DeleteSemesterMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type DeleteSemesterMutation = {
  deleteSemester?: Types.Maybe<Pick<Types.Semester, "id">>;
};

export type AddClassToSemesterMutationVariables = Types.Exact<{
  input: Types.AddClassToSemesterInput;
}>;

export type AddClassToSemesterMutation = {
  addClassTosemester?: Types.Maybe<
    Pick<Types.SemesterEntry, "id" | "semesterId" | "classId"> & {
      class?: Types.Maybe<
        Pick<Types.Class, "id" | "classCode" | "title" | "credits">
      >;
    }
  >;
};

export type RemoveClassFromSemesterMutationVariables = Types.Exact<{
  input: Types.RemoveClassFromSemesterInput;
}>;

export type RemoveClassFromSemesterMutation = {
  removeClassFromSemester?: Types.Maybe<
    Pick<Types.SemesterEntry, "id"> & {
      class?: Types.Maybe<
        Pick<Types.Class, "id" | "classCode" | "title" | "credits">
      >;
    }
  >;
};

export type CreateDegreeMutationVariables = Types.Exact<{
  input: Types.CreateDegreeInput;
}>;

export type CreateDegreeMutation = {
  createDegree?: Types.Maybe<
    Pick<
      Types.Degree,
      | "id"
      | "name"
      | "coreCategories"
      | "electiveCategories"
      | "numberOfCores"
      | "numberOfElectives"
    >
  >;
};

export type UpdateDegreeMutationVariables = Types.Exact<{
  input: Types.UpdateDegreeInput;
}>;

export type UpdateDegreeMutation = {
  updateDegree?: Types.Maybe<
    Pick<
      Types.Degree,
      | "id"
      | "name"
      | "coreCategories"
      | "electiveCategories"
      | "numberOfCores"
      | "numberOfElectives"
    >
  >;
};

export type DeleteDegreeMutationVariables = Types.Exact<{
  input: Types.DeleteDegreeInput;
}>;

export type DeleteDegreeMutation = {
  deleteDegree?: Types.Maybe<Pick<Types.Degree, "id">>;
};

export type CreateDegreeRequirementsMutationVariables = Types.Exact<{
  degreeId: Types.Scalars["Int"]["input"];
}>;

export type CreateDegreeRequirementsMutation = Pick<
  Types.Mutation,
  "createDegreeRequirements"
>;

export type CreateTaskMutationVariables = Types.Exact<{
  input: Types.CreateTaskInput;
}>;

export type CreateTaskMutation = {
  createTask?: Types.Maybe<
    Pick<
      Types.Task,
      | "id"
      | "userId"
      | "dueDate"
      | "stageId"
      | "classCode"
      | "description"
      | "title"
    >
  >;
};

export type UpdateTaskMutationVariables = Types.Exact<{
  input: Types.UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
  updateTask?: Types.Maybe<
    Pick<
      Types.Task,
      "id" | "title" | "dueDate" | "stageId" | "classCode" | "description"
    >
  >;
};

export type DeleteTaskMutationVariables = Types.Exact<{
  input: Types.DeleteTaskInput;
}>;

export type DeleteTaskMutation = {
  deleteTask?: Types.Maybe<Pick<Types.Task, "id">>;
};

export type CreateRequirementMutationVariables = Types.Exact<{
  data: Types.CreateRequirementInput;
}>;

export type CreateRequirementMutation = {
  createRequirement?: Types.Maybe<
    Pick<
      Types.Requirement,
      "id" | "category" | "isElective" | "classIds" | "degreeId"
    >
  >;
};

export type UpdateRequirementMutationVariables = Types.Exact<{
  data: Types.UpdateRequirementInput;
}>;

export type UpdateRequirementMutation = {
  updateRequirement?: Types.Maybe<
    Pick<
      Types.Requirement,
      "id" | "category" | "isElective" | "classIds" | "degreeId"
    >
  >;
};

export type GetUserQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type GetUserQuery = {
  getUser?: Types.Maybe<
    Pick<
      Types.User,
      | "id"
      | "email"
      | "university"
      | "isPremium"
      | "yearInUniversity"
      | "graduationSemesterName"
      | "gpa"
      | "attendancePercentage"
      | "assignmentCompletionPercentage"
      | "degreeId"
      | "takenClassIds"
    > & {
      degree?: Types.Maybe<
        Pick<
          Types.Degree,
          | "id"
          | "name"
          | "coreCategories"
          | "electiveCategories"
          | "numberOfCores"
          | "numberOfElectives"
        >
      >;
    }
  >;
};

export type ClassTakenQueryVariables = Types.Exact<{
  input: Types.ClassTakenInput;
}>;

export type ClassTakenQuery = {
  classTaken?: Types.Maybe<Pick<Types.ClassTakenResult, "classIds">>;
};

export type GetGraduationSemesterQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type GetGraduationSemesterQuery = Pick<
  Types.Query,
  "getGraduationSemester"
>;

export type GetPremiumStatusQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
}>;

export type GetPremiumStatusQuery = Pick<Types.Query, "getPremiumStatus">;

export type GetClassesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetClassesQuery = {
  getClasses?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Class,
          | "id"
          | "classCode"
          | "credits"
          | "courseType"
          | "title"
          | "description"
          | "category"
          | "dayOfWeek"
          | "startTime"
          | "endTime"
          | "color"
          | "professor"
          | "rateMyProfessorRating"
          | "coreDegreeId"
          | "electiveDegreeId"
        >
      >
    >
  >;
};

export type GetClassQueryVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type GetClassQuery = {
  getClass?: Types.Maybe<
    Pick<
      Types.Class,
      | "id"
      | "classCode"
      | "credits"
      | "courseType"
      | "title"
      | "description"
      | "category"
      | "dayOfWeek"
      | "startTime"
      | "endTime"
      | "color"
      | "professor"
      | "rateMyProfessorRating"
      | "coreDegreeId"
      | "electiveDegreeId"
    >
  >;
};

export type GetClassSchedulesQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetClassSchedulesQuery = {
  getClassSchedules?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.ClassSchedule, "id" | "userId" | "semesterId"> & {
          entries?: Types.Maybe<
            Array<
              Types.Maybe<
                Pick<
                  Types.ClassScheduleEntry,
                  "id" | "classScheduleId" | "classId"
                > & {
                  class?: Types.Maybe<
                    Pick<
                      Types.Class,
                      | "id"
                      | "classCode"
                      | "credits"
                      | "title"
                      | "dayOfWeek"
                      | "startTime"
                      | "endTime"
                      | "color"
                      | "professor"
                    >
                  >;
                }
              >
            >
          >;
        }
      >
    >
  >;
};

export type GetClassScheduleEntriesQueryVariables = Types.Exact<{
  classScheduleId: Types.Scalars["Int"]["input"];
}>;

export type GetClassScheduleEntriesQuery = {
  getClassScheduleEntries?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.ClassScheduleEntry, "id" | "classScheduleId" | "classId"> & {
          class?: Types.Maybe<
            Pick<
              Types.Class,
              | "id"
              | "classCode"
              | "title"
              | "credits"
              | "dayOfWeek"
              | "startTime"
              | "endTime"
              | "color"
              | "professor"
            >
          >;
        }
      >
    >
  >;
};

export type GetDegreePlannersQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetDegreePlannersQuery = {
  getdegreePlanners?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.DegreePlanner, "id" | "title" | "userId" | "degreeId"> & {
          semester?: Types.Maybe<
            Array<
              Types.Maybe<
                Pick<Types.Semester, "id" | "name" | "credits"> & {
                  entries?: Types.Maybe<
                    Array<
                      Types.Maybe<
                        Pick<Types.SemesterEntry, "id" | "classId"> & {
                          class?: Types.Maybe<
                            Pick<
                              Types.Class,
                              "id" | "classCode" | "title" | "credits"
                            >
                          >;
                        }
                      >
                    >
                  >;
                }
              >
            >
          >;
        }
      >
    >
  >;
};

export type GetSemestersQueryVariables = Types.Exact<{
  plannerId: Types.Scalars["Int"]["input"];
}>;

export type GetSemestersQuery = {
  getsemesters?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Semester,
          "id" | "name" | "credits" | "degreeId" | "plannerId"
        > & {
          entries?: Types.Maybe<
            Array<
              Types.Maybe<
                Pick<Types.SemesterEntry, "id" | "classId"> & {
                  class?: Types.Maybe<
                    Pick<Types.Class, "id" | "classCode" | "credits" | "title">
                  >;
                }
              >
            >
          >;
        }
      >
    >
  >;
};

export type GetSemesterQueryVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type GetSemesterQuery = {
  getSemester?: Types.Maybe<
    Pick<
      Types.Semester,
      "id" | "name" | "credits" | "degreeId" | "plannerId"
    > & {
      entries?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<Types.SemesterEntry, "id" | "classId"> & {
              class?: Types.Maybe<
                Pick<Types.Class, "id" | "classCode" | "credits" | "title">
              >;
            }
          >
        >
      >;
    }
  >;
};

export type GetAllDegreesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllDegreesQuery = {
  getAlldegrees?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Degree,
          | "id"
          | "name"
          | "coreCategories"
          | "electiveCategories"
          | "numberOfCores"
          | "numberOfElectives"
        >
      >
    >
  >;
};

export type GetDegreeQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetDegreeQuery = {
  getDegree?: Types.Maybe<
    Pick<
      Types.Degree,
      | "id"
      | "name"
      | "coreCategories"
      | "electiveCategories"
      | "numberOfCores"
      | "numberOfElectives"
    >
  >;
};

export type GetTasksQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetTasksQuery = {
  getTasks?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Task,
          | "id"
          | "userId"
          | "dueDate"
          | "stageId"
          | "classCode"
          | "description"
          | "title"
        >
      >
    >
  >;
};

export type GetRequirementQueryVariables = Types.Exact<{
  category: Types.Scalars["String"]["input"];
  degreeId: Types.Scalars["Int"]["input"];
}>;

export type GetRequirementQuery = {
  getRequirement?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Requirement,
          "id" | "category" | "isElective" | "classIds" | "degreeId"
        >
      >
    >
  >;
};

export type GetRequirementsQueryVariables = Types.Exact<{
  degreeId: Types.Scalars["Int"]["input"];
}>;

export type GetRequirementsQuery = {
  getRequirements?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Requirement,
          "id" | "category" | "isElective" | "classIds" | "degreeId"
        >
      >
    >
  >;
};
