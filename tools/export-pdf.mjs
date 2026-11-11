// Exports docs/index.html as a single-page, print-ready PDF.
// Usage: serve the repo (python -m http.server 8123), then
//   node tools/export-pdf.mjs [url] [output.pdf]
// Needs Node 22+ (built-in WebSocket) and Google Chrome.
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const url = process.argv[2] ?? "http://localhost:8123/docs/";
const out = process.argv[3] ?? "docs/downloads/spring-boot-4-poster.pdf";
const chrome = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9333;

const proc = spawn(chrome, [
  "--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "poster-"))}`, "--window-size=1680,1200", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
}
if (!target) throw new Error("Chrome did not start");

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const n = ++id;
  pending.set(n, (m) => (m.error ? reject(new Error(m.error.message)) : resolve(m.result)));
  ws.send(JSON.stringify({ id: n, method, params }));
});

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1600, height: 1200, deviceScaleFactor: 1, mobile: false });
await send("Emulation.setEmulatedMedia", { media: "print" });
await send("Page.navigate", { url });
await sleep(2500);
await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });

const { result } = await send("Runtime.evaluate", {
  expression: "Math.ceil(document.querySelector('.poster').getBoundingClientRect().height)",
  returnByValue: true,
});
const heightPx = result.value;

// 96 px per inch in CSS
const pdf = await send("Page.printToPDF", {
  paperWidth: 1600 / 96,
  paperHeight: heightPx / 96,
  marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  printBackground: true,
  preferCSSPageSize: false,
  displayHeaderFooter: false,
});
writeFileSync(out, Buffer.from(pdf.data, "base64"));
console.log(`Wrote ${out}: 1600 x ${heightPx} px (${(1600 / 96 * 25.4).toFixed(0)} x ${(heightPx / 96 * 25.4).toFixed(0)} mm)`);

ws.close();
proc.kill();
