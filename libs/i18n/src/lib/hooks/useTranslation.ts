'use client';

import { useContext, useCallback } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import type { LanguageType } from '../context';

export const useTranslation = () => {
  const language = useContext(LanguageContext);

  const t = useCallback(
    (translationKey: keyof LanguageType): string => language[translationKey],
    [language]
  );

  return { t };
};
