import styles from "./page.module.css";
import ExampleUsage from "@/components/Direactree/ExampleUsage";
import PropsSection from "@/components/Direactree/PropsSection";
import "@/styles/global.css";
import { GithubOutlined } from "@ant-design/icons";
export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Direactree</h1>
        <p>A React component for showing and interacting with directory structures.</p>
        <br />
        <div className={styles.install}>
          <p> Install: <code>npm install direactree</code></p>
          <p>Import: <code>import {`${'{ Direactree }'}`} from "direactree";</code></p>
          <p>Source: <GithubOutlined /> <a href="https://github.com/MERTULAS/direactree">GitHub - MERTULAS/direactree</a></p>
        </div>

        <h3><b>NOTE:</b> For Next.js 13 and later versions:</h3>
        <p>In Next.js 13 and later versions, all components are considered Server Components by default. Since Direactree is a Client Component, you have two different usage methods:</p>
        <ul className={styles.includeCodeTags}>
          <li>1. Using Special Next.js Import (Recommended)</li>
          <pre className="code-example"><code>import Direactree from "direactree/next";</code></pre>
          <li>2. Using Default Import</li>
          <pre className="code-example"><code>{`"use client"

import Direactree from "direactree";`}
          </code></pre>
        </ul>
        
        <h2>Getting Started</h2>

        <h3>Direactree Features</h3>
        <ul>
          <li>Create Folder anywhere in the tree</li>
          <li>Create File anywhere in the tree</li>
          <li>Rename file or folder anywhere in the tree</li>
          <li>Delete file or folder anywhere in the tree</li>
          <li>Move file or folder anywhere in the tree</li>
        </ul>

        <h3><b>NOTE:</b> Direactree guarantees the following:</h3>
        <ul>
          <li>Folder or file can't move to itself</li>
          <li>Folders can't move to its children</li>
          <li>Folders or files can't create in the file</li>
        </ul>
        <ExampleUsage />
        <PropsSection />
        <footer className={styles.footer}>
          <p>Made with ❤️ by <span><a style={{ display: 'inline-block' }} href="https://github.com/MERTULAS">MERTULAS</a></span></p>
        </footer>
      </main>
    </div>
  );
}
