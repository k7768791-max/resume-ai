
"use client";

import * as React from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { LifeBuoy, LogOut, Settings, User, Menu, Bot, FileText, Home, LayoutTemplate, Linkedin, Target, TrendingUp, Mail } from "lucide-react";
import { Logo } from "../icons";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <Home /> },
    { href: '/builder/1', label: 'Builder', icon: <FileText /> },
    { href: '/templates', label: 'Templates', icon: <LayoutTemplate /> },
    { href: '/ats-analyzer', label: 'ATS Analyzer', icon: <Bot /> },
    { href: '/tailor', label: 'Tailoring', icon: <Target /> },
    { href: '/job-matcher', label: 'Job Matcher', icon: <TrendingUp /> },
    { href: '/linkedin-optimizer', label: 'LinkedIn', icon: <Linkedin /> },
    { href: '/cover-letter', label: 'Cover Letter', icon: <Mail /> },
];

export function AppHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { toast } = useToast();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [user, setUser] = React.useState<FirebaseUser | null>(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        toast({
            title: "Signed Out",
            description: "You have been successfully signed out.",
        });
        router.push('/auth/login');
    };
    
    React.useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    return (
        <header className={cn(
            'sticky top-0 z-50 w-full transition-all duration-300 border-b',
            isScrolled ? 'bg-background/80 backdrop-blur-sm' : 'bg-background'
        )}>
            <div className="container flex h-16 items-center">
                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader className="sr-only">
                                <SheetTitle>Navigation Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col h-full">
                                <div className="flex items-center mb-6">
                                    <Link href="/dashboard" className="mr-6 flex items-center gap-2">
                                        <Logo className="h-6 w-6 text-primary" />
                                        <span className="font-bold font-headline text-lg">ResumeAI</span>
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-4 text-lg">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn('transition-colors hover:text-foreground/80 text-foreground/80 flex items-center gap-2',
                                                pathname.startsWith(link.href) && link.href !== '/dashboard' || pathname === '/dashboard' && link.href === '/dashboard' ? 'text-primary' : 'text-foreground/60'
                                            )}
                                        >
                                            {link.icon} {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                
                {/* Desktop Left Logo */}
                <div className="hidden md:flex">
                     <Link href="/dashboard" className="flex items-center gap-2">
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block font-headline text-lg">
                            ResumeAI
                        </span>
                    </Link>
                </div>

                {/* Desktop Center Nav */}
                <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'transition-colors hover:text-foreground/80',
                                pathname.startsWith(link.href) && link.href !== '/dashboard' || pathname === '/dashboard' && link.href === '/dashboard' ? 'text-foreground' : 'text-foreground/60'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side Actions */}
                <div className="flex items-center gap-4 ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Avatar>
                                    <AvatarImage src={user?.photoURL || ''} alt="User avatar" />
                                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile">
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LifeBuoy className="mr-2 h-4 w-4" />
                                Support
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
