import { Response, Request } from "express";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { FLASH_API } from "../../utils/config.js";
import { nullable, z } from "zod";

const ZPrompt = z.object({
  question: z
    .string({ required_error: "question: is required" })
    .min(6)
    .max(30),
});

export default async function gen_location(req: Request, res: Response) {
  const { question } = ZPrompt.parse(req.body);

  const schema = {
    description: "Tourist Places",
    type: SchemaType.OBJECT,
    properties: {
      coordinate: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.NUMBER,
          nullable: false,
          description: "LAT AND LONG",
        },
        description: "co-ordinate of place",
        nullable: false,
      },
      description: {
        type: SchemaType.STRING,
        description: "description of place",
        nullable: false,
      },
      title: {
        type: SchemaType.STRING,
        description: "title of place",
        nullable: false,
      },
    },
  };

  const genAI = new GoogleGenerativeAI(FLASH_API);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `For the place related question i ask give me co-ordinate of the place along with title and description with the below JSON schema
    Question: ${question}`;

  const result = await model.generateContent(prompt);
  const data = result.response.text();

  if (!data)
    return res.status(401).json({ msg: "task failed", success: false });

  console.log(data);

  res
    .status(200)
    .json({ msg: "generated sucessfull", sucess: true, data: JSON.parse(data) });
}
