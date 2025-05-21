
import { useState } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const TiptapEditor = dynamic(() => import('./TiptapProEditor'), { ssr: false });
const CkeditorPro = dynamic(() => import('./CkeditorProEditor'), { ssr: false });
const LexicalEditor = dynamic(() => import('./LexicalProEditor'), { ssr: false });

export default function EditorSwitcher() {
  const [editor, setEditor] = useState('tiptap');
  return (
    <div>
      <div className="tabs">
        {['tiptap','ckeditor','lexical'].map(key => (
          <button key={key} className={clsx('tab-btn', editor===key && 'active')} onClick={()=>setEditor(key)}>
            {key.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="editor-area">
        {editor==='tiptap' && <TiptapEditor />}
        {editor==='ckeditor' && <CkeditorPro />}
        {editor==='lexical' && <LexicalEditor />}
      </div>
      <style jsx>{`
        .tabs { display: flex; margin-bottom: 1rem; }
        .tab-btn { flex:1; padding:0.75rem; border:none; background:#eee; cursor:pointer; }
        .tab-btn.active { background:#0070f3; color:#fff; }
        .editor-area { min-height:400px; }
      `}</style>
    </div>
}
