
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Activity, ArrowUpRight, Bot, Copy, FilePlus, FileText, Filter, Linkedin, Search, Send, Star, Trash2, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickStats = [
  { title: "Resumes Created", value: "5", icon: <FileText className="h-6 w-6 text-muted-foreground" /> },
  { title: "Avg. ATS Score", value: "87%", icon: <Bot className="h-6 w-6 text-muted-foreground" /> },
  { title: "Applications Sent", value: "12", icon: <Send className="h-6 w-6 text-muted-foreground" /> },
  { title: "Success Rate", value: "4.8", icon: <Star className="h-6 w-6 text-muted-foreground" /> },
];

const quickActions = [
    { title: "New Resume", description: "Create from scratch", icon: <FilePlus className="h-8 w-8 text-primary" />, href: "/builder/new" },
    { title: "ATS Check", description: "Upload for analysis", icon: <Bot className="h-8 w-8 text-primary" />, href: "/ats-analyzer" },
    { title: "Job Match", description: "Find opportunities", icon: <TrendingUp className="h-8 w-8 text-primary" />, href: "/job-matcher" },
    { title: "Templates", description: "Browse our templates", icon: <FileText className="h-8 w-8 text-primary" />, href: "/templates" },
    { title: "LinkedIn", description: "Optimize your profile", icon: <Linkedin className="h-8 w-8 text-primary" />, href: "/linkedin-optimizer" },
    { title: "Analytics", description: "View success metrics", icon: <TrendingUp className="h-8 w-8 text-primary" />, href: "/dashboard" },
];

const resumes = [
  { id: "1", name: "Software Dev Resume", atsScore: 92, modified: "2d ago" },
  { id: "2", name: "Data Analyst Resume", atsScore: 78, modified: "1w ago" },
  { id: "3", name: "Product Mgr Resume", atsScore: 85, modified: "3d ago" },
];

const recentActivities = [
    { text: "Software Dev Resume analyzed - ATS Score: 92%", icon: <Bot className="h-5 w-5 text-primary" /> },
    { text: "Data Analyst Resume exported to PDF", icon: <Send className="h-5 w-5 text-primary" /> },
    { text: "Product Manager Resume updated", icon: <FileText className="h-5 w-5 text-primary" /> },
    { text: "Job match found: Senior Developer at TechCorp", icon: <TrendingUp className="h-5 w-5 text-primary" /> },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, John! 👋 Ready to optimize your job search?</p>
            </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickStats.map((stat) => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
            </Card>
            ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {quickActions.map((action) => (
                        <Link href={action.href} key={action.title}>
                            <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors h-full">
                                {action.icon}
                                <p className="font-semibold mt-2 text-center">{action.title}</p>
                                <p className="text-sm text-muted-foreground text-center">{action.description}</p>
                            </div>
                        </Link>
                        ))}
                    </CardContent>
                </Card>

                 {/* Resume Library */}
                 <Card className="mt-8">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <CardTitle>Your Resumes</CardTitle>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search resumes..." className="pl-8" />
                                </div>
                                <Button variant="outline">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                        <Card key={resume.id} className="group">
                            <CardHeader className="p-0">
                                <div className="aspect-[3/4] bg-muted rounded-t-md flex items-center justify-center p-4 relative">
                                    <Image src={`https://picsum.photos/300/400?random=${resume.id}`} width={300} height={400} alt={resume.name} className="rounded-md object-cover" data-ai-hint="resume preview" />
                                    <Button asChild variant="secondary" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/builder/${resume.id}`}>Preview</Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2">
                                <CardTitle className="text-base">{resume.name}</CardTitle>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>ATS: <span className={resume.atsScore > 85 ? 'text-green-500' : resume.atsScore > 75 ? 'text-yellow-500' : 'text-red-500'}>{resume.atsScore}%</span></span>
                                    <span>Modified: {resume.modified}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-2 pt-0 grid grid-cols-2 gap-2">
                                <Button asChild size="sm">
                                    <Link href={`/builder/${resume.id}`}>Edit</Link>
                                </Button>
                                <Button variant="outline" size="sm"><Send className="h-4 w-4 mr-2" /> Share</Button>
                                <Button variant="ghost" size="sm"><Copy className="h-4 w-4 mr-2" /> Copy</Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
                            </CardFooter>
                        </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-1">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-4">
                                {activity.icon}
                                <p className="text-sm text-muted-foreground">{activity.text}</p>
                            </div>
                        ))}
                         <Button variant="link" className="p-0 h-auto">View All Activity <ArrowUpRight className="h-4 w-4 ml-1" /></Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
