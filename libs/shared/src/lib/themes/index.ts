export * from './sales-visitor';

export const themes = {
  'sales-visitor': () =>
    import('./sales-visitor').then((m) => m.salesVisitorTheme),
} as const;
