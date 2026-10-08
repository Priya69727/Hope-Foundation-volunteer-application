import { useEffect, useState } from "react";
import { Empty, FilterBar, Icon, OpportunityCard, PageHeader, opportunities, type Page } from "../components/shared";

export function ProjectsPage({ go, events = false, searchQuery = "", onSearchQueryChange }: { go: (p: Page) => void; events?: boolean; searchQuery?: string; onSearchQueryChange?: (query: string) => void }) {
  const [query, setQuery] = useState(searchQuery);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  useEffect(() => setQuery(searchQuery), [searchQuery]);
  const items = opportunities.concat(events ? [opportunities[0]] : []).map((item, index) => ({
    ...item,
    type: events ? ["Health", "Community", "Education", "Environment"][index] : item.type,
  }));
  const categories = [...new Set(items.map((item) => item.type))];
  const locations = [...new Set(items.map((item) => item.location))];
  const skills = [...new Set(items.flatMap((item) => item.skills))];
  const visible = items.filter((item) =>
    `${item.title} ${item.type} ${item.location} ${item.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase()) &&
    (!category || item.type === category) &&
    (!location || item.location === location) &&
    (!skill || item.skills.includes(skill)),
  );
  if (sortByDate) visible.reverse();

  return (
    <div className="page">
      <PageHeader title={events ? "Upcoming Events" : "Projects"} description={events ? "Join events that bring people together for lasting change." : "Discover opportunities to contribute your skills and time."} />
      <FilterBar placeholder={events ? "Search events..." : "Search projects..."} query={query} onQueryChange={(value) => { setQuery(value); onSearchQueryChange?.(value); }} category={category} onCategoryChange={setCategory} categories={categories} location={location} onLocationChange={setLocation} locations={locations} skill={skill} onSkillChange={setSkill} skills={skills} />
      <div className="result-row"><span><strong>{visible.length}</strong> opportunities near you</span><button onClick={() => setSortByDate(!sortByDate)}>{sortByDate ? "Recently added" : "Most relevant"} <Icon name="chevron" size={14} /></button></div>
      <div className="opportunity-grid">
        {visible.length ? visible.map((item, index) => <OpportunityCard item={item} key={`${item.title}-${index}`} onView={() => go("project-detail")} />) : <Empty title="No matching opportunities" body="Try clearing a filter or changing your search." />}
      </div>
    </div>
  );
}
