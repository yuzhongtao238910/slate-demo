import { createEditor } from 'slate';
import { withHistory, type HistoryEditor } from 'slate-history';
import { withReact } from 'slate-react';
import type { CustomEditor } from './custom-types';

export type HistoryReactEditor = CustomEditor & HistoryEditor;

export function createHistoryEditor(): HistoryReactEditor {
  return withHistory(withReact(createEditor())) as HistoryReactEditor;
}
