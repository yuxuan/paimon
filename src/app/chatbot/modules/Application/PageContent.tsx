import styled from '@emotion/styled';

const Content = styled.div`
    margin-top: 20px;
`;

interface Props {
    children: React.ReactNode;
}

export default function PageContent({children}: Props) {
    return (
        <>
            <Content className="flex gap-5 overflow-hidden">
                {children}
            </Content>
        </>
    );
}
