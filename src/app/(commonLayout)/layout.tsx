import Navbar from "@/components/Navbar";
import { ReactNode, Suspense } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}> {children}</Suspense>
    </>
  );
};

export default CommonLayout;
