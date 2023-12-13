import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export const magicRoutes = (routes: Array<RoutesType>) => {
  return (
    <>
      {routes.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={<ProtectedRoute>{item.component}</ProtectedRoute>}
        >
          {item.children && magicRoutes(item.children)}
        </Route>
      ))}
    </>
  );
};
