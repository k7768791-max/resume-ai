
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookUser, CreditCard, Edit, Settings, Shield, UserCog, Loader2, Download, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "lucide-react";
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

// Static data that was previously in the component
const usageStats = [
    { name: 'ATS Analyses', value: 47, max: 100, color: 'bg-primary' },
    { name: 'Resume Exports', value: 23, max: Infinity, color: 'bg-accent' },
    { name: 'AI Optimizations', value: 34, max: Infinity, color: 'bg-primary' },
];

const billingHistory = [
    { date: 'Feb 15, 2024', plan: 'Premium Plan', amount: '$9.99' },
    { date: 'Jan 15, 2024', plan: 'Premium Plan', amount: '$9.99' },
    { date: 'Dec 15, 2023', plan: 'Premium Plan', amount: '$9.99' },
];


interface UserProfile {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    industry: string;
    experienceLevel: string;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchProfile(currentUser.uid);
            } else {
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchProfile = async (uid: string) => {
        setIsLoading(true);
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data() as UserProfile);
            } else {
                // If no profile, create a default one
                const defaultProfile: UserProfile = {
                    fullName: user?.displayName || 'New User',
                    email: user?.email || '',
                    phone: '', location: '', linkedin: '', github: '',
                    industry: 'software-development',
                    experienceLevel: 'mid'
                };
                setProfile(defaultProfile);
            }
        } catch (error) {
            console.error("Error fetching profile: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch profile.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof UserProfile, value: string) => {
        if (profile) {
            setProfile({ ...profile, [field]: value });
        }
    };

    const handleSave = async () => {
        if (!user || !profile) return;
        setIsSaving(true);
        try {
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, profile, { merge: true });
            toast({ title: 'Success', description: 'Your profile has been updated.' });
        } catch (error) {
            console.error("Error saving profile: ", error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to save profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    
    if (!profile) {
        return <div className="text-center">Please log in to view your profile.</div>;
    }

    return (
        <div className="container py-10 space-y-8">
            <h1 className="text-3xl font-bold font-headline">User Profile</h1>
            
            <Card>
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.uid}`} alt="User avatar" data-ai-hint="person headshot" />
                            <AvatarFallback>{profile.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                        <p className="text-muted-foreground">{profile.email}</p>
                        <p className="text-sm text-muted-foreground mt-1">Member since: {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                    </div>
                     <div className="text-center md:text-right">
                        <p className="font-semibold">Plan: <span className="text-primary">Premium</span></p>
                        <Button variant="link" className="p-0 h-auto">Upgrade Plan</Button>
                        <p className="text-sm text-muted-foreground mt-1">47/100 ATS checks this month</p>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="personal-info" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                    <TabsTrigger value="personal-info"><UserCog className="mr-2" /> Personal Info</TabsTrigger>
                    <TabsTrigger value="security"><Shield className="mr-2" /> Security</TabsTrigger>
                    <TabsTrigger value="subscription"><CreditCard className="mr-2" /> Subscription</TabsTrigger>
                    <TabsTrigger value="preferences"><Settings className="mr-2" /> Preferences</TabsTrigger>
                    <TabsTrigger value="privacy"><BookUser className="mr-2" /> Privacy</TabsTrigger>
                </TabsList>
                <TabsContent value="personal-info">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="fullname">Full Name</Label>
                                    <Input id="fullname" value={profile.fullName} onChange={e => handleInputChange('fullName', e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" value={profile.email} onChange={e => handleInputChange('email', e.target.value)} />
                                </div>
                                 <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" value={profile.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                                </div>
                                 <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={profile.location} onChange={e => handleInputChange('location', e.target.value)} />
                                </div>
                                 <div>
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <Input id="linkedin" value={profile.linkedin} onChange={e => handleInputChange('linkedin', e.target.value)} />
                                </div>
                                 <div>
                                    <Label htmlFor="github">GitHub</Label>
                                    <Input id="github" value={profile.github} onChange={e => handleInputChange('github', e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="industry">Industry</Label>
                                    <Select value={profile.industry} onValueChange={value => handleInputChange('industry', value)}>
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="software-development">Software Development</SelectItem>
                                            <SelectItem value="data-science">Data Science</SelectItem>
                                            <SelectItem value="product-management">Product Management</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div>
                                    <Label htmlFor="experience">Experience Level</Label>
                                     <Select value={profile.experienceLevel} onValueChange={value => handleInputChange('experienceLevel', value)}>
                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="entry">Entry-level (0-2 years)</SelectItem>
                                            <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                                            <SelectItem value="senior">Senior (5-7 years)</SelectItem>
                                            <SelectItem value="lead">Lead (7+ years)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} disabled={isSaving}>
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                {/* Other tabs remain static for now */}
                <TabsContent value="subscription">
                     <Card>
                        <CardHeader>
                            <CardTitle>Subscription & Billing</CardTitle>
                            <CardDescription>Manage your plan, billing details, and view usage.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                             <Card className="p-6 bg-background">
                                <h3 className="font-semibold mb-4">Current Plan</h3>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div><p className="text-muted-foreground">Plan</p><p className="font-medium">Premium</p></div>
                                    <div><p className="text-muted-foreground">Billing</p><p className="font-medium">$9.99/month</p></div>
                                    <div><p className="text-muted-foreground">Next Bill</p><p className="font-medium">March 15, 2024</p></div>
                                    <div><p className="text-muted-foreground">Payment</p><p className="font-medium">Visa ending in 1234</p></div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-6">
                                    <Button>Update Payment</Button>
                                    <Button variant="secondary">Change Billing Cycle</Button>
                                    <Button variant="destructive">Cancel Plan</Button>
                                </div>
                            </Card>
                            <Card className="p-6 bg-background">
                                <h3 className="font-semibold mb-4">Usage This Month</h3>
                                <div className="space-y-4">
                                    {usageStats.map(stat => (
                                        <div key={stat.name}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm text-muted-foreground">{stat.name}</span>
                                                <span className="text-sm font-medium">
                                                    {stat.value} / {isFinite(stat.max) ? stat.max : '∞'}
                                                </span>
                                            </div>
                                            <Progress value={isFinite(stat.max) ? (stat.value / stat.max) * 100 : 100} />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                             <Card className="p-6 bg-background">
                                <h3 className="font-semibold mb-4">Billing History</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Plan</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead className="text-right">Invoice</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {billingHistory.map(item => (
                                            <TableRow key={item.date}>
                                                <TableCell>{item.date}</TableCell>
                                                <TableCell>{item.plan}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm"><Download className="mr-2"/> PDF</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security">
                     <Card>
                        <CardHeader><CardTitle>Security</CardTitle></CardHeader>
                        <CardContent><p>Security settings will be here.</p></CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="preferences">
                     <Card>
                        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
                        <CardContent><p>Preference settings will be here.</p></CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="privacy">
                     <Card>
                        <CardHeader><CardTitle>Privacy</CardTitle></CardHeader>
                        <CardContent><p>Privacy settings will be here.</p></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

    