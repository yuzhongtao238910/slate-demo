import { useMemo } from 'react';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { blocksDemoDocument } from '../initialValues';
import { ElementRenderer } from '../renderers/ElementRenderer';

/**
 * Block Element：段落、标题、列表等块级节点，children 通常是 Text 或嵌套块。
 */
export function Lesson05BlockElements() {
  const editor = useMemo(() => createReactEditor(), []);

  return (
    <LessonLayout
      step={5}
      title="Block 块级元素"
      concept="type: 'heading' | 'block-quote' | 'bulleted-list' 等都在 JSON 里。renderElement 里 switch(type) 决定渲染成 h1、blockquote、ul。"
    >
      <Slate editor={editor} initialValue={blocksDemoDocument}>
        <Editable
          className="slate-editable"
          renderElement={(props) => <ElementRenderer {...props} />}
        />
      </Slate>
    </LessonLayout>
  );
}
