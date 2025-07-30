import React, { useState } from 'react';
import { Tabs, Table, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { TabPane } = Tabs;

interface MasterData {
  id: string;
  code: string;
  description: string;
  lastUpdated: string;
  updatedBy: string;
}

const MasterManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gl');

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a: MasterData, b: MasterData) => a.code.localeCompare(b.code),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    },
  ];

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://your-api-endpoint/upload',
    headers: {
      authorization: 'authorization-token',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>Master Data Management</h2>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload Excel Template</Button>
        </Upload>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="GL Account" key="gl">
          <Table<MasterData> columns={columns} dataSource={[]} />
        </TabPane>
        <TabPane tab="Bank Account" key="bank">
          <Table<MasterData> columns={columns} dataSource={[]} />
        </TabPane>
        <TabPane tab="Division Code" key="division">
          <Table<MasterData> columns={columns} dataSource={[]} />
        </TabPane>
        <TabPane tab="Department Code" key="department">
          <Table<MasterData> columns={columns} dataSource={[]} />
        </TabPane>
        <TabPane tab="Product Types" key="product">
          <Table<MasterData> columns={columns} dataSource={[]} />
        </TabPane>
        <TabPane tab="Location Types" key="location">
          <Table<MasterData> columns={columns} dataSource={[]} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MasterManagement;
