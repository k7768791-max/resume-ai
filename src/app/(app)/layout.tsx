
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
            <AppSidebar />
            <div className="flex flex-col flex-1">
                <AppHeader />
                <main className="flex-1 bg-muted/40">{children}</main>
            </div>
        </SidebarProvider>
    );
}
