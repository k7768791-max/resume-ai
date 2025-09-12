
'use client';

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-db";
import type { ResumeData } from "@/types/resume";
import { useResume, ResumeProvider } from "@/context/ResumeContext";
import { Loader2 } from "lucide-react";
import { ResumePreview } from "@/components/builder/resume-preview";


function SharedResumeContent({ userId, resumeId }: { userId: string, resumeId: string }) {
    const { setResumeData, isLoading, setIsLoading } = useResume();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResume = async () => {
            setIsLoading(true);
            try {
                const resumeRef = doc(db, `users/${userId}/resumes`, resumeId);
                const docSnap = await getDoc(resumeRef);
                if (docSnap.exists()) {
                    setResumeData(docSnap.data() as ResumeData);
                } else {
                    setError("Resume not found or you don't have permission to view it.");
                }
            } catch (err) {
                console.error("Error fetching shared resume:", err);
                setError("An error occurred while trying to load the resume.");
            } finally {
                setIsLoading(false);
            }
        };

        if (userId && resumeId) {
            fetchResume();
        }
    }, [userId, resumeId, setResumeData, setIsLoading]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="ml-4">Loading Resume...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background text-destructive">
                <p>{error}</p>
            </div>
        );
    }

    // This component renders the visual resume based on the context's data
    return <ResumePreview />;
}


export default function SharedResumePage({ params }: { params: { slug: string[] } }) {
    const [userId, resumeId] = params.slug || [];

    return (
        <ResumeProvider>
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex justify-center">
                <SharedResumeContent userId={userId} resumeId={resumeId} />
            </div>
        </ResumeProvider>
    );
}
