
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, ChevronRight, RefreshCw, FileUp, FileText, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeJobMatch, AnalyzeJobMatchOutput } from "@/ai/flows/analyze-job-match";
import { extractTextFromFile } from "@/ai/flows/extract-text-from-file";
import { Label } from "@/components/ui/label";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { ResumeData } from "@/types/resume";
import { getResumeText } from "@/lib/get-resume-text";


interface ResumeRecord {
  id: string;
  text: string;
}

export default function AtsAnalyzerPage() {
    const [analysisResult, setAnalysisResult] = useState<AnalyzeJobMatchOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [fileName, setFileName] = useState('');
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const { toast } = useToast();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                fetchResumes(user.uid);
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
                text: getResumeText(doc.data() as ResumeData),
            }));
            setResumes(fetchedResumes);
            if (fetchedResumes.length > 0) {
                const firstResume = fetchedResumes[0];
                setSelectedResumeId(firstResume.id);
                setResumeText(firstResume.text);
            }
        } catch (error) {
            console.error("Error fetching resumes: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch resumes.' });
        } finally {
            setIsLoading(false);
        }
    };


    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setFileName(file.name);
            setSelectedResumeId(null); // Deselect any saved resume
            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataUri = e.target?.result as string;
                try {
                    const result = await extractTextFromFile({ fileDataUri: dataUri, mimeType: file.type });
                    setResumeText(result.text);
                    toast({ title: "Success", description: "Resume text extracted." });
                } catch (error) {
                    console.error(error);
                    toast({ variant: "destructive", title: "Error", description: (error as Error).message });
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!resumeText) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select or upload a resume first.' });
            return;
        }
        if (!jobDescription) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please paste a job description.'});
            return;
        }
        setIsLoading(true);
        try {
            const result = await analyzeJobMatch({ resumeText, jobDescription });
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error", description: "Failed to analyze resume." });
        } finally {
            setIsLoading(false);
        }
    };
    
    const resetState = () => {
        setAnalysisResult(null);
        setJobDescription('');
        // Reset to first resume if available
        if (resumes.length > 0) {
            const firstResume = resumes[0];
            setSelectedResumeId(firstResume.id);
            setResumeText(firstResume.text);
            setFileName('');
        } else {
            setSelectedResumeId(null);
            setResumeText('');
            setFileName('');
        }
    };

    const getScoreColor = (score: number) => {
        if (score > 85) return 'text-green-500';
        if (score > 70) return 'text-yellow-500';
        return 'text-red-500';
    };
    
    const handleSelectResume = (id: string) => {
        const selected = resumes.find(r => r.id === id);
        if (selected) {
            setSelectedResumeId(id);
            setResumeText(selected.text);
            setFileName(''); // Clear file name when selecting from saved
        }
    }

    return (
        <div className="container py-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline mb-2">ATS Resume Analyzer</h1>
                <p className="text-muted-foreground mb-8">Check your resume's ATS compatibility before you apply.</p>
            </div>
            
            {!analysisResult ? (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Start Your Analysis</CardTitle>
                        <CardDescription>Select a resume and paste a job description for the most accurate results.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="font-semibold">Step 1: Choose Your Resume</h3>
                            <div className="p-4 border-2 border-dashed rounded-lg text-center relative">
                                <FileUp className="h-10 w-10 text-muted-foreground mb-2 mx-auto" />
                                <h4 className="text-md font-semibold mb-2">Upload New Resume</h4>
                                <Button variant="outline" asChild>
                                    <label htmlFor="resume-upload" className="cursor-pointer">
                                        Choose File
                                        <input id="resume-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.pdf,.txt" />
                                    </label>
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">Supports: DOCX, PDF, TXT</p>
                                {fileName && <p className="text-sm text-green-500 mt-2">Uploaded: {fileName}</p>}
                            </div>

                             <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-md font-semibold mb-2">Select a Saved Resume</h4>
                                 <div className="space-y-2">
                                     {resumes.map(resume => (
                                        <Card 
                                            key={resume.id} 
                                            className={`p-3 cursor-pointer flex items-center gap-3 transition-colors ${selectedResumeId === resume.id ? 'border-primary ring-2 ring-primary' : 'hover:bg-muted/50'}`}
                                            onClick={() => handleSelectResume(resume.id)}
                                        >
                                            <FileText className="h-5 w-5 text-primary" />
                                            <p className="font-semibold text-sm">{resume.id}</p>
                                            {selectedResumeId === resume.id && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                                        </Card>
                                    ))}
                                    {resumes.length === 0 && !isLoading && (
                                        <p className="text-sm text-muted-foreground text-center py-4">No saved resumes found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 mb-3">
                             <h3 className="font-semibold">Step 2: Add Job Description</h3>
                            <Label htmlFor="job-description" className="sr-only">Job Description</Label>
                            <Textarea 
                                id="job-description" 
                                placeholder="Paste the job description here..." 
                                className="h-full min-h-[300px]"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <div className=" m-5 p-6 pt-0 text-center">
                        <Button size="lg" onClick={handleAnalyze} disabled={isLoading || !resumeText || !jobDescription}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Analyze Resume
                        </Button>
                    </div>
                </Card>
            ) : (
                 <>
                 {/* Analysis Results */}
                <Card className="mb-8">
                    <CardHeader className="text-center">
                        <CardTitle>Analysis Results</CardTitle>
                        <CardDescription>{analysisResult.analysisSummary}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-card-foreground/5 rounded-lg">
                             <div className="relative h-32 w-32">
                                <svg className="h-full w-full" viewBox="0 0 36 36">
                                    <path className="text-muted" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                    <path className={getScoreColor(analysisResult.matchScore)} strokeDasharray={`${analysisResult.matchScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold font-headline">{analysisResult.matchScore}</span>
                                    <span className="text-sm text-muted-foreground">/ 100</span>
                                </div>
                            </div>
                            <p className="text-lg font-semibold mt-4">
                                {analysisResult.matchScore > 85 ? "Excellent!" : analysisResult.matchScore > 70 ? "Good" : "Needs Improvement"}
                            </p>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">Missing Requirements</h3>
                             <ul className="space-y-2 list-inside">
                                {analysisResult.missingRequirements.length > 0 ? (
                                    analysisResult.missingRequirements.map((item, i) => (
                                        <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No missing requirements found. Great job!</p>
                                )}
                            </ul>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 flex justify-center gap-4">
                        <Button variant="outline" onClick={resetState}><RefreshCw className="mr-2"/> Analyze Another</Button>
                    </div>
                </Card>
                </>
            )}
        </div>
    );
}

    
