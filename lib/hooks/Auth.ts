import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Auth() {
    const { data, mutate } = useSWR('/api/user', fetcher);
    // if data is not defined, the query has not completed
    const loading = !data;
    const user = data?.user;
    return [user, { mutate, loading }];
}
