import React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'

export interface IUpdateClient {}

const UpdateClient: React.FC<IUpdateClient> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmitHandler = () => {

  }

  return (
    <>
      <div className="">
        <Button className="" colorScheme='yellow' size='sm' onClick={onOpen}>Update Client</Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
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
                        id="firstname"
                        className="firstname focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                    <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Last
                      </span>
                      <input
                        type="text"
                        name="lastname-input"
                        id="lastname"
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
                        id="middlename"
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
                        id="birthdate"
                        className="birthdate focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                    <div className="col-span-2 mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        Address
                      </span>
                      <input
                        type="text"
                        name="address-input"
                        id="address"
                        className="address focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-14 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <Button colorScheme='yellow' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button id='update-button' variant='ghost' onClick={onSubmitHandler}>Update Client</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default UpdateClient;

/*
import React, { useRef, useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  useDisclosure,
  Input,
  FormControl,
  Select,
  Switch,
  Textarea
} from '@chakra-ui/react'
import DatePicker from "react-datepicker";

import styles from '../../../styles/pages/ClientModal.module.scss'
import "react-datepicker/dist/react-datepicker.css";

//TODO: preload household data onto form so that it's displayed in the modal when called
// this needs to be done by setting initial state with props data and creating onChange events for inputs

const ClientModal: React.FC = (props, dataToChild) => {
  const data = props.dataToChild
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [startDate, setStartDate] = useState(new Date());
  const [notesValue, setNotesValue] = useState('')

  const firstnameInputRef = useRef<HTMLInputElement>(null);
  const lastnameInputRef = useRef<HTMLInputElement>(null);
  const middlenameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const incomeInputRef = useRef<HTMLInputElement>(null);
  const incomeSourceInputRef = useRef<HTMLSelectElement>(null);
  const raceInputRef = useRef<HTMLSelectElement>(null);
  const ethnicityInputRef = useRef<HTMLSelectElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const notesInputRef = useRef<HTMLTextAreaElement>(null);
  const ebtInputRef = useRef<HTMLInputElement>(null);
  const disabledInputRef = useRef<HTMLInputElement>(null);
  const veteranInputRef = useRef<HTMLInputElement>(null);
  const churchInputRef = useRef<HTMLInputElement>(null);
  const interestsInputRef = useRef<HTMLSelectElement>(null);
  const programInputRef = useRef<HTMLSelectElement>(null);

  const Datepicker = () => {
    return (
      <DatePicker
        className={styles.date}
        selected={startDate}
        closeOnScroll={true}
        placeholderText="Click to select birthdate"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        onChange={(date: Date) => setStartDate(date)} />
    );
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    const incomeInput = incomeInputRef.current?.value.trim() != '' ? incomeInputRef.current?.value.trim() : 0;

    // stored cleaned inputs to const
    const enteredData: {} = {
      firstname: firstnameInputRef.current?.value.trim().toLowerCase(),
      lastname: lastnameInputRef.current?.value.trim().toLowerCase(),
      middlename: middlenameInputRef.current?.value.trim().toLowerCase(),
      email: emailInputRef.current?.value.trim().toLowerCase(),
      birthdate: startDate.toISOString().split('T')[0],
      income: incomeInput,
      source: incomeSourceInputRef.current?.value,
      race: raceInputRef.current?.value,
      ethnicity: ethnicityInputRef.current?.value,
      gender: genderInputRef.current?.value,
      notes: notesValue,
      ebt: ebtInputRef.current?.checked,
      disabled: disabledInputRef.current?.checked,
      veteran: veteranInputRef.current?.checked,
    }
    props.onSaveEnteredData(enteredData)
    document.getElementById('update-button')!.innerHTML = "Updated"
  }

  return (
    <>
      <div className={styles.buttonWrapper}>
        <Button className={styles.buttonUpdate} colorScheme='yellow' size='sm' onClick={onOpen}>Update Client</Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className={styles.form} id="client-form">
              <div id="notice" className={styles.notice}>NOTICE:</div>
              <div className={styles.formName}>
                <label>Fullname</label>
                <Input
                  placeholder={data.firstname}
                  id="firstname-text"
                  size="lg"
                  variant="filled"
                  isRequired={true}
                  _placeholder={{ opacity: 0.5, color: "#003768" }}
                  ref={firstnameInputRef}
                />
                <Input
                  placeholder={data.lastname}
                  id="lastname-text"
                  size="lg"
                  variant="filled"
                  isRequired={true}
                  _placeholder={{ opacity: 0.5, color: "#003768" }}
                  ref={lastnameInputRef}
                />
                <Input
                  placeholder={data.middlename}
                  id="middlename-text"
                  size="lg"
                  variant="filled"
                  isRequired={false}
                  _placeholder={{ opacity: 0.5, color: "#003768" }}
                  ref={middlenameInputRef}
                />
                <label>Email</label>
                <FormControl>
                  <Input
                    placeholder={data.email}
                    type='email'
                    id="email-text"
                    size="lg"
                    variant="filled"
                    _placeholder={{ opacity: 0.5, color: "#003768" }}
                    ref={emailInputRef}
                  />
                </FormControl>
                <label>Birthdate</label>
                <Datepicker />
              </div>
              <div className={styles.formIncome}>
                <div id="income">
                  <NumberInput
                    size="lg"
                    allowMouseWheel
                    variant="filled"
                    precision={2}
                    step={1}
                    min={0}
                    defaultValue={data.income}
                  >
                    <label>Gross Income</label>
                    <NumberInputField ref={incomeInputRef} />
                  </NumberInput>
                </div>
                <div className={styles.formIncomeSource}>
                  <label>Income Source</label>
                  <Select size="lg" variant="filled" ref={incomeSourceInputRef}>
                    <option value={data.source}>{data.source}</option>
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
              </div>
              <div className={styles.church}>
                <label>Current church?</label>
                <Input
                  placeholder={data.church}
                  id="firstname-text"
                  size="lg"
                  variant="filled"
                  ref={churchInputRef}
                />
              </div>
              <div className={styles.switches}>
                <FormControl display="flex" alignItems="center">
                  <label>EBT</label>
                  <Switch id="ebt" isChecked={data.ebt} size="lg" ref={ebtInputRef} />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <label>Disabled?</label>
                  <Switch id="disabled" isChecked={data.disabled} size="lg" ref={disabledInputRef} />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <label>Veteran?</label>
                  <Switch id="veteran" isChecked={data.veteran} size="lg" ref={veteranInputRef} />
                </FormControl>
              </div>
              <div className={styles.formRace}>
                <label>Race</label>
                <Select size="lg" variant="filled" ref={raceInputRef} >
                  <option value={data.race}>{data.race}</option>
                  <option value="white">White</option>
                  <option value="asian">Asian</option>
                  <option value="indian">American Indian/Native American</option>
                  <option value="black">Black</option>
                </Select>
              </div>
              <div className={styles.formEthnicity}>
                <label>Ethnicity</label>
                <Select size="lg" variant="filled" ref={ethnicityInputRef}>
                  <option value={data.ethnicity}>{data.ethnicity}</option>
                  <option value="nonHispanic">Non-Hispanic/Latin, Other</option>
                  <option value="hispanicLatino">Hispanic/Latino</option>
                </Select>
              </div>
              <div className={styles.formGender}>
                <label>Gender</label>
                <Select size="lg" variant="filled" ref={genderInputRef}>
                  <option value={data.gender}>{data.gender}</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="ttm>">Transgender to male</option>
                  <option value="ttf">Transgender to female</option>
                  <option value="nc">Non-conforming</option>
                  <option value="r">Client refused</option>
                </Select>
              </div>
              <div className={styles.formGender}>
                <label>Interests</label>
                <Select size="lg" variant="filled" ref={interestsInputRef}>
                  <option value="i1">Interest 1</option>
                  <option value="i2>">Interest 2</option>
                  <option value="i3">Interest 3</option>
                  <option value="i4>">Interest 4</option>
                  <option value="i5">Interest 5</option>
                </Select>
              </div>
              <div className={styles.formGender}>
                <label>Completed Programs</label>
                <Select size="lg" variant="filled" ref={programInputRef}>
                  <option value="p1">Program 1</option>
                  <option value="p2">Program 2</option>
                  <option value="p3>">Program 3</option>
                  <option value="p4">Program 4</option>
                  <option value="p5">Program 5</option>
                </Select>
              </div>
              <div className={styles.formNotes}>
                <label>Notes:</label>
                <Textarea
                  placeholder={data.notes}
                  size='sm'
                  variant="filled"
                  ref={notesInputRef}
                  value={notesValue}
                  onChange={(e) => setNotesValue(e.target.value)}
                />
              </div>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='yellow' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button id='update-button' variant='ghost' onClick={onSubmitHandler}>Update Client</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ClientModal


/*
    <div className="relative z-10 invisible" id="update-modal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Deactivate account</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Deactivate</button>
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
*/
