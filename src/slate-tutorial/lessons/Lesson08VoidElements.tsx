import { useMemo } from 'react';
import { Transforms } from 'slate';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { withLinksAndVoids } from '../plugins/withLinksAndVoids';
import { ElementRenderer } from '../renderers/ElementRenderer';

const withImageDocument: SlateValue = [
  {
    type: 'paragraph',
    children: [{ text: '下面是一张 void 图片节点（不能在图里打字）：' }],
  },
  {
    type: 'image',
    url: 'https://picsum.photos/seed/slate-tutorial/480/240',
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

/**
 * Void 节点：isVoid 返回 true，必须有一个空 text 子节点占位。
 * 渲染时 contentEditable={false} 防止光标进入内部。
 */
export function Lesson08VoidElements() {
  const editor = useMemo(
    () => withLinksAndVoids(createReactEditor()),
    [],
  );

  const insertImage = () => {
    Transforms.insertNodes(editor, {
      type: 'image',
      url: 'https://picsum.photos/seed/slate-insert/480/240',
      children: [{ text: '' }],
    });
  };

  return (
    <LessonLayout
      step={8}
      title="Void 元素（图片）"
      concept="插件里把 image 标记为 void。插入用 Transforms.insertNodes。Void 适合嵌入组件、附件、公式等不可编辑块。"
    >
      <Slate editor={editor} initialValue={withImageDocument}>
        <button type="button" className="toolbar-btn" onClick={insertImage}>
          插入图片
        </button>
        <Editable
          className="slate-editable"
          renderElement={(props) => <ElementRenderer {...props} />}
        />
      </Slate>
    </LessonLayout>
  );
}
