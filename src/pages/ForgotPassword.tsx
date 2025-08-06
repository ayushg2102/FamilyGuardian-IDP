import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Result } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import fgpLogo from '../../assets/images/fgp_logo.svg';

const { Title, Text } = Typography;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    setEmail(values.email);

    try {
      const response = await fetch('http://172.172.233.44:9000/api/auth/forgot_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EmailAddress: values.email,
        }),
      });

      const result = await response.json();

      if (response.ok && result.code === 200) {
        setEmailSent(true);
        message.success(result.message || 'Password reset email sent successfully!');
      } else {
        // Handle error response
        message.error(result.message || 'Failed to send password reset email');
      }
    } catch (error: any) {
      console.error('Error sending forgot password request:', error);
      message.error('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://172.172.233.44:9000/api/auth/forgot_password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EmailAddress: email,
        }),
      });

      const result = await response.json();

      if (response.ok && result.code === 200) {
        message.success('Email resent successfully!');
      } else {
        message.error(result.message || 'Failed to resend email');
      }
    } catch (error: any) {
      console.error('Error resending email:', error);
      message.error('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
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

          <Result
            icon={<MailOutlined style={{ fontSize: '48px', color: '#00b894' }} />}
            title={
              <Title level={2} style={{ color: '#333', marginBottom: '8px', fontWeight: '400' }}>
                Check Your Email
              </Title>
            }
            subTitle={
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <Text
                  style={{ color: '#666', fontSize: '16px', display: 'block', marginBottom: '8px' }}
                >
                  We've sent a password reset link to:
                </Text>
                <Text strong style={{ color: '#00b894', fontSize: '16px' }}>
                  {email}
                </Text>
                <Text
                  style={{ color: '#666', fontSize: '14px', display: 'block', marginTop: '16px' }}
                >
                  Please check your inbox and click the link to reset your password. If you don't
                  see the email, check your spam folder.
                </Text>
              </div>
            }
            extra={[
              <Button
                key="resend"
                type="default"
                loading={loading}
                onClick={handleResendEmail}
                style={{
                  height: '48px',
                  borderRadius: '4px',
                  marginRight: '12px',
                  backgroundColor: '#009688',
                }}
              >
                Resend Email
              </Button>,
              <Button
                key="back"
                type="primary"
                onClick={handleBackToLogin}
                style={{
                  height: '48px',
                  background: '#000',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Back to Login
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

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

        {/* Forgot Password Header */}
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
            Forgot Password?
          </Title>
          <Text
            style={{
              color: 'var(--text-placeholder)',
              fontSize: '14px',
            }}
          >
            No worries! Enter your email address and we'll send you a link to reset your password.
          </Text>
        </div>

        <Form
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
          style={{ textAlign: 'left' }}
        >
          <Form.Item
            label={<Text style={{ fontSize: '14px', color: '#333' }}>Email Address</Text>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
            style={{ marginBottom: '32px' }}
          >
            <Input
              placeholder="Enter your email address"
              style={{
                height: '48px',
                borderRadius: '4px',
                fontSize: '14px',
                border: '1px solid #d9d9d9',
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '24px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                height: '48px',
                background: '#009688',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;
