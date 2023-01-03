import {EditorView, highlightActiveLine} from "@codemirror/view"
import {Extension} from "@codemirror/state"
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language"
import {tags as t} from "@lezer/highlight"


const mkcolors = (cols: string[]) => {
    const obj: {[k: string]: string} = {};

    cols.forEach((c) => obj[c] = `var(--ion-${c})`);

    return obj;
};
const mkshades = (c: string) => ([
    c, `${c}-shade`, `${c}-tint`, `${c}-contrast`
]);
const mksteps = (p: string) => {
    const steps = [];
    for (let i = 50; i <= 950; i += 50) {
        steps.push(`${p}-${i}`);
    }
    return steps;
};

export const colors = mkcolors([
    'background-color',
    'text-color',
    ...mkshades('color-primary'),
    ...mkshades('color-secondary'),
    ...mkshades('color-tertiary'),
    ...mkshades('color-medium'),
    ...mkshades('color-light'),
    ...mksteps('color-step')
]);

/// The editor theme styles for One Dark.
export const bartlebyTheme = EditorView.theme({
  "&": {
    color: colors['color-step-700'],
    backgroundColor: colors['background-color'],
    width: '900px',
    maxWidth: '90vw',
    margin: '0 auto'
  },

  ".cm-content": {
    caretColor: colors['color-primary']
  },

  ".cm-cursor, .cm-dropCursor": {borderLeftColor: colors['color-primary']},
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: colors['color-secondary-shade']
  },

  ".cm-panels": {backgroundColor: colors['color-step-50'], color: colors['color-step-850']},
  ".cm-panels.cm-panels-top": {borderBottom: "none"},
  ".cm-panels.cm-panels-bottom": {borderTop: "none"},

  ".cm-searchMatch": {
    backgroundColor: colors['color-tertiary-shade'],
    outline: "1px solid " + colors['color-tertiary']
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: colors['color-tertiary-tint']
  },

  ".cm-activeLine": { backgroundColor: 'transparent', color: colors['text-color']},
  ".cm-selectionMatch": {backgroundColor: colors['color-tertiary']},

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: colors['color-tertiary']
  },

  ".cm-gutters": {
    backgroundColor: colors['background-color'],
    color: colors['color-light'],
    border: "none"
  },

  ".cm-activeLineGutter": {
    backgroundColor: colors['color-medium-shade']
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: colors['color-medium']
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: colors['color-primary-shade']
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: colors['color-primary-shade'],
    borderBottomColor: colors['color-primary-shade']
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: colors['color-secondary'],
      color: colors['color-secondary-contrast']
    }
  }
}, {dark: true})

/// The highlighting style for code in the One Dark theme.
export const bartlebyHighlightStyle = HighlightStyle.define([
  {tag: t.keyword,
   color: colors['text-color']},
  {tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
   color: colors['text-color']},
  {tag: [t.function(t.variableName), t.labelName],
   color: colors['text-color']},
  {tag: [t.color, t.constant(t.name), t.standard(t.name)],
   color: colors['text-color']},
  {tag: [t.definition(t.name), t.separator],
   color: colors['text-color']},
  {tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
   color: colors['text-color']},
  {tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
   color: colors['text-color']},
  {tag: [t.meta, t.comment],
   color: colors['text-color']},
  {tag: t.strong,
   fontWeight: "bold"},
  {tag: t.emphasis,
   fontStyle: "italic"},
  {tag: t.strikethrough,
   textDecoration: "line-through"},
  {tag: t.link,
   color: colors['color-tertiary'],
   textDecoration: "underline"},
   {tag: t.heading,
    fontWeight: "bold",
    color: colors['text-color']},
    {tag: t.heading1,
        fontWeight: "bold",
        fontSize: '1.5rem',
        color: colors['text-color']},
    {tag: t.heading2,
        fontWeight: "bold",
        fontSize: '1.3rem',
        color: colors['text-color']},
    {tag: t.heading3,
        fontWeight: "bold",
        fontSize: '1.15rem',
        color: colors['text-color']},
    {tag: t.heading4,
        fontWeight: "bold",
        fontSize: '1.05rem',
        color: colors['text-color']},
    {tag: [t.atom, t.bool, t.special(t.variableName)],
   color: colors['text-color']},
  {tag: [t.processingInstruction, t.string, t.inserted],
   color: colors['text-color']},
  {tag: t.invalid,
   color: colors['color-medium']},
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const bartleby: Extension = [bartlebyTheme, highlightActiveLine(), syntaxHighlighting(bartlebyHighlightStyle)]