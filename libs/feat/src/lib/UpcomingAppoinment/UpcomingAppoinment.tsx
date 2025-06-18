import styles from './UpcomingAppoinment.module.scss';

interface UpcomingAppoinmentProps {
  date: string;
  type: string;
  doctor: string;
  time: string;
  duration: number;
}

export const UpcomingAppoinment = ({
  date,
  type,
  doctor,
  time,
  duration,
}: UpcomingAppoinmentProps) => {
  return (
    <div className={styles.upcomingAppoinment}>
      <div className={styles.appointmentDate}>{date}</div>
      <div className={styles.appointmentInfo}>
        {`${type} with ${doctor} from ${time} to ${time + duration}`}
      </div>
    </div>
  );
};
