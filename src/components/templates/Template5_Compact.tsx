
import { ResumeData } from '@/types/resume';

export function Template5_Compact({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras } = data;
    return (
        <div className="p-6 bg-white text-gray-800 font-sans text-xs" id="resume-content">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold">{personal.fullName}</h1>
                <p className="text-xs">{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            <section className="mb-3">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Summary</h2>
                <p className="text-xs mt-1 p-1">{summary}</p>
            </section>

            <section className="mb-3">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Skills</h2>
                <div className="text-center text-xs mt-1 p-1">
                    {skills.technical.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </section>

            <section className="mb-3">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Experience</h2>
                {work.map((job, index) => (
                    <div key={index} className="mt-2 p-1">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{job.title}, <span className="font-normal italic">{job.company}</span></h3>
                            <p className="text-xs">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="text-xs mt-0.5">{job.description}</p>
                    </div>
                ))}
            </section>

             <section className="mb-3">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Projects</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mt-2 p-1">
                        <h3 className="font-bold">{project.name} <span className="font-normal italic">({project.techStack})</span></h3>
                        <p className="text-xs mt-0.5">{project.description}</p>
                    </div>
                ))}
            </section>

            <section className="mb-3">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-2 p-1">
                         <div className="flex justify-between items-baseline">
                            <p><span className="font-bold">{edu.degree}</span>, {edu.school}</p>
                            <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                    </div>
                ))}
            </section>

            {certifications && certifications.length > 0 && (
                 <section className="mb-3">
                    <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Certifications</h2>
                    <ul className="list-disc list-inside mt-1 p-1">
                        {certifications.map(cert => <li key={cert}>{cert}</li>)}
                    </ul>
                </section>
            )}

            {extras?.awards && extras.awards.length > 0 && (
                <section className="mb-3">
                    <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Awards</h2>
                    <ul className="list-disc list-inside mt-1 p-1">
                        {extras.awards.map(award => <li key={award}>{award}</li>)}
                    </ul>
                </section>
            )}

            {extras?.interests && extras.interests.length > 0 && (
                <section>
                    <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-1">Interests</h2>
                     <p className="text-center text-xs mt-1 p-1">{extras.interests.join(', ')}</p>
                </section>
            )}
        </div>
    );
}
