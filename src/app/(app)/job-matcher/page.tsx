
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, BookOpen, CheckCircle, Circle, Copy, Eye, FileText, Heart, Lightbulb, Loader2, MapPin, Milestone, Search, Sparkles, Target, Wallet, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { analyzeJobMatch, AnalyzeJobMatchOutput } from '@/ai/flows/analyze-job-match';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase-db';
import { collection, getDocs } from 'firebase/firestore';
import type { ResumeData } from '@/types/resume';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';

interface ResumeRecord {
  id: string;
  data: ResumeData;
}

const similarJobs = [
    { title: 'Full Stack Developer', company: 'StartupXYZ', location: 'Remote', salary: '$110k-$140k', match: 92, details: 'React, Node.js, AWS - Perfect skill alignment' },
    { title: 'Senior React Developer', company: 'FinTech Pro', location: 'New York', salary: '$125k-$160k', match: 89, details: 'React, GraphQL, TypeScript - Great growth opportunity' },
    { title: 'Lead Software Engineer', company: 'TechGiant', location: 'Seattle', salary: '$140k-$180k', match: 85, details: 'Leadership role, microservices, cloud architecture' },
]

export default function JobMatcherPage() {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalyzeJobMatchOutput | null>(null);

    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchResumes(currentUser.uid);
            } else {
                setResumes([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchResumes = async (uid: string) => {
        setIsLoading(true);
        try {
            const resumesCollection = collection(db, `users/${uid}/resumes`);
            const querySnapshot = await getDocs(resumesCollection);
            const fetchedResumes = querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data() as ResumeData,
            }));
            setResumes(fetchedResumes);
            if (fetchedResumes.length > 0) {
                setSelectedResumeId(fetchedResumes[0].id);
            }
        } catch (error) {
            console.error("Error fetching resumes: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch your resumes.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedResumeId) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a resume.' });
            return;
        }
        if (!jobDescription) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please paste a job description.' });
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);

        const selectedResume = resumes.find(r => r.id === selectedResumeId);
        if (!selectedResume) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not find selected resume.' });
            setIsLoading(false);
            return;
        }

        // Basic text conversion from resume data
        const resumeText = Object.values(selectedResume.data).flat().map(section => {
            if (typeof section === 'string') return section;
            if (typeof section === 'object') return Object.values(section).join(' ');
            return '';
        }).join('\n\n');


        try {
            const result = await analyzeJobMatch({ resumeText, jobDescription });
            setAnalysisResult(result);
        } catch (error) {
            console.error("Error analyzing job match: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to analyze job match.' });
        } finally {
            setIsLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score > 85) return 'text-green-500';
        if (score > 70) return 'text-yellow-500';
        return 'text-red-500';
    };


    return (
        <div className="container py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline mb-2">Smart Job Matcher</h1>
                <p className="text-muted-foreground">Find your perfect job compatibility</p>
            </div>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Start Your Analysis</CardTitle>
                    <CardDescription>Paste a job description and select your resume to get a detailed match analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <label className="font-semibold">Job Description</label>
                        <Textarea id="job-description" placeholder="Paste the job description or job URL here..." className="h-48" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <label className="font-semibold">Select Resume to Match</label>
                        <div className="flex flex-wrap gap-2">
                            {resumes.map(resume => (
                                <Card 
                                    key={resume.id} 
                                    className={`p-3 cursor-pointer flex items-center gap-3 ${selectedResumeId === resume.id ? 'border-primary ring-2 ring-primary' : ''}`}
                                    onClick={() => setSelectedResumeId(resume.id)}
                                >
                                    <FileText className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-sm">{resume.id}</p>
                                    </div>
                                     {selectedResumeId === resume.id && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                                </Card>
                            ))}
                            {resumes.length === 0 && !isLoading && (
                                <p className="text-sm text-muted-foreground">You have no saved resumes. Go to the builder to create one!</p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                    <Button size="lg" onClick={handleAnalyze} disabled={isLoading || !selectedResumeId || !jobDescription}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Analyze Job Match
                    </Button>
                </div>
            </Card>

            {isLoading && !analysisResult && (
                <div className="flex items-center justify-center p-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">Analyzing...</p>
                </div>
            )}


            {analysisResult && (
                 <div className="space-y-8">
                     {/* Match Analysis Results */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Job Match Analysis Results</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-8 items-center">
                             <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-card-foreground/5 rounded-lg">
                                 <div className="relative h-32 w-32">
                                    <svg className="h-full w-full" viewBox="0 0 36 36">
                                        <path className="text-muted" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                        <path className={getScoreColor(analysisResult.matchScore)} strokeDasharray={`${analysisResult.matchScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold font-headline">{analysisResult.matchScore}%</span>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold mt-4">
                                {analysisResult.matchScore > 85 ? "Excellent Match!" : analysisResult.matchScore > 70 ? "Good Match" : "Needs Improvement"}
                                </p>
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                 <h3 className="font-semibold mb-3">Job Requirements Analysis</h3>
                                 <div className="p-4 border rounded-lg space-y-4 max-h-60 overflow-y-auto">
                                    <div>
                                        <h4 className="flex items-center gap-2 font-medium text-green-500 mb-2"><CheckCircle /> You Meet ({analysisResult.metRequirements.length})</h4>
                                        <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                            {analysisResult.metRequirements.map((req, i) => <li key={`met-${i}`}>{req}</li>)}
                                        </ul>
                                    </div>
                                    <Separator />
                                     <div>
                                        <h4 className="flex items-center gap-2 font-medium text-red-500 mb-2"><XCircle /> Missing ({analysisResult.missingRequirements.length})</h4>
                                         <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                            {analysisResult.missingRequirements.map((req, i) => <li key={`missing-${i}`}>{req}</li>)}
                                        </ul>
                                    </div>
                                 </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Similar Jobs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Similar Job Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {similarJobs.map((job, i) => (
                                <Card key={i} className="p-4 bg-background">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold">{job.title} - {job.company}</h4>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                                <span><MapPin className="inline mr-1" />{job.location}</span>
                                                <span><Wallet className="inline mr-1" />{job.salary}</span>
                                                <span><Target className="inline mr-1" />{job.match}% match</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon"><Heart className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                     <p className="text-sm text-muted-foreground mt-2">{job.details}</p>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full">
                                <Search className="mr-2" /> Find More Jobs
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            )}
        </div>
    );
}

    