import { SignupForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">ResumeAI</span>
        </Link>
      </div>
      <SignupForm />
    </div>
  );
}
