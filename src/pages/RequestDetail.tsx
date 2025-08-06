import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Button, Tag, Input, Space, Spin, Alert, Select, DatePicker } from 'antd';
import './RequestDetail.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequestById } from '../hooks/useRequestById';

import DocumentIcon from '../../assets/images/DetailDownloadIcon.svg';
import DetailDownloadIcon from '../../assets/images/Download.svg';
import dayjs from 'dayjs';
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const RequestDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, requestData, formatCurrency, formatDate, getStatusColor } = useRequestById(id);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableData, setEditableData] = useState<any>(null);

  // Initialize editable data when requestData changes
  useEffect(() => {
    if (requestData) {
      setEditableData(JSON.parse(JSON.stringify(requestData)));
    }
  }, [requestData]);

  // Function to handle saving changes
  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the changes
      console.log('Saving changes:', editableData);
      // For now, just exit edit mode
      setIsEditMode(false);
      // You could show a success message here
    } catch (error) {
      console.error('Error saving changes:', error);
      // You could show an error message here
    }
  };

  // Function to handle canceling edit mode
  const handleCancel = () => {
    // Reset editable data to original request data
    if (requestData) {
      setEditableData(JSON.parse(JSON.stringify(requestData)));
    }
    setIsEditMode(false);
  };

  // Helper function to render editable fields
  const renderEditableField = (label: string, value: any, fieldPath: string, type: 'text' | 'select' | 'date' | 'textarea' = 'text', options?: string[]) => {
    const getValue = (path: string) => {
      const keys = path.split('.');
      let current = editableData;
      for (const key of keys) {
        if (current && typeof current === 'object') {
          current = current[key];
        } else {
          return '';
        }
      }
      return current || '';
    };

    const setValue = (path: string, newValue: any) => {
      const keys = path.split('.');
      const newData = { ...editableData };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = newValue;
      setEditableData(newData);
    };

    if (!isEditMode) {
      return (
        <>
          <Text type="secondary" strong>{label}</Text><br />
          <Text>{type === 'date' && value ? formatDate(value) : (value || '-')}</Text>
        </>
      );
    }

    const currentValue = getValue(fieldPath);

    switch (type) {
      case 'select':
        return (
          <>
            <Text type="secondary" strong>{label}</Text><br />
            <Select
              value={currentValue}
              onChange={(val) => setValue(fieldPath, val)}
              style={{ width: '100%', marginTop: 4 }}
              size="small"
            >
              {options?.map(option => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Select>
          </>
        );
      case 'date':
        return (
          <>
            <Text type="secondary" strong>{label}</Text><br />
            <DatePicker
              value={currentValue ? dayjs(currentValue) : null}
              onChange={(date) => setValue(fieldPath, date ? date.format('YYYY-MM-DD') : '')}
              style={{ width: '100%', marginTop: 4 }}
              size="small"
            />
          </>
        );
      case 'textarea':
        return (
          <>
            <Text type="secondary" strong>{label}</Text><br />
            <TextArea
              value={currentValue}
              onChange={(e) => setValue(fieldPath, e.target.value)}
              style={{ marginTop: 4 }}
              size="small"
              rows={2}
            />
          </>
        );
      default:
        return (
          <>
            <Text type="secondary" strong>{label}</Text><br />
            <Input
              value={currentValue}
              onChange={(e) => setValue(fieldPath, e.target.value)}
              style={{ marginTop: 4 }}
              size="small"
            />
          </>
        );
    }
  };

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
        <div style={{ display: 'flex', gap: '8px' }}>
          {isEditMode ? (
            <>
              <Button 
                onClick={handleSave}
                type="primary"
                size="large"
                style={{ 
                  marginBottom: '8px'
                }}
              >
                Save Changes
              </Button>
              <Button 
                onClick={handleCancel}
                size="large"
                style={{ 
                  marginBottom: '8px'
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditMode(true)}
              size="large"
              style={{ 
                marginBottom: '8px'
              }}
            >
              Edit Request
            </Button>
          )}
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ margin: '0 -8px' }}>
        <Col xs={24} lg={16} style={{ padding: '0 8px' }}>
          <Card>
            <Title level={3} style={{ marginBottom: '24px' }}>
              Payment Request Details
            </Title>

            <Row gutter={[16, 16]} style={{ margin: '0 -8px 16px' }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Entity', requestData.Entity, 'Entity', 'select', ['Entity 1', 'Entity 2', 'Entity 3'])}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Payment Mode', requestData.PaymentMode, 'PaymentMode', 'select', ['Bank Transfer', 'Cheque', 'Cash'])}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Payment Type', requestData.PaymentType, 'PaymentType', 'select', ['Regular', 'Urgent', 'Scheduled'])}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Department', requestData.Department, 'Department')}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Division', requestData.Division, 'Division')}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Bank Name', requestData.BankName, 'BankName')}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Account Holder Name', requestData.AccountHolderName, 'AccountHolderName')}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Payee Bank Account Number', requestData.PayeeBankAccountNumber, 'PayeeBankAccountNumber')}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Transit #', requestData.Transit, 'Transit')}
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                {renderEditableField('Bank Location', requestData.BankLocation, 'BankLocation')}
              </Col>
            </Row>

            <div style={{ marginTop: '32px' }}>
              <Title level={4}>Vendor Details</Title>
              {requestData.Vendors && requestData.Vendors.length > 0 ? (
                requestData.Vendors.map((vendor, vendorIndex) => (
                  <Card key={vendorIndex} size="small" style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Row gutter={[8, 16]} style={{ minWidth: '600px' }}>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('Payee Name', vendor.PayeeName, `Vendors.${vendorIndex}.PayeeName`)}
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('Account Holder', vendor.AccountHolderName, `Vendors.${vendorIndex}.AccountHolderName`)}
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('Bank Account', vendor.BankAccount, `Vendors.${vendorIndex}.BankAccount`)}
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('VAT Status', vendor.VatStatus, `Vendors.${vendorIndex}.VatStatus`, 'select', ['Vatable', 'Non-Vatable'])}
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('TIN Number', vendor.TinNumber, `Vendors.${vendorIndex}.TinNumber`)}
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('Invoice Date', vendor.InvoiceDate, `Vendors.${vendorIndex}.InvoiceDate`, 'date')}
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('Invoice Number', vendor.InvoiceNumber, `Vendors.${vendorIndex}.InvoiceNumber`)}
                      </Col>
                      <Col xs={12} sm={6} style={{ padding: '0 8px' }}>
                        {renderEditableField('Currency', vendor.Currency, `Vendors.${vendorIndex}.Currency`, 'select', ['USD', 'EUR', 'GBP', 'CAD'])}
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
                                {renderEditableField('GL Account', entry.GLAccount, `Vendors.${vendorIndex}.GLEntries.${idx}.GLAccount`)}
                              </Col>
                              <Col xs={24} md={10}>
                                {renderEditableField('Description', entry.GLDescription, `Vendors.${vendorIndex}.GLEntries.${idx}.GLDescription`, 'textarea')}
                              </Col>
                              <Col xs={24} md={6}>
                                {isEditMode ? (
                                  renderEditableField('Amount', entry.Amount, `Vendors.${vendorIndex}.GLEntries.${idx}.Amount`)
                                ) : (
                                  <>
                                    <Text type="secondary" strong>Amount</Text><br />
                                    <Text strong style={{ color: 'var(--primary-color)' }}>
                                      {entry.Amount ? formatCurrency(parseFloat(entry.Amount), vendor.Currency) : '-'}
                                    </Text>
                                  </>
                                )}
                              </Col>
                            </Row>
                            
                            {/* Attachments Section */}
                            {entry.Attachments && entry.Attachments.length > 0 && (
                              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
                                <Text strong style={{ marginBottom: 8, display: 'block' }}>Documents:</Text>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                  {entry.Attachments.map((attachment, attachmentIdx) => (
                                    <div
                                      key={attachmentIdx}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px 12px',
                                        border: '1px solid #d9d9d9',
                                        borderRadius: '6px',
                                        backgroundColor: '#fafafa',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                      }}
                                      onClick={() => window.open(attachment.File, '_blank')}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f0f0f0';
                                        e.currentTarget.style.borderColor = '#40a9ff';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#fafafa';
                                        e.currentTarget.style.borderColor = '#d9d9d9';
                                      }}
                                    >
                                      <img 
                                        src={DocumentIcon} 
                                        alt="Document" 
                                        style={{ width: 16, height: 16, marginRight: 8 }} 
                                      />
                                      <Text style={{ fontSize: '12px', color: '#666' }}>
                                        Document {attachmentIdx + 1}
                                      </Text>
                                      <img 
                                        src={DetailDownloadIcon} 
                                        alt="Download" 
                                        style={{ width: 12, height: 12, marginLeft: 8 }} 
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
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
