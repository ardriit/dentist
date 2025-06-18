import { MyTable } from '@dental-pro/ui';
import styles from './TreatmentsHistory.module.scss';
import { useTranslation } from '@dental-pro/i18n';
import { HistoryIcon } from '@dental-pro/ui/icons';

const tableHead = [
  'Data',
  'Dhembi',
  'Diagnoza',
  'Tratmani',
  'Mjeku',
  'Cmimi',
  'Pagesa',
];

const tableData = [
  {
    Data: '2023-01-01',
    Dhembi: 'Molar',
    Diagnoza: 'Cavity',
    Tratmani: 'Filling',
    Mjeku: 'Dr. John Doe',
    Cmimi: '50 EUR',
    Pagesa: 'Paid',
  },
  {
    Data: '2023-01-15',
    Dhembi: 'Incisor',
    Diagnoza: 'Fracture',
    Tratmani: 'Crown',
    Mjeku: 'Dr. Jane Smith',
    Cmimi: '200 EUR',
    Pagesa: 'Unpaid',
  },
  {
    Data: '2023-02-10',
    Dhembi: 'Canine',
    Diagnoza: 'Infection',
    Tratmani: 'Root Canal',
    Mjeku: 'Dr. Alice Johnson',
    Cmimi: '150 EUR',
    Pagesa: 'Paid',
  },
  {
    Data: '2023-03-05',
    Dhembi: 'Premolar',
    Diagnoza: 'Decay',
    Tratmani: 'Extraction',
    Mjeku: 'Dr. Bob Brown',
    Cmimi: '80 EUR',
    Pagesa: 'Paid',
  },
  {
    Data: '2023-03-20',
    Dhembi: 'Molar',
    Diagnoza: 'Cavity',
    Tratmani: 'Filling',
    Mjeku: 'Dr. Charlie Davis',
    Cmimi: '50 EUR',
    Pagesa: 'Unpaid',
  },
  {
    Data: '2023-04-01',
    Dhembi: 'Incisor',
    Diagnoza: 'Fracture',
    Tratmani: 'Crown',
    Mjeku: 'Dr. Eva Green',
    Cmimi: '200 EUR',
    Pagesa: 'Paid',
  },
];

export const TreatmentsHistory = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.treatmentsHistoryHeader}>
        <HistoryIcon />
        {t('treatments.history')}
      </div>
      <div className={styles.treatmentsHistoryTable}>
        <MyTable
          tableHead={tableHead}
          tableData={tableData}
          customClassNames={styles.customContainer}
          // onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};
