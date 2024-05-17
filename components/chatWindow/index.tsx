'use client';
import { BookOutlined } from '@ant-design/icons';
import { Loader2 } from "lucide-react"
import { Document, Page,pdfjs  } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import {  Card, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { UploadProps } from 'antd';
import { Upload } from 'antd';
import { type TextItem } from 'pdfjs-dist/types/src/display/api';
import eventEmitter from '../../app/utils/eventEmitter';
import PDFMerger from 'pdf-merger-js/browser';
import 'react-pdf/dist/Page/TextLayer.css';
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { FileTextIcon } from '@radix-ui/react-icons';

function finDomByText(text: string, parent: any) {
  const elements = parent.querySelectorAll('span'); // 获取文档中的所有span元素
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.innerText.includes(text)) {
      return element;
    }
  }
}

function addHighlightText(element: HTMLElement) {
  // Get the text content of the element
  const text = element.textContent;

  // Create a <mark> element and set its text content
  const markElem = document.createElement('mark');
  markElem.textContent = text;

  // Clear the content of the original element and append the <mark> element
  element.innerHTML = '';
  element.appendChild(markElem);

  // Scroll the element into view smoothly
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}



interface ChatWindowProps {
  className?: string;
}

interface MessageItem {
  question?: string;
  reply?: string;
  references?: { id: number; content: string; page_num: number }[];
}
const { Dragger } = Upload;
const ChatWindow: FC<ChatWindowProps> = ({ className }) => {
  const disabledUpload = false;
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const settings = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [form] = Form.useForm();
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [query, setQuery] = useState('');
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const pdfRef = useRef<unknown>();
  const [numPages, setNumPages] = useState(null);
  const sentenceRef = useRef<string[]>();
  const [indexof,setIndexof]=useState(0);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string>('');
  const [library, setLibrary] = useState<number>(0);
  
    useEffect(() => {
      const render = async () => {
        const merger = new PDFMerger();
  
        for(const file of files) {
          await merger.add(file);
        }
  
        await merger.setMetadata({
          producer: "pdf-merger-js based script"
        });
  
        const mergedPdf = await merger.saveAsBlob();
        const url = URL.createObjectURL(mergedPdf);
        
        return setMergedPdfUrl(url);
        
      };
  
      render().catch((err) => {
        throw err;
      });
  
      () => setMergedPdfUrl('');
    
      
    }, [files, setMergedPdfUrl]);   



  function scrollToPage(num: number) {
    // @ts-ignore
    pdfRef?.current.pages[num - 1].scrollIntoView();
  }
  useEffect(() => {
    // @ts-ignore
    eventEmitter.on('scrollToPage', scrollToPage);

    return () => {
      // @ts-ignore
      eventEmitter.off('scrollToPage', scrollToPage);
    };
  }, []);
  // useEffect(() => {
  //   const localSettings = JSON.parse(localStorage.getItem('settings') as string);
  //   if (!localSettings) {
  //     setShowSettingModal(true);
  //   } else {
  //     settings.current = localSettings;
  //   }
  // }, [showSettingModal]);

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatWindow = chatWindowRef.current;

      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight + 300;
      }
    }, 0);
  };

  async function onDocumentLoadSuccess(doc: any) {
    const { numPages } = doc;
    const sentenceEndSymbol = /[。.]\s+/;
    const allSentenceList = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const currentPage = await doc.getPage(pageNum);
      const currentPageContent = await currentPage.getTextContent();
      const currentPageText = currentPageContent.items
        .map((item: any) => (item as TextItem).str)
        .join(' ');

      const sentenceList = currentPageText.split(sentenceEndSymbol);
      allSentenceList.push(...sentenceList.map((item: string) => ({ sentence: item, pageNum })));
    }

    sentenceRef.current = allSentenceList.filter(item => item.sentence);
    setNumPages(numPages);
  }

  const props: UploadProps = {
    name: 'file',
    beforeUpload: file => {
      setFiles([...files, file]);
      return false;
      
      
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        void message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        void message.error(`${info.file.name} file upload failed.`);
      }
    }
  };
  const onReply = async (value: string) => {
    try {
      setLoading(true);
      const embedRes = await axios('/api/utils/search-embed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { query: value, apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY , matches: 5 }
      });
      console.log('embed',embedRes);
      
      const prompt = `
      Use the following text to provide an answer to the query: "${value}"

      ${embedRes.data?.map((d: any) => d.content).join('\n\n')}
      `;

      const answerResponse = await fetch('/api/utils/search-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY  })
      });
      setLoading(false);

      if (!answerResponse.ok) {
        throw new Error(answerResponse.statusText);
      }

      const data = answerResponse.body;
      if (!data) {
        throw new Error('No data');
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        console.log(chunkValue);

        setMessageList(pre => {
          return [
            ...pre.slice(0, -1),
            {
              ...pre.slice(-1),
              reply: pre.slice(-1)[0].reply + chunkValue,
              references: embedRes.data
            }
          ];
        });
        requestAnimationFrame(() => scrollToBottom());
      }

      scrollToBottom();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onSearch = async (value: string) => {
    setQuery('');
    // if (!settings.current?.apiKey) {
    //   message.error('please input your apiKey');
    //   return;
    // }

    setMessageList([...messageList, { question: value.trim() }, { reply: '' }]);
    scrollToBottom();
    onReply(value);
  };

  const onSaveSettings = () => {
    form
      .validateFields()
      .then(values => {
        localStorage.setItem('settings', JSON.stringify(values));
        setShowSettingModal(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  async function generateEmbedding(sentenceList: any[]) {
    setLoading2(true);
    console.log('test1');

    const res = await axios('/api/utils/split', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { sentenceList }
    });
    const { chunkList } = res.data;
    const chunkSize = 2; // 每组的元素个数
    console.log(chunkList);
    

    
    // 由于vercel单个接口10秒限制，所以分批次处理
    for (let i = 0; i < chunkList.length; i += chunkSize) {
      const chunk = chunkList.slice(i, i + chunkSize); // 取出当前组的元素

      await axios('/api/utils/embedding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          sentenceList: chunk,
          apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY 
        }
      });
    }
    setLoading2(false);
  }

  const handleClick = (index: number) => {
    setIndexof(index);
    
  };
  const toglle =()=>{
    if(library==0){
      setLibrary(1);
      console.log('library',library);
      
    }else{
      setLibrary(0);
      console.log('library',library);
    }
  }

  const onReading = () => {
    // const textLayer = pdfRef.current[0].nextSibling;
    // const elements = finDomByText('estibulum eu urna nisl. Aenean at hendrerit', textLayer);
    // addHighlightText(elements);

    generateEmbedding(sentenceRef.current as string[]);
  };

  const suffix=!disabledUpload?(
    <Upload {...props}>
    <Button variant="outline" className='file'>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#52525b" className="bi bi-paperclip" viewBox="0 0 16 16">
        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z"/>
      </svg>
    </Button>
  </Upload>
  ):null

  return (
    <> 
        
      <Card
        style={{ width: 500 }}
        className={className}
        styles={{
          body: {
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '0px 0',
            backgroundClip: 'content-box',
            boxShadow: 'rgba(190, 161, 254, 0.1) 0px 0px 0px 10px inset',
          }
        }}
        title=">> &nbsp; &nbsp; Chat with PDF"
        bordered={false}
        extra={
          <Button variant="outline" onClick={() => toglle()} >
            <BookOutlined style={{color:'#52525b'}}/>
          </Button>
        }
      >
          {
            library==0?
            (
              <>
                <div
                  ref={chatWindowRef}
                  className="scrol-smooth flex flex-col items-start flex-1 overflow-auto px-6 messages"
                >
                  {messageList.map((item, index) => (
                    <Fragment key={index}>
                      {item.question ? (
                        <Message isQuestion text={item.question} />
                      ) : (
                        <Message
                          loading={loading && index === messageList.length - 1}
                          references={item.references}
                          text={item.reply || ''}
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
                
                <div className=" pb-0 border-t border-t-gray-200 border-solid border-x-0 border-b-0 rounded "  style={{ display: 'flex', alignItems: 'center' ,backgroundColor: '#fcfaff', height: '5.0625rem' ,justifyContent:'center', }}>
                    
                    {loading2? (
                          <Button className='ml-4' variant="outline" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Reading
                          </Button>
                    )
                    :
                    (
                      <Button  className='ml-4 read'  disabled={files.length==0} variant="outline" onClick={onReading}>
                       Read
                      </Button>
                    )
                    }
                  <div style={{ display: 'flex', alignItems: 'center'}}>
                      <div className="upload-btn-wrapper" style={{ marginRight: '10px' }}>
                  </div>
                  <div>
                    <Input.Search
                      enterButton="Ask your Library"
                      size="large"
                      value={query}
                      placeholder="input your question"
                      allowClear
                      loading={loading}
                      suffix={suffix}
                      onChange={e => setQuery(e.target.value)}
                      onSearch={onSearch}
                    />
                  </div>
                  </div>
                </div>
                {/* <Modal
                  title="Settings"
                  open={showSettingModal}
                  onOk={onSaveSettings}
                  onCancel={() => setShowSettingModal(false)}
                >
                  <Form
                    form={form}
                    initialValues={{
                      apiKey: settings.current?.apiKey
                    }}
                  >
                    <Form.Item
                      label="apiKey"
                      name="apiKey"
                      rules={[{ required: true, message: 'Please input your apiKey!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </Modal> */}
              </>
            )
            :
            (
              <div className='list'>
                <span className='tittle'>
                  Reference 
                </span>
                {files.length > 0 ? (
                    <ol type='1' className='list-item'>

                    {files.map((file, index) => (
                        <li key={index} className='list-item-content'>
                          <FileTextIcon/>  
                          <span className='ml-4'>
                            {file.name}
                          </span>
                        </li>
                    ))}
                  </ol>
                ) : (
    <></>
                )}
              </div>
            )
          }
      </Card>
      <Card
          style={{ width: 700 }}
          className="h-full overflow-auto scroll-smooth hidden"
          styles={{
            body: {
              padding: 0
            }
          }}
        > 
          {/* @ts-ignore */}
          <Document ref={pdfRef} file={`${mergedPdfUrl}`} onLoadError={console.error} onLoadSuccess={onDocumentLoadSuccess} >
            {Array.from(new Array(numPages), (_el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={700}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
      </Card>
    </>
  );
};

export default ChatWindow;
