# Next.js fetch-patch bug

Reproduction for [Next.js issue 65381](https://github.com/vercel/next.js/issues/65381)

Illustrates the problem with [setting the `__nextPatched` property on the fetch function itself](https://github.com/vercel/next.js/blob/9ec37c120aba9d5f16e00566a10cba68858e363d/packages/next/src/server/lib/patch-fetch.ts#L779) to determine if the function has already been patched.

Any other library / function that patches global fetch will essentially hide this property, and so Next.js will subsequently try to patch it again.

Aside from extra stack overhead, memory usage, recursive trace calls, etc, this might not be a huge problem – but something (not entirely sure what) causes it to deadlock once it's been wrapped multiple times.

## Reproducing

```
npm install
npm run deploy
```

Then load the page (will probably load fine), and then reload the page.
May need to load a few times to ensure you hit the same isolate, but works first reload for me.

Second page load should freeze and eventually 504.

Can be seen live at https://nextjs-bug-eight.vercel.app
