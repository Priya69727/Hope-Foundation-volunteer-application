import { useState } from "react";
import { Button, Icon, PageHeader, Status } from "../components/shared";

export function AssignmentDetailPage({ go }: { go: (p: "assignments") => void }) {
  const [showInstructions, setShowInstructions] = useState(false);
  return (
    <div className="page">
      <button className="back-link" onClick={() => go("assignments")}><Icon name="arrow" size={17} />Back to assignments</button>
      <PageHeader title="Food Distribution Program" description="Your assignment details and day-of instructions." action={<Status tone="info">Upcoming</Status>} />
      <div className="assignment-hero panel"><div className="assignment-date large"><strong>20</strong><span>OCT</span></div><div><span className="eyebrow">YOUR ROLE</span><h2>Distribution Coordinator</h2><p>You’ll help guide the distribution team and welcome community members.</p></div><Button onClick={() => setShowInstructions(!showInstructions)}>{showInstructions ? "Hide instructions" : "View instructions"}</Button></div>
      {showInstructions && <section className="panel profile-section"><h2>Day-of instructions</h2><ol><li>Arrive 20 minutes before your shift.</li><li>Check in with Rohan Mehta at the main entrance.</li><li>Wear comfortable clothing and your volunteer badge.</li></ol></section>}
      <div className="detail-layout">
        <main className="panel detail-content padded"><h2>Day of assignment</h2><div className="detail-facts"><Fact icon="clock" label="Time" value="9:00 AM – 3:00 PM" /><Fact icon="map" label="Location" value="Community Centre, Pune" /></div><h2>Your responsibilities</h2><ul className="check-list"><li><Icon name="check" />Arrive 20 minutes before the start time</li><li><Icon name="check" />Brief the distribution desk volunteers</li><li><Icon name="check" />Coordinate a smooth and welcoming queue</li></ul></main>
        <aside className="panel contact-card"><span className="eyebrow">YOUR CONTACT</span><div><Avatar name="Rohan Mehta" /><span><strong>Rohan Mehta</strong><small>Program Coordinator</small></span></div><a className="btn btn-secondary" href="mailto:rohan.mehta@example.com?subject=Food%20Distribution%20Program"><Icon name="message" size={18} />Send message</a><p>Emergency contact: +91 98765 43210</p></aside>
      </div>
    </div>
  );
}

function Fact({ icon, label, value }: { icon: "clock" | "map"; label: string; value: string }) {
  return <div><span><Icon name={icon} /></span><p>{label}</p><strong>{value}</strong></div>;
}

function Avatar({ name }: { name: string }) {
  return <span className="avatar" aria-label={name}>{name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>;
}
