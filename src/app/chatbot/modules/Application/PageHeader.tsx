import styled from '@emotion/styled';
import {Button} from 'antd';

const Header = styled.div`
    height: 60px;
    margin: -24px -50px 0px -50px;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom: 1px solid #0f172a1a;
`;

interface Props {
    backText?: string;
    title?: string;
}

export default function PageHeader({backText, title}: Props) {
    return (
        <>
            <Header className="flex items-center">
                <Button type="link" href="/chatbot">返回{backText}</Button>
                <h3>{title}</h3>
            </Header>
        </>
    );
}
