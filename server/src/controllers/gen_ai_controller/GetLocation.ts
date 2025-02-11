import { Response, Request } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FLASH_API } from "../../utils/config.js";
import { z } from "zod";

const ZPrompt = z.object({
  question: z
    .string({ required_error: "question: is required" })
    .min(6)
    .max(30),
});

export default async function gen_location(req: Request, res: Response) {
  const { question } = ZPrompt.parse(req.body);

  const genAI = new GoogleGenerativeAI(FLASH_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `For the place related question i ask give me co-ordinate of the place along with title and description
    Question: ${question}
    
    
    Location = { coordinate: [number, number], title: string, description: string }
    Return: Location `;

  const result = await model.generateContent(prompt);
  console.log(result);

  res
    .status(200)
    .json({ msg: "generated sucessfully sucessfull", sucess: true, result });
}
