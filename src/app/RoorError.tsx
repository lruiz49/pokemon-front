import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RootError() {
  const err = useRouteError();
  if (isRouteErrorResponse(err)) {
    return (
      <div className="p-6 space-y-2">
        <h1 className="text-xl font-bold">Route Error</h1>
        <div>Status: {err.status}</div>
        <pre className="p-3 bg-neutral-900 text-neutral-100 rounded">
          {err.statusText}
          {typeof err.data === "string" ? `\n${err.data}` : ""}
        </pre>
      </div>
    );
  }
  return (
    <div className="p-6 space-y-2">
      <h1 className="text-xl font-bold">Unknown Error</h1>
      <pre className="p-3 bg-neutral-900 text-neutral-100 rounded">
        {err instanceof Error ? err.stack || err.message : JSON.stringify(err, null, 2)}
      </pre>
    </div>
  );
}