import React from "react";
import { Toaster } from "sonner";
import AppRoutes from "routes/AppRoutes";

const App = () => {
  return (
    <React.StrictMode>
      <Toaster richColors />
      <AppRoutes />
    </React.StrictMode>
  );
};

export default App;
