import type { SlateValue } from './custom-types';

/** 最简文档：一个空段落 */
export const emptyDocument: SlateValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const welcomeDocument: SlateValue = [
  {
    type: 'heading',
    level: 1,
    children: [{ text: 'Slate 教程' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: '这是 ' },
      { text: '富文本', bold: true },
      { text: ' 编辑器框架。选中文字后点工具栏试试。' },
    ],
  },
];

export const blocksDemoDocument: SlateValue = [
  {
    type: 'heading',
    level: 2,
    children: [{ text: '块级元素示例' }],
  },
  {
    type: 'block-quote',
    children: [{ text: '引用块：适合强调摘录。' }],
  },
  {
    type: 'code-block',
    children: [{ text: 'const hello = "Slate";' }],
  },
  {
    type: 'bulleted-list',
    children: [
      { type: 'list-item', children: [{ text: '列表项 A' }] },
      { type: 'list-item', children: [{ text: '列表项 B' }] },
    ],
  },
];

/**
 * 多层嵌套示例：引用套段落、三级列表、段落内 link 行内嵌套。
 * 左侧编辑，右侧 JSON 可对照树形结构。
 */
export const nestedNestDocument: SlateValue = [
  {
    type: 'heading',
    level: 2,
    children: [{ text: '多层嵌套 Demo' }],
  },
  {
    type: 'block-quote',
    children: [
      {
        type: 'paragraph',
        children: [{ text: '引用 → 段落 1：块套块的第一层。' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: '引用 → 段落 2：同一块内再套一段，含 ' },
          { text: '加粗', bold: true },
          { text: ' 文字。' },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: '段落里的行内链接：' },
      {
        type: 'link',
        url: 'https://docs.slatejs.org/',
        children: [{ text: 'Slate 文档（link → text）' }],
      },
      { text: '。' },
    ],
  },
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [{ text: '一级：概念' }],
      },
      {
        type: 'list-item',
        children: [
          { text: '一级：技术栈' },
          {
            type: 'bulleted-list',
            children: [
              {
                type: 'list-item',
                children: [{ text: '二级：React' }],
              },
              {
                type: 'list-item',
                children: [
                  { text: '二级：Slate' },
                  {
                    type: 'bulleted-list',
                    children: [
                      {
                        type: 'list-item',
                        children: [{ text: '三级：renderElement' }],
                      },
                      {
                        type: 'list-item',
                        children: [{ text: '三级：renderLeaf' }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

/** 与官方 Locations 文档同构的第一段 + 多 Text 的第二段，便于对照 Path / Point */
/** 官方 Serializing 文档同构示例（link + block-quote） */
export const serializeDemoDocument: SlateValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'An opening paragraph with a ' },
      {
        type: 'link',
        url: 'https://example.com',
        children: [{ text: 'link' }],
      },
      { text: ' in it.' },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'A closing paragraph!' }],
  },
];

export const locationTutorialDocument: SlateValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text!' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: '第二段：' },
      { text: 'ABC', bold: true },
      { text: ' 结尾' },
    ],
  },
];
