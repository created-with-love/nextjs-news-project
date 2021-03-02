import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
  const router = useRouter();

  const onGithubLinkClick = () => {
    window.open('https://github.com/created-with-love', '_blank');
  };

  return (
    <div className={styles.main}>
      <div onClick={() => router.push('/')}>Home</div>
      <div onClick={() => router.push('/feed/1')}>Feed</div>
      <div onClick={() => router.push('/eom')}>EOM</div>
      <div onClick={onGithubLinkClick}>Github</div>
    </div>
  );
};
