import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "regenerator-runtime/runtime";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
