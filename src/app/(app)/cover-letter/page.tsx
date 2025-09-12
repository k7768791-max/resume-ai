
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Loader2, Sparkles, Copy, FileUp, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase-db';
import { collection, getDocs } from 'firebase/firestore';
import type { ResumeData } from '@/types/resume';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import { extractTextFromFile } from "@/ai/flows/extract-text-from-file";
import { Label } from '@/components/ui/label';
import { getResumeText } from '@/lib/get-resume-text';


interface ResumeRecord {
  id: string;
  text: string;
}


export default function CoverLetterPage() {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [selectedResumeText, setSelectedResumeText] = useState<string | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [tone, setTone] = useState('formal');
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [fileName, setFileName] = useState('');
    const { toast } = useToast();
    
    // Tracks which resume is selected, either by ID from Firebase or 'uploaded'
    const [selectedSource, setSelectedSource] = useState<string | null>(null);

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
                return { id: doc.id, text: getResumeText(data) };
            });
            setResumes(fetchedResumes);
            if (fetchedResumes.length > 0) {
                // Pre-select the first resume
                setSelectedSource(fetchedResumes[0].id);
                setSelectedResumeText(fetchedResumes[0].text);
            }
        } catch (error) {
            console.error("Error fetching resumes: ", error);
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

    const handleGenerate = async () => {
        if (!selectedResumeText || !jobDescription) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a resume and paste a job description.' });
            return;
        }

        setIsGenerating(true);
        setGeneratedLetter('');
        try {
            const result = await generateCoverLetter({
                resume: selectedResumeText,
                jobDescription,
                tone,
            });
            setGeneratedLetter(result.coverLetter);
            toast({ title: 'Success', description: 'Cover letter generated successfully!' });
        } catch (error) {
            console.error("Error generating cover letter:", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate cover letter.' });
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: "Cover letter copied to clipboard." });
    };

    return (
        <div className="container py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline mb-2">AI Cover Letter Generator</h1>
                <p className="text-muted-foreground">Create a tailored cover letter in seconds.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle>Provide Details</CardTitle>
                        <CardDescription>Select a resume, paste the job description, and choose a tone.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Step 1: Choose Resume</Label>
                            <div className="p-4 border-2 border-dashed rounded-lg text-center">
                                <FileUp className="h-8 w-8 text-muted-foreground mb-2 mx-auto" />
                                <Button variant="outline" asChild>
                                    <label className="cursor-pointer">
                                        Upload New Resume
                                        <input type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.txt,.pdf" />
                                    </label>
                                </Button>
                                {fileName && <p className="text-sm text-green-500 mt-2">Uploaded: {fileName}</p>}
                                <p className="text-xs text-muted-foreground mt-1">Supports: DOCX, PDF, TXT</p>
                            </div>
                             <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
                            </div>
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

                        <div>
                            <Label>Step 2: Job Description</Label>
                            <Textarea
                                placeholder="Paste the job description here..."
                                rows={10}
                                value={jobDescription}
                                onChange={e => setJobDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Step 3: Tone</Label>
                            <Select value={tone} onValueChange={setTone}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="formal">Formal</SelectItem>
                                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                                    <SelectItem value="informal">Informal</SelectItem>
                                    <SelectItem value="creative">Creative</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full" onClick={handleGenerate} disabled={isGenerating || isLoading || !selectedResumeText || !jobDescription}>
                            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Sparkles className="mr-2" /> Generate Cover Letter
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="lg:sticky lg:top-8">
                    <CardHeader>
                        <CardTitle>Your Generated Cover Letter</CardTitle>
                        <CardDescription>Review the generated letter. You can copy it or regenerate if needed.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={generatedLetter}
                            readOnly
                            rows={20}
                            placeholder="Your generated cover letter will appear here..."
                        />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="secondary" onClick={() => copyToClipboard(generatedLetter)} disabled={!generatedLetter}>
                            <Copy className="mr-2" /> Copy to Clipboard
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
