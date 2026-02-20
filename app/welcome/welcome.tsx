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
      title: "Mathura Vrindavan & Gokul package - RS 11,999/- (4 pax)",
      duration: "4 Days, 3 Nights",
      itinerary: `📍 Day 1 – Vrindavan\n\n\t• Banke Bihari Temple\n\t• Radha Vallabh Temple\n\t• Radha Raman Temple\n\t• Prem Mandir (Evening Light Show)\n\n🛌 Stay in Gokul\n\n📍 Day 2 – Gokul | Barsana | Nandgaon\n\n\t• Radha Rani Temple\n\t• Nand Bhavan Temple\n\t• Raman Reti\n\t• Brahmand Ghat\n\t• Chintaharan Temple\n\t• Yamuna Boating\n\n🛌 Stay in Gokul\n\n📍 Day 3 – Govardhan\n\n\t• Govardhan Parikrama\n\t• Radha Kund\n\t• Shyam Kund\n\n🛌 Stay in Gokul\n\n📍 Day 4 – Mathura\n\n\t• Shri Krishna Janmabhoomi Temple\n\t• Dwarkadhish Temple\n\t• Vishram Ghat\n\t• Local Shopping (Mathura Peda)\n\n✅ Inclusions\n✔ Pickup & Drop – Mathura\n✔ Private Cab (4 Days)\n✔ 3★ Hotel in Gokul\n✔ Breakfast\n✔ Local Guide`
  },

    { 
      id: 2,
      title: "Mathura Vrindavan & Gokul package - RS 9,999/- (4 pax)",
      duration: "3 Days, 2 Nights",
      itinerary: `📍 Day 1 - Vrindavan\n\n\t• Banke Bihari\n\t• Prem Mandir\n\t• Radha Raman\n\n🛌 Stay in Gokul\n\n📍 Day 2 – Gokul + Barsana\n\n\t• Radha Rani Temple\n\t• Nandgaon\n\t• Raman Reti\n\t• Brahmand Ghat\n\t• Gokul local\n\t• Chintaharan\n\t• Yamuna boating \n\n🛌 Stay in Gokul\n\n📍 Day 3 – Mathura\n\n\t• Krishna Janmabhoomi\n\t• Dwarkadhish\n\t• Vishram Ghat\n\n✅ Inclusions\n✔ Pickup & Drop\n✔ 2 Nights Stay\n✔ Breakfast\n✔ Private Cab\n✔ Guide`
    },
    { 
      id: 3, 
      title: "Mathura Vrindavan & Gokul package - RS 6,499/- (2 pax)", 
      duration: "2 Days, 1 Night", 
      itinerary: `📍 Day 1 – Vrindavan\n\n\t• Banke Bihari\n\t• Prem Mandir\n\t• Radha Vallabh\n\n🛌 Stay in Gokul\n\n📍 Day 2 – Mathura + Gokul\n\n\t• Gokul local \n\t• Raman reti\n\t• Krishna Janmabhoomi\n\t• Vishram Ghat\n\n✅ Inclusions\n✔ Pickup & Drop\n✔ 2 Nights Stay\n✔ Breakfast\n✔ Private Cab\n✔ Guide (Temple Assistance)` 
    },
    { id: 4,
      title: "Mathura Vrindavan Gokul Barsana Goverdhan package - RS 7,499/- (2 pax)",
      duration: "2 Days, 1 Night", 
      itinerary: `📍 Day 1  – Vrindavan + Barsana + Goverdhan\n\n\t•\tBanke Bihari\n\t•\tPrem Mandir\n\t•\tRadha Vallabh\n\t•\tBarsana\n\t•\tGoverdhan\n\n🛌 Stay in Gokul\n\n📍 Day 2 – Mathura + Gokul\n\n\t•\tGokul local \n\t•\tRaman reti\n\t•\tKrishna Janmabhoomi\n\t•\tDwarkadish\n\t•\tVishram Ghat\n\n✅ Inclusions\n✔ 1 Night Stay\n✔ Breakfast\n✔ Cab\n✔ Pickup & Drop\n✔ Guide (Temple Assistance)` 
     },
    { id: 5, 
      title: "Full Day Package - RS 4,499/- (2 pax)", 
      duration: "1 Day", 
      itinerary: `•⁠  ⁠Banke Bihari\n\t•\tPrem Mandir\n\t•\tKrishna Janmabhoomi\n\t•\tDwarkadhish\n\t•\tVishram Ghat\n\t•\tRaman Reti\n\t•\tGokul local\n\n✅ Inclusions\n\n✔ Full Day Cab (8–10 hrs)\n✔ Pickup & Drop Mathura\n✔ Local Guide` 
    },
    { id: 6, 
      title: "Mathura Vrindavan and Agra package - RS 12,999/- (4 pax)", 
      duration: "3 Days", 
      itinerary: `📍 Day 1 – Vrindavan \n\nPickup from Mathura Railway Station\n\n•⁠  ⁠Banke Bihari Temple\n•⁠  ⁠Radha Raman Temple\n•⁠  ⁠Radha Vallabh Temple\n•⁠  ⁠Prem Mandir (Evening Light Show)\n\n🛌 Overnight Stay – Gokul\n\n\n📍 Day 2 – Gokul | Barsana | Nandgaon\n\n•⁠  ⁠Radha Rani Temple\n•⁠  ⁠Nand Bhavan Temple\n\nEvening Excursion:\n•⁠  ⁠⁠Raman Reti\n•⁠  ⁠Brahmand Ghat\n•⁠  ⁠Chintaharan Temple\n•⁠  ⁠Yamuna Boating\n•⁠  ⁠⁠gokul local\n\n🛌 Overnight Stay – Gokul\n\n\n📍 Day 3 – Agra Excursion (Same Day Return)\n\nMorning drive to Agra (Approx 1.5 hrs)\n\n•⁠  ⁠Taj Mahal\n•⁠  ⁠Agra Fort\n•⁠  ⁠Mehtab Bagh (Sunset View)\n\nEvening return to Gokul\n\n🛌 Overnight Stay – Gokul\n\n\n📍 Day 4 – Mathura Local & Departure\n\n•⁠  ⁠Shri Krishna Janmabhoomi Temple\n•⁠  ⁠Dwarkadhish Temple\n•⁠  ⁠Vishram Ghat\n•⁠  ⁠Local Shopping – Mathura Peda\n\nHotel Checkout\n\n✅ Inclusions\n\n✔ 3 Night Stay\n✔ Breakfast\n✔ Cab\n✔ Pickup & Drop\n✔ Guide` 
    },
    { id: 7,
      title: "🌸 BRAJ HOLI EXPERIENCE – 1 Day Special  - Rs 4,999/- (2 pax)",
      duration: "1 Day",
      itinerary: `📍 Pickup & Drop: Mathura Railway Station / Hotel\n🚗 Private Cab | Local Assistance | Safe Holi Guidance\n\n✔ Private Cab (Full Day – 8 to 10 hrs)\n✔ Pickup & Drop – Mathura\n✔ Local Guide / Holi Assistance`
    },
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
              <div className="w-10 h-10 rounded-md bg-sky-800 flex items-center justify-center text-white font-bold">MV</div>
              <div>
                <div className="text-sm font-semibold">Explore Mathura Vrindavan</div>
                <div className="text-xs text-gray-500">Packages</div>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-9 text-sm">
            <a className="text-blue-500 font-medium" href="#">Home</a>
            <a className="text-gray-600 hover:text-gray-900" href="#packages">Packages</a>
              <a className="text-gray-600 hover:text-gray-900" href="#blogs">Know More</a>
              <a className="text-gray-600 hover:text-gray-900" href="#services">Our Services</a>
            <a className="text-gray-600 hover:text-gray-900" href="#contact">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left hero */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-sky-800">
              Explore Mathura
              <br />
              Vrindavan
            </h1>
            <p className="mt-6 text-gray-600 max-w-2xl">
              Avail best discount on Mathura Vrindavan Packages today! Explore curated
              itineraries, expert guides, and special offers tailored to your needs.
            </p>
          </div>

          {/* Right enquiry card */}
          <aside className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-blue-200 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-sky-800">Planning a Trip? Get a Free Quote</h3>
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
                      className="w-full rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm"
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
                      className="w-full rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm"
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
                      className="w-full rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm"
                    />
                  </div>

                  {/* date field removed per request */}

                  <div>
                    <button
                      type="submit"
                      className={`w-full rounded-md px-4 py-3 text-white font-medium ${submitting ? 'bg-blue-400 opacity-90 cursor-wait' : 'bg-blue-500 hover:bg-blue-600'}`}
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
        <h2 className="text-3xl md:text-4xl font-extrabold text-sky-800 text-center">Our Best Mathura Vrindavan Packages</h2>
        <p className="mt-4 text-center text-gray-600 max-w-3xl mx-auto">
          Explore some of our most popular itineraries.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Package 1 - customize separately */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="h-48 bg-gray-100">
                <img
                  src="/images/img22.jpeg"
                  alt="Package 1"
                  className="w-full h-full object-cover"
                />
              </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration - 4D/3N</div>
              <h3 className="mt-2 font-semibold text-sky-800">Mathura Vrindavan Goverdhan Gokul package - RS 11,999/- (4 pax)</h3>
              <p className="mt-2 text-sm text-gray-600">A soulful escape—guided temple visits, morning aartis at ghats, cultural shows, comfortable stays, local meals and private transfers. Personalized guide ensures a peaceful, memorable pilgrimage</p>
              <div className="mt-4 flex gap-3">
                  <button 
                    className="flex-1 rounded-md border border-blue-500 text-blue-500 px-3 py-2 text-sm">Enquire Now</button>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(1)}
                    className="flex-1 rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
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
                src="/images/img17.jpeg"
                alt="Package 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration - 3D/2N</div>
              <h3 className="mt-2 font-semibold text-sky-800">Mathura Vrindavan & Gokul package - RS 9,999/- (4 pax)</h3>
              <p className="mt-2 text-sm text-gray-600">A spiritual getaway—explore ancient temples, experience vibrant local culture, enjoy comfortable stays, and savor traditional cuisine. Perfect for a quick, refreshing pilgrimage</p>
              <div className="mt-4 flex gap-3">
                  <button className="flex-1 rounded-md border border-blue-500 text-blue-500 px-3 py-2 text-sm">Enquire Now</button>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(2)}
                    className="flex-1 rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
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
              <div className="text-sm text-gray-500">Duration - 2D/1N</div>
              <h3 className="mt-2 font-semibold text-sky-800">Mathura Vrindavan & Gokul package - RS 6,499/- (2 pax)</h3>
              <p className="mt-2 text-sm text-gray-600">A quick spiritual retreat—visit key temples, enjoy local cuisine, comfortable stays and experience the vibrant culture of Mathura and Vrindavan. Ideal for a short getaway.</p>
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 rounded-md border border-blue-500 text-blue-500 px-3 py-2 text-sm">Enquire Now</button>
                  <button
                    type="button"
                    onClick={() => setSelectedPackage(3)}
                    className="flex-1 rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
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
              <div className="text-sm text-gray-500">Duration - 2D/1N</div>
              <h3 className="mt-2 font-semibold text-sky-800">Mathura Vrindavan Gokul Barsana Goverdhan package - RS 7,499/- (2 pax)</h3>
              <p className="mt-2 text-sm text-gray-600">Experience the spiritual essence of Mathura, Vrindavan, Gokul, Barsana, and Goverdhan in just two days. Enjoy guided temple visits, scenic drives, and comfortable stays for a memorable pilgrimage.</p>
                <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-blue-500 text-blue-500 px-3 py-2 text-sm">Enquire Now</button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(4)}
                  className="flex-1 rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
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
              <div className="text-sm text-gray-500">Duration 1 Day</div>
              <h3 className="mt-2 font-semibold text-sky-800">Full Day Package - RS 4,499/- (2 pax)</h3>
              <p className="mt-2 text-sm text-gray-600">Enjoy a complete spiritual day tour of Mathura and Vrindavan, visiting iconic temples and sacred sites with a local guide. Includes comfortable cab, pickup and drop, and personalized assistance for a memorable experience.</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-blue-500 text-blue-500 px-3 py-2 text-sm">Enquire Now</button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(5)}
                  className="flex-1 rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
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
              <div className="text-sm text-gray-500">Duration - 4D/3N</div>
              <h3 className="mt-2 font-semibold text-sky-800">Mathura Vrindavan and Agra package - RS 12,999/- (4 pax)</h3>
              <p className="mt-2 text-sm text-gray-600">Experience the spiritual beauty of Mathura, Vrindavan, and Agra in just three days. Includes guided temple visits, scenic drives, comfortable stays and Monument Visits for a memorable experience.</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-blue-500 text-blue-500 px-3 py-2 text-sm">Enquire Now</button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(6)}
                  className="flex-1 rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
                >
                  Know More
                </button>
              </div>
            </div>
          </article>

          {/* Package 7 */}
          <article className="border rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="h-48 bg-gray-100">
              <img
                src="/images/img24.jpeg"
                alt="Package 7"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500">Duration - 1 Day</div>
              <h3 className="mt-2 font-semibold text-sky-800">🌸 BRAJ HOLI EXPERIENCE – 1 Day Special  - Rs 4,999/- (2 pax)</h3>
              <p className="mt-2 text-sm text-gray-600">Celebrate Holi in Braj with a safe, guided day tour. Enjoy vibrant festivities, temple visits, and local culture with a private cab, expert assistance, and personalized pickup/drop for a memorable experience.</p>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-md border border-blue-500 text-blue-500 px-3 py-2 text-sm">Enquire Now</button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(7)}
                  className="flex-1 rounded-md bg-blue-500 text-white px-3 py-2 text-sm"
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
                  <h3 className="text-xl font-semibold text-blue-500">{info.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">Duration: {info.duration}</div>
                  <div
                    className="mt-4 text-gray-700"
                    style={{
                      maxHeight: '320px',
                      overflowY: 'auto',
                      whiteSpace: 'pre-line',
                      paddingRight: '8px',
                    }}
                  >
                    {info.itinerary}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      
      </section>

        {/* Blog Section - styled like the screenshot */}
        <section id="blogs" className="container mx-auto px-6 py-16">
          <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-10">Know More About Braj Dham</h2>
          <div className="max-w-6xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Come discover the magical cities where divinity meets earth - Mathura and Vrindavan, where every street corner whispers ancient stories and every temple bell awakens your soul. Imagine walking through the very lanes where Lord Krishna once played, in Mathura, his sacred birthplace. Feel your heart skip a beat as you join hundreds of devotees in the melodious evening aarti at Vishram Ghat, where countless lamps light up the twilight sky.
Our carefully crafted journeys aren't just tours - they're pathways to finding peace, joy, and perhaps even yourself. Whether you're drawn to the enchanting chaos of Banke Bihari Temple, where Krishna's beloved idol peeks through flower garlands, or the powerful energy of Krishna Janmabhoomi that takes you back thousands of years, every moment here is pure magic.
Want to dance in the colors of Holi or celebrate Krishna's birthday during the grand Janmashtami festival? We'll make it happen! Stay for a quick weekend escape or lose yourself in a longer adventure - the choice is yours. Our local guides, who know these sacred towns like the back of their hands, will share stories that no history book can tell you.
Let's make your spiritual journey comfortable and memorable, with hand-picked stays and smooth travels. This isn't just another holiday - it's a chance to experience miracles, taste divine local delicacies, and carry back memories that will warm your heart for years to come.
Ready to begin your soul-stirring journey through Mathura and Vrindavan? Come, let's walk these blessed paths together!

            </p>
            {/* <h3 className="text-2xl font-bold text-blue-500 mb-4">Understanding Vrindavan through a guided Vrindavan Tour Package</h3>
            <p className="text-lg text-gray-700 mb-6">
              When people visit Vrindavan on their own, they often feel confused. Temples are many. Lanes look similar. Crowds move in every direction. A Vrindavan Tour Package brings clarity to this movement. It gives structure without taking away the town’s natural flow. Guides share stories, help you find quiet corners, and make sure you do not miss the moments that matter.<br/>
              The best packages do not just list temples. They help you feel the spirit of Vrindavan. They give you time to sit by the Yamuna, to listen to the temple bells, to watch the evening aarti, and to walk the parikrama path at your own pace.
            </p> */}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="container mx-auto px-6 py-16">
          <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-4">Our Services</h2>
          <p className="text-center text-gray-500 max-w-3xl mx-auto mb-10">
            At Explore Mathura Vrindavan, we offer a complete range of travel services designed to make your pilgrimage and cultural journey seamless, enriching, and truly unforgettable
            <span role="img" aria-label="phone"> 📞</span> 24x7 Customer Support for a worry-free experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Taxi Services */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
              <h3 className="text-xl font-bold text-sky-800 mb-2">Taxi Services</h3>
              <p className="text-gray-600 mb-4">Explore Mathura Vrindavan provides trusted and comfortable taxi services across all major pilgrimage and cultural destinations. As local Braj experts, we ensure your journey is smooth, safe, and enriched with authentic spiritual and cultural experiences.</p>

            </div>
            {/* Customised Tour Package / VIP Darshan */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
              <h3 className="text-xl font-bold text-sky-800 mb-2">Customised Tour Package / VIP Darshan</h3>
              <p className="text-gray-600 mb-4">At Explore Mathura Vrindavan, we offer a complete range of travel services designed to make your pilgrimage and cultural journey seamless, enriching, and truly unforgettable <span role='img' aria-label='phone'>📞</span> 24x7 Customer Support for a worry-free experience</p>

            </div>
            {/* Tour Guide */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start">
              <h3 className="text-xl font-bold text-sky-800 mb-2">Tour Guide</h3>
              <p className="text-gray-600 mb-4">Explore Mathura Vrindavan provides experienced and knowledgeable local tour guides who bring the region’s rich history, culture, and spiritual traditions to life. With deep roots in the Braj area, our guides ensure a meaningful and insightful travel experience.</p>

            </div>
          </div>
        </section>
                {/* Contact Us Section */}
        <section id="contact" className="container mx-auto px-6 py-16">
          <h2 className="text-4xl font-extrabold text-center text-sky-800 mb-6">Contact Us</h2>
          <p className="text-center text-gray-600 mb-8">We'd love to connect with you! Reach out to us on your favorite platform:</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
              <span className="bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.25 2.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"/></svg>
              </span>
              <span className="text-gray-700 group-hover:text-pink-600 font-medium">Instagram</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
              <span className="bg-blue-600 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
              </span>
              <span className="text-gray-700 group-hover:text-blue-600 font-medium">Facebook</span>
            </a>
            <a href="#" className="flex flex-col items-center group">
              <span className="bg-green-500 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </span>
              <span className="text-gray-700 group-hover:text-green-600 font-medium">Email</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
              <span className="bg-green-400 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.501-.669-.511-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.214 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              </span>
              <span className="text-gray-700 group-hover:text-green-500 font-medium">WhatsApp</span>
            </a>
          </div>
        </section>
      {/* Bottom wave / footer accent */}
      {/* <div className="mt-8">
        <div className="w-full h-24 bg-gradient-to-r from-blue-200 via-pink-100 to-sky-200 rounded-t-lg"></div>
      </div> */}
    </main>
  );
}
