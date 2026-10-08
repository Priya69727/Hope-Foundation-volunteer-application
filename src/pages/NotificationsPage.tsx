import { Button, Icon, NotificationItem, PageHeader } from "../components/shared";
import { useDemoStore } from "../components/demoStore";

const notifications = [
  { title: "Your application was approved", body: "You’ve been approved for Learning Together. View your new assignment.", time: "12 minutes ago" },
  { title: "Assignment reminder", body: "Food Distribution Program starts in 6 days. Your instructions are ready.", time: "2 hours ago" },
  { title: "New event matching your skills", body: "A teaching event in Pune matches your profile and availability.", time: "Yesterday" },
  { title: "Volunteer hours updated", body: "5 hours from Blood Donation Camp were added to your contribution history.", time: "2 days ago" },
];

export function NotificationsPage() {
  const { data, setData } = useDemoStore();
  const unreadCount = data.notificationRead.filter((read) => !read).length;
  const markRead = (index: number) => setData((current) => ({ ...current, notificationRead: current.notificationRead.map((read, itemIndex) => itemIndex === index ? true : read) }));
  return (
    <div className="page"><PageHeader title="Notifications" description="Updates about your applications, assignments, and community." action={<Button variant="secondary" disabled={unreadCount === 0} onClick={() => setData((current) => ({ ...current, notificationRead: current.notificationRead.map(() => true) }))}>Mark all as read</Button>} /><div className="panel notifications-list">
      {notifications.map((notification, index) => <NotificationItem key={notification.title} {...notification} unread={!data.notificationRead[index]} onClick={() => markRead(index)} />)}
    </div></div>
  );
}
