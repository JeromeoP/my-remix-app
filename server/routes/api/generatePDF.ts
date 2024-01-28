
import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { createHTMLForPDF } from '../../utils/createHTMLForPDF';

const router = express.Router();
interface Education {
    fromYear: string;
    toYear: string;
    title: string;
    university: string;
    city: string;
  }
  
  interface Experience {
    startDate: string;
    endDate: string;
    company: string;
    description: string;
  }
  
  interface FormData {
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    email: string;
    phone: string;
    experiences: Experience[];
    educations: Education[];
    openAIResponse: string;
  }
  
router.post('/', async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        address,
        zipCode,
        city,
        email,
        phone,
        experiences,
        educations,
        openAIResponse
      } = req.body as FormData;
    // ... code to get response from OpenAI ...

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const htmlContent = createHTMLForPDF({
            firstName,
            lastName,
            address,
            zipCode,
            city,
            email,
            phone,
            experiences,
            educations,
            openAIResponse
          });

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

export default router;
