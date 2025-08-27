import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/app";
import PokedexPage from "./pages/PokedexPage"; 
import "./index.css";
import { pokedexLoader } from "./pages/loaders/pokedexLoader";
import RootError from "./app/RoorError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RootError />,   
    children: [
      { index: true, loader: pokedexLoader, element: <PokedexPage /> },
      // { path: "pokemon/:id", loader: detailLoader, element: <PokemonDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);