import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import UpdateHouseholdForm from '../../form/UpdateHouseholdForm'
import { HouseholdModel } from '../../../lib/new/types';
import { IApiSearchHouseholdResponseData } from '../../../pages/api/household';
import Link from 'next/link';

export interface IUpdateHousehold {
  household: {
    id: number,
    attributes: {
      address?: string,
      city?: string,
      zipcode?: number,
      district?: string,
      county?: string,
      mortgage?: number,
      rent?: number,
      landlord?: string,
      homelesstype?: string,
      individuals?: {
        data: [
          {
            id: number,
          }
        ]
      }
    }
  },
  lastname: string,
}

const UpdateHousehold = (props: {lastname: any, id: number}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ household, setHousehold ] = useState<any>()
  const [ houseID, setHouseID ] = useState(0)
  let searchResults: IApiSearchHouseholdResponseData = [];

  const onClickHandler = async() => {
    onOpen()
    let lastname = props.lastname
    if (props.lastname && props.lastname.length > 0) {
      const response = await fetch(`http://localhost:3000/api/household`, {
        body: JSON.stringify({lastname}),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      searchResults = await response.json();
      setHousehold(searchResults[0])
    }
  }

  //TODO: put this in a useEffect so it only fires once?
  const householdID = async() => {
    let lastname = props.lastname
    if (lastname && lastname.length > 0) {
      const response = await fetch(`http://localhost:3000/api/household`, {
        body: JSON.stringify({lastname}),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      searchResults = await response.json();
      const id = searchResults[0].id
      setHouseID(id)
    }
  }
  householdID()

  const saveEnteredDataHandler = async(enteredData: HouseholdModel) => {
    const data: HouseholdModel = {
      ...enteredData,
    }
    console.log(data)
  }

  return (
    <div className="update-client my-4">
      <div className="ml-4 mb-2">
        <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Link href={`/household/${houseID}`}>
            <a>Update Household</a>
          </Link>
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        scrollBehavior='outside'
      >
        <ModalOverlay
          className="bg-indigo-50/30"
        />
        <ModalContent>
          <ModalBody>
            <UpdateHouseholdForm onSaveEnteredData={saveEnteredDataHandler} lastname={props.lastname} household={household} id={props.id} />
            <div
              className="px-4 pb-3 -top-4 w-4/5 mx-auto rounded-b-md bg-gray-50 text-right sm:px-6"
            >
              <Button
                colorScheme='yellow'
                mr={3}
                onClick={onClose}
                className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Close
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
};

export default UpdateHousehold;
