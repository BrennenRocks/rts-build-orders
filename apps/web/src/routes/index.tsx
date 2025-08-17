/** biome-ignore-all lint/style/noNestedTernary: complex conditional UI state requires nested ternary */

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRightIcon, CheckIcon, MailIcon } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/utils/trpc';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false);
  const { mutateAsync: signup } = useMutation(
    trpc.newsletter.signup.mutationOptions()
  );

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async () => {
      const result = await signup({ email: form.state.values.email });
      if (result.message === 'You are already subscribed to the waitlist') {
        setIsAlreadySubscribed(true);
      } else {
        setIsSubmitted(true);
      }
    },
    validators: {
      onSubmit: z.object({
        email: z
          .email('Please enter a valid email address')
          .min(1, 'Please enter your email address'),
      }),
    },
  });

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
      <div className="absolute inset-0 mt-20 flex flex-col items-center justify-center px-4 text-center md:justify-start md:pt-72">
        <div className="w-full max-w-md px-4 sm:px-0">
          {isSubmitted ? (
            <div className="fade-in-0 slide-in-from-bottom-4 animate-in rounded-lg border border-success/50 bg-success/40 p-4 text-center duration-500 sm:p-6">
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
                  {form.state.values.email}
                </span>
              </p>
              <p className="text-success-foreground/90 text-xs">
                Click the link in your email to complete your signup and get
                notified when build orders are ready.
              </p>
            </div>
          ) : isAlreadySubscribed ? (
            <div className="fade-in-0 slide-in-from-bottom-4 animate-in rounded-lg border border-info/50 bg-info/40 p-4 text-center duration-500 sm:p-6">
              <div className="mb-3">
                <div className="zoom-in mx-auto flex h-12 w-12 animate-in items-center justify-center rounded-full bg-info/50 duration-300">
                  <CheckIcon className="h-6 w-6 text-info-foreground" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-info-foreground text-lg">
                You're already signed up!
              </h3>
              <p className="mb-4 text-info-foreground/90 text-sm leading-relaxed">
                <span className="font-medium text-info-foreground">
                  {form.state.values.email}
                </span>{' '}
                is already subscribed to our waitlist.
              </p>
              <p className="text-info-foreground/90 text-xs">
                You'll be notified when build orders are ready.
              </p>
            </div>
          ) : (
            <form.Subscribe>
              {(state) => (
                <div
                  className={`transition-all duration-500 ease-out ${state.isSubmitting ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
                >
                  <form
                    className="space-y-4"
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                  >
                    <div className="group relative">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                      <p className="mb-2 text-foreground/80 text-sm leading-relaxed">
                        Be the first to get notified when we launch
                      </p>

                      <form.Field name="email">
                        {(field) => (
                          <div className="space-y-2">
                            <div className="relative flex items-center overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 group-focus-within:shadow-md group-focus-within:ring-2 group-focus-within:ring-ring/20 group-hover:shadow-md">
                              <div className="flex items-center pl-3 text-muted-foreground">
                                <MailIcon className="h-4 w-4" />
                              </div>

                              <Input
                                autoComplete="email"
                                className="flex-1 border-0 bg-card px-3 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-card"
                                disabled={state.isSubmitting}
                                hasError={
                                  field.state.meta.isTouched &&
                                  field.state.meta.errors.length > 0
                                }
                                id={field.name}
                                name={field.name}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                placeholder="Enter your email"
                                type="email"
                                value={field.state.value}
                              />

                              <Button
                                className="group/button m-1 px-4 transition-all duration-300 active:scale-95"
                                disabled={
                                  !state.canSubmit ||
                                  state.isSubmitting ||
                                  !field.state.value
                                }
                                size="sm"
                                type="submit"
                              >
                                <span className="ml-2 hidden sm:inline">
                                  {state.isSubmitting ? 'Adding...' : 'Join'}
                                </span>
                                {state.isSubmitting ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : (
                                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                                )}
                              </Button>
                            </div>
                            {field.state.meta.errors.map((error) => (
                              <p
                                className="text-destructive text-sm dark:text-red-400 dark:drop-shadow-sm"
                                key={error?.message}
                              >
                                {error?.message}
                              </p>
                            ))}
                          </div>
                        )}
                      </form.Field>
                    </div>
                  </form>
                </div>
              )}
            </form.Subscribe>
          )}
        </div>

        {/* Game images - shown under input on mobile, at bottom on desktop */}
        <div className="mt-6 w-full max-w-4xl px-4 md:hidden">
          <p className="mb-4 text-center text-foreground/60 text-xs">
            Follow along on{' '}
            <a
              className="text-primary underline transition-colors hover:text-primary/80"
              href="https://x.com/elevated_sw"
              rel="noopener noreferrer"
              target="_blank"
            >
              X
            </a>{' '}
            as I build RTS Build Orders in public
          </p>
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
          <p className="mb-6 text-center text-foreground/60 text-sm">
            Follow along on{' '}
            <a
              className="text-primary underline transition-colors hover:text-primary/80"
              href="https://x.com/elevated_sw"
              rel="noopener noreferrer"
              target="_blank"
            >
              X
            </a>{' '}
            as I build RTS Build Orders in public
          </p>

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
