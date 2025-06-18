'use client'
import { useForm } from '@mantine/form'
import {
  Button,
  Paper,
  TextInput,
  Radio,
  Group,
  SimpleGrid,
  Select,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import styles from './CreatePatient.module.scss'
import { Container } from '@dental-pro/ui'
import { useTranslation } from '@dental-pro/i18n'
import { apiClient, type CreatedClient } from '@dental-pro/utils'
const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  gender: '',
  birthday: null,
  allergy: '',
  bloodType: 'Unknown',
}

// interface CreatePatientProps {
//   initialValues?: Partial<typeof defaultValues>
//   isEdit?: boolean
// }

type CreatePatientProps = {
  onClose: () => void
}

export const CreatePatient = ({
  onClose,
}: CreatePatientProps): // initialValues = {},
// isEdit = false,
// onSubmit,
JSX.Element => {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      gender: '',
      birthday: null,
      allergy: '',
      bloodType: 'Unknown',
    },
    validate: {
      firstName: (value) => (value.trim().length < 2 ? 'Too short' : null),
      lastName: (value) => (value.trim().length < 2 ? 'Too short' : null),
    },
  })

  const handleCreatePatient = async (values: typeof form.values) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      gender,
      allergy,
      birthday,
      bloodType,
    } = values
    const createdClient = await apiClient<CreatedClient>('/clients', 'POST', {
      email,
      firstName,
      lastName,
      address,
      allergies: allergy,
      bloodGroup: bloodType,
      city,
      country: state,
      dob: birthday,
      gender,
      phone,
      postalCode: zip,
    })

    if ('id' in createdClient) {
      alert('Client created successfully')
      form.reset()
      onClose()
    }
  }

  const { t } = useTranslation()

  return (
    <Container header="Create Patient">
      <Paper shadow="md" p="lg" className={styles.createPatientPaper}>
        <form onSubmit={form.onSubmit(handleCreatePatient)}>
          <SimpleGrid cols={2} spacing="md">
            <TextInput
              withAsterisk
              size="md"
              label={t('createPatient.firstName')}
              placeholder={t('createPatient.firstNamePlaceholder')}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              withAsterisk
              size="md"
              label={t('createPatient.lastName')}
              placeholder={t('createPatient.lastNamePlaceholder')}
              {...form.getInputProps('lastName')}
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="md" mt="sm">
            <TextInput
              size="md"
              label={t('createPatient.email')}
              placeholder={t('createPatient.emailPlaceholder')}
              {...form.getInputProps('email')}
            />
            <TextInput
              size="md"
              label={t('createPatient.phone')}
              placeholder={t('createPatient.phonePlaceholder')}
              {...form.getInputProps('phone')}
            />
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="md" mt="sm">
            <DateInput
              size="md"
              label={t('createPatient.birthday')}
              placeholder={t('createPatient.birthdayPlaceholder')}
              display={'day-month-year'}
              valueFormat="DD/MM/YYYY"
              {...form.getInputProps('birthday')}
            />
            <Radio.Group
              size="md"
              label={t('createPatient.gender')}
              {...form.getInputProps('gender')}
            >
              <Group mt="xs">
                <Radio value="male" label={t('createPatient.genderMale')} />
                <Radio value="female" label={t('createPatient.genderFemale')} />
                <Radio value="other" label={t('createPatient.genderOther')} />
              </Group>
            </Radio.Group>
          </SimpleGrid>

          <SimpleGrid cols={2} spacing="md" mt="sm">
            <TextInput
              size="md"
              label={t('createPatient.city')}
              placeholder={t('createPatient.cityPlaceholder')}
              {...form.getInputProps('city')}
            />
            <TextInput
              size="md"
              label={t('createPatient.state')}
              placeholder={t('createPatient.statePlaceholder')}
              {...form.getInputProps('state')}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing="md" mt="sm">
            <TextInput
              size="md"
              label={t('createPatient.address')}
              placeholder={t('createPatient.addressPlaceholder')}
              mt="sm"
              {...form.getInputProps('address')}
            />
            <TextInput
              size="md"
              label={t('createPatient.zip')}
              placeholder={t('createPatient.zipPlaceholder')}
              mt="sm"
              {...form.getInputProps('zip')}
            />
          </SimpleGrid>
          <SimpleGrid cols={2} spacing="md" mt="sm">
            <TextInput
              size="md"
              label={t('createPatient.allergy')}
              placeholder={t('createPatient.allergyPlaceholder')}
              mt="sm"
              {...form.getInputProps('allergy')}
            />
            <Select
              classNames={{ option: styles.selectOption }}
              searchable
              size="md"
              label={t('createPatient.bloodType')}
              placeholder={t('createPatient.bloodTypePlaceholder')}
              data={[
                { value: 'Unknown', label: 'Nuk dihet' },
                { value: 'A+', label: '(A+) A pozitiv' },
                { value: 'A-', label: '(A-) A negativ' },
                { value: 'B+', label: '(B+) B pozitiv' },
                { value: 'B-', label: '(B-) B negativ' },
                { value: 'AB+', label: '(AB+) AB pozitiv' },
                { value: 'AB-', label: '(AB-) AB negativ' },
                { value: 'O+', label: '(0+) 0 pozitiv' },
                { value: 'O-', label: '(0-) 0 negativ' },
              ]}
              mt="sm"
              {...form.getInputProps('bloodType')}
            />
          </SimpleGrid>
          <Button type="submit" mt="xl" size="md" fullWidth>
            {t('createPatient.submitButton')}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
