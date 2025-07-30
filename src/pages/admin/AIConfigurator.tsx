import React from 'react';
import { Card, Switch, Timeline, Typography, Space, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { notify } from '../../components/common/notification';

const { Title, Text } = Typography;

interface AIRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

const AIConfigurator: React.FC = () => {
  const aiRules: AIRule[] = [
    {
      id: 'RULE001',
      name: 'Invoice Amount Validation',
      description: 'Validates if the invoice amount matches with line items total',
      isActive: true,
    },
    {
      id: 'RULE002',
      name: 'Date Validation',
      description: 'Checks if invoice date is within acceptable range',
      isActive: true,
    },
    {
      id: 'RULE003',
      name: 'Invoice Number Validation',
      description: 'Verifies invoice number format and uniqueness',
      isActive: true,
    },
    {
      id: 'RULE004',
      name: 'VAT TIN Validation',
      description: 'Validates VAT/TIN number format and authenticity',
      isActive: false,
    },
    {
      id: 'RULE005',
      name: 'Bank Details Validation',
      description: 'Verifies bank account details against master data',
      isActive: true,
    },
  ];

  const handleRuleToggle = (ruleId: string, checked: boolean) => {
    notify(
      'success',
      'Rule Updated',
      `Rule ${ruleId} has been ${checked ? 'activated' : 'deactivated'}`,
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>AI Agent Configuration</Title>
      
      <Row gutter={[24, 24]}>
        {/* Left Column - AI Agent Configuration */}
        <Col xs={24} md={14} lg={16}>
          <Card title="AI Agent Configuration" style={{ height: '100%' }}>
            <div
              style={{
                display: 'grid',
                gap: '16px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              }}
            >
              {aiRules.map((rule) => (
                <Card
                  key={rule.id}
                  size="small"
                  title={
                    <Text ellipsis={{ tooltip: rule.name }}>
                      {rule.name}
                    </Text>
                  }
                  extra={
                    <Switch
                      checked={rule.isActive}
                      onChange={(checked) => handleRuleToggle(rule.id, checked)}
                    />
                  }
                  style={{ marginBottom: 0 }}
                >
                  <Text type="secondary">{rule.description}</Text>
                </Card>
              ))}
            </div>
          </Card>
        </Col>
        
        {/* Right Column - Recent Changes */}
        <Col xs={24} md={10} lg={8}>
          <Card title="Recent Changes" style={{ height: '100%' }}>
            <Timeline>
              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                <Space direction="vertical" size={0}>
                  <Text strong>Rule 'VAT TIN Validation' deactivated</Text>
                  <Text type="secondary">By Admin User - July 23, 2025 14:30</Text>
                </Space>
              </Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                <Space direction="vertical" size={0}>
                  <Text strong>Rule 'Bank Details Validation' activated</Text>
                  <Text type="secondary">By Admin User - July 23, 2025 13:15</Text>
                </Space>
              </Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                <Space direction="vertical" size={0}>
                  <Text strong>Rule 'Invoice Number Validation' updated</Text>
                  <Text type="secondary">By System - July 23, 2025 10:45</Text>
                </Space>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AIConfigurator;
