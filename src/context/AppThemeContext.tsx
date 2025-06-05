import { createContext } from 'react'
import type { AppThemeContextProps } from '@/types/appThemeContextTheme'

export const AppThemeContext = createContext<AppThemeContextProps | undefined>(
  undefined
)
