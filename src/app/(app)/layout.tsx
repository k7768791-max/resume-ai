
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
            <div className="flex h-screen bg-background">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <AppHeader />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
