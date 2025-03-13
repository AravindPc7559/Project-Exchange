'use client';
import { useRouter } from "next/navigation";
import InitialLoader from "./Components/InitialLoader/InitialLoader";

export default function Home() {
  const router = useRouter();

  setTimeout(() => {
    router.push('/login');
  }, 500)
  return (
    <InitialLoader />
  );
}
