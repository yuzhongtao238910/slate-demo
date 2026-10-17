import { useMemo, useState } from 'react';
import { Editor, Transforms } from 'slate';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { ValuePreview } from '../components/ValuePreview';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { withListNormalization } from '../plugins/withListNormalization';
import { ElementRenderer } from '../renderers/ElementRenderer';

const normalizeDemoDocument: SlateValue = [
  {
    type: 'paragraph',
    children: [{ text: '下面可以插入「非法」list-item，normalizeNode 会自动包一层 bulleted-list。' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function clone(value: SlateValue): SlateValue {
  return JSON.parse(JSON.stringify(value)) as SlateValue;
}

export function Lesson15Normalization() {
  const editor = useMemo(
    () => withListNormalization(createReactEditor()),
    [],
  );
  const [value, setValue] = useState(() => clone(normalizeDemoDocument));

  const insertIllegalListItem = () => {
    Transforms.insertNodes(
      editor,
      {
        type: 'list-item',
        children: [{ text: '孤立的 list-item（无 ul 父级）' }],
      },
      { at: [1] },
    );
    setValue(clone(editor.children as SlateValue));
  };

  const forceNormalize = () => {
    Editor.normalize(editor, { force: true });
    setValue(clone(editor.children as SlateValue));
  };

  return (
    <LessonLayout
      step={15}
      title="Normalization（normalizeNode）"
      concept="Slate 在每次变更后会 normalize：不合法结构会被插件修掉。本课 withListNormalization 会把顶层的 list-item 包进 bulleted-list。点「插入非法 list-item」看 JSON 如何被自动修正。"
    >
      <div className="lesson-split">
        <div>
          <Slate editor={editor} initialValue={value} onValueChange={() => setValue(clone(editor.children as SlateValue))}>
            <div className="format-toolbar">
              <button type="button" className="toolbar-btn" onClick={insertIllegalListItem}>
                插入非法 list-item
              </button>
              <button type="button" className="toolbar-btn" onClick={forceNormalize}>
                Editor.normalize(force)
              </button>
            </div>
            <Editable
              className="slate-editable"
              renderElement={(props) => <ElementRenderer {...props} />}
            />
          </Slate>
        </div>
        <ValuePreview value={value} title="当前 JSON（normalize 后）" />
      </div>
    </LessonLayout>
  );
}
