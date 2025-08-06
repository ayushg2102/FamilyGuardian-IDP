import React from 'react';
import { Card, Typography, Row, Col, Button, Tag, Input, Space, Spin, Alert } from 'antd';
import './RequestDetail.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequestById } from '../hooks/useRequestById';

import DocumentIcon from '../../assets/images/DetailDownloadIcon.svg';
import DetailDownloadIcon from '../../assets/images/Download.svg';
const { Title, Text } = Typography;
const { TextArea } = Input;

const RequestDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, requestData, formatCurrency, formatDate, getStatusColor } = useRequestById(id);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Error Loading Request"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (!requestData) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Request Not Found"
          description="The requested payment request could not be found."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/requests')} 
          size="large"
          style={{ marginBottom: '8px' }}
        />
        <Title level={2} style={{ margin: 0, fontSize: 'clamp(20px, 5vw, 28px)' }}>
          REQ-{String(requestData.RequestId).padStart(6, '0')}
        </Title>
      </div>

      <Row gutter={[16, 16]} style={{ margin: '0 -8px' }}>
        <Col xs={24} lg={16} style={{ padding: '0 8px' }}>
          <Card>
            <Title level={3} style={{ marginBottom: '24px' }}>
              Payment Request Details
            </Title>

            <Row gutter={[16, 16]} style={{ margin: '0 -8px 16px' }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Entity</Text><br />
                <Text>{requestData.Entity || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Payment Mode</Text><br />
                <Text>{requestData.PaymentMode || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Payment Type</Text><br />
                <Text>{requestData.PaymentType || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Department</Text><br />
                <Text>{requestData.Department || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Division</Text><br />
                <Text>{requestData.Division || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Bank Name</Text><br />
                <Text>{requestData.BankName || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Account Holder Name</Text><br />
                <Text>{requestData.AccountHolderName || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Payee Bank Account Number</Text><br />
                <Text>{requestData.PayeeBankAccountNumber || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Transit #</Text><br />
                <Text>{requestData.Transit || '-'}</Text>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text type="secondary" strong>Bank Location</Text><br />
                <Text>{requestData.BankLocation || '-'}</Text>
              </Col>
            </Row>

            <div style={{ marginTop: '32px' }}>
              <Title level={4}>Vendor Details</Title>
              {requestData.Vendors && requestData.Vendors.length > 0 ? (
                requestData.Vendors.map((vendor, vendorIndex) => (
                  <Card key={vendorIndex} size="small" style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Row gutter={[8, 16]} style={{ minWidth: '600px' }}>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>Payee Name</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{vendor.PayeeName || '-'}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>Account Holder</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{vendor.AccountHolderName || '-'}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>Bank Account</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{vendor.BankAccount || '-'}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>VAT Status</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{vendor.VatStatus || '-'}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>TIN Number</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{vendor.TinNumber || '-'}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>Invoice Date</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{formatDate(vendor.InvoiceDate) || '-'}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>Invoice Number</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{vendor.InvoiceNumber || '-'}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        <Text strong>Currency</Text>
                        <div style={{ marginTop: 4 }}>
                          <Text>{vendor.Currency || '-'}</Text>
                        </div>
                      </Col>
                    </Row>
                    
                    {/* GL Account Entries */}
                    <div style={{ marginTop: 32 }}>
                      <Title level={4} style={{ marginBottom: 16 }}>
                        GL Account Entries
                      </Title>
                      {vendor.GLEntries && vendor.GLEntries.length > 0 ? (
                        vendor.GLEntries.map((entry, idx) => (
                          <Card
                            key={idx}
                            size="small"
                            style={{ marginBottom: 16, border: '1px solid #e5e5e5' }}
                            bodyStyle={{ padding: '12px 16px' }}
                          >
                            <Row gutter={[8, 8]}>
                              <Col xs={24} md={8}>
                                <Text strong>GL Account</Text>
                                <div style={{ marginTop: 4 }}>
                                  <Text>{entry.GLAccount || '-'}</Text>
                                </div>
                              </Col>
                              <Col xs={24} md={10}>
                                <Text strong>Description</Text>
                                <div style={{ marginTop: 4 }}>
                                  <Text>{entry.GLDescription || '-'}</Text>
                                </div>
                              </Col>
                              <Col xs={24} md={6}>
                                <Text strong>Amount</Text>
                                <div style={{ marginTop: 4 }}>
                                  <Text strong style={{ color: 'var(--primary-color)' }}>
                                    {entry.Amount ? formatCurrency(parseFloat(entry.Amount), vendor.Currency) : '-'}
                                  </Text>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        ))
                      ) : (
                        <Text type="secondary">No GL entries found</Text>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Text type="secondary">No vendor details found</Text>
              )}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>
                Request Summary
              </Title>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Total Amount</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {formatCurrency(requestData.total_amount)}
                </div>
              </div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>Initiator</Text>
                  <br />
                  <Text strong>{requestData.Initiator}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>Submitted Date</Text>
                  <br />
                  <Text strong>{formatDate(requestData.CreatedOn)}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>Vendor Count</Text>
                  <br />
                  <Text strong>{requestData.vendor_count}</Text>
                </Col>
                <Col span={12}>
                  <Text style={{ color: '#666' }}>GL Entries</Text>
                  <br />
                  <Text strong>{requestData.gl_account_count}</Text>
                </Col>
              </Row>
            </Card>
            
            <Card>
              <Title level={4} style={{ marginBottom: 16 }}>
                Approval History
              </Title>
              {requestData.Approvals && requestData.Approvals.length > 0 ? (
                requestData.Approvals.map((approval, index) => (
                  <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #f0f0f0', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text strong>{approval.Stage}</Text>
                      <Tag color={getStatusColor(approval.Action)}>
                        {approval.Action}
                      </Tag>
                    </div>
                    {approval.Remarks && (
                      <div style={{ marginBottom: '8px', color: '#666' }}>
                        {approval.Remarks}
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
                      <span>By: {approval.PerformedByUserName}</span>
                      <span>{formatDate(approval.PerformedAt)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <Text type="secondary">No approval history found</Text>
              )}
            </Card>

            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>
                Current Status
              </Title>
              <div style={{ marginBottom: '16px' }}>
                <Tag color={getStatusColor(requestData.Status)} style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {requestData.Status}
                </Tag>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>Current Stage: </Text>
                <Text>{requestData.current_stage}</Text>
              </div>
              {requestData.LastRemarks && (
                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Last Remarks: </Text>
                  <Text>{requestData.LastRemarks}</Text>
                </div>
              )}
            </Card>

            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>
                Action Required
              </Title>
              <TextArea rows={4} placeholder="*Add Comments" style={{ marginBottom: '16px' }} />
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" size="large" style={{ width: '100%' }}>
                  Approve
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
