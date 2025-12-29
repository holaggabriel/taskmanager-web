// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import { ThemeProvider } from "@/contexts/ThemeContext";

import { routes } from "@/routes/router";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoute } from "@/routes/PublicRoute";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<p>Cargando...</p>} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />

            <Routes>
              {routes.map(({ path, element, requiresAuth }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    requiresAuth ? (
                      <ProtectedRoute>{element}</ProtectedRoute>
                    ) : (
                      <PublicRoute>{element}</PublicRoute>
                    )
                  }
                />
              ))}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
