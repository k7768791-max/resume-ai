
import { ResumeData } from '@/types/resume';

export function Template7_BoldHeader({ data }: { data: ResumeData }) {
    const { personal, summary, skills, work, projects, education } = data;
    return (
        <div className="p-6 bg-white text-gray-800 font-sans" id="resume-content">
            <header className="bg-gray-800 text-white p-6 mb-6">
                <h1 className="text-4xl font-bold">{personal.fullName}</h1>
                <p className="mt-2 text-sm">{personal.email} | {personal.phone} | {personal.location}</p>
            </header>

            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">SUMMARY</h2>
                <p className="text-sm">{summary}</p>
            </section>
            
            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">SKILLS</h2>
                <p className="text-sm">{skills.technical.join(" | ")}</p>
            </section>

            <section className="mb-4 px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">EXPERIENCE</h2>
                {work.map((job, index) => (
                    <div key={index} className="mb-3">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-base">{job.title} at {job.company}</h3>
                            <p className="text-sm">{job.startDate} - {job.endDate}</p>
                        </div>
                        <p className="mt-1 text-sm">{job.description}</p>
                    </div>
                ))}
            </section>

            <section className="px-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 text-gray-800 pb-1 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                    <div key={index} className="flex justify-between">
                        <div>
                            <h3 className="font-bold">{edu.school}</h3>
                            <p>{edu.degree}</p>
                        </div>
                        <p>{edu.startDate} - {edu.endDate}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
