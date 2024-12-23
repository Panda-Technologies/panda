import gql from 'graphql-tag';


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
    mutation UpdateUserAcademicInfo($id: String!, $gpa: Float, $attendancePercentage: Float, $assignmentCompletionPercentage: Float, $takenClassIds: [Int]) {
        updateUserAcademicInfo(id: $id, gpa: $gpa, attendancePercentage: $attendancePercentage, assignmentCompletionPercentage: $assignmentCompletionPercentage, takenClassIds: $takenClassIds) {
            id
            gpa
            attendancePercentage
            assignmentCompletionPercentage
            takenClassIds
        }
    }
`;

export const SET_USER_GRADUATION_SEMESTER_MUTATION = gql`
    mutation SetUserGraduationSemester($input: graduationSemesterInput!) {
        setUserGraduationSemester(input: $input) {
            id
            graduationSemesterName
        }
    }
`;

export const UPDATE_PREMIUM_STATUS_MUTATION = gql`
    mutation UpdatePremiumStatus($id: String!, $isPremium: Boolean!) {
        updatePremiumStatus(id: $id, isPremium: $isPremium) {
            id
            isPremium
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
            description
            category
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
            description
            category
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
    mutation DeleteClass($input: deleteClassInput!) {
        deleteClass(input: $input) {
            id
        }
    }
`;

export const CREATE_CLASS_SCHEDULE_MUTATION = gql`
    mutation CreateClassSchedule($input: createClassScheduleInput!) {
        createClassSchedule(input: $input) {
            id
            title
            semesterId
            entries {
                id
                classScheduleId
                classId
                sectionId
                class {
                    id
                    classCode
                    credits
                    courseType
                    title
                    description
                    category
                    sections {
                        id
                        section
                        classId
                        dayOfWeek
                        startTime
                        endTime
                        professor
                        rateMyProfessorRating
                    }
                    color
                }
            }
        }
    }
`;

export const UPDATE_CLASS_SCHEDULE_MUTATION = gql`
    mutation UpdateClassSchedule($input: updateClassScheduleInput!) {
        updateClassSchedule(input: $input) {
            id
            semesterId
        }
    }
`;

export const DELETE_CLASS_SCHEDULE_MUTATION = gql`
    mutation DeleteClassSchedule($id: Int!) {
        deleteClassSchedule(id: $id) {
            id
        }
    }
`;

export const RESET_CLASS_SCHEDULE_MUTATION = gql`
    mutation ResetClassSchedule($input: resetClassScheduleInput!) {
        resetClassSchedule(input: $input) {
            id
        }
    }
`;

export const ADD_CLASS_TO_CLASS_SCHEDULE_MUTATION = gql`
    mutation AddClassToClassSchedule($input: addClassToScheduleInput!) {
        addClassToClassSchedule(input: $input) {
            id
            classScheduleId
            sectionId
            class {
                id
                classCode
                credits
                courseType
                title
                description
                category
                sections {
                    id
                    section
                    classId
                    dayOfWeek
                    startTime
                    endTime
                    professor
                    rateMyProfessorRating
                }
                color
            }
        }
    }
`;

export const REMOVE_CLASS_FROM_CLASS_SCHEDULE_MUTATION = gql`
    mutation RemoveClassFromClassSchedule($input: removeClassFromScheduleInput!) {
        removeClassFromClassSchedule(input: $input) {
            id
        }
    }
`;

export const CREATE_DEGREE_PLANNER_MUTATION = gql`
    mutation CreateDegreePlanner($input: createDegreePlannerInput!) {
        createDegreePlanner(input: $input) {
            id
            title
            userId
            degreeId
            semester {
                id
                name
                credits
                degreeId
                plannerId
            }
        }
    }
`;

export const RESET_DEGREE_PLANNER_MUTATION = gql`
    mutation ResetDegreePlanner($input: resetDegreePlannerInput!) {
        resetDegreePlanner(input: $input) {
            id
            title
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

export const CREATE_SEMESTER_MUTATION = gql`
    mutation CreateSemester($input: createSemesterInput!) {
        createSemester(input: $input) {
            id
            name
            credits
            degreeId
            plannerId
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
`;

export const UPDATE_SEMESTER_MUTATION = gql`
    mutation UpdateSemester($input: updateSemesterInput!) {
        updateSemester(input: $input) {
            id
            name
            credits
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
`;

export const DELETE_SEMESTER_MUTATION = gql`
    mutation DeleteSemester($id: Int!) {
        deleteSemester(id: $id) {
            id
        }
    }
`;

export const ADD_CLASS_TO_SEMESTER_MUTATION = gql`
    mutation AddClassToSemester($input: addClassToSemesterInput!) {
        addClassTosemester(input: $input) {
            id
            semesterId
            classId
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
    mutation RemoveClassFromSemester($input: removeClassFromSemesterInput!) {
        removeClassFromSemester(input: $input) {
            id
            class {
                id
                classCode
                title
                credits
            }
        }
    }
`;

export const CREATE_DEGREE_MUTATION = gql`
    mutation CreateDegree($input: createDegreeInput!) {
        createDegree(input: $input) {
            id
            name
            coreCategories
            electiveCategories
            numberOfCores
            numberOfElectives
        }
    }
`;

export const UPDATE_DEGREE_MUTATION = gql`
    mutation UpdateDegree($input: updateDegreeInput!) {
        updateDegree(input: $input) {
            id
            name
            coreCategories
            electiveCategories
            numberOfCores
            numberOfElectives
        }
    }
`;

export const DELETE_DEGREE_MUTATION = gql`
    mutation DeleteDegree($input: deleteDegreeInput!) {
        deleteDegree(input: $input) {
            id
        }
    }
`;

export const CREATE_DEGREE_REQUIREMENTS_MUTATION = gql`
    mutation CreateDegreeRequirements($degreeId: Int!) {
        createDegreeRequirements(degreeId: $degreeId)
    }
`;

export const CREATE_TASK_MUTATION = gql`
    mutation CreateTask($input: createTaskInput!) {
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
    mutation UpdateTask($input: updateTaskInput!) {
        updateTask(input: $input) {
            id
            title
            dueDate
            stageId
            classCode
            description
        }
    }
`;

export const DELETE_TASK_MUTATION = gql`
    mutation DeleteTask($input: deleteTaskInput!) {
        deleteTask(input: $input) {
            id
        }
    }
`;

export const CREATE_REQUIREMENT_MUTATION = gql`
    mutation CreateRequirement($data: CreateRequirementInput!) {
        createRequirement(data: $data) {
            id
            category
            isElective
            classIds
            degreeId
        }
    }
`;

export const UPDATE_REQUIREMENT_MUTATION = gql`
    mutation UpdateRequirement($data: UpdateRequirementInput!) {
        updateRequirement(data: $data) {
            id
            category
            isElective
            classIds
            degreeId
        }
    }
`;

export const MARK_QUESTIONNAIRE_COMPLETED = gql`
    mutation MarkQuestionnaireCompleted($userId: String!, $isQuestionnaireCompleted: Boolean) {
        updateUserProfile(id: $userId, questionnaireCompleted: $isQuestionnaireCompleted) {
            id
            isQuestionnaireCompleted
        }
    }
`;