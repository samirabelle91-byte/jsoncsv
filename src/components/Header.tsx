import { Link } from 'react-router';
import { Menu, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';

export function Header() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Transform', href: '/transform' },
    { label: 'History', href: '/history' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary-cyan to-primary-teal">
            <Database className="w-6 h-6 text-white" />
          </div>
          <span className="heading-sm hidden md:block">CSV Transformer Studio</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 body-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:flex bg-primary-cyan hover:bg-primary-cyan/90">
            <Link to="/login">Sign In</Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="body-lg font-medium hover:text-primary-cyan transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="mt-4 bg-primary-cyan hover:bg-primary-cyan/90">
                  <Link to="/login">Sign In</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}