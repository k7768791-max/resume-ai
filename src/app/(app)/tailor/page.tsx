
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, FileText, Loader2, Save, Sparkles, Target, XCircle, FileUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { tailorResumeToJobDescription, TailorResumeToJobDescriptionOutput } from '@/ai/flows/tailor-resume-to-job-description';
import { analyzeJobMatch, AnalyzeJobMatchOutput } from '@/ai/flows/analyze-job-match';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase-db';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import type { ResumeData } from '@/types/resume';
import { getResumeText } from '@/lib/get-resume-text';
import { extractTextFromFile } from '@/ai/flows/extract-text-from-file';


interface ResumeRecord {
  id: string;
  data: ResumeData;
  text: string;
}

export default function TailorPage() {
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [selectedResume, setSelectedResume] = useState<ResumeRecord | null>(null);
  const [originalResumeText, setOriginalResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  
  const [tailoredResult, setTailoredResult] = useState<TailorResumeToJobDescriptionOutput | null>(null);
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
        const fetchedResumes = querySnapshot.docs.map(doc => {
            const data = doc.data() as ResumeData;
            return { id: doc.id, data: data, text: getResumeText(data) };
        });
        setResumes(fetchedResumes);
        if (fetchedResumes.length > 0) {
            handleSelectResume(fetchedResumes[0].id);
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
        setSelectedResume(null); 
        const reader = new FileReader();
        reader.onload = async (e) => {
            const dataUri = e.target?.result as string;
            try {
                const result = await extractTextFromFile({ fileDataUri: dataUri, mimeType: file.type });
                setOriginalResumeText(result.text);
                toast({ title: "Success", description: "Resume text extracted." });
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: (error as Error).message });
            } finally {
                setIsLoading(false);
            }
        };
        reader.readAsDataURL(file);
    }
  };
  
  const handleSelectResume = (id: string) => {
      const resume = resumes.find(r => r.id === id);
      if (resume) {
          setSelectedResume(resume);
          setOriginalResumeText(resume.text);
          setFileName('');
      }
  };
  
  const handleAnalyze = async () => {
    if (!originalResumeText || !jobDescription) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select/upload a resume and paste a job description.'});
      return;
    }

    setIsLoading(true);
    try {
      const tailoredOutput = await tailorResumeToJobDescription({ resumeText: originalResumeText, jobDescription });
      const tailoredAnalysis = await analyzeJobMatch({ resumeText: tailoredOutput.tailoredResumeText, jobDescription });
      
      setTailoredResult(tailoredOutput);
      setAnalysisResult(tailoredAnalysis);
      setIsAnalyzed(true);

    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to tailor resume.'});
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsAnalyzed(false);
    setTailoredResult(null);
    setAnalysisResult(null);
    setJobDescription('');
  };
  
  const handleSaveAsNew = async () => {
    if (!user || !selectedResume || !tailoredResult) {
        toast({ variant: 'destructive', title: 'Error', description: 'Cannot save tailored version of an uploaded (unsaved) resume.' });
        return;
    };

    const newName = `${selectedResume.id} (Tailored)`;
    
    // This is a simplified update. A more robust solution would parse the tailored text back into the ResumeData structure.
    const newResumeData: ResumeData = {
        ...selectedResume.data,
        summary: tailoredResult.tailoredResumeText.split('\n\n')[0] || selectedResume.data.summary,
        // This is a naive update and might not correctly map descriptions
        work: selectedResume.data.work.map(w => ({...w, description: tailoredResult.tailoredResumeText.includes(w.company) ? tailoredResult.tailoredResumeText : w.description }))
    };

    try {
        const resumeRef = doc(db, `users/${user.uid}/resumes`, newName);
        await setDoc(resumeRef, newResumeData, { merge: true });
        toast({ title: 'Success', description: `Resume "${newName}" saved.` });
        fetchResumes(user.uid);
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to save new resume.' });
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 85) return 'text-green-500';
    if (score > 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="container py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline mb-2">Resume Job Tailoring</h1>
        <p className="text-muted-foreground mb-8">Optimize your resume for specific jobs before you apply.</p>
      </div>

      {!isAnalyzed ? (
        <Card>
          <CardHeader>
            <CardTitle>Start Tailoring</CardTitle>
            <CardDescription>Select a resume and paste the job description to begin.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-semibold">Step 1: Choose Your Resume</h3>
                 <div className="p-4 border-2 border-dashed rounded-lg text-center">
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
                    <Button variant="outline" asChild><label className="cursor-pointer">Upload Resume<input type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.pdf,.txt" /></label></Button>
                    {fileName && <p className="text-sm text-green-500 mt-2">Uploaded: {fileName}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Supports: DOCX, PDF, TXT</p>
                </div>
                <div className="relative my-2"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div></div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {resumes.map(resume => (
                         <Card key={resume.id} className={`p-3 cursor-pointer flex items-center gap-3 transition-colors ${selectedResume?.id === resume.id ? 'border-primary ring-2 ring-primary' : 'hover:bg-muted/50'}`} onClick={() => handleSelectResume(resume.id)}>
                            <FileText className="h-5 w-5 text-primary" />
                             <p className="font-semibold text-sm">{resume.id}</p>
                            {selectedResume?.id === resume.id && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                        </Card>
                    ))}
                    {isLoading && <Loader2 className="h-6 w-6 animate-spin mx-auto" />}
                    {resumes.length === 0 && !isLoading && <p className="text-sm text-muted-foreground text-center py-2">No resumes found.</p>}
                </div>
            </div>
             <div className="space-y-4">
                <h3 className="font-semibold">Step 2: Add Job Description</h3>
                <Textarea placeholder="Paste the complete job description here..." className="h-full min-h-[300px]" value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
             </div>
          </CardContent>
           <CardFooter className="text-center flex-col gap-4 pt-4">
                <Button size="lg" onClick={handleAnalyze} disabled={!originalResumeText || isLoading || !jobDescription}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Target className="mr-2" /> Analyze & Tailor Resume
                </Button>
             </CardFooter>
        </Card>
      ) : (
        <div className="space-y-8">
            {analysisResult && (
            <Card>
                <CardHeader>
                    <CardTitle>Job Match Analysis</CardTitle>
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
                            <span className="text-4xl font-bold font-headline">{analysisResult.matchScore}%</span>
                        </div>
                        </div>
                        <p className="text-lg font-semibold mt-4">Good Match!</p>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <h3 className="font-semibold">Key Requirements</h3>
                        <div className="space-y-2 max-h-48 overflow-auto pr-2">
                        {analysisResult.metRequirements.map((req, i) => (
                             <div key={`met-${i}`} className="flex items-center gap-2 text-sm"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /><span>{req}</span></div>
                        ))}
                         {analysisResult.missingRequirements.map((req, i) => (
                             <div key={`missing-${i}`} className="flex items-center gap-2 text-sm"><XCircle className="h-5 w-5 text-red-500 shrink-0" /><span>{req}</span></div>
                        ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            )}

            {tailoredResult && (
            <Card>
                <CardHeader>
                    <CardTitle>Tailored Resume</CardTitle>
                    <CardDescription>Your resume has been optimized for the job description.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea readOnly value={tailoredResult.tailoredResumeText} className="h-96" />
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button onClick={handleSaveAsNew} disabled={!selectedResume}><Save className="mr-2" /> Save as New Version</Button>
                </CardFooter>
            </Card>
            )}

            <Card>
                <CardFooter className="justify-center pt-6">
                    <Button size="lg" onClick={resetState}>
                        <ArrowRight className="mr-2" /> Start a New Analysis
                    </Button>
                </CardFooter>
            </Card>
        </div>
      )}
    </div>
  );
}

    
