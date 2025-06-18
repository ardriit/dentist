import styles from './FilterByDate.module.scss';
import { DateInput } from '@mantine/dates';
export const FilterByDate = () => {
  return (
    <div className={styles.filterByDate}>
      <DateInput label="Start Date" placeholder="Pick a date" />
      {/* <DateInput label="End Date" placeholder="Pick a date" /> */}
    </div>
  );
};
