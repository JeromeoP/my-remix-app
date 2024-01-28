import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
  } from "@chakra-ui/react"
  import { useState } from "react"
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await fetch('http://localhost:3001/api/signUp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
    }),
});


            if (response.ok) {
                toast({ title: "Signup successful", status: "success" });
                // Redirect or additional logic on successful signup
            } else {
                toast({ title: "Signup failed", status: "error" });
            }
        } catch (error) {
            toast({ title: "Error occurred", status: "error" });
        }
    };
    return (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" name="firstName" />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" name="lastName" />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" name="email" />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input type={showPassword ? "text" : "password"} name="password" />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() => setShowPassword((showPassword) => !showPassword)}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{ bg: "blue.500" }}
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text  align={"center"}>
                      Already a user? <Link href="/signin" color={"blue.400"}>Login</Link>
                    </Text>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      );
    }