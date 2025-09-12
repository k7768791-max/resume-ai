
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export function Template2_Modern({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras } = data;
    return (
        <div className="p-8 bg-white text-gray-700 font-serif text-sm" id="resume-content">
            <header className="mb-6 pb-4 border-b-2 border-purple-600">
                <h1 className="text-4xl font-extrabold text-purple-800 tracking-tight">{personal.fullName}</h1>
                <div className="flex justify-start items-center text-xs text-gray-500 mt-2 flex-wrap gap-x-4 gap-y-1">
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
            
            <section className="mb-5">
                <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Skills</h2>
                {skills.technical.map((line, index) => (
                    <p key={index} className="text-sm">{line}</p>
                ))}
            </section>

            <section className="mb-5">
                <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Experience</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-4">
                        <div className="flex justify-between items-baseline">
                             <h3 className="font-bold text-base text-purple-900">{job.title} at {job.company}</h3>
                             <p className="font-semibold text-gray-600 text-xs">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="mt-1 text-sm">{job.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-5">
                <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Projects</h2>
                {projects.map((project, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-bold text-base text-purple-900">{project.name}</h3>
                        <p className="font-semibold text-gray-600 text-sm italic">{project.techStack}</p>
                        <p className="mt-1 text-sm">{project.description}</p>
                    </div>
                ))}
            </section>

             <section className="mb-5">
                <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Education</h2>
                {education.map((edu, index) => (
                     <div key={index} className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base text-purple-900">{edu.school}</h3>
                            <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                        </div>
                        <p className="text-sm">{edu.degree}</p>
                    </div>
                ))}
            </section>

            {certifications && certifications.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Certifications</h2>
                    <ul className="list-disc list-inside text-sm">
                        {certifications.map(cert => <li key={cert}>{cert}</li>)}
                    </ul>
                </section>
            )}

            {extras?.awards && extras.awards.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Awards</h2>
                    <ul className="list-disc list-inside text-sm">
                        {extras.awards.map(award => <li key={award}>{award}</li>)}
                    </ul>
                </section>
            )}

            {extras?.interests && extras.interests.length > 0 && (
                <section>
                    <h2 className="text-purple-800 font-bold text-sm tracking-widest uppercase mb-2">Interests</h2>
                     <p className="text-sm">{extras.interests.join(', ')}</p>
                </section>
            )}
        </div>
    );
}
