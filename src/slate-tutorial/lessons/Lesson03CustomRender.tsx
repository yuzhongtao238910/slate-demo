import { useMemo } from 'react';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { welcomeDocument } from '../initialValues';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

/**
 * renderElement / renderLeaf：数据结构与 UI 解耦。
 */
export function Lesson03CustomRender() {
  const editor = useMemo(() => createReactEditor(), []);

  return (
    <LessonLayout
      step={3}
      title="自定义渲染"
      concept="默认只会渲染 paragraph。通过 renderElement、renderLeaf 把 heading、bold 等映射到真实 HTML/CSS。"
    >
      <Slate editor={editor} initialValue={welcomeDocument}>
        <Editable
          className="slate-editable"
          renderElement={(props) => <ElementRenderer {...props} />}
          renderLeaf={(props) => <LeafRenderer {...props} />}
        />
      </Slate>
    </LessonLayout>
  );
}
