'use client';

import { useState } from 'react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const raw = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        message: errors.message?.[0],
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details) {
          setFieldErrors({
            name: data.details.name?.[0],
            email: data.details.email?.[0],
            message: data.details.message?.[0],
          });
        }
        setError(data.error || 'Failed to send message');
        return;
      }

      setIsSuccess(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="prose prose-invert lg:prose-xl py-8">
      <h1>Contact</h1>
      <p className="text-gray-400">How to reach us</p>

      {isSuccess ? (
        <div className="bg-gray-800/50 border-l-4 border-emerald-400 p-6 rounded-r-lg not-prose">
          <p className="text-emerald-400 font-medium">Thanks for your message.</p>
          <p className="text-gray-300 mt-1 text-sm">We&apos;ll get back to you as soon as we can.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl not-prose">
          {error && (
            <div className="rounded-md bg-red-900/50 border border-red-500/50 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              disabled={isSubmitting}
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
            )}
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
              disabled={isSubmitting}
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
            )}
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
              disabled={isSubmitting}
              className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {fieldErrors.message && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-gray-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending…' : 'Send'}
          </button>
        </form>
      )}

      <p className="mt-8 text-sm text-gray-500 not-prose">
        For technical inaccuracies in procedures, reach out at admin [at] quizstew [dot] com
      </p>
    </div>
  );
}
