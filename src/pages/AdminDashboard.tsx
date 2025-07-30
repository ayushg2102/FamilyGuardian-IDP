import React, { useEffect } from 'react';
import { Button, Row, Col, DatePicker } from 'antd';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { Pie } from '@ant-design/charts';

// Import data and styles
import { dashboardStatsData, dashboardMyRequests } from '../mock/mockData';
import { systemAlerts, adminActions, userStatusData, userRoleData, processAdminStats, processAdminRequests } from '../mock/adminMockData';
import { dashboardStyles, chartConfigs, tooltipFormatters } from '../styles/adminDashboard.styles';
import { getStatusTag } from '../components/common/statusUtils';
import { notify } from '../components/common/notification';

export interface SystemAlert {
  id: string;
  status: string;
  title: string;
  date: string;
}

const { RangePicker } = DatePicker;

const AdminDashboard: React.FC = () => {
  useEffect(() => {
    // Simulate an API error
    const timer = setTimeout(() => {
      notify('error', 'API Error', 'Failed to fetch admin dashboard data.');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [alerts] = React.useState<SystemAlert[]>(systemAlerts);
  const [statsData] = React.useState(processAdminStats(dashboardStatsData));
  const [allRequests] = React.useState(processAdminRequests(dashboardMyRequests));
  const navigate = useNavigate();
  const [dateRange, setDateRange] = React.useState<[Dayjs | null, Dayjs | null]>([null, null]);

  // Format the selected range for display
  const formattedRange =
    dateRange[0] && dateRange[1]
      ? `${dateRange[0].format('DD MMM')} - ${dateRange[1].format('DD MMM')}`
      : 'Select Date Range';

  // Calculate the interval in days (default to 7 if not set)
  const getInterval = () => {
    if (dateRange[0] && dateRange[1]) {
      return dateRange[1].diff(dateRange[0], 'day');
    }
    return 7;
  };

  // Handler to shift the range
  const shiftRange = (direction: 'left' | 'right') => {
    const interval = getInterval();
    if (dateRange[0] && dateRange[1]) {
      const newStart =
        direction === 'left'
          ? dateRange[0].subtract(interval, 'day')
          : dateRange[0].add(interval, 'day');
      const newEnd =
        direction === 'left'
          ? dateRange[1].subtract(interval, 'day')
          : dateRange[1].add(interval, 'day');
      setDateRange([newStart, newEnd]);
    }
  };

  return (
    <div style={dashboardStyles.container}>
      <div style={dashboardStyles.header} className="dashboard-header">
        <span style={dashboardStyles.headerTitle}>
          Admin Dashboard Overview
        </span>
        <div style={dashboardStyles.headerActions}>
          <Button
            type="default"
            style={dashboardStyles.button}
            onClick={() => navigate('/admin/users')}
          >
            User Management
          </Button>
          <Button
            type="default"
            style={dashboardStyles.button}
            onClick={() => navigate('/admin/masters')}
          >
            Master Management
          </Button>
          <Button
            type="default"
            style={dashboardStyles.button}
            onClick={() => navigate('/admin/ai-config')}
          >
            AI Configuration
          </Button>
          <div style={dashboardStyles.dateRangeContainer}>
            <LeftOutlined
              style={{ cursor: 'pointer', fontSize: 18, color: 'var(--text-main)' }}
              onClick={() => shiftRange('left')}
            />
            <span style={dashboardStyles.dateRangeText}>
              {formattedRange}
            </span>
            <RightOutlined
              style={{ cursor: 'pointer', fontSize: 18, color: 'var(--text-main)' }}
              onClick={() => shiftRange('right')}
            />
          </div>
          <RangePicker
            allowClear={false}
            value={dateRange}
            onChange={(values) => setDateRange(values as [Dayjs | null, Dayjs | null])}
            style={{ borderRadius: 6, height: 40 }}
            format="DD MMM"
            suffixIcon={<CalendarOutlined style={{ color: 'var(--primary-color)' }} />}
          />
          <Button
            type="primary"
            style={{ ...dashboardStyles.button, ...dashboardStyles.primaryButton }}
            onClick={() => navigate('/create-request')}
          >
            Create New Request
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={dashboardStyles.statsRow}>
        {statsData.map((stat, idx) => (
          <Col key={idx} xs={24} sm={12} md={8} lg={6}>
            <div style={dashboardStyles.statCard}>
              <div style={{ textAlign: 'left' }}>
                <div style={dashboardStyles.statTitle}>
                  {stat.title}
                </div>
                <div style={dashboardStyles.statValue}>
                  {stat.value}
                </div>
                <div style={dashboardStyles.statAmount}>
                  {stat.amount}
                </div>
              </div>
              <div style={dashboardStyles.statIcon}>
                <img src={stat.icon} alt="Document Icon" style={{ width: 36, height: 36 }} />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Analytics Charts */}
      <Row gutter={[24, 24]} style={dashboardStyles.chartContainer}>
        {/* User Status Chart */}
        <Col xs={24} lg={12}>
          <div style={dashboardStyles.chartCard}>
            <span style={dashboardStyles.chartTitle}>
              User Status Distribution
            </span>
            <Pie
              data={userStatusData}
              {...chartConfigs.userStatus}
              tooltip={{
                formatter: (datum: any) => tooltipFormatters.userStatus(datum)
              }}
            />
          </div>
        </Col>

        {/* User Role Chart */}
        <Col xs={24} lg={12}>
          <div style={dashboardStyles.chartCard}>
            <span style={dashboardStyles.chartTitle}>
              User Role Distribution
            </span>
            <Pie
              data={userRoleData}
              {...chartConfigs.userRole}
              tooltip={{
                formatter: (datum: any) => tooltipFormatters.userRole(datum)
              }}
            />
          </div>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]} style={{ margin: '32px 40px 0 40px' }}>
        {/* All Requests */}
        <Col xs={24} lg={16}>
          <div
            style={{
              background: 'var(--background-card)',
              borderRadius: 12,
              boxShadow: '0 2px 8px var(--border-main)',
              padding: 32,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-main)' }}>
                All Requests ({allRequests.length})
              </span>
              <Button
                style={{
                  border: '1px solid var(--primary-color)',
                  color: 'var(--primary-color)',
                  borderRadius: 6,
                  fontWeight: 500,
                  fontSize: 15,
                  height: 36,
                  minWidth: 90,
                  background: 'var(--background-light)',
                }}
                onClick={() => navigate('/requests')}
              >
                View all
              </Button>
            </div>
            <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
              {allRequests.map((request, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--background-light)',
                    borderRadius: 8,
                    boxShadow: '0 1px 4px var(--border-grey)',
                    padding: 24,
                    marginBottom: 18,
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontWeight: 700,
                        fontSize: 16,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/requests/${request.id}`)}
                    >
                      {request.id}
                    </span>
                    <span
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: 13,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <CalendarOutlined /> {request.date}
                    </span>
                    {getStatusTag(request.status)}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 8 }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                        Payment Type:
                      </span>{' '}
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{request.paymentType}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Entity:</span>{' '}
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{request.entity}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                        Initiator:
                      </span>{' '}
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{request.initiator}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Amount:</span>{' '}
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{request.amount}</span>
                    </div>
                  </div>
                  {request.note && (
                    <div
                      style={{
                        background: 'var(--background-note)',
                        color: 'var(--text-error)',
                        borderRadius: 6,
                        padding: '10px 16px',
                        marginBottom: 8,
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>⛔</span> {request.note}
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Button
                      style={{
                        background: 'var(--background-light)',
                        color: 'var(--text-main)',
                        border: '1px solid var(--border-main)',
                        borderRadius: 6,
                        fontWeight: 500,
                        fontSize: 15,
                        height: 36,
                        minWidth: 70,
                      }}
                      onClick={() => {
                        // Admin-specific action
                        notify('info', 'Admin Action', `Reviewing request ${request.id}`);
                      }}
                    >
                      Review
                    </Button>
                    <Button
                      style={{
                        background: 'var(--primary-color)',
                        color: 'var(--text-light)',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 500,
                        fontSize: 15,
                        height: 36,
                        minWidth: 70,
                      }}
                      onClick={() => navigate(`/requests/${request.id}`)}
                    >
                      {request.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* System Alerts */}
        <Col xs={24} lg={8}>
          <div
            style={{
              background: 'var(--background-card)',
              borderRadius: 12,
              boxShadow: '0 2px 8px var(--border-main)',
              padding: 32,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--text-main)',
                marginBottom: 16,
                display: 'block',
              }}
            >
              System Alerts
            </span>
            <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
              {systemAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--background-light)',
                    borderRadius: 8,
                    boxShadow: '0 1px 4px var(--border-grey)',
                    padding: 20,
                    marginBottom: 18,
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--primary-color)',
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {alert.id}
                    </span>
                    {getStatusTag(alert.status)}
                  </div>
                  <div
                    style={{
                      color: 'var(--text-main)',
                      fontSize: 14,
                      fontWeight: 400,
                      marginBottom: 4,
                    }}
                  >
                    {alert.title}
                  </div>
                  <div
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: 13,
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <CalendarOutlined /> {alert.date}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Button
                      style={{
                        background: 'var(--primary-color)',
                        color: 'var(--text-light)',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 500,
                        fontSize: 15,
                        height: 32,
                        minWidth: 100,
                      }}
                      onClick={() => {
                        notify('info', 'Admin Action', `Acknowledged alert ${alert.id}`);
                      }}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px 16px 0 16px !important;
          }
          .ant-row {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        @media (max-width: 576px) {
          .dashboard-header span {
            font-size: 18px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
