import useSWR from 'swr';
import Router from 'next/router';
import { useEffect } from 'react';
import { User } from '../../shared/types/User';

type useUser = { user: User; loading: boolean; mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any> };

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useUser(options?: { redirectTo: string; redirectIfFound?: boolean }): useUser {
    const { data, error, mutate } = useSWR('/api/auth/user', fetcher);
    const loading: boolean = !data;
    const user: User = error ? undefined : data?.error ? undefined : data;

    if (options) {
        useEffect(() => {
            if (!options.redirectTo || loading) return;
            if (options.redirectIfFound && user) Router.push(options.redirectTo);
        }, [options.redirectTo, options.redirectIfFound, loading, user]);
    }

    return { user, loading, mutate };
}
