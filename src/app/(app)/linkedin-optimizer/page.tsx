
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, Clipboard, Copy, Edit, FileText, Lightbulb, Linkedin, RefreshCw, Sparkles, Target, Upload, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const resumes = [
  { id: '1', name: 'Software Developer Resume' },
  { id: '2', name: 'Data Analyst Resume' },
  { id: '3', name: 'Product Manager Resume' },
];

const headlineSuggestions = [
    'Senior Full-Stack Developer | React & Node.js Expert',
    'Software Engineer | Building Scalable Web Solutions',
    'Full-Stack Developer | 5+ Years in FinTech',
];

const aboutText = "I'm a passionate software developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and modern JavaScript frameworks.\n\n🚀 What I bring to the table:\n• Full-stack development expertise\n• Team leadership and mentoring\n• Agile development methodologies\n• Problem-solving and innovation\n\n💡 Always excited about new technologies and collaboration opportunities!\n\n📧 Let's connect: john@example.com";

const currentSkills = ['React', 'JavaScript', 'Node.js', 'Python'];
const suggestedSkills = ['TypeScript', 'AWS', 'MongoDB', 'Docker', 'GraphQL', 'Redux', 'Express.js', 'Git'];

const skillPriorities = {
    'High Demand': ['TypeScript', 'AWS', 'Docker'],
    'Growing': ['GraphQL', 'Kubernetes', 'Next.js'],
    'Established': ['React', 'Node.js', 'JavaScript'],
};

const marketTrends = [
    { name: 'Cloud Computing (AWS/Azure)', demand: 'High demand', icon: '🔥' },
    { name: 'DevOps & CI/CD', demand: 'Growing 23%', icon: '📈' },
    { name: 'Microservices Architecture', demand: 'High salary', icon: '💰' },
    { name: 'Machine Learning/AI', demand: 'Emerging', icon: '🚀' },
];

export default function LinkedInOptimizerPage() {
    const [selectedResume, setSelectedResume] = useState(resumes[0].id);

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
                <CardContent className="space-y-2">
                    {resumes.map(resume => (
                        <Card 
                            key={resume.id} 
                            className={`p-4 cursor-pointer flex justify-between items-center ${selectedResume === resume.id ? 'border-primary ring-2 ring-primary' : ''}`}
                            onClick={() => setSelectedResume(resume.id)}
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-primary" />
                                <p className="font-semibold">{resume.name}</p>
                            </div>
                            {selectedResume === resume.id ? (
                                <Badge><CheckCircle className="mr-2 h-4 w-4" /> Selected</Badge>
                            ) : (
                                <Button variant="outline" size="sm">Select</Button>
                            )}
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Linkedin /> LinkedIn Profile Sections</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Professional Headline */}
                            <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">Professional Headline</h3>
                                <p className="text-sm text-muted-foreground mb-4">Current: Software Developer</p>
                                <Separator className="mb-4" />
                                <h4 className="text-sm font-semibold mb-2">AI Suggestions:</h4>
                                <div className="space-y-2">
                                    {headlineSuggestions.map((suggestion, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-md text-sm">
                                            <span className="flex-grow">✨ {suggestion}</span>
                                            <div className="flex gap-1">
                                               <Button variant="ghost" size="sm">Use</Button>
                                               <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="link" className="p-0 h-auto mt-2">Generate More</Button>
                            </Card>

                            {/* About Section */}
                            <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">About Section</h3>
                                <Textarea value={aboutText} rows={12} readOnly />
                                <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                                    <span>Character count: {aboutText.length}/2600</span>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm"><RefreshCw className="mr-2" /> Regenerate</Button>
                                        <Button variant="secondary" size="sm"><Copy className="mr-2" /> Copy</Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Skills Optimization */}
                            <Card className="p-4 bg-background">
                                <h3 className="font-semibold mb-2">Skills Optimization</h3>
                                <p className="text-sm text-muted-foreground mb-2">Current Skills: {currentSkills.join(', ')}</p>
                                <Separator className="my-4" />
                                <h4 className="text-sm font-semibold mb-2">Suggested Additions:</h4>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {suggestedSkills.map(skill => <Button key={skill} variant="outline" size="sm">+ {skill}</Button>)}
                                </div>
                                 <h4 className="text-sm font-semibold mb-2">Skills Priority (based on your industry):</h4>
                                 <div className="space-y-2">
                                     {Object.entries(skillPriorities).map(([priority, skills]) => (
                                         <div key={priority} className="flex items-start gap-2">
                                            <span className="font-semibold text-sm w-28">{priority}:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                            </div>
                                         </div>
                                     ))}
                                 </div>
                            </Card>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8 lg:sticky lg:top-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target /> Industry Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <p className="text-muted-foreground">Profile Optimization Score</p>
                                <p className="text-5xl font-bold font-headline">87<span className="text-3xl text-muted-foreground">/100</span></p>
                                <Progress value={87} className="mt-2" />
                            </div>
                             <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle className="text-green-500"/> Strengths</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    <li>Professional headline with keywords</li>
                                    <li>Detailed about section</li>
                                    <li>Relevant skills listed</li>
                                </ul>
                             </div>
                             <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2"><XCircle className="text-yellow-500"/> Areas for Improvement</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    <li>Add industry certifications</li>
                                    <li>Include media/portfolio links</li>
                                    <li>Add call-to-action in about section</li>
                                </ul>
                             </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Export Your LinkedIn Content</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-4">
                            <Button className="w-full justify-between">
                                Copy Headline <Copy />
                            </Button>
                             <Button className="w-full justify-between">
                                Copy About Section <Copy />
                            </Button>
                             <Button className="w-full justify-between">
                                Copy All Skills <Copy />
                            </Button>
                         </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
