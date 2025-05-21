import { useState } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const TiptapEditor = dynamic(() => import('./TiptapProEditor'), { ssr: false });
const CkeditorPro = dynamic(() => import('./CkeditorProEditor'), { ssr: false });
const LexicalEditor = dynamic(() => import('./LexicalProEditor'), { ssr: false });

export default function EditorSwitcher() {
  const [editor, setEditor] = useState('tiptap');
  const [step, setStep] = useState(0);

  const startEditing = () => setStep(1);
  const reset = () => setStep(0);

  return (
    <div className="editor-switcher">
      {step === 0 ? (
        <div className="selection-step">
          <h2>Escolha seu editor:</h2>
          <div className="tabs">
            {['tiptap', 'ckeditor', 'lexical'].map((key) => (
              <button
                key={key}
                className={clsx('tab-btn', { active: editor === key })}
                onClick={() => setEditor(key)}
                type="button"
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="proceed-btn" onClick={startEditing} type="button">
            Avançar
          </button>
        </div>
      ) : (
        <div className="editor-step">
          <div className="editor-header">
            <button className="back-btn" onClick={reset} type="button">
              ← Voltar
            </button>
            <h2>{editor.toUpperCase()} Editor</h2>
          </div>
          <div className="editor-area">
            {editor === 'tiptap' && <TiptapEditor />}
            {editor === 'ckeditor' && <CkeditorPro />}
            {editor === 'lexical' && <LexicalEditor />}
          </div>
        </div>
      )}

      <style jsx>{`
        .selection-step, .editor-step {
          width: 100%;
        }
        .tabs {
          display: flex;
          margin: 1rem 0;
        }
        .tab-btn {
          flex: 1;
          padding: 0.75rem;
          margin-right: 0.5rem;
          border: none;
          background: #eee;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tab-btn:last-child { margin-right: 0; }
        .tab-btn:hover { background: #ddd; }
        .tab-btn.active { background: #0070f3; color: #fff; }
        .proceed-btn, .back-btn {
          padding: 0.5rem 1rem;
          margin-top: 1rem;
          border: none;
          background: #0070f3;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .editor-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        .back-btn { margin-right: 1rem; }
        .editor-area { min-height: 400px; }
      `}</style>
    </div>
  );
}
