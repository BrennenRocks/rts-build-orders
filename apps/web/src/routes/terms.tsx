import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/terms')({
  head: () => {
    return {
      meta: [
        {
          title: 'Terms of Service | RTS Build Orders',
        },
        {
          name: 'description',
          content: 'Terms of Service for RTS Build Orders',
        },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="mb-6 font-bold text-3xl">
        RTS Build Orders Terms of Service
      </h1>
      <p className="text-gray-600 text-sm dark:text-gray-400">
        Last Updated: August 16, 2025
      </p>

      <p>
        Welcome to <span className="font-semibold">RTS Build Orders</span>.
        These Terms of Service ("Terms") govern your access to and use of the{' '}
        <span className="font-semibold">RTS Build Orders</span> website and
        services ("Service"). By accessing or using our Service, you agree to be
        bound by these Terms.
      </p>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">1. Description of Service</h2>
        <p>
          <span className="font-semibold">RTS Build Orders</span> is a platform
          dedicated to real-time strategy (RTS) gaming communities. We provide
          tools and services for players to create, share, discover, and
          optimize build orders for various RTS games including but not limited
          to StarCraft II, Age of Empires, Stormgate, and Warcraft 3.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">
          2. User Accounts and Responsibilities
        </h2>
        <p>
          By using <span className="font-semibold">RTS Build Orders</span>, you
          agree to:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Provide accurate, current, and complete information when creating an
            account or submitting build orders.
          </li>
          <li>
            Maintain the confidentiality and security of your account
            credentials and be responsible for all activities under your
            account.
          </li>
          <li>
            Comply with all applicable local, national, and international laws
            and regulations while using our Service.
          </li>
          <li>
            Respect the intellectual property rights of game developers and
            other users.
          </li>
          <li>
            Not use the Service to distribute malicious content, spam, or engage
            in harassment of other community members.
          </li>
          <li>
            Not attempt to reverse engineer, hack, or exploit our platform or
            interfere with other users' experience.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">
          3. Content and Intellectual Property
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            You retain ownership of the original build orders, strategies, and
            content you create and submit to{' '}
            <span className="font-semibold">RTS Build Orders</span>.
          </li>
          <li>
            By submitting content to our platform, you grant us a non-exclusive,
            worldwide, royalty-free license to host, display, and distribute
            your content as part of the Service.
          </li>
          <li>
            You represent that you have the right to share any content you
            submit and that it does not infringe on third-party rights.
          </li>
          <li>
            Game-related content, names, and trademarks remain the property of
            their respective owners. Our Service is provided for educational and
            community purposes under fair use principles.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">
          4. Community Guidelines and Prohibited Content
        </h2>
        <p>
          To maintain a positive gaming community, you may not use{' '}
          <span className="font-semibold">RTS Build Orders</span> to create or
          share content that:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Violates Game Terms:</strong> Promotes cheating, exploits,
            or activities that violate the terms of service of any RTS game.
          </li>
          <li>
            <strong>Harassment:</strong> Contains personal attacks, toxic
            behavior, or harassment directed at other players or community
            members.
          </li>
          <li>
            <strong>Misinformation:</strong> Deliberately spreads false
            information about game mechanics, strategies, or other players.
          </li>
          <li>
            <strong>Spam or Low-Quality Content:</strong> Repetitive, off-topic,
            or content that doesn't contribute meaningfully to the RTS
            community.
          </li>
          <li>
            <strong>Copyright Infringement:</strong> Unauthorized use of
            copyrighted game assets, images, or content beyond fair use for
            educational purposes.
          </li>
          <li>
            <strong>Inappropriate Content:</strong> Adult content, hate speech,
            or content unrelated to RTS gaming and strategy discussion.
          </li>
          <li>
            <strong>Commercial Spam:</strong> Unauthorized advertising or
            promotion of products/services unrelated to RTS gaming.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">
          5. Build Orders and Strategy Content
        </h2>
        <p>
          <span className="font-semibold">RTS Build Orders</span> serves as a
          community platform for sharing gaming strategies. Please note:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Build orders and strategies are provided by community members and
            are not guaranteed to be optimal or current with the latest game
            patches.
          </li>
          <li>
            Game balance changes may affect the effectiveness of published build
            orders. Users should verify strategies against current game
            versions.
          </li>
          <li>
            We encourage testing and adaptation of build orders rather than
            blind copying, as RTS games require situational awareness.
          </li>
          <li>
            Credit should be given to original creators when sharing or
            modifying existing build orders.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">
          6. Service Availability and Modifications
        </h2>
        <p>
          We strive to maintain consistent service availability but reserve the
          right to:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Modify, update, or discontinue features of the Service with
            reasonable notice.
          </li>
          <li>
            Perform maintenance that may temporarily affect service
            availability.
          </li>
          <li>
            Update these Terms as needed, with changes taking effect upon
            posting.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">7. Account Termination</h2>
        <p>We reserve the right to suspend or terminate accounts that:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Violate these Terms or our community guidelines</li>
          <li>Engage in disruptive behavior that harms the community</li>
          <li>Attempt to exploit or abuse the platform</li>
          <li>Remain inactive for extended periods (with reasonable notice)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">
          8. Disclaimers and Limitation of Liability
        </h2>
        <p>
          The Service is provided "as is" without warranties. We are not liable
          for:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Loss of game matches due to following community-provided strategies
          </li>
          <li>Changes in game balance that affect published build orders</li>
          <li>
            User-generated content or interactions with other community members
          </li>
          <li>Technical issues or temporary service interruptions</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">9. Contact Information</h2>
        <p>
          For questions about these Terms, community guidelines, or platform
          issues, please contact us at:
        </p>
        <p className="text-blue-600 hover:underline dark:text-blue-400">
          <a href="https://x.com/brennendav1s" rel="noopener" target="_blank">
            @brennendav1s on X
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-xl">10. Governing Law</h2>
        <p>
          These Terms are governed by applicable laws. Any disputes will be
          resolved through appropriate legal channels. By using our Service, you
          acknowledge that you have read, understood, and agree to be bound by
          these Terms.
        </p>
      </section>
    </div>
  );
}
