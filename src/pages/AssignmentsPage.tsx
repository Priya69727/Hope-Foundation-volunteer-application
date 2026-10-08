import { useState } from "react";
import { Button, Empty, Icon, PageHeader, Status, type Page } from "../components/shared";

export function AssignmentsPage({ go }: { go: (p: Page) => void }) {
  const [tab, setTab] = useState("Current");
  const assignments = [
    { title: "Food Distribution Program", role: "Distribution Coordinator", date: "20 October · 9:00 AM", location: "Community Centre, Pune", status: "Upcoming", tone: "info" as const, group: "Current" },
    { title: "Blood Donation Camp", role: "Registration Desk", date: "25 October · 8:00 AM", location: "Ruby Hall, Pune", status: "Assigned", tone: "success" as const, group: "Upcoming" },
    { title: "Learning Together", role: "Teaching Assistant", date: "28 September · 10:00 AM", location: "Pune Community School", status: "Completed", tone: "success" as const, group: "Completed" },
  ];
  const visible = assignments.filter((assignment) => assignment.group === tab);
  return (
    <div className="page">
      <PageHeader title="My Assignments" description="Everything you need for your upcoming and completed activities." />
      <div className="tabs">{["Current", "Upcoming", "Completed"].map((name) => <button className={tab === name ? "active" : ""} key={name} onClick={() => setTab(name)}>{name}<span>{assignments.filter((assignment) => assignment.group === name).length}</span></button>)}</div>
      <div className="assignment-list">
        {visible.length ? visible.map((assignment) => <AssignmentCard key={assignment.title} {...assignment} go={go} />) : <Empty title={`No ${tab.toLowerCase()} assignments`} body="Assignments in this category will appear here." />}
      </div>
    </div>
  );
}

function AssignmentCard({ title, role, date, location, status, tone, go }: { title: string; role: string; date: string; location: string; status: string; tone: "info" | "success"; go: (p: Page) => void }) {
  return <article className="panel assignment-card"><div className="assignment-date"><strong>{date.split(" ")[0]}</strong><span>OCT</span></div><div className="assignment-main"><div><span className="eyebrow">PROJECT ASSIGNMENT</span><h3>{title}</h3><p><Icon name="briefcase" size={17} />{role}</p></div><Status tone={tone}>{status}</Status></div><div className="assignment-meta"><span><Icon name="calendar" size={17} />{date}</span><span><Icon name="map" size={17} />{location}</span></div><Button variant="secondary" onClick={() => go("assignment-detail")}>View assignment</Button></article>;
}
