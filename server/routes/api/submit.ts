import { Request, Response, Router } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { name, message } = req.body as { name: string; message: string };

    // Here you would call the ChatGPT API with the data
    // For example:
    // const response = await chatGPTAPI.generateResponse(name, message);

    // For now, let's just log the data and send a response
    console.log('Received:', name, message);
    res.status(200).send({ success: true });
});

export default router;
