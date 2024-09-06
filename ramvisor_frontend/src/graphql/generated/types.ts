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
}>;

export type UpdateUserAcademicInfoMutation = {
  updateUserAcademicInfo?: Types.Maybe<
    Pick<
      Types.User,
      "id" | "gpa" | "attendancePercentage" | "assignmentCompletionPercentage"
    >
  >;
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
      | "courseType"
      | "title"
      | "dayOfWeek"
      | "startTime"
      | "endTime"
      | "color"
      | "professor"
      | "rateMyProfessorRating"
      | "coreDegreeId"
    >
  >;
};

export type CreateClassScheduleMutationVariables = Types.Exact<{
  input: Types.CreateClassScheduleInput;
}>;

export type CreateClassScheduleMutation = {
  createClassSchedule?: Types.Maybe<
    Pick<Types.ClassSchedule, "id" | "userId" | "semesterId">
  >;
};

export type AddClassToClassScheduleMutationVariables = Types.Exact<{
  input: Types.AddClassToScheduleInput;
}>;

export type AddClassToClassScheduleMutation = {
  addClassToClassSchedule?: Types.Maybe<
    Pick<Types.ClassScheduleEntry, "id" | "classScheduleId" | "classId">
  >;
};

export type RemoveClassFromClassScheduleMutationVariables = Types.Exact<{
  input: Types.RemoveClassFromScheduleInput;
}>;

export type RemoveClassFromClassScheduleMutation = {
  removeClassFromClassSchedule?: Types.Maybe<
    Pick<Types.ClassScheduleEntry, "id">
  >;
};

export type CreateDegreePlannerMutationVariables = Types.Exact<{
  input: Types.CreateDegreePlannerInput;
}>;

export type CreateDegreePlannerMutation = {
  createDegreePlanner?: Types.Maybe<
    Pick<Types.DegreePlanner, "id" | "userId" | "degreeId">
  >;
};

export type DeleteDegreePlannerMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type DeleteDegreePlannerMutation = {
  deleteDegreePlanner?: Types.Maybe<Pick<Types.DegreePlanner, "id">>;
};

export type CreateDegreeScheduleMutationVariables = Types.Exact<{
  input: Types.CreateDegreeScheduleInput;
}>;

export type CreateDegreeScheduleMutation = {
  createDegreeSchedule?: Types.Maybe<
    Pick<Types.DegreeSchedule, "id" | "degreeId" | "semesterId" | "plannerId">
  >;
};

export type UpdateDegreeScheduleMutationVariables = Types.Exact<{
  input: Types.UpdateDegreeScheduleInput;
}>;

export type UpdateDegreeScheduleMutation = {
  updateDegreeSchedule?: Types.Maybe<
    Pick<Types.DegreeSchedule, "id" | "semesterId">
  >;
};

export type DeleteDegreeScheduleMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type DeleteDegreeScheduleMutation = {
  deleteDegreeSchedule?: Types.Maybe<Pick<Types.DegreeSchedule, "id">>;
};

export type AddClassToDegreeScheduleMutationVariables = Types.Exact<{
  input: Types.AddClassToDegreeScheduleInput;
}>;

export type AddClassToDegreeScheduleMutation = {
  addClassToDegreeSchedule?: Types.Maybe<
    Pick<Types.DegreeScheduleEntry, "id" | "degreeScheduleId" | "classId">
  >;
};

export type RemoveClassFromDegreeScheduleMutationVariables = Types.Exact<{
  input: Types.RemoveClassFromDegreeScheduleInput;
}>;

export type RemoveClassFromDegreeScheduleMutation = {
  removeClassFromDegreeSchedule?: Types.Maybe<
    Pick<Types.DegreeScheduleEntry, "id">
  >;
};

export type CreateTaskMutationVariables = Types.Exact<{
  input: Types.CreateTaskInput;
}>;

export type CreateTaskMutation = {
  createTask?: Types.Maybe<
    Pick<
      Types.Task,
      | "id"
      | "title"
      | "description"
      | "dueDate"
      | "stageId"
      | "userId"
      | "classCode"
    >
  >;
};

export type UpdateTaskMutationVariables = Types.Exact<{
  input: Types.UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
  updateTask?: Types.Maybe<
    Pick<Types.Task, "id" | "dueDate" | "stageId" | "description" | "title">
  >;
};

export type DeleteTaskMutationVariables = Types.Exact<{
  input: Types.DeleteTaskInput;
}>;

export type DeleteTaskMutation = {
  deleteTask?: Types.Maybe<Pick<Types.Task, "id">>;
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
      | "yearInUniversity"
      | "gpa"
      | "attendancePercentage"
      | "assignmentCompletionPercentage"
      | "degreeId"
    > & {
      tasks?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<
              Types.Task,
              | "id"
              | "title"
              | "dueDate"
              | "stageId"
              | "classCode"
              | "description"
            >
          >
        >
      >;
      classSchedules?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<Types.ClassSchedule, "id" | "semesterId"> & {
              entries?: Types.Maybe<
                Array<
                  Types.Maybe<
                    Pick<Types.ClassScheduleEntry, "id" | "classId"> & {
                      class?: Types.Maybe<
                        Pick<
                          Types.Class,
                          | "id"
                          | "classCode"
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
      degreeSchedules?: Types.Maybe<
        Array<
          Types.Maybe<
            Pick<Types.DegreeSchedule, "id" | "semesterId"> & {
              entries?: Types.Maybe<
                Array<
                  Types.Maybe<
                    Pick<Types.DegreeScheduleEntry, "id" | "classId"> & {
                      class?: Types.Maybe<
                        Pick<Types.Class, "id" | "classCode" | "title">
                      >;
                    }
                  >
                >
              >;
            }
          >
        >
      >;
      degree?: Types.Maybe<
        Pick<
          Types.Degree,
          "id" | "name" | "numberOfCores" | "numberOfElectives"
        >
      >;
    }
  >;
};

export type GetClassesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetClassesQuery = {
  getClasses?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Class,
          | "id"
          | "classCode"
          | "courseType"
          | "title"
          | "dayOfWeek"
          | "startTime"
          | "endTime"
          | "color"
          | "professor"
          | "rateMyProfessorRating"
          | "coreDegreeId"
        >
      >
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
                Pick<Types.ClassScheduleEntry, "id" | "classId"> & {
                  class?: Types.Maybe<
                    Pick<
                      Types.Class,
                      | "id"
                      | "classCode"
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

export type GetDegreePlannersQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetDegreePlannersQuery = {
  getDegreePlanners?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.DegreePlanner, "id" | "userId" | "degreeId"> & {
          degreeSchedule?: Types.Maybe<
            Array<
              Types.Maybe<
                Pick<Types.DegreeSchedule, "id" | "degreeId" | "semesterId"> & {
                  entries?: Types.Maybe<
                    Array<
                      Types.Maybe<
                        Pick<Types.DegreeScheduleEntry, "id" | "classId"> & {
                          class?: Types.Maybe<
                            Pick<Types.Class, "id" | "classCode" | "title">
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

export type GetDegreeSchedulesQueryVariables = Types.Exact<{
  plannerId: Types.Scalars["Int"]["input"];
}>;

export type GetDegreeSchedulesQuery = {
  getDegreeSchedules?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.DegreeSchedule, "id" | "degreeId" | "semesterId"> & {
          entries?: Types.Maybe<
            Array<
              Types.Maybe<
                Pick<Types.DegreeScheduleEntry, "id" | "classId"> & {
                  class?: Types.Maybe<
                    Pick<Types.Class, "id" | "classCode" | "title">
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

export type GetAllDegreesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllDegreesQuery = {
  getAllDegrees?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.Degree,
          "id" | "name" | "numberOfCores" | "numberOfElectives"
        >
      >
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

export type GetClassQueryVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type GetClassQuery = {
  getClass?: Types.Maybe<
    Pick<
      Types.Class,
      | "id"
      | "classCode"
      | "courseType"
      | "title"
      | "dayOfWeek"
      | "startTime"
      | "endTime"
      | "color"
      | "professor"
      | "rateMyProfessorRating"
      | "coreDegreeId"
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

export type GetDegreeScheduleEntriesQueryVariables = Types.Exact<{
  degreeScheduleId: Types.Scalars["Int"]["input"];
}>;

export type GetDegreeScheduleEntriesQuery = {
  getDegreeScheduleEntries?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<
          Types.DegreeScheduleEntry,
          "id" | "degreeScheduleId" | "classId"
        > & {
          class?: Types.Maybe<Pick<Types.Class, "id" | "classCode" | "title">>;
        }
      >
    >
  >;
};

export type GetDegreeQueryVariables = Types.Exact<{
  id: Types.Scalars["Int"]["input"];
}>;

export type GetDegreeQuery = {
  getDegree?: Types.Maybe<
    Pick<Types.Degree, "id" | "name" | "numberOfCores" | "numberOfElectives">
  >;
};
