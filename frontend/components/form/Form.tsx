import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  NumberInput,
  NumberInputField,
  Select,
  Switch,
  Textarea,
  Input,
  FormControl,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

import { ClientModel } from "../../lib/new/types";

// props: { onLastNameChange: string, onAddressChange: string, onSaveEnteredData: {}}
const IndividualForm = () => {

  const [birthdate, setBirthdate] = useState(new Date());
  const [userLastname, setUserLastname] = useState('')
  const [userFirstname, setUserFirstname] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [notesValue, setNotesValue] = useState('')
  const [enteredData, setEnteredData] = useState([{}])
  const [nameVerify, setNameVerify] = useState(false)
  const [addressVerify, setAddressVerify] = useState(false)
  const [addressResult, setAddressResult] = useState('')
  const [lastnameResult, setLastnameResult] = useState('')
  const [firstnameResult, setFirstnameResult] = useState<string[]>([])

  const router = useRouter();

  const firstnameInputRef = useRef<HTMLInputElement>(null);
  const lastnameInputRef = useRef<HTMLInputElement>(null);
  const middlenameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const incomeInputRef = useRef<HTMLInputElement>(null);
  const incomeSourceInputRef = useRef<HTMLSelectElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLSelectElement>(null);
  const zipcodeInputRef = useRef<HTMLInputElement>(null);
  const districtInputRef = useRef<HTMLSelectElement>(null);
  const countyInputRef = useRef<HTMLSelectElement>(null);
  const churchInputRef = useRef<HTMLInputElement>(null);
  const mortgageInputRef = useRef<HTMLInputElement>(null);
  const rentInputRef = useRef<HTMLInputElement>(null);
  const landlordInputRef = useRef<HTMLInputElement>(null);
  const homelessTypeInputRef = useRef<HTMLSelectElement>(null);
  const raceInputRef = useRef<HTMLSelectElement>(null);
  const ethnicityInputRef = useRef<HTMLSelectElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);
  const ebtInputRef = useRef<HTMLInputElement>(null);
  const disabledInputRef = useRef<HTMLInputElement>(null);
  const veteranInputRef = useRef<HTMLInputElement>(null);
  const interestsInputRef = useRef<HTMLSelectElement>(null);
  const programsInputRef = useRef<HTMLSelectElement>(null);

  // sanitize inputs to pass through verify function
  // const cleanLastname = userLastname.trim().toLowerCase()
  // const cleanFirstname = userFirstname.trim().toLowerCase()

  const datepicker = () => {
    return (
      <DatePicker
        className="birthdate h-10 w-full focus:ring-indigo-500 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
        selected={birthdate}
        closeOnScroll={true}
        placeholderText="Click to select birthdate"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        onChange={(date: Date) => setBirthdate(date)} />
    );
  }

  const onSubmitHandler = async(event: React.FormEvent) => {
    event.preventDefault()
    const incomeInput: number = incomeInputRef.current?.value.trim() != undefined ? +incomeInputRef.current?.value.trim() : 0;
    const mortgageInput: number = mortgageInputRef.current?.value.trim() != undefined ? +mortgageInputRef.current?.value.trim() : 0;
    const rentInput: number = rentInputRef.current?.value.trim() != undefined ? +rentInputRef.current?.value.trim() : 0;

    const data: ClientModel = {
      firstname: firstnameInputRef.current!.value,
      lastname: lastnameInputRef.current!.value,
      middlename: middlenameInputRef.current!.value,
      birthdate: birthdate.toISOString().split('T')[0],
      email: emailInputRef.current!.value,
      income: incomeInput,
      address: addressInputRef.current!.value,
      city: cityInputRef.current!.value,
      zipcode: +zipcodeInputRef.current!.value,
      district: districtInputRef.current!.value,
      county: countyInputRef.current!.value,
      church: churchInputRef.current!.value,
      mortgage: mortgageInput,
      rent: rentInput,
      landlord: landlordInputRef.current!.value,
      ebt: ebtInputRef.current!.checked != undefined ? ebtInputRef.current!.checked : false,
      veteran: veteranInputRef.current!.checked != undefined ? veteranInputRef.current!.checked : false,
      disabled: disabledInputRef.current!.checked != undefined ? disabledInputRef.current!.checked : false,
      homelessType: homelessTypeInputRef.current!.value,
      race: raceInputRef.current!.value,
      ethnicity: ethnicityInputRef.current!.value,
      gender: genderInputRef.current!.value,
      interests: interestsInputRef.current!.value,
      programs: programsInputRef.current!.value,
      notes: notesValue,
    }
    setEnteredData(enteredData)
    await fetch(`http://localhost:3000/api/new`, {
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    await router.push(`/results?search=${data.lastname}`);
  }

  // check DB for users with same lastname as input store results in state
  useEffect(() => {
    if (userLastname.length >= 3) {
      fetch('http://localhost:3000/api/verify', {
        body: JSON.stringify({ userLastname }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
            setLastnameResult(data[0].attributes.lastname)
            if(data[0].attributes.household) {
              setAddressResult(data[0].attributes.household.data.attributes.address)
            }
            // store all firstnames with same lastname as state firstnameResult
            if (data.length > 1) {
              let firstnames: string[] = []
              data.map((i:any) => {
                firstnames.push(i.attributes.firstname)
              })
              setFirstnameResult(firstnames)
            } else {
              setFirstnameResult(data[0].attributes.firstname)
            }
          } else {
            setLastnameResult('')
            setFirstnameResult([])
            setAddressResult('')
          }
        })
    }
  }, [userLastname])

  // if input lastname and firstname already exist in DB notify user
  useEffect(() => {
    if (userFirstname.length > 0) {
      const cleanedFirstname = userFirstname.toLowerCase().trim()
      if (firstnameResult.includes(cleanedFirstname)) {
        document.getElementById("notice")!.style.display = "inline-flex"
        const text = "That client already exists"
        document.getElementById("notice")!.innerHTML = ''
        document.getElementById("notice")!.insertAdjacentHTML("beforeend", text)
        document.getElementById("submit-button")!.style.display = "none"
        setNameVerify(true)
      } else {
        document.getElementById("notice")!.style.display = "hidden"
        document.getElementById("notice")!.innerHTML = ''
        document.getElementById("submit-button")!.style.display = "inline-flex"
        setNameVerify(false)
        //POST new client and household
      }
    }
  }, [userFirstname, firstnameResult])

  // with entered address, check if firstname already exists at that address, notify user client exists
  // else if entered address already exists but not entered name then notify user the new client will be added to existing address
  useEffect(() => {
    if (userAddress.length >= 5) {
      const cleanedAddress = userAddress.toLowerCase().trim()
      const cleanedFirstname = userFirstname.toLowerCase().trim()
        if (firstnameResult.includes(cleanedFirstname) && cleanedAddress === addressResult || cleanedAddress != addressResult && nameVerify === true) {
          document.getElementById("notice")!.style.display = "inline-flex"
          const text = "That client already exists"
          document.getElementById("notice")!.innerHTML = ''
          document.getElementById("notice")!.insertAdjacentHTML("beforeend", text)
          document.getElementById("submit-button")!.style.display = "none"
        } else if (cleanedAddress === addressResult) {
          document.getElementById("notice")!.style.display = "inline-flex"
          const text = "A household already exists at that address, this client will be added to that household."
          document.getElementById("notice")!.innerHTML = ''
          document.getElementById("notice")!.insertAdjacentHTML("beforeend", text)
          document.getElementById("submit-button")!.style.display = "inline-flex"
          //POST new client, PUT existing household
        } else {
          document.getElementById("notice")!.style.display = "hidden"
          document.getElementById("notice")!.innerHTML = ''
          document.getElementById("submit-button")!.style.display = "inline-flex"
          //POST new client and household
        }
    } else {
      setAddressVerify(false)
    }
  }, [userAddress, addressResult, userFirstname, firstnameResult, nameVerify])

  // check DB for existting lastname without address in case of homeless household
  // if lastname without address exists notify user
  // if lastname exists and entered firstname matches existing firstname belonging to lastname, notify user
  useEffect(() => {
    const cleanedLastname = userLastname.toLowerCase().trim()
    const cleanedFirstname = userFirstname.toLowerCase().trim()
    const length = userLastname.length >= 3
    if (length && cleanedLastname === lastnameResult && firstnameResult.includes(cleanedFirstname)) {
      document.getElementById("notice")!.style.display = "inline-flex"
      const text = "That client already exists"
      document.getElementById("notice")!.innerHTML = ''
      document.getElementById("notice")!.insertAdjacentHTML("beforeend", text)
      document.getElementById("submit-button")!.style.display = "none"
    } else if (length && cleanedLastname === lastnameResult && !firstnameResult.includes(cleanedFirstname)) {
      document.getElementById("notice")!.style.display = "inline-flex"
      const text = "A homeless household already exists with that lastname, this client will be added to that household."
      document.getElementById("notice")!.innerHTML = ''
      document.getElementById("notice")!.insertAdjacentHTML("beforeend", text)
      document.getElementById("submit-button")!.style.display = "inline-flex"
      //POST new client, PUT existing homeless household
    } else {
      document.getElementById("notice")!.style.display = "hidden"
      document.getElementById("notice")!.innerHTML = ''
      document.getElementById("submit-button")!.style.display = "inline-flex"
      //POST new client and household
    }
  }, [userFirstname, userLastname, firstnameResult, lastnameResult])

  return (
    <>
      <div className="w-full">
        <form className="mt-5 md:mt-0 w-4/5 mx-auto" id="client-form" onSubmit={onSubmitHandler}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div id="notice" className="hidden w-full text-center"></div>
              <div className="grid grid-cols-6 gap-5 grid-flow-row">
                  <div className="col-span-1 mt-1 flex rounded-md h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      First
                    </span>
                    <Input
                      className="firstname focus:ring-indigo-500 w-14 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      id="firstname-text"
                      variant="unstyled"
                      isRequired={true}
                      _placeholder={{ opacity: 0.5, color: "#003768" }}
                      ref={firstnameInputRef}
                      value={userFirstname}
                      onChange={(e) => setUserFirstname(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Last
                    </span>
                    <FormControl className="w-full lastname focus:ring-indigo-500 pl-2 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300">
                      <Input
                        className="h-9 w-full"
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
                      className="middlename focus:ring-indigo-500 w-14 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      id="middlename-text"
                      variant="unstyled"
                      isRequired={false}
                      _placeholder={{ opacity: 0.5, color: "#003768" }}
                      ref={middlenameInputRef}
                    />
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Birthdate
                    </span>
                    {datepicker()}
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
                      />
                    </FormControl>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Address
                    </span>
                    <Input
                      className="address h-10 w-full focus:ring-indigo-500 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      id="address-text"
                      variant="filled"
                      _placeholder={{ opacity: 0.5, color: "#003768" }}
                      ref={addressInputRef}
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      City
                    </span>
                    <Select
                      variant="unstyled"
                      ref={cityInputRef}
                      className="city h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      >
                      <option value="plainwell">Plainwell</option>
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
                  <div className="col-span-1 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Zipcode
                    </span>
                    <NumberInput
                      size="lg"
                      allowMouseWheel
                      variant="filled"
                      defaultValue={49080}
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
                      className="district h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
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
                      className="county h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
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
                      Church
                    </span>
                    <Input
                      className="church focus:ring-indigo-500 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      placeholder="optional"
                      id="firstname-text"
                      variant="unstyled"
                      ref={churchInputRef}
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
                    >
                      <NumberInputField ref={rentInputRef} className="rent h-10 focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
                    </NumberInput>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Landlord
                    </span>
                    <Input
                      className="landlord focus:ring-indigo-500 pl-2 flex-1 block rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      placeholder="if renting"
                      id="landlord-text"
                      variant="unstyled"
                      ref={landlordInputRef}
                    />
                  </div>
                  <div className="col-span-1 mt-1 flex rounded-md h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      EBT
                    </span>
                    <Checkbox id="ebt" ref={ebtInputRef} className="ebt flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
                  </div>
                  <div className="col-span-1 mt-1 flex rounded-md h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Veteran
                    </span>
                    <Checkbox id="veteran" ref={veteranInputRef} className="veteran flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
                  </div>
                  <div className="col-span-1 mt-1 flex rounded-md h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Disabled
                    </span>
                    <Checkbox id="disabled" ref={disabledInputRef} className="disabled flex-none items-center pl-2 w-10 bg-blue-200 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300" />
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs">
                      Homeless Environment
                    </span>
                    <Select
                      variant="unstyled"
                      ref={homelessTypeInputRef}
                      className="homeless h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      >
                      <option value="None">Not Homeless</option>
                      <option value="FriendsFamily">With Friends/Family</option>
                      <option value="Car">Car</option>
                      <option value="Tent">Tent</option>
                      <option value="Other">Other Inhabitable Place</option>
                    </Select>
                  </div>
                  <div className="col-span-2 mt-1 flex rounded-md shadow-sm h-10">
                    <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      Race
                    </span>
                    <Select
                      variant="unstyled"
                      ref={raceInputRef}
                      className="race h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
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
                      className="ethnicity h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
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
                      className="gender h-10 w-full focus:ring-indigo-500 rounded-none rounded-r-md sm:text-sm border-2 border-gray-300"
                      >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="ttm>">Transgender to male</option>
                      <option value="ttf">Transgender to female</option>
                      <option value="nc">Non-conforming</option>
                      <option value="r">Client refused</option>
                    </Select>
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
                  className="w-full rounded-md"
                  placeholder='Optional Client Notes'
                  size='sm'
                  variant="unstyled"
                  ref={notesInputRef}
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                />
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button
                type="submit"
                isDisabled={false}
                id="submit-button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Client
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default IndividualForm
