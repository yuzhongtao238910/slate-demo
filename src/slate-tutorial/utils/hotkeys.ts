import type { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import type { FormattedText } from '../custom-types';

type Mark = keyof Pick<FormattedText, 'bold' | 'italic' | 'underline' | 'code'>;

export function handleMarkHotkeys(event: KeyboardEvent, editor: Editor) {
  if (!event.ctrlKey && !event.metaKey) {
    return;
  }

  const map: Record<string, Mark> = {
    b: 'bold',
    i: 'italic',
    u: 'underline',
    '`': 'code',
  };

  const mark = map[event.key.toLowerCase()];
  if (!mark) {
    return;
  }

  event.preventDefault();
  const marks = Editor.marks(editor);
  const active = marks ? marks[mark] === true : false;
  if (active) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
}
