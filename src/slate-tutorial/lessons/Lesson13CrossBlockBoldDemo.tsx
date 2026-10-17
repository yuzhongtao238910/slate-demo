import { useEffect, useMemo, useState } from 'react';
import { Editor, Transforms } from 'slate';
import { Editable, ReactEditor, Slate } from 'slate-react';
import { FormatToolbar } from '../components/FormatToolbar';
import { LessonLayout } from '../components/LessonLayout';
import { ValueComparePreview } from '../components/ValueComparePreview';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { locationTutorialDocument } from '../initialValues';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

function cloneDoc(source: SlateValue = locationTutorialDocument): SlateValue {
  return JSON.parse(JSON.stringify(source)) as SlateValue;
}

/** Slate 改的是 editor.children 同一引用，React 必须深拷贝才能刷新预览 */
function snapshot(editor: ReturnType<typeof createReactEditor>): SlateValue {
  return cloneDoc(editor.children as SlateValue);
}

export function Lesson13CrossBlockBoldDemo() {
  const [docKey, setDocKey] = useState(0);
  const editor = useMemo(() => createReactEditor(), [docKey]);
  const beforeSnapshot = useMemo(() => cloneDoc(), [docKey]);
  const [value, setValue] = useState<SlateValue>(() => cloneDoc());

  useEffect(() => {
    setValue(cloneDoc());
  }, [docKey]);

  const syncFromEditor = () => {
    setValue(snapshot(editor));
  };

  const runAutoDemo = () => {
    ReactEditor.focus(editor);
    Transforms.select(editor, {
      anchor: { path: [0, 0], offset: 2 },
      focus: { path: [1, 0], offset: 3 },
    });
    Editor.addMark(editor, 'bold', true);

    console.log('runAutoDemo', editor);

    debugger;
    syncFromEditor();
  };

  const resetDoc = () => {
    setDocKey((k) => k + 1);
  };

  return (
    <LessonLayout
      step={13}
      title="跨段选中 + 加粗 → JSON 怎么变？"
      concept="块还是 2 个 paragraph；变的是每个 paragraph 里 Text 被切分，选中的片段多了 bold: true。右侧上面是初始结构，下面是当前结构。点「一键演示」或手动跨段选中后点 B。"
    >
      <div className="lesson-split lesson-split-wide">
        <div>
          <Slate
            key={docKey}
            editor={editor}
            initialValue={beforeSnapshot}
            onValueChange={() => syncFromEditor()}
          >
            <div className="format-toolbar">
              <FormatToolbar />
              <button
                type="button"
                className="toolbar-btn"
                onMouseDown={(event) => {
                  event.preventDefault();
                  runAutoDemo();
                }}
              >
                一键：跨段选中并加粗
              </button>
              <button type="button" className="toolbar-btn" onClick={resetDoc}>
                重置文档
              </button>
            </div>
            <Editable
              className="slate-editable"
              renderElement={(props) => <ElementRenderer {...props} />}
              renderLeaf={(props) => <LeafRenderer {...props} />}
            />
          </Slate>
          <p className="lesson-hint">
            一键演示选中：第一段从 &quot;A &quot; 之后到段末 + 第二段「第二段」三字。预期第一段 children 从
            1 条 Text 变 2 条（<code>A </code> 无 bold，<code>line of text!</code> 有 bold）；第二段
            「第二段」三字带 bold，「：」和「ABC」是否带 bold 取决于选区是否盖到它们。
          </p>
        </div>
        <ValueComparePreview before={beforeSnapshot} after={value} />
      </div>
    </LessonLayout>
  );
}
