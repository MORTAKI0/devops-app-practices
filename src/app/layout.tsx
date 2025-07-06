import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata = {
    title: 'Todo Galaxy - Organize Your Universe',
    description: 'A beautiful, modern todo app built with Next.js and Supabase. Organize your tasks in style.',
    keywords: ['todo', 'task management', 'productivity', 'next.js', 'supabase'],
    authors: [{ name: 'Sundar Gurung', url: 'https://todo.dev' }],
    creator: 'Sundar Gurung',
    publisher: 'Todo Galaxy',
    openGraph: {
        title: 'Todo Galaxy - Organize Your Universe',
        description: 'A beautiful, modern todo app built with Next.js and Supabase',
        url: 'https://todo.dev',
        siteName: 'Todo Galaxy',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Todo Galaxy - Organize Your Universe',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Todo Galaxy - Organize Your Universe',
        description: 'A beautiful, modern todo app built with Next.js and Supabase',
        images: ['/og-image.jpg'],
        creator: '@sundargurung',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: '/manifest.json',
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
                color: '#8b5cf6',
            },
        ],
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
    ],
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    verification: {
        google: 'your-google-site-verification-code',
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
        <head>
            {/* Preconnect to external domains */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* DNS prefetch for better performance */}
            <link rel="dns-prefetch" href="https://supabase.com" />

            {/* Additional meta tags */}
            <meta name="format-detection" content="telephone=no" />
            <meta name="msapplication-TileColor" content="#8b5cf6" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* Security headers */}
            <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
            <meta httpEquiv="X-Frame-Options" content="DENY" />
            <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

            {/* Progressive Web App meta tags */}
            <meta name="application-name" content="Todo Galaxy" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="Todo Galaxy" />
            <meta name="mobile-web-app-capable" content="yes" />

            {/* Structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Todo Galaxy',
                        description: 'A beautiful, modern todo app built with Next.js and Supabase',
                        url: 'https://todo.dev',
                        applicationCategory: 'ProductivityApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        author: {
                            '@type': 'Person',
                            name: 'Sundar Gurung',
                        },
                    }),
                }}
            />
        </head>
        <body className={`${inter.className} antialiased`}>
        {/* Background pattern overlay */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
            className="fixed inset-0 opacity-10 pointer-events-none"
            style={{
                backgroundImage: `
                            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
                        `,
                backgroundSize: '50px 50px'
            }}
        />

        {/* Main content */}
        <div className="relative z-10">
            {children}
        </div>

        {/* Loading indicator for better UX */}
        <div id="loading-overlay" className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl">
                    <span className="text-2xl">✨</span>
                </div>
                <div className="text-white text-xl font-semibold mb-2">Todo Galaxy</div>
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                </div>
            </div>
        </div>

        {/* Performance monitoring script */}
        <script
            dangerouslySetInnerHTML={{
                __html: `
                            // Simple performance monitoring
                            window.addEventListener('load', function() {
                                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                                console.log('Page load time:', loadTime + 'ms');
                            });
                            
                            // Show loading indicator for slower connections
                            if (navigator.connection && navigator.connection.effectiveType === '2g') {
                                document.getElementById('loading-overlay').style.opacity = '1';
                                document.getElementById('loading-overlay').style.pointerEvents = 'auto';
                                setTimeout(() => {
                                    document.getElementById('loading-overlay').style.opacity = '0';
                                    document.getElementById('loading-overlay').style.pointerEvents = 'none';
                                }, 1000);
                            }
                        `,
            }}
        />
        </body>
        </html>
    );
}