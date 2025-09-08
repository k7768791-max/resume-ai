import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function TemplatesPage() {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold font-headline mb-2">Professional Resume Templates</h1>
            <p className="text-muted-foreground mb-8">Choose the perfect design for your industry.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                                <Image src={`https://picsum.photos/300/40${i}`} width={300} height={400} alt={`Template ${i + 1}`} className="rounded-md object-cover" data-ai-hint="resume template" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-base">Template {i + 1}</CardTitle>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}