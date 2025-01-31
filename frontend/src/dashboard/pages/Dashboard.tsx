import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <main className="w-3/6 mx-auto mt-10">
        <Outlet/>
      </main>
    </>
  );
}
