// src/app/layout.tsx

import './globals.css';

export const metadata = {
    title: 'Todo App',
    description: 'My simple Next.js Supabase Todo App',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            {children}
        </div>
        </body>
        </html>
    );
}
