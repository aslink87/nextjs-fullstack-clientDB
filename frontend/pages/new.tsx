import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page'

const New: NextPageWithLayout = () => {
  return (
    <>
      <h1>Hellof from New Page</h1>
    </>
  )
}

export default New;

New.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};
