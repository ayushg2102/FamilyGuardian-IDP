import React from 'react';

export function getStatusTag(status: string): React.ReactElement | null {
  if (status === 'Draft') {
    return (
      <span
        style={{
          background: 'var(--background-warning)',
          color: 'var(--text-warning)',
          borderRadius: 12,
          padding: '2px 12px',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        Draft
      </span>
    );
  }
  if (status === 'Returned') {
    return (
      <span
        style={{
          background: 'var(--background-error)',
          color: 'var(--text-error)',
          borderRadius: 12,
          padding: '2px 12px',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        Returned
      </span>
    );
  }
  if (status === 'Approved') {
    return (
      <span
        style={{
          background: 'var(--background-success)',
          color: 'var(--text-success)',
          borderRadius: 12,
          padding: '2px 12px',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        Approved
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span
        style={{
          background: 'var(--background-info)',
          color: 'var(--text-info)',
          borderRadius: 12,
          padding: '2px 12px',
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        Pending
      </span>
    );
  }
  return null;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Pending':
      return 'blue';
    case 'Returned':
      return 'orange';
    case 'Approved':
      return 'green';
    case 'Draft':
      return 'gray';
    default:
      return 'default';
  }
}
