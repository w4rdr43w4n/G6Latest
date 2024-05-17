import axios from 'axios';
import { supabaseClient } from '../../../utils/supabaseClient';
import { NextResponse, NextRequest } from 'next/server';


export async function POST (req: NextRequest) {
  try {
    const { query, apiKey, matches } = await req.json();

    
    
    const input = query.replace(/\n/g, ' ');

    const embedRes = await axios(`https://api.openai.com/v1/embeddings`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      method: 'POST',
      data: {
        model: 'text-embedding-ada-002',
        input
      }
    });
    const { embedding } = embedRes.data.data[0];

    const { data: chunks, error } = await supabaseClient.rpc('chatgpt_search', {
      query_embedding: embedding,
      similarity_threshold: 0.01,
      match_count: matches
    });
    
    if (error) {
      console.error(error);
      return NextResponse.json({Error:'Error'}, { status: 500 })
    }
    
    return NextResponse.json(chunks, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({Error:'Error'}, { status: 500 })
  }
};
