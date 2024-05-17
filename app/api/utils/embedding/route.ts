import { OpenAI } from 'openai';
import { supabaseClient } from '../../../utils/supabaseClient';
import { NextResponse,NextRequest } from 'next/server'


export async function POST (req: NextRequest, res: NextResponse) {
  try {
    const { sentenceList, apiKey } = await req.json();

    const openai = new OpenAI({
      apiKey,
    });
    console.log(sentenceList,apiKey);
    
    for (let i = 0; i < sentenceList.length; i++) {
      const chunk = sentenceList[i];
      const { content, content_length, content_tokens, page_num } = chunk;

      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: content
      });
      console.log(embeddingResponse);
      
      const [{ embedding }] = embeddingResponse.data;

      const { error } = await supabaseClient
        .from('chatgpt')
        .insert({
          content,
          content_length,
          content_tokens,
          page_num,
          embedding
        })
        .select('*');

      if (error) {
        console.log('error', error);
      } else {
        console.log('saved', i);
      }

      // 防止触发openai的每分钟限制
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    return NextResponse.json({message:'ok'}, { status: 200 })

  } catch (error) {
    console.error(JSON.stringify(error));
    return NextResponse.json({Error:'Error'}, { status: 500 })  
  }
};


