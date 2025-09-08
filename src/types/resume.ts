
export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  skills: {
    technical: string[];
    soft?: string[];
  };
  work: {
    title: string;
    company: string;
    description: string;
    startDate: string; 
    endDate: string;
  }[];
  projects: {
    name: string;
    techStack: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  certifications?: string[];
  extras?: {
    languages?: string[];
    interests?: string[];
    awards?: string[];
  };
}
