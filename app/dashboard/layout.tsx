'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react'
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session }: any = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Degrees",
    "Create topic"
  ];
  return <section className="min-h-screen">
    <Navbar onMenuOpenChange={setIsMenuOpen} className='bg-orange-600/40'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href='/dashboard/home'>
            <p className="text-yellow-600 text-xl">Teaching content</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/dashboard/degrees">
            Grados
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard/topic/create">
            Crear tema
          </Link>
        </NavbarItem>
        <NavbarItem className='ml-8'>
          <Dropdown>
            <DropdownTrigger>
              <Avatar isBordered color="warning" src={`${session?.user.avatar}`} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{session?.user.username}</p>
                <p className="font-semibold">{session?.user.mail}</p>
              </DropdownItem>
              <DropdownItem>
                Ajustes
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Cerrar sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className='bg-yellow-800/30'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "success" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    {children}
  </section>
}