"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/ResumeContext";
import { Bot, CaseSensitive, Contact, GraduationCap, Hand, Home, Pencil, PlusCircle, Trash2, Trophy, Award, Heart, Sparkles, Loader2 } from "lucide-react";
import { Card } from "../ui/card";
import { generateProfessionalSummary } from "@/ai/flows/generate-professional-summary";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { optimizeResumeContent } from "@/ai/flows/optimize-resume-content";

export function ResumeForm() {
    const { resumeData, setResumeData } = useResume();
    const { toast } = useToast();
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [optimizingIndex, setOptimizingIndex] = useState<number | null>(null);

    const handleChange = (section: 'personal', field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            }
        }));
    };

    const handleSummaryChange = (value: string) => {
        setResumeData(prev => ({ ...prev, summary: value }));
    };
    
    const handleSkillsChange = (value: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                technical: value.split('\n'),
            }
        }));
    }

    const handleArrayChange = (section: 'certifications' | 'custom', index: number, value: string) => {
        setResumeData(prev => {
            const list = [...(prev[section] || [])];
            list[index] = value;
            return { ...prev, [section]: list };
        });
    };
    
    const handleExtrasChange = (field: 'awards' | 'interests' | 'languages', index: number, value: string) => {
         setResumeData(prev => ({
            ...prev,
            extras: {
                ...prev.extras,
                [field]: (prev.extras?.[field] ?? []).map((item, i) => i === index ? value : item)
            }
        }));
    };
    
    const addToArray = (section: 'certifications' | 'custom') => {
        setResumeData(prev => ({ ...prev, [section]: [...(prev[section] || []), ''] }));
    };

    const removeFromArray = (section: 'certifications' | 'custom', index: number) => {
        setResumeData(prev => ({ ...prev, [section]: prev[section]?.filter((_, i) => i !== index) }));
    };

    const addToExtras = (field: 'awards' | 'interests' | 'languages') => {
        setResumeData(prev => ({
            ...prev,
            extras: { ...prev.extras, [field]: [...(prev.extras?.[field] || []), ''] }
        }));
    };
    
    const removeFromExtras = (field: 'awards' | 'interests' | 'languages', index: number) => {
         setResumeData(prev => ({
            ...prev,
            extras: { ...prev.extras, [field]: prev.extras?.[field]?.filter((_, i) => i !== index) }
        }));
    };


    const handleListItemChange = (section: 'work' | 'education' | 'projects', index: number, field: string, value: string) => {
        setResumeData(prev => {
            const list = [...prev[section]];
            const updatedItem = { ...list[index], [field]: value };
            list[index] = updatedItem;
            return { ...prev, [section]: list };
        });
    };

    const addListItem = (section: 'work' | 'education' | 'projects') => {
        const newItem = section === 'work'
            ? { title: '', company: '', startDate: '', endDate: '', description: '' }
            : section === 'education'
            ? { school: '', degree: '', startDate: '', endDate: '', gpa: '' }
            : { name: '', techStack: '', description: '' };
        
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], newItem]
        }));
    };

     const removeListItem = (section: 'work' | 'education' | 'projects', index: number) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const onGenerateSummary = async () => {
        setIsGeneratingSummary(true);
        try {
            const skillsText = resumeData.skills.technical.join(', ');
            const experienceText = resumeData.work.map(j => `${j.title} at ${j.company}: ${j.description}`).join('\n');
            const result = await generateProfessionalSummary({ skills: skillsText, experience: experienceText });
            setResumeData(prev => ({ ...prev, summary: result.summary }));
            toast({ title: 'Success', description: 'Professional summary generated.' });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate summary.' });
        } finally {
            setIsGeneratingSummary(false);
        }
    };
    
    const onOptimizeDescription = async (index: number, description: string) => {
        setOptimizingIndex(index);
        try {
            const result = await optimizeResumeContent({ resumeSection: description });
            handleListItemChange('work', index, 'description', result.optimizedContent);
            toast({ title: 'Success', description: 'Work description optimized.' });
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to optimize description.' });
        } finally {
            setOptimizingIndex(null);
        }
    };

    return (
        <div className="h-full">
            <h2 className="text-xl font-headline font-bold mb-4">Resume Sections</h2>
            <Accordion type="multiple" defaultValue={['personal']} className="w-full space-y-4">
                {/* Personal Information */}
                <AccordionItem value="personal" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                            <Contact className="h-5 w-5" />
                            <span className="font-semibold">Personal Information</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                         <div className="space-y-4">
                            <div>
                                <Label className="text-xs text-muted-foreground">Full Name</Label>
                                <Input placeholder="John Doe" value={resumeData.personal.fullName} onChange={e => handleChange('personal', 'fullName', e.target.value)} />
                            </div>
                             <div>
                                <Label className="text-xs text-muted-foreground">Email</Label>
                                <Input placeholder="john.doe@email.com" value={resumeData.personal.email} onChange={e => handleChange('personal', 'email', e.target.value)} />
                            </div>
                             <div>
                                <Label className="text-xs text-muted-foreground">Phone</Label>
                                <Input placeholder="123-456-7890" value={resumeData.personal.phone} onChange={e => handleChange('personal', 'phone', e.target.value)} />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Location</Label>
                                <Input placeholder="New York, NY" value={resumeData.personal.location} onChange={e => handleChange('personal', 'location', e.target.value)} />
                            </div>
                             <div>
                                <Label className="text-xs text-muted-foreground">LinkedIn</Label>
                                <Input placeholder="linkedin.com/in/johndoe" value={resumeData.personal.linkedin} onChange={e => handleChange('personal', 'linkedin', e.target.value)} />
                            </div>
                             <div>
                                <Label className="text-xs text-muted-foreground">GitHub</Label>
                                <Input placeholder="github.com/johndoe" value={resumeData.personal.github} onChange={e => handleChange('personal', 'github', e.target.value)} />
                            </div>
                         </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Professional Summary */}
                <AccordionItem value="summary" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                         <div className="flex items-center gap-3">
                            <Pencil className="h-5 w-5" />
                            <span className="font-semibold">Professional Summary</span>
                        </div>
                    </AccordionTrigger>
                     <AccordionContent className="p-4 pt-0">
                        <div className="relative">
                            <Textarea placeholder="Experienced software developer with..." rows={5} value={resumeData.summary} onChange={e => handleSummaryChange(e.target.value)}/>
                            <Button size="sm" variant="ghost" className="absolute bottom-2 right-2" onClick={onGenerateSummary} disabled={isGeneratingSummary}>
                                {isGeneratingSummary ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Bot className="mr-2 h-4 w-4"/>}
                                Generate
                            </Button>
                        </div>
                     </AccordionContent>
                </AccordionItem>

                 {/* Skills */}
                <AccordionItem value="skills" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                            <Trophy className="h-5 w-5" />
                            <span className="font-semibold">Skills</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-xs text-muted-foreground">Technical Skills (enter each category on a new line)</Label>
                                <Textarea 
                                    placeholder={"Frontend: React, Redux, TailwindCSS\nBackend: Node.js, Express.js, GraphQL"} 
                                    value={resumeData.skills.technical.join('\n')} 
                                    onChange={e => handleSkillsChange(e.target.value)}
                                    rows={8}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Work Experience */}
                <AccordionItem value="experience" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                         <div className="flex items-center gap-3">
                            <Home className="h-5 w-5" />
                            <span className="font-semibold">Work Experience</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                        <div className="space-y-4">
                            {resumeData.work.map((job, index) => (
                                <Card key={index} className="p-4 bg-background">
                                    <div className="flex justify-end">
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeListItem('work', index)}>
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="Job Title" value={job.title} onChange={e => handleListItemChange('work', index, 'title', e.target.value)} />
                                        <Input placeholder="Company" value={job.company} onChange={e => handleListItemChange('work', index, 'company', e.target.value)} />
                                        <div className="flex gap-2">
                                            <Input placeholder="Start Date" value={job.startDate} onChange={e => handleListItemChange('work', index, 'startDate', e.target.value)} />
                                            <Input placeholder="End Date" value={job.endDate} onChange={e => handleListItemChange('work', index, 'endDate', e.target.value)} />
                                        </div>
                                        <div className="relative">
                                            <Textarea placeholder="Description..." value={job.description} onChange={e => handleListItemChange('work', index, 'description', e.target.value)} />
                                            <Button size="sm" variant="ghost" className="absolute bottom-2 right-2" onClick={() => onOptimizeDescription(index, job.description)} disabled={optimizingIndex === index}>
                                                {optimizingIndex === index ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4"/>}
                                                Optimize
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full mt-2" onClick={() => addListItem('work')}>
                                <PlusCircle className="mr-2"/> Add Experience
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                 {/* Education */}
                <AccordionItem value="education" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                         <div className="flex items-center gap-3">
                            <GraduationCap className="h-5 w-5" />
                            <span className="font-semibold">Education</span>
                        </div>
                    </AccordionTrigger>
                     <AccordionContent className="p-4 pt-0">
                       <div className="space-y-4">
                            {resumeData.education.map((edu, index) => (
                                <Card key={index} className="p-4 bg-background">
                                    <div className="flex justify-end">
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeListItem('education', index)}>
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="School" value={edu.school} onChange={e => handleListItemChange('education', index, 'school', e.target.value)} />
                                        <Input placeholder="Degree" value={edu.degree} onChange={e => handleListItemChange('education', index, 'degree', e.target.value)} />
                                        <div className="flex gap-2">
                                            <Input placeholder="Start Date" value={edu.startDate} onChange={e => handleListItemChange('education', index, 'startDate', e.target.value)} />
                                            <Input placeholder="End Date" value={edu.endDate} onChange={e => handleListItemChange('education', index, 'endDate', e.target.value)} />
                                        </div>
                                         <Input placeholder="GPA" value={edu.gpa} onChange={e => handleListItemChange('education', index, 'gpa', e.target.value)} />
                                    </div>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full mt-2" onClick={() => addListItem('education')}>
                                <PlusCircle className="mr-2"/> Add Education
                            </Button>
                        </div>
                     </AccordionContent>
                </AccordionItem>

                 {/* Projects */}
                <AccordionItem value="projects" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                            <CaseSensitive className="h-5 w-5" />
                            <span className="font-semibold">Projects</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       <div className="space-y-4">
                            {resumeData.projects.map((project, index) => (
                                <Card key={index} className="p-4 bg-background">
                                    <div className="flex justify-end">
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeListItem('projects', index)}>
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="Project Name" value={project.name} onChange={e => handleListItemChange('projects', index, 'name', e.target.value)} />
                                        <Input placeholder="Tech Stack (e.g., React, Node.js)" value={project.techStack} onChange={e => handleListItemChange('projects', index, 'techStack', e.target.value)} />
                                        <Textarea placeholder="Description..." value={project.description} onChange={e => handleListItemChange('projects', index, 'description', e.target.value)} />
                                    </div>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full mt-2" onClick={() => addListItem('projects')}>
                                <PlusCircle className="mr-2"/> Add Project
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Certifications */}
                <AccordionItem value="certifications" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                            <Award className="h-5 w-5" />
                            <span className="font-semibold">Certifications</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       <div className="space-y-4">
                            {(resumeData.certifications || []).map((cert, index) => (
                                <Card key={index} className="p-4 bg-background flex items-center gap-2">
                                    <Input placeholder="AWS Certified Developer" value={cert} onChange={e => handleArrayChange('certifications', index, e.target.value)} />
                                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => removeFromArray('certifications', index)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full mt-2" onClick={() => addToArray('certifications')}>
                                <PlusCircle className="mr-2"/> Add Certification
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Awards */}
                 <AccordionItem value="awards" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                            <Trophy className="h-5 w-5" />
                            <span className="font-semibold">Awards</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       <div className="space-y-4">
                            {(resumeData.extras?.awards || []).map((award, index) => (
                                <Card key={index} className="p-4 bg-background flex items-center gap-2">
                                    <Input placeholder="Company Hackathon Winner" value={award} onChange={e => handleExtrasChange('awards', index, e.target.value)} />
                                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => removeFromExtras('awards', index)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full mt-2" onClick={() => addToExtras('awards')}>
                                <PlusCircle className="mr-2"/> Add Award
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Interests */}
                <AccordionItem value="interests" className="bg-card border-none rounded-lg">
                    <AccordionTrigger className="p-4 hover:no-underline">
                        <div className="flex items-center gap-3">
                            <Heart className="h-5 w-5" />
                            <span className="font-semibold">Hobbies & Interests</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0">
                       <div className="space-y-4">
                            {(resumeData.extras?.interests || []).map((interest, index) => (
                                <Card key={index} className="p-4 bg-background flex items-center gap-2">
                                    <Input placeholder="Open Source Contribution" value={interest} onChange={e => handleExtrasChange('interests', index, e.target.value)} />
                                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => removeFromExtras('interests', index)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </Card>
                            ))}
                            <Button variant="outline" className="w-full mt-2" onClick={() => addToExtras('interests')}>
                                <PlusCircle className="mr-2"/> Add Interest
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
