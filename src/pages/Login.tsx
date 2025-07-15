import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import fgpLogo from '../../assets/images/fgp_logo.svg';

const { Title, Text, Link } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string; remember: boolean }) => {
    setLoading(true);
    try {
      const success = await login(values.username, values.password, values.remember);
      if (success) {
        message.success('Login successful!');
        navigate('/dashboard');
      } else {
        message.error('Invalid credentials');
      }
    } catch (error) {
      console.log(error)
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#fff',
    }}>
      {/* Left Side: Logo and Info */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc',
        position: 'relative',
      }}>
        {/* Subtle background pattern */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <circle cx="120" cy="120" r="100" fill="#eaf3f7" />
          <circle cx="40%" cy="90%" r="80" fill="#eaf3f7" />
        </svg>
        <div style={{ maxWidth: 400, width: '100%', textAlign: 'center', zIndex: 1 }}>
          <img
            src={fgpLogo}
            alt="FGP Logo"
            style={{ width: '220px', height: 'auto', marginBottom: '24px' }}
          />
          <Text style={{
            color: '#222',
            fontWeight: 400,
            fontSize: '16px',
            display: 'block',
            marginBottom: '0',
          }}>
            Log in to submit and manage your reimbursement<br />claims quickly and securely.
          </Text>
        </div>
      </div>
      {/* Right Side: Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        padding: 0,
      }}>
        <div style={{ width: 400, textAlign: 'left' }}>
          <Title level={2} style={{
            color: '#222',
            marginBottom: '12px',
            textAlign: 'left',
            fontWeight: 600,
            fontSize: '28px',
          }}>
            Sign In
          </Title>
          <Text style={{
            color: '#888',
            fontWeight: 400,
            fontSize: '16px',
            display: 'block',
            marginBottom: '28px',
          }}>
            Enter your email and password to access your portal.
          </Text>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              username: '',
              password: '',
              remember: false
            }}
            style={{ textAlign: 'left' }}
          >
            <Form.Item
              label={<Text style={{ fontSize: '14px', color: '#222', fontWeight: 500 }}>Username</Text>}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              style={{ marginBottom: '20px' }}
            >
              <Input
                placeholder="john.smith@companyname.com"
                style={{
                  height: '40px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  border: '1px solid #d9d9d9',
                  background: '#fff',
                }}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ fontSize: '14px', color: '#222', fontWeight: 500 }}>Password</Text>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              style={{ marginBottom: '12px' }}
            >
              <Input.Password
                placeholder="************"
                style={{
                  height: '40px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  border: '1px solid #d9d9d9',
                  background: '#fff',
                }}
              />
            </Form.Item>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}>
              <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                <Checkbox style={{ fontSize: '14px', color: '#222' }}>
                  Remember me
                </Checkbox>
              </Form.Item>
              <Link
                href="/forgot-password"
                style={{
                  color: '#009688',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  fontWeight: 400,
                }}
              >
                Forgot password?
              </Link>
            </div>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  width: '100%',
                  height: '40px',
                  background: '#009688',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 400,
                  boxShadow: 'none',
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;