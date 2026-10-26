// =============================================================================
// ENDURING ADVANTAGE, Home Page
// =============================================================================

import { lazy, Suspense, useState } from 'react';
import { useSEO, organizationSchema, websiteSchema } from '@/hooks/useSEO';
import Navigation from '@/components/Navigation';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import BackToTop from '@/components/BackToTop';
import TopicCloud from '@/components/TopicCloud';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowDown, ChevronRight, Mail } from 'lucide-react';
import Footer from '@/components/Footer';

const CommandPalette = lazy(() => import('@/components/CommandPalette'));
const ReadingListDrawer = lazy(() => import('@/components/ReadingListDrawer'));

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', background: 'rgba(134,239,172,0.1)', border: '1px solid rgba(134,239,172,0.3)', borderRadius: '12px', padding: '28px 32px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(134,239,172,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Mail size={22} style={{ color: '#C9A84C' }} />
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#FAF7F2', fontWeight: 600 }}>You're on the list!</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(250,247,242,0.65)' }}>We'll send you our next research digest. Watch your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="your@email.com"
          aria-label="Email address"
          style={{ flex: '1 1 260px', minWidth: '220px', maxWidth: '340px', padding: '12px 18px', borderRadius: '8px', background: 'rgba(250,247,242,0.1)', border: '1.5px solid rgba(250,247,242,0.2)', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(134,239,172,0.6)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(250,247,242,0.2)')}
        />
        <button type="submit" style={{ padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: '#C9A84C', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0 }}>Subscribe</button>
      </div>
      {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#fca5a5', marginTop: '8px' }}>{error}</p>}
    </form>
  );
}

const bodyText: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75, color: 'rgba(13,51,73,0.74)', margin: 0 };
const displayText: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 600, color: '#0D3349', lineHeight: 1.1, margin: 0 };

export default function Home() {
  useSEO({
    title: 'Profitable Sustainability, the Right Things in the Right Order | Enduring Advantage',
    description: 'Climate change, biodiversity loss and pollution are already in your costs. Thousands of new sustainability solutions mean there is almost certainly one that pays your business back well. Enduring Advantage finds the one with the best financial return, your Next Best Thing, and quarterbacks it to done. Then the next one.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png',
    jsonLd: [organizationSchema, websiteSchema],
  });

  const [contactForm, setContactForm] = useState({ name: '', organization: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [readingListOpen, setReadingListOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-cream)', fontFamily: 'var(--font-body)' }}>
      <Navigation onOpenReadingList={() => setReadingListOpen(true)} onOpenSearch={() => setSearchOpen(true)} />
      <ReadingProgressBar />
      <BackToTop />
      {readingListOpen && <Suspense fallback={null}><ReadingListDrawer open={readingListOpen} onClose={() => setReadingListOpen(false)} /></Suspense>}
      {searchOpen && <Suspense fallback={null}><CommandPalette onMatrixSelect={() => {}} open={searchOpen} onOpenChange={setSearchOpen} /></Suspense>}

      {/* 1. Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '80px' }}>
        <div className="absolute inset-0 z-0">
          <img src="/manus-storage/hero-financial-district-1920_a596aa96.webp" srcSet="/manus-storage/hero-financial-district-768_ea889c97.webp 768w, /manus-storage/hero-financial-district-1280_b73372b7.webp 1280w, /manus-storage/hero-financial-district-1920_a596aa96.webp 1920w" sizes="100vw" alt="Modern financial district at dusk" className="w-full h-full object-cover" width="1920" height="1080" fetchPriority="high" loading="eager" decoding="async" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(30,45,47,0.88) 0%, rgba(30,45,47,0.72) 55%, rgba(30,45,47,0.38) 100%)' }} />
        </div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-16">
            <div>
              <p className="animate-fade-up" style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 1.25rem' }}>For CFOs and CEOs, and the advisors they trust</p>
              <h1 className="animate-fade-up" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.08, color: '#FAF7F2', margin: 0, animationDelay: '100ms' }}>You don&apos;t need thousands of sustainability options. You need the one that pays you back fastest. We find it for you.</h1>
              <p className="animate-fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.7vw, 1.2rem)', lineHeight: 1.7, color: 'rgba(250,247,242,0.84)', maxWidth: '600px', margin: '1.5rem 0 0', animationDelay: '150ms' }}>Climate change is already in your numbers. Higher costs. Higher insurance renewals. Lower asset values. Investors, customers and employees are watching how you respond. Do nothing and you carry the risk. Act and you take the lead.</p>
              <p className="animate-fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.7vw, 1.2rem)', lineHeight: 1.7, color: 'rgba(250,247,242,0.84)', maxWidth: '600px', margin: '1rem 0 2rem', animationDelay: '170ms' }}>We start with your data, not a vendor&apos;s project list. It leads us to the business problem worth solving, then we search the whole field to pinpoint the sustainability investment with the best financial return, get it planned and delivered, and measure the result. Then we cherry pick the Next Best Thing.</p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '230ms' }}>
                <button onClick={() => scrollTo('#contact')} className="px-7 py-3.5 rounded font-semibold text-sm transition-all duration-200 active:scale-95" style={{ background: '#C9A84C', color: '#FAF7F2', border: 'none', fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>Find your Next Best Thing</button>
                <button onClick={() => scrollTo('#how-it-works')} className="px-7 py-3.5 rounded font-semibold text-sm transition-all duration-200 active:scale-95" style={{ background: 'transparent', color: '#FAF7F2', border: '1.5px solid rgba(250,247,242,0.4)', fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>How it works</button>
              </div>
            </div>
            <div className="flex items-center justify-center animate-fade-up" style={{ animationDelay: '280ms' }}><TopicCloud /></div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: '600ms' }}><span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(250,247,242,0.5)', fontFamily: 'var(--font-body)' }}>Scroll to explore</span><ArrowDown size={16} style={{ color: 'rgba(250,247,242,0.5)' }} className="animate-bounce" /></div>
        </div>
      </section>

      {/* 2. Why this is worth your time */}
      <section style={{ background: '#FFFDF5', padding: 'clamp(3.5rem, 7vw, 6rem) 0', borderBottom: '1px solid rgba(201,168,76,0.25)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
              <h2 style={{ ...displayText, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>If sustainability has cost you money before, start here.</h2>
              <p style={{ ...bodyText, marginTop: '1.4rem' }}>You have two good reasons to stop reading right now. The last sustainability project you signed off on cost you real money, and the savings you were promised never showed up in your accounts. And every time someone tells you about the “environmental crisis”, it sounds overstated or like somebody else&apos;s problem. Fair enough on both counts. You deserve a straight answer to each, so here it is.</p>
              <h3 style={{ ...displayText, fontFamily: 'var(--font-body)', fontSize: '1.08rem', marginTop: '2rem' }}>It’s real, and it’s already on your books.</h3>
              <p style={{ ...bodyText, marginTop: '0.65rem' }}>US$714 billion. That is what companies reporting to CDP in 2025 expect extreme weather to cost them. US$326 billion of that is expected from reduced production capacity. Forty-eight percent of the risks are expected within two years. Climate change, biodiversity loss and pollution, the polycrisis, are not a forecast for your successor. They can land in this budget cycle and the next one.</p>
              <h3 style={{ ...displayText, fontFamily: 'var(--font-body)', fontSize: '1.08rem', marginTop: '1.6rem' }}>What&apos;s changed.</h3>
              <p style={{ ...bodyText, marginTop: '0.65rem' }}>You now have more proven sustainability options than you can realistically vet. That's new. Ten years ago the problem was too few. Today the problem is too many.</p>
              <h3 style={{ ...displayText, fontFamily: 'var(--font-body)', fontSize: '1.08rem', marginTop: '1.6rem' }}>Why the last one did not pay.</h3>
              <p style={{ ...bodyText, marginTop: '0.65rem' }}>Most initiatives that disappoint were treated as a choice among projects a vendor had already suggested, not as a search across the whole field. That is the wrong starting point. Your data should identify the business problem first. With thousands of credible options, the chance that any one pitch was the best financial choice for your business was vanishingly small. That is a selection problem, not a sustainability problem. And it is fixable.</p>
              <blockquote style={{ borderLeft: '3px solid #C9A84C', color: '#A9832C', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.3vw, 1.7rem)', fontStyle: 'italic', lineHeight: 1.35, margin: '2rem 0 0', paddingLeft: '1.1rem' }}>You can have your cake and eat it too.</blockquote>
              <p style={{ ...bodyText, marginTop: '1.35rem' }}>The rest of this page is about picking the one sustainability investment that pays your business back best, and knowing it before you spend.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}><a href="/articles/the-polycrisis-what-your-clients-advisors-need-to-know" aria-label="Read the full account of the polycrisis" style={{ display: 'block', maxWidth: '920px', margin: '2.5rem auto 0', padding: '1.35rem 1.5rem', border: '1px solid rgba(13,51,73,0.18)', borderLeft: '4px solid #C9A84C', background: '#FFFFFF', color: '#0D3349', textDecoration: 'none', boxShadow: '0 3px 16px rgba(13,51,73,0.05)' }}><span style={{ display: 'block', color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Five-minute read</span><strong style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.4vw, 1.7rem)', lineHeight: 1.2, marginTop: '0.45rem' }}>The polycrisis, in plain words. What it’s already costing companies, and what lands in the next two years.</strong><span style={{ display: 'inline-block', marginTop: '0.7rem', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 800, borderBottom: '2px solid #C9A84C', paddingBottom: '0.12rem' }}>Read the full account <span aria-hidden="true">→</span></span></a></ScrollReveal>
          <p style={{ maxWidth: '920px', margin: '1.25rem auto 0', color: 'rgba(13,51,73,0.6)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.55 }}>Figures from CDP 2025 disclosure data, published in 2026, and the IEA World Energy Investment 2025 report.</p>
        </div>
      </section>

      {/* 3. The hitch */}
      <section style={{ background: '#0D3349', padding: 'clamp(3.5rem, 7vw, 6rem) 0' }}>
        <div className="container"><ScrollReveal><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#FAF7F2', lineHeight: 1.08, margin: 0 }}>The hitch is picking the right one.</h2>
          <div><p style={{ ...bodyText, color: 'rgba(250,247,242,0.78)' }}>The sustainability marketplace is complex, and most organizations find it baffling. Every organization has many thousands of candidate projects, whether anyone inside it has heard of them or not, and a few return far more than the rest. We do not score a few projects that a vendor puts in front of us. Your data leads us to the business problem worth solving, then the full field is searched for the strongest answer. Even with a good grasp of sustainability, few organizations have the data, the software and the specialized expertise to pinpoint their best opportunity and take maximum advantage of it.</p><p style={{ ...bodyText, color: 'rgba(250,247,242,0.78)', marginTop: '1rem' }}>So the question is not whether good options exist. It is which one you should implement next, and which one after that.</p></div>
        </div></ScrollReveal><ScrollReveal delay={100}><figure style={{ maxWidth: '760px', margin: '3rem auto 0' }}><img src="/manus-storage/NBTgraphic_51289e23.png" alt="Projects ranked left to right by financial return, with the Next Best Thing at the top left and a long flat tail of remaining projects" loading="lazy" style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }} /><figcaption style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', lineHeight: 1.6, marginTop: '0.8rem' }}>A few projects return far more than the rest. No single sustainability project shows up in corporate profitability or market cap. A fast run of the right ones, in the right order, does.</figcaption></figure></ScrollReveal></div>
      </section>

      {/* 4. What we do */}
      <section id="how-it-works" style={{ background: '#F8F6F1', padding: 'clamp(3.5rem, 7vw, 6rem) 0' }}>
        <div className="container"><ScrollReveal><div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <h2 style={{ ...displayText, fontSize: 'clamp(2rem, 4vw, 3.5rem)', textAlign: 'center' }}>You don&apos;t need another recommendation. You need results.</h2>
          <div style={{ maxWidth: '850px', margin: '1.5rem auto 0' }}><p style={bodyText}>That&apos;s why we work for you and no one else. We don&apos;t sell equipment, we don&apos;t take referral fees and we don&apos;t make a cent from whichever solution you pick. You get a straight answer about what&apos;s right for you, then we make it happen.</p><p style={{ ...bodyText, marginTop: '1rem' }}>We sit on your side of the table and take the project off your plate. The right vendors do the heavy lifting. We quarterback the work from decision through delivery and reporting, so you always know where things stand. Then we find your next one.</p><blockquote style={{ borderLeft: '3px solid #C9A84C', color: '#A9832C', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.3vw, 1.65rem)', fontStyle: 'italic', lineHeight: 1.35, margin: '1.75rem 0 0', paddingLeft: '1.1rem' }}>The Right Things in the Right Order.</blockquote></div>
          <h3 style={{ ...displayText, fontSize: 'clamp(1.65rem, 3vw, 2.25rem)', textAlign: 'center', marginTop: '3.5rem' }}>How it works</h3>
          <div className="grid gap-5 md:grid-cols-3" style={{ marginTop: '2.25rem' }}>
            {[
              ['01', 'Assess and collect.', 'We learn your business, your sustainability spend and the data you already have, and load it into actio. Data collection starts on day one and keeps going. Nobody starts with complete data, and you do not need to.'],
              ['02', 'Identify the Next Best Thing.', 'Your data sets the search, not a vendor proposal. actio screens every credible option in the field through two gates: a positive environmental impact across the entire sustainability playing field, then a minimum financial materiality standard. Whatever clears both is ranked by financial return, measured the way your organization measures it: payback, ROI, NPV or your own threshold. The one at the top is your Next Best Thing. Not a shortlist. One project, along with the reason it rose to the top.'],
              ['03', 'Plan, deliver, report, repeat.', 'Generative AI drafts the implementation plan quickly, including the vendors to compare and every grant, incentive and financing instrument available, so the project does not wait for a budget cycle. Your Coach and subject matter experts (SMEs) check the plan against real conditions on the ground before it reaches you. You decide whether to proceed. The right vendors do the heavy lifting. We quarterback delivery, measure the result and name the next move.'],
            ].map(([number, title, copy]) => <article key={number} style={{ background: '#FFFFFF', borderTop: '3px solid #C9A84C', padding: '1.5rem', boxShadow: '0 3px 16px rgba(13,51,73,0.05)' }}><span style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em' }}>{number}</span><h3 style={{ ...displayText, fontFamily: 'var(--font-body)', fontSize: '1.05rem', marginTop: '0.7rem' }}>{title}</h3><p style={{ ...bodyText, fontSize: '0.9rem', marginTop: '0.7rem' }}>{copy}</p></article>)}
          </div>
          <p style={{ textAlign: 'center', margin: '2rem 0 0' }}><a href="/services" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 800, textDecoration: 'none', borderBottom: '2px solid #C9A84C', paddingBottom: '0.2rem' }}>See the full six-phase process <span aria-hidden="true">→</span></a></p>
        </div></ScrollReveal></div>
      </section>

      {/* 5. What we cover, and what we do not */}
      <section style={{ background: '#FFFDF5', padding: 'clamp(3.5rem, 7vw, 6rem) 0', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
        <div className="container"><ScrollReveal><div className="grid gap-10 lg:grid-cols-2" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div><h2 style={{ ...displayText, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>What we cover, and what we do not.</h2><h3 style={{ ...displayText, fontFamily: 'var(--font-body)', fontSize: '1rem', marginTop: '1.5rem' }}>What we cover.</h3><p style={{ ...bodyText, marginTop: '0.7rem' }}>The Sustainability Playing Field is the whole decision field in one view. It brings your evidence, the provider options and the jurisdictional reality together across asset and operations, resources and resilience, market and delivery, and capital and performance. Energy and operational efficiency, decarbonization, water, waste and pollution, biodiversity, supply chain, strategic location and extreme weather exposure. Vendors, equipment providers, software companies, brokers and consultants are all on that field. We work outside it, on your side of the table. The bigger the field you search, the better the answer you find.</p><p style={{ margin: '1.25rem 0 0' }}><a href="/playing-field" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 800, textDecoration: 'none', borderBottom: '2px solid #C9A84C', paddingBottom: '0.2rem' }}>See the full Sustainability Playing Field <span aria-hidden="true">→</span></a></p></div>
          <div style={{ borderLeft: '3px solid #C9A84C', paddingLeft: '1.4rem' }}><h3 style={{ ...displayText, fontFamily: 'var(--font-body)', fontSize: '1rem' }}>What we do not.</h3><p style={{ ...bodyText, marginTop: '0.7rem' }}>You will have a large number of sustainability issues in flight at any time. We are not an outsourced sustainability manager, and we do not take those on. We do not address an issue unless it becomes your Next Best Thing. We do not take on general business improvements, and we do not take on environmental actions that cannot show a financial return. Our role is to find the sustainability investments that pay, in the right order, and to drive your profitability, or your economic development, in an environmentally beneficial way. Not to run your sustainability program.</p><p style={{ ...bodyText, marginTop: '1rem' }}>We do not know which project comes first before we look. Neither do you, and the one you suspect is often not it. That is what the Diagnostic is for.</p><blockquote style={{ ...displayText, fontSize: 'clamp(1.2rem, 2.3vw, 1.65rem)', fontStyle: 'italic', color: '#A9832C', marginTop: '1.75rem' }}>One project at a time. The one that stands head and shoulders above the rest.</blockquote></div>
        </div></ScrollReveal></div>
      </section>

      {/* 6. Start with the data you have */}
      <section style={{ background: '#0D3349', padding: 'clamp(3.5rem, 7vw, 5rem) 0' }}>
        <div className="container"><ScrollReveal><div style={{ maxWidth: '880px', margin: '0 auto' }}><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 600, color: '#FAF7F2', lineHeight: 1.08, margin: 0 }}>Start with the data you have.</h2><p style={{ ...bodyText, color: 'rgba(250,247,242,0.78)', marginTop: '1.4rem' }}>Nobody has complete data at the start, and you don't need a data room before the first conversation. Utility bills, waste manifests, fleet records, equipment inventories or an existing emissions report are enough to begin. The first moves are the quick wins we already know are there from thirty years of this work.</p><p style={{ ...bodyText, color: 'rgba(250,247,242,0.78)', marginTop: '1rem' }}>Each one earns more data. Better data earns a more confident recommendation and a bigger result. Get far enough in and your question stops being whether to do this and becomes what&apos;s next.</p></div></ScrollReveal></div>
      </section>

      {/* 7. What you will see as the work proceeds */}
      <section style={{ background: '#F8F6F1', padding: 'clamp(3.5rem, 7vw, 5rem) 0' }}>
        <div className="container"><ScrollReveal><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]" style={{ maxWidth: '1000px', margin: '0 auto' }}><h2 style={{ ...displayText, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>What you will see as the work proceeds</h2><p style={{ ...bodyText, borderLeft: '3px solid #C9A84C', paddingLeft: '1.3rem' }}>Financial performance comes first. Environmental performance follows right behind it. Reporting starts the day a project begins and continues throughout. Every completed project gets a measurement and verification report against your baseline. We work with whatever reporting agency you already use. We keep estimates separate from completed results and check the business case against what actually happened. We never publish your numbers without your permission.</p></div></ScrollReveal></div>
      </section>

      {/* 8. Who you will be working with */}
      <section style={{ background: '#FFFDF5', padding: 'clamp(3.5rem, 7vw, 5rem) 0', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
        <div className="container"><ScrollReveal><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]" style={{ maxWidth: '1000px', margin: '0 auto' }}><h2 style={{ ...displayText, fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Who you will be working with</h2><div><p style={bodyText}>The CFO usually hires us. Operations, facilities, procurement and sustainability leaders weigh in on the recommendations that affect them, and we bring in the subject matter experts (SMEs) each one needs.</p><p style={{ ...bodyText, marginTop: '1rem' }}>You get one named Coach, generally with 10 to 20 years of management consulting experience, accountable for your outcomes from the decision through delivery and reporting. No committees. No hand-off chains.</p><p style={{ ...bodyText, marginTop: '1rem' }}>Enduring Advantage is the advisory arm of the Energy Advantage group. <strong>actio</strong> is developed and owned by Catalys and licensed to Enduring Advantage at a channel rate.</p><div className="flex flex-wrap gap-x-5 gap-y-3" style={{ marginTop: '1.5rem' }}><a href="/about" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 800, textDecoration: 'none', borderBottom: '2px solid #C9A84C', paddingBottom: '0.15rem' }}>How the group fits together <span aria-hidden="true">→</span></a><a href="/actio" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 800, textDecoration: 'none', borderBottom: '2px solid #C9A84C', paddingBottom: '0.15rem' }}>Inside actio <span aria-hidden="true">→</span></a><a href="/coach-model" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 800, textDecoration: 'none', borderBottom: '2px solid #C9A84C', paddingBottom: '0.15rem' }}>The Coach model <span aria-hidden="true">→</span></a></div></div></div></ScrollReveal></div>
      </section>

      {/* 9. Three short blocks */}
      <section style={{ background: '#0D3349', padding: 'clamp(3.5rem, 7vw, 5rem) 0' }}>
        <div className="container"><div className="grid gap-5 lg:grid-cols-3" style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <ScrollReveal><article style={{ height: '100%', borderTop: '3px solid #C9A84C', padding: '1.5rem', background: 'rgba(250,247,242,0.05)' }}><h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#FAF7F2', lineHeight: 1.2, margin: 0 }}>If your clients are asking you what to do first</h3><p style={{ ...bodyText, color: 'rgba(250,247,242,0.72)', fontSize: '0.93rem', marginTop: '1rem' }}>Your client already trusts you. You can give them an answer without becoming a sustainability delivery firm. You keep the relationship. Enduring Advantage brings the screening, the Coach and the delivery.</p><a href="/partners" style={{ display: 'inline-block', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 800, marginTop: '1.25rem', textDecoration: 'none' }}>Explore the partner model <span aria-hidden="true">→</span></a></article></ScrollReveal>
          <ScrollReveal delay={80}><article style={{ height: '100%', borderTop: '3px solid #C9A84C', padding: '1.5rem', background: 'rgba(250,247,242,0.05)' }}><h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#FAF7F2', lineHeight: 1.2, margin: 0 }}>Your sector sets what is material. So does the right first project.</h3><div className="flex flex-wrap gap-x-3 gap-y-2" style={{ marginTop: '1.25rem' }}>{[['CFOs and Finance', '/cfo'], ['Municipalities', '/municipalities'], ['First Nations', '/first-nations'], ['Agriculture', '/agriculture'], ['Real Estate', '/real-estate'], ['Buildings', '/buildings'], ['Industrial', '/industrial'], ['Transportation', '/transportation']].map(([label, href]) => <a key={href} href={href} style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(240,208,112,0.45)' }}>{label}</a>)}</div></article></ScrollReveal>
          <ScrollReveal delay={160}><article style={{ height: '100%', borderTop: '3px solid #C9A84C', padding: '1.5rem', background: 'rgba(250,247,242,0.05)' }}><h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#FAF7F2', lineHeight: 1.2, margin: 0 }}>Check your own readiness first.</h3><p style={{ ...bodyText, color: 'rgba(250,247,242,0.72)', fontSize: '0.93rem', marginTop: '1rem' }}>The 15-question Sustainability Investment Readiness Scorecard shows which of five conditions is most likely to block your next investment decision. You see your result immediately on the page. No sales call required.</p><a href="/scorecard" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', marginTop: '1.25rem', padding: '0.75rem 1rem', background: '#C9A84C', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 800, textDecoration: 'none' }}>Take the Scorecard <ChevronRight size={15} /></a></article></ScrollReveal>
        </div></div>
      </section>

      {/* 10. Close */}
      <section id="contact" style={{ background: 'var(--color-cream)', padding: 'clamp(3.5rem, 7vw, 6rem) 0' }}>
        <div className="container"><div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          <ScrollReveal><h2 style={{ ...displayText, fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}>Find your Next Best Thing.</h2><p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', color: '#A9832C', fontWeight: 600, lineHeight: 1.45, margin: '1.2rem 0 0' }}>Walk into the next board meeting with better margins and better environmental results from the same decision, and an answer when they ask what&apos;s next.</p><p style={{ ...bodyText, marginTop: '1.25rem' }}>Tell us about your organization, where you operate and what you already know about your sustainability performance. Rob Kirkby or Campbell Ohrlis will get back to you within one business day. The first conversation is with one of them, not a sales team, and it leads straight into the Diagnostic if there is a fit.</p><div className="flex items-center gap-3" style={{ marginTop: '1.5rem' }}><Mail size={16} style={{ color: '#C9A84C' }} /><a href="mailto:partnerships@enduringadvantage.com" className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }}>partnerships@enduringadvantage.com</a></div></ScrollReveal>
          <ScrollReveal delay={150}>{submitted ? <div className="p-8 rounded-xl text-center" style={{ background: 'oklch(0.96 0.012 152)', border: '1px solid rgba(201,168,76,0.2)' }}><div className="text-4xl mb-4" style={{ fontFamily: 'var(--font-display)', color: '#C9A84C' }}>✓</div><p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.52 0.02 200)' }}>Message received. Thank you for reaching out. We'll be in touch within one business day.</p></div> : <form onSubmit={handleSubmit} className="space-y-4">{[{ label: 'Name', name: 'name', type: 'text' }, { label: 'Organization', name: 'organization', type: 'text' }, { label: 'Email', name: 'email', type: 'email' }].map((field) => <div key={field.name}><label htmlFor={`contact-${field.name}`} className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }}>{field.label}</label><input id={`contact-${field.name}`} type={field.type} required value={contactForm[field.name as keyof typeof contactForm]} onChange={(e) => setContactForm({ ...contactForm, [field.name]: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200" style={{ background: '#fff', border: '1.5px solid rgba(201,168,76,0.2)', fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#C9A84C')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')} /></div>)}<div><label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }}>Message</label><textarea id="contact-message" required rows={4} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none" style={{ background: '#fff', border: '1.5px solid rgba(201,168,76,0.2)', fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#C9A84C')} onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)')} /></div><button type="submit" className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-98" style={{ background: '#C9A84C', color: '#FAF7F2', border: 'none', fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>Find your Next Best Thing</button></form>}</ScrollReveal>
        </div></div>
      </section>

      {/* 11. Research digest */}
      <section style={{ background: '#0D3349', padding: 'clamp(3rem, 6vw, 4.5rem) 0' }}>
        <div className="container"><ScrollReveal><div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}><h2 style={{ fontFamily: 'var(--font-display)', color: '#FAF7F2', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, lineHeight: 1.15, margin: 0 }}>Research Digest</h2><div style={{ marginTop: '1.5rem' }}><NewsletterForm /></div></div></ScrollReveal></div>
      </section>

      <Footer />
    </div>
  );
}
