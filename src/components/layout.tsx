import { useState } from "react";
import { DashboardPage } from "../pages/DashboardPage.tsx";
import { ProfilePage } from "../pages/ProfilePage.tsx";
import { ProjectsPage } from "../pages/ProjectsPage.tsx";
import { ProjectDetailPage } from "../pages/ProjectDetailPage.tsx";
import { ApplicationsPage } from "../pages/ApplicationsPage.tsx";
import { ApplicationDetailPage } from "../pages/ApplicationDetailPage.tsx";
import { AssignmentsPage } from "../pages/AssignmentsPage.tsx";
import { AssignmentDetailPage } from "../pages/AssignmentDetailPage.tsx";
import { ContributionsPage } from "../pages/ContributionsPage.tsx";
import { PostsPage } from "../pages/PostsPage.tsx";
import { NetworkingPage } from "../pages/NetworkingPage.tsx";
import { SettingsPage } from "../pages/SettingsPage.tsx";
import { NotificationsPage } from "../pages/NotificationsPage.tsx";
import { useDemoStore } from "./demoStore";
import { Avatar, Icon, Logo, NotificationItem, nav, pageTitles, type Page } from "./shared";

export function Sidebar({ page, setPage, open, close, logout }: { page: Page; setPage: (p: Page) => void; open: boolean; close: () => void; logout: () => void }) {
  const go = (p: Page) => { setPage(p); close(); };
  return (
    <>
      {open && <button className="sidebar-scrim" onClick={close} aria-label="Close navigation" />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-head"><Logo inverse /><button className="icon-btn sidebar-close" onClick={close}><Icon name="x" /></button></div>
        <nav className="nav-list" aria-label="Main navigation">
          {nav.map((item) => (
            <button key={item.id} className={`nav-item ${page === item.id || page.startsWith(item.id.slice(0, -1)) ? "active" : ""}`} onClick={() => go(item.id)}>
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className={`nav-item ${page === "settings" ? "active" : ""}`} onClick={() => go("settings")}><Icon name="settings" /><span>Settings</span></button>
          <button className="nav-item" onClick={logout}><Icon name="logout" /><span>Logout</span></button>
          <div className="impact-mini"><span className="impact-icon"><Icon name="heart" size={18} /></span><div><strong>48 hours</strong><small>of impact this year</small></div></div>
        </div>
      </aside>
    </>
  );
}

export function Topbar({ page, setPage, openMenu, searchQuery, onSearchChange }: { page: Page; setPage: (p: Page) => void; openMenu: () => void; searchQuery: string; onSearchChange: (query: string) => void }) {
  const { data, setData } = useDemoStore();
  const [notes, setNotes] = useState(false);
  const unreadCount = data.notificationRead.filter((read) => !read).length;
  return (
    <header className="topbar">
      <div className="topbar-title">
        <button className="icon-btn mobile-menu" onClick={openMenu}><Icon name="menu" /></button>
        <span>Volunteer portal</span><Icon name="chevron" size={14} /><strong>{pageTitles[page]}</strong>
      </div>
      <div className="topbar-actions">
        <div className="top-search"><Icon name="search" size={18} /><input aria-label="Search opportunities" placeholder="Search opportunities..." value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") setPage("projects"); }} /></div>
        <div className="notification-wrap">
          <button className="icon-btn notification-button" onClick={() => setNotes(!notes)} aria-label={`Notifications, ${unreadCount} unread`}><Icon name="bell" />{unreadCount > 0 && <span />}</button>
          {notes && (
            <div className="notification-popover">
              <div className="popover-head"><strong>Notifications</strong><button onClick={() => { setPage("notifications"); setNotes(false); }}>View all</button></div>
              <NotificationItem title="Application approved" body="You’re approved for Learning Together." time="12 min" unread={!data.notificationRead[0]} onClick={() => { setData((current) => ({ ...current, notificationRead: current.notificationRead.map((value, index) => index === 0 ? true : value) })); setPage("notifications"); setNotes(false); }} />
              <NotificationItem title="New event for you" body="A teaching event matches your skills." time="2 hr" unread={!data.notificationRead[2]} onClick={() => { setData((current) => ({ ...current, notificationRead: current.notificationRead.map((value, index) => index === 2 ? true : value) })); setPage("notifications"); setNotes(false); }} />
            </div>
          )}
        </div>
        <button className="profile-button" onClick={() => setPage("profile")}><Avatar name={data.profile.fullName} image={data.profile.avatar} /><span><strong>{data.profile.fullName}</strong><small>Active volunteer</small></span><Icon name="chevron" size={15} /></button>
      </div>
    </header>
  );
}

export function AppShell({ logout }: { logout: () => void }) {
  const [page, setPage] = useState<Page>("dashboard");
  const [menu, setMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  let content: React.ReactNode;
  switch (page) {
    case "dashboard": content = <DashboardPage go={setPage} />; break;
    case "profile": content = <ProfilePage go={setPage} />; break;
    case "projects": content = <ProjectsPage go={setPage} searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />; break;
    case "project-detail": content = <ProjectDetailPage go={setPage} />; break;
    case "events": content = <ProjectsPage go={setPage} events searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />; break;
    case "applications": content = <ApplicationsPage go={setPage} />; break;
    case "application-detail": content = <ApplicationDetailPage go={setPage} />; break;
    case "assignments": content = <AssignmentsPage go={setPage} />; break;
    case "assignment-detail": content = <AssignmentDetailPage go={setPage} />; break;
    case "contributions": content = <ContributionsPage />; break;
    case "posts": content = <PostsPage go={setPage} />; break;
    case "networking": content = <NetworkingPage />; break;
    case "settings": content = <SettingsPage />; break;
    case "notifications": content = <NotificationsPage />; break;
  }

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} open={menu} close={() => setMenu(false)} logout={logout} />
      <div className="app-main">
        <Topbar page={page} setPage={setPage} openMenu={() => setMenu(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        {content}
      </div>
    </div>
  );
}
