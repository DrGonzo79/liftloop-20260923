"use client";

import { useMemo, useState } from "react";
import { ArrowRightLeft, Check, Clipboard, Gauge, RotateCcw, Sparkles, TriangleAlert, Users } from "lucide-react";
import fixture from "../data/demo.json";

type Partner = (typeof fixture.partners)[number];
type Plan = {
  send: number;
  receive: number;
  expectedActivationsSent: number;
  expectedActivationsReceived: number;
  fairness: number;
  fit: "Excellent" | "Good" | "Weak";
  warning: string | null;
};

function buildPlan(partner: Partner, requested: number, publisherRate: number): Plan {
  const send = Math.min(requested, fixture.publisher.availableImpressions);
  const publisherValue = send * (publisherRate / 100);
  const receive = Math.min(partner.availableImpressions, Math.round(publisherValue / (partner.activationRate / 100)));
  const receivedValue = receive * (partner.activationRate / 100);
  const fairness = Math.round((Math.min(publisherValue, receivedValue) / Math.max(publisherValue, receivedValue)) * 100);
  const fit = partner.audienceOverlap >= 75 ? "Excellent" : partner.audienceOverlap >= 55 ? "Good" : "Weak";
  return {
    send,
    receive,
    expectedActivationsSent: Math.round(publisherValue),
    expectedActivationsReceived: Math.round(receivedValue),
    fairness,
    fit,
    warning: partner.audienceOverlap < 55 ? "Audience overlap is below the 55% test threshold." : null
  };
}

export default function Home() {
  const [partnerId, setPartnerId] = useState(fixture.partners[0].id);
  const [requested, setRequested] = useState("2400");
  const [rate, setRate] = useState(String(fixture.publisher.activationRate));
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const partner = useMemo(() => fixture.partners.find((item) => item.id === partnerId)!, [partnerId]);

  function calculate() {
    const impressions = Number(requested);
    const activation = Number(rate);
    if (!Number.isInteger(impressions) || impressions < 100 || impressions > fixture.publisher.availableImpressions) {
      setError(`Enter 100–${fixture.publisher.availableImpressions.toLocaleString()} whole impressions.`);
      setPlan(null);
      return;
    }
    if (!Number.isFinite(activation) || activation < 0.1 || activation > 50) {
      setError("Enter an activation rate between 0.1% and 50%.");
      setPlan(null);
      return;
    }
    setError(""); setBusy(true); setCopied(false);
    window.setTimeout(() => { setPlan(buildPlan(partner, impressions, activation)); setBusy(false); }, 450);
  }

  function reset() {
    setPartnerId(fixture.partners[0].id); setRequested("2400"); setRate(String(fixture.publisher.activationRate));
    setPlan(null); setError(""); setCopied(false);
  }

  async function copyConfig() {
    if (!plan) return;
    const config = JSON.stringify({ demo: true, publisher: fixture.publisher.id, partner: partner.id, sendImpressions: plan.send, receiveImpressions: plan.receive, placement: partner.placement }, null, 2);
    try { await navigator.clipboard.writeText(config); setCopied(true); }
    catch { setError("Clipboard access was blocked. Use the visible plan details instead."); }
  }

  return <main>
    <header className="topbar"><a href="#planner" className="brand"><span><ArrowRightLeft size={19}/></span>LiftLoop</a><span className="demo-pill">Fictional interactive demo</span></header>
    <section className="hero"><div><p className="eyebrow">RECIPROCAL GROWTH, WITHOUT THE BLACK BOX</p><h1>Trade qualified reach.<br/><em>Keep the math honest.</em></h1><p className="lede">Plan a cross-promotion between indie apps using activation-weighted capacity—not vanity impressions.</p></div><div className="hero-stat"><Users/><strong>3 demo partners</strong><span>Choose fit before reach.</span></div></section>
    <div className="notice" role="note"><TriangleAlert size={17}/><span><strong>Concept only.</strong> All apps and metrics are fictional. No ads are served, no users are tracked, and no AI is used.</span></div>

    <section id="planner" className="planner">
      <aside className="controls">
        <div className="section-title"><div><p>01 · YOUR SIDE</p><h2>Set the give</h2></div><button className="icon" onClick={reset} aria-label="Reset demo"><RotateCcw size={17}/></button></div>
        <div className="app-card"><div className="app-logo">HH</div><div><strong>{fixture.publisher.name}</strong><span>{fixture.publisher.category} · {fixture.publisher.monthlyActiveUsers.toLocaleString()} MAU</span></div></div>
        <label>Impressions to exchange<input aria-label="Impressions to exchange" inputMode="numeric" value={requested} onChange={e => {setRequested(e.target.value); setPlan(null);}}/><small>Up to {fixture.publisher.availableImpressions.toLocaleString()} available</small></label>
        <label>Activation rate<input aria-label="Publisher activation rate" inputMode="decimal" value={rate} onChange={e => {setRate(e.target.value); setPlan(null);}}/><small>Percent of referred visitors who activate</small></label>
        <button className="primary" onClick={calculate} disabled={busy}><Gauge size={18}/>{busy ? "Balancing exchange…" : "Build fair exchange"}</button>
        {error && <p role="alert" className="error">{error}</p>}
      </aside>

      <div className="partners">
        <div className="section-title"><div><p>02 · PARTNER</p><h2>Choose audience fit</h2></div><span>{partner.audienceOverlap}% overlap</span></div>
        <div className="partner-list" role="radiogroup" aria-label="Demo partners">{fixture.partners.map(item => <button key={item.id} role="radio" aria-checked={item.id === partnerId} className={item.id === partnerId ? "partner active" : "partner"} onClick={() => {setPartnerId(item.id); setPlan(null); setCopied(false);}}>
          <span className="mini-logo">{item.name.split(" ").map(word => word[0]).join("")}</span><span><strong>{item.name}</strong><small>{item.category} · {item.placement}</small></span><span className="overlap">{item.audienceOverlap}%<small>fit</small></span>
        </button>)}</div>
        <div className="partner-facts"><div><span>Available</span><strong>{partner.availableImpressions.toLocaleString()}</strong></div><div><span>Activation</span><strong>{partner.activationRate}%</strong></div><div><span>MAU</span><strong>{partner.monthlyActiveUsers.toLocaleString()}</strong></div></div>
      </div>
    </section>

    <section className={plan ? "result ready" : "result"} aria-live="polite">{!plan ? <div className="empty"><Sparkles/><div><strong>Your exchange plan will appear here.</strong><span>Set capacity, choose a partner, then run the transparent allocation.</span></div></div> : <>
      <div className="section-title"><div><p>03 · FAIR EXCHANGE</p><h2>{fixture.publisher.name} × {partner.name}</h2></div><span className="score">{plan.fairness}% balanced</span></div>
      {plan.warning && <p className="warning"><TriangleAlert size={17}/>{plan.warning}</p>}
      <div className="exchange"><div><span>You send</span><strong>{plan.send.toLocaleString()}</strong><small>impressions · ~{plan.expectedActivationsSent} activations</small></div><ArrowRightLeft/><div><span>You receive</span><strong>{plan.receive.toLocaleString()}</strong><small>impressions · ~{plan.expectedActivationsReceived} activations</small></div></div>
      <div className="decision"><div><Check/><p><strong>{plan.fit} partner fit</strong><span>Start with a 7-day capped test. Reconcile on activated users, then issue a make-good if value differs by more than 15%.</span></p></div><button className="secondary" onClick={copyConfig}><Clipboard size={17}/>{copied ? "Config copied" : "Copy demo config"}</button></div>
    </>}</section>
    <footer><span>LiftLoop · Prototype, September 2026</span><a href="https://www.ideabrowser.com/hub/ideas/an-ad-swap-network-for-indie-apps-94bf1d0d">Source idea ↗</a></footer>
  </main>;
}
