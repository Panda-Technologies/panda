import {BaseRecord, useCustom} from "@refinedev/core";
import { message } from "antd";
import { useEffect } from "react";
import {DocumentNode} from "graphql";

interface FetchHookResult<T> {
    data: T | undefined;
    isLoading: boolean;
    error: any;
}

const useDataFetch = <T extends BaseRecord>(
    gqlQuery: DocumentNode,
    variables: Record<string, any>,
    resourceName: string
): FetchHookResult<T> => {
    const { data, isLoading, error } = useCustom<T>({
        url: "",
        method: "get",
        meta: {
            gqlQuery,
            variables,
        },
        queryOptions: {
            enabled: Object.values(variables).every(Boolean),
        },
    });

    useEffect(() => {
        if (error) {
            console.error(`Error fetching ${resourceName}:`, error);
            message.error(`Failed to fetch ${resourceName}. Please try again later.`);
        }
    }, [error, resourceName]);

    return { data: data?.data, isLoading, error };
};

export default useDataFetch;