
export const metadata = {
  title: "About | Emilio Rivera Portfolio",
  description:
    "Welcome to the about page where you can learn more about Emilio Rivera's Software Engineering journey",
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
