
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Search, Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ResumeProvider, useResume } from '@/context/ResumeContext';

import { Template1_Basic } from '@/components/templates/Template1_Basic';
import { Template2_Modern } from '@/components/templates/Template2_Modern';
import { Template3_Elegant } from '@/components/templates/Template3_Elegant';
import { Template4_Corporate } from '@/components/templates/Template4_Corporate';
import { Template5_Compact } from '@/components/templates/Template5_Compact';
import { Template6_Clean } from '@/components/templates/Template6_Clean';
import { Template7_BoldHeader } from '@/components/templates/Template7_BoldHeader';
import { Template8_Timeline } from '@/components/templates/Template8_Timeline';
import { Template9_Academic } from '@/components/templates/Template9_Academic';
import { Template10_Simple } from '@/components/templates/Template10_Simple';

const templateComponents: { [key: string]: React.FC<any> } = {
    'Template1_Basic': Template1_Basic,
    'Template2_Modern': Template2_Modern,
    'Template3_Elegant': Template3_Elegant,
    'Template4_Corporate': Template4_Corporate,
    'Template5_Compact': Template5_Compact,
    'Template6_Clean': Template6_Clean,
    'Template7_BoldHeader': Template7_BoldHeader,
    'Template8_Timeline': Template8_Timeline,
    'Template9_Academic': Template9_Academic,
    'Template10_Simple': Template10_Simple,
};

const templates = [
  { id: 1, name: 'Basic', component: 'Template1_Basic', category: 'Professional', isPremium: false, rating: 4.8, reviews: 124 },
  { id: 2, name: 'Modern', component: 'Template2_Modern', category: 'Modern', isPremium: true, rating: 4.9, reviews: 89 },
  { id: 3, name: 'Elegant', component: 'Template3_Elegant', category: 'Creative', isPremium: true, rating: 4.7, reviews: 156 },
  { id: 4, name: 'Corporate', component: 'Template4_Corporate', category: 'Professional', isPremium: false, rating: 4.6, reviews: 98 },
  { id: 5, name: 'Compact', component: 'Template5_Compact', category: 'Technical', isPremium: false, rating: 4.5, reviews: 67 },
  { id: 6, name: 'Clean', component: 'Template6_Clean', category: 'Modern', isPremium: true, rating: 4.8, reviews: 143 },
  { id: 7, name: 'Bold Header', component: 'Template7_BoldHeader', category: 'Creative', isPremium: true, rating: 4.9, reviews: 201 },
  { id: 8, name: 'Timeline', component: 'Template8_Timeline', category: 'Technical', isPremium: true, rating: 4.4, reviews: 45 },
  { id: 9, name: 'Academic', component: 'Template9_Academic', category: 'Academic', isPremium: false, rating: 4.5, reviews: 45 },
  { id: 10, name: 'Simple', component: 'Template10_Simple', category: 'Professional', isPremium: false, rating: 4.6, reviews: 45 },
];

const categories = ['All', 'Professional', 'Creative', 'Academic', 'Technical', 'Modern'];
const prices = ['All', 'Free', 'Premium'];

function TemplatePreviewCard({ template, resumeData, onSelectTemplate }: { template: typeof templates[0], resumeData: any, onSelectTemplate: (template: string) => void }) {
    const TemplateComponent = templateComponents[template.component];
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        function updateScale() {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // A4 width is 210mm. Assuming 96 DPI, this is ~794px.
                // We calculate scale based on container width.
                const resumeWidth = 794; 
                setScale(containerWidth / resumeWidth);
            }
        }
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <Card className="group overflow-hidden">
            <CardHeader className="p-0 relative">
                 <div ref={containerRef} className="aspect-[210/297] bg-muted flex items-center justify-center overflow-hidden">
                   <div className="bg-white shadow-lg" style={{ width: '210mm', height: '297mm', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                        <TemplateComponent data={resumeData} />
                    </div>
                </div>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                    {template.isPremium && <Badge variant="destructive">Premium</Badge>}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-base truncate">{template.name}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>{template.rating}</span>
                    <span>({template.reviews})</span>
                </div>
            </CardContent>
            <CardFooter className="p-2 pt-0 grid grid-cols-2 gap-2">
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm"><Eye className="mr-2"/> Preview</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>
                                A detailed preview of the {template.name} template with your content.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="bg-muted rounded-md p-4 max-h-[70vh] overflow-auto">
                                 <div className="bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm', margin: 'auto' }}>
                                    <TemplateComponent data={resumeData} />
                                 </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-4">Template Details</h3>
                                <p><span className="font-medium">Category:</span> {template.category}</p>
                                <p><span className="font-medium">ATS-Friendly:</span> ✅ Yes</p>
                                 <p className="flex items-center gap-1"><span className="font-medium">Rating:</span> <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {template.rating} ({template.reviews} reviews)</p>
                                 <Button className="mt-6 w-full" onClick={() => onSelectTemplate(template.component)}>Use This Template</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Button size="sm" onClick={() => onSelectTemplate(template.component)}>Select</Button>
            </CardFooter>
        </Card>
    );
}


function TemplatesPageContent() {
    const { resumeData, setSelectedTemplate } = useResume();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [priceFilter, setPriceFilter] = useState('All');

    const filteredTemplates = useMemo(() => {
        return templates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
            const matchesPrice = priceFilter === 'All' ||
                (priceFilter === 'Free' && !template.isPremium) ||
                (priceFilter === 'Premium' && template.isPremium);
            
            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [searchQuery, activeCategory, priceFilter]);

    return (
        <div className="container py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline mb-2">Professional Resume Templates</h1>
                <p className="text-muted-foreground">Choose the perfect design for your industry.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search templates..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                        {prices.map(price => (
                             <SelectItem key={price} value={price}>{price}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(category => (
                    <Button 
                        key={category} 
                        variant={activeCategory === category ? 'default' : 'outline'}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                    <TemplatePreviewCard
                        key={template.id}
                        template={template}
                        resumeData={resumeData}
                        onSelectTemplate={setSelectedTemplate}
                    />
                ))}
            </div>
        </div>
    );
}


export default function TemplatesPage() {
    return (
        <ResumeProvider>
            <TemplatesPageContent />
        </ResumeProvider>
    )
}
