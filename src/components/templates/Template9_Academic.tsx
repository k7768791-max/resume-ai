
import { ResumeData } from '@/types/resume';

export function Template9_Academic({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras } = data;
    return (
        <div className="p-8 bg-white text-gray-800 font-serif text-sm" id="resume-content">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold">{personal.fullName}</h1>
                <p>{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            {summary && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold border-b pb-1">SUMMARY</h2>
                    <p className="mt-2">{summary}</p>
                </section>
            )}
            
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-2">
                        <div className="flex justify-between items-baseline">
                            <p><span className="font-bold">{edu.school}</span> - {edu.degree}</p>
                            <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                    </div>
                ))}
            </section>
            
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">EXPERIENCE</h2>
                 {work.map((job, index) => (
                    <div key={index} className="mt-2">
                        <div className="flex justify-between items-baseline">
                             <h3 className="font-bold">{job.title} - {job.company}</h3>
                             <p className="text-xs">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="text-sm mt-1">{job.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">PROJECTS</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mt-2">
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-xs italic mb-1">{project.techStack}</p>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>

             <section className="mb-4">
                <h2 className="text-lg font-bold border-b pb-1">SKILLS</h2>
                <div className="mt-2">
                    {skills.technical.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </section>

            {certifications && certifications.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold border-b pb-1">CERTIFICATIONS</h2>
                    <ul className="list-disc list-inside mt-2">
                        {certifications.map(cert => <li key={cert}>{cert}</li>)}
                    </ul>
                </section>
            )}

            {extras?.awards && extras.awards.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold border-b pb-1">AWARDS</h2>
                    <ul className="list-disc list-inside mt-2">
                        {extras.awards.map(award => <li key={award}>{award}</li>)}
                    </ul>
                </section>
            )}

            {extras?.interests && extras.interests.length > 0 && (
                <section>
                    <h2 className="text-lg font-bold border-b pb-1">INTERESTS</h2>
                     <p className="mt-2">{extras.interests.join(', ')}</p>
                </section>
            )}
        </div>
    );
}
