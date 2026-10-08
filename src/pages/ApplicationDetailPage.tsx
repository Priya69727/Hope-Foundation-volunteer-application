import { Button, Icon, PageHeader, Status } from "../components/shared";
import { useDemoStore } from "../components/demoStore";

function TimelineItem({ title, text, date, done, current }: { title: string; text: string; date: string; done?: boolean; current?: boolean }) {
  return <div className={`timeline-item ${done ? "done" : ""} ${current ? "current" : ""}`}><span>{done ? <Icon name="check" size={15} /> : current ? <span /> : ""}</span><div><strong>{title}</strong><p>{text}</p></div><small>{date}</small></div>;
}

export function ApplicationDetailPage({ go }: { go: (p: "applications") => void }) {
  const { data } = useDemoStore();
  const application = data.applications.find((item) => item.id === data.activeApplicationId) ?? data.applications[0];
  if (!application) return <div className="page"><Button onClick={() => go("applications")}>Back to applications</Button><h1>No application selected</h1></div>;
  const isApproved = application.status === "Approved";
  return (
    <div className="page">
      <button className="back-link" onClick={() => go("applications")}><Icon name="arrow" size={17} />Back to applications</button>
      <PageHeader title={application.name} description={`Application submitted on ${application.date}`} action={<Status tone={application.tone}>{application.status}</Status>} />
      <div className="detail-layout">
        <main className="panel timeline-card"><h2>Application progress</h2><p>We’ll keep this timeline updated as your application moves forward.</p>
          <div className="timeline"><TimelineItem title="Application submitted" text="Your profile and availability were shared." date={application.date} done /><TimelineItem title={application.status} text={isApproved ? "The organising team approved your application." : "The organising team is reviewing your application."} date={application.updated} current /><TimelineItem title="Decision" text="You’ll receive a notification when a decision is made." date={isApproved ? "Complete" : "Next step"} done={isApproved} /></div>
        </main>
        <aside className="panel next-steps"><span className="eyebrow">WHAT’S NEXT?</span><h3>{isApproved ? "You’re approved" : "No action needed right now"}</h3><p>{isApproved ? "Your next steps will be shared by the organising team." : "Most applications are reviewed within 3–5 days. We’ll notify you as soon as there’s an update."}</p><hr /><strong>Opportunity details</strong><p><Icon name="calendar" size={17} />{application.type} · {application.date}</p></aside>
      </div>
    </div>
  );
}
