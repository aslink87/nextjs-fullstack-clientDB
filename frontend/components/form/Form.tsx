import {
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import Select from 'react-select'

export interface IForm {
  id: number;
  attributes: {
    firstname: string,
    lastname: string,
    middlename: string,
    birthdate: string
  }
}

const Form: React.FC<IForm> = () => {

  const [ cityOption, setCityOption ] = useState<[{}]>()
  const [ countyOption, setCountyOption ] = useState<[{}]>()
  const [ districtOption, setDistrictOption ] = useState<[{}]>()
  const [ sourceOption, setSourceOption ] = useState<[{}]>()
  const options = [
    { value: 'plainwell', label: 'Plainwell'},
    { value: 'alamo', label: 'Alamo'},
    { value: 'cooper', label: 'Cooper'},
    { value: 'gunplain', label: 'Gun Plain'},
    { value: 'martin', label: 'Martin'},
    { value: 'otsego', label: 'Otsego'},
    { value: 'otsegotownship', label: 'Otsego Township'},
    { value: 'trowbridge', label: 'Trowbridge Township'},
    { value: 'watson', label: 'Watson'},
  ]
  const handleCityChange = (cityOption) => {
    setCityOption(cityOption.value);
  }
  const optionsCounty = [
    { value: 'allegan', label: 'Allegan'},
    { value: 'barry', label: 'Barry'},
    { value: 'calhoun', label: 'Calhoun'},
    { value: 'genesee', label: 'Genesee'},
    { value: 'kalamazoo', label: 'Kalamazoo'},
    { value: 'kent', label: 'Kent'},
    { value: 'ottawa', label: 'Ottawa'},
    { value: 'vanburen', label: 'Van Buren'},
  ]
  const handleCountyChange = (countyOption) => {
    setCountyOption(countyOption.value);
  }
  const optionsDistrict = [
    { value: 'plainwell', label: 'Plainwell'},
    { value: 'allegan', label: 'Allegan'},
    { value: 'otsego', label: 'Otsego'},
    { value: 'deltonkellogg', label: 'Delton-Kellog'},
    { value: 'kalamazoo', label: 'Kalamazoo'},
    { value: 'hamilton', label: 'Hamilton'},
    { value: 'martin', label: 'Martin'},
    { value: 'outofservice', label: 'Out-of-service'},
  ]
  const handleDistrictChange = (districtOption) => {
    setDistrictOption(districtOption.value);
  }
  const optionsSource = [
    { value: 'none', label: 'None'},
    { value: 'childsupport', label: 'Child Support'},
    { value: 'pension', label: 'Pension'},
    { value: 'privatedisability', label: 'Private Disability'},
    { value: 'earnedincome', label: 'Earned income'},
    { value: 'ssr', label: 'Social Security Retirement'},
    { value: 'ssi', label: 'SSI'},
    { value: 'ssdi', label: 'SSDI'},
    { value: 'unemployment', label: 'Unemployment'},
    { value: 'other', label: 'Other'},
  ]
  const handleSourceChange = (sourceOption) => {
    setSourceOption(sourceOption.value);
  }

  const firstnameInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
        <form action="#" method="POST" className="mt-5 md:mt-0 w-4/5 mx-auto">
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-8 gap-6">
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    First
                  </span>
                  <input
                    type="text"
                    name="firstname-input"
                    ref={firstnameInputRef}
                    className="firstname focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-3 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Last
                  </span>
                  <input
                    type="text"
                    name="lastname-input"
                    className="lastname focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    MI
                  </span>
                  <input
                    type="text"
                    name="middlename-input"
                    className="middlename focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Birthdate
                  </span>
                  <input
                    type="date"
                    name="birthdate-input"
                    className="birthdate focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-3 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Email
                  </span>
                  <input
                    type="text"
                    name="email-input"
                    className="email focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-3 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Address
                  </span>
                  <input
                    type="text"
                    name="address-input"
                    className="address focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    City
                  </span>
                  <Select
                    defaultValue={cityOption}
                    onChange={handleCityChange}
                    options={options}
                    className="w-44"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    County
                  </span>
                  <Select
                    defaultValue={countyOption}
                    onChange={handleCountyChange}
                    options={optionsCounty}
                    className="w-44"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    District
                  </span>
                  <Select
                    defaultValue={districtOption}
                    onChange={handleDistrictChange}
                    options={optionsDistrict}
                    className="w-44"
                  />
                </div>
                <div className="col-span-3 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Church
                  </span>
                  <input
                    type="text"
                    name="church-input"
                    className="church focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Income
                  </span>
                  <NumberInput
                    size="lg"
                    allowMouseWheel
                    variant="filled"
                    precision={2}
                    step={1}
                    min={0}
                  >
                    <NumberInputField />
                  </NumberInput>
                </div>
                <div className="col-span-3 mt-1 flex rounded-md">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Source
                  </span>
                  <Select
                    defaultValue={sourceOption}
                    onChange={handleSourceChange}
                    options={optionsSource}
                    className="w-64"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
    </div>
  )
};

export default Form;
