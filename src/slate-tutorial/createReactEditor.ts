import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import type { CustomEditor } from './custom-types';

/**
 * Slate 核心：`createEditor()` 得到纯数据/操作的 Editor。
 * `withReact()` 挂上 DOM、选区、React 渲染所需的能力。
 * 通常用 useMemo 只创建一次（Editor 是可变单例）。
 */
export function createReactEditor(): CustomEditor {
  return withReact(createEditor());
}
