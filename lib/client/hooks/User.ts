import useSWR from 'swr';
import Router from 'next/router';
import { useEffect } from 'react';

type User = { username: string };

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useUser(options?: {
    redirectTo: string;
    redirectIfFound?: boolean;
}): [User, boolean, (data?: any, shouldRevalidate?: boolean) => Promise<any>] {
    const { data, error, mutate } = useSWR('/api/auth/user', fetcher);
    const loading: boolean = !data;
    const userData: User = error ? undefined : data?.error ? undefined : data;

    if (options) {
        useEffect(() => {
            if (!options.redirectTo || loading) return;
            if (options.redirectIfFound && userData) Router.push(options.redirectTo);
        }, [options.redirectTo, options.redirectIfFound, loading, userData]);
    }

    return [userData, loading, mutate];
}
