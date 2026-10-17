import { Element, Node, Transforms } from 'slate';
import type { CustomEditor } from '../custom-types';

/**
 * normalizeNode：文档不符合 schema 时自动修。
 * 规则：list-item 必须在 bulleted-list 内；bulleted-list 的子节点必须是 list-item。
 */
export function withListNormalization<T extends CustomEditor>(editor: T): T {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry, options) => {
    const [node, path] = entry;

    if (Element.isElement(node) && node.type === 'list-item') {
      const parent = Node.parent(editor, path);
      if (Element.isElement(parent) && parent.type !== 'bulleted-list') {
        Transforms.wrapNodes(
          editor,
          { type: 'bulleted-list', children: [] },
          { at: path },
        );
        return;
      }
    }

    if (Element.isElement(node) && node.type === 'bulleted-list') {
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Element.isElement(child) && child.type !== 'list-item') {
          Transforms.wrapNodes(
            editor,
            { type: 'list-item', children: [] },
            { at: childPath },
          );
          return;
        }
      }
    }

    normalizeNode(entry, options);
  };

  return editor;
}
