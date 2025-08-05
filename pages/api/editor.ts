import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { content } = req.body;

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      const prompt = `You are a code generator. The user will provide you with a description of a component, and you will generate the code for it. ${content}`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const generatedCode = response.text();
      res.status(200).json({ code: generatedCode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error generating code' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
