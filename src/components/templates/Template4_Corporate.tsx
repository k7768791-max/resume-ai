
import { ResumeData } from '@/types/resume';

export function Template4_Corporate({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-6 bg-white text-gray-900 font-sans text-xs" id="resume-content">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 bg-gray-100 p-4">
                    <h1 className="text-2xl font-bold text-blue-900">{personal.fullName}</h1>
                    <p className="text-sm font-light text-blue-900">Software Developer</p>
                    
                    <div className="mt-6">
                        <h2 className="font-bold text-blue-800 uppercase text-sm mb-2">Contact</h2>
                        <p>{personal.phone}</p>
                        <p>{personal.email}</p>
                        <p>{personal.location}</p>
                        {personal.linkedin && <p>linkedin.com/in/{personal.linkedin}</p>}
                        {personal.github && <p>github.com/{personal.github}</p>}
                    </div>
                    
                    <div className="mt-6">
                        <h2 className="font-bold text-blue-800 uppercase text-sm mb-2">Skills</h2>
                        {skills.technical.map(skill => <p key={skill}>{skill}</p>)}
                    </div>
                    
                    <div className="mt-6">
                        <h2 className="font-bold text-blue-800 uppercase text-sm mb-2">Education</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="mb-2">
                                <h3 className="font-bold">{edu.degree}</h3>
                                <p>{edu.school}</p>
                                <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-8 p-4">
                    <section className="mb-6">
                        <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">SUMMARY</h2>
                        <p>{summary}</p>
                    </section>
                    
                    <section className="mb-6">
                        <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">WORK EXPERIENCE</h2>
                        {work.map((job, index) => (
                            <div key={index} className="mb-3">
                                <h3 className="font-bold text-base">{job.title}</h3>
                                <div className="flex justify-between text-gray-600">
                                    <p className="italic">{job.company}</p>
                                    <p>{job.startDate} - {job.endDate}</p>
                                </div>
                                <p className="mt-1">{job.description}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-lg font-extrabold text-blue-900 border-b-2 border-blue-200 pb-1 mb-2">PROJECTS</h2>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-3">
                                <h3 className="font-bold">{project.name}</h3>
                                <p className="italic text-gray-600">{project.techStack}</p>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}
