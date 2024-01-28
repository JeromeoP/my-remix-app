import React, { FormEvent, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { ExperienceForm } from '~/components/experienceForm';
import { EducationForm } from '~/components/educationForm';

export interface Education {
  fromYear: string;
  toYear: string;
  title: string;
  university: string;
  city: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  email: string;
  experiences: Experience[];
  educations: Education[];
  message: string;
}

export interface Experience {
  startDate: string;
  endDate: string;
  company: string;
  description: string;
}


export default function SubmitForm() {
  const toast = useToast();


  const [experiences, setExperiences] = useState<Experience[]>([{
    startDate: '',
    endDate: '',
    company: '',
    description: ''
  }]);
  const [educations, setEducations] = useState<Education[]>([{
    fromYear: '',
    toYear: '',
    title: '',
    university: '',
    city: ''
  }]);
  const handleAddEducation = () => {
    setEducations([
      ...educations, 
      { fromYear: '', toYear: '', title: '', university: '', city: '' }
    ]);
  };
  
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducations = [...educations];
    newEducations[index] = { ...newEducations[index], [field]: value };
    setEducations(newEducations);
  };
  

  const handleAddExperience = () => {
    setExperiences([
      ...experiences, 
      { 
        startDate: '', 
        endDate: '', 
        company: '', 
        description: '' 
      }
    ]);
  };
  
const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
  const newExperiences = [...experiences];
  newExperiences[index] = { ...newExperiences[index], [field]: value };
  setExperiences(newExperiences);
};

  
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

  const data: Formdata = {
    firstName: target.firstName.value,
    lastName: target.lastName.value,
    address: target.address.value,
    zipCode: target.zipCode.value,
    city: target.city.value,
    experiences: experiences, // Adding experiences from state
    phoneNumber: target.phoneNumber.value,
  email: target.email.value,
  educations: educations,
    message: target.message.value,
  };

  try {
    const response = await fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData.openAIResponse);
// Fetch the PDF
const pdfResponse = await fetch('http://localhost:3001/api/generate-pdf', {
  method: 'POST',
  body: JSON.stringify({
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    zipCode: data.zipCode,
    city: data.city,
    email: data.email,
    phone: data.phoneNumber,
    experiences: data.experiences,
    educations: data.educations,
    openAIResponse: responseData.openAIResponse
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

if (pdfResponse.ok) {
  const blob = await pdfResponse.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'document.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
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
        <FormControl isRequired>
  <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
  <Input id='phoneNumber' type='text' name='phoneNumber' />
</FormControl>

<FormControl isRequired>
  <FormLabel htmlFor='email'>Email</FormLabel>
  <Input id='email' type='email' name='email' />
</FormControl>
        <FormControl mt={4} isRequired>
          <FormLabel htmlFor='message'>Describe yourself in at least two sentences</FormLabel>
          <Input id='message' type='text' name='message' />
        </FormControl>

        {experiences.map((experience, index) => (
          <ExperienceForm
            key={index}
            experience={experience}
            onExperienceChange={handleExperienceChange}
            index={index}
          />
        ))}
  <Button mt={4} colorScheme="blue" onClick={handleAddExperience}>
    Add Another Experience
  </Button>    
  {educations.map((education, index) => (
          <EducationForm
            key={index}
            education={education}
            onEducationChange={handleEducationChange}
            index={index}
          />
        ))}
<Button mt={4} colorScheme="blue" onClick={handleAddEducation}>
  Add Another Education
</Button>
    <Box>
          <Button mt={4} colorScheme='teal' type='submit'>Generate AI CV</Button></Box>
        </form>
      </Box>


    );
  }
