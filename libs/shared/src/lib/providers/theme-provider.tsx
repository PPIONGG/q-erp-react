import React from 'react';
import { ConfigProvider } from 'antd';
import { salesVisitorTheme } from '../themes';
import { ThemeVariant } from '../types/theme.types';

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeVariant;
}

const getThemeConfig = (themeName: ThemeVariant) => {
  switch (themeName) {
    case 'sales-visitor':
      return salesVisitorTheme;
    default:
      return salesVisitorTheme;
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = 'sales-visitor',
}) => {
  const themeConfig = getThemeConfig(theme);

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
