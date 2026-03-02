/**
 * Shared Mermaid theme for all procedure diagrams.
 * Dark theme with light blue accents (#64b5f6) on dark nodes (#2c3342).
 */
export const MERMAID_THEME_INIT = `
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#2c3342',
    'primaryTextColor': '#ffffff',
    'primaryBorderColor': '#64b5f6',
    'lineColor': '#64b5f6',
    'tertiaryColor': '#2c3342'
  }
} }%%
`.trim();
