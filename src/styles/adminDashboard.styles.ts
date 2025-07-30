export const dashboardStyles = {
  // Layout
  container: {
    background: 'var(--background-main)',
    minHeight: '100vh',
    padding: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px 40px 0 40px',
    marginBottom: 0,
  },
  headerTitle: {
    fontWeight: 700,
    fontSize: 22,
    color: 'var(--text-main)',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  
  // Buttons
  button: {
    borderRadius: 6,
    fontWeight: 500,
    fontSize: 15,
    height: 40,
  },
  primaryButton: {
    background: 'var(--primary-color)',
    border: 'none',
    minWidth: 170,
  },
  
  // Date Range Picker
  dateRangeContainer: {
    display: 'flex',
    alignItems: 'center',
    background: 'var(--background-light)',
    border: '1px solid var(--border-main)',
    borderRadius: 8,
    padding: '0 8px',
    height: 40,
    minWidth: 180,
    fontWeight: 500,
    color: 'var(--text-main)',
    fontSize: 15,
    boxShadow: '0 1px 4px var(--border-grey)',
    gap: 8,
    justifyContent: 'center',
  },
  dateRangeText: {
    minWidth: 110,
    textAlign: 'center' as const,
    fontWeight: 600,
  },
  
  // Stats Cards
  statsRow: {
    margin: '32px 40px 0 40px',
  },
  statCard: {
    background: 'var(--background-card)',
    borderRadius: 12,
    boxShadow: '0 2px 8px var(--border-main)',
    padding: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  statTitle: {
    color: 'var(--text-secondary)',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 2,
  },
  statValue: {
    color: 'var(--text-main)',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 2,
  },
  statAmount: {
    color: 'var(--text-main)',
    fontSize: 13,
    fontWeight: 500,
  },
  statIcon: {
    borderRadius: '50%',
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Sections
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: 18,
    color: 'var(--text-main)',
  },
  viewAllButton: {
    color: 'var(--primary-color)',
    fontWeight: 600,
    padding: 0,
  },
  
  // Charts
  chartContainer: {
    margin: '32px 40px 0 40px',
  },
  chartCard: {
    background: 'var(--background-card)',
    borderRadius: 12,
    boxShadow: '0 2px 8px var(--border-main)',
    padding: 32,
    minWidth: 0,
  },
  chartTitle: {
    fontWeight: 700,
    fontSize: 18,
    color: 'var(--text-main)',
    marginBottom: 24,
    display: 'block',
  },
};

export const chartConfigs = {
  userStatus: {
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.4,
    label: {
      type: 'inner',
      offset: '-30%',
      content: (percent: number) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fill: '#fff',
      },
    },
    legend: {
      position: 'bottom',
      itemName: {
        style: {
          fontSize: 14,
          fontWeight: 500,
        },
      },
    },
    color: ['#52c41a', '#ff4d4f'],
    height: 300,
  },
  userRole: {
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.4,
    label: {
      type: 'inner',
      offset: '-30%',
      content: (percent: number) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        fill: '#fff',
      },
    },
    legend: {
      position: 'bottom',
      itemName: {
        style: {
          fontSize: 14,
          fontWeight: 500,
        },
      },
    },
    color: ['#1890ff', '#722ed1', '#fa8c16', '#13c2c2'],
    height: 300,
  },
};

export const tooltipFormatters = {
  userStatus: (datum: any) => ({
    name: datum.type,
    value: `${datum.value} users`,
  }),
  userRole: (datum: any) => ({
    name: datum.type,
    value: `${datum.value} users`,
  }),
};
