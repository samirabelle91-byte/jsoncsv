import { Link } from 'react-router';
import { Separator } from '@/components/ui/separator';
import { Database } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Support', href: '/support' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-cyan to-primary-teal">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="body-md font-semibold">CSV Transformer Studio</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="body-sm text-muted-foreground hover:text-primary-cyan transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center body-sm text-muted-foreground">
          © 2025 CSV Transformer Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}