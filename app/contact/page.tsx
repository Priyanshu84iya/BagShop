"use client";

import { useState } from "react";
import BrutalInput from "@/components/BrutalInput";
import BrutalButton from "@/components/BrutalButton";
import { saveContactForm } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const contactForm = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    saveContactForm(contactForm);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
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
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-brutal text-5xl md:text-7xl mb-8">CONTACT US</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="border-4 border-black bg-brutal-yellow p-8 shadow-brutal mb-6">
              <h2 className="font-brutal text-3xl mb-4">GET IN TOUCH</h2>
              <p className="font-mono mb-6">
                HAVE QUESTIONS? FEEDBACK? JUST WANT TO SHARE YOUR BRUTAL
                STORY? WE&apos;RE LISTENING.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-4 border-black bg-white p-6 shadow-brutal-sm">
                <h3 className="font-brutal text-xl mb-2">EMAIL</h3>
                <p className="font-mono">hello@bagshop.brutal</p>
              </div>

              <div className="border-4 border-black bg-white p-6 shadow-brutal-sm">
                <h3 className="font-brutal text-xl mb-2">PHONE</h3>
                <p className="font-mono">1-800-BRUTAL-BAG</p>
              </div>

              <div className="border-4 border-black bg-white p-6 shadow-brutal-sm">
                <h3 className="font-brutal text-xl mb-2">ADDRESS</h3>
                <p className="font-mono">
                  BRUTAL WORKS, SECTOR 63A
                  <br />
                  NOIDA, UTTAR PRADESH 201301
                  <br />
                  INDIA
                </p>
              </div>

              <div className="border-4 border-black bg-white p-6 shadow-brutal-sm">
                <h3 className="font-brutal text-xl mb-2">HOURS</h3>
                <p className="font-mono">
                  MON-FRI: 10AM - 6PM IST
                  <br />
                  SAT-SUN: 11AM - 5PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="border-4 border-black bg-white p-8 shadow-brutal-lg">
              <h2 className="font-brutal text-3xl mb-6">SEND MESSAGE</h2>

              {submitted ? (
                <div className="border-4 border-black bg-brutal-cyan p-8 text-center">
                  <p className="font-brutal text-2xl mb-2">MESSAGE SENT!</p>
                  <p className="font-mono">WE&apos;LL GET BACK TO YOU SOON.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-brutal text-lg mb-2 block">
                      YOUR NAME
                    </label>
                    <BrutalInput
                      name="name"
                      type="text"
                      placeholder="JOHN DOE"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="font-brutal text-lg mb-2 block">
                      YOUR EMAIL
                    </label>
                    <BrutalInput
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="font-brutal text-lg mb-2 block">
                      YOUR MESSAGE
                    </label>
                    <BrutalInput
                      name="message"
                      multiline
                      rows={6}
                      placeholder="TELL US WHAT'S ON YOUR MIND..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <BrutalButton type="submit" fullWidth>
                    SEND MESSAGE
                  </BrutalButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
