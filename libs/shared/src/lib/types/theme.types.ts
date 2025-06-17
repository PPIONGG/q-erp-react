export type ThemeVariant = 
  | 'sales-visitor'

export interface CustomThemeTokens {
  name: string;
  description?: string;
  category: 'dark' | 'light';
}