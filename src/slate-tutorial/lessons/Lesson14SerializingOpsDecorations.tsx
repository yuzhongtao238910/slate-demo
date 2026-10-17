import { useCallback, useMemo, useState } from 'react';
import type { Operation } from 'slate';
import { Editor, NodeEntry, Text, Transforms } from 'slate';
import type { RenderLeafProps } from 'slate-react';
import { Editable, ReactEditor, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { serializeDemoDocument } from '../initialValues';
import { withLinksAndVoids } from '../plugins/withLinksAndVoids';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { deserializeHtmlString } from '../serialization/deserializeHtml';
import { serializeToHtml } from '../serialization/serializeToHtml';
import { serializeToPlaintext } from '../serialization/serializeToPlaintext';

const SAMPLE_HTML = `<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p>
<blockquote><p>A wise quote.</p></blockquote>
<p>A closing paragraph!</p>`;

function cloneValue(value: SlateValue): SlateValue {
  return JSON.parse(JSON.stringify(value)) as SlateValue;
}

function LeafWithDecoration(props: RenderLeafProps) {
  const { attributes, children, leaf } = props;
  let rendered = children;
  if (leaf.bold) {
    rendered = <strong>{rendered}</strong>;
  }
  if ('highlight' in leaf && leaf.highlight) {
    rendered = <mark className="decoration-highlight">{rendered}</mark>;
  }
  return <span {...attributes}>{rendered}</span>;
}

export function Lesson14SerializingOpsDecorations() {
  const editor = useMemo(() => withLinksAndVoids(createReactEditor()), []);
  const [value, setValue] = useState<SlateValue>(() => cloneValue(serializeDemoDocument));
  const [plaintext, setPlaintext] = useState('');
  const [htmlOut, setHtmlOut] = useState('');
  const [lastOps, setLastOps] = useState<Operation[]>([]);
  const [highlight, setHighlight] = useState('link');

  const syncFromEditor = () => {
    setValue(cloneValue(editor.children as SlateValue));
    setLastOps(JSON.parse(JSON.stringify(editor.operations)) as Operation[]);
  };

  const exportPlaintext = () => {
    setPlaintext(serializeToPlaintext(editor.children as SlateValue));
  };

  const exportHtml = () => {
    setHtmlOut(serializeToHtml(editor.children as SlateValue));
  };

  const importSampleHtml = () => {
    ReactEditor.focus(editor);
    while (editor.children.length > 0) {
      Transforms.removeNodes(editor, { at: [0] });
    }
    const fragment = deserializeHtmlString(SAMPLE_HTML);
    Transforms.insertNodes(editor, fragment, { at: [0] });
    syncFromEditor();
  };

  const decorate = useCallback(
    ([node, path]: NodeEntry) => {
      if (!highlight.trim() || !Text.isText(node)) {
        return [];
      }
      const ranges = [];
      const { text } = node;
      let start = 0;
      while (start <= text.length) {
        const index = text.indexOf(highlight, start);
        if (index === -1) {
          break;
        }
        ranges.push({
          anchor: { path, offset: index },
          focus: { path, offset: index + highlight.length },
          highlight: true,
        });
        start = index + highlight.length;
      }
      return ranges;
    },
    [highlight],
  );

  return (
    <LessonLayout
      step={14}
      title="Serializing · Operations · Decorations"
      concept="这篇补文档里教程尚未单独演示的三块：① JSON→纯文本/HTML（序列化）② 简单 HTML 导入（反序列化）③ editor.operations 调试 ④ Decorations 搜索高亮（不进 JSON）。"
    >
      <div className="lesson14-layout">
        <div className="lesson14-editor-col">
          <Slate editor={editor} initialValue={value} onValueChange={syncFromEditor}>
            <div className="format-toolbar lesson14-toolbar">
              <label className="lesson14-label">
                高亮关键词
                <input
                  className="lesson14-input"
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                />
              </label>
              <button type="button" className="toolbar-btn" onClick={exportPlaintext}>
                导出 Plaintext
              </button>
              <button type="button" className="toolbar-btn" onClick={exportHtml}>
                导出 HTML
              </button>
              <button type="button" className="toolbar-btn" onClick={importSampleHtml}>
                导入示例 HTML
              </button>
            </div>
            <Editable
              className="slate-editable"
              decorate={decorate}
              renderElement={(props) => <ElementRenderer {...props} />}
              renderLeaf={(props) => <LeafWithDecoration {...props} />}
            />
          </Slate>
          <p className="lesson-hint">
            改几个字再看「最近 Operations」；高亮 &quot;link&quot; 是 Decoration，不会出现在 JSON 里。
          </p>
        </div>
        <div className="lesson14-panels">
          <aside className="value-preview">
            <h3>Plaintext 导出</h3>
            <pre>{plaintext || '（点「导出 Plaintext」）'}</pre>
          </aside>
          <aside className="value-preview">
            <h3>HTML 导出</h3>
            <pre>{htmlOut || '（点「导出 HTML」）'}</pre>
          </aside>
          <aside className="value-preview">
            <h3>最近 Operations</h3>
            <pre>{lastOps.length ? JSON.stringify(lastOps, null, 2) : '（编辑或导入后自动更新）'}</pre>
          </aside>
          <aside className="value-preview">
            <h3>当前 JSON（Mark 在，Decoration 不在）</h3>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </aside>
        </div>
      </div>
    </LessonLayout>
  );
}
