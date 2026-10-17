import type { RenderElementProps } from 'slate-react';

/**
 * renderElement：把 JSON 里的 Element 节点映射成真实 DOM。
 * Slate 只存数据，长什么样完全由你决定。
 */
export function ElementRenderer(props: RenderElementProps) {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'heading':
      return element.level === 1 ? (
        <h1 {...attributes}>{children}</h1>
      ) : (
        <h2 {...attributes}>{children}</h2>
      );
    case 'block-quote':
      return (
        <blockquote {...attributes} className="slate-block-quote">
          {children}
        </blockquote>
      );
    case 'code-block':
      return (
        <pre {...attributes} className="slate-code-block">
          <code>{children}</code>
        </pre>
      );
    case 'bulleted-list':
      return (
        <ul {...attributes} className="slate-list">
          {children}
        </ul>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'image':
      return (
        <div {...attributes} contentEditable={false} className="slate-image-wrap">
          <img src={element.url} alt="" className="slate-image" />
          {children}
        </div>
      );
    case 'link':
      return (
        <a {...attributes} href={element.url} className="slate-link">
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}
