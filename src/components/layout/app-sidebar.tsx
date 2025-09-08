
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, FileText, Home, LayoutTemplate, Linkedin, Settings, Target, TrendingUp, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <Home /> },
    { href: '/builder/1', label: 'Resume Builder', icon: <FileText /> },
    { href: '/templates', label: 'Templates', icon: <LayoutTemplate /> },
    { href: '/ats-analyzer', label: 'ATS Analyzer', icon: <Bot /> },
    { href: '/tailor', label: 'Resume Tailoring', icon: <Target /> },
    { href: '/job-matcher', label: 'Job Matcher', icon: <TrendingUp /> },
    { href: '/linkedin-optimizer', label: 'LinkedIn Optimizer', icon: <Linkedin /> },
];

const bottomLinks = [
    { href: '/profile', label: 'Profile', icon: <User /> },
    { href: '/profile', label: 'Settings', icon: <Settings /> },
]

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:block border-r">
            <SidebarHeader>
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Logo className="h-7 w-7 text-primary" />
                    <span className="font-bold font-headline text-xl group-data-[collapsible=icon]:hidden">ResumeAI</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="flex flex-col justify-between p-2">
                <SidebarMenu>
                    {navLinks.map(link => (
                        <SidebarMenuItem key={link.href}>
                            <Link href={link.href}>
                                <SidebarMenuButton 
                                    isActive={pathname.startsWith(link.href) && link.href !== '/dashboard' || pathname === '/dashboard' && link.href === '/dashboard'}
                                    tooltip={{
                                        children: link.label
                                    }}
                                >
                                    {link.icon}
                                    <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                
                <SidebarMenu>
                    {bottomLinks.map(link => (
                        <SidebarMenuItem key={link.label}>
                             <Link href={link.href}>
                                <SidebarMenuButton 
                                    isActive={pathname.startsWith(link.href)}
                                    tooltip={{
                                        children: link.label
                                    }}
                                >
                                    {link.icon}
                                    <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

            </SidebarContent>
        </Sidebar>
    );
}
