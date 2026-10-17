import { useMemo, useState } from 'react';
import { HistoryEditor } from 'slate-history';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { ValuePreview } from '../components/ValuePreview';
import { createHistoryEditor } from '../createHistoryEditor';
import type { SlateValue } from '../custom-types';
import { welcomeDocument } from '../initialValues';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

function clone(value: SlateValue): SlateValue {
  return JSON.parse(JSON.stringify(value)) as SlateValue;
}

export function Lesson16HistoryUndoRedo() {
  const editor = useMemo(() => createHistoryEditor(), []);
  const [value, setValue] = useState(() => clone(welcomeDocument));
  const [historyInfo, setHistoryInfo] = useState({ undos: 0, redos: 0 });

  const sync = () => {
    setValue(clone(editor.children as SlateValue));
    setHistoryInfo({
      undos: editor.history.undos.length,
      redos: editor.history.redos.length,
    });
  };

  const undo = () => {
    HistoryEditor.undo(editor);
    sync();
  };

  const redo = () => {
    HistoryEditor.redo(editor);
    sync();
  };

  return (
    <LessonLayout
      step={16}
      title="History（撤销 / 重做）"
      concept="slate-history 的 withHistory 会把 Operations 压进 undos/redos 栈。编辑后点 Undo/Redo；JSON 会回到之前状态。协同编辑才需要自己管 Operation，单机用 history 即可。"
    >
      <div className="lesson-split">
        <div>
          <Slate editor={editor} initialValue={value} onValueChange={sync}>
            <div className="format-toolbar">
              <button
                type="button"
                className="toolbar-btn"
                disabled={!HistoryEditor.isHistoryEditor(editor) || editor.history.undos.length === 0}
                onClick={undo}
              >
                Undo
              </button>
              <button
                type="button"
                className="toolbar-btn"
                disabled={!HistoryEditor.isHistoryEditor(editor) || editor.history.redos.length === 0}
                onClick={redo}
              >
                Redo
              </button>
              <span className="lesson14-label">
                undos: {historyInfo.undos} · redos: {historyInfo.redos}
              </span>
            </div>
            <Editable
              className="slate-editable"
              renderElement={(props) => <ElementRenderer {...props} />}
              renderLeaf={(props) => <LeafRenderer {...props} />}
            />
          </Slate>
          <p className="lesson-hint">先随便打字或删字，再试 Undo / Redo。</p>
        </div>
        <ValuePreview value={value} />
      </div>
    </LessonLayout>
  );
}
