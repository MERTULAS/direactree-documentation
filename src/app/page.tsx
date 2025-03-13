import styles from "./page.module.css";
import ExampleUsage from "@/components/Direactree/ExampleUsage";
import PropsSection from "@/components/Direactree/PropsSection";
import "@/styles/global.css";

export default function Home() {
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Direactree</h1>
          <p>A React component for showing and interacting with directory structures.</p>
          <br />
          <p> Install: <code>npm install direactree</code></p>
          <p>Import: <code>import {`${ '{ Direactree }' }`} from "direactree";</code></p>
          <p>Source: <a href="https://github.com/MERTULAS/direactree">GitHub</a></p>
          <h2>Getting Started</h2>
        </div>
        <ExampleUsage />
        <PropsSection />
      </main>
    </div>
  );
}
