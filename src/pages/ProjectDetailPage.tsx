import { useState } from "react";
import { Button, Fact, Icon, photos, type Page } from "../components/shared";
import { useDemoStore } from "../components/demoStore";

export function ProjectDetailPage({ go }: { go: (p: Page) => void }) {
  const { data, setData } = useDemoStore();
  const projectName = "Food Distribution Program";
  const application = data.applications.find((item) => item.name === projectName);
  const apply = () => {
    const id = `application-${Date.now()}`;
    const nextApplication = { id, name: projectName, type: "Project", date: "7 Oct 2026", status: "Pending", tone: "info" as const, updated: "Today" };
    setData((current) => ({ ...current, applications: [nextApplication, ...current.applications], activeApplicationId: id }));
  };
  return (
    <div className="page detail-page">
      <button className="back-link" onClick={() => go("projects")}><Icon name="arrow" size={17} />Back to projects</button>
      <div className="detail-hero"><img src={photos.volunteers} alt="Hope Foundation volunteers" /><div className="hero-overlay"><span className="eyebrow light">COMMUNITY CARE</span><h1>{projectName}</h1><p>Help provide nutritious meals to families across Pune.</p></div></div>
      <div className="detail-layout">
        <main className="detail-content">
          <section><h2>About this project</h2><p>Join Hope Foundation’s community care team for a day of packing and distributing food kits to families who need them most. You’ll work in a friendly, well-supported group and see your impact first-hand.</p></section>
          <div className="detail-facts"><Fact icon="calendar" label="Date" value="20 October 2026" /><Fact icon="clock" label="Time" value="9:00 AM – 3:00 PM" /><Fact icon="map" label="Location" value="Community Centre, Pune" /><Fact icon="users" label="Team" value="10 volunteers needed" /></div>
          <section><h2>What you’ll do</h2><ul className="check-list"><li><Icon name="check" />Sort and pack nutritious food kits</li><li><Icon name="check" />Coordinate distribution at the community centre</li><li><Icon name="check" />Welcome families and assist with registration</li></ul></section>
          <section><h2>Skills that help</h2><div className="skill-row"><span>Community service</span><span>Event coordination</span><span>Communication</span></div></section>
        </main>
        <aside className="apply-card panel">
          <span className="spots-label">APPLICATIONS CLOSE IN 4 DAYS</span><div className="spots-row"><strong>8 of 10</strong><span>spots filled</span></div><div className="progress"><span /></div>
          {application ? <><div className="success-box"><Icon name="check" /><div><strong>{application.status === "Pending" ? "Application submitted" : "You already applied"}</strong><p>Your application is listed in your tracker.</p></div></div><Button onClick={() => { setData((current) => ({ ...current, activeApplicationId: application.id })); go("application-detail"); }}>Track application</Button></> : <>
            <Button onClick={apply}>Apply for project</Button><p className="apply-note"><Icon name="shield" size={16} />Demo application saved in this browser.</p>
          </>}
          <hr /><strong>Organised by</strong><div className="organiser"><span className="logo-mark small"><span>h</span></span><div><strong>Hope Foundation</strong><small>Community Care Team</small></div></div>
        </aside>
      </div>
    </div>
  );
}
