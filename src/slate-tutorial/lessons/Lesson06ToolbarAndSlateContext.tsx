import { useMemo } from 'react';
import { Editable, Slate } from 'slate-react';
import { FormatToolbar } from '../components/FormatToolbar';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { welcomeDocument } from '../initialValues';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

/**
 * useSlate()：在 Slate 子树里拿到当前 editor，供工具栏按钮调用 Transforms / Editor API。
 * 按钮用 onMouseDown + preventDefault，避免点击时编辑器失焦。
 */
export function Lesson06ToolbarAndSlateContext() {
  const editor = useMemo(() => createReactEditor(), []);

  return (
    <LessonLayout
      step={6}
      title="工具栏与 useSlate"
      concept="FormatToolbar 里的 MarkButton 使用 useSlate() 读取 editor 与选区状态。这是把「命令 UI」和「编辑器内核」连接起来的典型写法。"
    >
      <Slate editor={editor} initialValue={welcomeDocument}>
        <FormatToolbar />
        <Editable
          className="slate-editable"
          renderElement={(props) => <ElementRenderer {...props} />}
          renderLeaf={(props) => <LeafRenderer {...props} />}
        />
      </Slate>
    </LessonLayout>
  );
}
