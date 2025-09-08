
import { ResumeData } from '@/types/resume';

export function Template5_Compact({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-4 bg-white text-gray-800 font-sans text-xs" id="resume-content">
            <header className="text-center mb-2">
                <h1 className="text-2xl font-bold">{personal.fullName}</h1>
                <p className="text-xs">{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            <section className="mb-2">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-0.5">Summary</h2>
                <p className="text-center text-xs mt-1">{summary}</p>
            </section>

            <section className="mb-2">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-0.5">Skills</h2>
                <p className="text-center text-xs mt-1">{skills.technical.join(' • ')}</p>
            </section>

            <section className="mb-2">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-0.5">Experience</h2>
                {work.map((job, index) => (
                    <div key={index} className="mt-1.5">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold">{job.title}, <span className="font-normal italic">{job.company}</span></h3>
                            <p className="text-xs">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="text-xs">{job.description}</p>
                    </div>
                ))}
            </section>

             <section className="mb-2">
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-0.5">Projects</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mt-1.5">
                        <h3 className="font-bold">{project.name} <span className="font-normal italic">({project.techStack})</span></h3>
                        <p className="text-xs">{project.description}</p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="font-bold text-center text-sm uppercase tracking-wider bg-gray-100 py-0.5">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-1.5 text-center">
                        <p><span className="font-bold">{edu.degree}</span>, {edu.school} ({edu.startDate} - {edu.endDate})</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
