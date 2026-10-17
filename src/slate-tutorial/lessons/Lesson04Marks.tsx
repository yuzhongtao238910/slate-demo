import { useMemo } from 'react';
import { Editable, Slate } from 'slate-react';
import { FormatToolbar } from '../components/FormatToolbar';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { welcomeDocument } from '../initialValues';
import { LeafRenderer } from '../renderers/LeafRenderer';

/**
 * Mark（行内格式）存在 Text 节点上，如 { text: 'hi', bold: true }。
 * Editor.addMark / removeMark 对当前选区生效。
 */
export function Lesson04Marks() {
  const editor = useMemo(() => createReactEditor(), []);

  return (
    <LessonLayout
      step={4}
      title="Marks（加粗、斜体）"
      concept="选中文字后点工具栏：内部会调用 Editor.addMark。Mark 会拆分成多个相邻 Text 节点，各自带不同属性。"
    >
      <Slate editor={editor} initialValue={welcomeDocument}>
        <FormatToolbar />
        <Editable
          className="slate-editable"
          renderLeaf={(props) => <LeafRenderer {...props} />}
        />
      </Slate>
    </LessonLayout>
  );
}
