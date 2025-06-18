'use client';

import styles from './page.module.scss';
import { useTranslation } from '@dental-pro/i18n';
import { InfoSection, AppointmentsSection } from '@dental-pro/feat';

export default function Index() {
  const { t } = useTranslation();
  return (
    <div>
      <InfoSection />
      <AppointmentsSection />
    </div>
  );
}
