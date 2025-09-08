
import { ResumeData } from '@/types/resume';

export function Template1_Basic({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-8 bg-white text-gray-800 font-sans text-sm" id="resume-content">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-wider">{personal.fullName.toUpperCase()}</h1>
                <p className="text-xs">
                    {personal.email} | {personal.phone} | {personal.location}
                    {personal.linkedin && ` | linkedin.com/in/${personal.linkedin}`}
                    {personal.github && ` | github.com/${personal.github}`}
                </p>
            </header>

            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                <p>{summary}</p>
            </section>

            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.technical.map(skill => (
                        <span key={skill} className="bg-gray-200 px-2 py-1 rounded-sm">{skill}</span>
                    ))}
                </div>
            </section>

            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">EXPERIENCE</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{job.title}</h3>
                            <p className="text-xs">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="italic">{job.company}</p>
                        <p className="mt-1 text-sm">{job.description}</p>
                    </div>
                ))}
            </section>

            <section className="mb-4">
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">PROJECTS</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="font-bold">{project.name} | <span className="font-normal italic">{project.techStack}</span></h3>
                        <p className="mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-lg font-bold border-b-2 border-gray-300 pb-1 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-baseline">
                        <div>
                            <h3 className="font-bold">{edu.school}</h3>
                            <p className="italic">{edu.degree}</p>
                        </div>
                        <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
