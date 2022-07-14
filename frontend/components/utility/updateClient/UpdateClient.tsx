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
import UpdateForm from '../../form/UpdateForm'
import { ClientModel } from '../../../lib/new/types';
import { useRouter } from "next/router";

export interface IUpdateClient {id: number, attributes: {}}

const UpdateClient: React.FC<IUpdateClient> = ({id, ...attributes}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter();

  const saveEnteredDataHandler = async(enteredData: ClientModel) => {
    const data: ClientModel = {
      ...enteredData,
      id: id
    }
    await fetch(`http://localhost:3000/api/update`, {
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    router.push(`/results?search=${data.lastname}`);
    onClose()
  }

  return (
    <div className="update-client my-4">
      <div className="ml-4 mb-2">
        <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={onOpen}
          >
          Update Client
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
            <UpdateForm onSaveEnteredData={saveEnteredDataHandler} {...attributes}/>
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

export default UpdateClient;
/*
            <Button id='update-button' variant='ghost' onClick={onSubmitHandler}>Update Client</Button>
            */
