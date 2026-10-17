import { Element as SlateElement } from 'slate';
import type { CustomEditor } from '../custom-types';

/**
 * 「插件」模式：高阶函数包装 editor，改写 isInline / isVoid 等行为。
 * link 设为 inline；image 设为 void（不可在里面打字）。
 */
export function withLinksAndVoids<T extends CustomEditor>(editor: T): T {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) =>
    SlateElement.isElementType(element, 'link') ? true : isInline(element);

  editor.isVoid = (element) =>
    SlateElement.isElementType(element, 'image') ? true : isVoid(element);

  return editor;
}
