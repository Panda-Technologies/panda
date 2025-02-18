// Fetch courses
import {useList} from "@refinedev/core";
import {GET_CLASSES_QUERY} from "@graphql/queries";
import {Class} from "@graphql/generated/graphql";
import {useCallback, useMemo} from "react";
import {useQuery} from "@apollo/client";

const CourseFetch = () => {
    const { data: coursesData, loading: coursesLoading, error: coursesError } = useQuery<{ getClasses: Class[] }>(GET_CLASSES_QUERY, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-only",
    })

    // Memoize courses map
    const coursesMap = useMemo(() => {
        const map = new Map<number, Class>();
        coursesData?.getClasses?.forEach((course) => {
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