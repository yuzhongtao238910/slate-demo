import { Node } from 'slate';
import type { SlateValue } from '../custom-types';

/** 官方 Serializing 示例：顶层块用 Node.string，块之间 \\n */
export function serializeToPlaintext(nodes: SlateValue): string {
  return nodes.map((n) => Node.string(n)).join('\n');
}
