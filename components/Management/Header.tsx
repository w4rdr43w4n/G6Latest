"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image'
import logo from '@/app/styles/Logo.svg'
import { Button1 } from "../ui/upg-btn";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Search from "@/components/editor/Search-tools"
import {GearIcon , Share2Icon} from "@radix-ui/react-icons";
export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname()
  const router = useRouter();
  const loading = status === "loading";
  const username=session?.user?.name || '';

  return (
    <header 
    style={ pathname==='/editor'? {display:'none'}:{display:'flex'}}
    >
      <div className="auth-options flex justify-end" style={{width:'25%'}}>
        {session ? (
          // <div>
          // <p>{session.user?.name}</p>
          // <Link className="header-link" href={"/api/auth/signout"}>
          //   Sign Out
          // </Link>
          // </div>
          <>
            {
              pathname==='/editor'?
                <Sheet>
                  <SheetTrigger>
                    <GearIcon className="w-6 h-6" />
                  </SheetTrigger>
                  <SheetContent  className="options-sheet" onInteractOutside={event => event.preventDefault()}>
                    <SheetHeader>
                      <SheetTitle> &gt;&gt; &nbsp; &nbsp; Document Settings</SheetTitle>
                      <SheetDescription>
                        <Search/>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                :
                <></>
            }
            <Button1 variant='outline' className="upg-btn ml-2 mr-2"
            style={{ 
            backgroundColor:'#545CEB',
            }}>
              <DoubleArrowUpIcon/>
              <span className="ml-4">Upgrade</span>
            </Button1>
            <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-12 w-12">
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className="header-link" href={"/profile"}>
                    User Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="header-link" href={"/api/auth/signout"}>
                    Sign Out
                  </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          </>
          
        ) : (
          <div>
            <Link className="header-link" href={"/api/auth/signin"}>
              Sign in
            </Link>
            <Link className="header-link" href={"/authentication/signup"}>
              Sign up
            </Link>
            <Link className="" href={"/editor"}>
              <Button1 
              className="upg-btn ml-2 mr-2"
              style={{
                backgroundColor:'#545CEB',
              }}>
                Start writing
              </Button1>
            </Link>
          </div>
        )}
      </div>
      <nav className="flex flex-row items-center  "
      style={{
        width:'75%'
      }}
      >

        <div className='flex justify-start' style={{width:'33%'}}>
          <Link className="header-link" href={"/"}>
          <Image src={logo} alt="ChatG6 Logo" width={100} height={50} />
          </Link>
        </div>

        <div className="gap-5" style={{width:'67%'}}>
          <Link className="header-link" href={"/"}>
            Pricing
          </Link>
          <Link className="header-link" href={"/"}>
            About
          </Link>
          <Link className="header-link" href={"/"}>
            Blog
          </Link>
        </div>

      </nav>
    </header>
  );
}
