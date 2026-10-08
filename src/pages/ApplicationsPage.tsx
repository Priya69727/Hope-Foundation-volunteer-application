import { useState } from "react";
import { Button, Empty, Icon, PageHeader, Status, type Page } from "../components/shared";
import { useDemoStore } from "../components/demoStore";

export function ApplicationsPage({ go }: { go: (p: Page) => void }) {
  const { data, setData } = useDemoStore();
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Pending", "Under review", "Approved", "Rejected"];
  const visible = tab === "All" ? data.applications : data.applications.filter((application) => application.status === tab);
  return (
    <div className="page">
      <PageHeader title="My Applications" description="Track your applications and see what happens next." action={<Button onClick={() => go("projects")}>Find opportunities</Button>} />
      <div className="tabs">{tabs.map((t) => <button className={tab === t ? "active" : ""} onClick={() => setTab(t)} key={t}>{t}{t === "All" && <span>{data.applications.length}</span>}</button>)}</div>
      <div className="panel table-wrap">
        <table><thead><tr><th>Opportunity</th><th>Applied</th><th>Status</th><th>Last updated</th><th><span className="sr-only">Action</span></th></tr></thead>
        <tbody>{visible.map((a) => <tr key={a.id}><td><span className="table-icon"><Icon name={a.type === "Event" ? "calendar" : "folder"} /></span><span><strong>{a.name}</strong><small>{a.type}</small></span></td><td>{a.date}</td><td><Status tone={a.tone}>{a.status}</Status></td><td>{a.updated}</td><td><button onClick={() => { setData((current) => ({ ...current, activeApplicationId: a.id })); go("application-detail"); }}>View <Icon name="chevron" size={15} /></button></td></tr>)}</tbody></table>
        {visible.length === 0 && <Empty title={`No ${tab.toLowerCase()} applications`} body="Applications with this status will appear here." />}
      </div>
    </div>
  );
}
