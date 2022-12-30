import { Outlet } from "react-router-dom";
import CategoriesDirectory from "./../../components/categories-directory/categories-directory.component";
const Home = () => {
  
  return (
    <div>
      <CategoriesDirectory/>
      <Outlet />

    </div>
  );
};

export default Home;
