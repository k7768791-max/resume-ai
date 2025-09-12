
'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HardDriveDownload } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Packer, Document, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { useResume } from '@/context/ResumeContext';

export function ExportButton() {
    const { resumeData } = useResume();

    const exportToPDF = () => {
        const input = document.getElementById('resume-content');
        if (input) {
            const originalShadow = input.style.boxShadow;
            input.style.boxShadow = 'none';

            html2canvas(input, { 
                scale: 3, // Increased scale for better quality
                useCORS: true,
                logging: false,
                width: input.offsetWidth,
                height: input.offsetHeight,
             }).then(canvas => {
                input.style.boxShadow = originalShadow;

                const imgData = canvas.toDataURL('image/png', 1.0); // Use PNG with max quality
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const canvasAspectRatio = canvasWidth / canvasHeight;
                
                let renderWidth = pdfWidth;
                let renderHeight = renderWidth / canvasAspectRatio;

                if (renderHeight > pdfHeight) {
                    renderHeight = pdfHeight;
                    renderWidth = renderHeight * canvasAspectRatio;
                }
                
                let position = 0;
                let heightLeft = renderHeight;

                pdf.addImage(imgData, 'PNG', 0, position, renderWidth, renderHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position = -renderHeight + heightLeft;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, renderWidth, renderHeight);
                    heightLeft -= pdfHeight;
                }
                
                pdf.save('resume.pdf');
            });
        }
    };
    
    const exportToDOCX = () => {
        const { personal, summary, skills, work, projects, education, certifications, extras } = resumeData;
        
        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        children: [new TextRun({ text: personal.fullName, bold: true, size: 32 })],
                        spacing: { after: 200 },
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        text: `${personal.email} | ${personal.phone} | ${personal.location}`,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 },
                    }),

                    new Paragraph({ text: "Summary", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }),
                    new Paragraph({ text: summary, spacing: { after: 200 } }),
                    
                    new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }),
                    ...skills.technical.map(skillLine => new Paragraph({ text: skillLine, spacing: { after: 100 } })),
                     
                    new Paragraph({ text: "Experience", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }),
                    ...work.flatMap(job => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: job.title, bold: true }),
                                new TextRun({ text: ` at ${job.company}` }),
                            ],
                            spacing: { before: 200 }
                        }),
                        new Paragraph({ text: `${job.startDate} - ${job.endDate}`, style: "IntenseQuote" }),
                        new Paragraph({ text: job.description, spacing: { after: 200 } }),
                    ]),
                    
                    new Paragraph({ text: "Projects", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }),
                     ...projects.flatMap(project => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: project.name, bold: true }),
                            ],
                            spacing: { before: 200 }
                        }),
                        new Paragraph({ text: project.techStack, style: "IntenseQuote" }),
                        new Paragraph({ text: project.description, spacing: { after: 200 } }),
                    ]),

                    new Paragraph({ text: "Education", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }),
                    ...education.map(edu => new Paragraph({ text: `${edu.degree}, ${edu.school} (${edu.endDate})`, spacing: { after: 200 } })),

                    ...(certifications && certifications.length > 0 ? [
                        new Paragraph({ text: "Certifications", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }),
                        ...certifications.map(cert => new Paragraph({ text: cert, bullet: { level: 0 } }))
                    ] : []),
                    
                    ...(extras?.awards && extras.awards.length > 0 ? [
                        new Paragraph({ text: "Awards", heading: HeadingLevel.HEADING_1, border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } } }),
                        ...extras.awards.map(award => new Paragraph({ text: award, bullet: { level: 0 } }))
                    ] : []),
                ],
            }],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, "resume.docx");
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <HardDriveDownload className="mr-2" />
                    Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={exportToPDF}>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToDOCX}>Export as DOCX</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

    