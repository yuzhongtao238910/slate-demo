import { Text } from 'slate';
import type { CustomElement, FormattedText } from '../custom-types';
import { escapeHtml } from './escapeHtml';

function serializeText(node: FormattedText): string {
  let html = escapeHtml(node.text);
  if (node.bold) {
    html = `<strong>${html}</strong>`;
  }
  if (node.italic) {
    html = `<em>${html}</em>`;
  }
  if (node.code) {
    html = `<code>${html}</code>`;
  }
  return html;
}

function serializeNode(node: CustomElement | FormattedText): string {
  if (Text.isText(node)) {
    return serializeText(node);
  }

  const children = node.children.map((child) => serializeNode(child as CustomElement | FormattedText)).join('');

  switch (node.type) {
    case 'heading':
      return node.level === 1 ? `<h1>${children}</h1>` : `<h2>${children}</h2>`;
    case 'block-quote':
      return `<blockquote><p>${children}</p></blockquote>`;
    case 'code-block':
      return `<pre><code>${children}</code></pre>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'image':
      return `<img src="${escapeHtml(node.url)}" alt="" />`;
    default:
      return children;
  }
}

/** 递归序列化为 HTML 字符串（与教程 schema 一致） */
export function serializeToHtml(nodes: CustomElement[]): string {
  return nodes.map((n) => serializeNode(n)).join('\n');
}
