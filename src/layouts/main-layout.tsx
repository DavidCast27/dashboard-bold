import Header from "../components/header/header.tsx";
import Dashboard from "../pages/dashboard/dashboard.tsx";

const MainLayout = () => {
  return (
    <>
      <Header/>
      <Dashboard/>
    </>
  );
};

export default MainLayout;