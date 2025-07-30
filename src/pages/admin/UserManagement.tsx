import React, { useState } from 'react';
import { Table, Button, Input, Switch, Tag, Space, Modal, Form, Select, Card, Pagination } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { notify } from '../../components/common/notification';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  department: string;
  entity: string;
  status: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    roles: ['Initiator', 'Department Head'],
    department: 'Finance',
    entity: 'FGI',
    status: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    roles: ['Finance L1'],
    department: 'Finance',
    entity: 'FGG',
    status: true,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    roles: ['Finance L2'],
    department: 'Accounts',
    entity: 'FGC',
    status: false,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    roles: ['Initiator'],
    department: 'HR',
    entity: 'FGI',
    status: true,
  },
  {
    id: '5',
    name: 'Emily Clark',
    email: 'emily.clark@example.com',
    roles: ['Department Head'],
    department: 'IT',
    entity: 'FGC',
    status: true,
  },
  {
    id: '6',
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    roles: ['Finance L1'],
    department: 'Finance',
    entity: 'FGI',
    status: false,
  },
  {
    id: '7',
    name: 'Olivia Lee',
    email: 'olivia.lee@example.com',
    roles: ['Finance L2'],
    department: 'Accounts',
    entity: 'FGG',
    status: true,
  },
  {
    id: '8',
    name: 'William Harris',
    email: 'william.harris@example.com',
    roles: ['Initiator'],
    department: 'HR',
    entity: 'FGC',
    status: false,
  },
  {
    id: '9',
    name: 'Sophia Hall',
    email: 'sophia.hall@example.com',
    roles: ['Department Head'],
    department: 'IT',
    entity: 'FGG',
    status: true,
  },
  {
    id: '10',
    name: 'James Young',
    email: 'james.young@example.com',
    roles: ['Finance L1'],
    department: 'Finance',
    entity: 'FGI',
    status: true,
  },
];

const UserManagement: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filtering logic
  const filteredUsers = users.filter((user) => {
    const search = searchText.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.department.toLowerCase().includes(search) ||
      user.entity.toLowerCase().includes(search) ||
      user.roles.some((role) => role.toLowerCase().includes(search))
    );
  });


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role(s)',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => (
        <>
          {roles.map((role) => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Entity',
      dataIndex: 'entity',
      key: 'entity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleResetPassword(record)}>
            Reset Password
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusChange = (checked: boolean) => {
    notify('success', 'Status Updated', 'User status has been updated successfully');
  };

  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue({ ...record });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        // Edit
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...editingUser, ...values } : u))
        );
      } else {
        // Add
        setUsers((prev) => [
          ...prev,
          { ...values, id: (Math.max(...prev.map((u) => parseInt(u.id))) + 1).toString() },
        ]);
      }
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    });
  };

  const handleResetPassword = (record: any) => {
    notify('success', 'Password Reset', 'Password reset email has been sent to the user');
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Search users..."
          prefix={<SearchOutlined />}
          style={{ width: '300px' }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Button type="primary" icon={<UserAddOutlined />} onClick={handleAdd}>
          Add New User
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
          rowKey="id"
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
          <span>
            Showing {filteredUsers.length > 0 ? ((currentPage - 1) * pageSize + 1) : 0}
            -
            {Math.min(currentPage * pageSize, filteredUsers.length)}
            {` of ${filteredUsers.length} Results`}
          </span>
          <Pagination
            current={currentPage}
            total={filteredUsers.length}
            pageSize={pageSize}
            showSizeChanger={true}
            pageSizeOptions={['5','10','20','50']}
            showQuickJumper={false}
            onChange={setCurrentPage}
            onShowSizeChange={(_, size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      </Card>

      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        onOk={handleModalOk}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingUser || { status: true, roles: [] }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Enter name' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Enter valid email' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Department" name="department" rules={[{ required: true, message: 'Enter department' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Entity" name="entity" rules={[{ required: true, message: 'Enter entity' }]}> 
            <Input />
          </Form.Item>
          <Form.Item label="Role(s)" name="roles" rules={[{ required: true, message: 'Select at least one role' }]}> 
            <Select mode="multiple" placeholder="Select roles">
              <Select.Option value="Initiator">Initiator</Select.Option>
              <Select.Option value="Department Head">Department Head</Select.Option>
              <Select.Option value="Finance L1">Finance L1</Select.Option>
              <Select.Option value="Finance L2">Finance L2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
