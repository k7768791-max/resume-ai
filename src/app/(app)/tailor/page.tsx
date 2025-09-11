
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, Circle, Copy, Eye, FileText, Loader2, RefreshCw, Save, Sparkles, Target, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { tailorResumeToJobDescription, TailorResumeToJobDescriptionOutput } from '@/ai/flows/tailor-resume-to-job-description';
import { analyzeJobMatch, AnalyzeJobMatchOutput } from '@/ai/flows/analyze-job-match';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase-db';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import type { ResumeData } from '@/types/resume';

interface ResumeRecord {
  id: string;
  data: ResumeData;
  text: string;
}

const getResumeText = (resumeData: ResumeData) => {
    return Object.values(resumeData).flat().map(section => {
        if (typeof section === 'string') return section;
        if (typeof section === 'object' && section !== null) {
            if (Array.isArray(section)) {
                return section.map(item => typeof item === 'object' ? Object.values(item).join(' ') : item).join('\n');
            }
            return Object.values(section).join(' ');
        }
        return '';
    }).join('\n\n');
}

export default function TailorPage() {
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  
  const [tailoredResult, setTailoredResult] = useState<TailorResumeToJobDescriptionOutput | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeJobMatchOutput | null>(null);
  const [originalAnalysis, setOriginalAnalysis] = useState<AnalyzeJobMatchOutput | null>(null);

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
            return {
                id: doc.id,
                data: data,
                text: getResumeText(data),
            };
        });
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
    if (!selectedResumeId || !jobDescription) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a resume and paste a job description.'});
      return;
    }

    const selectedResume = resumes.find(r => r.id === selectedResumeId);
    if (!selectedResume) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not find selected resume.'});
      return;
    }

    setIsLoading(true);
    try {
      const [tailorOutput, analysisOutput, originalOutput] = await Promise.all([
        tailorResumeToJobDescription({ resumeText: selectedResume.text, jobDescription }),
        analyzeJobMatch({ resumeText: selectedResume.text, jobDescription }),
        analyzeJobMatch({ resumeText: selectedResume.text, jobDescription: '' }),
      ]);
      
      setTailoredResult(tailorOutput);
      setAnalysisResult(analysisOutput);
      setOriginalAnalysis(originalOutput);
      setIsAnalyzed(true);

    } catch (error) {
      console.error("Error tailoring resume:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to tailor resume.'});
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsAnalyzed(false);
    setTailoredResult(null);
    setAnalysisResult(null);
    setOriginalAnalysis(null);
    setJobDescription('');
  };
  
  const handleSaveAsNew = async () => {
    if (!user || !selectedResumeId || !tailoredResult) return;
    
    const originalResume = resumes.find(r => r.id === selectedResumeId);
    if (!originalResume) return;

    const newName = `${originalResume.id} (Tailored)`;
    
    // This is a simplified update. A more robust solution would parse the tailored text back into the ResumeData structure.
    const newResumeData: ResumeData = {
        ...originalResume.data,
        summary: tailoredResult.tailoredResumeText.split('\n\n')[1] || originalResume.data.summary,
        work: originalResume.data.work.map(w => ({...w, description: tailoredResult.tailoredResumeText.includes(w.company) ? tailoredResult.tailoredResumeText : w.description }))
    };

    try {
        const resumeRef = doc(db, `users/${user.uid}/resumes`, newName);
        await setDoc(resumeRef, newResumeData);
        toast({ title: 'Success', description: `Resume "${newName}" saved.` });
        fetchResumes(user.uid);
    } catch (error) {
        console.error("Error saving resume: ", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to save new resume.' });
    }
  };

  const getScoreColor = (score: number) => {
    if (score > 85) return 'text-green-500';
    if (score > 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const selectedResumeData = resumes.find(r => r.id === selectedResumeId)?.data;

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
            <CardDescription>Select your base resume and paste the job description to begin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <h3 className="font-semibold mb-2">Step 1: Select Your Resume</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {resumes.map(resume => (
                         <Card key={resume.id} className={`p-4 cursor-pointer ${selectedResumeId === resume.id ? 'border-primary ring-2 ring-primary' : ''}`} onClick={() => setSelectedResumeId(resume.id)}>
                            <div className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">{resume.id}</p>
                                    <p className="text-sm text-muted-foreground">Last saved resume</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {resumes.length === 0 && !isLoading && <p className="text-sm text-muted-foreground">No resumes found.</p>}
                </div>
            </div>
             <div>
                <h3 className="font-semibold mb-2">Step 2: Add Job Description</h3>
                <Textarea placeholder="Paste the complete job description here..." rows={12} value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
             </div>
             <div className="text-center">
                <Button size="lg" onClick={handleAnalyze} disabled={!selectedResumeId || isLoading || !jobDescription}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Target className="mr-2" /> Analyze & Tailor Resume
                </Button>
             </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
            {/* Job Match Analysis */}
            {analysisResult && (
            <Card>
                <CardHeader>
                    <CardTitle>Job Match Analysis</CardTitle>
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
                        {analysisResult.metRequirements.map((req, i) => (
                             <div key={`met-${i}`} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>{req}</span>
                             </div>
                        ))}
                         {analysisResult.missingRequirements.map((req, i) => (
                             <div key={`missing-${i}`} className="flex items-center gap-2 text-sm">
                                <XCircle className="h-5 w-5 text-red-500" />
                                <span>{req}</span>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            )}

            {/* Side-by-Side Comparison */}
            {tailoredResult && selectedResumeData && (
            <Card>
                <CardHeader>
                    <CardTitle>Resume Comparison: Original vs Tailored</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 items-start">
                    <div>
                        <Badge variant="secondary" className="mb-2">Original</Badge>
                        <Card className="p-4 bg-background h-96 overflow-y-auto">
                            <h4 className="font-bold">PROFESSIONAL SUMMARY</h4>
                            <p className="text-sm text-muted-foreground mb-4">{selectedResumeData.summary}</p>
                             <h4 className="font-bold">EXPERIENCE</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {selectedResumeData.work.map((job, i) => <li key={i}>{job.description}</li>)}
                            </ul>
                        </Card>
                    </div>
                    <div>
                        <Badge className="mb-2">Tailored</Badge>
                         <Card className="p-4 bg-background h-96 overflow-y-auto border-primary">
                             <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{tailoredResult.tailoredResumeText}</pre>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button onClick={handleSaveAsNew}><Save className="mr-2" /> Save as New Resume</Button>
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

    