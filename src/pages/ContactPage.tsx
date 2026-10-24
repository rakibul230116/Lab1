import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Building2, HelpCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    // Persist or handle submission
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO
        title="Contact PlayHub – Support & Game Submissions"
        description="Get in touch with PlayHub team for support, bug reports, game submissions, or advertising partnerships."
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Contact & Support
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Have a question, feedback, or want to publish your HTML5 game on PlayHub? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <MessageSquare className="w-6 h-6 text-purple-500 mb-2" />
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Player Support
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Trouble loading a game or high score error? Our team responds within 24 hours.
            </p>
            <div className="mt-2 text-xs font-semibold text-purple-500">
              support@playhubgames.com
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Building2 className="w-6 h-6 text-pink-500 mb-2" />
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Game Submissions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Send your game zip or web embed URL to be featured in our upcoming weekly drops.
            </p>
            <div className="mt-2 text-xs font-semibold text-pink-500">
              devs@playhubgames.com
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <HelpCircle className="w-6 h-6 text-amber-500 mb-2" />
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              Advertising & Brands
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Direct display ad campaigns, custom tournament sponsorship, and native branded games.
            </p>
            <div className="mt-2 text-xs font-semibold text-amber-500">
              partners@playhubgames.com
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Message Dispatched!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                Thank you for reaching out, {formData.name}. Our team will review your inquiry and get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', topic: 'general', message: '' });
                }}
                className="mt-6 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic of Inquiry
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="general">General Question</option>
                  <option value="submission">Game Submission / Developer Pitch</option>
                  <option value="bug">Report a Bug or Broken Game</option>
                  <option value="advertising">Advertising & Brand Partnership</option>
                  <option value="legal">Copyright / DMCA Takedown</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
