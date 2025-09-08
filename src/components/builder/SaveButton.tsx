
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResume } from '@/context/ResumeContext';
import { auth, storage } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-db';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export function SaveButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [resumeName, setResumeName] = useState('');
    const { resumeData } = useResume();
    const { toast } = useToast();

    const handleSave = async () => {
        if (!resumeName) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please enter a name for the resume.' });
            return;
        }

        const user = auth.currentUser;
        if (user) {
            try {
                const resumeRef = doc(db, `users/${user.uid}/resumes`, resumeName);
                await setDoc(resumeRef, resumeData);
                toast({ title: 'Success', description: `Resume "${resumeName}" saved successfully.` });
                setIsOpen(false);
                setResumeName('');
            } catch (error) {
                console.error("Error saving resume: ", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to save resume.' });
            }
        } else {
            toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to save a resume.' });
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                <Save className="mr-2" />
                Save
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save Resume</DialogTitle>
                        <DialogDescription>Enter a name to save this version of your resume.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="resume-name" className="text-right">Name</Label>
                            <Input
                                id="resume-name"
                                value={resumeName}
                                onChange={(e) => setResumeName(e.target.value)}
                                className="col-span-3"
                                placeholder="e.g., Software Engineer Application"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
