"use client";

import {
  FileText,
  Folder,
  Home,
  Image as ImageIcon,
  Music,
  Settings,
  Star,
  Trash2,
  Video,
  Signpost,
  UserRound,
  Plus,
  XIcon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Link } from "react-router";

import { Progress } from "@/components/ui/progress"
import { BACKEND_BASE_URL, useAuth } from "@/App";
import { useEffect, useState } from "react";

import { formatFileSize } from "@/lib/files";

import VeblsIcon from '@/assets/vebls.svg?react'

const mainItems = [
  { title: "Home", icon: Home, link: "/" , adminOnly: false},
  { title: "Route Rules", icon: Signpost, link: "/.@/rules", adminOnly: true },
  { title: "Create", icon: Plus, link: "/.@/create", adminOnly: true },

  { title: "Account", icon: UserRound, link: "/.@/account", adminOnly: false },
];

interface Usage {
  percent: number
  free: number
  base: number
}

export function AppSidebar() {

  const [usage, setUsage] = useState<Usage | null>(null)

  const {user} = useAuth()


  useEffect(()=>{
    fetch(`${BACKEND_BASE_URL}/info/disk-usage`, { credentials: "include" }).then(r => r.json()).then(res => {
      let newUsage: Usage = { percent: res.percent, free: res.free, base: res.base }
      setUsage(newUsage)
    })
  },[])
  

  return (
    <Sidebar variant="inset">
      <SidebarContent className="pl-2 pt-3">

        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-row">
              <div className="flex flex-col justify-center items-center ">
                <VeblsIcon className="h-[2rem] w-[2rem]"></VeblsIcon>
              </div>
              <div className="text-3xl font-bold">Vebls</div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) =>{ if (item.adminOnly==false || (user!==null && user!==undefined)){
                return (

                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton >
                      <Link to={item.link} className="pl-1 flex flex-row gap-4 items-center">
                        <item.icon className="h-4 w-4" />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              } })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        
      </SidebarContent>
      {usage !== null &&
        <SidebarFooter>
          <SidebarGroupLabel>Storage space</SidebarGroupLabel>
          <SidebarGroupContent>

            <div className="p-2 pt-4 pb-6 flex flex-col gap-4 bg-popover/10 rounded-lg">

              <div className="text-ring "><span>{formatFileSize(usage.free)}</span> of <span>{formatFileSize(usage.base)}</span> used</div>

              <Progress value={usage.percent}
                max={100}
                className="mx-auto w-full max-w-xs"
              ></Progress>
            </div>
          </SidebarGroupContent>
        </SidebarFooter>
      }
    </Sidebar>
  );
}