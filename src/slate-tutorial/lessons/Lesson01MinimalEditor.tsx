import { useMemo } from 'react';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { emptyDocument } from '../initialValues';

/**
 * 最小闭环：<Slate> 提供 Editor 上下文，<Editable> 是可编辑区域。
 */
export function Lesson01MinimalEditor() {
  const editor = useMemo(() => createReactEditor(), []);

  console.log(emptyDocument, 13);

  return (
    <LessonLayout
      step={1}
      title="最小编辑器"
      concept="Slate 把文档存成 JSON 树；React 层用 Slate + Editable 渲染并接收输入。Editor 用 useMemo 创建一次即可。"
    >
      <Slate editor={editor} initialValue={emptyDocument}
      onValueChange={value => console.log(value, 14)}
      
      >
        <Editable className="slate-editable" placeholder="在这里输入…" />
      </Slate>
    </LessonLayout>
  );
}
