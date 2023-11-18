import React, { FormEvent } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

interface FormData {
  name: string;
  message: string;
}

export default function SubmitForm() {
  const toast = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      message: { value: string };
    };

    const data: FormData = {
      name: target.name.value,
      message: target.message.value,
    };

    try {
      const response = await fetch('/api/submit', {
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
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input id='name' type='text' name='name' />
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
