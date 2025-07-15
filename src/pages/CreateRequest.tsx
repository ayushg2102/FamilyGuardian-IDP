import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Card, Typography, Row, Col, Space, Upload, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const CreateRequest: React.FC = () => {
  const [form] = Form.useForm();
  const [paymentMode, setPaymentMode] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const navigate = useNavigate();

  const handlePaymentModeChange = (value: string) => {
    setPaymentMode(value);
  };

  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value);
  };

  const onFinish = (values: any) => {
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
    onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Create New Request</Title>
          <Text style={{ color: '#666' }}>Payment Request Portal / Create New Request</Text>
        </div>
        {/* <Button onClick={() => navigate('/dashboard')}>Go To Figma Dashboard</Button> */}
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            date: dayjs(),
            department: 'IT & Services',
            division: 'Corporate Finance',
            departmentHead: 'Cooper Lustin',
            entity: 'FGI - Family Guardian Insurance',
            paymentMode: 'Cheque',
            paymentType: 'Select payment type'
          }}
        >
          <Title level={3} style={{ marginBottom: '24px' }}>Payment Request Details</Title>
          
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select date!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Department" name="department">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="Division" name="division">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Department Head"
                name="departmentHead"
                rules={[{ required: true, message: 'Please select department head!' }]}
              >
                <Select>
                  <Option value="Cooper Lustin">Cooper Lustin</Option>
                  <Option value="John Smith">John Smith</Option>
                  <Option value="Sarah Johnson">Sarah Johnson</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Payment Mode"
                name="paymentMode"
                rules={[{ required: true, message: 'Please select payment mode!' }]}
              >
                <Select onChange={handlePaymentModeChange}>
                  <Option value="Cheque">Cheque</Option>
                  <Option value="Wire">Wire</Option>
                  <Option value="ACH">ACH</Option>
                  <Option value="Credit Card">Credit Card</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Payment Type"
                name="paymentType"
                rules={[{ required: true, message: 'Please select payment type!' }]}
              >
                <Select onChange={handlePaymentTypeChange}>
                  <Option value="Capital Purchases">Capital Purchases</Option>
                  <Option value="Corporate Payment">Corporate Payment</Option>
                  <Option value="Staff Reimbursement">Staff Reimbursement</Option>
                  <Option value="Benefit Payments">Benefit Payments</Option>
                  <Option value="Funding">Funding</Option>
                  <Option value="Employee Benefits">Employee Benefits</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Entity"
                name="entity"
                rules={[{ required: true, message: 'Please select entity!' }]}
              >
                <Select>
                  <Option value="FGI - Family Guardian Insurance">FGI - Family Guardian Insurance</Option>
                  <Option value="FGC - Family Guardian Claims">FGC - Family Guardian Claims</Option>
                  <Option value="FGG - Family Guardian Group">FGG - Family Guardian Group</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Conditional VAT Details for Wire Payment */}
          {paymentMode === 'Wire' && (
            <Card size="small" style={{ marginTop: '24px', background: '#fafafa' }}>
              <Title level={4}>VAT Details</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="VAT Status"
                    name="vatStatus"
                    rules={[{ required: true, message: 'Please select VAT status!' }]}
                  >
                    <Select>
                      <Option value="Vatable">Vatable</Option>
                      <Option value="Non-Vatable">Non-Vatable</Option>
                      <Option value="Exempt">Exempt</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="TIN Number"
                    name="tinNumber"
                    rules={[{ required: true, message: 'Please enter TIN number!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Invoice Date"
                    name="invoiceDate"
                    rules={[{ required: true, message: 'Please select invoice date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}

          {/* Vendor Section */}
          <Card size="small" style={{ marginTop: '24px' }}>
            <Title level={4}>Vendor Information</Title>
            
            <Form.List name="vendors">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ border: '1px solid #e8e8e8', padding: '16px', marginBottom: '16px', borderRadius: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <Title level={5}>Vendor {name + 1}</Title>
                        {fields.length > 1 && (
                          <Button
                            type="link"
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(name)}
                            danger
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'payeeName']}
                            label="Payee Name"
                            rules={[{ required: true, message: 'Please enter payee name!' }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'accountHolderName']}
                            label="Account Holder Name"
                            rules={[{ required: true, message: 'Please enter account holder name!' }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'bankAccount']}
                            label="Bank Account"
                            rules={[{ required: true, message: 'Please enter bank account!' }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* GL Details */}
                      <Title level={5} style={{ marginTop: '16px' }}>GL Details</Title>
                      <Form.List name={[name, 'glDetails']}>
                        {(glFields, { add: addGL, remove: removeGL }) => (
                          <>
                            {glFields.map(({ key: glKey, name: glName, ...glRestField }) => (
                              <Row key={glKey} gutter={[16, 16]} style={{ marginBottom: '8px' }}>
                                <Col xs={24} sm={6}>
                                  <Form.Item
                                    {...glRestField}
                                    name={[glName, 'account']}
                                    label="GL Account"
                                    rules={[{ required: true, message: 'Required' }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={8}>
                                  <Form.Item
                                    {...glRestField}
                                    name={[glName, 'description']}
                                    label="GL Description"
                                    rules={[{ required: true, message: 'Required' }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={6}>
                                  <Form.Item
                                    {...glRestField}
                                    name={[glName, 'amount']}
                                    label="Amount"
                                    rules={[{ required: true, message: 'Required' }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={3}>
                                  <Form.Item
                                    {...glRestField}
                                    name={[glName, 'attachment']}
                                    label="Attachment"
                                  >
                                    <Upload {...uploadProps}>
                                      <Button icon={<UploadOutlined />} size="small">Upload</Button>
                                    </Upload>
                                  </Form.Item>
                                </Col>
                                <Col xs={24} sm={1}>
                                  <Form.Item label=" ">
                                    <Button
                                      type="link"
                                      icon={<MinusCircleOutlined />}
                                      onClick={() => removeGL(glName)}
                                      danger
                                      size="small"
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
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
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      style={{ width: '100%' }}
                    >
                      Add Vendor
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px' }}>
            <Button onClick={() => navigate('/requests')}>Cancel</Button>
            <Button onClick={onSaveDraft}>Save as Draft</Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateRequest;