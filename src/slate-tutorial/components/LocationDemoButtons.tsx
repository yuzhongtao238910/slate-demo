import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import type { CustomEditor } from '../custom-types';

type LocationDemoButtonsProps = {
  editor: CustomEditor;
};

function focusAndSelect(editor: CustomEditor, target: Parameters<typeof Transforms.select>[1]) {
  ReactEditor.focus(editor);
  Transforms.select(editor, target);
}

export function LocationDemoButtons({ editor }: LocationDemoButtonsProps) {
  return (
    <div className="location-demos">
      <section className="location-demo-block">
        <h4>Demo 1 · Path</h4>
        <p>
          Path 是节点地址。整篇选中用空 Path <code>[]</code>（官方示例）。
        </p>
        <button
          type="button"
          className="toolbar-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            focusAndSelect(editor, []);
          }}
        >
          Transforms.select(editor, [])
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            focusAndSelect(editor, {
              anchor: { path: [0, 0], offset: 0 },
              focus: { path: [0, 0], offset: 0 },
            });
          }}
        >
          光标 Path [0,0] offset 0
        </button>
      </section>

      <section className="location-demo-block">
        <h4>Demo 2 · Point</h4>
        <p>Point = path + offset，只能落在 Text 上。</p>
        <button
          type="button"
          className="toolbar-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            focusAndSelect(editor, {
              anchor: { path: [0, 0], offset: 15 },
              focus: { path: [0, 0], offset: 15 },
            });
          }}
        >
          句末 Point offset 15
        </button>
      </section>

      <section className="location-demo-block">
        <h4>Demo 3 · Range</h4>
        <p>Range = anchor + focus 两个 Point，表示一段选中。</p>
        <button
          type="button"
          className="toolbar-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            focusAndSelect(editor, {
              anchor: { path: [0, 0], offset: 0 },
              focus: { path: [0, 0], offset: 15 },
            });
          }}
        >
          选中整句「A line of text!」
        </button>
        <button
          type="button"
          className="toolbar-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            focusAndSelect(editor, {
              anchor: { path: [1, 1], offset: 0 },
              focus: { path: [1, 1], offset: 3 },
            });
          }}
        >
          选中 [1,1] 的「ABC」
        </button>
      </section>

      <section className="location-demo-block">
        <h4>Demo 4 · 反向 Range（anchor 在右）</h4>
        <p>从右往左拖选时 anchor 在 focus 后面，看右侧 isBackward。</p>
        <button
          type="button"
          className="toolbar-btn"
          onMouseDown={(e) => {
            e.preventDefault();
            focusAndSelect(editor, {
              anchor: { path: [0, 0], offset: 15 },
              focus: { path: [0, 0], offset: 0 },
            });
          }}
        >
          anchor=15, focus=0（反向）
        </button>
      </section>
    </div>
  );
}
