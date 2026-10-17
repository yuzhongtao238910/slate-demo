import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor } from 'slate-react';

/** Slate 文档里每一段文字节点（Leaf）可带的「行内样式」——也叫 Mark */
export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
  code?: true;
};

export type LinkElement = {
  type: 'link';
  url: string;
  children: FormattedText[];
};

/** 段落 children 可以是 Text，也可以是行内 Element（如 link） */
export type ParagraphElement = {
  type: 'paragraph';
  children: Array<FormattedText | LinkElement>;
};

export type HeadingElement = {
  type: 'heading';
  level: 1 | 2;
  children: FormattedText[];
};

/** 引用块里可以再套多个 paragraph（块套块） */
export type BlockQuoteElement = {
  type: 'block-quote';
  children: Array<ParagraphElement | FormattedText>;
};

export type CodeBlockElement = {
  type: 'code-block';
  children: FormattedText[];
};

/** 列表项里可以是文字，也可以再套一层 bulleted-list（多级列表） */
export type ListItemElement = {
  type: 'list-item';
  children: Array<FormattedText | BulletedListElement | ParagraphElement>;
};

export type BulletedListElement = {
  type: 'bulleted-list';
  children: ListItemElement[];
};

/** Void 元素：内部没有可编辑文字，只占位（如图片） */
export type ImageElement = {
  type: 'image';
  url: string;
  children: [{ text: '' }];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockQuoteElement
  | CodeBlockElement
  | BulletedListElement
  | ListItemElement
  | ImageElement
  | LinkElement;

export type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: FormattedText;
  }
}

export type SlateValue = Descendant[];
