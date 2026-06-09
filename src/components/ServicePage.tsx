"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  bgImage: string;
  featuresTitle: string;
  features: Feature[];
  serviceName: string;
}

export default function ServicePage({
  title,
  subtitle,
  bgImage,
  featuresTitle,
  features,
  serviceName
}: ServicePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-[var(--background)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-700"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10 -mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{featuresTitle}</h2>
            <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 bg-white/95 border border-slate-200"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-[var(--accent)] mb-6 shadow-xl border border-slate-200 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-650 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm serviceName={serviceName} />
    </>
  );
}
