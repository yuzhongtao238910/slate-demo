import type { ReactNode } from 'react';

type LessonLayoutProps = {
  step: number;
  title: string;
  concept: string;
  children: ReactNode;
};

export function LessonLayout({ step, title, concept, children }: LessonLayoutProps) {
  return (
    <section className="lesson">
      <header className="lesson-header">
        <span className="lesson-step">第 {step} 课</span>
        <h2>{title}</h2>
        <p className="lesson-concept">{concept}</p>
      </header>
      <div className="lesson-body">{children}</div>
    </section>
  );
}
