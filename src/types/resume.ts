export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  skills: {
    technical: string[];
    soft?: string[];
  };
  work: {
    title: string;
    company: string;
    location?: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
  projects: {
    name: string;
    techStack: string;
    description: string;
    link?: string;
  }[];
  education: {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  certifications?: string[];
  volunteer?: {
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  extras?: {
    languages?: string[];
    interests?: string[];
    awards?: string[];
  };
  // Adding a flexible custom section
  custom?: {
      title: string;
      items: {
          name: string;
          description: string;
      }[];
  }[];
}
