
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, BookOpen, CheckCircle, Circle, Copy, Eye, FileText, Heart, Lightbulb, MapPin, Milestone, Search, Sparkles, Target, Wallet, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const resumes = [
  { id: '1', name: 'Software Dev Resume', atsScore: 92 },
  { id: '2', name: 'Data Analyst Resume', atsScore: 78 },
  { id: '3', name: 'Product Mgr Resume', atsScore: 85 },
];

const matchBreakdown = [
    { name: 'Skills Match', score: 87, color: 'text-primary' },
    { name: 'Experience Level', score: 92, color: 'text-primary' },
    { name: 'Industry Fit', score: 78, color: 'text-yellow-500' },
    { name: 'Location Match', score: 65, color: 'text-yellow-500' },
    { name: 'Salary Expectation', score: 89, color: 'text-primary' },
];

const requirements = {
    met: [
        '5+ years software development experience',
        'Proficiency in React and JavaScript',
        'Experience with RESTful APIs',
        'Team collaboration and leadership skills',
        'Bachelor\'s degree in Computer Science',
        'Version control (Git) experience',
    ],
    partial: [
        'Docker & Kubernetes (you have Docker only)',
        'Microservices architecture (limited experience)',
    ],
    missing: ['GraphQL experience'],
};

const highPriorityActions = [
    { title: 'Learn GraphQL Basics', details: ['Complete online course (2-3 hours)', 'Build small project with GraphQL', 'Add to resume and LinkedIn'], cta: 'Recommended Courses', icon: <BookOpen /> },
    { title: 'Tailor Resume for This Job', details: ['Add microservices experience', 'Highlight Docker/containerization', 'Emphasize team leadership'], cta: 'Auto-Tailor Resume', icon: <Target /> },
    { title: 'Prepare Application Materials', details: ['Craft compelling cover letter', 'Prepare portfolio showcasing relevant projects', 'Update LinkedIn with matching keywords'], cta: 'Generate Cover Letter', icon: <Sparkles /> },
]

const similarJobs = [
    { title: 'Full Stack Developer', company: 'StartupXYZ', location: 'Remote', salary: '$110k-$140k', match: 92, details: 'React, Node.js, AWS - Perfect skill alignment' },
    { title: 'Senior React Developer', company: 'FinTech Pro', location: 'New York', salary: '$125k-$160k', match: 89, details: 'React, GraphQL, TypeScript - Great growth opportunity' },
    { title: 'Lead Software Engineer', company: 'TechGiant', location: 'Seattle', salary: '$140k-$180k', match: 85, details: 'Leadership role, microservices, cloud architecture' },
]

export default function JobMatcherPage() {
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [selectedResume, setSelectedResume] = useState(resumes[0].id);

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
                        <Textarea id="job-description" placeholder="Paste the job description or job URL here..." className="h-48" />
                    </div>
                     <div className="space-y-2">
                        <label className="font-semibold">Select Resume to Match</label>
                        <div className="flex flex-wrap gap-2">
                            {resumes.map(resume => (
                                <Card 
                                    key={resume.id} 
                                    className={`p-3 cursor-pointer flex items-center gap-3 ${selectedResume === resume.id ? 'border-primary ring-2 ring-primary' : ''}`}
                                    onClick={() => setSelectedResume(resume.id)}
                                >
                                    <FileText className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="font-semibold text-sm">{resume.name}</p>
                                        <p className="text-xs text-muted-foreground">ATS: {resume.atsScore}%</p>
                                    </div>
                                     {selectedResume === resume.id && <CheckCircle className="h-5 w-5 text-primary ml-auto" />}
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                    <Button size="lg" onClick={() => setIsAnalyzed(true)}>
                        <Search className="mr-2"/> Analyze Job Match
                    </Button>
                </div>
            </Card>

            {isAnalyzed && (
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
                                        <path className="text-primary" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold font-headline">85%</span>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold mt-4">Excellent Match!</p>
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <h3 className="font-semibold">Match Breakdown</h3>
                                {matchBreakdown.map(item => (
                                    <div key={item.name} className="flex items-center gap-4">
                                        <span className="w-32 text-muted-foreground text-sm">{item.name}</span>
                                        <Progress value={item.score} className="flex-1" />
                                        <span className={`font-semibold w-12 text-right ${item.color}`}>{item.score}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardContent>
                             <h3 className="font-semibold mb-3">Job Requirements Analysis</h3>
                             <div className="p-4 border rounded-lg space-y-4">
                                <div>
                                    <h4 className="flex items-center gap-2 font-medium text-green-500 mb-2"><CheckCircle /> You Meet ({requirements.met.length}/15)</h4>
                                    <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                        {requirements.met.slice(0,3).map((req, i) => <li key={i}>{req}</li>)}
                                        <p className='text-primary'>+ {requirements.met.length - 3} more...</p>
                                    </ul>
                                </div>
                                <Separator />
                                 <div>
                                    <h4 className="flex items-center gap-2 font-medium text-yellow-500 mb-2"><Circle className="fill-yellow-500/20" /> Partially Meet ({requirements.partial.length})</h4>
                                    <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                        {requirements.partial.map((req, i) => <li key={i}>{req}</li>)}
                                    </ul>
                                </div>
                                <Separator />
                                 <div>
                                    <h4 className="flex items-center gap-2 font-medium text-red-500 mb-2"><XCircle /> Missing ({requirements.missing.length})</h4>
                                     <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                                        {requirements.missing.map((req, i) => <li key={i}>{req}</li>)}
                                    </ul>
                                </div>
                             </div>
                        </CardContent>
                    </Card>

                    {/* Recommended Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recommended Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2"><Lightbulb className="text-accent"/> High Priority (Before Applying)</h3>
                                <div className="space-y-4">
                                {highPriorityActions.map(action => (
                                    <Card key={action.title} className="p-4 flex gap-4 items-start bg-background">
                                        <div className="text-primary mt-1">{action.icon}</div>
                                        <div className="flex-grow">
                                            <h4 className="font-semibold">{action.title}</h4>
                                            <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                                                {action.details.map((detail, i) => <li key={i}>{detail}</li>)}
                                            </ul>
                                        </div>
                                        <Button variant="secondary" size="sm">{action.cta}</Button>
                                    </Card>
                                ))}
                                </div>
                            </div>
                             <Button className="w-full">
                                <Target className="mr-2" /> Apply with Tailored Resume
                            </Button>
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
