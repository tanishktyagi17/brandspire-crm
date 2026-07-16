import {
  LayoutDashboard,
  Users,
  FileText,
  UserPlus,
  CheckSquare,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    title: "Invoices",
    icon: FileText,
    path: "/invoices",
  },
  {
    title: "Leads",
    icon: UserPlus,
    path: "/leads",
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];