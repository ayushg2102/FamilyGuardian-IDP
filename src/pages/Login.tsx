import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message, Typography, Row, Col, Grid } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import fgpLogo from '../../assets/images/fgp_logo.svg';
import topRight from '../../assets/images/top_right.svg';
import bottomLeft from '../../assets/images/bottom_left.svg';

const { Title, Text, Link } = Typography;
const { useBreakpoint } = Grid;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const screens = useBreakpoint();

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
      console.log(error);
      message.error('Login failed');
    } finally {
      setLoading(false);
    }
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
          justifyContent: 'center',
          alignItems: 'center',
          background: 'var(--background-main)',
          position: 'relative',
          minHeight: screens.xs ? 220 : '100vh',
          padding: screens.xs ? '32px 16px 16px 16px' : '0',
        }}
      >
        {/* Decorative SVG images */}
        <img
          src={topRight}
          alt="Top Right Decoration"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: screens.xs ? '80px' : '160px',
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        <img
          src={bottomLeft}
          alt="Bottom Left Decoration"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: screens.xs ? '80px' : '160px',
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        <div
          style={{
            // maxWidth: 400,
            width: '100%',
            textAlign: 'center',
            zIndex: 1,
            display: 'inline-block',
          }}
        >
          <img
            src={fgpLogo}
            alt="FGP Logo"
            style={{
              width: screens.xs ? '200px' : '370px',
              height: 'auto',
              marginBottom: '24px',
              marginLeft: '25%',
            }}
          />
          <Text
            style={{
              color: '#565656',
              fontWeight: 450,
              fontSize: screens.xs ? '16px' : '22px',
              display: 'block',
              marginBottom: '0',
            }}
          >
            Log in to submit and manage your reimbursement
            <br />
            claims quickly and securely.
          </Text>
        </div>
      </Col>
      {/* Right Side: Login Form */}
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
          <Title
            level={2}
            style={{
              color: '#333333',
              marginBottom: '12px',
              textAlign: 'left',
              fontWeight: 700,
              fontSize: screens.xs ? '24px' : '28px',
            }}
          >
            Sign In
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
            Enter your email and password to access your portal.
          </Text>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              username: '',
              password: '',
              remember: false,
            }}
            style={{ textAlign: 'left' }}
          >
            <Form.Item
              label={
                <Text style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 500 }}>
                  Username
                </Text>
              }
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              style={{ marginBottom: '20px' }}
            >
              <Input
                placeholder="diana.powell@companyname.com"
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
                  Password
                </Text>
              }
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
                  border: '1px solid var(--border-input)',
                  background: 'var(--background-light)',
                }}
              />
            </Form.Item>
            <div
              style={{
                display: 'flex',
                flexDirection: screens.xs ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: screens.xs ? 'flex-start' : 'center',
                marginBottom: '24px',
                gap: screens.xs ? 8 : 0,
              }}
            >
              <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                <Checkbox style={{ fontSize: '16px', color: 'var(--text-primary)', }}>
                  Remember me
                </Checkbox>
              </Form.Item>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Link
                  href="/forgot-password"
                  style={{
                    color: 'var(--primary-color)',
                    fontSize: '16px',
                    fontWeight: 400,
                    marginTop: screens.xs ? 8 : 0,
                    textDecoration: 'underline',
                  }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
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
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
