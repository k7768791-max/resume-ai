
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, BookOpen, CheckCircle, Circle, Copy, Eye, FileText, Heart, Lightbulb, Loader2, MapPin, Milestone, Search, Sparkles, Target, Wallet, XCircle, FileUp } from 'lucide-react';
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
import { getResumeText } from '@/lib/get-resume-text';
import { extractTextFromFile } from '@/ai/flows/extract-text-from-file';
import { Label } from '@/components/ui/label';

interface ResumeRecord {
  id: string;
  data: ResumeData;
  text: string;
}

export default function JobMatcherPage() {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [selectedResumeText, setSelectedResumeText] = useState<string | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalyzeJobMatchOutput | null>(null);
    const [fileName, setFileName] = useState('');
    const [selectedSource, setSelectedSource] = useState<string | null>(null);
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
                text: getResumeText(doc.data() as ResumeData),
            }));
            setResumes(fetchedResumes);
            if (fetchedResumes.length > 0) {
                setSelectedSource(fetchedResumes[0].id);
                setSelectedResumeText(fetchedResumes[0].text);
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch your resumes.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setFileName(file.name);
            try {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const dataUri = e.target?.result as string;
                    try {
                        const result = await extractTextFromFile({ fileDataUri: dataUri, mimeType: file.type });
                        setSelectedResumeText(result.text);
                        setSelectedSource('uploaded');
                        toast({ title: "Success", description: "Resume text extracted." });
                    } catch (error) {
                        toast({ variant: "destructive", title: "Error", description: (error as Error).message });
                    } finally {
                        setIsLoading(false);
                    }
                };
                reader.readAsDataURL(file);
            } catch (err) {
                 toast({ variant: "destructive", title: "Error", description: "Could not read file."});
                 setIsLoading(false);
            }
        }
    };
    
    const handleSelectResume = (id: string) => {
        const resume = resumes.find(r => r.id === id);
        if (resume) {
            setSelectedResumeText(resume.text);
            setSelectedSource(id);
            setFileName('');
        }
    };

    const handleAnalyze = async () => {
        if (!selectedResumeText) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select or upload a resume.' });
            return;
        }
        if (!jobDescription) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please paste a job description.' });
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const result = await analyzeJobMatch({ resumeText: selectedResumeText, jobDescription });
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
                    <CardDescription>Select a resume and paste a job description to get a detailed match analysis.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-6">
                        <h3 className="font-semibold">Step 1: Choose Resume</h3>
                         <div className="p-4 border-2 border-dashed rounded-lg text-center">
                            <FileUp className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
                            <Button variant="outline" asChild><label className="cursor-pointer">Upload Resume<input type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.txt,.pdf" /></label></Button>
                            {fileName && <p className="text-sm text-green-500 mt-2">Uploaded: {fileName}</p>}
                            <p className="text-xs text-muted-foreground mt-1">Supports: DOCX, PDF, TXT</p>
                        </div>
                         <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div></div>
                         <div className="space-y-2">
                             {resumes.map(resume => (
                                <Card key={resume.id} onClick={() => handleSelectResume(resume.id)} className={`p-3 cursor-pointer flex items-center gap-3 transition-colors ${selectedSource === resume.id ? 'border-primary ring-2 ring-primary' : 'hover:bg-muted/50'}`}>
                                    <FileText className="h-5 w-5 text-primary" />
                                    <p className="font-semibold text-sm">{resume.id}</p>
                                    {selectedSource === resume.id && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                                </Card>
                            ))}
                            {resumes.length === 0 && !isLoading && <p className="text-sm text-muted-foreground text-center py-2">No saved resumes.</p>}
                         </div>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-semibold">Step 2: Add Job Description</h3>
                        <Label htmlFor="job-description" className="sr-only">Job Description</Label>
                        <Textarea id="job-description" placeholder="Paste the job description or job URL here..." className="h-full min-h-[300px]" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
                    </div>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                    <Button size="lg" onClick={handleAnalyze} disabled={isLoading || !selectedResumeText || !jobDescription}>
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
                             <CardDescription>{analysisResult.analysisSummary}</CardDescription>
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
                </div>
            )}
        </div>
    );
}
