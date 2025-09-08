import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold font-headline mb-8">User Profile</h1>
             <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>User profile and settings tabs will be built here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
