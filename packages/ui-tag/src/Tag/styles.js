/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { darken } from '@instructure/ui-color-utils'

/**
 * Generates the style object from the theme and provided additional information
 * @param  {Object} theme The actual theme object.
 * @param  {Object} themeOverride User provided overrides of the default theme mapping.
 * @param  {Object} props the props of the component, the style is applied to
 * @param  {Object} state the state of the component, the style is applied to
 * @return {Object} The final style object, which will be used in the component
 */
const generateStyle = (theme, themeOverride, props, state) => {
  const { borders, colors, forms, spacing, typography, key: themeName } = theme

  const themeSpecificStyle = {
    'canvas-a11y': {
      defaultBackground: colors?.backgroundLightest,
      defaultBorderColor: colors?.borderDarkest
    },
    'canvas-high-contrast': {
      defaultBackground: colors?.backgroundLightest,
      defaultBorderColor: colors?.borderDarkest
    },
    canvas: {
      focusOutlineColor: theme['ic-brand-primary'],
      textColor: theme['ic-brand-font-color-dark'],
      defaultIconColor: theme['ic-brand-font-color-dark'],
      defaultIconHoverColor: theme['ic-brand-primary'],
      defaultColor: theme['ic-brand-font-color-dark']
    }
  }

  const tagVariant = function (
    style,
    {
      borderColor,
      borderRadius,
      borderStyle,
      borderWidth,
      hoverColor,
      iconColor,
      iconHoverColor,
      mainColor,
      textColor
    }
  ) {
    return {
      [`${style}BackgroundHover`]: hoverColor || darken(mainColor, 5),
      [`${style}Background`]: mainColor,
      [`${style}BorderColor`]: borderColor,
      // For 'pill'-style rounded corners
      // https://stackoverflow.com/questions/22578979/border-radius-50-vs-border-radius-999em
      [`${style}BorderRadius`]: borderRadius || '999rem',
      [`${style}BorderStyle`]: borderStyle || borders.style,
      [`${style}BorderWidth`]: borderWidth || borders.widthSmall,
      [`${style}Color`]: textColor,
      [`${style}IconColor`]: iconColor || textColor,
      [`${style}IconHoverColor`]: iconHoverColor || iconColor || textColor
    }
  }

  const componentTheme = {
    fontFamily: typography?.fontFamily,
    heightSmall: '1.3125rem', // matches Pill component height
    heightMedium: forms?.inputHeightSmall,
    heightLarge: forms?.inputHeightMedium,
    fontSizeSmall: typography?.fontSizeXSmall,
    fontSizeMedium: typography?.fontSizeSmall,
    fontSizeLarge: typography?.fontSizeMedium,
    padding: `0 ${spacing?.xSmall}`,
    paddingSmall: `0 ${spacing?.xSmall}`,
    focusOutlineColor: colors?.borderBrand,
    focusOutlineWidth: borders?.widthMedium,
    focusOutlineStyle: borders?.style,
    maxWidth: '10rem',
    iconMargin: spacing?.small,
    transitionTiming: '0.2s',

    ...tagVariant('default', {
      borderColor: colors?.borderMedium,
      iconColor: colors?.textDarkest,
      iconHoverColor: colors?.textBrand,
      mainColor: colors?.textLight,
      textColor: colors?.textDarkest
    }),

    ...tagVariant('inline', {
      borderColor: colors?.borderDark,
      borderRadius: borders?.radiusMedium,
      iconColor: colors?.textDark,
      iconHoverColor: colors?.textDark,
      mainColor: colors?.textLightest,
      textColor: colors?.textDarkest
    }),

    ...themeSpecificStyle[themeName],
    ...themeOverride
  }

  // optional mappings can be provided based on - for example - props
  const colorStyles = {
    primary: {
      color: componentTheme.primaryColor,
      fontSize: '20px'
    },
    info: {
      color: componentTheme.infoColor
    }
  }

  // return with the css you'd like to apply to the component
  return {
    root: {
      boxSizing: 'border-box',
      fontFamily: componentTheme.fontFamily,
      display: 'inline-flex',
      alignItems: 'center',
      textAlign: 'center',
      verticalAlign: 'middle',
      userSelect: 'none'
      // ...colorStyles[color]
    },
    anotherClass: {
      color: 'green',
      background: componentTheme.infoColor
    }
  }
}
export default generateStyle
