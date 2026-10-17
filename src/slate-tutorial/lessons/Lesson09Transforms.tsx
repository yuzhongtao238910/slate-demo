import { useMemo } from 'react';
import { Editor, Transforms } from 'slate';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import { emptyDocument } from '../initialValues';
import { ElementRenderer } from '../renderers/ElementRenderer';

/**
 * Transforms：对文档树做结构化修改（换行、设块类型、插入节点等）。
 */
export function Lesson09Transforms() {
  const editor = useMemo(() => createReactEditor(), []);

  const setHeading = () => {
    Transforms.setNodes(
      editor,
      { type: 'heading', level: 2 },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  };

  const setQuote = () => {
    Transforms.setNodes(
      editor,
      { type: 'block-quote' },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  };

  const setParagraph = () => {
    Transforms.setNodes(
      editor,
      { type: 'paragraph' },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  };

  return (
    <LessonLayout
      step={9}
      title="Transforms 改块类型"
      concept="光标所在块可通过 Transforms.setNodes 改成 heading / block-quote。生产环境还会配合 unwrap/wrap、lift 等处理列表与嵌套。"
    >
      <Slate editor={editor} initialValue={emptyDocument}>
        <div className="format-toolbar">
          <button type="button" className="toolbar-btn" onMouseDown={(e) => { e.preventDefault(); setHeading(); }}>
            标题
          </button>
          <button type="button" className="toolbar-btn" onMouseDown={(e) => { e.preventDefault(); setQuote(); }}>
            引用
          </button>
          <button type="button" className="toolbar-btn" onMouseDown={(e) => { e.preventDefault(); setParagraph(); }}>
            段落
          </button>
        </div>
        <Editable
          className="slate-editable"
          placeholder="输入一段文字，光标放在块内再点按钮…"
          renderElement={(props) => <ElementRenderer {...props} />}
        />
      </Slate>
    </LessonLayout>
  );
}
