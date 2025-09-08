
'use client';

import { AiAssistant } from "@/components/builder/ai-assistant";
import { ResumeForm } from "@/components/builder/resume-form";
import { ResumePreview } from "@/components/builder/resume-preview";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ResumeProvider } from '@/context/ResumeContext';
import { TemplateSwitcher } from "@/components/builder/TemplateSwitcher";
import { SaveButton } from "@/components/builder/SaveButton";
import { ExportButton } from "@/components/builder/ExportButton";

export default function BuilderPage({ params }: { params: { id: string } }) {
    return (
        <ResumeProvider>
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
                        <SaveButton />
                        <ExportButton />
                    </div>
                </header>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="lg:col-span-3 overflow-y-auto">
                        <ResumeForm />
                    </div>
                    <div className="lg:col-span-6 overflow-y-auto">
                        <ResumePreview />
                    </div>
                    <div className="lg:col-span-3 overflow-y-auto">
                        <AiAssistant />
                    </div>
                </div>
            </div>
        </ResumeProvider>
    );
}
