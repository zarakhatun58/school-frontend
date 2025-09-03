"use client";

import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
