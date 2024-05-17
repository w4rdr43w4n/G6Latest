import { NextRequest, NextResponse } from 'next/server';
import { OpenAIStream } from '../../../utils/openaiStream';


export async function POST (req: NextRequest): Promise<Response>  {
  try {
    const { prompt, apiKey } = (await req.json()) as {
      prompt: string;
      apiKey: string;
    };

    const stream = await OpenAIStream(prompt, apiKey);

    return new NextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json({Error:'Error'}, { status: 500 }) 
  }
};


