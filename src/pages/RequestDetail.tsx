import React from 'react';
import { Card, Typography, Row, Col, Button, Tag, Descriptions, Input, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { requestDetailData, requestDetailVendor } from '../mock/mockData';

const { Title, Text } = Typography;
const { TextArea } = Input;

const RequestDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const requestData = { ...requestDetailData, requestNo: id || requestDetailData.requestNo };
  const vendorDetails = requestDetailVendor;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/requests')}
          size="large"
        />
        <Title level={2} style={{ margin: 0 }}>{requestData.requestNo}</Title>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card>
            <Title level={3} style={{ marginBottom: '24px' }}>Payment Request Details</Title>
            
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="Entity">{requestData.entity}</Descriptions.Item>
              <Descriptions.Item label="Payment Mode">{requestData.paymentMode}</Descriptions.Item>
              <Descriptions.Item label="Payment Type">{requestData.paymentType}</Descriptions.Item>
              <Descriptions.Item label="Department">{requestData.department}</Descriptions.Item>
              <Descriptions.Item label="Division">{requestData.division}</Descriptions.Item>
              <Descriptions.Item label="Bank Name">{requestData.bankName}</Descriptions.Item>
              <Descriptions.Item label="Account Holder Name">{requestData.accountHolderName}</Descriptions.Item>
              <Descriptions.Item label="Payee Bank Account Number">{requestData.payeeBankAccountNumber}</Descriptions.Item>
              <Descriptions.Item label="Transit #">{requestData.transitNo}</Descriptions.Item>
              <Descriptions.Item label="Bank Location">{requestData.bankLocation}</Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: '32px' }}>
              <Title level={4}>Vendor Details</Title>
              <Card size="small" style={{ marginTop: '16px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Text strong>Payee Name</Text>
                    <br />
                    <Text>{vendorDetails.payeeName}</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>Account Holder Name</Text>
                    <br />
                    <Text>{vendorDetails.accountHolderName}</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>Bank Account</Text>
                    <br />
                    <Text>{vendorDetails.bankAccount}</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>VAT Status</Text>
                    <br />
                    <Text>{vendorDetails.vatStatus}</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>TIN Number</Text>
                    <br />
                    <Text>{vendorDetails.tinNumber}</Text>
                  </Col>
                  <Col span={8}>
                    <Text strong>Invoice Date</Text>
                    <br />
                    <Text>{vendorDetails.invoiceDate}</Text>
                  </Col>
                </Row>
              </Card>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>Request Summary</Title>
              
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Total Amount</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                  {requestData.totalAmount}
                </div>
              </div>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>Initiator</Text>
                  <br />
                  <Text strong>{requestData.initiator}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>Submitted Date</Text>
                  <br />
                  <Text strong>{requestData.submittedDate}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>Vendor</Text>
                  <br />
                  <Text strong>{requestData.vendors}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>GL Entries</Text>
                  <br />
                  <Text strong>{requestData.glEntries}</Text>
                </Col>
              </Row>
            </Card>

            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>Recommendation by AI</Title>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                  AI
                </div>
                <Text>{requestData.aiRecommendation}</Text>
              </div>
              
              <Tag color="green" style={{ marginBottom: '16px' }}>
                Confidence: {requestData.confidence}
              </Tag>
            </Card>

            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>Action Required</Title>
              
              <TextArea
                rows={4}
                placeholder="*Add Comments"
                style={{ marginBottom: '16px' }}
              />
              
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" size="large" style={{ width: '100%' }}>
                  Approve
                </Button>
                <Button size="large" style={{ width: '100%' }}>
                  Return
                </Button>
                <Button size="large" style={{ width: '100%' }}>
                  Reject
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default RequestDetail;