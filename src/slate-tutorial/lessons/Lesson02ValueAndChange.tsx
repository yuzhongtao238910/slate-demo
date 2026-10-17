import { useMemo, useState } from 'react';
import { Editable, Slate } from 'slate-react';
import { ValuePreview } from '../components/ValuePreview';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { welcomeDocument } from '../initialValues';

/**
 * onValueChange：内容变化时把 editor.children 同步到 React state。
 * 这就是「文档即状态」——方便存库、协作、撤销栈等。
 */
export function Lesson02ValueAndChange() {
  const editor = useMemo(() => createReactEditor(), []);
  const [value, setValue] = useState<SlateValue>(welcomeDocument);

  return (
    <LessonLayout
      step={2}
      title="Value 与 onValueChange"
      concept="每次编辑会产生 Operation，Slate 应用后更新 children。用 onValueChange 把整棵文档树拿出来，右侧 JSON 会实时变化。"
    >
      <div className="lesson-split">
        <Slate editor={editor} initialValue={value} onValueChange={setValue}>
          <Editable
            className="slate-editable"
            onKeyDown={(event) => {
              if (event.key === '&') {
                event.preventDefault();
                editor.insertText('and');
              }
            }}
          />
        </Slate>
        <ValuePreview value={value} />
      </div>
    </LessonLayout>
  );
}
