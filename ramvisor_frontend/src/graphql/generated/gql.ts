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
  "\n    mutation Register($input: RegisterInput!) {\n        register(input: $input)\n    }\n":
    types.RegisterDocument,
  "\n    mutation Login($input: LoginInput!) {\n        login(input: $input)\n    }\n":
    types.LoginDocument,
  "\n    mutation Logout {\n        logout\n    }\n": types.LogoutDocument,
  "\n    mutation UpdateUserProfile($id: String!, $university: String!, $yearInUniversity: Int!, $degreeId: Int!) {\n        updateUserProfile(id: $id, university: $university, yearInUniversity: $yearInUniversity, degreeId: $degreeId) {\n            id\n            university\n            yearInUniversity\n            degreeId\n        }\n    }\n":
    types.UpdateUserProfileDocument,
  "\n    mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float, $takenClassIds: [Int]) {\n        updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage, takenClassIds: $takenClassIds) {\n            id\n            gpa\n            attendancePercentage\n            assignmentCompletionPercentage\n            takenClassIds\n        }\n    }\n":
    types.UpdateUserAcademicInfoDocument,
  "\n    mutation SetUserGraduationSemester($input: graduationSemesterInput!) {\n        setUserGraduationSemester(input: $input) {\n            id\n            graduationSemesterName\n        }\n    }\n":
    types.SetUserGraduationSemesterDocument,
  "\n    mutation UpdatePremiumStatus($id: String!, $isPremium: Boolean!) {\n        updatePremiumStatus(id: $id, isPremium: $isPremium) {\n            id\n            isPremium\n        }\n    }\n":
    types.UpdatePremiumStatusDocument,
  "\n    mutation CreateClass($input: CreateClassInput!) {\n        createClass(input: $input) {\n            id\n            classCode\n            credits\n            courseType\n            title\n            description\n            category\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n            rateMyProfessorRating\n            coreDegreeId\n            electiveDegreeId\n        }\n    }\n":
    types.CreateClassDocument,
  "\n    mutation UpdateClass($input: UpdateClassInput!) {\n        updateClass(input: $input) {\n            id\n            classCode\n            credits\n            courseType\n            title\n            description\n            category\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n            rateMyProfessorRating\n            coreDegreeId\n            electiveDegreeId\n        }\n    }\n":
    types.UpdateClassDocument,
  "\n    mutation DeleteClass($input: deleteClassInput!) {\n        deleteClass(input: $input) {\n            id\n        }\n    }\n":
    types.DeleteClassDocument,
  "\n    mutation CreateClassSchedule($input: createClassScheduleInput!) {\n        createClassSchedule(input: $input) {\n            id\n            userId\n            semesterId\n        }\n    }\n":
    types.CreateClassScheduleDocument,
  "\n    mutation UpdateClassSchedule($input: updateClassScheduleInput!) {\n        updateClassSchedule(input: $input) {\n            id\n            semesterId\n        }\n    }\n":
    types.UpdateClassScheduleDocument,
  "\n    mutation DeleteClassSchedule($id: Int!) {\n        deleteClassSchedule(id: $id) {\n            id\n        }\n    }\n":
    types.DeleteClassScheduleDocument,
  "\n    mutation AddClassToClassSchedule($input: addClassToScheduleInput!) {\n        addClassToClassSchedule(input: $input) {\n            id\n            classScheduleId\n            classId\n            class {\n                id\n                classCode\n                title\n                credits\n                dayOfWeek\n                startTime\n                endTime\n                color\n                professor\n            }\n        }\n    }\n":
    types.AddClassToClassScheduleDocument,
  "\n    mutation RemoveClassFromClassSchedule($input: removeClassFromScheduleInput!) {\n        removeClassFromClassSchedule(input: $input) {\n            id\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n":
    types.RemoveClassFromClassScheduleDocument,
  "\n    mutation CreateDegreePlanner($input: createDegreePlannerInput!) {\n        createDegreePlanner(input: $input) {\n            id\n            title\n            userId\n            degreeId\n            semester {\n                id\n                name\n                credits\n                degreeId\n                plannerId\n            }\n        }\n    }\n":
    types.CreateDegreePlannerDocument,
  "\n    mutation ResetDegreePlanner($input: resetDegreePlannerInput!) {\n        resetDegreePlanner(input: $input) {\n            id\n            title\n            userId\n            degreeId\n        }\n    }\n":
    types.ResetDegreePlannerDocument,
  "\n    mutation DeleteDegreePlanner($id: Int!) {\n        deleteDegreePlanner(id: $id) {\n            id\n        }\n    }\n":
    types.DeleteDegreePlannerDocument,
  "\n    mutation CreateSemester($input: createSemesterInput!) {\n        createSemester(input: $input) {\n            id\n            name\n            credits\n            degreeId\n            plannerId\n            entries {\n                id\n                classId\n                class {\n                    id\n                    classCode\n                    title\n                    credits\n                }\n            }\n        }\n    }\n":
    types.CreateSemesterDocument,
  "\n    mutation UpdateSemester($input: updateSemesterInput!) {\n        updateSemester(input: $input) {\n            id\n            name\n            credits\n            entries {\n                id\n                classId\n                class {\n                    id\n                    classCode\n                    title\n                    credits\n                }\n            }\n        }\n    }\n":
    types.UpdateSemesterDocument,
  "\n    mutation DeleteSemester($id: Int!) {\n        deleteSemester(id: $id) {\n            id\n        }\n    }\n":
    types.DeleteSemesterDocument,
  "\n    mutation AddClassToSemester($input: addClassToSemesterInput!) {\n        addClassTosemester(input: $input) {\n            id\n            semesterId\n            classId\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n":
    types.AddClassToSemesterDocument,
  "\n    mutation RemoveClassFromSemester($input: removeClassFromSemesterInput!) {\n        removeClassFromSemester(input: $input) {\n            id\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n":
    types.RemoveClassFromSemesterDocument,
  "\n    mutation CreateDegree($input: createDegreeInput!) {\n        createDegree(input: $input) {\n            id\n            name\n            coreCategories\n            electiveCategories\n            numberOfCores\n            numberOfElectives\n        }\n    }\n":
    types.CreateDegreeDocument,
  "\n    mutation UpdateDegree($input: updateDegreeInput!) {\n        updateDegree(input: $input) {\n            id\n            name\n            coreCategories\n            electiveCategories\n            numberOfCores\n            numberOfElectives\n        }\n    }\n":
    types.UpdateDegreeDocument,
  "\n    mutation DeleteDegree($input: deleteDegreeInput!) {\n        deleteDegree(input: $input) {\n            id\n        }\n    }\n":
    types.DeleteDegreeDocument,
  "\n    mutation CreateDegreeRequirements($degreeId: Int!) {\n        createDegreeRequirements(degreeId: $degreeId)\n    }\n":
    types.CreateDegreeRequirementsDocument,
  "\n    mutation CreateTask($input: createTaskInput!) {\n        createTask(input: $input) {\n            id\n            userId\n            dueDate\n            stageId\n            classCode\n            description\n            title\n        }\n    }\n":
    types.CreateTaskDocument,
  "\n    mutation UpdateTask($input: updateTaskInput!) {\n        updateTask(input: $input) {\n            id\n            title\n            dueDate\n            stageId\n            classCode\n            description\n        }\n    }\n":
    types.UpdateTaskDocument,
  "\n    mutation DeleteTask($input: deleteTaskInput!) {\n        deleteTask(input: $input) {\n            id\n        }\n    }\n":
    types.DeleteTaskDocument,
  "\n    mutation CreateRequirement($data: CreateRequirementInput!) {\n        createRequirement(data: $data) {\n            id\n            category\n            isElective\n            classIds\n            degreeId\n        }\n    }\n":
    types.CreateRequirementDocument,
  "\n    mutation UpdateRequirement($data: UpdateRequirementInput!) {\n        updateRequirement(data: $data) {\n            id\n            category\n            isElective\n            classIds\n            degreeId\n        }\n    }\n":
    types.UpdateRequirementDocument,
  "\n    mutation MarkQuestionnaireCompleted($userId: String!, $isQuestionnaireCompleted: Boolean) {\n        updateUserProfile(id: $userId, questionnaireCompleted: $isQuestionnaireCompleted) {\n            id\n            isQuestionnaireCompleted\n        }\n    }\n":
    types.MarkQuestionnaireCompletedDocument,
  "\n  query GetUser($id: String!) {\n    getUser(id: $id) {\n      id\n      email\n      university\n      isPremium\n      yearInUniversity\n      graduationSemesterName\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n      degreeId\n      takenClassIds\n      degree {\n        id\n        name\n        coreCategories\n        electiveCategories\n        numberOfCores\n        numberOfElectives\n      }\n    }\n  }\n":
    types.GetUserDocument,
  "\n  query ClassTaken($input: classTakenInput!) {\n    classTaken(input: $input) {\n      classId\n      taken\n    }\n  }\n":
    types.ClassTakenDocument,
  "\n  query GetGraduationSemester($id: String!) {\n    getGraduationSemester(id: $id)\n  }\n":
    types.GetGraduationSemesterDocument,
  "\n  query GetPremiumStatus($id: String!) {\n    getPremiumStatus(id: $id)\n  }\n":
    types.GetPremiumStatusDocument,
  "\n  query GetClasses {\n    getClasses {\n      id\n      classCode\n      credits\n      courseType\n      title\n      description\n      category\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n      electiveDegreeId\n    }\n  }\n":
    types.GetClassesDocument,
  "\n  query GetClass($id: Int!) {\n    getClass(id: $id) {\n      id\n      classCode\n      credits\n      courseType\n      title\n      description\n      category\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n      electiveDegreeId\n    }\n  }\n":
    types.GetClassDocument,
  "\n  query GetClassSchedules($userId: String!) {\n    getclassSchedules(userId: $userId) {\n      id\n      userId\n      semesterId\n      entries {\n        id\n        classScheduleId\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n          dayOfWeek\n          startTime\n          endTime\n          color\n          professor\n        }\n      }\n    }\n  }\n":
    types.GetClassSchedulesDocument,
  "\n  query GetClassScheduleEntries($classScheduleId: Int!) {\n    getClassScheduleEntries(classScheduleId: $classScheduleId) {\n      id\n      classScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n        credits\n        dayOfWeek\n        startTime\n        endTime\n        color\n        professor\n      }\n    }\n  }\n":
    types.GetClassScheduleEntriesDocument,
  "\n  query GetDegreePlanners($userId: String!) {\n    getdegreePlanners(userId: $userId) {\n      id\n      title\n      userId\n      degreeId\n      semester {\n        id\n        name\n        credits\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n            credits\n          }\n        }\n      }\n    }\n  }\n":
    types.GetDegreePlannersDocument,
  "\n  query GetSemesters($plannerId: Int!) {\n    getsemesters(plannerId: $plannerId) {\n      id\n      name\n      credits\n      degreeId\n      plannerId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n        }\n      }\n    }\n  }\n":
    types.GetSemestersDocument,
  "\n  query GetSemester($id: Int!) {\n    getSemester(id: $id) {\n      id\n      name\n      credits\n      degreeId\n      plannerId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n        }\n      }\n    }\n  }\n":
    types.GetSemesterDocument,
  "\n  query GetAllDegrees {\n    getAlldegrees {\n      id\n      name\n      coreCategories\n      electiveCategories\n      numberOfCores\n      numberOfElectives\n    }\n  }\n":
    types.GetAllDegreesDocument,
  "\n  query GetDegree($userId: String!) {\n    getDegree(userId: $userId) {\n      id\n      name\n      coreCategories\n      electiveCategories\n      numberOfCores\n      numberOfElectives\n    }\n  }\n":
    types.GetDegreeDocument,
  "\n  query GetTasks($userId: String!) {\n    getTasks(userId: $userId) {\n      id\n      userId\n      dueDate\n      stageId\n      classCode\n      description\n      title\n    }\n  }\n":
    types.GetTasksDocument,
  "\n  query GetRequirement($category: String!, $degreeId: Int!) {\n    getRequirement(category: $category, degreeId: $degreeId) {\n      id\n      category\n      isElective\n      classIds\n      degreeId\n    }\n  }\n":
    types.GetRequirementDocument,
  "\n  query GetRequirements($degreeId: Int!) {\n    getRequirements(degreeId: $degreeId) {\n      id\n      category\n      isElective\n      classIds\n      degreeId\n    }\n  }\n":
    types.GetRequirementsDocument,
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
  source: "\n    mutation Register($input: RegisterInput!) {\n        register(input: $input)\n    }\n"
): (typeof documents)["\n    mutation Register($input: RegisterInput!) {\n        register(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation Login($input: LoginInput!) {\n        login(input: $input)\n    }\n"
): (typeof documents)["\n    mutation Login($input: LoginInput!) {\n        login(input: $input)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation Logout {\n        logout\n    }\n"
): (typeof documents)["\n    mutation Logout {\n        logout\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateUserProfile($id: String!, $university: String!, $yearInUniversity: Int!, $degreeId: Int!) {\n        updateUserProfile(id: $id, university: $university, yearInUniversity: $yearInUniversity, degreeId: $degreeId) {\n            id\n            university\n            yearInUniversity\n            degreeId\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateUserProfile($id: String!, $university: String!, $yearInUniversity: Int!, $degreeId: Int!) {\n        updateUserProfile(id: $id, university: $university, yearInUniversity: $yearInUniversity, degreeId: $degreeId) {\n            id\n            university\n            yearInUniversity\n            degreeId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float, $takenClassIds: [Int]) {\n        updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage, takenClassIds: $takenClassIds) {\n            id\n            gpa\n            attendancePercentage\n            assignmentCompletionPercentage\n            takenClassIds\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float, $takenClassIds: [Int]) {\n        updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage, takenClassIds: $takenClassIds) {\n            id\n            gpa\n            attendancePercentage\n            assignmentCompletionPercentage\n            takenClassIds\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation SetUserGraduationSemester($input: graduationSemesterInput!) {\n        setUserGraduationSemester(input: $input) {\n            id\n            graduationSemesterName\n        }\n    }\n"
): (typeof documents)["\n    mutation SetUserGraduationSemester($input: graduationSemesterInput!) {\n        setUserGraduationSemester(input: $input) {\n            id\n            graduationSemesterName\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdatePremiumStatus($id: String!, $isPremium: Boolean!) {\n        updatePremiumStatus(id: $id, isPremium: $isPremium) {\n            id\n            isPremium\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdatePremiumStatus($id: String!, $isPremium: Boolean!) {\n        updatePremiumStatus(id: $id, isPremium: $isPremium) {\n            id\n            isPremium\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateClass($input: CreateClassInput!) {\n        createClass(input: $input) {\n            id\n            classCode\n            credits\n            courseType\n            title\n            description\n            category\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n            rateMyProfessorRating\n            coreDegreeId\n            electiveDegreeId\n        }\n    }\n"
): (typeof documents)["\n    mutation CreateClass($input: CreateClassInput!) {\n        createClass(input: $input) {\n            id\n            classCode\n            credits\n            courseType\n            title\n            description\n            category\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n            rateMyProfessorRating\n            coreDegreeId\n            electiveDegreeId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateClass($input: UpdateClassInput!) {\n        updateClass(input: $input) {\n            id\n            classCode\n            credits\n            courseType\n            title\n            description\n            category\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n            rateMyProfessorRating\n            coreDegreeId\n            electiveDegreeId\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateClass($input: UpdateClassInput!) {\n        updateClass(input: $input) {\n            id\n            classCode\n            credits\n            courseType\n            title\n            description\n            category\n            dayOfWeek\n            startTime\n            endTime\n            color\n            professor\n            rateMyProfessorRating\n            coreDegreeId\n            electiveDegreeId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation DeleteClass($input: deleteClassInput!) {\n        deleteClass(input: $input) {\n            id\n        }\n    }\n"
): (typeof documents)["\n    mutation DeleteClass($input: deleteClassInput!) {\n        deleteClass(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateClassSchedule($input: createClassScheduleInput!) {\n        createClassSchedule(input: $input) {\n            id\n            userId\n            semesterId\n        }\n    }\n"
): (typeof documents)["\n    mutation CreateClassSchedule($input: createClassScheduleInput!) {\n        createClassSchedule(input: $input) {\n            id\n            userId\n            semesterId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateClassSchedule($input: updateClassScheduleInput!) {\n        updateClassSchedule(input: $input) {\n            id\n            semesterId\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateClassSchedule($input: updateClassScheduleInput!) {\n        updateClassSchedule(input: $input) {\n            id\n            semesterId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation DeleteClassSchedule($id: Int!) {\n        deleteClassSchedule(id: $id) {\n            id\n        }\n    }\n"
): (typeof documents)["\n    mutation DeleteClassSchedule($id: Int!) {\n        deleteClassSchedule(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation AddClassToClassSchedule($input: addClassToScheduleInput!) {\n        addClassToClassSchedule(input: $input) {\n            id\n            classScheduleId\n            classId\n            class {\n                id\n                classCode\n                title\n                credits\n                dayOfWeek\n                startTime\n                endTime\n                color\n                professor\n            }\n        }\n    }\n"
): (typeof documents)["\n    mutation AddClassToClassSchedule($input: addClassToScheduleInput!) {\n        addClassToClassSchedule(input: $input) {\n            id\n            classScheduleId\n            classId\n            class {\n                id\n                classCode\n                title\n                credits\n                dayOfWeek\n                startTime\n                endTime\n                color\n                professor\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation RemoveClassFromClassSchedule($input: removeClassFromScheduleInput!) {\n        removeClassFromClassSchedule(input: $input) {\n            id\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n"
): (typeof documents)["\n    mutation RemoveClassFromClassSchedule($input: removeClassFromScheduleInput!) {\n        removeClassFromClassSchedule(input: $input) {\n            id\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateDegreePlanner($input: createDegreePlannerInput!) {\n        createDegreePlanner(input: $input) {\n            id\n            title\n            userId\n            degreeId\n            semester {\n                id\n                name\n                credits\n                degreeId\n                plannerId\n            }\n        }\n    }\n"
): (typeof documents)["\n    mutation CreateDegreePlanner($input: createDegreePlannerInput!) {\n        createDegreePlanner(input: $input) {\n            id\n            title\n            userId\n            degreeId\n            semester {\n                id\n                name\n                credits\n                degreeId\n                plannerId\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation ResetDegreePlanner($input: resetDegreePlannerInput!) {\n        resetDegreePlanner(input: $input) {\n            id\n            title\n            userId\n            degreeId\n        }\n    }\n"
): (typeof documents)["\n    mutation ResetDegreePlanner($input: resetDegreePlannerInput!) {\n        resetDegreePlanner(input: $input) {\n            id\n            title\n            userId\n            degreeId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation DeleteDegreePlanner($id: Int!) {\n        deleteDegreePlanner(id: $id) {\n            id\n        }\n    }\n"
): (typeof documents)["\n    mutation DeleteDegreePlanner($id: Int!) {\n        deleteDegreePlanner(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateSemester($input: createSemesterInput!) {\n        createSemester(input: $input) {\n            id\n            name\n            credits\n            degreeId\n            plannerId\n            entries {\n                id\n                classId\n                class {\n                    id\n                    classCode\n                    title\n                    credits\n                }\n            }\n        }\n    }\n"
): (typeof documents)["\n    mutation CreateSemester($input: createSemesterInput!) {\n        createSemester(input: $input) {\n            id\n            name\n            credits\n            degreeId\n            plannerId\n            entries {\n                id\n                classId\n                class {\n                    id\n                    classCode\n                    title\n                    credits\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateSemester($input: updateSemesterInput!) {\n        updateSemester(input: $input) {\n            id\n            name\n            credits\n            entries {\n                id\n                classId\n                class {\n                    id\n                    classCode\n                    title\n                    credits\n                }\n            }\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateSemester($input: updateSemesterInput!) {\n        updateSemester(input: $input) {\n            id\n            name\n            credits\n            entries {\n                id\n                classId\n                class {\n                    id\n                    classCode\n                    title\n                    credits\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation DeleteSemester($id: Int!) {\n        deleteSemester(id: $id) {\n            id\n        }\n    }\n"
): (typeof documents)["\n    mutation DeleteSemester($id: Int!) {\n        deleteSemester(id: $id) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation AddClassToSemester($input: addClassToSemesterInput!) {\n        addClassTosemester(input: $input) {\n            id\n            semesterId\n            classId\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n"
): (typeof documents)["\n    mutation AddClassToSemester($input: addClassToSemesterInput!) {\n        addClassTosemester(input: $input) {\n            id\n            semesterId\n            classId\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation RemoveClassFromSemester($input: removeClassFromSemesterInput!) {\n        removeClassFromSemester(input: $input) {\n            id\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n"
): (typeof documents)["\n    mutation RemoveClassFromSemester($input: removeClassFromSemesterInput!) {\n        removeClassFromSemester(input: $input) {\n            id\n            class {\n                id\n                classCode\n                title\n                credits\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateDegree($input: createDegreeInput!) {\n        createDegree(input: $input) {\n            id\n            name\n            coreCategories\n            electiveCategories\n            numberOfCores\n            numberOfElectives\n        }\n    }\n"
): (typeof documents)["\n    mutation CreateDegree($input: createDegreeInput!) {\n        createDegree(input: $input) {\n            id\n            name\n            coreCategories\n            electiveCategories\n            numberOfCores\n            numberOfElectives\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateDegree($input: updateDegreeInput!) {\n        updateDegree(input: $input) {\n            id\n            name\n            coreCategories\n            electiveCategories\n            numberOfCores\n            numberOfElectives\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateDegree($input: updateDegreeInput!) {\n        updateDegree(input: $input) {\n            id\n            name\n            coreCategories\n            electiveCategories\n            numberOfCores\n            numberOfElectives\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation DeleteDegree($input: deleteDegreeInput!) {\n        deleteDegree(input: $input) {\n            id\n        }\n    }\n"
): (typeof documents)["\n    mutation DeleteDegree($input: deleteDegreeInput!) {\n        deleteDegree(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateDegreeRequirements($degreeId: Int!) {\n        createDegreeRequirements(degreeId: $degreeId)\n    }\n"
): (typeof documents)["\n    mutation CreateDegreeRequirements($degreeId: Int!) {\n        createDegreeRequirements(degreeId: $degreeId)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateTask($input: createTaskInput!) {\n        createTask(input: $input) {\n            id\n            userId\n            dueDate\n            stageId\n            classCode\n            description\n            title\n        }\n    }\n"
): (typeof documents)["\n    mutation CreateTask($input: createTaskInput!) {\n        createTask(input: $input) {\n            id\n            userId\n            dueDate\n            stageId\n            classCode\n            description\n            title\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateTask($input: updateTaskInput!) {\n        updateTask(input: $input) {\n            id\n            title\n            dueDate\n            stageId\n            classCode\n            description\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateTask($input: updateTaskInput!) {\n        updateTask(input: $input) {\n            id\n            title\n            dueDate\n            stageId\n            classCode\n            description\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation DeleteTask($input: deleteTaskInput!) {\n        deleteTask(input: $input) {\n            id\n        }\n    }\n"
): (typeof documents)["\n    mutation DeleteTask($input: deleteTaskInput!) {\n        deleteTask(input: $input) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation CreateRequirement($data: CreateRequirementInput!) {\n        createRequirement(data: $data) {\n            id\n            category\n            isElective\n            classIds\n            degreeId\n        }\n    }\n"
): (typeof documents)["\n    mutation CreateRequirement($data: CreateRequirementInput!) {\n        createRequirement(data: $data) {\n            id\n            category\n            isElective\n            classIds\n            degreeId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation UpdateRequirement($data: UpdateRequirementInput!) {\n        updateRequirement(data: $data) {\n            id\n            category\n            isElective\n            classIds\n            degreeId\n        }\n    }\n"
): (typeof documents)["\n    mutation UpdateRequirement($data: UpdateRequirementInput!) {\n        updateRequirement(data: $data) {\n            id\n            category\n            isElective\n            classIds\n            degreeId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    mutation MarkQuestionnaireCompleted($userId: String!, $isQuestionnaireCompleted: Boolean) {\n        updateUserProfile(id: $userId, questionnaireCompleted: $isQuestionnaireCompleted) {\n            id\n            isQuestionnaireCompleted\n        }\n    }\n"
): (typeof documents)["\n    mutation MarkQuestionnaireCompleted($userId: String!, $isQuestionnaireCompleted: Boolean) {\n        updateUserProfile(id: $userId, questionnaireCompleted: $isQuestionnaireCompleted) {\n            id\n            isQuestionnaireCompleted\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetUser($id: String!) {\n    getUser(id: $id) {\n      id\n      email\n      university\n      isPremium\n      yearInUniversity\n      graduationSemesterName\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n      degreeId\n      takenClassIds\n      degree {\n        id\n        name\n        coreCategories\n        electiveCategories\n        numberOfCores\n        numberOfElectives\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetUser($id: String!) {\n    getUser(id: $id) {\n      id\n      email\n      university\n      isPremium\n      yearInUniversity\n      graduationSemesterName\n      gpa\n      attendancePercentage\n      assignmentCompletionPercentage\n      degreeId\n      takenClassIds\n      degree {\n        id\n        name\n        coreCategories\n        electiveCategories\n        numberOfCores\n        numberOfElectives\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ClassTaken($input: classTakenInput!) {\n    classTaken(input: $input) {\n      classId\n      taken\n    }\n  }\n"
): (typeof documents)["\n  query ClassTaken($input: classTakenInput!) {\n    classTaken(input: $input) {\n      classId\n      taken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetGraduationSemester($id: String!) {\n    getGraduationSemester(id: $id)\n  }\n"
): (typeof documents)["\n  query GetGraduationSemester($id: String!) {\n    getGraduationSemester(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetPremiumStatus($id: String!) {\n    getPremiumStatus(id: $id)\n  }\n"
): (typeof documents)["\n  query GetPremiumStatus($id: String!) {\n    getPremiumStatus(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClasses {\n    getClasses {\n      id\n      classCode\n      credits\n      courseType\n      title\n      description\n      category\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n      electiveDegreeId\n    }\n  }\n"
): (typeof documents)["\n  query GetClasses {\n    getClasses {\n      id\n      classCode\n      credits\n      courseType\n      title\n      description\n      category\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n      electiveDegreeId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClass($id: Int!) {\n    getClass(id: $id) {\n      id\n      classCode\n      credits\n      courseType\n      title\n      description\n      category\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n      electiveDegreeId\n    }\n  }\n"
): (typeof documents)["\n  query GetClass($id: Int!) {\n    getClass(id: $id) {\n      id\n      classCode\n      credits\n      courseType\n      title\n      description\n      category\n      dayOfWeek\n      startTime\n      endTime\n      color\n      professor\n      rateMyProfessorRating\n      coreDegreeId\n      electiveDegreeId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClassSchedules($userId: String!) {\n    getclassSchedules(userId: $userId) {\n      id\n      userId\n      semesterId\n      entries {\n        id\n        classScheduleId\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n          dayOfWeek\n          startTime\n          endTime\n          color\n          professor\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetClassSchedules($userId: String!) {\n    getclassSchedules(userId: $userId) {\n      id\n      userId\n      semesterId\n      entries {\n        id\n        classScheduleId\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n          dayOfWeek\n          startTime\n          endTime\n          color\n          professor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetClassScheduleEntries($classScheduleId: Int!) {\n    getClassScheduleEntries(classScheduleId: $classScheduleId) {\n      id\n      classScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n        credits\n        dayOfWeek\n        startTime\n        endTime\n        color\n        professor\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetClassScheduleEntries($classScheduleId: Int!) {\n    getClassScheduleEntries(classScheduleId: $classScheduleId) {\n      id\n      classScheduleId\n      classId\n      class {\n        id\n        classCode\n        title\n        credits\n        dayOfWeek\n        startTime\n        endTime\n        color\n        professor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetDegreePlanners($userId: String!) {\n    getdegreePlanners(userId: $userId) {\n      id\n      title\n      userId\n      degreeId\n      semester {\n        id\n        name\n        credits\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n            credits\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetDegreePlanners($userId: String!) {\n    getdegreePlanners(userId: $userId) {\n      id\n      title\n      userId\n      degreeId\n      semester {\n        id\n        name\n        credits\n        entries {\n          id\n          classId\n          class {\n            id\n            classCode\n            title\n            credits\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetSemesters($plannerId: Int!) {\n    getsemesters(plannerId: $plannerId) {\n      id\n      name\n      credits\n      degreeId\n      plannerId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetSemesters($plannerId: Int!) {\n    getsemesters(plannerId: $plannerId) {\n      id\n      name\n      credits\n      degreeId\n      plannerId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetSemester($id: Int!) {\n    getSemester(id: $id) {\n      id\n      name\n      credits\n      degreeId\n      plannerId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetSemester($id: Int!) {\n    getSemester(id: $id) {\n      id\n      name\n      credits\n      degreeId\n      plannerId\n      entries {\n        id\n        classId\n        class {\n          id\n          classCode\n          credits\n          title\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetAllDegrees {\n    getAlldegrees {\n      id\n      name\n      coreCategories\n      electiveCategories\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"
): (typeof documents)["\n  query GetAllDegrees {\n    getAlldegrees {\n      id\n      name\n      coreCategories\n      electiveCategories\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetDegree($userId: String!) {\n    getDegree(userId: $userId) {\n      id\n      name\n      coreCategories\n      electiveCategories\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"
): (typeof documents)["\n  query GetDegree($userId: String!) {\n    getDegree(userId: $userId) {\n      id\n      name\n      coreCategories\n      electiveCategories\n      numberOfCores\n      numberOfElectives\n    }\n  }\n"];
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
  source: "\n  query GetRequirement($category: String!, $degreeId: Int!) {\n    getRequirement(category: $category, degreeId: $degreeId) {\n      id\n      category\n      isElective\n      classIds\n      degreeId\n    }\n  }\n"
): (typeof documents)["\n  query GetRequirement($category: String!, $degreeId: Int!) {\n    getRequirement(category: $category, degreeId: $degreeId) {\n      id\n      category\n      isElective\n      classIds\n      degreeId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetRequirements($degreeId: Int!) {\n    getRequirements(degreeId: $degreeId) {\n      id\n      category\n      isElective\n      classIds\n      degreeId\n    }\n  }\n"
): (typeof documents)["\n  query GetRequirements($degreeId: Int!) {\n    getRequirements(degreeId: $degreeId) {\n      id\n      category\n      isElective\n      classIds\n      degreeId\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
