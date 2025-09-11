
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Loader2, Sparkles, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { db } from '@/lib/firebase-db';
import { collection, getDocs } from 'firebase/firestore';
import type { ResumeData } from '@/types/resume';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import { Label } from '@/components/ui/label';

interface ResumeRecord {
  id: string;
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

export default function CoverLetterPage() {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [tone, setTone] = useState('formal');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedLetter, setGeneratedLetter] = useState('');
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

    const handleGenerate = async () => {
        if (!selectedResumeId || !jobDescription) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a resume and paste a job description.' });
            return;
        }

        const selectedResume = resumes.find(r => r.id === selectedResumeId);
        if (!selectedResume) {
            toast({ variant: 'destructive', title: 'Error', description: 'Could not find selected resume.' });
            return;
        }

        setIsLoading(true);
        setGeneratedLetter('');
        try {
            const result = await generateCoverLetter({
                resume: selectedResume.text,
                jobDescription,
                tone,
            });
            setGeneratedLetter(result.coverLetter);
            toast({ title: 'Success', description: 'Cover letter generated successfully!' });
        } catch (error) {
            console.error("Error generating cover letter:", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate cover letter.' });
        } finally {
            setIsLoading(false);
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
                        <CardTitle>Step 1: Provide Details</CardTitle>
                        <CardDescription>Select a resume, paste the job description, and choose a tone.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Select Resume</Label>
                            <Select value={selectedResumeId || ''} onValueChange={setSelectedResumeId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a resume..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {resumes.map(resume => (
                                        <SelectItem key={resume.id} value={resume.id}>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                {resume.id}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Job Description</Label>
                            <Textarea
                                placeholder="Paste the job description here..."
                                rows={12}
                                value={jobDescription}
                                onChange={e => setJobDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Tone</Label>
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
                        <Button size="lg" className="w-full" onClick={handleGenerate} disabled={isLoading || !selectedResumeId || !jobDescription}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Sparkles className="mr-2" /> Generate Cover Letter
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="lg:sticky lg:top-8">
                    <CardHeader>
                        <CardTitle>Step 2: Your Generated Cover Letter</CardTitle>
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
