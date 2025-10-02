import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function BookingForm() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted:", formData);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      id="booking" 
      className="bg-black text-white py-32 relative overflow-hidden border-t border-white/10"
    >
      <div className="mx-auto max-w-4xl px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-6xl font-black mb-6 text-white"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              letterSpacing: '-0.02em'
            }}
          >
            {t("booking_title")}
          </h2>

          <p 
            className="text-xl text-white/60 font-light tracking-wide"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {t("booking_tagline")}
          </p>
        </div>

        <div className="p-12 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label 
                className="block text-xs font-light mb-3 text-white/50 uppercase tracking-[0.2em]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t("booking_name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-black/80 border border-white/10 rounded text-white focus:border-white/40 focus:outline-none transition-all duration-500 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              />
            </div>

            <div>
              <label 
                className="block text-xs font-light mb-3 text-white/50 uppercase tracking-[0.2em]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t("booking_email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 bg-black/80 border border-white/10 rounded text-white focus:border-white/40 focus:outline-none transition-all duration-500 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              />
            </div>

            <div>
              <label 
                className="block text-xs font-light mb-3 text-white/50 uppercase tracking-[0.2em]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t("booking_company")}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-black/80 border border-white/10 rounded text-white focus:border-white/40 focus:outline-none transition-all duration-500 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              />
            </div>

            <div>
              <label 
                className="block text-xs font-light mb-3 text-white/50 uppercase tracking-[0.2em]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t("booking_project")}
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-black/80 border border-white/10 rounded text-white focus:border-white/40 focus:outline-none transition-all duration-500 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                <option value="">Sélectionner...</option>
                <option value="sport">Sport / Performance</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="campaign">Campagne Produit</option>
                <option value="runway">Runway / Mode</option>
                <option value="content">Création de Contenu</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label 
                className="block text-xs font-light mb-3 text-white/50 uppercase tracking-[0.2em]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {t("booking_message")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-6 py-4 bg-black/80 border border-white/10 rounded text-white focus:border-white/40 focus:outline-none transition-all duration-500 resize-none focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-12 py-5 bg-transparent border border-white/30 text-white font-light text-lg transition-all duration-500 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[0.25em] overflow-hidden"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                <span className="relative z-10">
                  {t("booking_submit")}
                </span>
                
                {/* Premium glow effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)'
                  }}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}