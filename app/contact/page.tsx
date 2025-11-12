"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Simulate form submission
    // In production, you would send this to an API endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-foreground-secondary">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold text-foreground">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <a
                  href="mailto:softwarebazaar.ke@gmail.com"
                  className="text-foreground-secondary transition-colors hover:text-primary"
                >
                  softwarebazaar.ke@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="text-base font-semibold">WA</span>
              </div>
              <div>
                <p className="font-medium text-foreground">WhatsApp</p>
                <a
                  href="https://wa.me/254746054224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-secondary transition-colors hover:text-primary"
                >
                  +254 746 054 224
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="text-base font-semibold">⏰</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Consulting Rate</p>
                <p className="text-foreground-secondary">$10/hour · Remote & Hybrid engagements</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Availability & Bookings
            </h3>
            <p className="text-foreground-secondary">
              I&apos;m currently available for algorithmic trading builds, fintech product consulting,
              and article/academic writing. Book a 30-minute discovery call via Calendly or send a
              message—I&apos;ll respond within 24 hours.
            </p>
            <a
              href="https://calendly.com/johnwanyaga37/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Book on Calendly
            </a>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            {submitStatus.type && (
              <div
                className={`rounded-lg p-4 ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

