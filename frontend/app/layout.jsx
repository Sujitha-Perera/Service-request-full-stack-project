import AuthProvider from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto p-6 md:p-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
