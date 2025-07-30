import React, { useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, Grid, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import fgpLogo from '../../assets/images/fgp_logo.svg';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const breadcrumbGreen = '#009966';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();

  const onFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Password changed successfully!');
      navigate('/profile');
    }, 1200);
  };

  return (
    <Row
      style={{ minHeight: '100vh', background: 'var(--background-light)' }}
      align="stretch"
      justify="center"
      wrap
    >
      {/* Left Side: Logo and Info */}
      <Col
        xs={24}
        md={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background-main)',
          position: 'relative',
          minHeight: screens.xs ? 220 : '100vh',
          padding: screens.xs ? '32px 16px 16px 16px' : '0',
        }}
      >
        {/* Subtle background pattern */}
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, minHeight: 220 }}
        >
          <circle cx="120" cy="120" r="100" fill="var(--icon-info)" />
          <circle cx="40%" cy="90%" r="80" fill="var(--icon-info)" />
        </svg>
        <div style={{ maxWidth: 400, width: '100%', textAlign: 'center', zIndex: 1 }}>
          <img
            src={fgpLogo}
            alt="FGP Logo"
            style={{ width: screens.xs ? '160px' : '220px', height: 'auto', marginBottom: '24px' }}
          />
          <Text
            style={{
              color: 'var(--text-main)',
              fontWeight: 400,
              fontSize: screens.xs ? '15px' : '16px',
              display: 'block',
              marginBottom: '0',
            }}
          >
            Change your password to keep your account secure.
          </Text>
        </div>
      </Col>
      {/* Right Side: Breadcrumbs and Change Password Form */}
      <Col
        xs={24}
        md={12}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--background-light)',
          padding: screens.xs ? '32px 16px 16px 16px' : 0,
        }}
      >
        <div style={{ width: '100%', maxWidth: 400, textAlign: 'left' }}>
          {/* Breadcrumbs */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                color: breadcrumbGreen,
                fontWeight: 500,
                cursor: 'pointer',
                fontSize: 15,
              }}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </span>
            <span style={{ color: '#bdbdbd', margin: '0 8px' }}>/</span>
            <span
              style={{ color: '#222', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
              onClick={() => navigate('/profile')}
            >
              Profile
            </span>
            <span style={{ color: '#bdbdbd', margin: '0 8px' }}>/</span>
            <span style={{ color: '#222', fontWeight: 600, fontSize: 15 }}>Change Password</span>
          </div>
          <Title
            level={2}
            style={{
              color: 'var(--text-main)',
              marginBottom: '12px',
              textAlign: 'left',
              fontWeight: 600,
              fontSize: screens.xs ? '24px' : '28px',
            }}
          >
            Change Password
          </Title>
          <Text
            style={{
              color: 'var(--text-secondary)',
              fontWeight: 400,
              fontSize: screens.xs ? '15px' : '16px',
              display: 'block',
              marginBottom: '28px',
            }}
          >
            Enter your old and new password to update your credentials.
          </Text>
          <Form form={form} layout="vertical" onFinish={onFinish} style={{ textAlign: 'left' }}>
            <Form.Item
              label={
                <Text style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500 }}>
                  Old Password
                </Text>
              }
              name="oldPassword"
              rules={[{ required: true, message: 'Please enter your old password' }]}
              style={{ marginBottom: '20px' }}
            >
              <Input.Password
                placeholder="Enter old password"
                style={{
                  height: '40px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  border: '1px solid var(--border-input)',
                  background: 'var(--background-light)',
                }}
              />
            </Form.Item>
            <Form.Item
              label={
                <Text style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500 }}>
                  New Password
                </Text>
              }
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
              hasFeedback
              style={{ marginBottom: '20px' }}
            >
              <Input.Password
                placeholder="Enter new password"
                style={{
                  height: '40px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  border: '1px solid var(--border-input)',
                  background: 'var(--background-light)',
                }}
              />
            </Form.Item>
            <Form.Item
              label={
                <Text style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500 }}>
                  Confirm New Password
                </Text>
              }
              name="confirmNewPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
              style={{ marginBottom: '20px' }}
            >
              <Input.Password
                placeholder="Confirm new password"
                style={{
                  height: '40px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  border: '1px solid var(--border-input)',
                  background: 'var(--background-light)',
                }}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: '100%',
                  height: '40px',
                  background: 'var(--primary-color)',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 400,
                  boxShadow: 'none',
                }}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ChangePassword;
