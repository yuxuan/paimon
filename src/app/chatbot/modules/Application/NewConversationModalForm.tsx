'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Form, Input, Modal, message} from 'antd';
import {useBoolean} from 'huse';
import {useCallback} from 'react';
import {createConversation} from '../../interfaces';
import {useApplicationContext} from './ApplicationContextProvider';

export default function NewConversationModalForm() {
    const {application, setContextConversationId} = useApplicationContext();
    const [loading, {on: onLoading, off: offLoading}] = useBoolean(false);
    const [open, {on, off}] = useBoolean(false);
    const createConversationMutation = useMutation(createConversation);
    const queryClient = useQueryClient();

    const [form] = Form.useForm();
    const handleNewConversation = () => {
        on();
    };

    const handleOk = useCallback(
        async () => {
            const prompt = form.getFieldValue('prompt');
            try {
                onLoading();
                const {conversationId} = await createConversationMutation.mutateAsync({
                    prompt: prompt,
                    applicationId: application.applicationId,
                });
                queryClient.invalidateQueries({queryKey: ['conversationList']});
                setContextConversationId(conversationId);
                form.resetFields();
            }
            catch (e) {
                message.error((e as any).message);
            }
            finally {
                offLoading();
                off();
            }
        },
        [
            application.applicationId,
            createConversationMutation,
            form,
            off,
            offLoading,
            onLoading,
            queryClient,
            setContextConversationId,
        ]
    );
    return (
        <>
            <Button onClick={handleNewConversation} style={{marginLeft: 20}}>新建对话</Button>
            <Modal
                title="新建对话"
                open={open}
                onOk={handleOk}
                onCancel={off}
                confirmLoading={loading}
            >
                <Form form={form}>
                    <Form.Item label="请输入主题" name="prompt" required>
                        <Input maxLength={50} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
