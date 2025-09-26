import SideNav from '@/app/ui/dashboard/sidenav';

// destructures props into children property, which must be of type React.ReactNode
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        // stacked vertical by default on mobile but at md breakpoint, switch to row layout 
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            {/* full width by default on mobile but at md breakpoint switch to 64 */}
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            {/* fill remaining space, at md breakpoint scrollable and more padding */}
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}

