import type { Metadata } from "next";
// import '@/components/styles/srch_components.css'
// import "@/app/styles/App.css";


export const metadata: Metadata = {
  title: "Research Tools",
  description: "A collection of Research tools developed by G6 company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
