import React, {useRef, useState } from "react";
import {
  Button,
  Input,
} from "@chakra-ui/react";
import { HouseholdModel } from "../../lib/new/types";

const HouseholdForm = ({household, id}: any) => {

  const [address, setAddress] = useState(household.address)

  const addressInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async(event: React.FormEvent) => {
    event.preventDefault()

    const enteredData = {
      address: addressInputRef.current!.value,
    }
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
                      isRequired={true}
                      _placeholder={{ opacity: 0.5, color: "#003768" }}
                      ref={addressInputRef}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
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

/*
  const [userLastname, setUserLastname] = useState(attributes.lastname)
  const [userMiddlename, setUserMiddlename] = useState(attributes.middlename)
  const [userEmail, setUserEmail] = useState(attributes.email)
  const [userChurch, setUserChurch] = useState(attributes.church)
  const [notesValue, setNotesValue] = useState(attributes.notes)

  const lastnameInputRef = useRef<HTMLInputElement>(null);
  const middlenameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const incomeInputRef = useRef<HTMLInputElement>(null);
  const incomeSourceInputRef = useRef<HTMLSelectElement>(null);
  const churchInputRef = useRef<HTMLInputElement>(null);
  const raceInputRef = useRef<HTMLSelectElement>(null);
  const ethnicityInputRef = useRef<HTMLSelectElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);
  const ebtInputRef = useRef<HTMLInputElement>(null);
  const disabledInputRef = useRef<HTMLInputElement>(null);
  const veteranInputRef = useRef<HTMLInputElement>(null);
  const interestsInputRef = useRef<HTMLSelectElement>(null);
  const programsInputRef = useRef<HTMLSelectElement>(null);

  const ebt = () => {
    if (attributes.ebt === true) {
      return <Checkbox id="ebt" defaultChecked ref={ebtInputRef} className="ebt flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
    } else {
      return <Checkbox id="ebt" ref={ebtInputRef} className="ebt flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
    }
  }

  const veteran = () => {
    if (attributes.veteran === true) {
      return <Checkbox id="veteran" defaultChecked ref={veteranInputRef} className="veteran flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
    } else {
      return <Checkbox id="veteran" ref={veteranInputRef} className="veteran flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
    }
  }

  const disabled = () => {
    if (attributes.disabled === true) {
      return <Checkbox id="disabled" defaultChecked ref={disabledInputRef} className="disabled flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
    } else {
      return <Checkbox id="disabled" ref={disabledInputRef} className="disabled flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
    }
  }

                <div className="col-span-2 mt-1 flex rounded-md h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Last
                  </span>
                  <FormControl className="w-full lastname focus:ring-indigo-500 pl-2 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300">
                    <Input
                      className="h-9 w-full capitalize"
                      id="lastname-text"
                      variant="unstyled"
                      isRequired={true}
                      _placeholder={{ opacity: 0.5, color: "#003768" }}
                      ref={lastnameInputRef}
                      value={userLastname}
                      onChange={(e) => setUserLastname(e.target.value)}
                    />
                  </FormControl>
                  <Switch id="disabled" size="lg" ref={disabledInputRef} />
                </div>
                <div className="col-span-1 mt-1 flex rounded-md h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    MI
                  </span>
                  <Input
                    className="middlename capitalize focus:ring-indigo-500 w-14 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    id="middlename-text"
                    variant="unstyled"
                    isRequired={false}
                    _placeholder={{ opacity: 0.5, color: "#003768" }}
                    ref={middlenameInputRef}
                    value={userMiddlename}
                    onChange={(e) => setUserMiddlename(e.target.value)}
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Email
                  </span>
                  <FormControl className="email focus:ring-indigo-500  w-full rounded-none rounded-r-md sm:text-sm border-2 border-gray-300">
                    <Input
                      className="h-9 w-full border-none"
                      type='email'
                      id="email-text"
                      variant="unstyled"
                      _placeholder={{ opacity: 0.5, color: "#003768" }}
                      ref={emailInputRef}
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </FormControl>
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Church
                  </span>
                  <Input
                    className="church capitalize focus:ring-indigo-500 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    placeholder="optional"
                    id="firstname-text"
                    variant="unstyled"
                    ref={churchInputRef}
                    value={userChurch}
                    onChange={(e) => setUserChurch(e.target.value)}
                  />
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Income
                  </span>
                  <NumberInput
                    className="w-full"
                    allowMouseWheel
                    variant="unstyled"
                    precision={2}
                    step={1}
                    min={0}
                    defaultValue={attributes.income}
                  >
                    <NumberInputField className="income h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" ref={incomeInputRef} />
                  </NumberInput>
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Source
                  </span>
                  <Select
                    variant="unstyled"
                    ref={incomeSourceInputRef}
                    className="income h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    placeholder={attributes.source}
                    >
                    <option value="none">None</option>
                    <option value="childsupport">Child Support</option>
                    <option value="pension">Pension</option>
                    <option value="privatedisability">Private Disability</option>
                    <option value="earnedincome">Earned Income</option>
                    <option value="ssr">Social Security Retirement</option>
                    <option value="ssi">SSI</option>
                    <option value="ssdi">SSDI</option>
                    <option value="unemployment">Unemployment</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div className="col-span-1 mt-1 flex rounded-md h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    EBT
                  </span>
                  {ebt()}
                </div>
                <div className="col-span-1 mt-1 flex rounded-md h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Veteran
                  </span>
                  {veteran()}
                </div>
                <div className="col-span-1 mt-1 flex rounded-md h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Disabled
                  </span>
                  {disabled()}
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Race
                  </span>
                  <Select
                    variant="unstyled"
                    ref={raceInputRef}
                    className="race lowercase h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    placeholder={attributes.race}
                    >
                    <option value="white">White</option>
                    <option value="asian">Asian</option>
                    <option value="indian">American Indian/Native American</option>
                    <option value="black">Black</option>
                  </Select>
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Ethnicity
                  </span>
                  <Select
                    variant="unstyled"
                    ref={ethnicityInputRef}
                    className="ethnicity lowercase h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    placeholder={attributes.ethnicity}
                    >
                    <option value="nonHispanic">Non-Hispanic/Latin, Other</option>
                    <option value="hispanicLatino">Hispanic/Latino</option>
                  </Select>
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Gender
                  </span>
                  <Select
                    variant="unstyled"
                    ref={genderInputRef}
                    className="gender lowercase h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    placeholder={attributes.gender}
                    >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="ttm>">Transgender to male</option>
                    <option value="ttf">Transgender to female</option>
                    <option value="nc">Non-conforming</option>
                    <option value="r">Client refused</option>
                  </Select>
                </div>
                <div className="col-span-1 mt-1 flex rounded-md h-10">
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Interests
                  </span>
                  <Select
                    variant="unstyled"
                    ref={interestsInputRef}
                    className="interests h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    >
                    <option value="i1">Interest 1</option>
                    <option value="i2>">Interest 2</option>
                    <option value="i3">Interest 3</option>
                    <option value="i4>">Interest 4</option>
                    <option value="i5">Interest 5</option>
                  </Select>
                </div>
                <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs">
                    Completed Programs
                  </span>
                  <Select
                    variant="unstyled"
                    ref={programsInputRef}
                    className="programs h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                    >
                    <option value="p1">Program 1</option>
                    <option value="p2">Program 2</option>
                    <option value="p3>">Program 3</option>
                    <option value="p4">Program 4</option>
                    <option value="p5">Program 5</option>
                  </Select>
                </div>
            </div>
              <Textarea
                className="w-full rounded-md h-40"
                placeholder='Optional Client Notes'
                size='sm'
                variant="unstyled"
                ref={notesInputRef}
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
              />

      lastname: lastnameInputRef.current!.value,
      middlename: middlenameInputRef.current!.value,
      email: emailInputRef.current!.value,
      income: incomeInput,
      source: incomeSourceInputRef.current!.value === '' ? attributes.source : incomeSourceInputRef.current!.value,
      church: churchInputRef.current!.value,
      ebt: ebtInputRef.current!.checked != undefined ? ebtInputRef.current!.checked : false,
      veteran: veteranInputRef.current!.checked != undefined ? veteranInputRef.current!.checked : false,
      disabled: disabledInputRef.current!.checked != undefined ? disabledInputRef.current!.checked : false,
      race: raceInputRef.current!.value === '' ? attributes.race : raceInputRef.current!.value,
      ethnicity: ethnicityInputRef.current!.value === '' ? attributes.ethnicity : ethnicityInputRef.current!.value,
      gender: genderInputRef.current!.value === '' ? attributes.gender : genderInputRef.current!.value,
      interests: interestsInputRef.current!.value,
      programs: programsInputRef.current!.value,
      notes: notesValue,
*/
