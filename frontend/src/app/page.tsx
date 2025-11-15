"use client";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <h2
        className="text-center w-full underline cursor-pointer m-40 text-blue-600"
        onClick={() => (window.location.href = "/projects/")}
      >
        Please go to /projects/ to pick out a project to edit interface
      </h2>
    </div>
  );
}
