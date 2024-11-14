// Fetch courses
import {useList} from "@refinedev/core";
import {GET_CLASSES_QUERY} from "@graphql/queries";
import {Class} from "@graphql/generated/graphql";
import {useCallback, useMemo} from "react";

const CourseFetch = () => {
    const {
        data: coursesData,
        isLoading: coursesLoading,
        error: coursesError,
    } = useList<Class>({
        resource: "classes",
        meta: {
            gqlQuery: GET_CLASSES_QUERY,
        },
    });

// Memoize courses map
    const coursesMap = useMemo(() => {
        const map = new Map<number, Class>();
        coursesData?.data?.forEach((course) => {
            if (course) map.set(course.id, course);
        });
        return map;
    }, [coursesData]);

    const courseArray = useMemo(() => {
        return Object.values(coursesMap);
    }, [coursesMap]);

// Get course function
    const getCourse = useCallback(
        (classId: number) => coursesMap.get(classId),
        [coursesMap]
    );

    return { getCourse, coursesData, coursesLoading, coursesError, courseArray };
};

export default CourseFetch;