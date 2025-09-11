
'use client';

import { ResumeForm } from "@/components/builder/resume-form";
import { ResumePreview } from "@/components/builder/resume-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { ResumeProvider, useResume } from '@/context/ResumeContext';
import { TemplateSwitcher } from "@/components/builder/TemplateSwitcher";
import { SaveButton } from "@/components/builder/SaveButton";
import { ExportButton } from "@/components/builder/ExportButton";
import { useEffect } from "react";

function BuilderPageContent({ resumeId }: { resumeId: string }) {
    const { loadResume, isLoading } = useResume();

    useEffect(() => {
        loadResume(resumeId);
    }, [resumeId, loadResume]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="ml-4">Loading Resume...</p>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
                <Button variant="ghost" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2" />
                        Back
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                    <TemplateSwitcher />
                </div>
                <div className="flex items-center gap-2">
                    <SaveButton resumeId={resumeId} />
                    <ExportButton />
                </div>
            </header>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                <div className="lg:col-span-1 overflow-y-auto">
                    <ResumeForm />
                </div>
                <div className="lg:col-span-1 overflow-y-auto">
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}


export default function BuilderPage({ params }: { params: { id: string } }) {
    return (
        <ResumeProvider>
            <BuilderPageContent resumeId={params.id} />
        </ResumeProvider>
    );
}
