import { Avatar, Button, Icon, OpportunityCard, SectionTitle, StatCard, Status, opportunities, type Page } from "../components/shared";
import { useDemoStore } from "../components/demoStore";

function MiniApplication({ title, type, status, tone, onClick }: { title: string; type: string; status: string; tone: "warning" | "success" | "info"; onClick: () => void }) {
  return <button className="mini-application" onClick={onClick}><span className="mini-icon"><Icon name={type === "Event" ? "calendar" : "folder"} /></span><span><strong>{title}</strong><small>{type} · Applied 2 Oct</small></span><Status tone={tone}>{status}</Status><Icon name="chevron" size={16} /></button>;
}

export function DashboardPage({ go }: { go: (p: Page) => void }) {
  const { data } = useDemoStore();
  const today = new Intl.DateTimeFormat("en", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  return (
    <div className="page">
      <section className="welcome-card">
        <div><span className="welcome-kicker"><Icon name="sparkle" size={16} /> {today}</span><h1>Welcome back, {data.profile.fullName.split(" ")[0]}</h1><p>Here’s what’s happening in your volunteering journey.</p><Button onClick={() => go("projects")}>Explore opportunities</Button></div>
        <div className="next-up"><span className="next-label">UP NEXT</span><div className="date-tile"><strong>20</strong><span>OCT</span></div><div><strong>Food Distribution Program</strong><p>9:00 AM · Community Centre, Pune</p><button onClick={() => go("assignment-detail")}>View assignment <Icon name="arrow" size={15} /></button></div></div>
      </section>
      <div className="stats-grid">
        <StatCard icon="calendar" label="Upcoming events" value="2" note="Next on 20 Oct" tone="blue" />
        <StatCard icon="file" label="Active applications" value="3" note="1 update this week" tone="amber" />
        <StatCard icon="briefcase" label="Current assignments" value="2" note="Both on track" tone="violet" />
        <StatCard icon="clock" label="Volunteer hours" value="48" note="+5 hours this month" tone="green" />
      </div>
      <div className="dashboard-grid">
        <section>
          <SectionTitle title="Recommended for you" action="View all" onClick={() => go("projects")} />
          <div className="opportunity-grid dashboard-opportunities">{opportunities.slice(0, 2).map((o) => <OpportunityCard item={o} compact key={o.title} onView={() => go("project-detail")} />)}</div>
        </section>
        <aside>
          <SectionTitle title="My applications" action="View all" onClick={() => go("applications")} />
          <div className="panel application-mini-list">
            <MiniApplication title="Blood Donation Camp" type="Event" status="Under review" tone="warning" onClick={() => go("applications")} />
            <MiniApplication title="Learning Together" type="Project" status="Approved" tone="success" onClick={() => go("applications")} />
            <MiniApplication title="Clean Shores" type="Project" status="Pending" tone="info" onClick={() => go("applications")} />
          </div>
        </aside>
      </div>
      <div className="bottom-grid">
        <section className="panel contribution-panel">
          <div><span className="eyebrow">YOUR IMPACT</span><h2>48 hours of positive change</h2><p>You’ve contributed across 6 projects and 12 community events.</p><Button variant="secondary" onClick={() => go("contributions")}>View contributions</Button></div>
          <div className="impact-ring"><div><strong>48</strong><span>hours</span></div></div>
        </section>
        <section className="panel community-callout">
          <div className="avatar-stack"><Avatar name="Ravi Kumar" /><Avatar name="Neha Joshi" /><Avatar name="John Dsouza" /><span>+24</span></div>
          <div><h3>Your community is growing</h3><p>Connect with volunteers who share your interests.</p></div>
          <Button variant="ghost" onClick={() => go("networking")}>Find people</Button>
        </section>
      </div>
    </div>
  );
}

