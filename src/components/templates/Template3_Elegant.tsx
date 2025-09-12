
import { ResumeData } from '@/types/resume';

export function Template3_Elegant({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras } = data;
    return (
        <div className="p-8 bg-gray-50 text-gray-800 font-serif" id="resume-content">
            <header className="text-center mb-8">
                <h1 className="text-5xl font-thin tracking-widest text-gray-700">{personal.fullName.toUpperCase()}</h1>
                <p className="text-sm mt-2 text-gray-500">
                    {personal.email} • {personal.phone} • {personal.location}
                </p>
            </header>

            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>

            <section className="mb-6">
                 <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Summary</h2>
                <p className="text-center text-sm text-gray-600">{summary}</p>
            </section>

             <section className="mb-6">
                <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Core Competencies</h2>
                <div className="text-center text-sm text-gray-700">
                    {skills.technical.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Professional Experience</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-4">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{job.company} — {job.title}</h3>
                            <p className="text-xs text-gray-500">{job.startDate} to {job.endDate}</p>
                        </div>
                        <p className="mt-1 text-sm text-center">{job.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Projects</h2>
                {projects.map((project, index) => (
                     <div key={index} className="mb-4 text-center">
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-xs italic text-gray-500 mb-1">{project.techStack}</p>
                        <p className="mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                 <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="text-center">
                        <h3 className="text-lg font-semibold">{edu.school}</h3>
                        <p className="text-sm">{edu.degree}</p>
                    </div>
                ))}
            </section>

            {certifications && certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Certifications</h2>
                    <div className="text-center text-sm">
                        {certifications.map((cert, index) => <p key={`cert-${index}`}>{cert}</p>)}
                    </div>
                </section>
            )}

            {extras?.awards && extras.awards.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Awards</h2>
                    <div className="text-center text-sm">
                        {extras.awards.map((award, index) => <p key={`award-${index}`}>{award}</p>)}
                    </div>
                </section>
            )}

            {extras?.interests && extras.interests.length > 0 && (
                <section>
                    <h2 className="text-center text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Interests</h2>
                     <p className="text-center text-sm">{extras.interests.join(', ')}</p>
                </section>
            )}
        </div>
    );
}
