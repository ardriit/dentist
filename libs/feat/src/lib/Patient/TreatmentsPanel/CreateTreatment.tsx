import styles from './CreateTreatment.module.scss'
import { TextInput, Textarea, Select, Button, Group, Box } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'

interface FormValues {
  selectedTeeth: string
  date: Date
  doctor: string
  payment: string
  comment: string
}

export const CreateTreatment = () => {
  const form = useForm<FormValues>({
    initialValues: {
      selectedTeeth: '',
      date: new Date(),
      doctor: '',
      payment: '',
      comment: '',
    },
  })

  const handleSubmit = (values: FormValues) => {
    // console.log('Form values:', values);
  }

  return (
    <Box mx="auto" className={styles.box}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Selected Teeth"
          placeholder="Enter selected teeth"
          {...form.getInputProps('selectedTeeth')}
        />

        <DateInput
          label="Date"
          defaultValue={new Date()}
          {...form.getInputProps('date')}
          disabled
        />

        <Select
          label="Doctor"
          placeholder="Select doctor"
          data={[
            { value: 'doctor1', label: 'Doctor 1' },
            { value: 'doctor2', label: 'Doctor 2' },
            { value: 'doctor3', label: 'Doctor 3' },
          ]}
          {...form.getInputProps('doctor')}
        />

        <TextInput
          label="Payment"
          placeholder="Enter payment amount"
          {...form.getInputProps('payment')}
        />

        <Textarea
          label="Comment"
          placeholder="Enter your comment"
          {...form.getInputProps('comment')}
        />

        <Group mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}

export default CreateTreatment
