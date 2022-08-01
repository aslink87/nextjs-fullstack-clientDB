import { GetStaticPaths, GetStaticProps } from "next";
import HouseholdForm from '../../../components/form/UpdateHouseholdForm'
import { NextPageWithLayout } from "../../page";
import PrimaryLayout from '../../../components/layouts/primary/PrimaryLayout';
import { HouseholdModel } from "../../../lib/new/types";

const Household: NextPageWithLayout = ({household, id}: any) => {
  const data = household.data.attributes

  const saveEnteredDataHandler = (enteredHouseholdData: HouseholdModel) => {
    const enteredData = {...enteredHouseholdData}
    const data = {
      id: id,
      address: enteredData.address,
      city: enteredData.city,
      zipcode: enteredData.zipcode,
      district: enteredData.district,
      county: enteredData.county,
      mortgage: enteredData.mortgage,
      rent: enteredData.rent,
      landlord: enteredData.landlord,
      homelesstype: enteredData.homelesstype,
    }
    console.log(data)

    if (data.id) {
      fetch(`http://localhost:3000/api/updatehousehold`, {
          body: JSON.stringify({data}),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
    }
  }

  return (
    <HouseholdForm onSaveEnteredData={saveEnteredDataHandler} household={data} id={id}/>
  )
}

export default Household;

Household.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
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
