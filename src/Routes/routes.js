import MyProfile from "../Pages/Accounts/MyProfile/MyProfile";
import StudentExam from "../Pages/Accounts/MyProfile/Tabs/StudentExam";
import Dashboard from "../Pages/Dashboard/Dashboard";

const routes = [
  { path: "/", element: <Dashboard /> },

  // ------------------ Students Profile // ------------------ 
  { path: "/Student/Profile", element: <MyProfile /> },


  { path: "/Student/UpcomingExam", element: <StudentExam /> },
  { path: "/Student/Exam", element: <StudentExam /> },
];

export default routes;
