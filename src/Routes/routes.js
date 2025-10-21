import StartExam from "../Pages/Accounts/ExamConduct/StartExam";
import StudentExam from "../Pages/Accounts/MyProfile/Tabs/StudentExam";
import StudentProfile from "../Pages/Accounts/MyProfile/Tabs/StudentProfile";
import Dashboard from "../Pages/Dashboard/Dashboard";

const routes = [
  { path: "/", element: <Dashboard /> },

  // ------------------ Students Profile // ------------------ 
  { path: "/Student/Profile", element: <StudentProfile /> },


  { path: "/Student/UpcomingExam", element: <StudentExam /> },
  { path: "/Student/Exam", element: <StudentExam /> },
  { path: "/Student/StartExam/:master_subject_id?", element: <StartExam /> },
];

export default routes;
