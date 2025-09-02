import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/privacy')({
  component: RouteComponent,
  head: () => {
    return {
      meta: [
        {
          title: 'Privacy Policy | RTS Build Orders',
        },
        {
          name: 'description',
          content: 'Privacy Policy for RTS Build Orders',
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="mb-6 font-bold text-3xl">
        RTS Build Orders Privacy Policy
      </h1>

      <p className="text-gray-600 dark:text-gray-400">
        Effective Date: August 16, 2025
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        RTS Build Orders ("we", "our", "us") respects your privacy. This Privacy
        Policy describes how we collect, use, and protect your personal
        information when you use our website and services for viewing and
        creating real-time strategy game build orders ("Service").
      </p>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">1. Information We Collect</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We may collect the following types of information:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-xl">a. Account Information:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              When you create an account, we collect your email address,
              username, and any other profile information you provide
              voluntarily.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-xl">b. Build Order Content:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We collect and store the build orders you create, including unit
              production sequences, resource allocations, timing information,
              game-specific data, and any descriptions or notes you provide.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-xl">c. Usage Data:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We may collect data about your interactions with the Service, such
              as browser type, device information, IP address, time of access,
              pages visited, build orders viewed, and search queries.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-xl">d. Community Interactions:</h3>
            <p className="text-gray-700 dark:text-gray-300">
              We collect data about your interactions with build orders, such as
              ratings, favorites, comments, and sharing activities.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We use your information to:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
          <li>Operate, maintain, and improve the Service.</li>
          <li>Enable you to create, edit, and share build orders.</li>
          <li>
            Display build orders to other users when you choose to make them
            public.
          </li>
          <li>Provide search and filtering functionality for build orders.</li>
          <li>
            Communicate with you about updates, support, or service-related
            messages.
          </li>
          <li>
            Detect, prevent, and address technical issues or policy violations.
          </li>
          <li>
            Analyze usage patterns to improve our build order database and user
            experience.
          </li>
          <li>Comply with legal obligations.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">3. Data Sharing</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We do not sell your personal information. We only share information
          under the following circumstances:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Public Build Orders:</strong> Build orders you choose to
            make public are visible to all users of the Service and may be
            indexed by search engines.
          </li>
          <li>
            <strong>Service Providers:</strong> Trusted third parties who help
            us operate the Service (e.g., hosting providers, analytics services,
            email providers).
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required by law, subpoena,
            or to protect our rights and users.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">4. Your Rights and Choices</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Depending on your jurisdiction, you may have rights to:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
          <li>Access, update, or delete your account data and build orders.</li>
          <li>Request a copy of your personal data.</li>
          {/* <li>Make your build orders private or public at any time.</li> */}
          <li>Delete individual build orders or your entire account.</li>
          <li>Object to or restrict certain uses of your data.</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          To exercise these rights, contact us on X at{' '}
          <a href="https://x.com/brennendav1s" rel="noopener" target="_blank">
            @brennendav1s
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">5. Data Retention</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We retain personal information for as long as necessary to fulfill the
          purposes outlined in this policy. Build orders and user data may be
          retained indefinitely to maintain the integrity of our database, but
          can be deleted upon user request or account deletion.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">6. Cookies and Analytics</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We may use cookies and third-party analytics tools to understand usage
          patterns and improve the Service. You can disable cookies through your
          browser settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">7. Security</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We implement reasonable security measures to protect your data.
          However, no system is 100% secure. You use the Service at your own
          risk.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">8. Children's Privacy</h2>
        <p className="text-gray-700 dark:text-gray-300">
          RTS Build Orders is not intended for children under 13. We do not
          knowingly collect personal information from children under 13 years of
          age.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">9. Changes to This Policy</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes by email or through the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-semibold text-2xl">10. Contact Us</h2>
        <p className="text-gray-700 dark:text-gray-300">
          For privacy-related questions or requests, contact:
        </p>
      </section>
      <p className="text-blue-600 hover:underline dark:text-blue-400">
        <a href="https://x.com/brennendav1s" rel="noopener" target="_blank">
          @brennendav1s on X
        </a>
      </p>
    </div>
  );
}
