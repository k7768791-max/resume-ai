
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useResume } from "@/context/ResumeContext";
import { Template1_Basic } from '../templates/Template1_Basic';
import { Template2_Modern } from '../templates/Template2_Modern';
import { Template3_Elegant } from '../templates/Template3_Elegant';
import { Template4_Corporate } from '../templates/Template4_Corporate';
import { Template5_Compact } from '../templates/Template5_Compact';
import { Template6_Clean } from '../templates/Template6_Clean';
import { Template7_BoldHeader } from '../templates/Template7_BoldHeader';
import { Template8_Timeline } from '../templates/Template8_Timeline';
import { Template9_Academic } from '../templates/Template9_Academic';
import { Template10_Simple } from '../templates/Template10_Simple';

const templates: { [key: string]: React.FC<any> } = {
    Template1_Basic,
    Template2_Modern,
    Template3_Elegant,
    Template4_Corporate,
    Template5_Compact,
    Template6_Clean,
    Template7_BoldHeader,
    Template8_Timeline,
    Template9_Academic,
    Template10_Simple,
};

export function ResumePreview() {
    const { resumeData, selectedTemplate } = useResume();
    const SelectedTemplateComponent = templates[selectedTemplate];

    return (
        <div className="h-full flex flex-col">
            <Card className="flex-1 overflow-auto">
                <CardContent className="p-0">
                    <div id="resume-content" className="bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm', margin: 'auto' }}>
                         {SelectedTemplateComponent && <SelectedTemplateComponent data={resumeData} />}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
