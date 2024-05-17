// APIs Credintals


export const s3_Client = {
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION ?? "",
  credentials: {
     accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID ?? "",
     secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY ?? "",
  },
 };



// Semantic Scholar API
//const SEM_api_key = 'fXtwPJIYby5MEMOJdrN067O7rtfDrs3O7TKZbzMt'
const SEM_api_key = process.env.NEXT_PUBLIC_SEM_API_KEY
const SEMANTIC_CONFIG = {
  api_url:'https://api.semanticscholar.org/graph/v1/paper/search',
  api_key:SEM_api_key,
  headers:{
    'x-api-key': SEM_api_key
  }
}

// export object
const KEYS = {
  'SEMANTIC_CONFIG':SEMANTIC_CONFIG,
   s3_Client:s3_Client
  

}

export const cfg = {
  'lr_limit':10
}

export default KEYS