import { Editor, Node, Range } from 'slate';
import type { BaseSelection } from 'slate';
import type { CustomEditor } from '../custom-types';

type LocationInspectorProps = {
  editor: CustomEditor;
  selection: BaseSelection;
};

function nodeSummary(editor: CustomEditor, path: number[]) {
  const node = Node.get(editor, path);
  if (Editor.isEditor(node)) {
    return 'Editor 根';
  }
  if (Editor.isBlock(editor, node) || ('type' in node && node.type)) {
    return `Element type="${(node as { type: string }).type}"`;
  }
  if ('text' in node) {
    return `Text "${node.text}"`;
  }
  return String(node);
}

export function LocationInspector({ editor, selection }: LocationInspectorProps) {
  const pathLegend = [
    { path: '[0]', desc: '第 1 个块（paragraph）' },
    { path: '[0, 0]', desc: 'Text「A line of text!」' },
    { path: '[1]', desc: '第 2 个块' },
    { path: '[1, 0]', desc: 'Text「第二段：」' },
    { path: '[1, 1]', desc: 'Text「ABC」（bold）' },
    { path: '[1, 2]', desc: 'Text「 结尾」' },
  ];

  let rangeInfo: {
    anchor: string;
    focus: string;
    start: string;
    end: string;
    isBackward: boolean;
    selectedText: string;
  } | null = null;

  if (selection) {
    const [start, end] = Range.edges(selection);
    rangeInfo = {
      anchor: `${JSON.stringify(selection.anchor.path)} offset ${selection.anchor.offset}`,
      focus: `${JSON.stringify(selection.focus.path)} offset ${selection.focus.offset}`,
      start: `${JSON.stringify(start.path)} offset ${start.offset}`,
      end: `${JSON.stringify(end.path)} offset ${end.offset}`,
      isBackward: Range.isBackward(selection),
      selectedText: Editor.string(editor, selection),
    };
  }

  return (
    <aside className="location-inspector">
      <h3>Path 速查（本课文档）</h3>
      <ul className="path-legend">
        {pathLegend.map((item) => (
          <li key={item.path}>
            <code>{item.path}</code> → {item.desc}
          </li>
        ))}
      </ul>

      <h3>当前 editor.selection</h3>
      {!selection ? (
        <p className="location-empty">null（编辑器未聚焦或无选区）</p>
      ) : (
        <>
          <pre className="location-json">{JSON.stringify(selection, null, 2)}</pre>
          {rangeInfo && (
            <dl className="location-dl">
              <dt>anchor（按下鼠标处）</dt>
              <dd>
                <code>{rangeInfo.anchor}</code>
              </dd>
              <dt>focus（松开鼠标处）</dt>
              <dd>
                <code>{rangeInfo.focus}</code>
              </dd>
              <dt>start（文档顺序靠前）</dt>
              <dd>
                <code>{rangeInfo.start}</code>
              </dd>
              <dt>end（文档顺序靠后）</dt>
              <dd>
                <code>{rangeInfo.end}</code>
              </dd>
              <dt>Range.isBackward</dt>
              <dd>{rangeInfo.isBackward ? 'true（从右往左拖选）' : 'false'}</dd>
              <dt>选中文字 Editor.string</dt>
              <dd>
                <code>{rangeInfo.selectedText || '（空）'}</code>
              </dd>
            </dl>
          )}
        </>
      )}

      <h3>Node.get 示例</h3>
      <p className="location-hint">
        Path <code>[0, 0]</code> → {nodeSummary(editor, [0, 0])}
      </p>
    </aside>
  );
}
