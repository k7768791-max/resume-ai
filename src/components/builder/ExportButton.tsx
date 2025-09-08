
'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HardDriveDownload } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Packer, Document, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { useResume } from '@/context/ResumeContext';

export function ExportButton() {
    const { resumeData } = useResume();

    const exportToPDF = () => {
        const input = document.getElementById('resume-content');
        if (input) {
            html2canvas(input, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const ratio = canvasWidth / canvasHeight;
                const width = pdfWidth;
                const height = width / ratio;

                // check if height is bigger than pdf page height
                if (height > pdfHeight) {
                    // split into multiple pages
                }
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                pdf.save('resume.pdf');
            });
        }
    };
    
    const exportToDOCX = () => {
        const { personal, summary, skills, work, projects, education } = resumeData;
        
        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({
                        children: [new TextRun({ text: personal.fullName, bold: true, size: 32 })],
                        spacing: { after: 200 },
                        alignment: 'center',
                    }),
                    new Paragraph({
                        text: `${personal.email} | ${personal.phone} | ${personal.location}`,
                        alignment: 'center',
                    }),
                    new Paragraph({ text: " " }),
                    new Paragraph({ text: "Summary", style: "Heading1" }),
                    new Paragraph({ text: summary }),
                    new Paragraph({ text: " " }),
                    new Paragraph({ text: "Skills", style: "Heading1" }),
                    new Paragraph({ text: skills.technical.join(', ') }),
                     new Paragraph({ text: " " }),
                    new Paragraph({ text: "Experience", style: "Heading1" }),
                    ...work.flatMap(job => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: job.title, bold: true }),
                                new TextRun({ text: ` at ${job.company}` }),
                            ]
                        }),
                        new Paragraph({ text: `${job.startDate} - ${job.endDate}` }),
                        new Paragraph({ text: job.description, spacing: { after: 200 } }),
                    ]),
                    new Paragraph({ text: " " }),
                    new Paragraph({ text: "Education", style: "Heading1" }),
                    ...education.map(edu => new Paragraph({ text: `${edu.degree}, ${edu.school} (${edu.endDate})` })),
                ],
            }],
             styles: {
                paragraphStyles: [
                    {
                        id: "Heading1",
                        name: "Heading 1",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            bold: true,
                            size: 24,
                        },
                         paragraph: {
                            spacing: { before: 240, after: 120 },
                        },
                    },
                ]
            }
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
                <DropdownMenuItem onClick={exportToDOCX}>Export as DOC</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

