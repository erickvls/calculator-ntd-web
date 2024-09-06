'use client';
import withAuth from "@/src/hoc/withAuth";

function Page() {
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default withAuth(Page)