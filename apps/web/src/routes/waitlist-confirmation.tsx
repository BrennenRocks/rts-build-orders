import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { CheckIcon, LoaderIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trpc } from '@/utils/trpc';

export const Route = createFileRoute('/waitlist-confirmation')({
  validateSearch: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
  beforeLoad: ({ search }) => {
    if (!search.token) {
      throw redirect({ to: '/' });
    }
  },
  component: RouteComponent,
});

type ConfirmationState = 'loading' | 'success' | 'error';

function RouteComponent() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { mutateAsync: confirmNewsletter } = useMutation(
    trpc.newsletter.confirm.mutationOptions()
  );

  useEffect(() => {
    const confirmToken = async () => {
      try {
        await confirmNewsletter({ token });
        setConfirmationState('success');
      } catch (error) {
        setConfirmationState('error');
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to confirm email'
        );
      }
    };

    confirmToken();
  }, [token, confirmNewsletter]);

  return (
    <div className="relative h-svh w-full">
      <div className="absolute inset-0 bg-[url('https://images.rtsbuildorders.com/mobile_day.webp')] bg-center bg-cover md:bg-[url('https://images.rtsbuildorders.com/desktop_day.webp')] dark:bg-[url('https://images.rtsbuildorders.com/mobile_night.webp')] dark:md:bg-[url('https://images.rtsbuildorders.com/desktop_night.webp')]" />

      {/* Bottom overlay for better game image visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

      {/* Top content - always at top */}
      <div className="absolute inset-x-0 top-0 flex flex-col items-center px-4 pt-20 text-center md:pt-24">
        <Badge className="mb-3 md:mb-4" variant="secondary">
          Outthink. Outbuild. Outplay.
        </Badge>

        <h1 className="mb-4 text-balance text-center font-bold text-3xl text-foreground tracking-tight drop-shadow-lg sm:text-4xl md:mb-6 md:text-5xl lg:text-7xl">
          Stop Guessing Your First Moves
        </h1>

        <p className="mb-6 max-w-2xl px-2 text-base text-foreground/90 drop-shadow sm:text-lg md:mb-8 md:px-0">
          Gain the edge with build orders used by the pros that turn your
          opening moves into unstoppable momentum and keep you ahead until the
          final blow
        </p>
      </div>

      {/* Form content - centered on mobile, under top content on desktop */}
      <div className="absolute inset-0 mt-4 flex flex-col items-center justify-center px-4 text-center md:justify-start md:pt-72">
        <div className="w-full max-w-md px-4 sm:px-0">
          <div
            className={cn(
              'fade-in-0 slide-in-from-bottom-4 animate-in rounded-lg border p-4 text-center duration-500 sm:p-6',
              confirmationState === 'error' &&
                'border-destructive/50 bg-destructive/20',
              confirmationState === 'success' &&
                'border-success/50 bg-success/20',
              confirmationState === 'loading' &&
                'border-primary/50 bg-primary/20'
            )}
          >
            {confirmationState === 'loading' && (
              <>
                <div className="mb-3">
                  <div className="zoom-in mx-auto flex h-12 w-12 animate-in items-center justify-center rounded-full bg-primary/20 duration-300">
                    <LoaderIcon className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-lg">
                  Confirming your email...
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Please wait while we verify your email address.
                </p>
              </>
            )}

            {confirmationState === 'success' && (
              <>
                <div className="mb-3">
                  <div className="zoom-in mx-auto flex h-12 w-12 animate-in items-center justify-center rounded-full bg-success/50 duration-300">
                    <CheckIcon className="h-6 w-6 text-success-foreground" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-lg text-success-foreground">
                  Welcome to the waitlist!
                </h3>
                <p className="mb-4 text-sm text-success-foreground/90 leading-relaxed">
                  Your email has been successfully confirmed. You're now on the
                  waitlist and will be notified when build orders are ready.
                </p>
                <p className="text-success-foreground/70 text-xs">
                  Get ready to dominate with pro-level strategies!
                </p>
              </>
            )}

            {confirmationState === 'error' && (
              <>
                <div className="mb-3">
                  <div className="zoom-in mx-auto flex h-12 w-12 animate-in items-center justify-center rounded-full bg-destructive/50 duration-300">
                    <XIcon className="h-6 w-6 text-destructive-foreground" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-destructive-foreground text-lg">
                  Confirmation failed
                </h3>
                <p className="mb-4 text-destructive-foreground/90 text-sm leading-relaxed">
                  {errorMessage || 'Unable to confirm your email address.'}
                </p>
                <p className="mb-4 text-destructive-foreground/70 text-xs">
                  The link may have expired or already been used. Please try
                  signing up again.
                </p>
                <Button
                  className="w-full"
                  onClick={() => navigate({ to: '/' })}
                  type="button"
                  variant="outline"
                >
                  Try Again
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Game images - shown under confirmation on mobile, at bottom on desktop */}
        <div className="mt-6 w-full max-w-4xl px-4 md:hidden">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <img
              alt="Stormgate"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-16 w-auto rounded-xl opacity-90 transition-all duration-300 hover:opacity-100 sm:h-16"
              src="https://images.rtsbuildorders.com/stormgate.webp"
            />
            <img
              alt="Age of Empires 4"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-16 w-auto rounded-xl opacity-90 transition-all duration-300 hover:opacity-100 sm:h-16"
              src="https://images.rtsbuildorders.com/aoe4.webp"
            />
            <img
              alt="WarCraft 3"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-16 w-auto rounded-xl opacity-90 transition-all duration-300 hover:opacity-100 sm:h-16"
              src="https://images.rtsbuildorders.com/warcraft3.webp"
            />
            <img
              alt="StarCraft 2"
              className="mask-radial-from-80% mask-radial-to-100% mask-radial-at-center h-16 w-auto rounded-xl opacity-90 transition-all duration-300 hover:opacity-100 sm:h-16"
              src="https://images.rtsbuildorders.com/starcraft2.webp"
            />
          </div>
        </div>
      </div>

      {/* Bottom content - desktop only */}
      <div className="absolute right-0 bottom-4 left-0 hidden px-4 md:bottom-8 md:block">
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
