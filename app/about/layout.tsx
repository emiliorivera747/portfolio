export const metadata = {
  title: "Casa Chirilagua | Emilio Rivera Portfolio",
  description:
    "Emilio created an internal employee web application using MongoDB, Express.js, Node.js, and React to help manage programs for Casa Chirilagua, a non-profit organization based in the City of Alexandria, Virginia"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <body>{children}</body>
    </div>
  );
}
