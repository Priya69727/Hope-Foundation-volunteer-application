import { Icon, PageHeader, SectionTitle, StatCard, Status } from "../components/shared";

export function ContributionsPage() {
  const bars = [42, 60, 48, 80, 70, 92];
  return (
    <div className="page">
      <PageHeader title="My Contributions" description="Celebrate the time and energy you’ve given to your community." />
      <div className="stats-grid"><StatCard icon="clock" label="Total volunteer hours" value="48 hrs" note="+5 this month" tone="green" /><StatCard icon="folder" label="Projects completed" value="6" note="Across 3 causes" tone="blue" /><StatCard icon="calendar" label="Events participated" value="12" note="4 this year" tone="amber" /><StatCard icon="check" label="Contribution days" value="18" note="Since Jan 2024" tone="violet" /></div>
      <div className="contribution-grid"><section className="panel chart-card"><SectionTitle title="Volunteer hours" /><div className="chart">{bars.map((b, i) => <div key={i}><span className="chart-bar" style={{ height: `${b}%` }} /><small>{["May", "Jun", "Jul", "Aug", "Sep", "Oct"][i]}</small></div>)}</div></section>
      <section className="panel cause-card"><span className="eyebrow">TOP CAUSE</span><span className="cause-icon"><Icon name="heart" /></span><h3>Community Care</h3><strong>22 hours</strong><p>46% of your total contribution</p></section></div>
      <SectionTitle title="Contribution history" /><div className="panel table-wrap"><table><thead><tr><th>Date</th><th>Opportunity</th><th>Role</th><th>Hours</th><th>Attendance</th></tr></thead><tbody>
        <tr><td>15 Oct 2026</td><td><strong>Blood Donation Camp</strong><small>Event</small></td><td>Registration Desk</td><td><strong>5 hrs</strong></td><td><Status tone="success">Completed</Status></td></tr>
        <tr><td>28 Sep 2026</td><td><strong>Learning Together</strong><small>Project</small></td><td>Teaching Assistant</td><td><strong>4 hrs</strong></td><td><Status tone="success">Completed</Status></td></tr>
        <tr><td>12 Sep 2026</td><td><strong>Clean Shores</strong><small>Project</small></td><td>Team Volunteer</td><td><strong>6 hrs</strong></td><td><Status tone="success">Completed</Status></td></tr>
      </tbody></table></div>
    </div>
  );
}

