// =============================================================================
// ENDURING ADVANTAGE, Terms of Use Page
// Sage Editorial design: cream background, deep slate text
// =============================================================================

import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { useSEO, organizationSchema } from '@/hooks/useSEO';

export default function Terms() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useSEO({
    title: 'Terms of Use',
    description: 'Terms of use for Enduring Advantage, governing your access to and use of enduringadvantage.com and related advisory services.',
    canonicalPath: '/terms',
    noIndex: false,
    jsonLd: organizationSchema,
  });

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-cream)' }}>
      {/* Simple header */}
      <header
        style={{
          background: 'rgba(250,247,242,0.97)',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          boxShadow: '0 2px 20px rgba(30,45,47,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ textDecoration: 'none' }}
            >
              <ArrowLeft size={16} style={{ color: '#C9A84C' }} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#C9A84C',
                }}
              >
                Back to Enduring Advantage
              </span>
            </Link>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-slate-deep)',
              }}
            >
              Terms of Use
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container py-16" style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '0.75rem',
            }}
          >
            Legal
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-slate-deep)',
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Terms of Use
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: '#C9A84C',
              lineHeight: 1.7,
            }}
          >
            Please read these Terms of Use carefully before using the Enduring Advantage website. By accessing or using our site, you agree to be bound by these terms.
          </p>
        </div>

        {[
          {
            title: 'Acceptance of Terms',
            body: `By accessing and using this website, you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use this website. These terms apply to all visitors, users, and others who access or use the site.`,
          },
          {
            title: 'Use of the Website',
            body: `This website is provided by Enduring Advantage Inc. for informational purposes only. The content on this site, including articles, research summaries, case studies, and advisory information, is intended to provide general information about sustainability advisory services and climate-related business topics.\n\nYou agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use and enjoyment of the site.`,
          },
          {
            title: 'Intellectual Property',
            body: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Enduring Advantage Inc., Energy Advantage Inc., or their content suppliers and is protected by applicable intellectual property laws.\n\nYou may view, download, and print content from this site for your personal, non-commercial use only, provided you do not modify the content and retain all copyright and other proprietary notices.`,
          },
          {
            title: 'Third-Party Links and Articles',
            body: `This website contains links to third-party websites and references to articles published by external organizations. These links are provided for your convenience and informational purposes only. Enduring Advantage Inc. does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites.\n\nWe encourage you to review the terms and privacy policies of any third-party sites you visit.`,
          },
          {
            title: 'Disclaimer of Warranties',
            body: `The information on this website is provided "as is" without any warranties, express or implied. Enduring Advantage Inc. makes no representations or warranties regarding the accuracy, completeness, or suitability of the information for any particular purpose.\n\nThe research articles and summaries featured on this site are sourced from third parties and are presented for informational purposes. They do not constitute professional advisory, legal, financial, or investment advice.`,
          },
          {
            title: 'Limitation of Liability',
            body: `To the fullest extent permitted by law, Enduring Advantage Inc. shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.\n\nThis includes, without limitation, damages for loss of profits, data, goodwill, or other intangible losses, even if we have been advised of the possibility of such damages.`,
          },
          {
            title: 'Privacy',
            body: `Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Use by reference. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.`,
          },
          {
            title: 'Changes to These Terms',
            body: `We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of revised terms constitutes your acceptance of the changes.`,
          },
          {
            title: 'Governing Law',
            body: `These Terms of Use are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Ontario, Canada.`,
          },
          {
            title: 'Contact Us',
            body: `If you have any questions about these Terms of Use, please contact us:\n\nEnduring Advantage Inc. / Energy Advantage Inc.\n5515 North Service Road, Suite 303\nBurlington, ON, L7L 6G4\nCanada\n\nPhone: 1-800-697-3456\nEmail: partnerships@enduringadvantage.com`,
          },
        ].map((section) => (
          <section
            key={section.title}
            style={{
              marginBottom: '2.5rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--color-slate-deep)',
                marginBottom: '0.85rem',
              }}
            >
              {section.title}
            </h2>
            {section.body.split('\n\n').map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'rgba(30,45,47,0.75)',
                  marginBottom: i < section.body.split('\n\n').length - 1 ? '1rem' : 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {para}
              </p>
            ))}
          </section>
        ))}

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'rgba(30,45,47,0.45)',
            marginTop: '2rem',
          }}
        >
          Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </main>

      <Footer />
    </div>
  );
}
