import React, { useState } from 'react';
import { Table, Select, DatePicker, Button, Tag, Space, Card, Typography, Pagination, Spin, Alert } from 'antd';
import { EyeOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { getStatusColor } from '../components/common/statusUtils.tsx';
import { apiRequest } from '../utils/api';
import { useEffect } from 'react';
import { useDashboardSummary } from '../hooks/useDashboardSummary';
import { usePaymentRequestsList } from '../hooks/usePaymentRequestsList';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
//Range picker
interface RequestData {
  key: string;
  requestNo: string;
  amount: string;
  entity: string;
  paymentType: string;
  status: string;
  dateSubmitted: string;
  stage: string;
  noOfDocs: number;
  poc: string;
}

const RequestsList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { loading, error, getFormattedStatsData } = useDashboardSummary();
  const { loading: requestsLoading, error: requestsError, getRequestListItems } = usePaymentRequestsList();

  // Get formatted stats data
  const statsData = getFormattedStatsData();
  const data: RequestData[] = getRequestListItems();

  // Filter state and logic (AFTER data)
  const [paymentType, setPaymentType] = useState<string | undefined>(undefined);
  const [entity, setEntity] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const paymentTypes = Array.from(new Set(data.map((r) => r.paymentType)));
  const entities = Array.from(new Set(data.map((r) => r.entity)));
  const statuses = Array.from(new Set(data.map((r) => r.status)));

  const filteredData = data.filter((request) => {
    if (paymentType && request.paymentType !== paymentType) return false;
    if (entity && request.entity !== entity) return false;
    if (status && request.status !== status) return false;
    if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      const reqDate = dayjs(request.dateSubmitted, 'MM/DD/YYYY');
      if (reqDate.isBefore(start.startOf('day')) || reqDate.isAfter(end.endOf('day'))) return false;
    }
    return true;
  });

  const columns: ColumnsType<RequestData> = [
    {
      title: 'Request No',
      dataIndex: 'requestNo',
      key: 'requestNo',
      sorter: true,
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Request Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Entity',
      dataIndex: 'entity',
      key: 'entity',
      sorter: true,
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Date Submitted',
      dataIndex: 'dateSubmitted',
      key: 'dateSubmitted',
      sorter: true,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      sorter: true,
    },
    {
      title: 'No. of Docs',
      dataIndex: 'noOfDocs',
      key: 'noOfDocs',
      sorter: true,
      align: 'center',
    },
    {
      title: 'POC',
      dataIndex: 'poc',
      key: 'poc',
      sorter: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        console.log(record,"record"),
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate(`/requests/${record.key}`)}
          />
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<MessageOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Example usage in useEffect for fetching requests
  useEffect(() => {
    const fetchRequests = async () => {
      // Replace with your real API endpoint
      await apiRequest('/api/requests');
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Payment Request Portal
        </Title>
        <Button type="primary" size="large" onClick={() => navigate('/create-request')}>
          Create New Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {loading ? (
          <div style={{ flex: 1, textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px', color: '#666' }}>Loading stats data...</div>
          </div>
        ) : error ? (
          <div style={{ flex: 1 }}>
            <Alert
              message="Error Loading Stats Data"
              description={error}
              type="error"
              showIcon
            />
          </div>
        ) : (
          statsData.map((stat, index) => (
            <Card key={index} style={{ flex: 1, textAlign: 'center' }}>
              <Text style={{ color: '#666', fontSize: '14px' }}>{stat.title}</Text>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: '8px 0' }}>
                {stat.value}
              </div>
              <Text style={{ color: '#666', fontSize: '12px' }}>{stat.amount}</Text>
            </Card>
          ))
        )}
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Text strong>Filter By</Text>
          <Select
            placeholder="Payment Type"
            style={{ width: 200 }}
            value={paymentType}
            allowClear
            onChange={setPaymentType}
          >
            {paymentTypes.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Entity"
            style={{ width: 150 }}
            value={entity}
            allowClear
            onChange={setEntity}
          >
            {entities.map((ent) => (
              <Select.Option key={ent} value={ent}>
                {ent}
              </Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Status"
            style={{ width: 150 }}
            value={status}
            allowClear
            onChange={setStatus}
          >
            {statuses.map((st) => (
              <Select.Option key={st} value={st}>
                {st}
              </Select.Option>
            ))}
          </Select>
          <RangePicker
            style={{ width: 250 }}
            value={dateRange}
            onChange={setDateRange}
            allowClear
          />
        </div>
      </Card>

      {/* Table */}
      <Card>
        {requestsLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px', color: '#666' }}>Loading payment requests...</div>
          </div>
        ) : requestsError ? (
          <Alert
            message="Error Loading Payment Requests"
            description={requestsError}
            type="error"
            showIcon
            style={{ margin: '20px 0' }}
          />
        ) : (
          <>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredData}
              pagination={false}
              size="small"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '16px',
                padding: '16px 0',
              }}
            >
              <Text>
                Showing {filteredData.length} records from {data.length} Results
              </Text>
              <Pagination
                current={1}
                total={filteredData.length}
                pageSize={10}
                showSizeChanger={false}
                showQuickJumper={false}
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default RequestsList;
