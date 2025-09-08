
import { ResumeData } from '@/types/resume';

export function Template9_Academic({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications } = data;
    return (
        <div className="p-8 bg-white text-gray-800 font-serif" id="resume-content">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">{personal.fullName}</h1>
                <p>{personal.email} | {personal.phone} | {personal.location}</p>
            </header>
            
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-2">
                        <p><span className="font-bold">{edu.school}</span> - {edu.degree}, GPA: {edu.gpa}</p>
                        <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">RESEARCH EXPERIENCE</h2>
                 {work.filter(j => j.company.toLowerCase().includes("research")).map((job, index) => (
                    <div key={index} className="mt-2">
                        <h3 className="font-bold">{job.title} - {job.company}</h3>
                        <p className="text-sm">{job.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">PROJECTS</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mt-2">
                        <p><span className="font-bold">{project.name}:</span> {project.description}</p>
                    </div>
                ))}
            </section>

             <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">SKILLS</h2>
                <p><strong>Technical:</strong> {skills.technical.join(', ')}</p>
                {skills.soft && <p><strong>Soft:</strong> {skills.soft.join(', ')}</p>}
            </section>

            {certifications && (
                <section>
                    <h2 className="text-lg font-bold border-b pb-1">CERTIFICATIONS</h2>
                    <ul className="list-disc list-inside mt-2">
                        {certifications.map(cert => <li key={cert}>{cert}</li>)}
                    </ul>
                </section>
            )}
        </div>
    );
}
