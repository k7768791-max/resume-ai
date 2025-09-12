
import type { ResumeData } from '@/types/resume';

export const getResumeText = (resumeData: ResumeData): string => {
    if (!resumeData) return '';
    const sections = [
        resumeData.summary,
        ...(resumeData.skills?.technical || []),
        ...(resumeData.skills?.soft || []),
        ...resumeData.work.map(w => `${w.title} at ${w.company}: ${w.description}`),
        ...resumeData.projects.map(p => `${p.name}: ${p.description}`),
        ...resumeData.education.map(e => `${e.degree} from ${e.school}`),
        ...(resumeData.certifications || []),
        ...(resumeData.extras?.awards || []),
        ...(resumeData.extras?.interests || []),
        ...(resumeData.extras?.languages || []),
    ];
    return sections.filter(Boolean).join('\n\n');
};

    