"use client"

import * as React from "react"
import Link from "next/link"
import { CiMenuBurger } from "react-icons/ci";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"

export function HamburguerMenu() {
  return (
<NavigationMenu className="fixed top-0 right-2 z-10">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger><CiMenuBurger className='w-6 h-6 transition duration-200 group-data-[state=open]:rotate-90' /></NavigationMenuTrigger>
      <NavigationMenuContent className="flex flex-col gap-4 px-10 py-4">
        <NavigationMenuLink><Link href="/">Inicio</Link></NavigationMenuLink>
        <NavigationMenuLink><Link href="/retiro/cadastro">Participar</Link></NavigationMenuLink>
        <NavigationMenuLink><Link href="/retiro/login">Login</Link></NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
  )}