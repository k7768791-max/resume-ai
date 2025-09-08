import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, CheckCircle, Lightbulb, Send, Sparkles, XCircle } from "lucide-react";

const suggestions = [
    { text: 'Add quantified achievements', icon: <Lightbulb className="h-4 w-4 text-yellow-400" /> },
    { text: 'Include metrics in bullet points', icon: <Lightbulb className="h-4 w-4 text-yellow-400" /> },
    { text: 'Add relevant keywords for ATS', icon: <Lightbulb className="h-4 w-4 text-yellow-400" /> },
    { text: 'Improve summary readability', icon: <Lightbulb className="h-4 w-4 text-yellow-400" /> },
];

const atsFeedback = [
    { text: 'Good formatting', icon: <CheckCircle className="h-4 w-4 text-green-500" />, type: 'success' },
    { text: 'Missing keywords: "agile", "CI/CD"', icon: <XCircle className="h-4 w-4 text-yellow-500" />, type: 'warning' },
    { text: 'Summary too generic', icon: <XCircle className="h-4 w-4 text-red-500" />, type: 'error' },
];

const quickFixes = [
    'Add missing keywords',
    'Improve bullet point structure',
    'Enhance action verbs',
];

export function AiAssistant() {
    return (
        <div className="h-full space-y-6">
            <h2 className="text-xl font-headline font-bold flex items-center gap-2"><Bot /> AI Resume Assistant</h2>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Smart Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-background rounded-md">
                            {suggestion.icon}
                            <span>{suggestion.text}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Content Optimizer</CardTitle>
                    <CardDescription>Current Section: Professional Summary</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline"><Sparkles className="mr-2 h-4 w-4" /> Optimize</Button>
                    <Button variant="outline">Generate New</Button>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                        <span>ATS Score</span> 
                        <Badge variant="secondary" className="text-lg">87/100</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                     {atsFeedback.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-background rounded-md">
                            {item.icon}
                            <span>{item.text}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Quick Fixes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {quickFixes.map((fix, index) => (
                        <Button key={index} variant="link" className="p-0 h-auto text-sm text-primary">
                           {fix}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            <div>
                <Label className="font-semibold">AI Chat</Label>
                <div className="relative mt-2">
                    <Input placeholder="Ask me anything about your resume..." className="pr-10" />
                    <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
