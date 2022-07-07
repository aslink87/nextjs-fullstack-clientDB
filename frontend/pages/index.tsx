import { ChakraProvider } from '@chakra-ui/react';
import CatCard from '../components/cards/cat/CatCard'
import { mockCatCardProps } from '../components/cards/cat/CatCard.mocks';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';


const Home: NextPageWithLayout = () => {
  return (
    <ChakraProvider>
      <section className="bg-gradient-to-r from-cyan-500 to-blue-500">
        <CatCard {...mockCatCardProps.base} />
        <p>
          Google offered in:{' '}
        </p>
      </section>
    </ChakraProvider>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
