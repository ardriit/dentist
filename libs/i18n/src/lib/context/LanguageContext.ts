import { createContext } from 'react';
import sq from '../dictionaries/sq.json';

export type LanguageType = typeof sq;

export const LanguageContext = createContext(sq);
