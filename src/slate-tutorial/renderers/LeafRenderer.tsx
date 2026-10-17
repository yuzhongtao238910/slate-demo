import type { RenderLeafProps } from 'slate-react';

/** renderLeaf：同一段文字上的 bold/italic 等 Mark 如何显示 */
export function LeafRenderer({ attributes, children, leaf }: RenderLeafProps) {
  console.log(attributes, children, leaf, "leaf renderer");
  let rendered = children;

  if (leaf.bold) {
    rendered = <strong>{rendered}</strong>;
  }
  if (leaf.italic) {
    rendered = <em>{rendered}</em>;
  }
  if (leaf.underline) {
    rendered = <u>{rendered}</u>;
  }
  if (leaf.code) {
    rendered = <code className="slate-inline-code">{rendered}</code>;
  }

  return <span {...attributes}>{rendered}</span>;
}
