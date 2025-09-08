
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleDollarSign, BarChart, BookUser, ChevronRight, CreditCard, Download, Edit, File, FileClock, History, Settings, Shield, Star, Trophy, UserCog } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

const successMetrics = [
    { name: 'Resumes Created', value: '5', icon: <File className="text-primary"/> },
    { name: 'Average ATS Score', value: '87%', icon: <Trophy className="text-primary"/> },
    { name: 'Score Improvement', value: '+23%', icon: <BarChart className="text-primary"/> },
    { name: 'Jobs Applied To', value: '12', icon: <FileClock className="text-primary"/> },
    { name: 'Interview Callbacks', value: '4 (33%)', icon: <Star className="text-primary"/> },
    { name: 'Job Offers', value: '1', icon: <CircleDollarSign className="text-primary"/> },
];

const chartData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 91 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 92 },
];

export default function ProfilePage() {
    return (
        <div className="container py-10 space-y-8">
            <h1 className="text-3xl font-bold font-headline">User Profile</h1>
            
            <Card>
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://picsum.photos/200" alt="User avatar" data-ai-hint="person headshot" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">John Developer</h2>
                        <p className="text-muted-foreground">john.developer@email.com</p>
                        <p className="text-sm text-muted-foreground mt-1">Member since: January 2024</p>
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
                                    <Input id="fullname" defaultValue="John Developer" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue="john.developer@email.com" />
                                </div>
                                 <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                                </div>
                                 <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" defaultValue="San Francisco, CA" />
                                </div>
                                 <div>
                                    <Label htmlFor="linkedin">LinkedIn</Label>
                                    <Input id="linkedin" defaultValue="linkedin.com/in/johndeveloper" />
                                </div>
                                 <div>
                                    <Label htmlFor="github">GitHub</Label>
                                    <Input id="github" defaultValue="github.com/johndeveloper" />
                                </div>
                                <div>
                                    <Label htmlFor="industry">Industry</Label>
                                    <Select defaultValue="software-development">
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
                                     <Select defaultValue="senior">
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
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

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

            <Card>
                <CardHeader>
                    <CardTitle>Your Resume Analytics</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <h3 className="font-semibold">Success Metrics</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {successMetrics.map(metric => (
                                <Card key={metric.name} className="p-4 flex items-start gap-4 bg-background">
                                    <div className="text-2xl mt-1">{metric.icon}</div>
                                    <div>
                                        <p className="font-bold text-xl">{metric.value}</p>
                                        <p className="text-sm text-muted-foreground">{metric.name}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                     </div>
                     <div>
                        <h3 className="font-semibold mb-4">ATS Score Trend</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis domain={[50, 100]} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-center text-sm text-muted-foreground mt-2">🎉 Great progress! Your ATS scores are consistently high.</p>
                     </div>
                </CardContent>
            </Card>
        </div>
    );
}

    