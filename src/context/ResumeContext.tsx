
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData } from '@/types/resume';

const initialData: ResumeData = {
    personal: {
        fullName: 'John Developer',
        email: 'john.developer@email.com',
        phone: '123-456-7890',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/johndeveloper',
        github: 'github.com/johndeveloper',
    },
    summary: 'A passionate and experienced software developer with a knack for creating efficient, scalable, and user-friendly web applications. Proficient in various programming languages and frameworks, with a strong foundation in computer science principles.',
    skills: {
        technical: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
        soft: ['Team Leadership', 'Agile Methodologies', 'Problem Solving', 'Communication'],
    },
    work: [
        {
            title: 'Senior Software Engineer',
            company: 'TechCorp Inc.',
            startDate: 'Jan 2022',
            endDate: 'Present',
            description: 'Leading a team of developers in building and maintaining high-traffic web applications. Responsible for architectural design, code reviews, and mentoring junior engineers. Improved application performance by 30% through code optimization and database query tuning.',
        },
        {
            title: 'Software Engineer',
            company: 'Innovate Solutions',
            startDate: 'Jun 2019',
            endDate: 'Dec 2021',
            description: 'Developed and maintained features for a large-scale e-commerce platform. Collaborated with cross-functional teams to deliver high-quality software products. Wrote clean, maintainable, and well-documented code.',
        },
    ],
    projects: [
        {
            name: 'E-commerce Platform',
            techStack: 'React, Node.js, MongoDB',
            description: 'A full-featured e-commerce platform with a custom shopping cart, payment gateway integration, and an admin dashboard for managing products, orders, and users.',
        },
         {
            name: 'Project Management Tool',
            techStack: 'TypeScript, Next.js, Firebase',
            description: 'A collaborative project management tool with features like task tracking, team communication, and file sharing. Implemented real-time updates using WebSockets.',
        }
    ],
    education: [
        {
            school: 'Massachusetts Institute of Technology (MIT)',
            degree: 'Bachelor of Science in Computer Science',
            startDate: 'Sep 2015',
            endDate: 'May 2019',
            gpa: '3.9/4.0',
        },
    ],
     certifications: [
        'AWS Certified Solutions Architect - Associate',
        'Certified Kubernetes Application Developer (CKAD)',
    ],
    extras: {
        languages: ['English (Native)', 'Spanish (Conversational)'],
        interests: ['Open Source Contribution', 'Hiking', 'Photography'],
    }
};


interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState('Template1_Basic');

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, selectedTemplate, setSelectedTemplate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
