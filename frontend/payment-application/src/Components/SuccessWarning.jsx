export function SuccessWarning({ message }) {
    return (
      <div className="px-5 py-3 rounded-lg shadow-md bg-green-600 text-white text-xl font-mono font-bold flex items-center gap-4">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="text-2xl">Success!</div>
          <div>{message}</div>
        </div>
      </div>
    );
  }
  