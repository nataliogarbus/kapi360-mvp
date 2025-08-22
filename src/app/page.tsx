'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiagnosticForm from "@/components/DiagnosticForm";
import ReportSection from "@/components/ReportSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import ComoFunciona from "@/components/ComoFunciona";
import Servicios from "@/components/Servicios";
import CasosExito from "@/components/CasosExito";
import NewsletterSection from "@/components/NewsletterSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any | null>(null);

  const handleDiagnose = async (url: string, mode: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, mode }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error del servidor');
      }

      setReport(result.analysis);

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al generar el informe. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <Header />
      <HeroSection />
      <DiagnosticForm isLoading={isLoading} onSubmit={handleDiagnose} />

      <div className="mt-6 w-full max-w-3xl">
        {error && (
          <div className="p-4 text-red-400 bg-red-900/20 border border-red-600 rounded-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {report && !isLoading && <ReportSection report={report} />}
      </div>

      <ComoFunciona />
      <Servicios />
      <CasosExito />

      <Faq />
      <NewsletterSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
