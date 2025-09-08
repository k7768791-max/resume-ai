
'use client';

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-muted/40">
                <AppSidebar />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
                    <AppHeader />
                    <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
