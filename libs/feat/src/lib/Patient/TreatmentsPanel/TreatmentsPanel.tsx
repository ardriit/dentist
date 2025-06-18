'use client';

import styles from './TreatmentPanel.module.scss';
import { CreateTreatment } from './CreateTreatment';
import { Tooth } from './Tooth';
import { TreatmentsHistory } from './TreatmentsHistory';

export const TreatmentsPanel = () => {
  return (
    <div className={styles.treatmentsContanier}>
      <div>
        <Tooth />
        <TreatmentsHistory />
      </div>
      <div>
        <CreateTreatment />
      </div>
    </div>
  );
};
