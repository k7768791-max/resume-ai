
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bot, FileText, Home, LayoutTemplate, Linkedin, LogOut, Settings, Target, TrendingUp, User } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

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
    const router = useRouter();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast({
              title: "Signed Out",
              description: "You have been successfully signed out.",
            });
            router.push('/auth/login');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Sign Out Failed",
                description: "An error occurred while signing out. Please try again.",
            });
        }
    };

    return (
        <Sidebar variant="sidebar" collapsible="icon" className="hidden sm:block border-r w-64 data-[collapsible=icon]:w-14 transition-all duration-300 ease-in-out">
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
                     <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleSignOut}
                            tooltip={{
                                children: "Logout"
                            }}
                        >
                            <LogOut />
                            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

            </SidebarContent>
        </Sidebar>
    );
}
