
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export function Template2_Modern({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-6 bg-white text-gray-700 font-serif text-sm" id="resume-content">
            <header className="mb-6 pb-4 border-b-2 border-purple-600">
                <h1 className="text-4xl font-extrabold text-purple-800 tracking-tight">{personal.fullName}</h1>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><Mail size={12}/> {personal.email}</span>
                    <span className="flex items-center gap-1"><Phone size={12}/> {personal.phone}</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/> {personal.location}</span>
                    {personal.linkedin && <span className="flex items-center gap-1"><Linkedin size={12}/> {personal.linkedin}</span>}
                    {personal.github && <span className="flex items-center gap-1"><Github size={12}/> {personal.github}</span>}
                </div>
            </header>

            <section className="mb-5">
                <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Summary</h2>
                <p className="text-sm">{summary}</p>
            </section>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <section className="mb-5">
                        <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Experience</h2>
                        {work.map((job, index) => (
                            <div key={index} className="mb-3">
                                <h3 className="font-bold text-base text-purple-900">{job.title}</h3>
                                <p className="font-semibold text-gray-600">{job.company} | {job.startDate} - {job.endDate}</p>
                                <p className="mt-1 text-sm">{job.description}</p>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Projects</h2>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-3">
                                <h3 className="font-bold text-base text-purple-900">{project.name}</h3>
                                <p className="font-semibold text-gray-600">{project.techStack}</p>
                                <p className="mt-1 text-sm">{project.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
                <div className="col-span-1">
                    <section className="mb-5">
                        <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Skills</h2>
                        <ul className="list-disc list-inside">
                            {skills.technical.map(skill => <li key={skill}>{skill}</li>)}
                        </ul>
                    </section>
                     <section>
                        <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Education</h2>
                        {education.map((edu, index) => (
                             <div key={index}>
                                <h3 className="font-bold text-base text-purple-900">{edu.school}</h3>
                                <p className="text-sm">{edu.degree}</p>
                                <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
}
