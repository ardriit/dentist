'use client';

import type { ReactNode } from 'react';
import { LanguageContext, type LanguageType } from '../context/LanguageContext';

export const LanguageProvider = ({
  children,
  translations,
}: {
  children: ReactNode;
  translations: LanguageType;
}) => (
  <LanguageContext.Provider value={translations}>
    {children}
  </LanguageContext.Provider>
);
