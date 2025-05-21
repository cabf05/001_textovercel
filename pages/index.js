import Head from 'next/head'
import clsx from 'clsx'
import { useState } from 'react'
import EditorSwitcher from '../components/EditorSwitcher'

export default function Home() {
  const [theme, setTheme] = useState('light')

  return (
    <>
      <Head>
        <title>Professional Rich Text Editor</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        />
      </Head>
      <div className={clsx('app-container', theme)}>
        <header className="header">
          <h1>Professional Rich Text System</h1>
          <button
            type="button"
            className="theme-btn"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          >
            Toggle Theme
          </button>
        </header>
        <main className="main">
          <EditorSwitcher />
        </main>
        <style jsx>{`
          .app-container {
            padding: 2rem;
            font-family: Arial, sans-serif;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }
          .theme-btn {
            padding: 0.5rem 1rem;
            border: none;
            background: #0070f3;
            color: white;
            border-radius: 4px;
            cursor: pointer;
          }
          .main {
            background: var(--bg);
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .light {
            --bg: #fff;
            color: #000;
          }
          .dark {
            --bg: #1a1a1a;
            color: #f0f0f0;
          }
        `}</style>
      </div>
    </>
  )
}
