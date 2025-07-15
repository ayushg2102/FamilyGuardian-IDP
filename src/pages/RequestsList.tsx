import React, { useState } from 'react';
import { Table, Select, DatePicker, Button, Tag, Space, Card, Typography, Pagination } from 'antd';
import { EyeOutlined, EditOutlined, MessageOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { requestsStatsData, requestsData } from '../mock/mockData';
import { getStatusColor } from '../components/common/statusUtils.tsx';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

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

  // Declare filter state and logic after data
  // (move this block after the data array declaration)

  const statsData = requestsStatsData;
  const data: RequestData[] = requestsData;

  // Filter state and logic (AFTER data)
  const [paymentType, setPaymentType] = useState<string | undefined>(undefined);
  const [entity, setEntity] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const paymentTypes = Array.from(new Set(data.map(r => r.paymentType)));
  const entities = Array.from(new Set(data.map(r => r.entity)));
  const statuses = Array.from(new Set(data.map(r => r.status)));

  const filteredData = data.filter(request => {
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
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Request Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (text) => <Text strong>{text}</Text>
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
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
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
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            size="small" 
            onClick={() => navigate(`/requests/${record.requestNo}`)}
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>Payment Request Portal</Title>
        <Button type="primary" size="large" onClick={() => navigate('/create-request')}>
          Create New Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {statsData.map((stat, index) => (
          <Card key={index} style={{ flex: 1, textAlign: 'center' }}>
            <Text style={{ color: '#666', fontSize: '14px' }}>{stat.title}</Text>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: '8px 0' }}>
              {stat.value}
            </div>
            <Text style={{ color: '#666', fontSize: '12px' }}>{stat.amount}</Text>
          </Card>
        ))}
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
            {paymentTypes.map(type => (
              <Select.Option key={type} value={type}>{type}</Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Entity"
            style={{ width: 150 }}
            value={entity}
            allowClear
            onChange={setEntity}
          >
            {entities.map(ent => (
              <Select.Option key={ent} value={ent}>{ent}</Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Status"
            style={{ width: 150 }}
            value={status}
            allowClear
            onChange={setStatus}
          >
            {statuses.map(st => (
              <Select.Option key={st} value={st}>{st}</Select.Option>
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
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          size="small"
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '16px',
          padding: '16px 0'
        }}>
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
      </Card>
    </div>
  );
};

export default RequestsList;