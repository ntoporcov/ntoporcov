import Head from "next/head";

export default function AppStatsPrivacy() {
  return (
    <>
      <Head>
        <title>App Stat Connect Privacy Policy</title>
        <meta
          name="description"
          content="Privacy policy for App Stat Connect, the on-device App Store Connect statistics app."
        />
      </Head>

      <main className="min-h-screen bg-background px-5 py-16 text-black md:px-8 md:py-24">
        <article className="mx-auto max-w-3xl">
          <header className="mb-14 border-b border-gray-200 pb-10 dark:border-gray-100">
            <a
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-primary-500 transition-colors hover:text-primary-600"
            >
              <span aria-hidden="true">&larr;</span>
              ntoporcov.com
            </a>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
              App Stat Connect
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-700">
              Your App Store Connect data stays under your control. The app has
              no developer-operated backend, advertising SDK, or analytics
              tracker.
            </p>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-600">
              Last updated September 1, 2026
            </p>
          </header>

          <div className="space-y-12 text-base leading-7 text-gray-800 dark:text-gray-800">
            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Overview
              </h2>
              <p>
                App Stat Connect, displayed as Stats on your device, helps you
                view sales metrics from your own App Store Connect account. The
                app connects directly from your device to Apple and does not
                send your credentials, reports, or metrics to Nicolas Toporcov
                or to a developer-operated server.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Information stored on your device
              </h2>
              <ul className="list-disc space-y-3 pl-6 marker:text-primary-500">
                <li>
                  Your App Store Connect issuer ID, key ID, vendor number, and
                  imported private key. The credential is stored in the iOS
                  Keychain, is restricted to this device, and does not
                  synchronize through iCloud Keychain.
                </li>
                <li>
                  Sales history, normalized report totals, selected currency,
                  refresh preferences, hidden-app preferences, and display-ready
                  widget snapshots.
                </li>
                <li>
                  Cached public app icons and any sales report files you choose
                  to import. Imported data is processed locally.
                </li>
              </ul>
              <p className="mt-5">
                This information remains on your device until you remove it in
                the app or delete the app. iOS may retain information in a
                device backup according to your device and backup settings.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Network services
              </h2>
              <p className="mb-5">
                App Stat Connect makes requests only when needed to provide its
                features:
              </p>
              <ul className="list-disc space-y-3 pl-6 marker:text-primary-500">
                <li>
                  <strong className="font-semibold text-black">Apple:</strong>{" "}
                  App Store Connect API requests retrieve your app and sales
                  report data. Apple&apos;s public iTunes lookup service may be
                  used to retrieve app artwork.
                </li>
                <li>
                  <strong className="font-semibold text-black">
                    ExchangeRate-API:
                  </strong>{" "}
                  A fixed request to open.er-api.com retrieves public currency
                  exchange rates. Your App Store Connect credential and sales
                  data are not included in that request.
                </li>
              </ul>
              <p className="mt-5">
                These providers may receive standard network information, such
                as your IP address and request metadata, under their own privacy
                policies.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Analytics, tracking, and advertising
              </h2>
              <p>
                The app does not include third-party analytics, advertising,
                cross-app tracking, or data-broker integrations. Nicolas
                Toporcov does not collect, sell, rent, or share your App Store
                Connect data.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Notifications
              </h2>
              <p>
                If you enable a daily refresh reminder, the schedule is stored
                on your device and delivered as a local notification. The app
                does not use a remote push-notification service for these
                reminders.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Security and your choices
              </h2>
              <p>
                You can disconnect your App Store Connect account from the app
                to remove its saved credential, and you can delete the app to
                remove its local data. Protect your private key as you would any
                production credential. Never post a private key, issuer ID,
                vendor number, sales report, or private metric in a public
                support issue.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Children&apos;s privacy
              </h2>
              <p>
                App Stat Connect is a business analytics tool and is not
                directed to children. The developer does not knowingly collect
                personal information from children.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-black">
                Changes and contact
              </h2>
              <p>
                This policy may be updated when the app&apos;s data practices
                change. The date above identifies the latest revision. For
                privacy questions or support, open an issue in the public{" "}
                <a
                  href="https://github.com/ntoporcov/appstats-issues/issues"
                  className="font-medium text-primary-500 underline decoration-primary-500/40 underline-offset-4 transition-colors hover:text-primary-600"
                  target="_blank"
                  rel="noreferrer"
                >
                  App Stat Connect support repository
                </a>
                . Do not include credentials or private account data.
              </p>
            </section>
          </div>

          <footer className="mt-16 border-t border-gray-200 pt-8 text-sm text-gray-500 dark:border-gray-100 dark:text-gray-600">
            &copy; 2026 Nicolas Toporcov
          </footer>
        </article>
      </main>
    </>
  );
}
