import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  Select,
  Upload,
  message,
  Space,
  Spin,
} from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useChangePassword } from '../hooks/useChangePassword';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;
const { Option } = Select;

const countryCodes = [
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
];

const departments = ['IT & Services', 'HR', 'Finance', 'Operations'];
const divisions = ['Corporate Finance', 'Retail', 'Enterprise'];

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [dirty, setDirty] = useState(false);
  const [passwordForm] = Form.useForm();
  const { changePassword, isLoading: passwordLoading, error: passwordError } = useChangePassword();
  
  // Get user from auth context
  const { user } = useAuth();
  
  // Fetch user profile data
  const { profileData, isLoading, error, refetch } = useUserProfile(user?.id || user?.UserId);

  // Update avatar URL when profile data loads
  useEffect(() => {
    if (profileData?.UserImage) {
      setAvatarUrl(profileData.UserImage);
    }
  }, [profileData]);

  // Store original data for cancel
  const [originalProfile, setOriginalProfile] = useState({
    avatar: '',
    fullName: '',
    email: '',
    phoneCode: '+93',
    phone: '',
    department: '',
    division: 'Corporate Finance',
  });

  // Update original profile when data loads
  useEffect(() => {
    if (profileData) {
      const fullName = `${profileData.FirstName || ''} ${profileData.LastName || ''}`.trim();
      setOriginalProfile({
        avatar: profileData.UserImage || '',
        fullName,
        email: profileData.EmailAddress,
        phoneCode: profileData.CountryCode?.DialCode || '+93',
        phone: profileData.Mobile || '',
        department: profileData.Department?.toString() || '',
        division: 'Corporate Finance',
      });
    }
  }, [profileData]);

  // Get initial values from profile data
  const getInitialValues = () => {
    if (!profileData) return {};
    
    const fullName = `${profileData.FirstName || ''} ${profileData.LastName || ''}`.trim();
    return {
      userId: profileData.UserId?.toString() || '',
      userName: profileData.UserName || '',
      fullName,
      firstName: profileData.FirstName || '',
      lastName: profileData.LastName || '',
      email: profileData.EmailAddress,
      emailAddress: profileData.EmailAddress,
      phoneCode: profileData.CountryCode?.DialCode || '+93',
      phone: profileData.Mobile || '',
      mobile: profileData.Mobile || '',
      department: profileData.Department?.toString() || '',
      departmentCode: profileData.Department?.toString() || '',
      division: 'Corporate Finance',
      gender: profileData.Gender?.toString() || '',
      userStatus: profileData.UserStatus?.toString() || '',
      passwordExpiry: '',
    };
  };

  const handleAvatarUpload = (info: any) => {
    // Always preview the image immediately after selection
    const file = info.file.originFileObj || info.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setAvatarUrl(e.target?.result as string);
        setUploading(false);
        setDirty(true);
        setAvatarFile(file);
        message.success('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl('');
    setAvatarFile(null);
    setDirty(true);
    message.success('Profile picture removed');
  };

  const onFieldsChange = () => {
    setDirty(true);
  };

  const handlePasswordChange = async () => {
    console.log("handlePasswordChange",passwordForm.getFieldsValue())
    try {
      const values = passwordForm.getFieldsValue();
      // console.log(values,"values")
      // if (values.newPassword !== values.confirmPassword) {
      //   message.error('New password and confirm password do not match');
      //   return;
      // }

      await changePassword({
        old_password: values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      });
      
      message.success('Password updated successfully!');
      passwordForm.resetFields();
    } catch (error: any) {
      // Error is already handled by the useChangePassword hook
      if (error?.errorFields) {
        // Form validation error
        return;
      }
      console.error('Error changing password:', error);
    }
  };

  const handleSave = () => {
    // Save current form and avatar as original
    const values = form.getFieldsValue();
    setOriginalProfile({
      avatar: avatarUrl,
      fullName: values.fullName,
      email: values.email,
      phoneCode: values.phoneCode,
      phone: values.phone,
      department: values.department,
      division: values.division,
    });
    message.success('Changes saved!');
    setDirty(false);
  };


  const handleCancel = () => {
    // Restore previous data
    setAvatarUrl(originalProfile.avatar);
    setAvatarFile(null);
    form.setFieldsValue({
      fullName: originalProfile.fullName,
      email: originalProfile.email,
      phoneCode: originalProfile.phoneCode,
      phone: originalProfile.phone,
      department: originalProfile.department,
      division: originalProfile.division,
    });
    setDirty(false);
    message.info('Changes reverted');
  };

  // Update form fields when profile data loads
  useEffect(() => {
    if (profileData) {
      form.setFieldsValue(getInitialValues());
    }
  }, [profileData, form]);

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div style={{ padding: '32px 0', background: '#fafbfc', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Show error message if data fetch failed
  if (error) {
    return (
      <div style={{ padding: '32px 0', background: '#fafbfc', minHeight: '100vh' }}>
        <Title level={3} style={{ marginLeft: 32, marginBottom: 24 }}>Profile & Password</Title>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Error loading profile data: {error}</p>
          <Button onClick={() => refetch()} type="primary">Retry</Button>
        </div>
      </div>
    );
  }

  // Don't render form if no profile data
  if (!profileData) {
    return (
      <div style={{ padding: '32px 0', background: '#fafbfc', minHeight: '100vh' }}>
        <Title level={3} style={{ marginLeft: 32, marginBottom: 24 }}>Profile & Password</Title>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px 0', background: '#fafbfc', minHeight: '100vh' }}>
      <Title level={3} style={{ marginLeft: 32, marginBottom: 24 }}>Profile & Password</Title>
      <Row gutter={32} justify="center">
        {/* Profile Details (Left) */}
        <Col xs={24} md={14} lg={14}>
          <Card styles={{ body: { padding: 24 } }} style={{ borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
              <Avatar size={80} src={avatarUrl} style={{ border: '2px solid #e0e0e0' }} />
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <Upload
                  key={avatarUrl || 'empty'}
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  style={{ marginBottom: 4,padding:'4px 12px',color:'var(--primary-color-dark)',  border:'1px solid var(--primary-color-dark)',borderRadius:'6px' }}
                >
                  {/* <Button size="small" icon={<UploadOutlined />} loading={uploading} style={{ marginBottom: 4 }}> */}
                    Upload picture
                  {/* </Button> */}
                </Upload>
                <Button
                  size="middle"
                  icon={<DeleteOutlined />}
                  onClick={handleRemoveAvatar}
                  disabled={!avatarUrl}
                  danger
                  style={{ marginBottom: 4,padding:'4px 12px',color:'var(--primary-color-dark)',  border:'1px solid var(--primary-color-dark)',borderRadius:'6px' }}
                >
                  Remove
                </Button>
              </div>
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={getInitialValues()}
              onFieldsChange={onFieldsChange}
              onFinish={handleSave}
              requiredMark={false}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="User ID" name="userId">
                    <Input disabled placeholder="User ID" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="User Name" name="userName">
                    <Input placeholder="User Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input placeholder="Enter your first name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input placeholder="Enter your last name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                  >
                    <Input placeholder="Enter your full name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Email Address" name="emailAddress">
                    <Input placeholder="Enter your email address" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Mobile" name="mobile">
                    <Input placeholder="Enter your mobile number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Gender" name="gender">
                    <Select placeholder="Select gender">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="User Status" name="userStatus">
                    <Select placeholder="Select status">
                      <Option value="Active">Active</Option>
                      <Option value="Inactive">Inactive</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Password Expiry" name="passwordExpiry">
                    <Input disabled placeholder="Password Expiry" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Department Code" name="departmentCode">
                    <Input placeholder="Enter department code" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Phone Number" required style={{ marginBottom: 0 }}>
                    <Space.Compact style={{ width: '100%' }}>
                      <Form.Item name="phoneCode" noStyle>
                        <Select style={{ width: 90 }}>
                          {countryCodes.map(c => (
                            <Option key={c.code} value={c.code}>{c.label}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        noStyle
                        rules={[{ required: true, message: 'Enter phone number' }]}
                      >
                        <Input style={{ width: '100%' }} placeholder="000 000 0000" type="tel" />
                      </Form.Item>
                    </Space.Compact>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[{ required: true, message: 'Select department' }]}
                  >
                    <Select placeholder="Select department">
                      {departments.map(d => (
                        <Option key={d} value={d}>{d}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Division"
                    name="division"
                    rules={[{ required: true, message: 'Select division' }]}
                  >
                    <Select placeholder="Select division">
                      {divisions.map(d => (
                        <Option key={d} value={d}>{d}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!dirty}
                    style={{ marginTop: 8, width: 140 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    style={{ marginTop: 8, width: 140 }}
                    onClick={handleCancel}
                    disabled={!dirty}
                  >
                    Cancel Changes
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        {/* Change Password (Right) */}
        <Col xs={24} md={10} lg={8}>
           <Card styles={{ body: { padding: 24 } }} style={{ borderRadius: 12, minHeight: 400 }}>
  <Title level={5} style={{ marginBottom: 24 }}>Change Password</Title>
  <Form
    form={passwordForm}
    layout="vertical"
    style={{ maxWidth: 400 }}
    requiredMark={false}
  >
    <Form.Item
      label="Old Password"
      name="oldPassword"
      rules={[{ required: true, message: 'Enter your current password' }]}
    >
      <Input.Password
        placeholder="Enter your current Password"
        autoComplete="current-password"
        // iconRender={visible => visible ? <span role="img" aria-label="eye">👁️</span> : <span role="img" aria-label="eye-off">🙈</span>}
      />
    </Form.Item>
    <Form.Item
      label="New Password"
      name="newPassword"
      rules={[
        { required: true, message: 'Enter new password' },
        { min: 6, message: 'Password must be at least 6 characters' }
      ]}
      // hasFeedback
    >
      <Input.Password
        placeholder="Enter new Password"
        autoComplete="new-password"
        // iconRender={visible => visible ? <span role="img" aria-label="eye">👁️</span> : <span role="img" aria-label="eye-off">🙈</span>}
      />
    </Form.Item>
    <Form.Item
      label="Confirm New Password"
      name="confirmPassword"
      dependencies={["newPassword"]}
      // hasFeedback
      rules={[
        { required: true, message: 'Confirm your new password' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || form.getFieldValue('newPassword') === value) {
              return Promise.resolve();
            }
            // return Promise.reject(new Error('Passwords do not match'));
          },
        }),
      ]}
    >
      <Input.Password
        placeholder="Enter confirm new Password"
        autoComplete="new-password"
        // iconRender={visible => visible ? <span role="img" aria-label="eye">👁️</span> : <span role="img" aria-label="eye-off">🙈</span>}
      />
    </Form.Item>
    <Form.Item>
      <Button
        type="primary"
        onClick={handlePasswordChange}
        loading={isLoading}
        style={{ marginTop: 8, width: 200 }}
      >
        Update Password
      </Button>
    </Form.Item>
  </Form>
</Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
