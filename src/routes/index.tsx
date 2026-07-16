import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '../components/landing/nav/nav'
import { Hero } from '../components/landing/hero/hero'
import { LogoStrip } from '../components/landing/logos/logo-strip'
import { Problem } from '../components/landing/problem/problem'
import { Services } from '../components/landing/services/services'
import { WhatsAppSimulation } from '../components/landing/simulated-ui/whatsapp-simulation'
import { Walkthrough3D } from '../components/landing/walkthrough-3d/walkthrough-3d'
import { HowItWorks } from '../components/landing/workflow-diagram/how-it-works'
import { Neighborhoods } from '../components/landing/neighborhoods/neighborhoods'
import { FeatureStack } from '../components/landing/feature-card/feature-stack'
import { CrmSpotlight } from '../components/landing/crm-spotlight/crm-spotlight'
import { Proof } from '../components/landing/proof/proof'
import { Statement } from '../components/landing/statement/statement'
import { RoiCalculator } from '../components/landing/roi/roi-calculator'
import { Comparison } from '../components/landing/comparison/comparison'
import { Timeline } from '../components/landing/timeline/timeline'
import { Stats } from '../components/landing/stats/stats'
import { RiskReversal } from '../components/landing/risk-reversal/risk-reversal'
import { Founder } from '../components/landing/founder/founder'
import { FAQ } from '../components/landing/faq/faq'
import { FinalCTA } from '../components/landing/final-cta/final-cta'
import { Footer } from '../components/landing/footer/footer'
import { ScrollThread } from '../components/landing/scroll-thread/scroll-thread'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="relative min-h-screen bg-canvas text-text-primary overflow-x-clip">
      {/* Ambient light field — faint emerald/gold glow zones the content scrolls through */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(70% 50% at 82% 6%, rgba(43,203,141,0.06), transparent 60%), radial-gradient(60% 50% at 8% 52%, rgba(232,194,117,0.045), transparent 60%), radial-gradient(70% 50% at 92% 94%, rgba(43,203,141,0.05), transparent 60%)',
        }}
      />
      <div aria-hidden className="ar-grain" />
      <ScrollThread />
      <Nav />
      <main className="relative">
        <div className="mx-2 sm:mx-4 md:mx-6 bg-surface-1 rounded-t-[28px] sm:rounded-t-[40px] rounded-b-[28px] sm:rounded-b-[40px] md:rounded-b-[56px] overflow-hidden">
          <Hero />
        </div>
        <LogoStrip />
        <Problem />
        <Services />
        <WhatsAppSimulation />
        <Walkthrough3D />
        <HowItWorks />
        <Neighborhoods />
        <FeatureStack />
        <CrmSpotlight />
        <Proof />
        <Statement />
        <RoiCalculator />
        <Comparison />
        <Timeline />
        <Stats />
        <RiskReversal />
        <Founder />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
