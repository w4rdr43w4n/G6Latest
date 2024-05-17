import { encode } from 'gpt-3-encoder';
import { NextResponse,NextRequest } from 'next/server'

export async function POST(req:NextRequest) {
    const combined = [];
    let chunkList: { sentence: string; pageNum: number }[]
    chunkList = await req.json();
    let currentString = '';
    let currentPageNum = 1;
    try {
        for (let i = 0; i < chunkList.length; i++) {
            if (
              currentPageNum !== chunkList[i].pageNum ||
              (encode(currentString).length + encode(chunkList[i].sentence).length > 300)
            ) { 
              combined.push({
                content_length: currentString.trim().length,
                content: currentString.trim(),
                content_tokens: encode(currentString.trim()).length,
                page_num: currentPageNum
              });
              currentString = '';
            }
        
            currentString += chunkList[i].sentence;
            currentPageNum = chunkList[i].pageNum;
          }
        
          combined.push({
            content_length: currentString.trim().length,
            content: currentString.trim(),
            content_tokens: encode(currentString.trim()).length,
            page_num: currentPageNum
          });
        
          return  NextResponse.json(combined)
    } catch (error) {
    console.log(' error from here ',error);

        return NextResponse.json({Error:'Error'}, { status: 500 })
    }

  }
  