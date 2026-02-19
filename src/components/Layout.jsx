import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import CanvasBackground from './CanvasBackground'

export default function Layout() {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Interactive Canvas Background */}
            <CanvasBackground />

            {/* Background radial gradients for texture */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl" />
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
