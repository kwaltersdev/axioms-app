import { Axioms } from '@/components/Axioms';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Axioms />
    </main>
  );
}
