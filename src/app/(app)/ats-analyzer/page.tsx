
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, CheckCircle, ChevronRight, Download, Edit, FileUp, Lightbulb, RefreshCw, Sparkles, Target, XCircle } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge";

const scoreBreakdown = [
    { name: "Content Quality", score: 85, color: "hsl(var(--chart-1))" },
    { name: "Keyword Match", score: 92, color: "hsl(var(--chart-2))" },
    { name: "Format & Structure", score: 78, color: "hsl(var(--chart-3))" },
    { name: "ATS Compatibility", score: 89, color: "hsl(var(--chart-4))" },
];

const strengths = [
    "Well-structured sections with clear headings",
    "Good use of action verbs and quantified achievements",
    "Professional email format and contact information",
    "ATS-friendly font and formatting",
];

const improvements = [
    { text: 'Missing keywords: "agile", "CI/CD", "microservices"', priority: "High" },
    { text: "Summary section could be more specific", priority: "Medium" },
    { text: "Add more quantified results in experience", priority: "Medium" },
    { text: "Include relevant certifications section", priority: "Low" },
];

const missingKeywords = {
    High: ["agile", "CI/CD", "microservices"],
    Medium: ["docker", "kubernetes", "scrum"],
    Low: ["jira", "confluence", "git"],
}

const keywordDensity = [
    { name: "React", mentions: 8, optimal: true },
    { name: "JavaScript", mentions: 6, optimal: true },
    { name: "Python", mentions: 4, optimal: false },
]

const recommendedActions = [
    { title: "Add missing keywords to your experience", time: 5, impact: 12, icon: <Sparkles className="h-5 w-5 text-primary" />, cta: "Apply Suggestions" },
    { title: "Enhance your professional summary", time: 10, impact: 8, icon: <Edit className="h-5 w-5 text-primary" />, cta: "Get AI Help" },
    { title: "Add quantified achievements", time: 15, impact: 15, icon: <BarChart className="h-5 w-5 text-primary" />, cta: "See Examples" },
    { title: "Tailor for this specific job", icon: <Target className="h-5 w-5 text-primary" />, cta: "Go to Resume Tailoring Tool" },
]


export default function AtsAnalyzerPage() {
    const [isAnalyzed, setIsAnalyzed] = useState(false);

    return (
        <div className="container py-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline mb-2">ATS Resume Analyzer</h1>
                <p className="text-muted-foreground mb-8">Check your resume's ATS compatibility before you apply.</p>
            </div>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Start Your Analysis</CardTitle>
                    <CardDescription>Upload your resume and paste a job description for the most accurate results.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center h-full">
                            <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                            <p className="text-muted-foreground text-sm mb-4">Drag & drop or click to browse</p>
                            <Button variant="outline">Choose File</Button>
                            <p className="text-xs text-muted-foreground mt-2">Supports: PDF, DOCX, TXT</p>
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="job-description" className="font-semibold">Job Description (Optional)</Label>
                            <Textarea id="job-description" placeholder="Paste the job description here..." className="h-48" />
                        </div>
                    </div>
                </CardContent>
                <div className="p-6 pt-0 text-center">
                    <Button size="lg" onClick={() => setIsAnalyzed(true)}>Analyze Resume</Button>
                </div>
            </Card>

            {isAnalyzed && (
                 <>
                 {/* Analysis Results */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-card-foreground/5 rounded-lg">
                             <div className="relative h-32 w-32">
                                <svg className="h-full w-full" viewBox="0 0 36 36">
                                    <path className="text-muted" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                    <path className="text-primary" strokeDasharray="87, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold font-headline">87</span>
                                    <span className="text-sm text-muted-foreground">/ 100</span>
                                </div>
                            </div>
                            <p className="text-lg font-semibold mt-4">Excellent!</p>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="font-semibold">Score Breakdown</h3>
                            {scoreBreakdown.map((item) => (
                                <div key={item.name}>
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="text-muted-foreground">{item.name}</span>
                                        <span className="font-semibold">{item.score}%</span>
                                    </div>
                                    <Progress value={item.score} />
                                </div>
                            ))}
                            <div className="text-sm text-center text-muted-foreground pt-2">
                                🏆 Industry Average: 72% - You're in the top 15%!
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Detailed Feedback */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Detailed Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle className="text-green-500" /> Strengths</h3>
                            <ul className="space-y-2 list-inside">
                                {strengths.map((item, i) => <li key={i} className="text-muted-foreground text-sm flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><XCircle className="text-yellow-500" /> Areas for Improvement</h3>
                             <ul className="space-y-2 list-inside">
                                {improvements.map((item, i) => (
                                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                        <span>{item.text} <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'secondary' : 'outline'}>{item.priority}</Badge></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                             <h3 className="font-semibold mb-3">Missing Keywords</h3>
                             <Card className="p-4 bg-background">
                                {Object.entries(missingKeywords).map(([priority, keywords]) => (
                                    <div key={priority} className="mb-2 last:mb-0">
                                        <span className="text-sm font-semibold mr-2">{priority} Priority:</span>
                                        {keywords.map(kw => <Badge key={kw} variant="outline" className="mr-1 mb-1">{kw}</Badge>)}
                                    </div>
                                ))}
                             </Card>
                        </div>
                         <div className="md:col-span-2">
                             <h3 className="font-semibold mb-3">Keyword Density</h3>
                             <ResponsiveContainer width="100%" height={200}>
                                <RechartsBarChart data={keywordDensity} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" width={100} tickLine={false} axisLine={false} />
                                    <Bar dataKey="mentions" barSize={20} radius={[0, 4, 4, 0]}>
                                        {keywordDensity.map((entry, index) => (
                                            <div key={`cell-${index}`} style={{ backgroundColor: entry.optimal ? 'hsl(var(--primary))' : 'hsl(var(--muted))' }} />
                                        ))}
                                    </Bar>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 flex justify-center gap-4">
                        <Button><Download className="mr-2"/> Download Detailed Report</Button>
                        <Button variant="outline" onClick={() => setIsAnalyzed(false)}><RefreshCw className="mr-2"/> Analyze Another</Button>
                    </div>
                </Card>

                {/* Recommended Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb /> Recommended Actions</CardTitle>
                        <CardDescription>Follow these steps to significantly improve your resume's score and effectiveness.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recommendedActions.map((action, i) => (
                             <Card key={i} className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                                {action.icon}
                                <div className="flex-grow">
                                    <h4 className="font-semibold">{action.title}</h4>
                                    {action.time && (
                                        <p className="text-sm text-muted-foreground">
                                            Estimated time: {action.time} minutes | Impact: +{action.impact} ATS points
                                        </p>
                                    )}
                                </div>
                                <Button variant="secondary" size="sm">{action.cta}</Button>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
                </>
            )}
        </div>
    );
}

