/** biome-ignore-all lint/style/noNestedTernary: complex conditional UI state requires nested ternary */
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRightIcon, CheckIcon, MailIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="relative h-svh w-full">
      <div className="absolute inset-0 bg-[url('https://images.rtsbuildorders.com/desktop_day.webp')] bg-center bg-cover dark:bg-[url('https://images.rtsbuildorders.com/desktop_night.webp')]" />

      {/* Bottom overlay for better game image visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-start px-4 pt-24 text-center">
        <Badge className="mb-4" variant="secondary">
          Outthink. Outbuild. Outplay.
        </Badge>

        <h1 className="mb-6 text-balance text-center font-bold text-5xl text-foreground tracking-tight drop-shadow-lg md:text-7xl">
          Strategy Is Your Strongest Weapon
        </h1>

        <p className="mb-8 max-w-2xl text-foreground/90 text-lg drop-shadow">
          Gain the edge with expertly crafted build orders that turn your
          opening moves into unstoppable momentum and keep you ahead until the
          final blow.
        </p>

        <div className="w-full max-w-md">
          {isSubmitted ? (
            <div className="fade-in-0 slide-in-from-bottom-4 animate-in rounded-lg border border-success/50 bg-success/40 p-6 text-center duration-500">
              <div className="mb-3">
                <div className="zoom-in mx-auto flex h-12 w-12 animate-in items-center justify-center rounded-full bg-success/50 duration-300">
                  <CheckIcon className="h-6 w-6 text-success-foreground" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-lg text-success-foreground">
                Almost there!
              </h3>
              <p className="mb-4 text-sm text-success-foreground/90 leading-relaxed">
                We've sent a confirmation email to{' '}
                <span className="font-medium text-success-foreground">
                  {email}
                </span>
              </p>
              <p className="text-success-foreground/90 text-xs">
                Click the link in your email to complete your signup and get
                notified when build orders are ready.
              </p>
            </div>
          ) : (
            <div
              className={`transition-all duration-500 ease-out ${isSubmitting ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
            >
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="group relative">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 group-focus-within:shadow-md group-focus-within:ring-2 group-focus-within:ring-ring/20 group-hover:shadow-md">
                    <div className="flex items-center pl-3 text-muted-foreground">
                      <MailIcon className="h-4 w-4" />
                    </div>

                    <Input
                      autoComplete="email"
                      className="flex-1 border-0 bg-card px-3 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-card"
                      disabled={isSubmitting}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      type="email"
                      value={email}
                    />

                    <Button
                      className="m-1 px-4 transition-all duration-300 hover:scale-105 active:scale-95"
                      disabled={isSubmitting || !email}
                      size="sm"
                      type="submit"
                    >
                      <span className="ml-2 hidden sm:inline">
                        {isSubmitting ? 'Adding...' : 'Join'}
                      </span>
                      {isSubmitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute right-0 bottom-8 left-0 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-8">
            <img
              alt="Stormgate"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-32 w-auto rounded-3xl opacity-90 transition-all duration-300 hover:opacity-100"
              src="https://images.rtsbuildorders.com/stormgate.webp"
            />
            <img
              alt="Age of Empires 4"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-32 w-auto rounded-3xl opacity-90 transition-all duration-300 hover:opacity-100"
              src="https://images.rtsbuildorders.com/aoe4.webp"
            />
            <img
              alt="WarCraft 3"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-32 w-auto rounded-3xl opacity-90 transition-all duration-300 hover:opacity-100"
              src="https://images.rtsbuildorders.com/warcraft3.webp"
            />
            <img
              alt="StarCraft 2"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-32 w-auto rounded-3xl opacity-90 transition-all duration-300 hover:opacity-100"
              src="https://images.rtsbuildorders.com/starcraft2.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
