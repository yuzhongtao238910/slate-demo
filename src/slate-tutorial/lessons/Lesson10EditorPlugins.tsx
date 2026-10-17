import { useMemo } from 'react';
import { Transforms } from 'slate';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { withLinksAndVoids } from '../plugins/withLinksAndVoids';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

const linkDocument: SlateValue = [
  {
    type: 'paragraph',
    children: [
      { text: '访问 ' },
      {
        type: 'link',
        url: 'https://docs.slatejs.org/',
        children: [{ text: 'Slate 官方文档' }],
      },
      { text: ' 学习更多。' },
    ],
  },
];

/**
 * 组合插件：withReact → withLinksAndVoids → 你的业务插件（history、协作等）。
 */
export function Lesson10EditorPlugins() {
  const editor = useMemo(
    () => withLinksAndVoids(createReactEditor()),
    [],
  );

  const wrapLink = () => {
    const url = window.prompt('链接 URL', 'https://');
    if (!url) {
      return;
    }
    Transforms.wrapNodes(
      editor,
      { type: 'link', url, children: [] },
      { split: true },
    );
  };

  return (
    <LessonLayout
      step={10}
      title="Editor 插件模式"
      concept="withLinksAndVoids 改写 isInline(link) 与 isVoid(image)。复杂项目会叠加 slate-history（撤销）、normalizeNode（规范文档形状）等。"
    >
      <Slate editor={editor} initialValue={linkDocument}>
        <button
          type="button"
          className="toolbar-btn"
          onMouseDown={(event) => {
            event.preventDefault();
            wrapLink();
          }}
        >
          选中文字 → 设为链接
        </button>
        <Editable
          className="slate-editable"
          renderElement={(props) => <ElementRenderer {...props} />}
          renderLeaf={(props) => <LeafRenderer {...props} />}
        />
      </Slate>
    </LessonLayout>
  );
}
