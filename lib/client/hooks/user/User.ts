import useSWR from 'swr';
import Router from 'next/router';
import { useEffect } from 'react';
import { UserPayload, UserHook } from '../../../shared/types/User';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useUser(options?: { redirectTo: string; redirectIfFound?: boolean; redirectIfNotFound?: boolean }): UserHook {
    const { data, error, mutate } = useSWR('/api/auth/user', fetcher);
    const loading = !data;
    const user = error ? undefined : data?.error ? undefined : data;

    if (options) {
        useEffect(() => {
            if (!options.redirectTo || loading) return;
            if (options.redirectIfFound && user) Router.push(options.redirectTo);
            else if (options.redirectIfNotFound && !user) Router.push(options.redirectTo);
        }, [options.redirectTo, options.redirectIfFound, loading, user]);
    }

    return { user, loading, mutate };
}
