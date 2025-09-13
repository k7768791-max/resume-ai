import Link from 'next/link';
import { Logo } from '../icons';
import { Button } from '../ui/button';
import { Mail, Twitter, Facebook } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-7 w-7 text-primary" />
              <span className="font-bold font-headline text-xl">ResumeAI</span>
            </Link>
            <p className="text-muted-foreground text-sm">Build better resumes with the power of AI.</p>
          </div>
          <div>
            <h4 className="font-headline text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/templates" className="text-sm text-muted-foreground hover:text-primary">Templates</Link></li>
              <li><Link href="/ats-analyzer" className="text-sm text-muted-foreground hover:text-primary">ATS Check</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/#about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/#faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:support@resumeai.com"><Mail className="h-4 w-4" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Twitter className="h-4 w-4" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#"><Facebook className="h-4 w-4" /></Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
