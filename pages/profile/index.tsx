import { PageHeader } from 'antd';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    // const result: Response = await fetch('http://localhost:3000/api/user/user');
    // const data = await result.json();

    // console.log(context);

    return {
        props: {},
    };
};

export default function Profile(): JSX.Element {
    return (
        <>
            <div className="page-header animate__animated animate__fadeIn">
                <PageHeader title="Profilis" subTitle="This is a subtitle" />
            </div>
            <div className="page-content"></div>
        </>
    );
}
