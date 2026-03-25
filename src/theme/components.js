import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as iconSet from '@fortawesome/free-solid-svg-icons';
import { theme } from './theme'; // Certifique-se que o theme.js está nesta mesma pasta

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função que transforma o objeto styleSheet em CSS real
function renderCSS(styleSheet, breakpoint) {
  if (!styleSheet) return '';

  return Object.keys(styleSheet)
    .map((prop) => {
      const value = styleSheet[prop];
      const property = prop.replace(/([A-Z])/g, "-$1").toLowerCase(); // Transforma backgroundColor em background-color

      if (typeof value === 'object' && value !== null) {
        const breakpointValue = value[breakpoint];
        if (!breakpointValue) return '';
        return `${property}: ${breakpointValue};`;
      }

      // IMPORTANTE: Só renderiza valores diretos no XS (Mobile First)
      // para evitar que o estilo se repita e sobrescreva os breakpoints maiores
      return breakpoint === 'xs' ? `${property}: ${value};` : '';
    })
    .join(' ');
}

export function Box({ as, styleSheet = {}, ...props }) {
  const Tag = as || 'div';

  // 1. Extraímos o styleSheet de dentro do props para ele não ir para o HTML
  const { styleSheet: _removed, ...restProps } = props;

  return (
    <React.Fragment>
      {/* 2. Passamos apenas o restProps (sem styleSheet) para a Tag */}
      <Tag 
        {...restProps} 
        className={`${props.className ? props.className : ''} ${styleSheet?.srOnly ? 'sr-only' : ''}`} 
      />
      
<style jsx>{`
  ${Tag} { 
    ${renderCSS(styleSheet, 'xs')} 
  }
  @media screen and (min-width: ${theme.breakpoints['Breakpoints.sm']}px) {
    ${Tag} { ${renderCSS(styleSheet, 'sm')} }
  }
  @media screen and (min-width: ${theme.breakpoints['Breakpoints.md']}px) {
    ${Tag} { ${renderCSS(styleSheet, 'md')} }
  }
  @media screen and (min-width: ${theme.breakpoints['Breakpoints.lg']}px) {
    ${Tag} { ${renderCSS(styleSheet, 'lg')} }
  }
`}</style>
    </React.Fragment>
  );
}
export function Text({ as, styleSheet = {}, ...props }) {
  const { textVariant = theme.typography.variants.body2, ...restStyleSheet } = styleSheet;
  const styleSheetUpdated = { ...textVariant, ...restStyleSheet };
  const Tag = as || 'span';
  return <Box as={Tag} styleSheet={styleSheetUpdated} {...props} />;
}

export function Icon({ as, styleSheet = {}, ...props }) {
  const { iconVariant, ...restStyleSheet } = styleSheet;
  const Tag = as || FontAwesomeIcon;

  return (
    <Box
      as={Tag}
      icon={iconSet[`fa${capitalize(iconVariant)}`]}
      crossOrigin="anonymous"
      styleSheet={{
        width: '1.5ch',
        height: '1.5ch',
        ...restStyleSheet
      }}
      {...props}
    />
  );
}

export function Image({ as, styleSheet = {}, ...props }) {
  const Tag = as || 'img';
  const { children, dangerouslySetInnerHTML, ...imageProps } = props;
  return <Box as={Tag} styleSheet={styleSheet} {...imageProps} />;
}

export function Input({ as, styleSheet = {}, ...props }) {
  const finalStyleSheet = {
    transition: 'all 0.2s ease-in-out',
    outline: 0,
    textVariant: theme.typography.variants.body2,
    color: theme.colors.neutral[900],
    display: 'block',
    width: theme.space["x1/1"],
    border: `1px solid ${theme.colors.neutral[300]}`,
    borderRadius: theme.space.x2,
    paddingHorizontal: theme.space.x5,
    paddingVertical: theme.space.x3,
    focus: {
      border: `1px solid ${theme.colors.primary[500]}`,
    },
    ...styleSheet,
  };
  return <Text as="input" styleSheet={finalStyleSheet} {...props} />;
}

export function Button({ as, styleSheet = {}, ...props }) {
  const { buttonVariant = 'primary', ...restStyleSheet } = styleSheet;
  const Tag = as || 'button';

  const finalStyleSheet = {
    cursor: 'pointer',
    textVariant: theme.typography.variants.body2,
    color: theme.colors.neutral["000"],
    display: 'block',
    width: theme.space["x1/1"],
    border: `1px solid ${theme.colors[buttonVariant][900]}`,
    borderRadius: theme.space.x2,
    paddingHorizontal: { xs: theme.space.x5, sm: theme.space.x10 },
    paddingVertical: theme.space.x3,
    backgroundColor: theme.colors[buttonVariant][600],
    ...restStyleSheet,
  };

  return <Text as={Tag} styleSheet={finalStyleSheet} {...props} />;
}