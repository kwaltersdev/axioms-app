import { EditSystem } from '@/components/EditSystem';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <EditSystem />
    </main>
  );
}
