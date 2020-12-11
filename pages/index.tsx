import { PageHeader } from 'antd';

export default function Index(): JSX.Element {
    return (
        <>
            <div className="page-header animate__animated animate__fadeIn">
                <PageHeader title="Pagrindinis" subTitle="This is a subtitle" />
            </div>
            <div className="page-content animate__animated animate__fadeIn"></div>
        </>
    );
}
