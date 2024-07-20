import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Trailers from "./Routes/Trailers";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Header />
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/*",
        element: <Home />,
      },
      {
        path: "/movies/:category/:id",
        element: <Home />,
      },
      {
        path: "/tv",
        element: <Tv />,
      },
      {
        path: "/tv/:category/:id",
        element: <Tv />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/search/movies/:id",
        element: <Search />,
      },
      {
        path: "/search/tv/:id",
        element: <Search />,
      },
      {
        path: "/trailers/:id",
        element: <Trailers />,
      }
    ],
  },
]);// router setting, 라우터를 layout + outlet으로 하고 새로운 route로 이동하기 위한 세팅

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}// 걍 일부로 hashrouter 안썼음. => gh-page routing 문제는 나중에 vercel로 재배포 할거라 무시.

export default App
