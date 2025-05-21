/* === components/CkeditorProEditor.js === */
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(m=>m.CKEditor),{ ssr:false });
const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'),{ ssr:false });

export default function CkeditorProEditor() {
  const [raw, setRaw] = useState('<h2>Professional CKEditor</h2><p>Tables, images, media embed, comments...</p>');
  const editorRef = useRef(null);
  const load = ()=>editorRef.current.setData(raw);
  const exportHTML = ()=>window.prompt('Copy:',editorRef.current.getData());
  return (
    <div>
      <textarea value={raw} onChange={e=>setRaw(e.target.value)} style={{width:'100%',height:120,fontFamily:'monospace'}} />
      <button onClick={load}>Load</button><button onClick={exportHTML} style={{marginLeft:8}}>Export</button>
      <div style={{marginTop:16}}>
        <CKEditor
          editor={ClassicEditor}
          data={raw}
          onReady={editor=>{editorRef.current=editor;}}
        />
      </div>
    </div>
  );
}
