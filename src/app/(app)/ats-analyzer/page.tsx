
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, BarChart, CheckCircle, ChevronRight, Download, Edit, FileUp, Lightbulb, RefreshCw, Sparkles, Target, XCircle } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { analyzeJobMatch, AnalyzeJobMatchOutput } from "@/ai/flows/analyze-job-match";
import { extractTextFromFile } from "@/ai/flows/extract-text-from-file";
import { Label } from "@/components/ui/label";

export default function AtsAnalyzerPage() {
    const [analysisResult, setAnalysisResult] = useState<AnalyzeJobMatchOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [fileName, setFileName] = useState('');
    const { toast } = useToast();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = async (e) => {
                const dataUri = e.target?.result as string;
                try {
                    const result = await extractTextFromFile({ fileDataUri: dataUri, mimeType: file.type });
                    setResumeText(result.text);
                    toast({ title: "Success", description: "Resume text extracted." });
                } catch (error) {
                    console.error(error);
                    toast({ variant: "destructive", title: "Error", description: "Failed to extract text from file." });
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!resumeText) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please upload a resume first.' });
            return;
        }
        setIsLoading(true);
        try {
            const result = await analyzeJobMatch({ resumeText, jobDescription });
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error", description: "Failed to analyze resume." });
        } finally {
            setIsLoading(false);
        }
    };
    
    const resetState = () => {
        setAnalysisResult(null);
        setResumeText('');
        setJobDescription('');
        setFileName('');
    };

    const getScoreColor = (score: number) => {
        if (score > 85) return 'text-green-500';
        if (score > 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="container py-10">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline mb-2">ATS Resume Analyzer</h1>
                <p className="text-muted-foreground mb-8">Check your resume's ATS compatibility before you apply.</p>
            </div>
            
            {!analysisResult ? (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Start Your Analysis</CardTitle>
                        <CardDescription>Upload your resume and paste a job description for the most accurate results.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center h-full relative">
                                <FileUp className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {fileName ? `File: ${fileName}` : "Drag & drop or click to browse"}
                                </p>
                                <Button variant="outline" asChild>
                                    <label htmlFor="resume-upload" className="cursor-pointer">
                                        Choose File
                                        <input id="resume-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
                                    </label>
                                </Button>
                                <p className="text-xs text-muted-foreground mt-2">Supports: PDF, DOCX, TXT</p>
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="job-description" className="font-semibold">Job Description (Optional)</Label>
                                <Textarea 
                                    id="job-description" 
                                    placeholder="Paste the job description here..." 
                                    className="h-48"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 text-center">
                        <Button size="lg" onClick={handleAnalyze} disabled={isLoading || !resumeText}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Analyze Resume
                        </Button>
                    </div>
                </Card>
            ) : (
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
                                    <path className={getScoreColor(analysisResult.matchScore)} strokeDasharray={`${analysisResult.matchScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold font-headline">{analysisResult.matchScore}</span>
                                    <span className="text-sm text-muted-foreground">/ 100</span>
                                </div>
                            </div>
                            <p className="text-lg font-semibold mt-4">
                                {analysisResult.matchScore > 85 ? "Excellent!" : analysisResult.matchScore > 70 ? "Good" : "Needs Improvement"}
                            </p>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><XCircle className="text-yellow-500" /> Missing Requirements</h3>
                             <ul className="space-y-2 list-inside">
                                {analysisResult.missingRequirements.length > 0 ? (
                                    analysisResult.missingRequirements.map((item, i) => (
                                        <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                            <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No missing requirements found. Great job!</p>
                                )}
                            </ul>
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 flex justify-center gap-4">
                        <Button variant="outline" onClick={resetState}><RefreshCw className="mr-2"/> Analyze Another</Button>
                    </div>
                </Card>
                </>
            )}
        </div>
    );
}
