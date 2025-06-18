'use client';
import { Container, Tabs } from '@dental-pro/ui';
import styles from './page.module.scss';
import { PatientPanel, TreatmentsPanel } from '@dental-pro/feat';

const Index = () => {
  const tabs = [
    {
      value: 'patient',
      label: 'Pacienti',
      content: <PatientPanel />,
    },
    {
      value: 'treatments',
      label: 'Tretmanet',
      content: <TreatmentsPanel />,
    },
    {
      value: 'invoices',
      label: 'Faturat',
      disabled: true,
      content: null,
    },
    {
      value: 'plan',
      label: 'Planifikimi',
      disabled: true,
      content: null,
    },
    {
      value: 'payments',
      label: 'Pagesat',
      disabled: true,
      content: null,
    },
    {
      value: 'reports',
      label: 'Raportet specialistike',
      disabled: true,
      content: null,
    },
    {
      value: 'appointments',
      label: 'Terminet',
      disabled: true,
      content: null,
    },
    {
      value: 'documents',
      label: 'Dokumente',
      disabled: true,
      content: null,
    },
  ];
  const panels = [
    {
      value: 'patient',
      content: <div>patient</div>,
    },
    {
      value: 'treatments',
      content: <div>treatments</div>,
    },
  ];

  return (
    <Container>
      <Tabs tabs={tabs} panels={panels} />
    </Container>
  );
};

export default Index;
