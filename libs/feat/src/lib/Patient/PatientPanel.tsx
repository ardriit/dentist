import { Input, Textarea } from '@mantine/core';
import styles from './PatientPanel.module.scss';

const mockClient = {
  firstName: 'Edison',
  lastName: 'Zulfaj',
  dob: '24-02-2001',
  phone: '+38349329503',
  bloodType: 'C',
  address: 'test adres',
  isMarried: 'single',
  teethColor: 'e bardhe',
  allergies: 'None',
  email: 'edi24@blla.com',
  personalNumber: 123456,
  comment: 'Nje sehnim te zakonshem',
  gender: 'Male',
};

interface PatientInputProps {
  label: string;
  value: string | number;
}

const PatientInput = ({ label, value }: PatientInputProps) => {
  return (
    <Input.Wrapper label={label} labelProps={{ style: { fontWeight: 'bold' } }}>
      <Input placeholder={`Input for ${label}`} value={value} />
    </Input.Wrapper>
  );
};

export const PatientPanel = () => {
  return (
    <div className={styles.patientContainer}>
      <div className={styles.details}>
        <div className={styles.left}>
          <PatientInput label="Emri:" value={mockClient.firstName} />
          <PatientInput label="Datelindja:" value={mockClient.dob} />
          <PatientInput label="Gjinia:" value={mockClient.gender} />
          <PatientInput label="Grupi i gjakut:" value={mockClient.bloodType} />
          <PatientInput
            label="Ngjyra e dhembeve:"
            value={mockClient.teethColor}
          />
          <PatientInput label="Email:" value={mockClient.email} />
        </div>
        <div className={styles.right}>
          <PatientInput label="Mbiemri:" value={mockClient.lastName} />
          <PatientInput label="Telefoni:" value={mockClient.phone} />
          <PatientInput label="Adresa:" value={mockClient.address} />
          <PatientInput
            label="Statusi martesor:"
            value={mockClient.isMarried}
          />
          <PatientInput label="Alergjitë:" value={mockClient.allergies} />
          <PatientInput
            label="Numri personal:"
            value={mockClient.personalNumber}
          />
        </div>
      </div>
      <Input.Wrapper
        label="Koment:"
        labelProps={{ style: { fontWeight: 'bold' } }}
      >
        <Textarea
          placeholder="Input inside Input.Wrapper"
          value={mockClient.comment}
        />
      </Input.Wrapper>
    </div>
  );
};
