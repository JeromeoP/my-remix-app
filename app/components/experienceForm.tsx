import { Box, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { Experience } from "~/routes/submitForm";
interface ExperienceFormProps {
    experience: Experience;
    onExperienceChange: (index: number, field: keyof Experience, value: string) => void;
    index: number;
  }
  
  export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, onExperienceChange, index }) => {
  return (
    <Box mt={4}>
                {index === 0 && <Heading size="md" mb={4}>Experience</Heading>}

      <Flex gap={4}>
        <FormControl isRequired>
          <FormLabel htmlFor={`startDate-${index}`}>From</FormLabel>
          <Input
            id={`startDate-${index}`}
            type="date"
            value={experience.startDate}
            onChange={(e) => onExperienceChange(index, 'startDate', e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor={`endDate-${index}`}>To</FormLabel>
          <Input
            id={`endDate-${index}`}
            type="date"
            value={experience.endDate}
            onChange={(e) => onExperienceChange(index, 'endDate', e.target.value)}
          />
        </FormControl>
      </Flex>
      <FormControl isRequired>
        <FormLabel htmlFor={`company-${index}`}>Company Name</FormLabel>
        <Input
          id={`company-${index}`}
          type="text"
          value={experience.company}
          onChange={(e) => onExperienceChange(index, 'company', e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor={`description-${index}`}>Brief Description</FormLabel>
        <Input
          id={`description-${index}`}
          type="text"
          value={experience.description}
          onChange={(e) => onExperienceChange(index, 'description', e.target.value)}
        />
      </FormControl>
    </Box>
  );
  }