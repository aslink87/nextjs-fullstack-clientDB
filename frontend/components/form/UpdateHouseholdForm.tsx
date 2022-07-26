import React, {useRef, useState } from "react";
import {
  Button,
  Input,
  Select,
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";
import { HouseholdModel } from "../../lib/new/types";

const HouseholdForm = ({household, id}: any) => {
  const [useraddress, setUseraddress] = useState(household.address)

  const addressInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLSelectElement>(null);
  const zipcodeInputRef = useRef<HTMLInputElement>(null);
  const districtInputRef = useRef<HTMLSelectElement>(null);
  const countyInputRef = useRef<HTMLSelectElement>(null);
  const mortgageInputRef = useRef<HTMLInputElement>(null);
  const rentInputRef = useRef<HTMLInputElement>(null);
  const landlordInputRef = useRef<HTMLInputElement>(null);
  const homelessTypeInputRef = useRef<HTMLSelectElement>(null);

  const onSubmitHandler = async(event: React.FormEvent) => {
    event.preventDefault()

    const enteredData: HouseholdModel = {
      id: id,
      address: addressInputRef.current!.value,
      city: cityInputRef.current!.value === '' ? household.city : cityInputRef.current!.value,
      zipcode: +zipcodeInputRef.current!.value,
      district: districtInputRef.current!.value === '' ? household.district : districtInputRef.current!.value,
      county: countyInputRef.current!.value === '' ? household.county : countyInputRef.current!.value,
      mortgage: +mortgageInputRef.current!.value,
      rent: +rentInputRef.current!.value,
      landlord: landlordInputRef.current!.value === '' ? household.landlord : landlordInputRef.current!.value,
      homelesstype: homelessTypeInputRef.current!.value === '' ? household.homelesstype : homelessTypeInputRef.current!.value,
    }
    console.log(enteredData)
    await fetch('http://localhost:3000/api/updatehousehold', {
      body: JSON.stringify({ enteredData }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  return (
    <>
      <form className="w-4/5 mx-auto pt-20" id="client-form" onSubmit={onSubmitHandler}>
        <div className="shadow sm:rounded-t-md sm:overflow-hidden">
          <div className="bg-gray-50 text-center py-4">
            <>
            <span className="text-gray-500 text-center underline">Household Members:</span>
              <ul className="mt-2">
              {
                household.individuals.data.map((x: {id: number, attributes?: {firstname: string, lastname: string}}) => {
                return <li className="text-gray-500 capitalize" key={x.id}>{x.attributes!.firstname}{' '}{x.attributes!.lastname}</li>
                })
              }
              </ul>
            </>
          </div>
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div id="notice" className="hidden w-full text-center"></div>
            <div className="grid grid-cols-6 gap-5 grid-flow-row">
                <div className="col-span-2 mt-1 flex rounded-md h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Address
                    </span>
                    <Input
                      className="address capitalize focus:ring-indigo-500 w-14 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      id="address-text"
                      variant="unstyled"
                      isRequired={false}
                      _placeholder={{ opacity: 0.5, color: "#003768" }}
                      ref={addressInputRef}
                      value={useraddress}
                      onChange={(e) => setUseraddress(e.target.value)}
                    />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    City
                  </span>
                  <Select
                    variant="unstyled"
                    ref={cityInputRef}
                    placeholder={household.city}
                    className="city capitalize h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    >
                    <option value="plainwell">Ptown</option>
                    <option value="alamo">Alamo</option>
                    <option value="cooper">Cooper</option>
                    <option value="gunplain">Gun Plain</option>
                    <option value="martin">Martin</option>
                    <option value="otsego">Otsego</option>
                    <option value="otsegotownship">Otsego Township</option>
                    <option value="trowbridge">Trowbridge Township</option>
                    <option value="watson">Watson</option>
                  </Select>
                </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Zipcode
                    </span>
                    <NumberInput
                      className="w-full"
                      size="lg"
                      allowMouseWheel
                      variant="filled"
                      defaultValue={household.zipcode}
                      min={4000}
                    >
                      <NumberInputField ref={zipcodeInputRef} className="income h-10 focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
                    </NumberInput>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      District
                    </span>
                    <Select
                      variant="unstyled"
                      ref={districtInputRef}
                      placeholder={household.district}
                      className="district capitalize h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      >
                      <option value="plainwell">Plainwell</option>
                      <option value="otsego">Otsego</option>
                      <option value="allegan">Allegan</option>
                      <option value="deltonkellogg">Delton-Kellogg</option>
                      <option value="hamilton">Hamilton</option>
                      <option value="kalamazoo">Kalamazoo</option>
                      <option value="martin">Martin</option>
                      <option value="outofservice">Out-of-Service</option>
                    </Select>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      County
                    </span>
                    <Select
                      variant="unstyled"
                      ref={countyInputRef}
                      placeholder={household.county}
                      className="county capitalize h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      >
                      <option value="allegan">Allegan</option>
                      <option value="barry">Barry</option>
                      <option value="calhoun">Calhoun</option>
                      <option value="genesee">Genesee</option>
                      <option value="kalamazoo">Kalamazoo</option>
                      <option value="kent">Kent</option>
                      <option value="ottawa">Ottawa</option>
                      <option value="vanburen">Van Buren</option>
                    </Select>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Mortgage
                    </span>
                    <NumberInput
                      className="w-full"
                      allowMouseWheel
                      variant="unstyled"
                      precision={2}
                      step={1}
                      min={0}
                      defaultValue={household.mortgage}
                    >
                      <NumberInputField ref={mortgageInputRef} className="mortgage h-10 focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
                    </NumberInput>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Rent
                    </span>
                    <NumberInput
                      className="w-full"
                      allowMouseWheel
                      variant="unstyles"
                      precision={2}
                      step={1}
                      min={0}
                      defaultValue={household.rent}
                    >
                      <NumberInputField ref={rentInputRef} className="rent h-10 focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
                    </NumberInput>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Landlord
                    </span>
                    <Input
                      className="landlord capitalize focus:ring-indigo-500 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      placeholder="if renting"
                      id="landlord-text"
                      variant="unstyled"
                      ref={landlordInputRef}
                      defaultValue={household.landlord}
                    />
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs">
                      Homeless Environment
                    </span>
                    <Select
                      variant="unstyled"
                      ref={homelessTypeInputRef}
                      placeholder={household.homelesstype}
                      className="homeless capitalize h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      >
                      <option value="None">Not Homeless</option>
                      <option value="FriendsFamily">With Friends/Family</option>
                      <option value="Car">Car</option>
                      <option value="Tent">Tent</option>
                      <option value="Other">Other Inhabitable Place</option>
                    </Select>
                  </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button
              type="submit"
              isDisabled={false}
              id="submit-button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default HouseholdForm
