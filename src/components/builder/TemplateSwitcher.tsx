
'use client';
import { useResume } from '@/context/ResumeContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const templates = [
    'Template1_Basic', 'Template2_Modern', 'Template3_Elegant', 'Template4_Corporate', 'Template5_Compact',
    'Template6_Clean', 'Template7_BoldHeader', 'Template8_Timeline', 'Template9_Academic', 'Template10_Simple'
];

export function TemplateSwitcher() {
    const { selectedTemplate, setSelectedTemplate } = useResume();

    return (
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent>
                {templates.map(template => (
                    <SelectItem key={template} value={template}>{template.replace('_', ' ').replace('Template', '')}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
