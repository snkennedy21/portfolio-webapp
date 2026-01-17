import {
  streamText,
  createUIMessageStream,
  createUIMessageStreamResponse,
  convertToModelMessages,
} from 'ai';
import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `You are an AI assistant on Sean Kennedy's portfolio website. You help visitors learn about Sean's background, skills, and projects.

About Sean:
- Software engineer with experience in full-stack development
- Passionate about building web applications and learning new technologies
- Currently exploring AI/ML integration and home lab infrastructure

Keep responses concise and friendly. If asked about topics unrelated to Sean or his work, politely redirect the conversation back to relevant topics.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      async execute({ writer }) {
        const modelMessages = await convertToModelMessages(messages);
        const result = streamText({
          model: groq('llama-3.1-8b-instant'),
          system: systemPrompt,
          messages: modelMessages,
        });

        await writer.merge(result.toUIMessageStream());
      },
    }),
  });
}
