import Movies from "@/components/Movies";
import { TSearchParams } from "@/types/types";

const Home = ({ searchParams }: { searchParams: TSearchParams }) => {
  return (
    <>
      <Movies searchParams={searchParams} />
    </>
  );
};

export default Home;
