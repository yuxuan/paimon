'use client';

import React, {useState} from 'react';
import {Button, Form, Select, Space} from 'antd';
import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {Application} from '@/shared/structure';
import {getApplications} from '../../interfaces';
import {CreateApplication} from './CreateApplication';


export default function WelcomeForm() {
    const getApplicationsQuery = useQuery(['applications'], getApplications);

    const [isCreate, setIsCreate] = useState(false);

    const selectOptions = getApplicationsQuery.data?.map(item => ({
        label: item.description,
        value: item.applicationId,
    }));

    const route = useRouter();

    const [form] = Form.useForm();

    const handleFinish = ({applicationId}: Application) => {
        route.push(`/chatbot/application/${applicationId}`);
    };

    if (isCreate) {
        return <CreateApplication setIsCreate={setIsCreate} />;
    }

    return (
        <Form
            name="welcomeForm"
            form={form}
            layout="vertical"
            onFinish={handleFinish}
        >
            <Form.Item
                name="applicationId"
                label="应用名称"
                rules={[{required: true, message: '请选择应用'}]}
            >
                <Select options={selectOptions} />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        前往
                    </Button>
                    <Button onClick={() => setIsCreate(true)}>
                        手动创建
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
