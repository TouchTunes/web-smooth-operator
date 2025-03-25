import { Alert, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import ReportsPageChart from '~/src/components/ReportsPageChart';

import type { SyntheticEvent } from 'react';

const tabs = [
  { value: 'reports', label: 'Reports' },
  { value: 'availability', label: 'Availability' },
  { value: 'route', label: 'Route' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'plays', label: 'Plays' },
  { value: 'billing', label: 'Billing' },
  { value: 'devices', label: 'Devices' },
  { value: 'alerts', label: 'Alerts' },
  { value: 'wireless', label: 'Wireless' },
  { value: 'tt-connect', label: 'TT Connect' },
];

export default function Reports() {
  const [tabValue, setTabValue] = useState('reports');
  const pageName = tabs.find((tab) => tab.value === tabValue)?.label;

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="reports-page-tabs"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      <Alert
        severity="info"
        variant="outlined"
        sx={{ mt: 2, borderRadius: '12px', bgcolor: 'background.paper' }}
      >
        {`Here is a helpful message from Seb for this awesome ${pageName} page`}
      </Alert>

      <ReportsPageChart />
    </>
  );
}
