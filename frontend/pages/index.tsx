import CatCard from '../components/cards/cat/CatCard'
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

import styles from '../styles/Home.module.scss'

const Home: NextPageWithLayout = () => {
  return (
    <section className={styles.main}>
      <CatCard {...mockCatCardProps.base} />
      <p>
        Google offered in:{' '}
      </p>
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
