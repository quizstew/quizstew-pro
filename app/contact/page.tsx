'use client';

import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="prose prose-invert lg:prose-xl py-8">
        <h1>Contact</h1>
        <p className="text-gray-400">How to reach us</p>
        <div className="bg-gray-800/50 border-l-4 border-emerald-400 p-6 rounded-r-lg not-prose">
          <p className="text-emerald-400 font-medium">Thanks for your message.</p>
          <p className="text-gray-300 mt-1 text-sm">We&apos;ll get back to you as soon as we can.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Contact</h1>
      <p className="text-gray-400">How to reach us</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl not-prose">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-gray-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950"
        >
          Send
        </button>
      </form>
    </div>
  );
}
