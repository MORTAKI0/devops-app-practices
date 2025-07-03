// src/app/layout.tsx
export const metadata = {
    title: 'Todo App',
    description: 'My simple Next.js Supabase Todo App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-black text-white">{children}</body>
        </html>
    );
}
