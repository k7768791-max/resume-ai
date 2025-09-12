
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, Clipboard, Copy, Edit, FileText, Lightbulb, Linkedin, RefreshCw, Sparkles, Target, Upload, XCircle, Loader2 } from 'lucide-react';
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

interface ResumeRecord {
  id: string;
  text: string;
}

const getResumeText = (resumeData: ResumeData) => {
    // This function now handles potentially undefined fields gracefully.
    const sections = [
        resumeData.summary,
        ...(resumeData.skills?.technical || []),
        ...(resumeData.skills?.soft || []),
        ...resumeData.work.map(w => `${w.title} at ${w.company}: ${w.description}`),
        ...resumeData.projects.map(p => `${p.name}: ${p.description}`),
        ...resumeData.education.map(e => `${e.degree} from ${e.school}`),
        ...(resumeData.certifications || []),
        ...(resumeData.extras?.awards || []),
        ...(resumeData.extras?.interests || []),
        ...(resumeData.extras?.languages || []),
    ];
    return sections.filter(Boolean).join('\n\n');
}

export default function LinkedInOptimizerPage() {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<ResumeRecord[]>([]);
    const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSummary, setGeneratedSummary] = useState('');
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
    
    const fetchUserProfile = async (uid: string) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserProfile(docSnap.data());
        }
    };

    const handleGenerate = async () => {
        if (!selectedResumeId) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a resume.' });
            return;
        }
        
        const selectedResume = resumes.find(r => r.id === selectedResumeId);
        if (!selectedResume) {
             toast({ variant: 'destructive', title: 'Error', description: 'Could not find selected resume.'});
            return;
        }

        setIsGenerating(true);
        try {
            const [summaryResult, skillsResult] = await Promise.all([
                generateLinkedInSummary({ resumeText: selectedResume.text }),
                userProfile.industry && userProfile.experienceLevel 
                    ? recommendSkillsForLinkedIn({ industry: userProfile.industry, experienceLevel: userProfile.experienceLevel })
                    : Promise.resolve({ recommendedSkills: [] })
            ]);

            setGeneratedSummary(summaryResult.linkedinSummary);
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
                    <CardTitle>Step 1: Choose Source Resume</CardTitle>
                    <CardDescription>Select the resume you want to use as a base for your LinkedIn profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isLoading && <Loader2 className="h-6 w-6 animate-spin" />}
                        {resumes.map(resume => (
                            <Card 
                                key={resume.id} 
                                className={`p-4 cursor-pointer flex justify-between items-center ${selectedResumeId === resume.id ? 'border-primary ring-2 ring-primary' : ''}`}
                                onClick={() => setSelectedResumeId(resume.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="h-6 w-6 text-primary" />
                                    <p className="font-semibold">{resume.id}</p>
                                </div>
                                {selectedResumeId === resume.id && <CheckCircle className="h-5 w-5 text-green-500" />}
                            </Card>
                        ))}
                         {resumes.length === 0 && !isLoading && <p className="text-sm text-muted-foreground">No resumes found.</p>}
                    </div>
                     <div className="text-center pt-4">
                         <Button size="lg" onClick={handleGenerate} disabled={isGenerating || !selectedResumeId}>
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
                            {/* About Section */}
                            <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">Generated "About" Section</h3>
                                <Textarea value={generatedSummary} rows={12} readOnly />
                                <div className="flex justify-end items-center mt-2">
                                    <Button variant="secondary" size="sm" onClick={() => copyToClipboard(generatedSummary)}>
                                        <Copy className="mr-2" /> Copy Section
                                    </Button>
                                </div>
                            </Card>

                            {/* Skills Optimization */}
                            <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">Skills Recommendations</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Based on your profile's industry ({userProfile.industry || 'N/A'}) and experience ({userProfile.experienceLevel || 'N/A'}).
                                </p>
                                <Separator className="my-4" />
                                <h4 className="text-sm font-semibold mb-2">Suggested Skills to Add:</h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {recommendedSkills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                                </div>
                                <div className="flex justify-end items-center mt-2">
                                     <Button variant="secondary" size="sm" onClick={() => copyToClipboard(recommendedSkills.join(', '))}>
                                        <Copy className="mr-2" /> Copy Skills
                                    </Button>
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

    