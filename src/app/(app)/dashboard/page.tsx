import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold font-headline mb-2">Dashboard</h1>
            <p className="text-muted-foreground mb-8">Welcome back, John! 👋 Ready to optimize your job search?</p>
            
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Dashboard content will be built here.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Quick actions will be built here.</p>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Your Resumes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Resume library will be built here.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
