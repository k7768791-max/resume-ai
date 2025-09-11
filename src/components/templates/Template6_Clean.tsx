
import { ResumeData } from '@/types/resume';

export function Template6_Clean({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-8 bg-white text-gray-700 font-light font-sans text-sm" id="resume-content">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-extralight tracking-widest">{personal.fullName.toUpperCase()}</h1>
                <p className="text-sm mt-1">{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            <section className="mb-6">
                <h2 className="text-base font-semibold tracking-wider border-b border-gray-200 pb-1 mb-2">SUMMARY</h2>
                <p className="text-sm">{summary}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-base font-semibold tracking-wider border-b border-gray-200 pb-1 mb-2">SKILLS</h2>
                <p className="text-sm">{skills.technical.join(', ')}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-base font-semibold tracking-wider border-b border-gray-200 pb-1 mb-2">WORK EXPERIENCE</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-lg font-medium">{job.title} - <span className="italic text-gray-600">{job.company}</span></h3>
                            <p className="text-xs text-gray-500">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="mt-1 text-sm">{job.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                <h2 className="text-base font-semibold tracking-wider border-b border-gray-200 pb-1 mb-2">PROJECTS</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-medium">{project.name}</h3>
                        <p className="text-sm italic text-gray-600 mb-1">{project.techStack}</p>
                        <p className="text-sm">{project.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                <h2 className="text-base font-semibold tracking-wider border-b border-gray-200 pb-1 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-medium">{edu.school}</h3>
                             <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm">{edu.degree}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
