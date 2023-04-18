'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {Button, Form, Input, Select} from 'antd';
import { createApplication } from '../../interfaces';
import { CreateApplicaitonDto } from '@/service/applicaiton';

interface Props {
    setIsCreate: (isCreate: boolean) => void;
}

export function CreateApplication ({setIsCreate}: Props) {
    const queryClient= useQueryClient();

    const createApplicaitonMutation = useMutation(
        createApplication,
        {
            onSuccess() {
                queryClient.invalidateQueries(['applications']);
                setIsCreate(false);
            }
        }
    )

    const handleSubmit = ({accessToken, description, type}: CreateApplicaitonDto) => {
        createApplicaitonMutation.mutate({accessToken, description, type})
    }

    return (
        <Form onFinish={handleSubmit} layout='vertical'>
            <Form.Item label="Access Token" name="accessToken" rules={[{required: true}]}>
                    <Input />
            </Form.Item>
            <Form.Item label="描述" name="description" rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item label="类型" name="type" rules={[{required: true}]}>
                <Select options={[
                    {
                        label: '文心一言',
                        value: 'yiyan'
                    },
                    {
                        label: 'Chatgpt',
                        value: 'gpt'
                    }
                ]} defaultValue='yiyan' />
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' type="primary">创建</Button>
                <Button onClick={() => setIsCreate(false)}>返回</Button>
            </Form.Item>
        </Form>
    )
}