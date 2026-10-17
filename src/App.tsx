import { useState } from 'react';
import './App.css';
import { lessons } from './slate-tutorial/lessons';

const App = () => {
  const [activeId, setActiveId] = useState(lessons[0]?.id ?? '01');
  const active = lessons.find((lesson) => lesson.id === activeId) ?? lessons[0];
  const ActiveLesson = active?.Component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Slate 分步教程</h1>
        <p>
          项目已安装 <code>slate</code> + <code>slate-react</code>。左侧切换课程，右侧阅读概念并动手编辑。
        </p>
      </header>
      <div className="app-layout">
        <nav className="lesson-nav" aria-label="课程列表">
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              className={lesson.id === activeId ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActiveId(lesson.id)}
            >
              {lesson.label}
            </button>
          ))}
        </nav>
        <main className="lesson-main">{ActiveLesson ? <ActiveLesson /> : null}</main>
      </div>
    </div>
  );
};

export default App;
