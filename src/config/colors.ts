/**
 * PEDIT Lab Design System - Centralized Color Tokens & Theme Configuration
 * Supports Dark Mode and Light Mode with vibrant cybernetic neon accents & modern glassmorphism.
 * Imported by components and injected into CSS variables.
 */

export interface ColorScheme {
  // Brand Primary & Accent Colors
  primary: string;
  primaryHover: string;
  primaryGradient: string;
  secondary: string;
  secondaryHover: string;
  accentCyan: string;
  accentTeal: string;
  accentPurple: string;
  accentAmber: string;
  accentEmerald: string;

  // Background & Surfaces
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  bgCardHover: string;
  bgModal: string;
  bgGlass: string;
  bgGlassBorder: string;

  // Navigation & Header
  navBg: string;
  navBorder: string;

  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  textAccent: string;

  // Borders & Dividers
  borderColor: string;
  borderHover: string;
  borderGlow: string;

  // Status Colors
  success: string;
  warning: string;
  danger: string;
  info: string;

  // Shadows & Glows
  glowPrimary: string;
  glowCyan: string;
  shadowCard: string;
}

export const darkModeColors: ColorScheme = {
  primary: '#48D9F2',           // Electric Cyan
  primaryHover: '#81E9FC',
  primaryGradient: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
  secondary: '#2465EB',         // Quantum Purple
  secondaryHover: '#477FF0',
  accentCyan: '#48D9F2',
  accentTeal: '#00E5FF',
  accentPurple: '#8DA9FF',
  accentAmber: '#F59E0B',
  accentEmerald: '#10B981',

  bgPrimary: '#081321',         // Deep Obsidian Dark Space
  bgSecondary: '#102035',       // Rich Slate Dark
  bgTertiary: '#172B43',        // Muted Card Surface
  bgCard: 'rgba(16, 32, 53, 0.8)',
  bgCardHover: 'rgba(30, 41, 59, 0.85)',
  bgModal: '#102035',
  bgGlass: 'rgba(15, 23, 42, 0.65)',
  bgGlassBorder: 'rgba(0, 240, 255, 0.15)',

  navBg: 'rgba(10, 14, 23, 0.85)',
  navBorder: 'rgba(255, 255, 255, 0.08)',

  textPrimary: '#F8FAFC',       // Pure Crisp White
  textSecondary: '#94A3B8',     // Muted Blue-Grey
  textMuted: '#8295AE',         // Muted slate
  textInverse: '#102035',
  textAccent: '#48D9F2',

  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(0, 240, 255, 0.4)',
  borderGlow: 'rgba(0, 240, 255, 0.3)',

  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',

  glowPrimary: 'rgba(0, 240, 255, 0.25)',
  glowCyan: '0 0 25px rgba(0, 240, 255, 0.35)',
  shadowCard: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
};

export const lightModeColors: ColorScheme = {
  primary: '#0284C7',           // Vibrant Ocean Cyan-Blue
  primaryHover: '#0369A1',
  primaryGradient: 'linear-gradient(135deg, #0284C7 0%, #6366F1 100%)',
  secondary: '#6366F1',         // Indigo Accent
  secondaryHover: '#4F46E5',
  accentCyan: '#0EA5E9',
  accentTeal: '#14B8A6',
  accentPurple: '#5B62C9',
  accentAmber: '#D97706',
  accentEmerald: '#059669',

  bgPrimary: '#F8FAFC',         // Crisp Off-White Background
  bgSecondary: '#FFFFFF',       // Pure White Card Surface
  bgTertiary: '#F1F5F9',        // Soft Light Surface
  bgCard: 'rgba(255, 255, 255, 0.85)',
  bgCardHover: '#FFFFFF',
  bgModal: '#FFFFFF',
  bgGlass: 'rgba(255, 255, 255, 0.80)',
  bgGlassBorder: 'rgba(2, 132, 199, 0.2)',

  navBg: 'rgba(255, 255, 255, 0.85)',
  navBorder: 'rgba(0, 0, 0, 0.08)',

  textPrimary: '#102035',       // Dark Charcoal Slate
  textSecondary: '#475569',     // Slate Medium
  textMuted: '#64748B',         // Slate Light
  textInverse: '#F8FAFC',
  textAccent: '#0284C7',

  borderColor: 'rgba(0, 0, 0, 0.08)',
  borderHover: 'rgba(2, 132, 199, 0.4)',
  borderGlow: 'rgba(2, 132, 199, 0.25)',

  success: '#059669',
  warning: '#D97706',
  danger: '#DC2626',
  info: '#2563EB',

  glowPrimary: 'rgba(2, 132, 199, 0.2)',
  glowCyan: '0 0 20px rgba(2, 132, 199, 0.25)',
  shadowCard: '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
};

export type ThemeMode = 'dark' | 'light';

export function getThemeColors(mode: ThemeMode): ColorScheme {
  return mode === 'dark' ? darkModeColors : lightModeColors;
}
