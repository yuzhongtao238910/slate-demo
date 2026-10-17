import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import type { FormattedText } from '../custom-types';

type Mark = keyof Pick<FormattedText, 'bold' | 'italic' | 'underline' | 'code'>;

function isMarkActive(editor: Editor, mark: Mark) {
  const marks = Editor.marks(editor);
  return marks ? marks[mark] === true : false;
}

function toggleMark(editor: Editor, mark: Mark) {
  const active = isMarkActive(editor, mark);
  if (active) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
}

function MarkButton({ mark, label }: { mark: Mark; label: string }) {
  const editor = useSlate();
  const active = isMarkActive(editor, mark);

  return (
    <button
      type="button"
      className={active ? 'toolbar-btn active' : 'toolbar-btn'}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, mark);
      }}
    >
      {label}
    </button>
  );
}

export function FormatToolbar() {
  return (
    <div className="format-toolbar" role="toolbar" aria-label="文字格式">
      <MarkButton mark="bold" label="B" />
      <MarkButton mark="italic" label="I" />
      <MarkButton mark="underline" label="U" />
      <MarkButton mark="code" label="`" />
    </div>
  );
}
