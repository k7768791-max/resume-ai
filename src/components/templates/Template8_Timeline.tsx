
import { ResumeData } from '@/types/resume';

export function Template8_Timeline({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras } = data;
    return (
        <div className="p-8 bg-white text-gray-800 font-sans" id="resume-content">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">{personal.fullName}</h1>
                <p className="text-sm">{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            <section className="mb-6">
                <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3 text-center">Summary</h2>
                <p className="text-sm text-center">{summary}</p>
            </section>

            <section className="mb-6">
                <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3 text-center">Skills</h2>
                <div className="text-sm text-center">
                    {skills.technical.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </section>

            <section className="mb-6">
                <h2 className="font-bold text-lg uppercase tracking-wider text-gray-700 mb-4">Experience</h2>
                <div className="relative border-l-2 border-gray-300 pl-6">
                    {work.map((job, index) => (
                        <div key={index} className="mb-6 ml-4">
                            <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full ring-4 ring-white"></span>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold">{job.title} at {job.company}</h3>
                                <p className="text-xs text-gray-500 mb-1">{job.startDate} - {job.endDate}</p>
                            </div>
                            <p className="text-sm">{job.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="mb-6">
                 <h2 className="font-bold text-lg uppercase tracking-wider text-gray-700 mb-4">Projects</h2>
                 {projects.map((project, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-xs italic text-gray-500 mb-1">{project.techStack}</p>
                        <p className="text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                <h2 className="font-bold text-lg uppercase tracking-wider text-gray-700 mb-4">Education</h2>
                {education.map((edu, index) => (
                     <div key={index} className="text-sm mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{edu.school}</h3>
                            <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p>{edu.degree}</p>
                    </div>
                ))}
            </section>

            {certifications && certifications.length > 0 && (
                <section className="mb-6">
                    <h2 className="font-bold text-lg uppercase tracking-wider text-gray-700 mb-4">Certifications</h2>
                    <ul className="list-disc list-inside text-sm">
                        {certifications.map((cert, index) => <li key={`cert-${index}`}>{cert}</li>)}
                    </ul>
                </section>
            )}

            {extras?.awards && extras.awards.length > 0 && (
                <section className="mb-6">
                    <h2 className="font-bold text-lg uppercase tracking-wider text-gray-700 mb-4">Awards</h2>
                    <ul className="list-disc list-inside text-sm">
                        {extras.awards.map((award, index) => <li key={`award-${index}`}>{award}</li>)}
                    </ul>
                </section>
            )}

            {extras?.interests && extras.interests.length > 0 && (
                <section>
                    <h2 className="font-bold text-lg uppercase tracking-wider text-gray-700 mb-4">Interests</h2>
                     <p className="text-sm">{extras.interests.join(', ')}</p>
                </section>
            )}
        </div>
    );
}
