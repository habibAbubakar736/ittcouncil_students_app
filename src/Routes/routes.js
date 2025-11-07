import ExamDetails from "../Pages/Accounts/ExamConduct/ExamDetails";
import StartExam from "../Pages/Accounts/ExamConduct/StartExam";
import UpcominExam from "../Pages/Accounts/ExamConduct/UpcominExam";
import MyProfile from "../Pages/Accounts/MyProfile/MyProfile";
import StudentsPrograms from "../Pages/Accounts/MyProfile/StudentsPrograms";
import Dashboard from "../Pages/Dashboard/Dashboard";
import FailedOutReport from "../Pages/Reports/FailedOutReport";
import PassOutReport from "../Pages/Reports/PassOutReport";

const routes = [
  { path: "/", element: <Dashboard /> },

  // ------------------ Students Profile // ------------------ 
  { path: "/Student/Profile", element: <MyProfile /> },
  { path: "/Student/Programs", element: <StudentsPrograms /> },
  { path: "/Student/StartExam/:master_subject_id", element: <StartExam /> },
  { path: "/Student/UpcominExam", element: <UpcominExam /> },
  { path: "/Student/ExamDetails/:student_subject_id?", element: <ExamDetails /> },

  { path: "/Reports/PassOut", element: <PassOutReport /> },
  { path: "/Reports/FailedOut", element: <FailedOutReport /> },



];

export default routes;
