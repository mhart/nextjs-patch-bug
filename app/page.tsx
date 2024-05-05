export const runtime = "edge";

const fetchPatchedSymbol = Symbol.for("nextjs patch bug");

if (!(globalThis as any)[fetchPatchedSymbol]) {
  const currentFetchIsNextPatched = (globalThis.fetch as any).__nextPatched;

  console.log(
    "Patching fetch! Current fetch is Next.js patched:",
    currentFetchIsNextPatched // Should be `true`
  );

  const globalFetch = globalThis.fetch;
  globalThis.fetch = (...args) => globalFetch(...args);
  (globalThis as any)[fetchPatchedSymbol] = true;

  // Uncommenting this line "fixes" the bug – Next.js won't try to recursively patch
  // (globalThis.fetch as any).__nextPatched = true;
} else {
  console.log("Already patched fetch!");
}

export default async function HomePage() {
  const id = crypto.randomUUID();

  console.log(`Begin fetch: ${id}`);

  // Fully consume the fetch (can be to anywhere)
  // Harder to reproduce when fetch is cached, so make url random
  await (await fetch(`https://vercel.com/?cb=${id}`)).arrayBuffer();

  console.log(`End fetch: ${id}`);

  // Will probably render ok first time, but reload will freeze
  return <div>OK</div>;
}
