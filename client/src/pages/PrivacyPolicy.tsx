// =============================================================================
// ENDURING ADVANTAGE, Privacy Policy Page
// Sage Editorial design: cream background, deep slate text
// =============================================================================

import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { useSEO, organizationSchema } from '@/hooks/useSEO';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useSEO({
    title: 'Privacy Policy',
    description: 'Enduring Advantage privacy policy, how we collect, use, and protect your personal data in accordance with GDPR, PIPEDA, Quebec Law 25, and CCPA.',
    canonicalPath: '/privacy-policy',
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
              Privacy Policy
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
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: '#C9A84C',
              lineHeight: 1.7,
            }}
          >
            Enduring Advantage Inc. and its affiliated companies (Energy Advantage Inc., Catalys Labs) are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </p>
          <div
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.25rem',
              background: 'rgba(201,168,76,0.07)',
              borderLeft: '3px solid #C9A84C',
              borderRadius: '0 8px 8px 0',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-slate-deep)',
            }}
          >
            Our website address is <a href="https://energyadvantage.com" style={{ color: '#C9A84C', textDecoration: 'none' }}>https://energyadvantage.com</a> and <a href="https://enduringadvantage.com" style={{ color: '#C9A84C', textDecoration: 'none' }}>https://enduringadvantage.com</a>.
          </div>
        </div>

        {[
          {
            title: 'Comments',
            body: `When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. After approval of your comment, your profile picture is visible to the public in the context of your comment.`,
          },
          {
            title: 'Media',
            body: `If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.`,
          },
          {
            title: 'Cookies',
            body: `If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.\n\nIf you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.\n\nWhen you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.\n\nIf you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.`,
          },
          {
            title: 'Embedded Content from Other Websites',
            body: `Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.`,
          },
          {
            title: 'Who We Share Your Data With',
            body: `If you request a password reset, your IP address will be included in the reset email. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.`,
          },
          {
            title: 'How Long We Retain Your Data',
            body: `If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.\n\nFor users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.`,
          },
          {
            title: 'What Rights You Have Over Your Data',
            body: `If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.`,
          },
          {
            title: 'Where Your Data Is Sent',
            body: `Visitor comments may be checked through an automated spam detection service. We do not transfer personal data outside of Canada or the United States without appropriate safeguards in place.`,
          },
          {
            title: 'Contact Us',
            body: `If you have any questions about this Privacy Policy, please contact us:\n\nEnduring Advantage Inc. / Energy Advantage Inc.\n5515 North Service Road, Suite 303\nBurlington, ON, L7L 6G4\nCanada\n\nPhone: 1-800-697-3456\nEmail: partnerships@enduringadvantage.com`,
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
