export const metadata = {
  title: "Porfolio | Emilio Rivera's Portfolio",
  description:
    "Emilio created an internal employee web application using MongoDB, Express.js, Node.js, and React to help manage programs for Casa Chirilagua, a non-profit organization based in the City of Alexandria, Virginia"
};

/**
 * 
 * The layout page for my-portfolio
 * 
 * @param {React.ReactNode} children
 * @returns layout
 */
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
