/*'use client'
import React, { useEffect } from 'react'
import Image from "next/image"
import { icons, LayoutGrid, Link, PiggyBank, ReceiptText, ShieldCheck} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import path from 'path'
import { usePathname } from 'next/navigation'

function SideNav() {
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            icons:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budgets',
            icons:PiggyBank,
            path:'/dashboard/budgets'
        },
        {
            id:3,
            name:'Expenses',
            icons:ReceiptText,
            path:'/dashboard/expenses'
        },
        {
            id:4,
            name:'Upgrade',
            icons:ShieldCheck,
            path:'/dashboard/upgrade'
        }
        
    ]
    const path=usePathname();

    useEffect(()=>{
        console.log(path)
    },[path])
    
  return (
    <div className='h-screen p-5 shadow-md'>
        <Image src={'/Moneymate Logo.png'}
                alt='logo'
                width={250}
                height={110}
        />
        <div className='mt-5'> 
            {menuList.map((menu,index)=>(
               <Link key={menu.id} href={menu.path}>
                <h2 className={`flex gap-2 items-center text-gray-600
                font-bold p-5 cursor-pointer rounded-md
                hover:text-primary hover:bg-blue-100
                ${path==menu.path&&'text-primary bg-blue-100'}
                `}>
                    <menu.icons/>
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default SideNav
*/

'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { ChartArea, ChartBar, LayoutGrid, MessageCircle, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icons: LayoutGrid,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Budgets',
      icons: PiggyBank,
      path: '/dashboard/budgets',
    },
    {
      id: 3,
      name: 'Expenses',
      icons: ReceiptText,
      path: '/dashboard/expenses',
    },
    {
      id: 5,
      name: 'Stocks',
      icons: ChartArea,
      path: '/dashboard/stocks',
    },
    {
      id: 6,
      name: 'AI-Chat',
      icons: MessageCircle,
      path: '/dashboard/chat',
    },
  ]

  const pathname = usePathname()

  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  return (
    <div className='h-screen p-5 shadow-md'>
      <Image
        src='/Moneymate Logo.png'
        alt='logo'
        width={250}
        height={110}
      />
      <div className='mt-5'>
        {menuList.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-600 font-bold p-5 cursor-pointer rounded-md
                hover:text-primary hover:bg-blue-100 mb-2
                ${pathname === menu.path && 'text-primary bg-blue-100' }
              `}
            >
              <menu.icons />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton />
        Profile
      </div>
    </div>
  )
}

export default SideNav
