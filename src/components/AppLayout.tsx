import React, { useEffect, useState } from 'react';
import { Layout, Dropdown, Avatar, Space, Typography, Drawer, Menu } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  DownOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import fgpLogo from '../../assets/images/fgp_logo.svg';

const { Header, Content } = Layout;
const { Text } = Typography;

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const sideMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => {
        setDrawerOpen(false);
        navigate('/dashboard');
      },
    },
    {
      key: 'requests',
      icon: <UnorderedListOutlined />,
      label: 'View All Requests',
      onClick: () => {
        setDrawerOpen(false);
        navigate('/requests');
      },
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => {
        setDrawerOpen(false);
        navigate('/profile');
      },
    },
    // {
    //   key: 'change-password',
    //   icon: <UserOutlined />, // You can use a different icon if desired
    //   label: 'Change Password',
    //   onClick: () => {
    //     setDrawerOpen(false);
    //     navigate('/change-password');
    //   },
    // },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        setDrawerOpen(false);
        handleLogout();
      },
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--background-grey)' }}>
      <Header
        style={{
          cursor: 'pointer',
          background: 'var(--background-light)',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-grey)',
          height: '64px',
        }}
        className="app-header-responsive"
      >
        {!isMobile && (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}
            className="header-left"
          >
            {/* Hamburger Icon */}
            <MenuOutlined
              style={{ fontSize: 22, cursor: 'pointer', marginRight: 12 }}
              onClick={() => setDrawerOpen(true)}
            />
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 220 }}
              className="header-logo"
            >
              <img
                onClick={() => navigate('/dashboard')}
                src={fgpLogo}
                alt="FGP Logo"
                style={{ width: '220px', height: 'auto', display: 'block' }}
              />
            </div>
            <div
              style={{ flex: 1, display: 'flex', alignItems: 'center', marginLeft: 24 }}
              className="header-search"
            >
              <div style={{ position: 'relative', width: 340 }}>
                {/* Uncomment below if you want the search bar visible */}
                {/* <input
                type="text"
                placeholder="Search By Payment Request or Payment Type"
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 36px',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0',
                  fontSize: '14px',
                  background: '#fafafa',
                  outline: 'none',
                  height: '36px',
                  boxSizing: 'border-box',
                }}
              />
              <SearchOutlined style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#b0b0b0', fontSize: 16 }} /> */}
              </div>
            </div>
          </div>
        )}
        {/* Only show user section on desktop */}

        <Space size="large" className="header-user-section">
          {/* <Badge count={3} size="small">
            <BellOutlined style={{ fontSize: '18px', color: '#666', cursor: 'pointer' }} />
          </Badge> */}
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <div
              style={{
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                minWidth: 180,
              }}
              className="user-dropdown"
            >
              {/* Avatar with online dot (bottom left, overlapping) */}
              <span style={{ position: 'relative', display: 'inline-block', marginRight: 14 }}>
                <Avatar
                  size={48}
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  style={{ border: '2px solid #f0f0f0', background: '#fff' }}
                />
                {/* Online dot - bottom left, overlapping */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 32,
                    width: 16,
                    height: 16,
                    background: '#2ecc40',
                    border: '3px solid #fff',
                    borderRadius: '50%',
                    display: 'block',
                    zIndex: 2,
                  }}
                />
              </span>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    lineHeight: 1,
                    minWidth: 90,
                  }}
                >
                  <Text
                    strong
                    style={{
                      fontSize: '18px',
                      display: 'block',
                      lineHeight: '22px',
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {user?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: '18px',
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {user?.department}
                  </Text>
                </div>
                {/* Chevron down icon */}
                <DownOutlined style={{ fontSize: 10, color: '#888', marginLeft: 8, bottom: 4 }} />
              </div>
            </div>
          </Dropdown>
        </Space>

        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar
                size={48}
                src={user?.avatar}
                icon={<UserOutlined />}
                style={{ border: '2px solid #00b894' }}
              />
              <div>
                <Text strong style={{ fontSize: 18 }}>
                  {user?.name}
                </Text>
                <div style={{ fontSize: 14, color: '#888' }}>{user?.role}</div>
              </div>
            </div>
          }
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0, background: '#f7fafc' }}
          width={280}
          closable={false}
          headerStyle={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: 20 }}
        >
          <Menu
            mode="inline"
            style={{
              border: 'none',
              fontSize: 16,
              fontWeight: 500,
              background: '#f7fafc',
              paddingTop: 16,
            }}
            items={sideMenuItems}
            onClick={({ key }) => {
              const item = sideMenuItems.find((i) => i.key === key);
              if (item && item.onClick) item.onClick();
            }}
            defaultSelectedKeys={[
              window.location.pathname.includes('dashboard')
                ? 'dashboard'
                : window.location.pathname.includes('requests')
                  ? 'requests'
                  : 'profile',
            ]}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: '#bbb',
              fontSize: 13,
            }}
          >
            &copy; {new Date().getFullYear()} Family Guardian
          </div>
          <style>{`
            .ant-drawer-body .ant-menu-item {
              border-radius: 8px;
              margin: 0 12px 8px 12px;
              transition: background 0.2s;
            }
            .ant-drawer-body .ant-menu-item-selected {
              background: var(--background-success) !important;
              color: var(--primary-color-dark) !important;
            }
            .ant-drawer-body .ant-menu-item:hover {
              background: var(--border-grey) !important;
              color: var(--primary-color) !important;
            }
          `}</style>
        </Drawer>
      </Header>

      <Content
        style={{
          padding: '24px',
          background: 'var(--background-grey)',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

// Add CSS for hover effects
const style = document.createElement('style');
style.textContent = `
  .user-dropdown:hover {
    background-color: #f5f5f5;
  }
`;
document.head.appendChild(style);

export default AppLayout;
