import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Header />
      <main>{children}</main>
    </ProtectedRoute>
  );
}
