
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Activity, ArrowUpRight, Bot, Copy, FilePlus, FileText, Filter, Linkedin, Search, Send, Star, Trash2, TrendingUp, Loader2, Mail, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase-db';
import { collection, onSnapshot, deleteDoc, doc, query, where } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import type { ResumeData } from '@/types/resume';
import { useToast } from '@/hooks/use-toast';
import { getResumeText } from '@/lib/get-resume-text';


const quickActions = [
    { title: "New Resume", description: "Create from scratch", icon: <FilePlus className="h-8 w-8 text-primary" />, href: "/builder/new" },
    { title: "ATS Check", description: "Upload for analysis", icon: <Bot className="h-8 w-8 text-primary" />, href: "/ats-analyzer" },
    { title: "Job Match", description: "Find opportunities", icon: <TrendingUp className="h-8 w-8 text-primary" />, href: "/job-matcher" },
    { title: "Cover Letter", description: "Generate a letter", icon: <Mail className="h-8 w-8 text-primary" />, href: "/cover-letter" },
    { title: "LinkedIn", description: "Optimize your profile", icon: <Linkedin className="h-8 w-8 text-primary" />, href: "/linkedin-optimizer" },
    { title: "Templates", description: "Browse our templates", icon: <FileText className="h-8 w-8 text-primary" />, href: "/templates" },
];


interface ResumeRecord {
  id: string;
  data: ResumeData;
  atsScore?: number;
  modified: string;
}


export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [filteredResumes, setFilteredResumes] = useState<ResumeRecord[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                setIsLoading(false);
                setResumes([]);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        setIsLoading(true);
        const resumesCollection = collection(db, `users/${user.uid}/resumes`);
        
        const unsubscribeFirestore = onSnapshot(resumesCollection, (querySnapshot) => {
            const fetchedResumes = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data() as ResumeData,
                atsScore: Math.floor(Math.random() * 30) + 70, // Placeholder score
                modified: new Date(doc.data().modifiedAt?.toDate() || Date.now()).toLocaleDateString(),
            }));
            setResumes(fetchedResumes);
            setFilteredResumes(fetchedResumes);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching resumes: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch resumes.' });
            setIsLoading(false);
        });

        return () => unsubscribeFirestore();

    }, [user, toast]);

    useEffect(() => {
        const results = resumes.filter(resume =>
            resume.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResumes(results);
    }, [searchQuery, resumes]);

    const deleteResume = async (resumeId: string) => {
        if (!user) return;
        if (!confirm(`Are you sure you want to delete "${resumeId}"?`)) return;

        try {
            await deleteDoc(doc(db, `users/${user.uid}/resumes`, resumeId));
            toast({ title: "Success", description: `Resume "${resumeId}" deleted.` });
        } catch (error) {
            console.error("Error deleting resume: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete resume.' });
        }
    };
    
    const handleShare = (resumeId: string) => {
        const url = `${window.location.origin}/share/resume/${user?.uid}/${resumeId}`;
        navigator.clipboard.writeText(url);
        toast({ title: "Copied!", description: "Shareable link copied to clipboard." });
    };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.displayName || 'User'}! 👋 Ready to optimize your job search?</p>
            </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-3">
                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {quickActions.map((action) => (
                        <Link href={action.href} key={action.title}>
                            <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors h-full">
                                {action.icon}
                                <p className="font-semibold mt-2 text-center">{action.title}</p>
                                <p className="text-sm text-muted-foreground text-center">{action.description}</p>
                            </div>
                        </Link>
                        ))}
                    </CardContent>
                </Card>

                 {/* Resume Library */}
                 <Card className="mt-8">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <CardTitle>Your Resumes</CardTitle>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                        placeholder="Search resumes..." 
                                        className="pl-8" 
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                         {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : resumes.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-muted-foreground mb-4">You haven't created any resumes yet.</p>
                                <Button asChild>
                                    <Link href="/builder/new">Create Your First Resume</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredResumes.map((resume) => (
                                <Card key={resume.id} className="group">
                                    <CardHeader className="p-0">
                                        <div className="aspect-[3/4] bg-muted rounded-t-md flex items-center justify-center p-4 relative">
                                            <Image src={`https://picsum.photos/seed/${resume.id}/300/400`} width={300} height={400} alt={resume.id} className="rounded-md object-cover" data-ai-hint="resume preview" />
                                            <Button asChild variant="secondary" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/builder/${resume.id}`}>Preview</Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-2">
                                        <CardTitle className="text-base truncate">{resume.id}</CardTitle>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span>ATS: <span className={resume.atsScore && resume.atsScore > 85 ? 'text-green-500' : resume.atsScore && resume.atsScore > 75 ? 'text-yellow-500' : 'text-red-500'}>{resume.atsScore || 'N/A'}%</span></span>
                                            <span>Modified: {resume.modified}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-2 pt-0 grid grid-cols-2 gap-2">
                                        <Button asChild size="sm">
                                            <Link href={`/builder/${resume.id}`}>Edit</Link>
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleShare(resume.id)}><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                                        <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(getResumeText(resume.data)); toast({title: "Copied!"}) }}><Copy className="h-4 w-4 mr-2" /> Copy</Button>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500 hover:bg-red-500/10" onClick={() => deleteResume(resume.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
                                    </CardFooter>
                                </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
