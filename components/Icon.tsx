import { ReactElement } from 'react';

export default function Icon(
    props: Readonly<{
        component: ReactElement;
    }>
): JSX.Element {
    return (
        <span role="img" aria-label="home" className="anticon ant-menu-item-icon" style={{ verticalAlign: '-0.425em' }}>
            {props.component}
        </span>
    );
}
