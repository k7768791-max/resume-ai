import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Laptop, Printer, Smartphone } from "lucide-react";
import Image from "next/image";

export function ResumePreview() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <Select defaultValue="modern">
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="modern">Modern Professional</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                </Select>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon"><Smartphone /></Button>
                    <Button variant="outline" size="icon"><Laptop /></Button>
                    <Button variant="outline" size="icon"><Printer /></Button>
                </div>
            </div>
            <Card className="flex-1 overflow-auto">
                <CardContent className="p-4 md:p-8">
                     <Image src="https://picsum.photos/800/1120" width={800} height={1120} alt="Resume Preview" className="rounded-md shadow-lg" data-ai-hint="resume document" />
                </CardContent>
            </Card>
        </div>
    )
}
