import { useMemo, useState } from 'react';
import { Editable, Slate } from 'slate-react';
import { ValuePreview } from '../components/ValuePreview';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { nestedNestDocument } from '../initialValues';
import { withLinksAndVoids } from '../plugins/withLinksAndVoids';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

export function Lesson11NestedDemo() {
  const editor = useMemo(
    () => withLinksAndVoids(createReactEditor()),
    [],
  );
  const [value, setValue] = useState<SlateValue>(nestedNestDocument);

  return (
    <LessonLayout
      step={11}
      title="多层嵌套 Demo"
      concept="同一文档里同时存在：block-quote → paragraph、paragraph → link → text、list-item → 子 list → 再子 list（三级）。每个 Element 都会触发 renderElement；Text 走 renderLeaf。右侧 JSON 就是完整树。"
    >
      <div className="lesson-split">
        <Slate editor={editor} initialValue={value} onValueChange={setValue}>
          <Editable
            className="slate-editable nested-demo-editable"
            renderElement={(props) => <ElementRenderer {...props} />}
            renderLeaf={(props) => <LeafRenderer {...props} />}
          />
        </Slate>
        <ValuePreview value={value} />
      </div>
    </LessonLayout>
  );
}
