"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bot, CaseSensitive, Contact, GraduationCap, Hand, Home, Pencil, PlusCircle, Trash2, Trophy } from "lucide-react";

const formSections = [
    { 
        id: 'personal', 
        title: 'Personal Information', 
        icon: <Contact className="h-5 w-5" /> ,
        fields: [
            { label: 'Full Name', placeholder: 'John Doe' },
            { label: 'Email', placeholder: 'john.doe@email.com' },
            { label: 'Phone', placeholder: '123-456-7890' },
            { label: 'Location', placeholder: 'New York, NY' },
            { label: 'LinkedIn', placeholder: 'linkedin.com/in/johndoe' },
            { label: 'GitHub', placeholder: 'github.com/johndoe' },
        ]
    },
    { 
        id: 'summary', 
        title: 'Professional Summary', 
        icon: <Pencil className="h-5 w-5" />,
        isTextArea: true,
        aiEnabled: true,
    },
    { 
        id: 'experience', 
        title: 'Work Experience', 
        icon: <Home className="h-5 w-5" />,
        isList: true,
        items: [
            { title: 'Senior Developer', subtitle: 'TechCorp | Jan 2022 - Present' }
        ]
    },
    { 
        id: 'education', 
        title: 'Education', 
        icon: <GraduationCap className="h-5 w-5" />,
        isList: true,
        items: [
            { title: 'Computer Science, MIT', subtitle: '2018 - 2022' }
        ]
    },
    { 
        id: 'skills', 
        title: 'Skills', 
        icon: <Trophy className="h-5 w-5" />,
        isList: true,
        items: [
            { title: 'Technical: React, Node.js, Python' },
            { title: 'Soft: Leadership, Communication' },
        ]
    },
    { 
        id: 'projects', 
        title: 'Projects', 
        icon: <CaseSensitive className="h-5 w-5" />,
        isList: true,
        items: [
            { title: 'E-commerce Platform', subtitle: 'React, Node.js, MongoDB' }
        ]
    },
]

export function ResumeForm() {
    return (
        <div className="h-full">
            <h2 className="text-xl font-headline font-bold mb-4">Resume Sections</h2>
            <Accordion type="multiple" defaultValue={['personal']} className="w-full space-y-4">
                {formSections.map(section => (
                    <AccordionItem value={section.id} key={section.id} className="bg-card border-none rounded-lg">
                        <AccordionTrigger className="p-4 hover:no-underline">
                            <div className="flex items-center gap-3">
                                {section.icon}
                                <span className="font-semibold">{section.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                           {section.fields && (
                             <div className="space-y-4">
                                {section.fields.map(field => (
                                    <div key={field.label}>
                                        <Label className="text-xs text-muted-foreground">{field.label}</Label>
                                        <Input placeholder={field.placeholder} />
                                    </div>
                                ))}
                             </div>
                           )}
                           {section.isTextArea && (
                            <div className="relative">
                                <Textarea placeholder="Experienced software developer with..." rows={5} />
                                {section.aiEnabled && <Button size="sm" variant="ghost" className="absolute bottom-2 right-2"><Bot className="mr-2 h-4 w-4"/> Generate</Button>}
                            </div>
                           )}
                           {section.isList && (
                             <div className="space-y-2">
                                {section.items?.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-background rounded-md">
                                        <div>
                                            <p className="font-semibold text-sm">{item.title}</p>
                                            {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="h-4 w-4"/></Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full mt-2">
                                    <PlusCircle className="mr-2"/> Add {section.title.slice(0,-1)}
                                </Button>
                             </div>
                           )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
             <Button variant="ghost" className="w-full mt-4">
                <PlusCircle className="mr-2"/> Add Custom Section
            </Button>
        </div>
    )
}
