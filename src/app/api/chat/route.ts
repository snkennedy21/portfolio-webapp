import {
  streamText,
  createUIMessageStream,
  createUIMessageStreamResponse,
  convertToModelMessages,
} from "ai";
import { createGroq } from "@ai-sdk/groq";
import { systemPrompt } from "@/lib/prompts";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      async execute({ writer }) {
        const modelMessages = await convertToModelMessages(messages);
        const result = streamText({
          model: groq("llama-3.1-8b-instant"),
          system: systemPrompt,
          messages: modelMessages,
        });

        await writer.merge(result.toUIMessageStream());
      },
    }),
  });
}
