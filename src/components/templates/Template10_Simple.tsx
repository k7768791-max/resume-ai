
import { ResumeData } from '@/types/resume';

export function Template10_Simple({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education, certifications, extras } = data;
    return (
        <div className="p-10 bg-white text-black font-mono text-sm" id="resume-content">
            <header className="text-center mb-6">
                <h1 className="text-2xl font-bold">{personal.fullName.toUpperCase()}</h1>
                <p className="text-xs">
                    {personal.email} | {personal.phone} | {personal.location}
                    {personal.linkedin && ` | ${personal.linkedin}`}
                    {personal.github && ` | ${personal.github}`}
                </p>
            </header>
            
            <br />
            <p className="font-bold text-sm uppercase tracking-wider">Summary</p>
            <hr className="border-black my-1"/>
            <p>{summary}</p>
            
            <br />
            <p className="font-bold text-sm uppercase tracking-wider">Skills</p>
            <hr className="border-black my-1"/>
            {skills.technical.map((line, index) => (
                <p key={index}>{line}</p>
            ))}

            <br />
            <p className="font-bold text-sm uppercase tracking-wider">Experience</p>
            <hr className="border-black my-1"/>
            {work.map((job, index) => (
                <div key={index} className="my-2">
                    <div className="flex justify-between items-baseline">
                        <p className="font-bold">{job.title}, {job.company}</p>
                        <p className="text-xs">{job.startDate} - {job.endDate}</p>
                    </div>
                    <p className="mt-1">{job.description}</p>
                </div>
            ))}
            
            <br />
            <p className="font-bold text-sm uppercase tracking-wider">Projects</p>
            <hr className="border-black my-1"/>
            {projects.map((project, index) => (
                <div key={index} className="my-2">
                    <p className="font-bold">{project.name}</p>
                     <p className="text-xs italic">{project.techStack}</p>
                    <p>{project.description}</p>
                </div>
            ))}

            <br />
            <p className="font-bold text-sm uppercase tracking-wider">Education</p>
            <hr className="border-black my-1"/>
            {education.map((edu, index) => (
                <div key={index} className="my-2">
                    <div className="flex justify-between items-baseline">
                        <p className="font-bold">{edu.school}</p>
                        <p className="text-xs">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p>{edu.degree}</p>
                </div>
            ))}

            {certifications && certifications.length > 0 && (
                <>
                    <br />
                    <p className="font-bold text-sm uppercase tracking-wider">Certifications</p>
                    <hr className="border-black my-1"/>
                    {certifications.map((cert, index) => (
                        <p key={index} className="my-1">{cert}</p>
                    ))}
                </>
            )}

            {extras?.awards && extras.awards.length > 0 && (
                <>
                    <br />
                    <p className="font-bold text-sm uppercase tracking-wider">Awards</p>
                    <hr className="border-black my-1"/>
                    {extras.awards.map((award, index) => (
                        <p key={index} className="my-1">{award}</p>
                    ))}
                </>
            )}

            {extras?.interests && extras.interests.length > 0 && (
                 <>
                    <br />
                    <p className="font-bold text-sm uppercase tracking-wider">Interests</p>
                    <hr className="border-black my-1"/>
                    <p>{extras.interests.join(', ')}</p>
                </>
            )}
        </div>
    );
}
