import "./globals.css";

export const runtime = "edge";

export const metadata = {
  title: "Celoria — Trouvez votre solution de facturation",
  description:
    "Clarifiez vos obligations et comparez vos besoins pour trouver une solution de facturation adaptée.",
  icons: {
    icon: "/celoria-icon.png",
    apple: "/celoria-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
