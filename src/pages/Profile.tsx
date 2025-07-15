import React from 'react';
import { Card, Avatar, Typography, Row, Col, Divider } from 'antd';
import { profileData } from '../mock/mockData';

const { Title, Text, Paragraph } = Typography;

const Profile: React.FC = () => {
  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card
          style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 32 }}
          bodyStyle={{ padding: 32 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Avatar size={100} src={profileData.avatar} style={{ border: '4px solid #00b894' }} />
            <div>
              <Title level={2} style={{ marginBottom: 0 }}>{profileData.name}</Title>
              <Text type="secondary" style={{ fontSize: 16 }}>{profileData.role}</Text>
              <div style={{ marginTop: 8 }}>
                <Text strong>Email:</Text> <Text>{profileData.email}</Text><br />
                <Text strong>Phone:</Text> <Text>{profileData.phone}</Text><br />
                <Text strong>Department:</Text> <Text>{profileData.department}</Text><br />
                <Text strong>Location:</Text> <Text>{profileData.location}</Text><br />
                <Text strong>Joined:</Text> <Text>{profileData.joined}</Text>
              </div>
            </div>
          </div>
          <Divider style={{ margin: '32px 0' }} />
          <Title level={4}>Bio</Title>
          <Paragraph style={{ fontSize: 16 }}>{profileData.bio}</Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile; 