import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AtsAnalyzerPage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold font-headline mb-8">ATS Resume Analyzer</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>ATS Analyzer content will be built here.</p>
                </CardContent>
            </Card>
        </div>
    );
}