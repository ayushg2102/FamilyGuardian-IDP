import React from 'react';

export function getStatusTag(status: string): React.ReactElement | null {
  if (status === 'Draft') {
    return (
      <span style={{ background: '#fff4d6', color: '#b98a00', borderRadius: 12, padding: '2px 12px', fontSize: 13, fontWeight: 500 }}>Draft</span>
    );
  }
  if (status === 'Returned') {
    return (
      <span style={{ background: '#ffeaea', color: '#e14d43', borderRadius: 12, padding: '2px 12px', fontSize: 13, fontWeight: 500 }}>Returned</span>
    );
  }
  if (status === 'Approved') {
    return (
      <span style={{ background: '#e6f9f0', color: '#1ca67a', borderRadius: 12, padding: '2px 12px', fontSize: 13, fontWeight: 500 }}>Approved</span>
    );
  }
  if (status === 'Pending') {
    return (
      <span style={{ background: '#e6f4ff', color: '#1890ff', borderRadius: 12, padding: '2px 12px', fontSize: 13, fontWeight: 500 }}>Pending</span>
    );
  }
  return null;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Pending': return 'blue';
    case 'Returned': return 'orange';
    case 'Approved': return 'green';
    case 'Draft': return 'gray';
    default: return 'default';
  }
} 