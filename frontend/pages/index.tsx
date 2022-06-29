import CatCard from '../components/cards/cat/CatCard'
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import Search from '../components/utility/search/Search';
import { NextPageWithLayout } from './page';


const Home: NextPageWithLayout = () => {
  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-500">
      <CatCard {...mockCatCardProps.base} />
      <Search />
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
