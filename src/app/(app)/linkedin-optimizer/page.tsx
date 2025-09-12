
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, Clipboard, Copy, Edit, FileText, Lightbulb, Linkedin, RefreshCw, Sparkles, Target, Upload, XCircle, Loader2, FileUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase-db';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { ResumeData } from '@/types/resume';
import { generateLinkedInSummary } from '@/ai/flows/generate-linkedin-summary';
import { recommendSkillsForLinkedIn } from '@/ai/flows/recommend-skills-for-linkedin';
import { getResumeText } from '@/lib/get-resume-text';
import { extractTextFromFile } from '@/ai/flows/extract-text-from-file';

interface ResumeRecord {
  id: string;
  text: string;
}

export default function LinkedInOptimizerPage() {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [selectedResumeText, setSelectedResumeText] = useState<string | null>(null);
    const [selectedSource, setSelectedSource] = useState<string | null>(null);
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSummary, setGeneratedSummary] = useState('');
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [recommendedSkills, setRecommendedSkills] = useState<string[]>([]);
    const [userProfile, setUserProfile] = useState<{ industry?: string; experienceLevel?: string }>({});
    const { toast } = useToast();
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchResumes(currentUser.uid);
                fetchUserProfile(currentUser.uid);
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
                setSelectedSource(fetchedResumes[0].id);
                setSelectedResumeText(fetchedResumes[0].text);
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch your resumes.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const fetchUserProfile = async (uid: string) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserProfile(docSnap.data());
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

    const handleGenerate = async () => {
        if (!selectedResumeText) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select or upload a resume.' });
            return;
        }
        
        setIsGenerating(true);
        try {
            // Placeholder for a more complex AI flow that generates all parts
            const [summaryResult, skillsResult] = await Promise.all([
                generateLinkedInSummary({ resumeText: selectedResumeText }),
                userProfile.industry && userProfile.experienceLevel 
                    ? recommendSkillsForLinkedIn({ industry: userProfile.industry, experienceLevel: userProfile.experienceLevel })
                    : Promise.resolve({ recommendedSkills: [] })
            ]);

            setGeneratedSummary(summaryResult.linkedinSummary);
            setGeneratedTitle(`Experienced Software Developer | React, Node.js, TypeScript`); // Placeholder
            setRecommendedSkills(skillsResult.recommendedSkills);
            toast({ title: 'Success', description: 'LinkedIn content generated!' });

        } catch (error) {
            console.error("Error generating content:", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate LinkedIn content.' });
        } finally {
            setIsGenerating(false);
        }
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: "Content copied to clipboard." });
    };

    return (
        <div className="container py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline mb-2">LinkedIn Profile Optimizer</h1>
                <p className="text-muted-foreground">Transform your resume into a compelling LinkedIn profile.</p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Choose Source Resume</CardTitle>
                    <CardDescription>Select a saved resume or upload a new one to generate your LinkedIn content.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-4 border-2 border-dashed rounded-lg text-center">
                            <FileUp className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
                            <Button variant="outline" asChild><label className="cursor-pointer">Upload Resume<input type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.txt" /></label></Button>
                            {fileName && <p className="text-sm text-green-500 mt-2">Uploaded: {fileName}</p>}
                            <p className="text-xs text-muted-foreground mt-1">Supports: DOCX, TXT</p>
                        </div>
                         <div className="space-y-2">
                             <h4 className="font-semibold text-center mb-2">Or Select a Saved Resume</h4>
                            {isLoading && <Loader2 className="h-6 w-6 animate-spin mx-auto" />}
                            {resumes.map(resume => (
                                <Card key={resume.id} onClick={() => handleSelectResume(resume.id)} className={`p-3 cursor-pointer flex justify-between items-center transition-colors ${selectedSource === resume.id ? 'border-primary ring-2 ring-primary' : 'hover:bg-muted/50'}`}>
                                    <div className="flex items-center gap-3"><FileText className="h-6 w-6 text-primary" /><p className="font-semibold">{resume.id}</p></div>
                                    {selectedSource === resume.id && <CheckCircle className="h-5 w-5 text-green-500" />}
                                </Card>
                            ))}
                            {resumes.length === 0 && !isLoading && <p className="text-sm text-muted-foreground text-center">No saved resumes found.</p>}
                        </div>
                    </div>
                     <div className="text-center pt-4">
                         <Button size="lg" onClick={handleGenerate} disabled={isGenerating || !selectedResumeText}>
                            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Sparkles className="mr-2" /> Generate LinkedIn Content
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {(generatedSummary || recommendedSkills.length > 0) && (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Linkedin /> Generated LinkedIn Sections</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            
                             <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">Generated Headline</h3>
                                <Textarea value={generatedTitle} rows={2} readOnly />
                                <div className="flex justify-end items-center mt-2">
                                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(generatedTitle)}><Copy className="mr-2" /> Copy</Button>
                                </div>
                            </Card>

                            <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">Generated "About" Section</h3>
                                <Textarea value={generatedSummary} rows={12} readOnly />
                                <div className="flex justify-end items-center mt-2">
                                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(generatedSummary)}><Copy className="mr-2" /> Copy</Button>
                                </div>
                            </Card>

                            <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">Skills Recommendations</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Based on your profile's industry ({userProfile.industry || 'N/A'}) and experience ({userProfile.experienceLevel || 'N/A'}).
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {recommendedSkills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                                </div>
                                <div className="flex justify-end items-center mt-2">
                                     <Button variant="secondary" size="sm" onClick={() => copyToClipboard(recommendedSkills.join(', '))}><Copy className="mr-2" /> Copy Skills</Button>
                                </div>
                            </Card>
                        </CardContent>
                    </Card>
                </div>

                 <div className="space-y-8 lg:sticky lg:top-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target /> Quick Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">These AI-powered suggestions are designed to boost your profile's visibility to recruiters on LinkedIn.</p>
                             <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                <Lightbulb className="h-5 w-5 text-yellow-400 mt-1 shrink-0" />
                                <p className="text-sm">
                                    <strong>Tip:</strong> After adding these to your profile, ask connections to endorse your new skills to increase their weight in recruiter searches.
                                </p>
                             </div>
                             <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                <Lightbulb className="h-5 w-5 text-yellow-400 mt-1 shrink-0" />
                                <p className="text-sm">
                                    <strong>Next Step:</strong> Consider creating a custom headline that incorporates some of the top recommended skills to grab immediate attention.
                                </p>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            )}
        </div>
    );
}

    