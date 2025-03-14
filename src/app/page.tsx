import styles from "./page.module.css";
import ExampleUsage from "@/components/Direactree/ExampleUsage";
import PropsSection from "@/components/Direactree/PropsSection";
import "@/styles/global.css";
import { GithubOutlined } from "@ant-design/icons";
export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Direactree</h1>
          <p>A React component for showing and interacting with directory structures.</p>
        </div>
        <br />
        <p> Install: <code>npm install direactree</code></p>
        <p>Import: <code>import {`${'{ Direactree }'}`} from "direactree";</code></p>
        <p>Source: <GithubOutlined /> <a href="https://github.com/MERTULAS/direactree">GitHub - MERTULAS/direactree</a></p>
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
      </main>
      <footer className={styles.footer}>
        <p>Made with ❤️ by <span><a style={{ display: 'inline-block' }} href="https://github.com/MERTULAS">MERTULAS</a></span></p>
      </footer>
    </div>
  );
}
