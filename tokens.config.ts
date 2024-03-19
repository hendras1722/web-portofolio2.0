import { defineTheme } from 'pinceau'

export default defineTheme({
  typography: {
    $schema: {
      title: 'All the configurable tokens for your Typography.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType color',
        '@studioIcon material-symbols:article',
      ],
    },
    verticalMargin: {
      $schema: {
        title: 'Vertical spacings between paragraphs.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType size',
          '@studioIcon mingcute:line-height-line',
        ],
      },
      sm: '16px',
      base: '24px',
    },
    letterSpacing: {
      $schema: {
        title: 'Horizontal spacings between letters.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType size',
          '@studioIcon mingcute:letter-spacing-line',
        ],
      },
      tighter: '-0.04em',
      tight: '-0.02em',
      normal: '0em',
      wide: '0.02em',
      wider: '0.04em',
      widest: '0.08em',
    },
    fontSize: {
      $schema: {
        title: 'Horizontal spacings between letters.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType font-size',
          '@studioIcon mingcute:font-size-fill',
        ],
      },
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      '8xl': '96px',
      '9xl': '128px',
    },
    fontWeight: {
      $schema: {
        title: 'Font weights used in typography.',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType font-size',
          '@studioIcon mingcute:bold-fill',
        ],
      },
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    font: {
      $schema: {
        title: 'Your typography fonts',
        tags: [
          '@studioInput design-token',
          '@studioInputTokenType font',
          '@studioIcon material-symbols:font-download-rounded',
        ],
      },
      display: '{typography.font.sans}',
      body: '{typography.font.sans}',
      code: '{typography.font.mono}',
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
      serif: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    },
  },
  prose: {
    $schema: {
      title: 'All the configurable tokens for your Prose components.',
      tags: [
        '@studioInput design-token',
        '@studioInputTokenType font-size',
        '@studioIcon lucide:component',
      ],
    },
    p: {
      fontSize: '{typography.fontSize.base}',
      lineHeight: '{typography.lead.normal}',
      margin: '{typography.verticalMargin.base} 0',
      br: {
        margin: '{typography.verticalMargin.base} 0 0 0',
      },
    },
    h1: {
      margin: '0 0 2rem',
      fontSize: '{typography.fontSize.5xl}',
      lineHeight: '{typography.lead.tight}',
      fontWeight: '{typography.fontWeight.bold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.3xl}',
    },
    h2: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.4xl}',
      lineHeight: '{typography.lead.tight}',
      fontWeight: '{typography.fontWeight.semibold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.2xl}',
    },
    h3: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.3xl}',
      lineHeight: '{typography.lead.snug}',
      fontWeight: '{typography.fontWeight.semibold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.xl}',
    },
    h4: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.2xl}',
      lineHeight: '{typography.lead.snug}',
      fontWeight: '{typography.fontWeight.semibold}',
      letterSpacing: '{typography.letterSpacing.tight}',
      iconSize: '{typography.fontSize.lg}',
    },
    h5: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.xl}',
      lineHeight: '{typography.lead.snug}',
      fontWeight: '{typography.fontWeight.semibold}',
      iconSize: '{typography.fontSize.lg}',
    },
    h6: {
      margin: '3rem 0 2rem',
      fontSize: '{typography.fontSize.lg}',
      lineHeight: '{typography.lead.normal}',
      fontWeight: '{typography.fontWeight.semibold}',
      iconSize: '{typography.fontSize.base}',
    },
    strong: {
      fontWeight: '{typography.fontWeight.semibold}',
    },
    img: {
      margin: '{typography.verticalMargin.base} 0',
      borderRadius: '{typography.radii.full}',
    },
    a: {
      textDecoration: 'none',
      color: {
        static: {
          initial: 'inherit',
          dark: 'inherit',
        },
        hover: {
          initial: '{typography.color.primary.500}',
          dark: '{typography.color.primary.500}',
        },
      },
      border: {
        width: '1px',
        style: {
          static: 'dashed',
          hover: 'solid',
        },
        color: {
          static: {
            initial: 'currentColor',
            dark: 'currentColor',
          },
          hover: {
            initial: 'currentColor',
            dark: 'currentColor',
          },
        },
        distance: '2px',
      },
      fontWeight: '{typography.fontWeight.medium}',
      hasCode: {
        borderBottom: 'none',
      },
      code: {
        border: {
          width: '{prose.a.border.width}',
          style: '{prose.a.border.style.static}',
          color: {
            static: {
              initial: '{typography.color.secondary.400}',
              dark: '{typography.color.secondary.600}',
            },
            hover: {
              initial: '{typography.color.primary.500}',
              dark: '{typography.color.primary.600}',
            },
          },
        },
        color: {
          static: '{prose.code.inline.color}',
          hover: {
            initial: 'currentColor',
            dark: 'currentColor',
          },
        },
        background: {
          static: {},
          hover: {
            initial: '{typography.color.primary.50}',
            dark: '{typography.color.primary.900}',
          },
        },
      },
    },
    blockquote: {
      margin: '{typography.verticalMargin.base} 0',
      paddingInlineStart: '24px',
      quotes: "'201C' '201D' '2018' '2019'",
      color: {
        initial: '{typography.color.secondary.500}',
        dark: '{typography.color.secondary.400}',
      },
      border: {
        width: '4px',
        style: 'solid',
        color: {
          initial: '{typography.color.secondary.200}',
          dark: '{typography.color.secondary.700}',
        },
      },
    },
    ul: {
      listStyleType: 'disc',
      margin: '{typography.verticalMargin.base} 0',
      paddingInlineStart: '21px',
      li: {
        markerColor: {
          initial: 'currentColor',
          dark: 'currentColor',
        },
      },
    },
    ol: {
      listStyleType: 'decimal',
      margin: '{typography.verticalMargin.base} 0',
      paddingInlineStart: '21px',
      li: {
        markerColor: {
          initial: 'currentColor',
          dark: 'currentColor',
        },
      },
    },
    li: {
      margin: '{typography.verticalMargin.sm} 0',
      listStylePosition: 'outside',
    },
    hr: {
      margin: '{typography.verticalMargin.base} 0',
      style: 'solid',
      width: '1px',
      color: {
        initial: '{typography.color.secondary.200}',
        dark: '{typography.color.secondary.800}',
      },
    },

    code: {
      block: {
        fontSize: '{typography.fontSize.sm}',
        margin: '{typography.verticalMargin.base} 0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: {
          initial: '{typography.color.secondary.200}',
          dark: '{typography.color.secondary.800}',
        },
        borderRadius: '{typography.radii.4xs}',
        color: {
          initial: '{typography.color.secondary.700}',
          dark: '{typography.color.secondary.200}',
        },
        backgroundColor: {
          initial: '{typography.color.secondary.50}',
          dark: '{typography.color.secondary.900}',
        },
        backdropFilter: {
          initial: 'contrast(1)',
          dark: 'contrast(1)',
        },
        pre: {
          padding: '{typography.verticalMargin.sm}',
        },
      },
      inline: {
        borderRadius: '{typography.radii.3xs}',
        padding: '0.2rem 0.375rem 0.2rem 0.375rem',
        fontSize: '{typography.fontSize.sm}',
        fontWeight: '{typography.fontWeight.normal}',
        color: {
          initial: '{typography.color.secondary.700}',
          dark: '{typography.color.secondary.200}',
        },
        backgroundColor: {
          initial: '{typography.color.secondary.100}',
          dark: '{typography.color.secondary.700}',
        },
      },
    },
  },
})
