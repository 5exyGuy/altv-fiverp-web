import { Carousel, PageHeader } from 'antd';
import MainLayout from '../components/MainLayout';

export default function Index(): JSX.Element {
    return (
        <MainLayout headerTitle="Pagrindinis">
            <Carousel autoplay>
                <div>
                    <h3
                        style={{
                            height: '160px',
                            color: '#fff',
                            lineHeight: '160px',
                            textAlign: 'center',
                            background: '#364d79',
                        }}
                    >
                        1
                    </h3>
                </div>
                <div>
                    <h3
                        style={{
                            height: '160px',
                            color: '#fff',
                            lineHeight: '160px',
                            textAlign: 'center',
                            background: '#364d79',
                        }}
                    >
                        2
                    </h3>
                </div>
                <div>
                    <h3
                        style={{
                            height: '160px',
                            color: '#fff',
                            lineHeight: '160px',
                            textAlign: 'center',
                            background: '#364d79',
                        }}
                    >
                        3
                    </h3>
                </div>
                <div>
                    <h3
                        style={{
                            height: '160px',
                            color: '#fff',
                            lineHeight: '160px',
                            textAlign: 'center',
                            background: '#364d79',
                        }}
                    >
                        4
                    </h3>
                </div>
            </Carousel>
        </MainLayout>
    );
}
