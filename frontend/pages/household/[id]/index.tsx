import { GetStaticPaths, GetStaticProps } from "next";
import HouseholdForm from '../../../components/form/UpdateHouseholdFormTest'
import { NextPageWithLayout } from "../../page";
import PrimaryLayout from '../../../components/layouts/primary/PrimaryLayout';

const Household: NextPageWithLayout = ({household, id}: any) => {
  const data = household.data.attributes
  return (
    <HouseholdForm household={data} id={id}/>
  )
}

export default Household;

Household.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context.params)
  const res = await fetch(`http://localhost:1337/api/households/${context?.params?.id}?populate=*`)

  const household = await res.json()
  const id = household.data.id

  return {
    props: {
      household,
      id,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:1337/api/households?populate=individuals')
  const households = await res.json()
  const homes = households.data
  const paths = homes.map((home: any) => ({
    params: {id: home.id.toString(),}
  }))

  return { paths, fallback: false }
}
