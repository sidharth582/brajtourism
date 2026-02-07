import React, { useState } from "react";
import type { Route } from "./+types/signin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In — Tourism App" },
    { name: "description", content: "Sign in to explore tourism features" },
  ];
}

export default function SignIn() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const timerRef = React.useRef<number | null>(null);

  const FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSfaCyOlVDllXtNTHvlH3TXz8LfVKAqG4MsdUEatx_r8hx76Pw/formResponse";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Validate and allow the normal HTML POST to Google Forms via hidden iframe
    if (!name.trim() || !address.trim() || !stateValue.trim()) {
      e.preventDefault();
      alert("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    // allow default submission
  }

  function handleIframeLoad() {
    if (submitting) {
      setSubmitted(true);
      setSubmitting(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setSubmitted(false), 6000);
    }
  }

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-amber-50 to-rose-50">
      <div className="relative w-full max-w-5xl mx-4">
        {/* Background illustration */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
        >
          <svg
            viewBox="0 0 1200 600"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="60%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#sky)" />
            {/* sun */}
            <circle cx="980" cy="90" r="60" fill="#fff7ed" opacity="0.9" />
            {/* mountains */}
            <path d="M0 420 L200 240 L360 420 Z" fill="#7c3aed" opacity="0.9" />
            <path d="M280 420 L460 200 L680 420 Z" fill="#4f46e5" opacity="0.95" />
            <path d="M560 420 L860 150 L1200 420 L1200 600 L0 600 Z" fill="#312e81" opacity="0.85" />
            {/* ocean / foreground */}
            <path d="M0 460 C150 430 450 480 1200 460 L1200 600 L0 600 Z" fill="#60a5fa" opacity="0.25" />
            {/* a small plane */}
            <g transform="translate(180,80) scale(0.8)">
              <path d="M0 8 L30 0 L34 6 L10 10 Z" fill="#fff" opacity="0.95" />
              <rect x="-10" y="6" width="40" height="6" rx="2" fill="#fff" opacity="0.9" />
            </g>
          </svg>
        </div>

        {/* Content card */}
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 md:p-12 lg:p-16">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Sign in to start your travel journey
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Enter your details to personalize recommendations and saved trips.
            </p>

            {!submitted ? (
              <>
                <iframe
                  title="hidden-signin-target"
                  name="hidden_signin_iframe"
                  ref={iframeRef}
                  style={{ display: "none" }}
                  onLoad={handleIframeLoad}
                />

                <form
                  action={FORM_ACTION}
                  method="POST"
                  target="hidden_signin_iframe"
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Full name
                    </label>
                    <input
                      name="entry.180288810"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Address
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                      placeholder="123 Holiday Rd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      State / Region
                    </label>
                    <input
                      value={stateValue}
                      onChange={(e) => setStateValue(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                      placeholder="California"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white shadow ${submitting ? 'bg-amber-500 opacity-90 cursor-wait' : 'bg-amber-400 hover:bg-amber-500'}`}
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        'Continue'
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Thanks, {name}!</h2>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  We saved your details and will personalize the app for {stateValue}.
                </p>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center justify-center p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Discover destinations
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xs mx-auto">
                Get curated travel ideas, local tips, and saved trip plans based on where you live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// NOTE: this route references a +types file for typegen in this project.
// The project already uses typegen for routes; if you don't have the
// +types/signin.d.ts generated, the import above is harmless at runtime.
