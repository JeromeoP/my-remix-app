import { Request, Response, Router } from 'express';
import OpenAI from "openai";
import config from "../../config";

interface Experience {
    startDate: string;
    endDate: string;
    company: string;
    description: string;
  }
  interface Education {
    fromYear: string;
    toYear: string;
    title: string;
    university: string;
    city: string;
  }
  
  interface FormData {
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
  
const router = Router();

    
const openai = new OpenAI({
    apiKey: config.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  });  
  router.post('/', async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        address,
        zipCode,
        city,
        phoneNumber,
        email,
        experiences,
        educations,
        message,
      } = req.body as FormData;

      console.log('Received:', {
        firstName,
        lastName,
        address,
        zipCode,
        city,
        phoneNumber,
        email,
        experiences,
        educations,
        message,
      });
        // Here you would call the ChatGPT API with the data
    // For example:
    // const response = await chatGPTAPI.generateResponse(name, message);
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Give me an introduction to my CV. This is about me: " + message  }],
            temperature: 0.7,
          max_tokens: 400,
        });
    
console.log(completion)
        // Send the response back ompletion.choices[0].message
       // res.status(200).json({ response: completion.data.choices[0].text.trim() });
       const openAIResponse = completion.choices[0].message.content;
       console.log("response: ", openAIResponse);

   
       // Send the response back with OpenAI's output
       return res.status(200).json({ success: true, openAIResponse });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating text');
      }
    res.status(200).send({ success: true });
});

export default router;
