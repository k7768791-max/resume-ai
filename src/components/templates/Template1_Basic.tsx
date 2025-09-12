
import { ResumeData } from '@/types/resume';

export function Template1_Basic({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras, volunteer } = data;

    return (
        <div className="p-8 bg-white text-gray-800 font-sans text-sm leading-relaxed" id="resume-content">
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-wider">{personal.fullName.toUpperCase()}</h1>
                <p className="text-xs mt-1">
                    {personal.email} | {personal.phone} | {personal.location}
                    {personal.linkedin && ` | ${personal.linkedin}`}
                    {personal.github && ` | ${personal.github}`}
                    {personal.portfolio && ` | ${personal.portfolio}`}
                </p>
            </header>

            {/* Summary */}
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                <p>{summary}</p>
            </section>

            {/* Skills */}
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">SKILLS</h2>
                <div className="grid grid-cols-2 gap-2">
                    {skills.technical?.length > 0 && (
                        <div>
                            <h3 className="font-semibold">Technical</h3>
                            <ul className="list-disc list-inside">
                                {skills.technical.map((s, i) => <li key={`tech-${i}`}>{s}</li>)}
                            </ul>
                        </div>
                    )}
                    {skills.soft?.length > 0 && (
                        <div>
                            <h3 className="font-semibold">Soft Skills</h3>
                            <ul className="list-disc list-inside">
                                {skills.soft.map((s, i) => <li key={`soft-${i}`}>{s}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Experience */}
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">EXPERIENCE</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{job.title}</h3>
                            <p className="text-xs">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="italic">{job.company}, {job.location}</p>
                         <p className="mt-1 text-sm">{job.description}</p>
                    </div>
                ))}
            </section>

            {/* Projects */}
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">PROJECTS</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="font-bold">{project.name} <span className="italic font-normal">({project.techStack})</span></h3>
                        <p className="text-sm">{project.description}</p>
                        {project.link && <p className="text-xs text-blue-600">{project.link}</p>}
                    </div>
                ))}
            </section>

            {/* Education */}
            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-baseline mb-2">
                        <div>
                            <h3 className="font-bold">{edu.school}</h3>
                            <p className="italic">{edu.degree}</p>
                            {edu.gpa && <p className="text-xs">GPA: {edu.gpa}</p>}
                        </div>
                        <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">CERTIFICATIONS</h2>
                    <ul className="list-disc list-inside">
                        {certifications.map((cert, index) => <li key={`cert-${index}`}>{cert}</li>)}
                    </ul>
                </section>
            )}
            
            {/* Volunteer */}
            {volunteer && volunteer.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">VOLUNTEER EXPERIENCE</h2>
                    {volunteer.map((v, i) => (
                        <div key={i} className="mb-2">
                            <h3 className="font-bold">{v.role} – {v.organization}</h3>
                            <p className="text-xs">{v.startDate} - {v.endDate}</p>
                            <p className="text-sm">{v.description}</p>
                        </div>
                    ))}
                </section>
            )}


            {/* Awards */}
            {extras?.awards && extras.awards.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">AWARDS</h2>
                    <ul className="list-disc list-inside">
                        {extras.awards.map((award, index) => <li key={`award-${index}`}>{award}</li>)}
                    </ul>
                </section>
            )}

            {/* Interests */}
            {extras?.interests && extras.interests.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">INTERESTS</h2>
                    <p>{extras.interests.join(', ')}</p>
                </section>
            )}
            
            {/* Languages */}
            {extras?.languages && extras.languages.length > 0 && (
                 <section>
                    <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">LANGUAGES</h2>
                    <p>{extras.languages.join(', ')}</p>
                </section>
            )}

        </div>
    );
}
