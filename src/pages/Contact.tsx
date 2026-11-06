import React, { useState } from 'react';
import { useWhatsAppLink } from '../hooks/useWhatsAppLink';
import { MessageCircle, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import AnimatedHeading from '../components/ui/AnimatedHeading';
import MagneticButton from '../components/ui/MagneticButton';

export const contactBanner = {
  desktopImage: '/images/ContactBanner.webp',
  mobileImage: '/images/ContactBanner.webp',
};

export default function Contact() {
  const { getWhatsAppUrl } = useWhatsAppLink('919574720006');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (
      !phoneRegex.test(formData.phone) ||
      formData.phone.replace(/[^0-9]/g, '').length < 10
    ) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.product) newErrors.product = 'Please select a product';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const messageText = `*New Inquiry from Website*
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Product:* ${formData.product}
*Message:*
${formData.message}`;

      const url = getWhatsAppUrl(messageText);
      window.open(url, '_blank');

      setFormData({
        name: '',
        phone: '',
        product: '',
        message: '',
      });
    }
  };

  return (
    <div className="bg-brand-light text-brand-charcoal min-h-screen overflow-x-hidden">
      {/* Full-Width Big Banner Image with Dual Desktop/Mobile Picture Support */}
      <section className="relative w-full h-[70vh] sm:h-[78vh] lg:h-[85vh] min-h-[460px] overflow-hidden bg-[#07090e] text-white">
        <picture className="block absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet={contactBanner.mobileImage} />
          <img
            src={contactBanner.desktopImage}
            alt="Luxury Architecture"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 lg:pb-10 flex flex-col justify-end">
          <div className="max-w-md sm:max-w-lg p-4 sm:p-6 rounded-2xl bg-[#07090e]/78 backdrop-blur-xl border border-white/15 shadow-2xl">
            <span className="text-brand-green text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-1.5 block">
              Design Brief &amp; Consultation
            </span>
            <AnimatedHeading
              as="h1"
              immediate
              className="text-lg sm:text-2xl md:text-3xl font-serif font-normal text-white tracking-tight mb-1.5 leading-snug"
            >
              Connect With <span className="italic font-normal text-brand-blue">Our Studio</span>
            </AnimatedHeading>
            <p className="text-white/85 text-xs sm:text-sm font-light leading-relaxed">
              Connect with our design team for site measurements, material samples, and precise CAD estimations. Engineered for durability, styled for ultimate luxury.
            </p>
          </div>
        </div>
      </section>

      {/* Main Split Section */}
      <div className="py-14 sm:py-20 md:py-28 relative overflow-hidden bg-brand-light">
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue/8 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-green/8 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-left min-w-0">
              <div className="mb-4 sm:mb-6">
                <span className="text-brand-green text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
                  Direct Channels
                </span>
                <AnimatedHeading
                  as="h2"
                  className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-charcoal tracking-tight"
                >
                  Visit Studio &amp; Workshop
                </AnimatedHeading>
              </div>

              {/* Address Card */}
              <div className="glass-panel-interactive p-5 sm:p-7 rounded-2xl sm:rounded-3xl group overflow-hidden">
                <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-light border border-brand-charcoal/10 rounded-2xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl text-brand-charcoal mb-1.5">
                      Main Workshop
                    </h3>
                    <address className="not-italic text-brand-charcoal/70 text-xs sm:text-sm space-y-0.5 leading-relaxed">
                      <p className="font-medium text-brand-charcoal font-serif">Asha Smart Shades</p>
                      <p>48, GIDC Rd, Makarpura GIDC</p>
                      <p>Vadsar, Vadodara</p>
                      <p>Gujarat 390010</p>
                    </address>
                    <a
                      href="https://maps.app.goo.gl/RrxpNpqpV4ooDC9V9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-brand-blue hover:text-brand-charcoal transition-colors mt-3.5 font-semibold uppercase tracking-wider"
                    >
                      Open Directions{' '}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Card — Fixed min-w-0 & break-all so email never overflows on small devices */}
              <div className="glass-panel-interactive p-5 sm:p-7 rounded-2xl sm:rounded-3xl group overflow-hidden">
                <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-light border border-brand-charcoal/10 rounded-2xl flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl text-brand-charcoal mb-2">
                      Direct Communication
                    </h3>
                    <div className="space-y-2 min-w-0">
                      <a
                        href="mailto:Contact@Ashasmartshades.Com"
                        className="flex items-center gap-2 text-brand-charcoal/75 hover:text-brand-blue transition-colors text-xs sm:text-sm min-w-0"
                      >
                        <Mail size={14} className="text-brand-charcoal/40 shrink-0" />
                        <span className="break-all">Contact@Ashasmartshades.Com</span>
                      </a>
                      <a
                        href="tel:+919574720006"
                        className="flex items-center gap-2 text-brand-charcoal/75 hover:text-brand-blue transition-colors text-xs sm:text-sm tabular-nums"
                      >
                        <Phone size={14} className="text-brand-charcoal/40 shrink-0" />
                        <span>+91 95747 20006</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="glass-panel-interactive p-5 sm:p-7 rounded-2xl sm:rounded-3xl group overflow-hidden">
                <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-brand-light border border-brand-charcoal/10 rounded-2xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg sm:text-xl text-brand-charcoal mb-1.5">
                      Studio Availability
                    </h3>
                    <p className="text-brand-charcoal/75 text-xs sm:text-sm leading-relaxed mb-1">
                      Sunday - Friday:{' '}
                      <span className="text-brand-charcoal font-medium tabular-nums">
                        8:00 AM - 5:00 PM
                      </span>
                    </p>
                    <p className="text-brand-charcoal/45 text-xs italic">
                      * Architectural consults by appointment only.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 min-w-0">
              <div className="glass-panel bg-white/90 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl relative text-left overflow-hidden">
                <span className="text-brand-green text-xs font-semibold tracking-[0.2em] uppercase block mb-2">
                  Interactive Brief
                </span>
                <AnimatedHeading
                  as="h3"
                  className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-charcoal mb-7 sm:mb-10 tracking-tight"
                >
                  Request a Private Consultation
                </AnimatedHeading>

                <form className="space-y-6 sm:space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <label htmlFor="name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className={`w-full bg-transparent border-b ${
                        errors.name ? 'border-red-500' : 'border-brand-charcoal/20'
                      } py-3.5 text-sm sm:text-base text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-blue transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5 absolute left-0">{errors.name}</p>
                    )}
                  </div>

                  <div className="relative pt-1">
                    <label htmlFor="phone" className="sr-only">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full bg-transparent border-b ${
                        errors.phone ? 'border-red-500' : 'border-brand-charcoal/20'
                      } py-3.5 text-sm sm:text-base text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-blue transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1.5 absolute left-0">{errors.phone}</p>
                    )}
                  </div>

                  <div className="relative pt-1">
                    <label htmlFor="product" className="sr-only">
                      Select Product of Interest
                    </label>
                    <select
                      id="product"
                      value={formData.product}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b ${
                        errors.product ? 'border-red-500' : 'border-brand-charcoal/20'
                      } py-3.5 text-sm sm:text-base text-brand-charcoal focus:outline-none focus:border-brand-blue transition-colors cursor-pointer ${
                        !formData.product ? 'text-brand-charcoal/40' : ''
                      }`}
                    >
                      <option value="" disabled className="text-brand-charcoal/50">
                        Select Product of Interest
                      </option>
                      <option value="Retractable Awnings">Retractable Awnings</option>
                      <option value="Glazed & Fabric Canopies">Glazed &amp; Fabric Canopies</option>
                      <option value="Tensile Membranes">Tensile Membranes</option>
                      <option value="Gazebos & Umbrellas">Gazebos &amp; Umbrellas</option>
                      <option value="Other">Other Custom Shading Project</option>
                    </select>
                    {errors.product && (
                      <p className="text-red-500 text-xs mt-1.5 absolute left-0">
                        {errors.product}
                      </p>
                    )}
                  </div>

                  <div className="relative pt-1">
                    <label htmlFor="message" className="sr-only">
                      Project Specifications
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project specifications..."
                      rows={4}
                      className={`w-full bg-transparent border-b ${
                        errors.message ? 'border-red-500' : 'border-brand-charcoal/20'
                      } py-3.5 text-sm sm:text-base text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:border-brand-blue transition-colors resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1.5 absolute left-0">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <MagneticButton
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      variant="whatsapp"
                      className="w-full py-3"
                    >
                      <span>Send via WhatsApp Securely</span>
                      <MessageCircle size={18} />
                    </MagneticButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 relative z-10">
        <div className="relative w-full h-[340px] sm:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden glass-panel p-2">
          <iframe
            title="Asha Smart Shades Workshop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.498100193529!2d73.1965591!3d22.259114000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5cc30e93e2f%3A0x922e858606bf003e!2sAsha%20Industries%20%7CAwnings%20in%20Vadodara%7C%20%7CAwnings%20manufacturer%7C!5e0!3m2!1sen!2sin!4v1784089791263!5m2!1sen!2sin"
            className="w-full h-full border-0 rounded-xl sm:rounded-2xl"
            allowFullScreen={true}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
