
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Search, Star } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const templates = [
  { id: 1, name: 'Modern Professional', category: 'Professional', isPremium: false, rating: 4.8, reviews: 124 },
  { id: 2, name: 'Executive Classic', category: 'Professional', isPremium: true, rating: 4.9, reviews: 89 },
  { id: 3, name: 'Creative Designer', category: 'Creative', isPremium: true, rating: 4.7, reviews: 156 },
  { id: 4, name: 'Tech Pro Minimal', category: 'Technical', isPremium: false, rating: 4.6, reviews: 98 },
  { id: 5, name: 'Academic Research', category: 'Academic', isPremium: false, rating: 4.5, reviews: 67 },
  { id: 6, name: 'Sales Pro Impact', category: 'Professional', isPremium: true, rating: 4.8, reviews: 143 },
  { id: 7, name: 'Startup Bold', category: 'Creative', isPremium: true, rating: 4.9, reviews: 201 },
  { id: 8, name: 'Healthcare Professional', category: 'Academic', isPremium: true, rating: 4.4, reviews: 45 },
];

const categories = ['All', 'Professional', 'Creative', 'Academic', 'Technical', 'Modern'];

export default function TemplatesPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <div className="container py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline mb-2">Professional Resume Templates</h1>
                <p className="text-muted-foreground">Choose the perfect design for your industry.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search templates..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="all-styles">
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All Styles" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-styles">All Styles</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="all-prices">
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-prices">All</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
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
                {templates.map((template) => (
                    <Card key={template.id} className="group overflow-hidden">
                        <CardHeader className="p-0 relative">
                            <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                                <Image 
                                    src={`https://picsum.photos/300/40${template.id}`} 
                                    width={300} height={400} 
                                    alt={template.name} 
                                    className="rounded-t-md object-cover transition-transform group-hover:scale-105"
                                    data-ai-hint="resume template"
                                />
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
                                            A detailed preview of the {template.name} template.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        <div className="bg-muted rounded-md p-4">
                                            <Image 
                                                src={`https://picsum.photos/600/80${template.id}`} 
                                                width={600} 
                                                height={800} 
                                                alt={template.name} 
                                                className="rounded-md object-contain"
                                                data-ai-hint="resume document"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4">Template Details</h3>
                                            <p><span className="font-medium">Category:</span> {template.category}</p>
                                            <p><span className="font-medium">ATS-Friendly:</span> ✅ Yes</p>
                                             <p className="flex items-center gap-1"><span className="font-medium">Rating:</span> <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {template.rating} ({template.reviews} reviews)</p>
                                             <Button className="mt-6 w-full">Use This Template</Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button size="sm">Select</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
