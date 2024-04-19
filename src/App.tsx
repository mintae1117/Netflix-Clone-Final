import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

const router = createBrowserRouter([
  {
    path: "/Netflix-Clone-Final/",
    element: (
      <Header />
    ),
    children: [
      {
        path: "/Netflix-Clone-Final/",
        element: <Home />,
      },
      {
        path: "/Netflix-Clone-Final/movies/:category/:id",
        element: <Home />,
      },
      {
        path: "/Netflix-Clone-Final/tv",
        element: <Tv />,
      },
      {
        path: "/Netflix-Clone-Final/tv/:category/:id",
        element: <Tv />,
      },
      {
        path: "/Netflix-Clone-Final/search",
        element: <Search />,
      },
      {
        path: "/Netflix-Clone-Final/search/:category/:id",
        element: <Search />,
      },
    ],
  },
]);// router setting, 라우터를 layout + outlet으로 render하고 새로운 route로 이동하기 위한 세팅


function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App
