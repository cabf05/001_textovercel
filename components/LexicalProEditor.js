
import React, { useState, useCallback } from 'react';
import {
  LexicalComposer, RichTextPlugin, ContentEditable,
  HistoryPlugin, OnChangePlugin, LexicalErrorBoundary
} from '@lexical/react';
import { ListPlugin } from '@lexical/list';
import { TablePlugin } from '@lexical/table';
import { CodeHighlightPlugin } from '@lexical/code';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { TableNode, TableRowNode, TableCellNode } from '@lexical/table';
import { CodeNode } from '@lexical/code';

const initialConfig = {
  namespace: 'ProLexical',
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, TableNode, TableRowNode, TableCellNode, CodeNode, LinkNode, AutoLinkNode],
  onError(error) { console.error(error); }
};

export default function LexicalProEditor(){
  const [raw, setRaw] = useState('<h2>Professional Lexical</h2><p>Rich text with lists, tables, code, links...</p>');
  const [editorState, setEditorState] = useState(null);
  const onChange = useCallback((state)=> setEditorState(state),[]);
  const load=()=>{/* importFromHtml(raw) via utils */ alert('Use importFromHtml util');};
  const exportHTML=()=>{/* exportToHtml(editorState) */ alert('Use exportToHtml util');};
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div>
        <button onClick={load}>Load</button><button onClick={exportHTML} style={{marginLeft:8}}>Export</button>
      </div>
      <div className="editor-frame">
        <RichTextPlugin contentEditable={<ContentEditable className="editor" />} placeholder={<div className="placeholder">Start writing...</div>} ErrorBoundary={LexicalErrorBoundary} />
        <HistoryPlugin /><OnChangePlugin onChange={onChange} /><ListPlugin /><TablePlugin /><CodeHighlightPlugin />
      </div>
      <style jsx>{`
        .editor-frame{border:1px solid #ddd;padding:1rem;border-radius:4px;min-height:300px;}
        .editor{outline:none;min-height:300px;}
        .placeholder{color:#999;}
      `}</style>
    </LexicalComposer>
  );
}
