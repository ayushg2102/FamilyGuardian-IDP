import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import fgpLogo from '../../assets/images/fgp_logo.svg';

const { Title, Text } = Typography;

const SetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract userId and token from query params
  const userId = searchParams.get('userId') || '';
  const token = searchParams.get('token') || 'potato'; // fallback to 'potato' if not present

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      // API endpoint and payload (adjust as needed)
      const payload = {
        userId,
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const result = await apiRequest('/api/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (result) {
        message.success('Password set successfully! Please login.');
        navigate('/login');
      }
    } catch {
      message.error('Failed to set password.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background-grey)',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '400px',
          textAlign: 'center',
        }}
      >
        {/* Logo Section */}
        <div style={{ marginBottom: '60px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <img
              src={fgpLogo}
              alt="FGP Logo"
              style={{ width: '220px', height: 'auto', marginBottom: '8px' }}
            />
          </div>
        </div>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Title
            level={2}
            style={{
              color: 'var(--text-main)',
              marginBottom: '12px',
              fontWeight: '400',
              fontSize: '32px',
            }}
          >
            Set New Password
          </Title>
          <Text
            style={{
              color: 'var(--text-placeholder)',
              fontSize: '14px',
            }}
          >
            Please enter your new password below.
          </Text>
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish} style={{ textAlign: 'left' }}>
          <Form.Item
            label={
              <Text style={{ fontSize: 14, color: 'var(--text-main)', fontWeight: 500 }}>
                New Password
              </Text>
            }
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              { min: 8, message: 'Password must be at least 8 characters.' },
            ]}
            style={{ marginBottom: 32 }}
          >
            <Input.Password
              placeholder="Enter new password"
              style={{
                height: 48,
                borderRadius: 4,
                fontSize: 14,
                border: '1px solid var(--border-input)',
                background: 'var(--background-light)',
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <Text style={{ fontSize: 14, color: 'var(--text-main)', fontWeight: 500 }}>
                Confirm Password
              </Text>
            }
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
            style={{ marginBottom: 32 }}
          >
            <Input.Password
              placeholder="Confirm new password"
              style={{
                height: 48,
                borderRadius: 4,
                fontSize: 14,
                border: '1px solid var(--border-input)',
                background: 'var(--background-light)',
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                height: 48,
                background: '#009688',
                border: 'none',
                borderRadius: 4,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {loading ? 'Setting...' : 'Set Password'}
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button
              type="link"
              onClick={handleBackToLogin}
              style={{
                color: '#666',
                fontSize: '14px',
                padding: '0',
                textDecoration: 'underline',
              }}
            >
              <ArrowLeftOutlined style={{ marginRight: '8px' }} />
              Back to Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SetPassword;
