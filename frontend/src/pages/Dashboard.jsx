import { useState } from 'react';
import DashboardHeader from './DashboardHeader';

const INITIAL_TRANSACTIONS = [
  { id: 'TX-8921', time: '12:04:18', source: 'Telebirr', sender: '0911****42', recipient: '0922****88', amount: '45,000 ETB', riskScore: 94, status: 'BLOCKED', pattern: 'Rapid Drain Loop' },
  { id: 'TX-8920', time: '12:03:55', source: 'Ethswitch', sender: '1000****91', recipient: '1000****12', amount: '120,000 ETB', riskScore: 82, status: 'FLAGGED', pattern: 'Unusual Volume Spike' },
  { id: 'TX-8919', time: '12:01:10', source: 'Telebirr', sender: '0944****10', recipient: '0911****05', amount: '1,500 ETB', riskScore: 12, status: 'CLEARED', pattern: 'Normal Transfer' },
  { id: 'TX-8918', time: '11:58:30', source: 'Ethswitch', sender: '1000****44', recipient: '1000****99', amount: '85,000 ETB', riskScore: 88, status: 'FLAGGED', pattern: 'Identity Mismatch (Fayda)' },
  { id: 'TX-8917', time: '11:55:02', source: 'Telebirr', sender: '0930****66', recipient: '0912****33', amount: '250 ETB', riskScore: 5, status: 'CLEARED', pattern: 'Normal Transfer' },
];

const INITIAL_REPORTS = [
  { id: 'REP-104', scammerPhone: '0911223344', accountNo: '10002938481', reporter: 'Anon_88', type: 'Advance Fee Scam', status: 'Pending Police Action', date: '2026-10-05' },
  { id: 'REP-103', scammerPhone: '0922887766', accountNo: '10008821922', reporter: 'User_491', type: 'SMS Phishing / Spoofing', status: 'Account Frozen', date: '2026-10-04' },
  { id: 'REP-102', scammerPhone: '0944112233', accountNo: '10003391827', reporter: 'Victim_02', type: 'Pyramid Scheme Deposit', status: 'Sent to Law Society', date: '2026-10-02' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'reports' | 'patterns' | 'fayda' | 'integrations'
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  
  // Fayda Lookup Mock State
  const [faydaInput, setFaydaInput] = useState('');
  const [faydaResult, setFaydaResult] = useState(null);

  // New Report Modal/Form Mock State
  const [newReport, setNewReport] = useState({ scammerPhone: '', accountNo: '', type: 'Advance Fee Scam' });

  // Mock Fayda Search Handler
  const handleFaydaSearch = (e) => {
    e.preventDefault();
    if (!faydaInput.trim()) return;
    
    // Demo Response Generator
    if (faydaInput.includes('99') || faydaInput.length > 8) {
      setFaydaResult({
        fin: faydaInput,
        fullName: 'Abebe Kebede Tadesse',
        status: 'FLAGGED_SUSPECT',
        riskLevel: 'HIGH (89%)',
        linkedTelebirr: '0911****42',
        linkedBank: 'CBE - 1000****91',
        associatedReports: 4
      });
    } else {
      setFaydaResult({
        fin: faydaInput,
        fullName: 'Mulugeta Tesfaye Assefa',
        status: 'VERIFIED_CLEAR',
        riskLevel: 'LOW (04%)',
        linkedTelebirr: '0930****66',
        linkedBank: 'CBE - 1000****12',
        associatedReports: 0
      });
    }
  };

  // Mock Add Report Handler
  const handleAddReport = (e) => {
    e.preventDefault();
    if (!newReport.scammerPhone) return;

    const created = {
      id: `REP-${reports.length + 105}`,
      scammerPhone: newReport.scammerPhone,
      accountNo: newReport.accountNo || 'N/A',
      reporter: 'Current_User',
      type: newReport.type,
      status: 'Sent to Law Society',
      date: new Date().toISOString().split('T')[0]
    };

    setReports([created, ...reports]);
    setNewReport({ scammerPhone: '', accountNo: '', type: 'Advance Fee Scam' });
  };

  return (
    <div className="min-h-screen bg-bg text-fg font-sans flex flex-col selection:bg-accent selection:text-black">
      {/* 1. Header */}
      <DashboardHeader />

      {/* Demo Banner */}
      <div className="bg-accent/10 border-b border-accent/30 py-1.5 px-4 text-center text-xs font-heading tracking-widest text-accent uppercase flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        NIQAT SYSTEM DEMO MODE — LIVE TELEMETRY SIMULATION
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* 2. SIDEBAR */}
        <aside className="w-full md:w-64 border-r border-fg/20 bg-bg p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="px-3 text-[10px] font-heading tracking-widest text-fg/40 uppercase">
              // CONTROL PANEL
            </div>

            <nav className="space-y-1 font-heading text-xs tracking-wider uppercase">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'overview' ? 'bg-accent/20 text-accent border-l-2 border-accent font-bold' : 'text-fg/70 hover:bg-fg/5 hover:text-fg'
                }`}
              >
                <span>◈ Overview & Feed</span>
                <span className="text-[10px] opacity-60">LIVE</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full text-left px-4 py-3 rounded flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'reports' ? 'bg-accent/20 text-accent border-l-2 border-accent font-bold' : 'text-fg/70 hover:bg-fg/5 hover:text-fg'
                }`}
              >
                <span>◈ Fraud Reports</span>
                <span className="px-1.5 py-0.5 bg-accent/30 text-accent text-[9px] rounded font-bold">{reports.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('patterns')}
                className={`w-full text-left px-4 py-3 rounded flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'patterns' ? 'bg-accent/20 text-accent border-l-2 border-accent font-bold' : 'text-fg/70 hover:bg-fg/5 hover:text-fg'
                }`}
              >
                <span>◈ Threat Patterns</span>
              </button>

              <button
                onClick={() => setActiveTab('fayda')}
                className={`w-full text-left px-4 py-3 rounded flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'fayda' ? 'bg-accent/20 text-accent border-l-2 border-accent font-bold' : 'text-fg/70 hover:bg-fg/5 hover:text-fg'
                }`}
              >
                <span>◈ Fayda ID Check</span>
              </button>

              <button
                onClick={() => setActiveTab('integrations')}
                className={`w-full text-left px-4 py-3 rounded flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'integrations' ? 'bg-accent/20 text-accent border-l-2 border-accent font-bold' : 'text-fg/70 hover:bg-fg/5 hover:text-fg'
                }`}
              >
                <span>◈ API Integration</span>
                <span className="text-[9px] text-emerald-400">ACTIVE</span>
              </button>
            </nav>
          </div>

          {/* System Status Footer Widget */}
          <div className="p-3 bg-fg/5 border border-fg/10 rounded mt-6">
            <div className="text-[10px] font-heading text-fg/50 uppercase">Gateway Connections</div>
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-fg/80">Telebirr Webhook</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-fg/80">Ethswitch Node</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </aside>

        {/* 3. MAIN DASHBOARD CONTENT */}
        <main className="flex-1 p-6 bg-bg/50 overflow-y-auto">

          {/* === TAB 1: OVERVIEW & LIVE FEED === */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-bg border border-fg/20 rounded-xl relative overflow-hidden">
                  <div className="text-xs font-heading text-fg/50 uppercase">Total Fraud Halted</div>
                  <div className="text-2xl font-heading font-black text-accent mt-1">4.82M ETB</div>
                  <div className="text-[10px] text-emerald-400 mt-2 font-mono">↑ +18% past 24h</div>
                </div>

                <div className="p-4 bg-bg border border-fg/20 rounded-xl relative overflow-hidden">
                  <div className="text-xs font-heading text-fg/50 uppercase">Suspicious Patterns</div>
                  <div className="text-2xl font-heading font-black text-amber-400 mt-1">142 Flagged</div>
                  <div className="text-[10px] text-amber-400/80 mt-2 font-mono">Requires Law Intervention</div>
                </div>

                <div className="p-4 bg-bg border border-fg/20 rounded-xl relative overflow-hidden">
                  <div className="text-xs font-heading text-fg/50 uppercase">Active Monitored Accounts</div>
                  <div className="text-2xl font-heading font-black text-fg mt-1">18,940</div>
                  <div className="text-[10px] text-fg/50 mt-2 font-mono">Telebirr & Ethswitch Sync</div>
                </div>

                <div className="p-4 bg-bg border border-fg/20 rounded-xl relative overflow-hidden">
                  <div className="text-xs font-heading text-fg/50 uppercase">Law Enforcement Exports</div>
                  <div className="text-2xl font-heading font-black text-emerald-400 mt-1">39 Files</div>
                  <div className="text-[10px] text-emerald-400 mt-2 font-mono">Ready for Prosecution</div>
                </div>
              </div>

              {/* Live Transactions Feed Table */}
              <div className="p-5 bg-bg border border-fg/20 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-fg">Live Transaction Telemetry</h3>
                    <p className="text-xs text-fg/50">Real-time fraud scoring across Ethiopian payment gateways</p>
                  </div>
                  <button 
                    onClick={() => {
                      const newTx = {
                        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
                        time: new Date().toLocaleTimeString(),
                        source: Math.random() > 0.5 ? 'Telebirr' : 'Ethswitch',
                        sender: '0911****' + Math.floor(10 + Math.random() * 89),
                        recipient: '0922****' + Math.floor(10 + Math.random() * 89),
                        amount: `${(Math.random() * 50000).toFixed(0)} ETB`,
                        riskScore: Math.floor(Math.random() * 100),
                        status: 'FLAGGED',
                        pattern: 'SIM-Swap Suspicion'
                      };
                      setTransactions([newTx, ...transactions]);
                    }}
                    className="px-3 py-1 bg-accent/20 border border-accent/40 text-accent text-xs font-heading uppercase rounded hover:bg-accent/30 transition cursor-pointer"
                  >
                    + Simulate Incoming Tx
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-fg/20 text-fg/50 font-heading uppercase text-[10px]">
                        <th className="py-2 px-3">TX ID</th>
                        <th className="py-2 px-3">Time</th>
                        <th className="py-2 px-3">Gateway</th>
                        <th className="py-2 px-3">Sender / Recipient</th>
                        <th className="py-2 px-3">Amount</th>
                        <th className="py-2 px-3">Threat Score</th>
                        <th className="py-2 px-3">Detected Pattern</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-fg/10">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-fg/5 transition">
                          <td className="py-3 px-3 text-accent font-bold">{tx.id}</td>
                          <td className="py-3 px-3 text-fg/60">{tx.time}</td>
                          <td className="py-3 px-3 font-semibold text-fg">{tx.source}</td>
                          <td className="py-3 px-3 text-fg/80">{tx.sender} → {tx.recipient}</td>
                          <td className="py-3 px-3 font-bold">{tx.amount}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              tx.riskScore > 75 ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                              tx.riskScore > 40 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            }`}>
                              {tx.riskScore}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-fg/70">{tx.pattern}</td>
                          <td className="py-3 px-3">
                            <span className={`font-heading text-[10px] font-bold ${
                              tx.status === 'BLOCKED' ? 'text-red-400' :
                              tx.status === 'FLAGGED' ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* === TAB 2: FRAUD REPORTS (LAW SOCIETY PREP) === */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Submit Report Form */}
                <div className="p-5 bg-bg border border-fg/20 rounded-xl space-y-4">
                  <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">File Fraud Report</h3>
                  <p className="text-xs text-fg/60">Data is logged into the national evidence database for police enforcement.</p>

                  <form onSubmit={handleAddReport} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-fg/70 font-heading mb-1">Scammer Phone / Telebirr Number</label>
                      <input 
                        type="text"
                        placeholder="e.g. 0911223344"
                        required
                        className="w-full bg-bg border border-fg/20 rounded px-3 py-2 text-fg focus:outline-none focus:border-accent"
                        value={newReport.scammerPhone}
                        onChange={(e) => setNewReport({ ...newReport, scammerPhone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-fg/70 font-heading mb-1">Bank Account / Ethswitch ID</label>
                      <input 
                        type="text"
                        placeholder="e.g. 10001234567"
                        className="w-full bg-bg border border-fg/20 rounded px-3 py-2 text-fg focus:outline-none focus:border-accent"
                        value={newReport.accountNo}
                        onChange={(e) => setNewReport({ ...newReport, accountNo: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-fg/70 font-heading mb-1">Scam Classification</label>
                      <select 
                        className="w-full bg-bg border border-fg/20 rounded px-3 py-2 text-fg focus:outline-none focus:border-accent"
                        value={newReport.type}
                        onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                      >
                        <option>Advance Fee Scam</option>
                        <option>SMS Phishing / Impersonation</option>
                        <option>Pyramid / Fake Investment</option>
                        <option>Unauthorized Account Takeover</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-accent text-bg font-heading font-bold uppercase tracking-wider rounded hover:opacity-90 transition cursor-pointer"
                    >
                      LOG EVIDENCE TO DATABASE
                    </button>
                  </form>
                </div>

                {/* Evidence Database Table */}
                <div className="lg:col-span-2 p-5 bg-bg border border-fg/20 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-fg">Law Enforcement Evidence Registry</h3>
                      <p className="text-xs text-fg/50">Verified suspect database linked to Fayda National Identifiers</p>
                    </div>
                    <button 
                      onClick={() => alert('Demo Mode: Exporting encrypted police report PDF...')}
                      className="px-3 py-1.5 border border-fg/30 text-fg/80 text-xs font-heading uppercase rounded hover:border-accent hover:text-accent transition cursor-pointer"
                    >
                      Export Case Dossier (.PDF)
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-fg/20 text-fg/50 font-heading uppercase text-[10px]">
                          <th className="py-2 px-3">Report ID</th>
                          <th className="py-2 px-3">Target Phone</th>
                          <th className="py-2 px-3">Bank Account</th>
                          <th className="py-2 px-3">Category</th>
                          <th className="py-2 px-3">Legal Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-fg/10">
                        {reports.map((rep) => (
                          <tr key={rep.id} className="hover:bg-fg/5 transition">
                            <td className="py-3 px-3 text-accent font-bold">{rep.id}</td>
                            <td className="py-3 px-3 text-fg">{rep.scammerPhone}</td>
                            <td className="py-3 px-3 text-fg/70">{rep.accountNo}</td>
                            <td className="py-3 px-3 text-fg/80">{rep.type}</td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[10px] font-bold">
                                {rep.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* === TAB 3: THREAT PATTERN ANALYSIS === */}
          {activeTab === 'patterns' && (
            <div className="space-y-6">
              <div className="p-5 bg-bg border border-fg/20 rounded-xl space-y-4">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Active AI Pattern Models</h3>
                <p className="text-xs text-fg/60">Detection engine rules active across Ethiopian transaction networks.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 border border-fg/20 rounded-lg bg-fg/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xs font-bold text-fg">01 // Rapid Micro-Drain Loop</span>
                      <span className="text-xs font-mono text-emerald-400">99.2% Accuracy</span>
                    </div>
                    <p className="text-xs text-fg/60">Detects accounts receiving many small transfers and instantly routing them to a single central wallet within 120 seconds.</p>
                  </div>

                  <div className="p-4 border border-fg/20 rounded-lg bg-fg/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xs font-bold text-fg">02 // Unverified SIM Velocity</span>
                      <span className="text-xs font-mono text-emerald-400">94.8% Accuracy</span>
                    </div>
                    <p className="text-xs text-fg/60">Flags Telebirr accounts created within 24 hours that attempt high-volume transactions above 50,000 ETB.</p>
                  </div>

                  <div className="p-4 border border-fg/20 rounded-lg bg-fg/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xs font-bold text-fg">03 // Cross-Gateway Discrepancy</span>
                      <span className="text-xs font-mono text-emerald-400">97.1% Accuracy</span>
                    </div>
                    <p className="text-xs text-fg/60">Cross-checks Ethswitch bank transfers against blacklisted phone numbers flagged in Telebirr fraud logs.</p>
                  </div>

                  <div className="p-4 border border-fg/20 rounded-lg bg-fg/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-heading text-xs font-bold text-fg">04 // Fayda Identity Mismatch</span>
                      <span className="text-xs font-mono text-emerald-400">99.9% Accuracy</span>
                    </div>
                    <p className="text-xs text-fg/60">Validates if the national Fayda biometric ID registered to the bank account matches the mobile number holder.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === TAB 4: FAYDA ID INTEGRATION LOOKUP === */}
          {activeTab === 'fayda' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="p-6 bg-bg border border-fg/20 rounded-xl space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-fg">Fayda National ID Lookup</h3>
                  <p className="text-xs text-fg/60">Verify identity and cross-reference criminal fraud records</p>
                </div>

                <form onSubmit={handleFaydaSearch} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Fayda FIN or Phone Number (e.g., 9920192)..."
                    className="flex-1 bg-bg border border-fg/20 rounded px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-accent font-mono"
                    value={faydaInput}
                    onChange={(e) => setFaydaInput(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-accent text-bg font-heading font-bold uppercase tracking-wider rounded hover:opacity-90 transition cursor-pointer"
                  >
                    QUERY
                  </button>
                </form>

                {/* Mock Search Result View */}
                {faydaResult && (
                  <div className="mt-6 p-5 border border-fg/20 bg-fg/5 rounded-xl space-y-4 font-mono text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-fg/10">
                      <span className="font-heading font-bold text-fg">FAYDA FIN: {faydaResult.fin}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        faydaResult.status === 'FLAGGED_SUSPECT' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {faydaResult.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-fg/50 block">Full Legal Name:</span>
                        <span className="text-fg font-bold text-sm">{faydaResult.fullName}</span>
                      </div>
                      <div>
                        <span className="text-fg/50 block">Risk Index:</span>
                        <span className="text-fg font-bold">{faydaResult.riskLevel}</span>
                      </div>
                      <div>
                        <span className="text-fg/50 block">Telebirr Link:</span>
                        <span className="text-fg">{faydaResult.linkedTelebirr}</span>
                      </div>
                      <div>
                        <span className="text-fg/50 block">Ethswitch Bank Link:</span>
                        <span className="text-fg">{faydaResult.linkedBank}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-fg/10 flex justify-between items-center">
                      <span className="text-fg/60">Associated Police Reports: <strong className="text-fg">{faydaResult.associatedReports}</strong></span>
                      {faydaResult.associatedReports > 0 && (
                        <button className="text-red-400 underline cursor-pointer text-[11px]">
                          Flag Account for Freeze
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* === TAB 5: API INTEGRATION MONITOR === */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="p-5 bg-bg border border-fg/20 rounded-xl space-y-4">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-accent">Gateway API Configuration</h3>
                <p className="text-xs text-fg/60">Integrate NIQAT direct middleware into Ethswitch & Telebirr webhooks.</p>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-fg/70 font-heading mb-1">NIQAT Sandbox API Key</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value="niqat_live_sec_9910293848102938471"
                        className="flex-1 bg-bg border border-fg/20 rounded px-3 py-2 text-accent"
                      />
                      <button 
                        onClick={() => alert('API Key copied to clipboard')}
                        className="px-4 py-2 border border-fg/30 rounded text-fg hover:border-accent transition cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-fg/70 font-heading mb-1">Telebirr Webhook Endpoint</label>
                    <input 
                      type="text" 
                      readOnly 
                      value="https://api.niqat.gov.et/v1/telebirr/intercept"
                      className="w-full bg-bg border border-fg/20 rounded px-3 py-2 text-fg/80"
                    />
                  </div>

                  <div>
                    <label className="block text-fg/70 font-heading mb-1">Ethswitch Webhook Endpoint</label>
                    <input 
                      type="text" 
                      readOnly 
                      value="https://api.niqat.gov.et/v1/ethswitch/intercept"
                      className="w-full bg-bg border border-fg/20 rounded px-3 py-2 text-fg/80"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}