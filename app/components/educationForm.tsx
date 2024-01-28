import { Box, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { Education } from "~/routes/submitForm";

interface EducationFormProps {
    education: Education;
    onEducationChange: (index: number, field: keyof Education, value: string) => void;
    index: number;
  }
  
  export const EducationForm: React.FC<EducationFormProps> = ({ education, onEducationChange, index }) => {

    return (
    <Box mt={4}>
            {index === 0 && <Heading size="md" mb={4}>Education</Heading>}

      <Flex gap={4}>
        <FormControl isRequired>
          <FormLabel htmlFor={`fromYear-${index}`}>From Year</FormLabel>
          <Input
            id={`fromYear-${index}`}
            type="date"
            value={education.fromYear}
            onChange={(e) => onEducationChange(index, 'fromYear', e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor={`toYear-${index}`}>To Year</FormLabel>
          <Input
            id={`toYear-${index}`}
            type="date"
            value={education.toYear}
            onChange={(e) => onEducationChange(index, 'toYear', e.target.value)}
          />
        </FormControl>
      </Flex>
      <FormControl isRequired>
        <FormLabel htmlFor={`title-${index}`}>Title of Education</FormLabel>
        <Input
          id={`title-${index}`}
          type="text"
          value={education.title}
          onChange={(e) => onEducationChange(index, 'title', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor={`university-${index}`}>University Name</FormLabel>
        <Input
          id={`university-${index}`}
          type="text"
          value={education.university}
          onChange={(e) => onEducationChange(index, 'university', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor={`city-${index}`}>City</FormLabel>
        <Input
          id={`city-${index}`}
          type="text"
          value={education.city}
          onChange={(e) => onEducationChange(index, 'city', e.target.value)}
        />
      </FormControl>
    </Box>
    )
    };
  