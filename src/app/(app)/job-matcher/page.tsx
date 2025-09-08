import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobMatcherPage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold font-headline mb-8">Smart Job Matcher</h1>
             <Card>
                <CardHeader>
                    <CardTitle>Job Match Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Job Matcher content will be built here.</p>
                </CardContent>
            </Card>
        </div>
    );
}