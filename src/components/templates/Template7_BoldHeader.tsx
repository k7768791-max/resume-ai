
import { ResumeData } from '@/types/resume';

export function Template7_BoldHeader({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras } = data;
    return (
        <div className="p-6 bg-white text-gray-800 font-sans" id="resume-content">
            <header className="bg-gray-800 text-white p-6 mb-6 text-center">
                <h1 className="text-4xl font-bold">{personal.fullName}</h1>
                <p className="mt-2 text-sm">{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">SUMMARY</h2>
                <p className="text-sm">{summary}</p>
            </section>
            
            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">SKILLS</h2>
                {skills.technical.map((line, index) => (
                    <p key={index} className="text-sm">{line}</p>
                ))}
            </section>

            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">EXPERIENCE</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base">{job.title} at {job.company}</h3>
                            <p className="text-sm">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="mt-1 text-sm">{job.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">PROJECTS</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="font-bold text-base">{project.name}</h3>
                        <p className="text-sm italic mb-1">{project.techStack}</p>
                        <p className="mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>

            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-baseline">
                        <div>
                            <h3 className="font-bold">{edu.school}</h3>
                            <p>{edu.degree}</p>
                        </div>
                        <p>{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>

             {certifications && certifications.length > 0 && (
                <section className="mb-4 px-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">CERTIFICATIONS</h2>
                    <ul className="list-disc list-inside text-sm">
                        {certifications.map(cert => <li key={cert}>{cert}</li>)}
                    </ul>
                </section>
            )}

            {extras?.awards && extras.awards.length > 0 && (
                <section className="mb-4 px-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">AWARDS</h2>
                    <ul className="list-disc list-inside text-sm">
                        {extras.awards.map(award => <li key={award}>{award}</li>)}
                    </ul>
                </section>
            )}

            {extras?.interests && extras.interests.length > 0 && (
                <section className="px-6">
                    <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">INTERESTS</h2>
                     <p className="text-sm">{extras.interests.join(', ')}</p>
                </section>
            )}
        </div>
    );
}
