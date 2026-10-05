import { Link } from 'react-router';
import Header from '../components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-fg font-sans flex flex-col justify-between selection:bg-accent selection:text-black">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/30 text-accent text-xs font-heading tracking-widest uppercase rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          ETHIOPIA PAYMENT DEFENSE NETWORK
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-wider uppercase bg-linear-to-r from-fg via-accent-light to-accent bg-clip-text text-transparent max-w-4xl leading-tight">
          SECURED TRANSACTIONS. ZERO SCAMMERS.
        </h1>

        <p className="mt-6 text-fg/70 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          <span className="text-accent font-semibold font-heading">NIQAT (ንቃት)</span> proactively detects fraud, analyzes suspicious patterns, and halts scams across <span className="text-fg font-medium">Telebirr</span> and <span className="text-fg font-medium">Ethswitch</span> before financial loss occurs.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            to="/auth" 
            className="glow-border px-8 py-3.5 font-heading font-bold uppercase tracking-widest text-accent hover:bg-accent/10 transition cursor-pointer"
          >
            INITIALIZE AUTHENTICATION ◈
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          
          <div className="p-6 bg-bg border border-fg/20 rounded-xl relative overflow-hidden group hover:border-accent/50 transition">
            <div className="text-accent font-heading text-xs font-bold tracking-widest uppercase mb-2">01 // DETECT</div>
            <h3 className="font-heading text-lg font-bold text-fg mb-2">Real-Time Pattern Analysis</h3>
            <p className="text-fg/60 text-sm leading-relaxed">
              Automated behavioral modeling flags suspicious wallet transfers and high-risk payment activity before settlement.
            </p>
          </div>

          <div className="p-6 bg-bg border border-fg/20 rounded-xl relative overflow-hidden group hover:border-accent/50 transition">
            <div className="text-accent font-heading text-xs font-bold tracking-widest uppercase mb-2">02 // INTEGRATE</div>
            <h3 className="font-heading text-lg font-bold text-fg mb-2">Ethswitch & Telebirr Native</h3>
            <p className="text-fg/60 text-sm leading-relaxed">
              Direct API integrations and Fayda ID verification cross-reference identities across national payment gateways.
            </p>
          </div>

          <div className="p-6 bg-bg border border-fg/20 rounded-xl relative overflow-hidden group hover:border-accent/50 transition">
            <div className="text-accent font-heading text-xs font-bold tracking-widest uppercase mb-2">03 // ENFORCE</div>
            <h3 className="font-heading text-lg font-bold text-fg mb-2">Law Society Intelligence</h3>
            <p className="text-fg/60 text-sm leading-relaxed">
              Generates legal-grade fraud reports and actionable telemetry database logs to identify, trace, and prosecute scammers.
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-fg/20 py-4 text-center text-xs font-heading text-fg/40 tracking-widest uppercase">
        NIQAT / ንቃት System — Digital Financial Shield
      </footer>
    </div>
  );
}