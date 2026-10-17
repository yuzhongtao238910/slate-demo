import { useMemo } from 'react';
import { Editable, Slate } from 'slate-react';
import { FormatToolbar } from '../components/FormatToolbar';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { welcomeDocument } from '../initialValues';
import { LeafRenderer } from '../renderers/LeafRenderer';
import { handleMarkHotkeys } from '../utils/hotkeys';

/** onKeyDown：在浏览器默认行为之前拦截 Ctrl/Cmd+B 等快捷键 */
export function Lesson07KeyboardShortcuts() {
  const editor = useMemo(() => createReactEditor(), []);

  return (
    <LessonLayout
      step={7}
      title="键盘快捷键"
      concept="Editable 的 onKeyDown 里处理 Mod+B/I/U。与工具栏一样调用 Editor.addMark，保证行为一致。"
    >
      <Slate editor={editor} initialValue={welcomeDocument}>
        <FormatToolbar />
        <Editable
          className="slate-editable"
          renderLeaf={(props) => <LeafRenderer {...props} />}
          onKeyDown={(event) => handleMarkHotkeys(event, editor)}
        />
        <p className="lesson-hint">试试 Ctrl+B / Ctrl+I（Mac 用 Cmd）</p>
      </Slate>
    </LessonLayout>
  );
}
