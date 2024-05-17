import Editor from "@/components/editor/Editor";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ChatWindow from "@/components/chatWindow";
import { Inter } from 'next/font/google'
import {Projects} from '@/components/pojects/project'
import LiteraturePopup from "@/components/Search/literature_popup";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
export default function Home() {
	const session = getServerSession(options);
	
	if (!session) {
	  redirect("/api/auth/signin?callbackUrl=/profile");
	}

	return (
		<main className="h-full main-editor duration-150 ease-in-out ">
			<div className="projects ">
				<Projects/>
			</div>
			<div className={` w-full flex h-full ${inter.className}`}>
				<Editor/>
			</div>
			<div className=" chat  flex flex-row max-w-5xl space-x-4 h-full overflow-hidden">
				<div className="flex flex-row space-x-4 h-full overflow-hidden window">
        			<ChatWindow className="flex flex-col h-full overflow-hidden" /> 
       			</div>
			</div>
			
		</main>
	);
}