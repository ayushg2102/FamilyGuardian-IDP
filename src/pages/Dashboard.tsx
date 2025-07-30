import React from 'react';
import { Button, Row, Col, DatePicker } from 'antd';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { dashboardStatsData, dashboardMyRequests, dashboardNotifications } from '../mock/mockData';
import { getStatusTag } from '../components/common/statusUtils.tsx';
import { Dayjs } from 'dayjs';
import { notify } from '../components/common/notification';
import { useEffect } from 'react';
import topRight from '../../assets/images/top_right.svg';
import bottomLeft from '../../assets/images/bottom_left.svg';
import draftIcon from '../../assets/images/drafticon.svg';
import pendingIcon from '../../assets/images/PendingIcon.svg';
import pendingAndReturnedIcon from '../../assets/images/PendingandReturnedIcon.svg';
import approvedIcon from '../../assets/images/ApprovedIcon.svg';
import documentIcon from '../../assets/images/Document.svg';
//Range picker
const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
  useEffect(() => {
    // Simulate an API error
    const timer = setTimeout(() => {
      notify('error', 'API Error', 'Failed to fetch dashboard data.');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Map the stats data with appropriate icons based on title
  const statsData = dashboardStatsData.map(stat => {
    let icon;
    switch(stat.title) {
      case 'Draft':
        icon = draftIcon;
        break;
      case 'Pending':
        icon = pendingIcon;
        break;
      case 'Pending & Returned':
        icon = pendingAndReturnedIcon;
        break;
      case 'Approved':
        icon = approvedIcon;
        break;
      default:
        icon = documentIcon;
    }
    return { ...stat, icon };
  });
  const myRequests = dashboardMyRequests;
  const notifications = dashboardNotifications;

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
    <div
      style={{
        background: 'var(--background-main)',
        minHeight: '100vh',
        padding: 0,
        position: 'relative',
      }}
      className="dashboard-root"
    >
      <img
        src={topRight}
        alt="Top Right Decoration"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: window.innerWidth < 768 ? '80px' : '160px',
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
          width: window.innerWidth < 768 ? '80px' : '160px',
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 16px 0',
          marginBottom: 0,
          width: '100%',
          boxSizing: 'border-box',
          gap: '16px',
        }}
        className="dashboard-header responsive-dashboard-header"
      >
        <div style={{ flex: '2', minWidth: 0 }}>
          <span
            className="dashboard-title"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(18px, 4vw, 22px)',
              color: 'var(--text-main)',
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Dashboard Overview
          </span>
        </div>
        <div
          className="dashboard-controls"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: '1',
            minWidth: '200px',
            maxWidth: '33%',
          }}
        >
          {/* Calendar Range Picker */}
          {/* Selected Date Range Box with Arrows */}
          {/* <div
            className="dashboard-date-box"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--background-light)',
              border: '1px solid var(--border-main)',
              borderRadius: 8,
              padding: '0 8px',
              height: 40,
              minWidth: 180,
              fontWeight: 500,
              color: 'var(--text-main)',
              fontSize: 15,
              boxShadow: '0 1px 4px var(--border-grey)',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            <LeftOutlined
              style={{ cursor: 'pointer', fontSize: 18, color: 'var(--text-main)' }}
              onClick={() => shiftRange('left')}
            />
            <span style={{ minWidth: 110, textAlign: 'center', fontWeight: 600 }}>
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
            style={{ borderRadius: 6, height: 40, minWidth: 140 }}
            format="DD MMM"
            suffixIcon={<CalendarOutlined style={{ color: 'var(--primary-color)' }} />}
            className="dashboard-range-picker"
          />
          <Button
            className="dashboard-admin-btn"
            style={{
              background: 'var(--background-light)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-main)',
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 15,
              height: 40,
              minWidth: 140,
            }}
            onClick={() => navigate('/admin-dashboard')}
          >
            Admin Dashboard
          </Button> */
          }
          <Button
            type="primary"
            className="dashboard-create-btn"
            style={{
              background: 'var(--primary-color)',
              border: 'none',
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 13,
              height: 34,
              maxWidth: 140,
              padding: '0 6px',
              whiteSpace: 'nowrap',
            }}
            onClick={() => navigate('/create-request')}
          >
            Create New Request
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div
        className="dashboard-stats-row"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          padding: '0 16px',
          margin: '24px 0 0 0',
          width: '100%',
          boxSizing: 'border-box',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {statsData.map((stat, idx) => (
          <div
            key={idx}
            className="dashboard-stats-card"
            style={{
              background: 'var(--background-card)',
              borderRadius: 14,
              boxShadow: '0 4px 12px var(--border-main)',
              padding: '24px 20px',
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 'auto',
              minHeight: 100,
              gap: '16px',
            }}
          >
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div
                style={{
                  color: 'var(--text-grey)',
                  fontSize: 16,
                  fontWeight: 400,
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stat.title}
              </div>
              <div
                style={{
                  color: 'var(--primary-color)',
                  fontSize: 32,
                  fontWeight: 700,
                  marginBottom: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-main)', fontSize: 14, fontWeight: 700 }}>
                {stat.amount}
              </div>
            </div>
            <div
              style={{
                borderRadius: '50%',
                width: 48,
                height: 48,
                minWidth: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--background-main)',
                flexShrink: 0,
              }}
            >
              <img src={stat.icon} alt={stat.title} style={{ width: 28, height: 28 }} />
            </div>
          </div>
        ))}
      </div>
      {/* Main Content */}
      <Row
        gutter={[16, 24]}
        style={{
          margin: '24px 16px 0',
          width: 'auto',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
        className="dashboard-main-row dashboard-row"
      >
        {/* My Requests */}
        <Col xs={24} lg={16} className="dashboard-requests-col">
          <div
            className="dashboard-requests-panel"
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
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-main)' }}>
                My Requests(10)
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
              {myRequests.map((request, idx) => (
                <div
                  key={idx}
                  className="dashboard-request-card"
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
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        {/* Notification Panel */}
        <Col xs={24} lg={8} className="dashboard-notification-col">
          <div
            className="dashboard-notification-panel"
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
              Notification Panel
            </span>
            <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
              {notifications.map((notification, idx) => (
                <div
                  key={idx}
                  className="dashboard-notification-card"
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
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/requests/${notification.id}`)}
                    >
                      {notification.id}
                    </span>
                    {getStatusTag(notification.status)}
                  </div>
                  <div
                    style={{
                      color: 'var(--text-main)',
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {notification.bold && (
                      <span style={{ fontWeight: 700 }}>{notification.bold} </span>
                    )}
                    <span style={{ fontWeight: 400 }}>
                      {notification.title.replace(notification.bold || '', '')}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 8 }}>
                    By: {notification.by}
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
                    <CalendarOutlined /> {notification.date}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      style={{
                        background: 'var(--primary-color)',
                        color: 'var(--text-light)',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 500,
                        fontSize: 15,
                        height: 32,
                        minWidth: 60,
                      }}
                      onClick={() => navigate(`/requests/${notification.id}`)}
                    >
                      {notification.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      {/* Responsive styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .dashboard-root {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
            padding: 0;
            margin: 0;
          }
          
          .dashboard-row {
            width: 100%;
            box-sizing: border-box;
          }
          
          .dashboard-controls > * {
            flex: 1;
            min-width: 120px;
          }
          
          .dashboard-stats-card {
            transition: transform 0.2s, box-shadow 0.2s;
          }
          
          .dashboard-stats-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
          }
          
          @media (max-width: 1200px) {
            .dashboard-header {
              padding: 24px 16px 0 !important;
            }
            
            .dashboard-stats-row {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          
          @media (max-width: 992px) {
            .dashboard-header {
              padding: 20px 12px 0 !important;
            }
            
            .dashboard-controls {
              gap: 10px !important;
            }
            
            .dashboard-stats-card {
              padding: 20px 16px !important;
            }
          }
          
          @media (max-width: 768px) {
            .dashboard-header {
              padding: 16px 8px 0 !important;
            }
            
            .dashboard-stats-row {
              grid-template-columns: 1fr !important;
              padding: 0 12px !important;
            }
            
            .dashboard-controls {
              flex-direction: column;
              gap: 8px !important;
            }
            
            .dashboard-controls > * {
              width: 100% !important;
              margin: 0 !important;
            }
            
            .dashboard-date-box {
              min-width: 100% !important;
            }
          }
          
          @media (max-width: 480px) {
            .dashboard-header {
              padding: 12px 8px 0 !important;
            }
            
            .dashboard-stats-card {
              padding: 16px 12px !important;
              min-height: 90px !important;
            }
            
            .dashboard-stats-card img {
              width: 28px !important;
              height: 28px !important;
            }
            
            .dashboard-stats-card div {
              font-size: 13px !important;
            }
            
            .dashboard-stats-card div:first-child {
              font-size: 14px !important;
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default Dashboard;
