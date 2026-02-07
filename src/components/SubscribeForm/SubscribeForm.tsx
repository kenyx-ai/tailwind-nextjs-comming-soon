"use client"
import React, { useState } from 'react'
import data from "../../../data/data";

function SubscribeForm() {
    const {
        newsletterheading,
        hideSubscribeForm,
      } = data;

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("loading");

      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage("Thanks for subscribing! Check your inbox.");
          setEmail("");
        } else {
          setStatus("error");
          setMessage(data.error || "Something went wrong. Please try again.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

  return (
    <>
    { hideSubscribeForm === false ? (
          <section className="text-center lg:m-7 mt-10 w-80 p-3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-slate-800 font-light text-sm leading-6"
                >
                  {newsletterheading}
                </label>
                <div className="mt-2 flex-col flex lg:flex md:flex-row">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                    className="block w-full placeholder:text-gray-500 pl-[10px] focus:outline-none border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-0 rounded-none p-2"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="ml-0 bg-slate-900 sm:w-auto border-slate-800 rounded-none mt-2 md:mt-0 p-2 border-2 text-white hover:bg-slate-950 disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Subscribe"}
                  </button>
                </div>
                {status === "success" && (
                  <p className="mt-2 text-sm text-green-600">{message}</p>
                )}
                {status === "error" && (
                  <p className="mt-2 text-sm text-red-600">{message}</p>
                )}
              </div>
            </form>
          </section>
        ) : (
          ""
        )}
    </>
  )
}

export default SubscribeForm
