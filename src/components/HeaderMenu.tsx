"use client"

import * as React from "react"
import Link from "next/link"
import { AiOutlineMenu } from "react-icons/ai";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,} from "@/components/ui/navigation-menu"

export function HeaderMenu() {
  return (

    <div className='w-[100%] bg-[#E6C6C8] fixed top-0 z-10' >
        <div className='w-[90%] mx-auto' >
            <div className='flex justify-end items-center gap-4 p-2'>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-[#E6C6C8]" >
                      <AiOutlineMenu color="#fff"className='w-6 h-6 transition duration-200 group-data-[state=open]:rotate-90' /></NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-4 px-10 py-4 bg-[#E6C6C8]">
                      <NavigationMenuLink><Link href="/">Inicio</Link></NavigationMenuLink>
                      <NavigationMenuLink><Link href="/">Participar</Link></NavigationMenuLink>
                      <NavigationMenuLink><Link href="/">Login</Link></NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
        </div>
    </div>

)}