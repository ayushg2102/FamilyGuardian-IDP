import React from 'react';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import fgpLogo from '../../assets/images/fgp_logo.svg';
import { useSetPassword } from '../hooks/useSetPassword';

const { Title, Text } = Typography;

const SetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setPassword, isLoading, error } = useSetPassword();

  // Extract userId and token from query params
  const userId = searchParams.get('userId') || '';
  const token = searchParams.get('token') || '';

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    // if (!userId || !token) {
    //   message.error('Invalid reset link. Please request a new one.');
    //   return;
    // }

    try {
      await setPassword({
        userId,
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      
      message.success('Password set successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Error setting password:', err);
      // Error is already handled in the hook
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background-grey)',
      padding: '20px'
    }}>
      <Card style={{
        width: '100%',
        maxWidth: 500,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: 'none',
        borderRadius: 8
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%',
            marginBottom: 16
          }}>
            <img 
              src={fgpLogo} 
              alt="FGP Logo" 
              style={{ 
                height: 60,
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
              }} 
            />
          </div>
          <Title level={3} style={{ marginBottom: 8, width: '100%' }}>Set New Password</Title>
          <Text type="secondary" style={{ width: '100%' }}>Please enter your new password below</Text>
          
          {error && (
            <div style={{ marginTop: 16, width: '100%' }}>
              <Text type="danger">{error}</Text>
            </div>
          )}
        </div>

        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish}
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input.Password
              placeholder="Enter new password"
              size="large"
              style={{
                borderRadius: 4,
                height: 44
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
            style={{ marginBottom: 32 }}
          >
            <Input.Password
              placeholder="Confirm new password"
              size="large"
              style={{
                borderRadius: 4,
                height: 44
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
              style={{
                height: 44,
                fontSize: 16,
                fontWeight: 500,
                background: '#009688',
                border: 'none',
                borderRadius: 4
              }}
            >
              {isLoading ? 'Setting Password...' : 'Set Password'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button
              type="link"
              onClick={handleBackToLogin}
              style={{
                color: '#666',
                fontSize: 14,
                padding: '4px 0',
                height: 'auto',
                textDecoration: 'underline'
              }}
            >
              <ArrowLeftOutlined style={{ marginRight: 8 }} />
              Back to Login
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SetPassword;
