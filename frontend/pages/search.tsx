import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page'
import Search from '../components/utility/search/Search'

const SearchPage: NextPageWithLayout = () => {
  return (
    <>
     <Search />
    </>
  )
}

export default SearchPage;

SearchPage.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};

