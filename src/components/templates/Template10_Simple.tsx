
import { ResumeData } from '@/types/resume';

export function Template10_Simple({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-10 bg-white text-black font-mono text-sm" id="resume-content">
            <p className="text-2xl font-bold">{personal.fullName}</p>
            <p>{personal.email}</p>
            <p>{personal.phone}</p>
            <p>{personal.location}</p>
            
            <br />
            <p className="font-bold">SUMMARY</p>
            <hr className="border-black my-1"/>
            <p>{summary}</p>
            
            <br />
            <p className="font-bold">SKILLS</p>
            <hr className="border-black my-1"/>
            <p>{skills.technical.join(', ')}</p>

            <br />
            <p className="font-bold">EXPERIENCE</p>
            <hr className="border-black my-1"/>
            {work.map((job, index) => (
                <div key={index} className="my-2">
                    <p className="font-bold">{job.title}, {job.company}</p>
                    <p className="text-xs">{job.startDate} - {job.endDate}</p>
                    <p>{job.description}</p>
                </div>
            ))}
            
            <br />
            <p className="font-bold">PROJECTS</p>
            <hr className="border-black my-1"/>
            {projects.map((project, index) => (
                <div key={index} className="my-2">
                    <p className="font-bold">{project.name}</p>
                    <p>{project.description}</p>
                </div>
            ))}

            <br />
            <p className="font-bold">EDUCATION</p>
            <hr className="border-black my-1"/>
            {education.map((edu, index) => (
                <div key={index} className="my-2">
                    <p className="font-bold">{edu.school}</p>
                    <p>{edu.degree} ({edu.startDate} - {edu.endDate})</p>
                </div>
            ))}
        </div>
    );
}
