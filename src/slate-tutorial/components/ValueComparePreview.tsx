import type { SlateValue } from '../custom-types';
import { ValuePreview } from './ValuePreview';

type ValueComparePreviewProps = {
  before: SlateValue;
  after: SlateValue;
};

export function ValueComparePreview({ before, after }: ValueComparePreviewProps) {
  return (
    <div className="value-compare">
      <ValuePreview value={before} title="初始 JSON（不变）" />
      <div className="value-compare-divider">↓ 加粗后（看 Text 条数与 bold）</div>
      <ValuePreview value={after} title="当前 JSON" />
    </div>
  );
}
