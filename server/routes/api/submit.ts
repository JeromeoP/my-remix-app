import { Request, Response, Router } from 'express';
import OpenAI from "openai";

require('dotenv').config();

const router = Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY// defaults to process.env["OPENAI_API_KEY"]
  });  
router.post('/', async (req: Request, res: Response) => {
    const { firstName, lastName, address, zipCode, city, message } = req.body as {
        firstName: string;
        lastName: string;
        address: string;
        zipCode: string;
        city: string;
        message: string;
    };

    console.log('Received:', firstName, lastName, address, zipCode, city, message);
    // Here you would call the ChatGPT API with the data
    // For example:
    // const response = await chatGPTAPI.generateResponse(name, message);
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "Give me an introduction to my CV. This is about me: " + message  }],
            temperature: 0.7,
          max_tokens: 150,
        });
    

        // Send the response back
       // res.status(200).json({ response: completion.data.choices[0].text.trim() });
       console.log("response: ",completion.choices[0].message);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating text');
      }
    res.status(200).send({ success: true });
});

export default router;
