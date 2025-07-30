import React from 'react';
import { Card, Typography, Row, Col, Button, Tag, Input, Space } from 'antd';
import './RequestDetail.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { requestDetailData, requestDetailVendor } from '../mock/mockData';

import DocumentIcon from '../../assets/images/DetailDownloadIcon.svg';
import DetailDownloadIcon from '../../assets/images/Download.svg';
const { Title, Text } = Typography;
const { TextArea } = Input;

const RequestDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const requestData = { ...requestDetailData, requestNo: id || requestDetailData.requestNo };
  const vendorDetails = requestDetailVendor;

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
          {requestData.requestNo}
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
    <Text>{requestData.entity || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Payment Mode</Text><br />
    <Text>{requestData.paymentMode || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Payment Type</Text><br />
    <Text>{requestData.paymentType || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Department</Text><br />
    <Text>{requestData.department || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Division</Text><br />
    <Text>{requestData.division || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Bank Name</Text><br />
    <Text>{requestData.bankName || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Account Holder Name</Text><br />
    <Text>{requestData.accountHolderName || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Payee Bank Account Number</Text><br />
    <Text>{requestData.payeeBankAccountNumber || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Transit #</Text><br />
    <Text>{requestData.transitNo || '-'}</Text>
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    <Text type="secondary" strong>Bank Location</Text><br />
    <Text>{requestData.bankLocation || '-'}</Text>
  </Col>
</Row>

            <div style={{ marginTop: '32px' }}>
              <Title level={4}>Vendor Details</Title>
              <Card size="small" style={{ marginTop: '16px', overflowX: 'auto' }}>
                <Row gutter={[8, 16]} style={{ minWidth: '600px' }}>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>Payee Name</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text ellipsis={{ tooltip: vendorDetails.payeeName || '-' }}>
                        {vendorDetails.payeeName || '-'}
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>Account Holder</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text ellipsis={{ tooltip: vendorDetails.accountHolderName || '-' }}>
                        {vendorDetails.accountHolderName || '-'}
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>Bank Account</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text ellipsis={{ tooltip: vendorDetails.bankAccount || '-' }}>
                        {vendorDetails.bankAccount || '-'}
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>VAT Status</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text ellipsis={{ tooltip: vendorDetails.vatStatus || '-' }}>
                        {vendorDetails.vatStatus || '-'}
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>TIN Number</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text ellipsis={{ tooltip: vendorDetails.tinNumber || '-' }}>
                        {vendorDetails.tinNumber || '-'}
                      </Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>Invoice Date</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text>{vendorDetails.invoiceDate || '-'}</Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>Bank Location</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text>Florida</Text>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                    <Text strong>Swift Code</Text>
                    <div style={{ marginTop: 4 }}>
                      <Text>BR1222</Text>
                    </div>
                  </Col>
                </Row>
                {/* GL Account Entries Section (nested inside Vendor Details) */}
                <div style={{ marginTop: 32 }}>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    GL Account Entries
                  </Title>
                  {Array.isArray(requestData.glEntriesList) && requestData.glEntriesList.length > 0 ? (
                    <>
                      {requestData.glEntriesList.map((entry: any, idx: number) => (
                        <Card
                          key={idx}
                          size="small"
                          style={{ 
                            marginBottom: 16, 
                            border: '1px solid #e5e5e5',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                          bodyStyle={{ padding: '12px 16px' }}
                        >
                          <Row gutter={[8, 8]} style={{ margin: 0 }}>
                            <Col xs={24} sm={24} md={8} style={{ marginBottom: 8 }}>
                              <Text strong>GL Account</Text>
                              <div style={{ marginTop: 4 }}>
                                <Text ellipsis={{ tooltip: entry.glAccount || '-' }}>
                                  {entry.glAccount || '-'}
                                </Text>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={10} style={{ marginBottom: 8, padding: '0 8px' }}>
                              <Text strong>Description</Text>
                              <div style={{ marginTop: 4 }}>
                                <Text ellipsis={{ tooltip: entry.description || '-' }}>
                                  {entry.description || '-'}
                                </Text>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={6} style={{ textAlign: 'left' }} className="amount-col">
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong className="amount-label">Amount:</Text>
                                <Text strong style={{ fontSize: 16, color: 'var(--primary-color)' }}>
                                  {entry.amount ? `USD ${entry.amount.toLocaleString()}` : '-'}
                                </Text>
                              </div>
                            </Col>
                          </Row>
                          {Array.isArray(entry.attachments) && entry.attachments.length > 0 && (
                            <div style={{ marginTop: 12 }}>
                              <Text style={{ color: '#888' }}>Attachments</Text>
                              {entry.attachments.map((file: any, i: number) => (
                                <div
                                  key={i}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    background: '#F8F9FB',
                                    borderRadius: 8,
                                    padding: '8px 12px',
                                    marginTop: 8,
                                    minHeight: 44,
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                                  }}
                                >
                                  {/* File type icon (PDF or generic) */}
                                  <img
                                    src={DocumentIcon}
                                    alt="File"
                                    style={{ width: 24, height: 24, flexShrink: 0 }}
                                  />
                                  {/* Filename */}
                                  <span
                                    style={{
                                      flex: 1,
                                      color: '#23272E',
                                      fontWeight: 500,
                                      fontSize: 15,
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      cursor: 'pointer',
                                      textDecoration: 'underline',
                                    }}
                                    title={file.name || 'File'}
                                  >
                                    {file.name || 'File'}
                                  </span>
                                  {/* File size */}
                                  <span style={{ color: '#949494', fontSize: 13, marginRight: 8 }}>
                                    {file.size ? `Size: ${file.size}` : ''}
                                  </span>
                                  {/* Download icon */}
                                  <img
                                    src={DetailDownloadIcon}
                                    alt="Download"
                                    style={{ width: 22, height: 22, cursor: 'pointer' }}
                                    title="Download"
                                    onClick={() => {
                                      // Download logic here (could use file.url)
                                      if (file.url) {
                                        window.open(file.url, '_blank');
                                      }
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                      ))}
                    </>
                  ) : (
                    <Text type="secondary">No GL Account Entries</Text>
                  )}
                </div>
              </Card>
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
  <Title level={4} style={{ marginBottom: 16 }}>
    Approval History
  </Title>
  {/* Approval history card, can be mapped if multiple histories exist */}
  <div className="approval-history-card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
      <Text strong className="request-number">
        REQ-000103
      </Text>
      <span className="status-badge">
        Returned
      </span>
    </div>
    <div className="approval-message">
      Budget exceeded for this quarter. Please resubmit in Q3 with revised specifications.
    </div>
    <div className="approval-footer">
      <span className="approval-by">
        By: <span className="approver-name">{'Sarah John (Finance Team)'}</span>
      </span>
      <span className="approval-date">
        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" rx="4" fill="#fff"/><path d="M6 8h8M8.5 11h3M10 4v2m0 8v2m6-6a6 6 0 11-12 0 6 6 0 0112 0z" stroke="#00A383" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        07/03/2025
      </span>
    </div>
  </div>
</Card>

            <Card>
              <Title level={4} style={{ marginBottom: '16px' }}>
                Recommendation by AI
              </Title>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--text-main)',
                    color: 'var(--text-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}
                >
                  AI
                </div>
                <Text>{requestData.aiRecommendation}</Text>
              </div>

              <Tag color="green" style={{ marginBottom: '16px' }}>
                Confidence: {requestData.confidence}
              </Tag>
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
}

export default RequestDetail;
