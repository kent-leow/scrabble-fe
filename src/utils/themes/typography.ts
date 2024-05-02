import { TypographyOptions } from '@mui/material/styles/createTypography';
import colors from '~/utils/themes/colors';
import React from 'react';
import media from '~/utils/themes/media';
import { Inter } from 'next/font/google';

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    heading1Serif?: React.CSSProperties;
    heading1?: React.CSSProperties;
    heading2?: React.CSSProperties;
    heading3?: React.CSSProperties;
    heading4?: React.CSSProperties;
    heading5?: React.CSSProperties;
    body400?: React.CSSProperties;
    body500?: React.CSSProperties;
    body600?: React.CSSProperties;
    subtext400?: React.CSSProperties;
    subtext500?: React.CSSProperties;
    subtext600?: React.CSSProperties;
    eyebrow?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heading1Serif: true;
    heading1: true;
    heading2: true;
    heading3: true;
    heading4: true;
    heading5: true;
    body400: true;
    body500: true;
    body600: true;
    subtext400: true;
    subtext500: true;
    subtext600: true;
    eyebrow: true;
  }
}

const inter = Inter({ subsets: ['latin'] });

const typography: TypographyOptions = {
  fontFamily: inter.style.fontFamily,
  allVariants: {
    lineHeight: 'normal',
    color: colors.greyscale['900'],
  },
  heading1Serif: {
    fontFamily: inter.style.fontFamily,
    fontSize: '1.75rem',
    fontWeight: 700,
    letterSpacing: '-1%',
    lineHeight: '2.5rem',
    [media.desktop]: {
      fontSize: '2.5rem',
      letterSpacing: '-2%',
    },
  },
  heading1: {
    fontSize: '2rem',
    fontWeight: 500,
    letterSpacing: '-5%',
    lineHeight: '2.5rem',
    [media.desktop]: {
      fontSize: '3rem',
      letterSpacing: '-4%',
    },
  },
  heading2: {
    fontSize: '1.625rem',
    fontWeight: 500,
    letterSpacing: '-5%',
    lineHeight: '2.25rem',
    [media.desktop]: {
      fontSize: '2.5rem',
      letterSpacing: '-4%',
    },
  },
  heading3: {
    fontSize: '1.375rem',
    fontWeight: 500,
    letterSpacing: '-4%',
    lineHeight: '1.875rem',
    [media.desktop]: {
      fontSize: '2rem',
    },
  },
  heading4: {
    fontSize: '1.25rem',
    fontWeight: 500,
    letterSpacing: '-4%',
    lineHeight: '1.75rem',
    [media.desktop]: {
      fontSize: '1.75rem',
    },
  },
  heading5: {
    fontSize: '1.125rem',
    fontWeight: 500,
    letterSpacing: '-3%',
    lineHeight: '1.625rem',
    [media.desktop]: {
      fontSize: '1.5rem',
      letterSpacing: '-4%',
    },
  },
  body400: {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '-3%',
    [media.desktop]: {
      fontSize: '1.125rem',
      lineHeight: '1.5rem',
    },
  },
  body500: {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '-3%',
    lineHeight: '1.5rem',
    [media.desktop]: {
      fontSize: '1.125rem',
    },
  },
  body600: {
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '-3%',
    lineHeight: '1.5rem',
    [media.desktop]: {
      fontSize: '1.125rem',
    },
  },
  subtext400: {
    fontSize: '0.875rem',
    fontWeight: 400,
    letterSpacing: '-3%',
    lineHeight: '1.25rem',
    [media.desktop]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  subtext500: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '-3%',
    lineHeight: '1.25rem',
    [media.desktop]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  subtext600: {
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '-3%',
    lineHeight: '1.25rem',
    [media.desktop]: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
  },
  eyebrow: {
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '5%',
    lineHeight: '1.25rem',
    [media.desktop]: {
      fontSize: '1rem',
    },
  },
};

export default typography;
