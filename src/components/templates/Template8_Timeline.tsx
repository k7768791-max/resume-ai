
import { ResumeData } from '@/types/resume';

export function Template8_Timeline({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-8 bg-white text-gray-800 font-sans" id="resume-content">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">{personal.fullName}</h1>
                <p className="text-sm">{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            <div className="grid grid-cols-4 gap-8">
                <div className="col-span-1 border-r pr-8">
                    <section className="mb-6">
                        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Skills</h2>
                        <ul className="text-sm">
                            {skills.technical.map(skill => <li key={skill}>{skill}</li>)}
                        </ul>
                    </section>
                    <section>
                        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Education</h2>
                        {education.map((edu, index) => (
                             <div key={index} className="text-sm">
                                <h3 className="font-bold">{edu.school}</h3>
                                <p>{edu.degree}</p>
                                <p className="text-xs">{edu.endDate}</p>
                            </div>
                        ))}
                    </section>
                </div>
                <div className="col-span-3">
                    <section className="mb-6">
                        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Summary</h2>
                        <p className="text-sm">{summary}</p>
                    </section>
                    <section>
                        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Experience</h2>
                        <div className="relative border-l-2 border-gray-200">
                            {work.map((job, index) => (
                                <div key={index} className="mb-6 ml-6">
                                    <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full ring-4 ring-white"></span>
                                    <h3 className="font-bold">{job.title} at {job.company}</h3>
                                    <p className="text-xs text-gray-500 mb-1">{job.startDate} - {job.endDate}</p>
                                    <p className="text-sm">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
