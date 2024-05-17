
// import { encode } from 'gpt-3-encoder';
import { encode } from 'gpt-tokenizer'
import { NextResponse,NextRequest } from 'next/server'



function generateNewChunkList(chunkList: { sentence: string; pageNum: number }[]) {
  const combined = [];
  let currentString = '';
  let currentPageNum = 1;

  for (let i = 0; i < chunkList.length; i++) {
    if (
      currentPageNum !== chunkList[i].pageNum ||
      encode(currentString).length + encode(chunkList[i].sentence).length > 300
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
  
  return combined;
}


export async function POST(req: NextRequest, res: NextResponse)  {
  try {
    const { sentenceList } = await req.json();
    const chunkList =<any>await generateNewChunkList(sentenceList);   

    return NextResponse.json({chunkList}, {
      status: 200
  })
  } catch (error) {


    // console.error(error);
    return new NextResponse('Error', {
      status: 500
  })
  }
};


