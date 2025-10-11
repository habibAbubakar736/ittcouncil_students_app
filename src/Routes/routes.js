import StudentProfile from "../Pages/Accounts/MyProfile/Tabs/StudentProfile";
import Dashboard from "../Pages/Dashboard/Dashboard";

const routes = [
  { path: "/", element: <Dashboard /> },

  // ------------------ Students Profile // ------------------ 
  { path: "/Student/Profile", element: <StudentProfile /> },
];

export default routes;
