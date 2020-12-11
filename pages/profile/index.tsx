import { PageHeader } from 'antd';
import { NextPageContext } from 'next';
import AuthRequestHandler from '../../lib/server/request/auth/AuthRH';

// export const getStaticProps: GetStaticProps = async () => {
//     // const result: Response = await fetch('http://localhost:3000/api/user/user');
//     // const data = await result.json();

//     // console.log(context);

//     return {
//         props: {},
//     };
// };

function Profile(): JSX.Element {
    return (
        <>
            <div className="page-header animate__animated animate__fadeIn">
                <PageHeader title="Profilis" subTitle="This is a subtitle" />
            </div>
            <div className="page-content"></div>
        </>
    );
}

Profile.getInitialProps = async ({ req, res }: NextPageContext) => {
    await new AuthRequestHandler();
    return { userAgent };
};

export default Profile;
