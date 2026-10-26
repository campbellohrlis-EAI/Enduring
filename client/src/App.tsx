// =============================================================================
// ENDURING ADVANTAGE, App Root
// Public routes load independently so a visitor only downloads the dossier they
// request. This preserves the crawlable server metadata shell while reducing
// the JavaScript required for the first homepage render.
// =============================================================================

import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'wouter';
import ErrorBoundary from './components/ErrorBoundary';
import { BookmarkProvider } from './contexts/BookmarkContext';
import { AuthProvider } from './contexts/AuthContext';
import CookieConsent from './components/CookieConsent';
import ConsentAnalytics from './components/ConsentAnalytics';
import PageLoader from './components/PageLoader';
import DeferredLoginModal from './components/DeferredLoginModal';
import ActioWordmarkEnhancer from './components/ActioWordmarkEnhancer';
import ComingSoon from './pages/ComingSoon';
import { IS_COMING_SOON } from '@shared/siteMode';

const Home = lazy(() => import('./pages/Home'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const PlayingField = lazy(() => import('./pages/PlayingField'));
const Articles = lazy(() => import('./pages/Articles'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const Diagnostic = lazy(() => import('./pages/Diagnostic'));
const Partners = lazy(() => import('./pages/Partners'));
const PartnersThankYou = lazy(() => import('./pages/PartnersThankYou'));
const About = lazy(() => import('./pages/About'));
const Scorecard = lazy(() => import('./pages/Scorecard'));
const AuthorPage = lazy(() => import('./pages/AuthorPage'));
const CoachModel = lazy(() => import('./pages/CoachModel'));
const Questions = lazy(() => import('./pages/Questions'));
const Actio = lazy(() => import('./pages/Actio'));
const HiringAdvisory = lazy(() => import('./pages/HiringAdvisory'));
const SupplyChain = lazy(() => import('./pages/SupplyChain'));
const ChecklistThankYou = lazy(() => import('./pages/ChecklistThankYou'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CfoPage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.CfoPage })));
const MunicipalitiesPage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.MunicipalitiesPage })));
const FirstNationsPage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.FirstNationsPage })));
const AgriculturePage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.AgriculturePage })));
const RealEstatePage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.RealEstatePage })));
const BuildingsPage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.BuildingsPage })));
const IndustrialPage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.IndustrialPage })));
const TransportationPage = lazy(() => import('./pages/IcpLandingPages').then((module) => ({ default: module.TransportationPage })));

function RouteLoadingFallback() {
  return <main aria-busy="true" aria-label="Loading page" className="min-h-screen bg-[#FAF7F2]" />;
}

function Router() {
  if (IS_COMING_SOON) return <ComingSoon />;

  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/case-studies/:slug" component={CaseStudy} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route path="/playing-field" component={PlayingField} />
        <Route path="/suppliers">{() => <Redirect to="/playing-field" />}</Route>
        <Route path="/articles" component={Articles} />
        <Route path="/articles/topic/hiring-advisory" component={HiringAdvisory} />
        <Route path="/articles/topic/supply-chain" component={SupplyChain} />
        <Route path="/articles/author/:slug" component={AuthorPage} />
        <Route path="/articles/:slug" component={ArticleDetail} />
        <Route path="/checklist/thank-you" component={ChecklistThankYou} />
        <Route path="/contact" component={Contact} />
        <Route path="/services" component={Services} />
        <Route path="/actio" component={Actio} />
        <Route path="/diagnostic" component={Diagnostic} />
        <Route path="/scorecard" component={Scorecard} />
        <Route path="/cfo" component={CfoPage} />
        <Route path="/municipalities" component={MunicipalitiesPage} />
        <Route path="/first-nations" component={FirstNationsPage} />
        <Route path="/agriculture" component={AgriculturePage} />
        <Route path="/real-estate" component={RealEstatePage} />
        <Route path="/buildings" component={BuildingsPage} />
        <Route path="/industrial" component={IndustrialPage} />
        <Route path="/transportation" component={TransportationPage} />
        <Route path="/investment-case">{() => <Redirect to="/services" />}</Route>
        <Route path="/partners" component={Partners} />
        <Route path="/partners/thank-you" component={PartnersThankYou} />
        <Route path="/about" component={About} />
        <Route path="/coach-model" component={CoachModel} />
        <Route path="/questions" component={Questions} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BookmarkProvider>
        <AuthProvider>
          <Router />
          {!IS_COMING_SOON && <ActioWordmarkEnhancer />}
          {!IS_COMING_SOON && <>
            <DeferredLoginModal />
            <PageLoader />
            <ConsentAnalytics />
            <CookieConsent />
          </>}
        </AuthProvider>
      </BookmarkProvider>
    </ErrorBoundary>
  );
}

export default App;
