import {EditorView} from "@codemirror/view"
import {Extension} from "@codemirror/state"
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language"
import {tags as t} from "@lezer/highlight"

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors


const colors = {
    fg: '#a3a3a2',
    fgBright: '#c6c6c5',
    fgShade: '#979796',
    fgKeyword: '#e9e9e8',
    bg: '#171616',
    darkBg: '#0b0a0a',
    lightBg: '#3a3939',
    activeLine: '#2e2d2d',

    primary: '#e7ac36',

    primaryShade: '#cb9730',
    primaryTint: '#e9b143',
    primaryContrast: '#0b0a0a',
    secondary: '#e73671',
    secondaryShade: '#cb3063',
    secondaryContrast: '#f5f5f4',
    tertiary: '#666666',
    medium: '#9b9897',
}

/// The editor theme styles for One Dark.
export const bartlebyTheme = EditorView.theme({
  "&": {
    color: colors.fg,
    backgroundColor: colors.bg
  },

  ".cm-scroller": {
    fontFamily: '"Courier Prime", monospace'
  },

  ".cm-content": {
    caretColor: colors.primary
  },

  ".cm-cursor, .cm-dropCursor": {borderLeftColor: colors.primary},
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {backgroundColor: colors.tertiary},

  ".cm-panels": {backgroundColor: colors.darkBg, color: colors.fg},
  ".cm-panels.cm-panels-top": {borderBottom: `2px solid ${colors.darkBg}`},
  ".cm-panels.cm-panels-bottom": {borderTop: `2px solid ${colors.darkBg}`},

  ".cm-searchMatch": {
    backgroundColor: colors.secondary,
    outline: `1px solid ${colors.secondaryContrast}`
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: colors.secondaryShade
  },

  ".cm-activeLine": {backgroundColor: colors.activeLine},
  ".cm-selectionMatch": {backgroundColor: colors.primaryShade},

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: colors.primaryShade
  },

  ".cm-gutters": {
    backgroundColor: colors.bg,
    color: colors.fg,
    border: "none"
  },

  ".cm-activeLineGutter": {
    backgroundColor: colors.lightBg
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: colors.medium
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: colors.primaryShade
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: colors.primaryShade,
    borderBottomColor: colors.primaryShade
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: colors.secondary,
      color: colors.secondaryContrast
    }
  }
}, {dark: true})

/// The highlighting style for code in the One Dark theme.
export const bartlebyHighlightStyle = HighlightStyle.define([
  {tag: t.keyword,
   color: colors.fgBright},
  {tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
   color: colors.fgBright},
  {tag: [t.function(t.variableName), t.labelName],
   color: colors.fgBright},
  {tag: [t.color, t.constant(t.name), t.standard(t.name)],
   color: colors.fgBright},
  {tag: [t.definition(t.name), t.separator],
   color: colors.fgBright},
  {tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
   color: colors.fgBright},
  {tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
   color: colors.fgBright},
  {tag: [t.meta, t.comment],
   color: colors.fgShade},
  {tag: t.strong,
   fontWeight: "bold",
   color: colors.fgKeyword},
  {tag: t.emphasis,
   fontStyle: "italic",
   color: colors.fgKeyword},
  {tag: t.strikethrough,
   textDecoration: "line-through"},
  {tag: t.link,
   color: colors.fgKeyword,
   textDecoration: "underline"},
  {tag: t.heading,
   fontWeight: "bold",
   color: colors.fgKeyword},
    {
        tag: t.heading1,
        fontSize: '1.6em',
        fontWeight: "bold",
        color: colors.fgKeyword
    },
    {
        tag: t.heading2,
        fontSize: '1.3em',
        fontWeight: "bold",
        color: colors.fgKeyword
    },
    {
        tag: t.heading3,
        fontSize: '1.15em',
        fontWeight: "bold",
        color: colors.fgKeyword
    },
  {tag: [t.atom, t.bool, t.special(t.variableName)],
   color: colors.fgBright },
  {tag: [t.processingInstruction, t.string, t.inserted],
   color: colors.fgKeyword},
  {tag: t.invalid,
   color: colors.fgShade},
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const bartleby: Extension = [bartlebyTheme, syntaxHighlighting(bartlebyHighlightStyle)]