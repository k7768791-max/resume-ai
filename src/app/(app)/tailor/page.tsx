'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CheckCircle, Circle, Copy, Eye, FileText, RefreshCw, Save, Sparkles, Target, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const resumes = [
  { id: '1', name: 'Software Dev Resume', atsScore: 92 },
  { id: '2', name: 'Data Analyst Resume', atsScore: 78 },
  { id: '3', name: 'Product Mgr Resume', atsScore: 85 },
];

const requirements = [
    { text: 'React Development (5+ years)', met: true },
    { text: 'Node.js Backend (3+ years)', met: true },
    { text: 'Microservices Architecture', met: 'partial' },
    { text: 'Docker & Kubernetes', met: false },
    { text: 'Team Leadership', met: true },
    { text: 'Agile/Scrum Experience', met: 'partial' },
];

const suggestions = [
    { impact: 'High', section: 'Professional Summary', action: 'ADD', content: '"microservices", "agile", "team leadership"' },
    { impact: 'High', section: 'Work Experience', action: 'MODIFY', content: '"Led development teams" → "Led agile development teams using Scrum methodology"' },
    { impact: 'Medium', section: 'Skills Section', action: 'ADD', content: 'Docker, Kubernetes, CI/CD, Scrum' },
]

export default function TailorPage() {
  const [selectedResume, setSelectedResume] = useState<string | null>(resumes[0].id);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

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
                         <Card key={resume.id} className={`p-4 cursor-pointer ${selectedResume === resume.id ? 'border-primary ring-2 ring-primary' : ''}`} onClick={() => setSelectedResume(resume.id)}>
                            <div className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-semibold">{resume.name}</p>
                                    <p className="text-sm text-muted-foreground">ATS Score: {resume.atsScore}%</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="font-semibold mb-2">Step 2: Add Job Description</h3>
                <Textarea placeholder="Paste the complete job description here..." rows={12} />
             </div>
             <div className="text-center">
                <Button size="lg" onClick={() => setIsAnalyzed(true)} disabled={!selectedResume}>
                    <Target className="mr-2" /> Analyze & Tailor Resume
                </Button>
             </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
            {/* Job Match Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>Job Match Analysis</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-card-foreground/5 rounded-lg">
                        <div className="relative h-32 w-32">
                        <svg className="h-full w-full" viewBox="0 0 36 36">
                            <path className="text-muted" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className="text-primary" strokeDasharray="78, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold font-headline">78%</span>
                        </div>
                        </div>
                        <p className="text-lg font-semibold mt-4">Good Match!</p>
                    </div>
                    <div className="md:col-span-2 space-y-3">
                        <h3 className="font-semibold">Key Requirements</h3>
                        {requirements.map((req, i) => (
                             <div key={i} className="flex items-center gap-2 text-sm">
                                {req.met === true && <CheckCircle className="h-5 w-5 text-green-500" />}
                                {req.met === 'partial' && <Circle className="h-5 w-5 text-yellow-500 fill-yellow-500/20" />}
                                {req.met === false && <XCircle className="h-5 w-5 text-red-500" />}
                                <span>{req.text}</span>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Side-by-Side Comparison */}
            <Card>
                <CardHeader>
                    <CardTitle>Resume Comparison: Original vs Tailored</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6 items-start">
                    <div>
                        <Badge variant="secondary" className="mb-2">Original</Badge>
                        <Card className="p-4 bg-background h-96 overflow-y-auto">
                            <h4 className="font-bold">PROFESSIONAL SUMMARY</h4>
                            <p className="text-sm text-muted-foreground mb-4">Software developer with 5 years of experience building web applications.</p>
                             <h4 className="font-bold">EXPERIENCE</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li>Built React apps</li>
                                <li>Worked with APIs</li>
                                <li>Led development teams</li>
                            </ul>
                        </Card>
                    </div>
                    <div>
                        <Badge className="mb-2">Tailored</Badge>
                         <Card className="p-4 bg-background h-96 overflow-y-auto border-primary">
                             <h4 className="font-bold">PROFESSIONAL SUMMARY</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                                <span className="bg-primary/20 rounded">Senior Software Engineer</span> with 5+ years developing scalable web applications using <span className="bg-primary/20 rounded">React, Node.js, and microservices architecture</span>. Proven <span className="bg-primary/20 rounded">team leadership</span> in <span className="bg-primary/20 rounded">agile environments</span>.
                            </p>
                             <h4 className="font-bold">EXPERIENCE</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                <li><span className="bg-primary/20 rounded">Architected microservices using React & Node.js</span></li>
                                <li><span className="bg-primary/20 rounded">Led agile development teams of 5+ engineers</span></li>
                                <li><span className="bg-primary/20 rounded">Implemented CI/CD pipelines with Docker containers</span></li>
                            </ul>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button><RefreshCw className="mr-2" /> Apply Changes</Button>
                    <Button variant="secondary"><Save className="mr-2" /> Save as New Resume</Button>
                    <Button variant="outline"><Eye className="mr-2" /> Preview Tailored</Button>
                </CardFooter>
            </Card>

            {/* Suggested Improvements */}
            <Card>
                <CardHeader>
                    <CardTitle>Tailoring Suggestions</CardTitle>
                    <CardDescription>
                        Estimated ATS Score Improvement: <span className="text-green-500 font-bold">+19 points (78% → 97%)</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Sparkles className="text-accent" /> High Impact Changes</h3>
                         <div className="space-y-4">
                            {suggestions.filter(s => s.impact === 'High').map((s, i) => (
                                <Card key={i} className="p-4 bg-background">
                                    <p className="font-semibold text-sm">{s.section}</p>
                                    <p className="text-muted-foreground text-sm my-2">
                                        <span className="font-semibold">{s.action}:</span> {s.content}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" variant="secondary">Apply</Button>
                                        <Button size="sm" variant="ghost">Edit Manually</Button>
                                        <Button size="sm" variant="ghost">Skip</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Sparkles className="text-primary" /> Medium Impact Changes</h3>
                        <div className="space-y-4">
                           {suggestions.filter(s => s.impact === 'Medium').map((s, i) => (
                                <Card key={i} className="p-4 bg-background">
                                    <p className="font-semibold text-sm">{s.section}</p>
                                    <p className="text-muted-foreground text-sm my-2">
                                        <span className="font-semibold">{s.action}:</span> {s.content}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" variant="secondary">Apply All</Button>
                                        <Button size="sm" variant="ghost">Customize</Button>
                                        <Button size="sm" variant="ghost">Skip</Button>
                                    </div>
                                </Card>
                           ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button size="lg" onClick={() => setIsAnalyzed(false)}>
                        <ArrowRight className="mr-2" /> Start a New Analysis
                    </Button>
                </CardFooter>
            </Card>
        </div>
      )}
    </div>
  );
}
