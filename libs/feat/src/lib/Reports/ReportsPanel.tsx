import { Container, MyTable } from '@dental-pro/ui';
import styles from './ReportsPanel.module.scss';
import { Button } from '@mantine/core';

export const ReportsPanel = () => {
  const tableHead = ['ID', 'Name', 'Age', 'Gender', 'Diagnosis', 'Status'];

  const tableData = [
    {
      ID: 1,
      Name: 'John Doe',
      Age: 34,
      Gender: 'Male',
      Diagnosis: 'Hypertension',
      Status: 'Stable',
    },
    {
      ID: 2,
      Name: 'Jane Smith',
      Age: 28,
      Gender: 'Female',
      Diagnosis: 'Migraine',
      Status: 'Recovering',
    },
    {
      ID: 3,
      Name: 'Alice Johnson',
      Age: 45,
      Gender: 'Female',
      Diagnosis: 'Diabetes',
      Status: 'Critical',
    },
    {
      ID: 4,
      Name: 'Bob Brown',
      Age: 50,
      Gender: 'Male',
      Diagnosis: 'Arthritis',
      Status: 'Stable',
    },
    {
      ID: 5,
      Name: 'Charlie Davis',
      Age: 60,
      Gender: 'Male',
      Diagnosis: 'Asthma',
      Status: 'Recovering',
    },
    {
      ID: 6,
      Name: 'Eva Green',
      Age: 22,
      Gender: 'Female',
      Diagnosis: 'Anemia',
      Status: 'Stable',
    },
  ];
  return (
    <Container header={'Reports'}>
      {/* todo */}
      <div>
        Form For Filters Will Be Added <Button>KERKO</Button>
        <Button color="green"> Printo</Button>
      </div>

      <div className={styles.reports}>
        <Container
          // inline style temporary (todo)
          style={{
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* todo */}A chart coming soon
        </Container>
        <Container header={'Daily Reports'} style={{ width: '70%' }}>
          <MyTable tableData={tableData} tableHead={tableHead} />
        </Container>
      </div>
    </Container>
  );
};
