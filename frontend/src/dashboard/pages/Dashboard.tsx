import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <main className="sm:w-3/6 mx-4 sm:mx-auto mt-10">
        <Outlet/>
      </main>
    </>
  );
}
