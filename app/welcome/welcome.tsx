import React, { useState, useRef } from "react";

export function Welcome() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const packageDetails = [
    {
      id: 1,
      title: "Sample Package 1",
      duration: "1 Day",
      itinerary:
        "Morning: Temple visit. Afternoon: Local market and cultural walk. Evening: Aarti at the ghats.",
    },
    { id: 2, title: "Sample Package 2", duration: "2 Days", itinerary: "Day 1: Temple tour. Day 2: Village excursion and local shows." },
    { id: 3, title: "Sample Package 3", duration: "3 Days", itinerary: "Multi-day pilgrimage with guided visits and comfortable stays." },
    { id: 4, title: "Sample Package 4", duration: "1 Day", itinerary: "Quick spiritual getaway with highlights and transport included." },
    { id: 5, title: "Sample Package 5", duration: "2 Days", itinerary: "Excursion covering nearby towns, meals, and a guided tour." },
    { id: 6, title: "Sample Package 6", duration: "3 Days", itinerary: "Extended package with temple visits, cultural programs and leisure time." },
  ];

  function closeModal() {
    setSelectedPackage(null);
  }

  const FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSfaCyOlVDllXtNTHvlH3TXz8LfVKAqG4MsdUEatx_r8hx76Pw/formResponse";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Validate; if invalid, prevent the form submission
    if (!name.trim() || !email.trim()) {
      e.preventDefault();
      alert("Please provide at least your name and email.");
      return;
    }
    // Allow the browser to submit the form normally to Google Forms via the hidden iframe
    setSubmitting(true);
    // do not call e.preventDefault()
  }

  function handleIframeLoad() {
    // iframe loads on mount too; only treat it as a successful submit when we are submitting
    if (submitting) {
      setSubmitted(true);
      setSubmitting(false);
      // optionally reset fields
      setName("");
      setEmail("");
      setPhone("");
      // hide the success message after 3 seconds
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => setSubmitted(false), 3000);
    }
  }

  // clear timeout on unmount
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-amber-400 flex items-center justify-center text-white font-bold">V</div>
              <div>
                <div className="text-sm font-semibold">Vrindavan</div>
                <div className="text-xs text-gray-500">Packages</div>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="text-amber-600 font-medium" href="#">Home</a>
            <a className="text-gray-600 hover:text-gray-900" href="#packages">Packages</a>
            <a className="text-gray-600 hover:text-gray-900" href="#">Our Services</a>
          </nav>

          <div className="flex items-center gap-4">
            <a className="hidden md:inline-block rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow" href="#">Check Availability</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left hero */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-amber-800">
              Mathura Vrindavan
              <br />
              Tour Packages
            </h1>
            <p className="mt-6 text-gray-600 max-w-2xl">
              Avail best discount on Mathura Vrindavan Packages today! Explore curated
              itineraries, expert guides, and special offers tailored to your needs.
            </p>

            {/* CTA removed per request */}
          </div>

          {/* Right enquiry card */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-amber-200 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-amber-700">Planning a Trip? Get a Free Quote</h3>
                <p className="mt-1 text-sm text-gray-500">Enquire Now and get additional free benefits</p>

                {/* Hidden iframe used to POST to Google Forms without redirecting the user */}
                <iframe
                  title="hidden-form-target"
                  name="hidden_iframe"
                  ref={iframeRef}
                  style={{ display: "none" }}
                  onLoad={handleIframeLoad}
                />

                <form
                  action={FORM_ACTION}
                  method="POST"
                  target="hidden_iframe"
                  onSubmit={handleSubmit}
                  className="mt-4 space-y-4"
                >
                  {/* Google Form field names (entry.<id>) map to your form fields */}
                  <input type="hidden" name="usp" value="pp_url" />
                  <div>
                    <label className="sr-only">Your name</label>
                    <input
                      type="text"
                      name="entry.180288810"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-amber-100 bg-amber-50 px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Email</label>
                    <input
                      type="email"
                      name="entry.1051977811"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-amber-100 bg-amber-50 px-4 py-3 text-sm"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Phone</label>
                    <input
                      type="tel"
                      name="entry.460200192"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-md border border-amber-100 bg-amber-50 px-4 py-3 text-sm"
                    />
                  </div>

                  {/* date field removed per request */}

                  <div>
                    <button
                      type="submit"
                      className={`w-full rounded-md px-4 py-3 text-white font-medium ${submitting ? 'bg-amber-600 opacity-90 cursor-wait' : 'bg-amber-500 hover:bg-amber-600'}`}
                      disabled={submitting}
                      aria-busy={submitting}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center justify-center gap-3 w-full">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                          <span>Submitting...</span>
                        </span>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </form>
                {submitted && (
                  <div className="mt-4 rounded-md bg-emerald-50 border border-emerald-100 p-3 text-sm text-emerald-700">
                    Thanks — your enquiry was submitted. You will be contacted shortly by our team!
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Packages section */}
      <section id="packages" className="container mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-amber-700 text-center">Our Best Mathura Vrindavan Packages</h2>
        <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
          Explore some of our most popular itineraries. (Images are placeholders — replace with your photos later.)
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Package 1 - customize separately */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="h-48 bg-gray-100">
                <img
                  src="/images/img1.jpeg"
                  alt="Package 1"
                  className="w-full h-full object-cover"
                />
              </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration 1 Day</div>
              <h3 className="mt-2 font-semibold text-amber-700">Sample Package 1</h3>
              <p className="mt-2 text-sm text-gray-600">A short description of package 1. Replace with real content later.</p>
              <div className="mt-4 flex gap-3">
                  <button className="flex-1 rounded-md border border-amber-500 text-amber-500 px-3 py-2 text-sm">Enquire Now</button>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(1)}
                    className="flex-1 rounded-md bg-amber-500 text-white px-3 py-2 text-sm"
                  >
                    Know More
                  </button>
              </div>
            </div>
          </article>

          {/* Package 2 */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="h-48 bg-gray-100">
              <img
                src="/images/img2.jpeg"
                alt="Package 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration 2 Days</div>
              <h3 className="mt-2 font-semibold text-amber-700">Sample Package 2</h3>
              <p className="mt-2 text-sm text-gray-600">A short description of package 2. Replace with real content later.</p>
              <div className="mt-4 flex gap-3">
                  <button className="flex-1 rounded-md border border-amber-500 text-amber-500 px-3 py-2 text-sm">Enquire Now</button>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(2)}
                    className="flex-1 rounded-md bg-amber-500 text-white px-3 py-2 text-sm"
                  >
                    Know More
                  </button>
              </div>
            </div>
          </article>

          {/* Package 3 */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="h-48 bg-gray-100">
              <img
                src="/images/img3.jpeg"
                alt="Package 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration 3 Days</div>
              <h3 className="mt-2 font-semibold text-amber-700">Sample Package 3</h3>
              <p className="mt-2 text-sm text-gray-600">A short description of package 3. Replace with real content later.</p>
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 rounded-md border border-amber-500 text-amber-500 px-3 py-2 text-sm">Enquire Now</button>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(3)}
                    className="flex-1 rounded-md bg-amber-500 text-white px-3 py-2 text-sm"
                  >
                    Know More
                  </button>
                </div>
            </div>
          </article>

          {/* Package 4 */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="h-48 bg-gray-100">
              <img
                src="/images/img4.jpeg"
                alt="Package 4"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration 1 Day</div>
              <h3 className="mt-2 font-semibold text-amber-700">Sample Package 4</h3>
              <p className="mt-2 text-sm text-gray-600">A short description of package 4. Replace with real content later.</p>
                <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-amber-500 text-amber-500 px-3 py-2 text-sm">Enquire Now</button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(4)}
                  className="flex-1 rounded-md bg-amber-500 text-white px-3 py-2 text-sm"
                >
                  Know More
                </button>
              </div>
            </div>
          </article>

          {/* Package 5 */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="h-48 bg-gray-100">
              <img
                src="/images/img5.jpeg"
                alt="Package 5"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration 2 Days</div>
              <h3 className="mt-2 font-semibold text-amber-700">Sample Package 5</h3>
              <p className="mt-2 text-sm text-gray-600">A short description of package 5. Replace with real content later.</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-amber-500 text-amber-500 px-3 py-2 text-sm">Enquire Now</button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(5)}
                  className="flex-1 rounded-md bg-amber-500 text-white px-3 py-2 text-sm"
                >
                  Know More
                </button>
              </div>
            </div>
          </article>

          {/* Package 6 */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="h-48 bg-gray-100">
              <img
                src="/images/img6.jpeg"
                alt="Package 6"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration 3 Days</div>
              <h3 className="mt-2 font-semibold text-amber-700">Sample Package 6</h3>
              <p className="mt-2 text-sm text-gray-600">A short description of package 6. Replace with real content later.</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-amber-500 text-amber-500 px-3 py-2 text-sm">Enquire Now</button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(6)}
                  className="flex-1 rounded-md bg-amber-500 text-white px-3 py-2 text-sm"
                >
                  Know More
                </button>
              </div>
            </div>
          </article>
        </div>

      {/* Modal for package details */}
      {selectedPackage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative max-w-lg w-full bg-white rounded-lg shadow-lg p-6 m-4">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
            {(() => {
              const info = packageDetails.find((p) => p.id === selectedPackage);
              if (!info) return null;
              return (
                <div>
                  <h3 className="text-xl font-semibold text-amber-700">{info.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">Duration: {info.duration}</div>
                  <p className="mt-4 text-gray-700">{info.itinerary}</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}
      </section>

      {/* Bottom wave / footer accent */}
      <div className="mt-8">
        <div className="w-full h-24 bg-gradient-to-r from-amber-200 via-pink-100 to-sky-200 rounded-t-lg"></div>
      </div>
    </main>
  );
}
