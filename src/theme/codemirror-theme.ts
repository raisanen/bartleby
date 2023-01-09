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

export const bartlebyStyles = {
    "&": {
      color: colors['color-step-650'],
      borderRight: '1px solid ' + colors['color-step-50'] ,
      backgroundColor: colors['background-color'],
      width: '81ch',
      maxWidth: '90vw',
      margin: '0 auto'
    },
  
    ".cm-content": {
      caretColor: colors['color-primary'],
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

    ".cm-line": {
        padding: '0 .5em',
    },
  
    ".cm-activeLine": { backgroundColor: 'transparent', color: colors['text-color']},
    ".cm-selectionMatch": {backgroundColor: colors['color-tertiary']},
  
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: colors['color-tertiary']
    },
  
    ".cm-gutters": {
      backgroundColor: colors['color-step-50'],
      color: colors['color-step-150'],
      border: "none",
      fontSize: '.5rem'
    },
    ".cm-gutterElement": {
      display: 'inline-flex',
      alignItems: 'center'
    },
  
    ".cm-activeLineGutter": {
      backgroundColor: colors['color-step-150'],
      color: colors['color-step-250']
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
  };

/// The editor theme styles for One Dark.
export const bartlebyTheme = EditorView.theme(bartlebyStyles, {dark: true});


/// The highlighting style for code in the One Dark theme.
export const bartlebyHighlightStyle = HighlightStyle.define([
  {tag: t.keyword,
   color: 'inherit'},
  {tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
   color: 'inherit'},
  {tag: [t.function(t.variableName), t.labelName],
   color: 'inherit'},
  {tag: [t.color, t.constant(t.name), t.standard(t.name)],
   color: 'inherit'},
  {tag: [t.definition(t.name), t.separator],
   color: 'inherit'},
  {tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
   color: 'inherit'},
  {tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
   color: 'inherit'},
  {tag: [t.meta, t.comment],
   color: 'inherit'},
  {tag: t.strong,
   fontWeight: "bold", color: 'inherit'},
  {tag: t.emphasis,
   fontStyle: "italic", color: 'inherit'},
  {tag: t.strikethrough,
   textDecoration: "line-through", color: 'inherit'},
  {tag: t.link,
   color: colors['color-tertiary'],
   textDecoration: "underline"},
   {tag: t.heading,
    fontWeight: "bold",
    color: 'inherit'},
    {tag: t.heading1,
        fontWeight: "bold",
        fontSize: '1.5rem',
        color: 'inherit'},
    {tag: t.heading2,
        fontWeight: "bold",
        fontSize: '1.3rem',
        color: 'inherit'},
    {tag: t.heading3,
        fontWeight: "bold",
        fontSize: '1.15rem',
        color: 'inherit'},
    {tag: t.heading4,
        fontWeight: "bold",
        fontSize: '1.05rem',
        color: 'inherit'},
    {tag: [t.atom, t.bool, t.special(t.variableName)],
   color: 'inherit'},
  {tag: [t.processingInstruction, t.string, t.inserted],
   color: 'inherit'},
  {tag: t.invalid,
   color: colors['color-medium']},
], { themeType: 'dark'});

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const bartleby: Extension = [bartlebyTheme, highlightActiveLine(), syntaxHighlighting(bartlebyHighlightStyle)]