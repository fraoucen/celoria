import "./globals.css";

export const runtime = "edge";

export const metadata = {
  title: "FactureClair — Votre feuille de route en 1 minute",
  description:
    "Comprenez simplement ce que la réforme de la facturation électronique change pour votre activité.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
