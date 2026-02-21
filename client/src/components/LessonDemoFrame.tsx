import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export type LessonDemo = {
  title: string;
  description: string;
  html: string;
  css: string;
  js: string;
  instructions: string[];
};

function buildSrcDoc(html: string, css: string, js: string) {
  const safeJs = js.replace(/<\/script>/gi, "<\\/script>");

  return `<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      :root { color-scheme: light dark; }
      body {
        margin: 0;
        font-family: Inter, system-ui, -apple-system, sans-serif;
        background: #0f0f10;
        color: #f4e8c8;
      }
      .container { padding: 16px; }
      .panel {
        border: 1px solid rgba(214, 168, 79, 0.45);
        border-radius: 12px;
        background: rgba(20, 18, 22, 0.9);
        padding: 12px;
      }
      #output { margin-top: 12px; white-space: pre-wrap; font-size: 13px; color: #d8c38f; }
      button, input, select {
        font: inherit;
      }
      ${css}
    </style>
  </head>
  <body>
    <div class="container">
      <div class="panel">${html}</div>
      <div id="output"></div>
    </div>
    <script>
      const output = document.getElementById("output");
      const originalLog = console.log;
      console.log = (...args) => {
        originalLog(...args);
        if (output) {
          output.textContent += args.join(" ") + "\\n";
        }
      };
      window.onerror = (message) => {
        if (output) output.textContent += "Errore: " + message + "\\n";
      };
    </script>
    <script>${safeJs}</script>
  </body>
</html>`;
}

export function LessonDemoFrame({ demo }: { demo: LessonDemo }) {
  const [code, setCode] = useState(demo.js);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    setCode(demo.js);
    setVersion(0);
  }, [demo.js, demo.title]);

  const srcDoc = useMemo(
    () => buildSrcDoc(demo.html, demo.css, code),
    [demo.css, demo.html, code, version],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-primary/25 bg-card p-4">
        <h3 className="text-base font-semibold">{demo.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{demo.description}</p>
        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
          {demo.instructions.map((item, idx) => (
            <li key={idx}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-primary">
          Codice Eseguibile (JS)
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[180px] w-full rounded-xl border border-primary/25 bg-muted/50 p-3 font-mono text-xs leading-6 text-foreground outline-none ring-primary/40 focus:ring-2"
        />
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setVersion((v) => v + 1)} className="gap-2">
            <Play className="h-4 w-4" />
            Esegui
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setCode(demo.js);
              setVersion((v) => v + 1);
            }}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <iframe
        key={version}
        title={demo.title}
        sandbox="allow-scripts"
        srcDoc={srcDoc}
        className="h-[320px] w-full rounded-2xl border border-primary/25 bg-card"
      />
    </div>
  );
}
