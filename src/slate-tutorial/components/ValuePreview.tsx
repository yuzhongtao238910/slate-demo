import type { SlateValue } from '../custom-types';

type ValuePreviewProps = {
  value: SlateValue;
  title?: string;
};

/** 直观看到 Slate 的「文档 = JSON 树」 */
export function ValuePreview({ value, title = '当前 value（JSON）' }: ValuePreviewProps) {
  return (
    <aside className="value-preview">
      <h3>{title}</h3>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </aside>
  );
}
