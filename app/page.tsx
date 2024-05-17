import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { updateImport } from "./api/search_utils/literature_utils";
import { Button1 } from "@/components/ui/upg-btn";
import { ArrowTopRightIcon,DiscordLogoIcon,TwitterLogoIcon,InstagramLogoIcon,LinkedInLogoIcon } from "@radix-ui/react-icons";
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { EB_Garamond } from 'next/font/google'



const inter = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
})

import img2 from '@/public/Uni/1.svg'
import img1 from '@/public/Uni/2.svg'
import img3 from '@/public/Uni/3.svg'
import img4 from '@/public/Uni/4.svg'
import img5 from '@/public/Uni/5.svg'
import img6 from '@/public/Uni/6.svg'
import img7 from '@/public/Home/div.svg'
import img8 from '@/public/Home/div2.svg'
import img9 from '@/public/Home/div3.svg'
import img10 from '@/public/Home/div4.svg'
import img11 from '@/public/Home/div5.svg'
import img12 from '@/public/Home/div6.svg'
import icon1 from '@/public/icons/SVG.svg'
import icon2 from '@/public/icons/SVG2.svg'
import icon3 from '@/public/icons/SVG3.svg'
import icon4 from '@/public/icons/SVG4.svg'
import icon5 from '@/public/icons/SVG5.svg'
import icon6 from '@/public/icons/SVG6.svg'
import icon7 from '@/public/icons/SVG8.svg'









export default async function HomePage() {
  const session = await getServerSession(options);
  return (
    <section className="home-page overflow-auto flex flex-col justify-center flex-wrap content-center text-center mt-4" >
      
      <div className="div-1 items-center flex-wrap flex-col flex w-full">
        <span className={`${inter.className} flex`}
        style={{
          fontSize:'80px',
          color:'#010542',
          width:'864px',
 
        }}>
          Elevate Your Research with AI Precision!
        </span>
        <div className="flex flex-col justify-center content-center mt-4"
        style={{
          alignContent: 'center',
          flexWrap: 'wrap',
        }}
        >
          <span style={{
            width:'600px',
            fontSize:'22px'
          }}>
          ChatG6&apos;s AI-powered text editor helps you unlock Knowledge,write your essay, paper, or assignment topic
          </span>
          <div className="flex justify-center content-center mt-4 flex-col flex-wrap">
            <Link className="header-link" href={"/editor"}>
              <Button1 
              className="text-2xl mt-10"
              style={{
                width:'250px',
                backgroundColor:'#545CEB',
              }}>
                Start writing
              </Button1>
            </Link>
            <span className="mt-6 text-xs flex flex-row gap-1 content-center justify-center items-center">
              <Image src={icon7} alt='7'/>
              Loved by over 2 million academics
            </span>
          </div>
        </div>
        <video className="mt-16" width="1040" height="650" preload="auto"  autoPlay muted >
          <source src="/test.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="mt-10">
          <span>
            Trusted by Universities and Academia across the world
          </span>
          <div className="flex justify-evenly content-evenly mt-7 " 
          style={{
            minWidth:'80rem'
          }}
          >
            <Image
              src={img1}
              alt="Picture of the author"
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <Image
              src={img2}
              alt="Picture of the author"
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <Image
              src={img3}
              alt="Picture of the author"
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <Image
              src={img4}
              alt="Picture of the author"
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <Image
              src={img5}
              alt="Picture of the author"
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <Image
              src={img6}
              alt="Picture of the author"
              // width={500} automatically provided
              // height={500} automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
          </div>
        </div>
      </div>

      {/* ___________________________________________________________________________ */}

      <div className="div-2 flex flex-col content-center justify-center flex-wrap" style={{
        backgroundColor:'#FAFAFA',
      }}>
        <div className="div-2 flex flex-col content-center justify-center flex-wrap mt-24 ">
          <span className="text-sm" 
          style={{
            color:'#6B76DF',
          }}>
            POWERFUL FEATURES
          </span>
          <span className={`${inter.className} text-6xl mt-2`}>
            Craft, refine, and edit
          </span>
          <span className="text-base mt-6">
            Empowering Research, Inspiring Discoveries,
          </span>
        </div>
       
        <div className="flex-row flex flex-wrap content-center justify-center mt-6 gap-x-24">
          <div className="flex flex-col content-center flex-wrap">
           <Image src={img7} alt="1" width={500} height={300}/>
           <span className={`${inter.className} text-start text-2xl mt-6`}>
            In-text Citations
           </span>
           <span className="text-base  text-start" 
           style={{
            width:'500px'
           }}>
            ChatG6 consults the latest research and your PDF uploads.
            Cite in APA, MLA, IEEE, Chicago, or Harvard style
           </span>
          </div>
          <div className="flex flex-col content-center flex-wrap">
           <Image src={img8} alt="2" width={500} height={300}/>
           <span className={`${inter.className} text-start text-2xl mt-6`}>
            AI Autocomplete
           </span>
           <span className="text-base text-start " 
           style={{
            width:'500px'
           }}>
            Autocomplete will write alongside you to beat writer&lsquo;s   block whenever you need a helping hand
           </span>
          </div>
        </div>

        <div className="flex-row flex flex-wrap content-center justify-center mt-6 gap-x-24">
          <div className="flex flex-col content-center flex-wrap">
           <Image src={img9} alt="1" width={500} height={300}/>
           <span className={`${inter.className} text-start text-2xl mt-6`}>
            Chat to Your Research
           </span>
           <span className="text-base  text-start" 
           style={{
            width:'500px'
           }}>
            Quickly understand and summarize your research paperswith our AI chat assistant
           </span>
          </div>
          <div className="flex flex-col content-center flex-wrap">
           <Image src={img10} alt="2" width={500} height={300}/>
           <span className={`${inter.className} text-start text-2xl mt-6`}>
            Generate From Your Files
           </span>
           <span className="text-base text-start " 
           style={{
            width:'500px'
           }}>
            Bring your research papers to life with source-based generation
           </span>
          </div>
        </div>

        <div className="flex-row flex flex-wrap content-center justify-center mt-8 gap-x-24 ">
          <div className="flex flex-col content-center justify-center flex-wrap border-t">
           <span className={`${inter.className} text-start text-2xl mt-6`}>
           Paraphrase & Rewrite
           </span>
           <span className="text-base  text-start" 
           style={{
            width:'500px'
           }}>
            Paraphrase any text in any tone. Rewrite the internet customized to you
           </span>
          </div>
          <div className="flex flex-col content-center justify-center flex-wrap border-t">
           <span  className={`${inter.className} text-start text-2xl mt-6`}>
           Bulk Import Sources via .bib
           </span>
           <span className="text-base text-start " 
           style={{
            width:'500px'
           }}>
           Already saved papers ready to cite? Import a .bib to populate your library in seconds
           </span>
          </div>
        </div>

        <div className="flex-row flex flex-wrap content-center justify-center mt-8 gap-x-24 ">
          <div className="flex flex-col content-center justify-center flex-wrap border-t">
           <span className={`${inter.className} text-start text-2xl mt-6`}>
           LaTeX and Word Export
           </span>
           <span className="text-base  text-start" 
           style={{
            width:'500px'
           }}>
            Export your draft to LaTeX, .docx, or HTML without any formatting loss
           </span>
          </div>
          <div className="flex flex-col content-center justify-center flex-wrap border-t">
           <span className={`${inter.className} text-start text-2xl mt-6`} >
           Outline Builder
           </span>
           <span className="text-base text-start " 
           style={{
            width:'500px'
           }}>
           Enter your prompt and get a list of section headings ready for you to flesh out
           </span>
          </div>
        </div>
        
        <div className="mb-24 flex-row flex flex-wrap content-center justify-center mt-8 gap-x-24">
          <div className="flex flex-col content-center justify-center flex-wrap border-t">
           <span className={`${inter.className} text-start text-2xl mt-6`}>
            Multilingual Support
           </span>
           <span className="text-base  text-start" 
           style={{
            width:'500px'
           }}>
            ChatG6 can generate in US or British English, Spanish, German, French, or Chinese
           </span>
          </div>
          <div className="flex flex-col content-center justify-center flex-wrap border-t">
           <span className={`${inter.className} text-start text-2xl mt-6`}>
            Research Library
           </span>
           <span className="text-base text-start " 
           style={{
            width:'500px'
           }}>
            Save and manage research in your library. Easily cite research in any document, fast
           </span>
          </div>
        </div>

        
      </div>

      {/* ___________________________________________________________________________ */}

      <div className="div-3 flex flex-col items-center ">
        <span className="text-xs mt-24" 
        style={{
          color:'#1722BE',
        }}
        >
          AI ASSISTANT
        </span>
        <span className={`${inter.className} text-6xl mt-4`}
        style={{
          color:'#010542'
        }}
        >
          Never write alone 
        </span>
        <span className="text-xl mt-4"
        style={{
          color:'#52525B'
        }}
        >
          Get suggestions whenever you are stuck or expand your notes into full paragraphs
        </span>
        <Link className="header-link" href={"/editor"}>
          <Button1 
            className="text-2xl mt-10"
            style={{
              width:'250px',
              backgroundColor:'#545CEB',
            }}>
              Start writing
          </Button1>
        </Link>
        <Image className="mb-24" src={img11} alt="11"/>
      </div>

      {/* ___________________________________________________________________________ */}

      <div className="div-4 flex flex-col items-center"
      style={{
        backgroundColor:'#FAFAFA',
      }}
      >
      <span className="text-xs mt-24" 
        style={{
          color:'#1722BE',
        }}
        >
          CUSTOMER LOVE
        </span>
        <span className={`${inter.className} text-6xl mt-4`}
        style={{
          color:'#27272A'
        }}
        >
          Join 2 million empowered writers 
        </span>
        <span className="text-xl mt-4 mb-6"
        style={{
          color:'#52525B'
        }}
        >
          ChatG6 has helped write over 970 million words. From academic essays, journals, to top-ranking blog posts
        </span>
        <Image className="mb-24" src={img12} alt="11"/>
      </div>

      {/* ___________________________________________________________________________ */}

      <div className="div-5 flex flex-col items-center "
      style={{
        backgroundColor:'#010542'
      }}
      >
        <span className="text-xs mt-24" 
        style={{
          color:'#CCCFF3',
        }}
        >
          FOR TEAMS
        </span>
        <span className={`${inter.className} text-6xl mt-4`}
        style={{
          color:'#FFFFFF'
        }}
        >
          Team & institutional plans 
        </span>
        <span className="text-xl mt-4"
        style={{
          color:'#E1E2F6'
        }}
        >
          Collaborate with your research team and speed up your workflow. 
        </span>
        <Button1 
          className="mt-10 text-2xl h-14 mb-24" 
          style={{
            width:'250px',
            backgroundColor:'#545CEB',
          }}>
            Enquire now

            <ArrowTopRightIcon className="ml-4"/>
        </Button1>
      </div >

      {/* ___________________________________________________________________________ */}

      <div className="div-6 flex flex-col ">
        <span className="text-xs mt-24" 
        style={{
          color:'#1722BE',
        }}
        >
          USE CASES
        </span>
        <span className={`${inter.className} text-6xl mt-4`}
        style={{
          color:'#27272A'
        }}
        >
          You&lsquo;re in control 
        </span>
        <span className="text-xl mt-4"
        style={{
          color:'#52525B'
        }}
        >
          Types of content ChatG6 can help you with  
        </span>
        <div className="flex flex-col justify-center ">

          <div className="flex flex-row  justify-center mt-8 mb-8 gap-8">
            <div className="w-80 flex flex-col items-start text-start ps-1">
              <Image src={icon1} alt="icon1"/>
              <span className="text-3xl mt-2 mb-2">
                Essays
              </span>
              <span className="text-lg">
                Save hours writing your essay with our AI essay writing  tool.
              </span >
            </div>
            <div className="w-80 flex flex-col items-start text-start ps-1">
              <Image src={icon2} alt="icon2"/>
              <span className="text-3xl mt-2 mb-2">
              Literature reviews
              </span>
              <span className="text-lg">
              Discover, write, and cite relevant research.
              </span>
            </div>
            <div className="w-80 flex flex-col items-start text-start ps-1">
              <Image src={icon3} alt="icon3"/>
              <span className="text-3xl mt-2 mb-2">
                Research Papers
              </span>
              <span className="text-lg">
                Polish your writing to increase submission success.
              </span>
            </div>
          </div>

          <div className="flex flex-row  justify-center mt-8 gap-8 mb-24">
            <div className="w-80 flex flex-col items-start text-start ps-1">
              <Image src={icon4} alt="icon1"/>
              <span className="text-3xl mt-2 mb-2">
                Personal statements
              </span>
              <span className="text-lg">
                Create a compelling college motivation letter.
              </span >
            </div>
            <div className="w-80 flex flex-col items-start text-start ps-1">
              <Image src={icon5} alt="icon2"/>
              <span className="text-3xl mt-2 mb-2">
                Blog posts
              </span>
              <span className="text-lg">
                Write blogs & articles faster with the help of AI.
              </span>
            </div>
            <div className="w-80 flex flex-col items-start text-start ps-1">
              <Image src={icon6} alt="icon3"/>
              <span className="text-3xl mt-2 mb-2">
                Speeches
              </span>
              <span className="text-lg">
                Write your next compelling speech in less time.
              </span>
            </div>
          </div>

          <div>

          </div>
        </div>
      </div>

      {/* ___________________________________________________________________________ */}

      <div className="div-7 flex flex-wrap content-center justify-center text-start flex-col items-center"
      style={{
        backgroundColor:'#FAFAFA'
      }}
      >
        
      <span className="text-xs mt-24" 
        style={{
          color:'#1722BE',
        }}
        >
          SUPPORT
        </span>
        <span className={`${inter.className} text-6xl mt-4 mb-4`}
        style={{
          color:'#27272A'
        }}
        >
          Frequently asked questions 
        </span>

        <Accordion type="single" collapsible className="text-2xl mb-24 mt-4"
        style={{
          width:'1040px',

        }}
        >
          <AccordionItem value="item-1" className="bg-white ps-4 pe-4  rounded-lg mb-2">
            <AccordionTrigger>Does ChatG6 use GPT-4?</AccordionTrigger>
            <AccordionContent className="text-base">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2"  className="bg-white ps-4 pe-4  rounded-lg mb-2">
            <AccordionTrigger>What are citations?</AccordionTrigger>
            <AccordionContent className="text-base">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3"  className="bg-white ps-4 pe-4  rounded-lg mb-2">
            <AccordionTrigger>Is ChatG6 multilingual?</AccordionTrigger>
            <AccordionContent className="text-base">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4"  className="bg-white ps-4 pe-4  rounded-lg mb-2">
            <AccordionTrigger>Is there mobile support?</AccordionTrigger>
            <AccordionContent className="text-base">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5"  className="bg-white ps-4 pe-4  rounded-lg mb-2">
            <AccordionTrigger>Does ChatG6 plagiarize?</AccordionTrigger>
            <AccordionContent className="text-base">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* ___________________________________________________________________________ */}

      <div className="div-8 flex flex-col items-center"
      >
        <span className={`${inter.className} text-6xl mt-24`}
        style={{
          color:'#27272A'
        }}
        >
          Try ChatG6 for free today
        </span>
        <span className="text-xl mt-4"
        style={{
          color:'#52525B'
        }}
        >
          Write your first paper with ChatG6 today and never look back
        </span>
        <Link className="header-link" href={"/editor"}>
          <Button1 
            className="mt-10 text-2xl h-14 mb-24" 
            style={{
              width:'250px',
              backgroundColor:'#545CEB',
            }}>
              Start writing
          </Button1>
        </Link>
      </div>

      {/* ___________________________________________________________________________ */}
      
      <div className="div-9  flex flex-wrap  justify-center text-start flex-col items-center  "
      style={{
        backgroundColor:'#18181B',
      }}
      >
        <div className="flex flex-wrap  justify-center text-start flex-row items-start gap-8 mt-24">
          <div className="flex flex-col flex-wrap justify-center content-center items-start gap-4 w-40">
          <span className="text-2xl"
          style={{
            color:'#FAFAFA',
          }}
          >
            ChatG6
          </span>
          <span
          style={{
            color:'#D4D4D8',
          }}
          >
          Supercharge your next research paper
          </span>
            <Link className="header-link" href={"/editor"}>
              <Button1 
              className=" text-sm" 
              style={{
                width:'100px',
                backgroundColor:'#545CEB',
              }}>
                Start writing
              </Button1>
            </Link>

          </div>
          
          <div className="flex flex-col flex-wrap justify-center content-center items-start  gap-4 w-40">
        <span 
          style={{
            color:'#FAFAFA',
          }}
          >
            Use Cases
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            AI Essay Writer
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Essay Expander
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Sentence & Paragraph Expansion
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            AI Essay Outline Generation
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            AI Summarizer
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Paragraph Generator
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            For Researchers
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Paraphrasing Tool
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Literature Review Generator
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Thesis Statement Generator
          </span>
          </div>

          <div className="flex flex-col flex-wrap justify-center content-center items-start  gap-4 w-40">
        <span 
          style={{
            color:'#FAFAFA',
          }}
          >
            Company
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Careers
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Influencer program
          </span>

          </div>
          
          <div className="flex flex-col flex-wrap justify-center content-center items-start  gap-4 w-40">
        <span 
          style={{
            color:'#FAFAFA',
          }}
          >
            Legal
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Terms of Service
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Privacy Policy
          </span>
          <span 
          style={{
            color:'#A1A1AA',
          }}
          >
            Refund Policy
          </span>
          </div>
        </div>
        
        <div className="flex flex-wrap  justify-center text-start flex-row items-center gap-64 mt-10 border-t-2 h-16 " 
        style={{
          color:'#A1A1AA'
        }}
        >
          <span>
            Copyright© 2024 G6 Company Inc.All rights reserved.
          </span>
          <div className="flex flex-row content-evenly gap-7">
          <DiscordLogoIcon/>
          <LinkedInLogoIcon/>
          <TwitterLogoIcon/>
          <InstagramLogoIcon/>
          </div>
        </div>
      </div>
      {/* ___________________________________________________________________________ */}
    </section>
  );
}
