import { useMemo, useState } from 'react';
import type { BaseSelection } from 'slate';
import { Editable, Slate } from 'slate-react';
import { LocationDemoButtons } from '../components/LocationDemoButtons';
import { LocationInspector } from '../components/LocationInspector';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { locationTutorialDocument } from '../initialValues';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

export function Lesson12LocationsDemo() {
  const editor = useMemo(() => createReactEditor(), []);
  const [selection, setSelection] = useState<BaseSelection>(null);

  return (
    <LessonLayout
      step={12}
      title="Locations：Path / Point / Range / Selection"
      concept="Path 指节点；Point 指 Text 里的光标（path+offset）；Range 是 anchor+focus 两点；editor.selection 就是当前的 Range。点下面 Demo 按钮或用鼠标选中，右侧会实时解析。"
    >
      <div className="location-layout">
        <div className="location-editor-col">
          <LocationDemoButtons editor={editor} />
          <Slate
            editor={editor}
            initialValue={locationTutorialDocument}
            onSelectionChange={(e) => {
              console.log('onSelectionChange', e);
              setSelection(e);
            }}
          >
            <Editable
              className="slate-editable"
              renderElement={(props) => <ElementRenderer {...props} />}
              renderLeaf={(props) => <LeafRenderer {...props} />}
            />
          </Slate>
          <p className="lesson-hint">
            试试：用鼠标从「text!」的右往左拖选，对比 anchor/focus 与 start/end 的差别。
          </p>
        </div>
        <LocationInspector editor={editor} selection={selection} />
      </div>
    </LessonLayout>
  );
}
