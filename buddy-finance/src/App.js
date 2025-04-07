import React from "react";
import { PageProvider } from "./PageContext"; // PageContext provider
import AppContent from "./AppContent"; // Handles conditional rendering


const App = () => {
  return (
    <PageProvider>
      <div style={{ textAlign: "center" }}>
        <main>
          <AppContent />
        </main>
      </div>
    </PageProvider>
  );
};

export default App;
