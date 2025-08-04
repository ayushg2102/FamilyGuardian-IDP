import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Upload,
  message,
  Tabs,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './CreateRequest.module.css';
import topRight from '../../assets/images/top_right.svg';
import bottomLeft from '../../assets/images/bottom_left.svg';

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const breadcrumbGreen = '#009966'; // Use your theme green if available

const CreateRequest: React.FC = () => {
  const [form] = Form.useForm();
  const [paymentMode, setPaymentMode] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [entity, setEntity] = useState('FGI - Family Guardian Insurance');
  const [vatStatus, setVatStatus] = useState('');
  const [vendorsList, setVendorsList] = useState<any>(null);
  const navigate = useNavigate();

  // Static mapping for bank accounts per entity
  const bankAccountsByEntity: Record<string, string[]> = {
    'FGI - Family Guardian Insurance': ['HSBC - 123456789', 'CIBC - 987654321'],
    'FGC - Family Guardian Claims': ['RBC - 111222333', 'Scotiabank - 444555666'],
    'FGG - Family Guardian Group': ['Bank of Bahamas - 777888999', 'Fidelity - 000111222'],
  };

  const handlePaymentModeChange = (value: string) => {
    setPaymentMode(value);
  };

  const handlePaymentTypeChange = (value: string) => {
    // Get current vendors before changing the payment type
    const currentVendors = form.getFieldValue('vendors') || [];
    
    // If changing to a payment type that's not Credit Card or Staff Reimbursement
    if (value !== 'Credit Card' && value !== 'Staff Reimbursement' && currentVendors.length > 1) {
      // Keep only the first vendor
      const firstVendor = currentVendors[0];
      
      // Update the form values to keep only the first vendor
      form.setFieldsValue({
        vendors: [firstVendor]
      });
      
      // If we have the vendors list instance, remove extra vendors
      if (vendorsList && vendorsList.remove) {
        for (let i = currentVendors.length - 1; i > 0; i--) {
          vendorsList.remove(i);
        }
      }
    }
    
    // Update the payment type state
    setPaymentType(value);
  };

  const handleEntityChange = (value: string) => {
    setEntity(value);
  };

  const handleVatStatusChange = (value: string) => {
    setVatStatus(value);
  };

  const onFinish = (values: unknown) => {
    console.log('Form values:', values);
    message.success('Request submitted successfully!');
    navigate('/requests');
  };

  const onSaveDraft = () => {
    message.success('Request saved as draft!');
    navigate('/requests');
  };

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: unknown) {
      if ((info as any).file.status === 'done') {
        message.success(`${(info as any).file.name} file uploaded successfully`);
      } else if ((info as any).file.status === 'error') {
        message.error(`${(info as any).file.name} file upload failed.`);
      }
    },
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'var(--background-grey)',
        padding: '32px 0',
        position: 'relative',
      }}
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
      {/* Breadcrumbs */}
      <div style={{ width: '100%', maxWidth: 1100, marginBottom: 16 }}>
        <span
          style={{
            color: breadcrumbGreen,
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: 15,
          }}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </span>
        <span style={{ color: '#bdbdbd', margin: '0 8px' }}>/</span>
        <span style={{ color: '#222', fontWeight: 600, fontSize: 15 }}>Create New Request</span>
        <h1 className="mt-4" style={{ color: '#222', fontWeight: 700, fontSize: 25 }}>
          Create New Request
        </h1>
      </div>

      {/* Tab-like Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          height: 2,
          background: '#008A7A',
          borderRadius: '12px 12px 0 0',
          marginBottom: -4,
          zIndex: 1,
        }}
      />
      <Card
        style={{
          width: '100%',
          // border: '1px solid #008A7A', // removed border from Card
          maxWidth: 1100,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          borderRadius: 12,
          padding: '0 20px',
        }}
        bodyStyle={{ padding: '0 0 32px 0' }}
      >
        <Tabs defaultActiveKey="1" style={{ marginBottom: 0 }}>
          <TabPane
            // tab={<span style={{ fontWeight: 600, fontSize: 18 }}>Payment Request Details</span>}
            key="1"
          >
            <div>
              <Form
                className="create-request-form"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  date: dayjs(),
                  department: 'IT & Services',
                  division: 'Corporate Finance',
                  departmentHead: 'Cooper Lustin',
                  entity: 'FGI - Family Guardian Insurance',
                  paymentMode: 'Wire',
                  paymentType: 'Select payment type',
                }}
                component={false}
              >
                <Title
                  level={3}
                  style={{
                    marginBottom: '24px',
                    color: '#1A1A1A',
                    fontWeight: 700,
                    fontSize: '18px',
                  }}
                >
                  Payment Request Details
                </Title>

                <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                  <Col xs={24} sm={8}>
                    <div style={{ textAlign: 'left', marginBottom: 8 }}>
                      <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Date</label>
                    </div>
                    <Form.Item
                      name="date"
                      rules={[{ required: true, message: 'Please select date!' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <DatePicker className={styles.formDatePicker} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div style={{ textAlign: 'left', marginBottom: 8 }}>
                      <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Department</label>
                    </div>
                    <Form.Item name="department" style={{ marginBottom: 0 }}>
                      <Input className={styles.formInput} disabled />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div style={{ textAlign: 'left', marginBottom: 8 }}>
                      <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Division</label>
                    </div>
                    <Form.Item name="division" style={{ marginBottom: 0 }}>
                      <Input className={styles.formInput} disabled />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                  <Col xs={24} sm={8}>
                    <div style={{ textAlign: 'left', marginBottom: 8 }}>
                      <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Department Head</label>
                    </div>
                    <Form.Item
                      name="departmentHead"
                      rules={[{ required: true, message: 'Please select department head!' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Select 
                        className={styles.formSelect} 
                        style={{ width: '100%', border: '1px solid #A4A7AE' }}
                        placeholder="Select Department Head"
                      >
                        <Option value="Cooper Lustin">Cooper Lustin</Option>
                        <Option value="John Smith">John Smith</Option>
                        <Option value="Sarah Johnson">Sarah Johnson</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div style={{ textAlign: 'left', marginBottom: 8 }}>
                      <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Payment Mode</label>
                    </div>
                    <Form.Item
                      name="paymentMode"
                      rules={[{ required: true, message: 'Please select payment mode!' }]}
                      style={{ marginBottom: 0 }}
                    >
                      <Select
                        onChange={handlePaymentModeChange}
                        value={paymentMode}
                        className={styles.formSelect}
                        style={{ width: '100%', border: '1px solid #A4A7AE' }}
                        placeholder="Select Payment Mode"
                      >
                        <Option value="Cheque">Cheque</Option>
                        <Option value="Wire">Wire</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  {paymentMode === 'Cheque' ? (
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Payee Name</label>
                      </div>
                      <Form.Item
                        name="chequePayeeName"
                        rules={[{ required: true, message: 'Please enter payee name!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input 
                          className={styles.formInput} 
                          placeholder="Enter Payee Name"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  ) : (
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Payment Type</label>
                      </div>
                      <Form.Item
                        name="paymentType"
                        rules={[{ required: true, message: 'Please select payment type!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          onChange={handlePaymentTypeChange}
                          className={styles.formSelect}
                          style={{ width: '100%', border: '1px solid #A4A7AE' }}
                          placeholder="Select Payment Type"
                        >
                          <Option value="Benefit Payments">Benefit Payments</Option>
                          <Option value="Credit Card">Credit Card</Option>
                          <Option value="Capital Purchases">Capital Purchases</Option>
                          <Option value="Staff Reimbursement">Staff Reimbursement</Option>
                          <Option value="Employee Benefits">Employee Benefits</Option>
                          <Option value="Funding">Funding</Option>
                          <Option value="Intercompany Transfers">Intercompany Transfers</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  )}
                </Row>

                {paymentMode === 'Cheque' ? (
                  <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Entity</label>
                      </div>
                      <Form.Item
                        name="entity"
                        rules={[{ required: true, message: 'Please select entity!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          className={styles.formSelect}
                          style={{ width: '100%', border: '1px solid #A4A7AE' }}
                          onChange={handleEntityChange}
                          value={entity}
                          placeholder="Select Entity"
                        >
                          <Option value="FGI - Family Guardian Insurance">
                            FGI - Family Guardian Insurance
                          </Option>
                          <Option value="FGC - Family Guardian Claims">
                            FGC - Family Guardian Claims
                          </Option>
                          <Option value="FGG - Family Guardian Group">
                            FGG - Family Guardian Group
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Bank Account</label>
                      </div>
                      <Form.Item
                        name="creditCardBankAccount"
                        rules={[{ required: true, message: 'Please select bank account!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          className={styles.formSelect}
                          placeholder="Select Bank Account"
                          style={{ width: '100%', border: '1px solid #A4A7AE' }}
                        >
                          {(bankAccountsByEntity[entity] || []).map((acc) => (
                            <Option key={acc} value={acc}>
                              {acc}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>VAT Status</label>
                      </div>
                      <Form.Item
                        name="creditCardVatStatus"
                        rules={[{ required: true, message: 'Please select VAT status!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          onChange={handleVatStatusChange}
                          value={vatStatus}
                          placeholder="Select VAT Status"
                          className={styles.formSelect}
                          style={{ width: '100%' }}
                        >
                          <Option value="Vatable">Vatable</Option>
                          <Option value="Non-Vatable">Non-Vatable</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>TIN Number</label>
                      </div>
                      <Form.Item
                        name="creditCardTinNumber"
                        rules={[
                          vatStatus === 'Vatable'
                            ? { required: true, message: 'Please enter TIN number!' }
                            : {},
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          placeholder="Enter TIN Number"
                          className={styles.formInput}
                          disabled={vatStatus !== 'Vatable'}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Invoice Date</label>
                      </div>
                      <Form.Item
                        name="creditCardInvoiceDate"
                        rules={[{ required: true, message: 'Please select invoice date!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <DatePicker className={styles.formDatePicker} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Invoice #</label>
                      </div>
                      <Form.Item
                        name="creditCardInvoiceNumber"
                        rules={[{ required: true, message: 'Please enter invoice number!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Enter Invoice Number" className={styles.formInput} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div style={{ textAlign: 'left', marginBottom: 8 }}>
                        <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Currency</label>
                      </div>
                      <Form.Item
                        name="creditCardCurrency"
                        rules={[{ required: true, message: 'Please select currency!' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Select
                          className={styles.formSelect}
                          style={{ width: '100%', border: '1px solid #A4A7AE' }}
                          placeholder="Select Currency"
                        >
                          <Option value="BSD">BSD</Option>
                          <Option value="USD">USD</Option>
                          <Option value="CAD">CAD</Option>
                          <Option value="GBP">GBP</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                {/* Inline Credit Card Fields after Entity */}
                {paymentType === 'Credit Card' && <Row gutter={[24, 16]}></Row>}

                {/* Vendor Section */}
                <Card size="small" style={{ marginTop: '24px' }}>
                  <Title level={4} style={{ marginBottom: 8 }}>
                    Vendors
                  </Title>

                  <Form.List name="vendors">
                    {(fields, { add, remove }) => {
                      // Store the remove function for use in handlePaymentTypeChange
                      if (!vendorsList) {
                        setVendorsList({ remove });
                      }
                      return (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            style={{
                              border: '1px solid #e8e8e8',
                              padding: '16px',
                              marginBottom: '16px',
                              borderRadius: '6px',
                              position: 'relative',
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
                              <Title level={5} style={{ margin: 0 }}>
                                Vendor {name + 1}
                              </Title>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontWeight: 500, fontSize: 16, color: '#222' }}>
                                  Total:{' '}
                                  <span style={{ color: '#009688', fontWeight: 700 }}>
                                    $ USD 0.00
                                  </span>
                                </span>
                                {fields.length > 1 && (
                                  <Button
                                    type="link"
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                    danger
                                    style={{ padding: 0, marginLeft: 8 }}
                                  />
                                )}
                              </div>
                            </div>

                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={8}>
                                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                  <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Payee Name</label>
                                </div>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'payeeName']}
                                  rules={[{ required: true, message: 'Please enter payee name!' }]}
                                  style={{ marginBottom: 16 }}
                                >
                                  <Input
                                    className={styles.formInput}
                                    placeholder="Enter payee name"
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                  <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Account Holder Name</label>
                                </div>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'accountHolderName']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter account holder name!',
                                    },
                                  ]}
                                  style={{ marginBottom: 16 }}
                                >
                                  <Input
                                    className={styles.formInput}
                                    placeholder="Enter account holder name"
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                  <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Payee Bank Account</label>
                                </div>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'payeeBankAccount']}
                                  rules={[
                                    { required: true, message: 'Please select bank account!' },
                                  ]}
                                  style={{ marginBottom: 16 }}
                                >
                                  <Select
                                    className={styles.formSelect}
                                    style={{ width: '100%', border: '1px solid #A4A7AE' }}
                                    placeholder="Select bank account"
                                  >
                                    {(bankAccountsByEntity[entity] || []).map((acc) => (
                                      <Option key={acc} value={acc}>
                                        {acc}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                  <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Payee Bank Account Number</label>
                                </div>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'payeeBankAccountNumber']}
                                  rules={[
                                    { required: true, message: 'Please enter account number!' },
                                  ]}
                                  style={{ marginBottom: 16 }}
                                >
                                  <Input
                                    className={styles.formInput}
                                    placeholder="Enter account number"
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                  <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Bank Location</label>
                                </div>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'bankLocation']}
                                  rules={[{ required: true, message: 'Please select location!' }]}
                                  style={{ marginBottom: 16 }}
                                >
                                  <Select
                                    className={styles.formSelect}
                                    style={{ width: '100%', border: '1px solid #A4A7AE' }}
                                    placeholder="Select Location"
                                  >
                                    <Option value="Nassau">Nassau</Option>
                                    <Option value="Freeport">Freeport</Option>
                                    <Option value="Abaco">Abaco</Option>
                                    <Option value="Exuma">Exuma</Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                  <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Transit #</label>
                                </div>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'transitNumber']}
                                  rules={[
                                    { required: true, message: 'Please enter transit number!' },
                                  ]}
                                  style={{ marginBottom: 16 }}
                                >
                                  <Input
                                    className={styles.formInput}
                                    placeholder="Enter Transit #"
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                  <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Swift Code</label>
                                </div>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'swiftCode']}
                                  rules={[
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        // Only required if currency is not BSD
                                        const currency = getFieldValue([
                                          'vendors',
                                          name,
                                          'currency',
                                        ]);
                                        if (currency && currency !== 'BSD' && !value) {
                                          return Promise.reject('Please enter Swift Code!');
                                        }
                                        return Promise.resolve();
                                      },
                                    }),
                                  ]}
                                  style={{ marginBottom: 16 }}
                                >
                                  <Input
                                    className={styles.formInput}
                                    placeholder="Enter only if payment is not BSD"
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            {/* GL Details */}
                            <Title level={5} style={{ marginTop: '16px', marginBottom: 0 }}>
                              GL Details
                            </Title>
                            <Form.List name={[name, 'glDetails']}>
                              {(glFields, { add: addGL, remove: removeGL }) => (
                                <>
                                  {glFields.map(({ key: glKey, name: glName, ...glRestField }) => (
                                    <div
                                      key={glKey}
                                      style={{
                                        marginBottom: 24,
                                        border: '1px solid #e8e8e8',
                                        borderRadius: 8,
                                        padding: 16,
                                      }}
                                    >
                                      <Title level={5} style={{ marginBottom: 16 }}>
                                        GL Entry - {glName + 1}
                                      </Title>
                                      <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={8}>
                                          <Form.Item
                                            {...glRestField}
                                            name={[glName, 'account']}
                                            rules={[{ required: true, message: 'Required' }]}
                                            style={{ marginBottom: 16 }}
                                          >
                                            <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                              <label style={{ fontWeight: 500, color: '#1A1A1A' }}>GL Account</label>
                                            </div>
                                            <Select
                                              className={styles.formSelect}
                                              style={{ width: '100%', border: '1px solid #A4A7AE' }}
                                              placeholder="Select GL account"
                                            >
                                              <Option value="1000">1000 - Cash</Option>
                                              <Option value="2000">2000 - Receivables</Option>
                                            </Select>
                                          </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={8}>
                                          <Form.Item
                                            {...glRestField}
                                            name={[glName, 'amount']}
                                            rules={[{ required: true, message: 'Required' }]}
                                            style={{ marginBottom: 16 }}
                                          >
                                            <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                              <label style={{ fontWeight: 500, color: '#1A1A1A' }}>Amount</label>
                                            </div>
                                            <Input
                                              className={styles.formInput}
                                              style={{ width: '100%' }}
                                              placeholder="Please enter amount"
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                      <Row gutter={[16, 16]}>
                                        <Col xs={24}>
                                          <Form.Item
                                            {...glRestField}
                                            name={[glName, 'description']}
                                            rules={[{ required: true, message: 'Required' }]}
                                            style={{ marginBottom: 16 }}
                                          >
                                            <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                              <label style={{ fontWeight: 500, color: '#1A1A1A' }}>GL Description</label>
                                            </div>
                                            <Input.TextArea
                                              className={styles.formTextArea}
                                              style={{ width: '100%' }}
                                              rows={4}
                                              placeholder="Enter Description for GL Entry"
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                      {/* GL Entry Documents Section */}
                                      <div style={{ marginBottom: 24 }}>
                                        <div style={{ textAlign: 'left', marginBottom: 8 }}>
                                          <label style={{ fontWeight: 500, color: '#1A1A1A', fontSize: '16px' }}>GL Entry Documents</label>
                                        </div>
                                        <Form.Item
                                          {...glRestField}
                                          name={[glName, 'attachment']}
                                          valuePropName="fileList"
                                          getValueFromEvent={(e) =>
                                            Array.isArray(e) ? e : e && e.fileList
                                          }
                                          style={{ marginBottom: 16 }}
                                        >
                                          <Upload.Dragger
                                            {...uploadProps}
                                            multiple
                                            maxCount={3}
                                            className={styles.formUpload}
                                            style={{
                                              background: '#fafbfc',
                                              border: '1px dashed #d9d9d9',
                                              borderRadius: 8,
                                              padding: 24,
                                              width: '100%',
                                            }}
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.csv"
                                          >
                                            <p className="ant-upload-drag-icon" style={{ marginBottom: 8 }}>
                                              <UploadOutlined style={{ fontSize: 40, color: '#009688' }} />
                                            </p>
                                            <p style={{
                                              fontWeight: 500,
                                              fontSize: '14px',
                                              marginBottom: '4px',
                                              color: '#1A1A1A'
                                            }}>
                                              Click to upload or drag and drop files here
                                            </p>
                                            <p style={{
                                              color: '#666',
                                              fontSize: '13px',
                                              marginBottom: 0,
                                              lineHeight: '1.4'
                                            }}>
                                              Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, CSV
                                              <br />
                                              Maximum 3 files, up to 10 MB each
                                            </p>
                                            <Button
                                              type="primary"
                                              icon={<UploadOutlined />}
                                              style={{
                                                marginTop: '16px',
                                                backgroundColor: '#009688',
                                                borderColor: '#009688'
                                              }}
                                            >
                                              Browse Files
                                            </Button>
                                          </Upload.Dragger>
                                        </Form.Item>
                                      </div>
                                      <Button
                                        type="link"
                                        icon={<MinusCircleOutlined />}
                                        onClick={() => removeGL(glName)}
                                        danger
                                        size="small"
                                      >
                                        Remove GL Entry
                                      </Button>
                                    </div>
                                  ))}
                                  <Form.Item>
                                    <Button
                                      type="dashed"
                                      onClick={() => addGL()}
                                      icon={<PlusOutlined />}
                                      style={{ width: '100%' }}
                                    >
                                      Add GL Entry
                                    </Button>
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                          </div>
                        ))}
                        {/* Add Vendor button is only shown if payment type allows multiple vendors, or if no vendor exists yet */}
                        {(
                          paymentType === 'Credit Card' ||
                          paymentType === 'Staff Reimbursement'
                        ) || fields.length === 0 ? (
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                              style={{ width: '100%' }}
                              disabled={
                                paymentType !== 'Credit Card' &&
                                paymentType !== 'Staff Reimbursement' &&
                                fields.length >= 1
                              }
                            >
                              Add Vendor
                            </Button>
                          </Form.Item>
                        ) : null}
                      </>
                    )}}
                  </Form.List>
                </Card>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '16px',
                    marginTop: '32px',
                  }}
                >
                  <Button onClick={() => navigate('/requests')}>Cancel</Button>
                  <Button onClick={onSaveDraft}>Save as Draft</Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default CreateRequest;
