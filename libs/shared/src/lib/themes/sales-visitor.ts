import { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const salesVisitorTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Primary Colors
    colorPrimary: '#cc0000',
    colorPrimaryHover: '#b30000',
    colorPrimaryActive: '#990000',

    // Background Colors
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f5f5f5',

    // Border & Text Colors
    colorBorder: '#e0e0e0',
    colorBorderSecondary: '#f0f0f0',
    colorText: '#333333',
    colorTextSecondary: '#666666',
    colorTextTertiary: '#999999',
    colorTextQuaternary: '#cccccc',

    // Link Colors
    colorLink: '#cc0000',
    colorLinkHover: '#990000',
    colorLinkActive: '#b30000',

    // Status Colors
    colorError: '#ff4d4f',
    colorWarning: '#faad14',
    colorSuccess: '#52c41a',
    colorInfo: '#1890ff',

    // Component Specific
    borderRadius: 8,
    borderRadiusLG: 12,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    boxShadowSecondary: '0 4px 12px rgba(0, 0, 0, 0.08)',

    // Typography
    fontFamily:
      "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
    fontSizeLG: 16,
    fontWeightStrong: 600,

    // Control Heights
    controlHeight: 40,
    controlHeightLG: 42,
    controlHeightSM: 32,

    // Motion
    motionDurationMid: '0.3s',
    motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  components: {
    Button: {
      primaryShadow: '0 2px 4px rgba(204, 0, 0, 0.2)',
      borderRadius: 8,
      fontWeight: 600,
    },
    Input: {
      activeBorderColor: '#cc0000',
      hoverBorderColor: '#cc0000',
      activeShadow: '0 0 0 2px rgba(204, 0, 0, 0.1)',
      borderRadius: 8,
    },
    Form: {
      labelFontSize: 14,
      verticalLabelPadding: '0 0 8px',
    },
  },
};
