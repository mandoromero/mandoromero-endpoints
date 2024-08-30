import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Favorites from "./components/Favorites";
import Details from "./components/Details";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="details/:type/:id" element={<Details />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
);