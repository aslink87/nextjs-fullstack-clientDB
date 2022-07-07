import Form from '../components/form/Form';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page'

const New: NextPageWithLayout = () => {
  return (
  <>
    <Form />
  </>
  )
}

export default New;

New.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};
