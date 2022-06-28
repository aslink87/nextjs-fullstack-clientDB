import Head from 'next/head';
import styles from './PrimaryLayout.module.scss'

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children}) => {
  return (
    <>
      <Head>
        <title>NextJs Fullstack App Template</title>
      </Head>
        <main className={styles.main}>{children}</main>
    </>
  );
};

export default PrimaryLayout;
