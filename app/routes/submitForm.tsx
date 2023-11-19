import React, { FormEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

interface FormData {
  firstName: string;
  lastName: string;
  adress: string;
  zipCode: string;
  city: string;
  message: string;
}

export default function SubmitForm() {
  const toast = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      address: { value: string };
      zipCode: { value: string };
      city: { value: string };

      message: { value: string };
    };

    const data: FormData = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      address: target.address.value,
      zipCode: target.zipCode.value,
      city: target.city.value,

      message: target.message.value,
    };

    try {
        const response = await fetch('http://localhost:3001/api/submit', {
            method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: "We've received your submission.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error submitting your form.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor='firstName'>First name</FormLabel>
          <Input id='firstName' type='text' name='firstName' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='lastName'>Last name</FormLabel>
          <Input id='lastName' type='text' name='lastName' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='address'>Address</FormLabel>
          <Input id='address' type='text' name='address' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='zipCode'>Zip code</FormLabel>
          <Input id='zipCode' type='text' name='zipCode' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='city'>City</FormLabel>
          <Input id='city' type='text' name='city' />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel htmlFor='message'>Message</FormLabel>
          <Input id='message' type='text' name='message' />
        </FormControl>

        <Button mt={4} colorScheme='teal' type='submit'>Submit</Button>
      </form>
    </Box>
  );
}
