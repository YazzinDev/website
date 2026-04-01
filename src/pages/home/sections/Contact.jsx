import React, { useEffect, useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HCaptcha from '@hcaptcha/react-hcaptcha';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const captchaRef = useRef(null);

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const onHCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the captcha.");
      return;
    }

    setStatus({ submitting: true, submitted: false, error: false });

    const formData = new FormData(e.target);

    formData.set("access_key", "6f15a172-b5d7-4a5f-9b9f-81027cf9862c");

    // Clean up: react-hcaptcha might add g-recaptcha-response automatically
    if (formData.has("g-recaptcha-response")) {
      formData.delete("g-recaptcha-response");
    }

    // Debugging: Log the cleaned form data
    console.log("Submitting form data:", Object.fromEntries(formData));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ submitting: false, submitted: true, error: false });
        setCaptchaToken(null);
        captchaRef.current.resetCaptcha();
        e.target.reset();
      } else {
        setStatus({ submitting: false, submitted: false, error: true });
        captchaRef.current.resetCaptcha();
      }
    } catch (err) {
      setStatus({ submitting: false, submitted: false, error: true });
      captchaRef.current.resetCaptcha();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      setIsClient(true);
      // Info section animation
      gsap.from(infoRef.current.children, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      });

      // Form animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8" id="contact">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div ref={infoRef}>
          <h2 className="font-headline text-4xl sm:text-5xl md:text-5xl font-bold tracking-tighter mb-8">
            <Trans
              i18nKey="contact.title"
              components={{
                gradient: <span className="text-gradient" />,
                br: <br />
              }}
            />
          </h2>
          <p className="font-body text-on-surface-variant text-lg mb-12 max-w-sm">
            {t('contact.description')}
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">mail</span>
              </span>
              <span className="font-label">hello@yazzin.dev</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">location_on</span>
              </span>
              <span className="font-label">{t('contact.location')}</span>
            </div>
          </div>
        </div>

        <div ref={formRef} className="bg-surface-container-low p-10 rounded-2xl gradient-border">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{t('contact.form.name')}</label>
                <input
                  name="name"
                  required
                  className="w-full bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-primary/40 p-4 text-sm text-on-surface outline-none"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{t('contact.form.email')}</label>
                <input
                  name="email"
                  required
                  className="w-full bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-primary/40 p-4 text-sm text-on-surface outline-none"
                  placeholder="john@example.com"
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{t('contact.form.message')}</label>
              <textarea
                name="message"
                required
                className="w-full bg-surface-container-highest border-none rounded-lg focus:ring-1 focus:ring-primary/40 p-4 text-sm text-on-surface outline-none"
                placeholder={t('contact.form.message_placeholder')}
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-center">
              {isClient && (
                <HCaptcha
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  onVerify={onHCaptchaChange}
                  ref={captchaRef}
                  theme="dark"
                  language={t('i18n.language') === 'de' ? 'de' : 'en'}
                />
              )}
            </div>

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full bg-primary py-4 rounded-xl font-label font-bold uppercase tracking-[0.2em] text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.submitting ? t('contact.form.sending') : t('contact.form.submit')}
            </button>

            {status.submitted && (
              <p className="text-green-500 font-label text-sm text-center animate-in">
                {t('contact.form.success')}
              </p>
            )}
            {status.error && (
              <p className="text-red-500 font-label text-sm text-center animate-in">
                {t('contact.form.error')}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
