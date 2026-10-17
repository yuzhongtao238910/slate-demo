import type { Descendant } from 'slate';
import type { FormattedText } from '../custom-types';

type MarkAttrs = Pick<FormattedText, 'bold' | 'italic' | 'code'>;

function textNode(text: string, marks: MarkAttrs): FormattedText {
  const node: FormattedText = { text };
  if (marks.bold) {
    node.bold = true;
  }
  if (marks.italic) {
    node.italic = true;
  }
  if (marks.code) {
    node.code = true;
  }
  return node;
}

/** 简化版 HTML → Slate（官方 Deserializing 思路，未引入 slate-hyperscript） */
export function deserializeHtmlElement(el: Node, markAttributes: MarkAttrs = {}): Descendant[] | Descendant | string | null {
  if (el.nodeType === Node.TEXT_NODE) {
    return textNode(el.textContent ?? '', markAttributes);
  }
  if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = el as HTMLElement;
  const nodeAttributes = { ...markAttributes };

  switch (element.nodeName) {
    case 'STRONG':
    case 'B':
      nodeAttributes.bold = true;
      break;
    case 'EM':
    case 'I':
      nodeAttributes.italic = true;
      break;
    case 'CODE':
      nodeAttributes.code = true;
      break;
    default:
      break;
  }

  const childNodes = Array.from(element.childNodes)
    .map((child) => deserializeHtmlElement(child, nodeAttributes))
    .flat()
    .filter((n): n is Descendant => n !== null && typeof n !== 'string');

  const children =
    childNodes.length > 0 ? childNodes : [textNode('', nodeAttributes)];

  switch (element.nodeName) {
    case 'BODY':
      return children;
    case 'BLOCKQUOTE':
      return [{ type: 'block-quote', children: children as FormattedText[] }];
    case 'P':
      return [{ type: 'paragraph', children: children as FormattedText[] }];
    case 'A':
      return [
        {
          type: 'link',
          url: element.getAttribute('href') ?? '',
          children: children as FormattedText[],
        },
      ];
    case 'H1':
      return [{ type: 'heading', level: 1, children: children as FormattedText[] }];
    case 'H2':
      return [{ type: 'heading', level: 2, children: children as FormattedText[] }];
    default:
      return children;
  }
}

export function deserializeHtmlString(html: string): Descendant[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const result = deserializeHtmlElement(doc.body);
  if (Array.isArray(result)) {
    return result;
  }
  if (result && typeof result !== 'string') {
    return [result];
  }
  return [{ type: 'paragraph', children: [{ text: '' }] }];
}
