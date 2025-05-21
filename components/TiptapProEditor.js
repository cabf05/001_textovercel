/* === components/TiptapProEditor.js === */
import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

export default function TiptapProEditor() {
  const [raw, setRaw] = useState('<h2>Professional TipTap</h2><p>Edit with <strong>bold</strong>, <em>italic</em>, tables, images, links...</p>');
  const editor = useEditor({
    extensions: [StarterKit, Image, Link, TextAlign.configure({ types:['heading','paragraph']}), Table.configure({ resizable:true }), TableRow, TableHeader, TableCell],
    content: raw
  });
  const load = useCallback(()=>editor.commands.setContent(raw),[editor,raw]);
  const exportHTML = useCallback(()=>window.prompt('Copy:',editor.getHTML()),[editor]);
  if(!editor) return null;
  return (
    <div>
      <div className="toolbar">
        <button onClick={()=>editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={()=>editor.chain().focus().toggleItalic().run()}>I</button>
        <button onClick={()=>editor.chain().focus().toggleUnderline().run()}>U</button>
        <button onClick={()=>editor.chain().focus().toggleCodeBlock().run()}>Code</button>
        <button onClick={()=>editor.chain().focus().setTextAlign('center').run()}>Center</button>
        <button onClick={()=>editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={()=>editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button onClick={()=>editor.chain().focus().setLink({ href:'https://example.com' }).run()}>Link</button>
        <button onClick={()=>editor.chain().focus().insertTable({ rows:2,cols:3 }).run()}>Table</button>
        <button onClick={()=>{ const url=prompt('Image URL'); url && editor.chain().focus().setImage({ src:url }).run(); }}>Image</button>
        <button onClick={exportHTML}>Export</button>
        <button onClick={load}>Load</button>
      </div>
      <EditorContent editor={editor} className="editor" />
      <style jsx>{`
        .toolbar{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;}
        .toolbar button{padding:4px 8px;border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer;}
        .editor{border:1px solid #ddd;padding:1rem;border-radius:4px;min-height:300px;}
      `}</style>
    </div>
  );
}
