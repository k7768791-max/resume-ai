
import { ResumeData } from '@/types/resume';

export function Template4_Corporate({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications } = data;
    return (
        <div className="p-8 bg-white text-gray-900 font-sans text-xs" id="resume-content">
            <header className="text-center mb-6 border-b-4 border-blue-800 pb-4">
                <h1 className="text-3xl font-bold text-blue-900">{personal.fullName}</h1>
                <p className="text-sm mt-2">
                    {personal.phone} | {personal.email} | {personal.location}
                    {personal.linkedin && ` | ${personal.linkedin}`}
                    {personal.github && ` | ${personal.github}`}
                </p>
            </header>
            
            <section className="mb-6">
                <h2 className="text-base font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">SUMMARY</h2>
                <p>{summary}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-base font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">SKILLS</h2>
                <p>{skills.technical.join(', ')}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-base font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">WORK EXPERIENCE</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{job.title} at {job.company}</h3>
                            <p className="text-gray-600 text-xs">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="mt-1">{job.description}</p>
                    </div>
                ))}
            </section>

            <section className="mb-6">
                <h2 className="text-base font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">PROJECTS</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="font-bold text-sm">{project.name}</h3>
                        <p className="italic text-gray-600 text-xs mb-1">{project.techStack}</p>
                        <p className="mt-1">{project.description}</p>
                    </div>
                ))}
            </section>

            <section className="mb-6">
                <h2 className="text-base font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mb-2">
                         <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-sm">{edu.degree}, {edu.school}</h3>
                            <p className="text-gray-600 text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    </div>
                ))}
            </section>

            {certifications && certifications.length > 0 && (
                <section>
                    <h2 className="text-base font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">CERTIFICATIONS</h2>
                    <ul className="list-disc list-inside">
                        {certifications.map(c => <li key={c}>{c}</li>)}
                    </ul>
                </section>
            )}
        </div>
    );
}
