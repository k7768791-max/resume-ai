
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col h-screen bg-background">
                <AppHeader />
                <main className="flex-1 overflow-y-auto">
                    <SidebarInset>
                        {children}
                    </SidebarInset>
                </main>
            </div>
        </SidebarProvider>
    );
}
