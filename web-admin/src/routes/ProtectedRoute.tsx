import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { CLI_COOKIE_KEYS, CliCookieService } from "services/cli-cookie";

function ProtectedRoute({ children }: PropsWithChildren) {
  const token = CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN);

  if (!token) return <Navigate to={"/auth/login"} replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
