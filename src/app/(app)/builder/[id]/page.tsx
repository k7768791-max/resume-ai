import { AiAssistant } from "@/components/builder/ai-assistant";
import { ResumeForm } from "@/components/builder/resume-form";
import { ResumePreview } from "@/components/builder/resume-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, HardDriveDownload, Save } from "lucide-react";
import Link from "next/link";

export default function BuilderPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
                <Button variant="ghost" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2" />
                        Back
                    </Link>
                </Button>
                <div className="text-center">
                    <h1 className="font-headline text-lg">Software Developer Resume</h1>
                    <p className="text-xs text-muted-foreground">Modified 2 minutes ago</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Save className="h-4 w-4 animate-pulse" />
                        <span>Saving...</span>
                    </div>
                    <Button variant="outline">
                        <Eye className="mr-2" />
                        Preview
                    </Button>
                    <Button>
                        <HardDriveDownload className="mr-2" />
                        Export
                    </Button>
                </div>
            </header>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8 overflow-y-auto">
                <div className="lg:col-span-3">
                    <ResumeForm />
                </div>
                <div className="lg:col-span-6">
                    <ResumePreview />
                </div>
                <div className="lg:col-span-3">
                    <AiAssistant />
                </div>
            </div>
        </div>
    );
}
