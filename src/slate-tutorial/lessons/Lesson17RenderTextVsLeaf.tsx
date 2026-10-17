import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { NodeEntry, Text } from 'slate';
import type { RenderLeafProps, RenderTextProps } from 'slate-react';
import { Editable, Slate } from 'slate-react';
import { LessonLayout } from '../components/LessonLayout';
import { createReactEditor } from '../createReactEditor';
import type { SlateValue } from '../custom-types';
import { ElementRenderer } from '../renderers/ElementRenderer';
import { LeafRenderer } from '../renderers/LeafRenderer';

const renderTextDemoDocument: SlateValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Hello Slate world — decoration 会在 render 时把 Text 拆成多个 leaf。',
      },
    ],
  },
];

export function Lesson17RenderTextVsLeaf() {
  const editor = useMemo(() => createReactEditor(), []);
  const statsRef = useRef({ text: 0, leaf: 0 });
  const [stats, setStats] = useState({ text: 0, leaf: 0 });
  const [keyword, setKeyword] = useState('Slate');

  const decorate = useCallback(
    ([node, path]: NodeEntry) => {
      if (!keyword.trim() || !Text.isText(node)) {
        return [];
      }
      const ranges = [];
      const { text } = node;
      let start = 0;
      while (start <= text.length) {
        const index = text.indexOf(keyword, start);
        if (index === -1) {
          break;
        }
        ranges.push({
          anchor: { path, offset: index },
          focus: { path, offset: index + keyword.length },
          searchHit: true,
        });
        start = index + keyword.length;
      }
      return ranges;
    },
    [keyword],
  );

  const renderText = useCallback((props: RenderTextProps) => {
    statsRef.current.text += 1;
    return (
      <span {...props.attributes} className="render-text-wrap" title="renderText：整段 Text 只包一层">
        {props.children}
      </span>
    );
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    statsRef.current.leaf += 1;
    let inner = <LeafRenderer {...props} />;
    if ('searchHit' in props.leaf && props.leaf.searchHit) {
      inner = <mark className="decoration-highlight">{inner}</mark>;
    }
    return inner;
  }, []);

  useLayoutEffect(() => {
    setStats({ text: statsRef.current.text, leaf: statsRef.current.leaf });
    statsRef.current.text = 0;
    statsRef.current.leaf = 0;
  });

  return (
    <LessonLayout
      step={17}
      title="renderText vs renderLeaf"
      concept="renderLeaf：每个 leaf 一次（Mark / Decoration 会拆 leaf）。renderText：每个 Text 节点只包一层。改关键词看右侧计数：leaf 次数 ≥ text 次数。"
    >
      <div className="lesson17-layout">
        <div>
          <Slate editor={editor} initialValue={renderTextDemoDocument}>
            <div className="format-toolbar">
              <label className="lesson14-label">
                Decoration 关键词
                <input
                  className="lesson14-input"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </label>
            </div>
            <Editable
              className="slate-editable"
              decorate={decorate}
              renderElement={(props) => <ElementRenderer {...props} />}
              renderText={renderText}
              renderLeaf={renderLeaf}
            />
          </Slate>
        </div>
        <aside className="lesson17-stats">
          <h3>本轮渲染调用次数（约）</h3>
          <p>
            <code>renderText</code>：<strong>{stats.text}</strong> 次（每个 Text 节点 1 次）
          </p>
          <p>
            <code>renderLeaf</code>：<strong>{stats.leaf}</strong> 次（Decoration 命中会拆成多 leaf）
          </p>
          <p className="lesson-hint">
            段外虚线框来自 renderText；黄色来自 renderLeaf + decoration。bold 等 Mark 也在 renderLeaf 里处理。
          </p>
        </aside>
      </div>
    </LessonLayout>
  );
}
