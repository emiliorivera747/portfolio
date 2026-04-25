export const metadata = {
  title: "Posts | Emilio Rivera's Portfolio",
  description:
    "Browse a collection of posts showcasing Emilio Rivera's projects, experiences, and insights. Discover detailed write-ups and updates on topics including public speaking, software engineering, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
