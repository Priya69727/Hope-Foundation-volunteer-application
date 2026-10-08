import { useState } from "react";
import { Avatar, Button, Detail, Icon, SectionTitle, Status, type Page } from "../components/shared";
import { useDemoStore } from "../components/demoStore";

export function ProfilePage({ go }: { go: (page: Page) => void }) {
  const { data, setData } = useDemoStore();
  const [editing, setEditing] = useState(false);
  const [addingSkill, setAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);
  const updateProfile = (field: keyof typeof data.profile, value: string) => setData((current) => ({ ...current, profile: { ...current.profile, [field]: value } }));
  const addSkill = () => {
    const skill = newSkill.trim();
    if (!skill || data.profile.skills.includes(skill)) return;
    setData((current) => ({ ...current, profile: { ...current.profile, skills: [...current.profile.skills, skill] } }));
    setNewSkill("");
    setAddingSkill(false);
  };
  return (
    <div className="page">
      <section className="profile-hero panel"><div className="profile-avatar-wrap"><Avatar large name={data.profile.fullName} image={data.profile.avatar} /><label className="icon-btn" aria-label="Change photo"><Icon name="camera" size={17} /><input hidden type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (!file || file.size > 2_000_000) return; const reader = new FileReader(); reader.onload = () => updateProfile("avatar", String(reader.result)); reader.readAsDataURL(file); }} /></label></div><div><div className="profile-name"><h1>{data.profile.fullName}</h1><Status tone="success">Active volunteer</Status></div><p><Icon name="map" size={16} /> {data.profile.location} · Member since January 2024</p></div><Button variant="secondary" icon="edit" onClick={() => { if (editing) setSaved(true); setEditing(!editing); }}>{editing ? "Save profile" : "Edit profile"}</Button></section>
      {saved && <p role="status" className="toast">Profile saved in this browser.</p>}
      <div className="profile-grid"><main>
        <section className="panel profile-section"><SectionTitle title="About me" />{editing ? <textarea value={data.profile.about} onChange={(event) => updateProfile("about", event.target.value)} /> : <p>{data.profile.about}</p>}</section>
        <section className="panel profile-section"><SectionTitle title="Personal details" /><div className="details-grid"><Detail label="Full name" value={data.profile.fullName} editing={editing} onChange={(value) => updateProfile("fullName", value)} /><Detail label="Email" value={data.profile.email} editing={editing} onChange={(value) => updateProfile("email", value)} type="email" /><Detail label="Phone" value={data.profile.phone} editing={editing} onChange={(value) => updateProfile("phone", value)} type="tel" /><Detail label="Location" value={data.profile.location} editing={editing} onChange={(value) => updateProfile("location", value)} /></div></section>
        <section className="panel profile-section"><SectionTitle title="Volunteer history" action="View all" onClick={() => go("contributions")} /><div className="history-item"><span className="history-icon"><Icon name="folder" /></span><div><strong>Learning Together</strong><p>Teaching Assistant · Jan–Mar 2026</p></div><strong>16 hrs</strong></div><div className="history-item"><span className="history-icon"><Icon name="calendar" /></span><div><strong>Blood Donation Camp</strong><p>Registration Desk · Sep 2026</p></div><strong>5 hrs</strong></div></section>
      </main><aside>
        <section className="panel profile-section"><SectionTitle title="Skills" action={addingSkill ? "Cancel" : "+ Add"} onClick={() => setAddingSkill(!addingSkill)} />{addingSkill && <label className="search-field"><input aria-label="New skill" value={newSkill} onChange={(event) => setNewSkill(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addSkill(); } }} placeholder="Add a skill" /><Button disabled={!newSkill.trim()} onClick={addSkill}>Add</Button></label>}<div className="skill-row">{data.profile.skills.map((skill) => <span key={skill}>{skill}{editing && <button aria-label={`Remove ${skill}`} onClick={() => setData((current) => ({ ...current, profile: { ...current.profile, skills: current.profile.skills.filter((item) => item !== skill) } }))}><Icon name="x" size={12} /></button>}</span>)}</div></section>
        <section className="panel profile-section"><SectionTitle title="Availability" />{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => { const unavailable = data.unavailableDays.includes(day); return <button className="availability" key={day} onClick={() => setData((current) => ({ ...current, unavailableDays: unavailable ? current.unavailableDays.filter((item) => item !== day) : [...current.unavailableDays, day] }))}><span>{day}</span>{unavailable ? <small>Not available</small> : <Status tone="success">Available</Status>}</button>; })}</section>
      </aside></div>
    </div>
  );
}
