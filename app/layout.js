import "./globals.css";

export const runtime = "edge";

export const metadata = {
  title: "Celoria — Des parcours clairs pour vos décisions professionnelles",
  description:
    "Des parcours gratuits et rapides pour comprendre votre situation et trouver une solution adaptée.",
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
