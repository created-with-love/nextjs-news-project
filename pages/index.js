import { Toolbar } from '../components/toolbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Next.js News App</h1>
        <h3>Take a cup of coffee and look for a fresh information</h3>
      </div>
    </div>
  );
}
