'use client';
export default function Tailwind_Learning() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        <div className="bg-red-300 p-5">
          <div className="text-center">login form</div>
          <div className="flex">
            <div className="">input username:</div>
            <input
              type="text"
              className="bg-amber-200"
              placeholder="password"
            />
          </div>
          <div className="flex">
            <div className="">input password:</div>
            <input
              type="text"
              className="bg-amber-200"
              placeholder="username"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
