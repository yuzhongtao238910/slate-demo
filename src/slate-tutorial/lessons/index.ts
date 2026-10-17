import type { ComponentType } from 'react';
import { Lesson01MinimalEditor } from './Lesson01MinimalEditor';
import { Lesson02ValueAndChange } from './Lesson02ValueAndChange';
import { Lesson03CustomRender } from './Lesson03CustomRender';
import { Lesson04Marks } from './Lesson04Marks';
import { Lesson05BlockElements } from './Lesson05BlockElements';
import { Lesson06ToolbarAndSlateContext } from './Lesson06ToolbarAndSlateContext';
import { Lesson07KeyboardShortcuts } from './Lesson07KeyboardShortcuts';
import { Lesson08VoidElements } from './Lesson08VoidElements';
import { Lesson09Transforms } from './Lesson09Transforms';
import { Lesson10EditorPlugins } from './Lesson10EditorPlugins';
import { Lesson11NestedDemo } from './Lesson11NestedDemo';
import { Lesson12LocationsDemo } from './Lesson12LocationsDemo';
import { Lesson13CrossBlockBoldDemo } from './Lesson13CrossBlockBoldDemo';
import { Lesson14SerializingOpsDecorations } from './Lesson14SerializingOpsDecorations';
import { Lesson15Normalization } from './Lesson15Normalization';
import { Lesson16HistoryUndoRedo } from './Lesson16HistoryUndoRedo';
import { Lesson17RenderTextVsLeaf } from './Lesson17RenderTextVsLeaf';

export type LessonEntry = {
  id: string;
  label: string;
  Component: ComponentType;
};

export const lessons: LessonEntry[] = [
  { id: '01', label: '01 最小编辑器', Component: Lesson01MinimalEditor },
  { id: '02', label: '02 Value 同步', Component: Lesson02ValueAndChange },
  { id: '03', label: '03 自定义渲染', Component: Lesson03CustomRender },
  { id: '04', label: '04 Marks', Component: Lesson04Marks },
  { id: '05', label: '05 Block 块', Component: Lesson05BlockElements },
  { id: '06', label: '06 工具栏', Component: Lesson06ToolbarAndSlateContext },
  { id: '07', label: '07 快捷键', Component: Lesson07KeyboardShortcuts },
  { id: '08', label: '08 Void 图片', Component: Lesson08VoidElements },
  { id: '09', label: '09 Transforms', Component: Lesson09Transforms },
  { id: '10', label: '10 插件', Component: Lesson10EditorPlugins },
  { id: '11', label: '11 多层嵌套', Component: Lesson11NestedDemo },
  { id: '12', label: '12 Locations', Component: Lesson12LocationsDemo },
  { id: '13', label: '13 跨段加粗', Component: Lesson13CrossBlockBoldDemo },
  { id: '14', label: '14 序列化/Operations', Component: Lesson14SerializingOpsDecorations },
  { id: '15', label: '15 Normalization', Component: Lesson15Normalization },
  { id: '16', label: '16 History 撤销', Component: Lesson16HistoryUndoRedo },
  { id: '17', label: '17 renderText', Component: Lesson17RenderTextVsLeaf },
];
