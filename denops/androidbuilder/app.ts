import { main } from "https://deno.land/x/denops_std@v0.8/mod.ts";
import SearchGradlew from "./search_gradlew.ts";

main(async ({ vim }) => {
  vim.register({
    async execute_androidbuilder(cmd: unknown): Promise<void> {
      if (typeof cmd !== "string") {
        throw new Error(
          `'cmd' attribute of 'execute_androidbuilder' in must be a string`,
        );
      }

      const nowDir = await vim.call("getcwd") as string;

      const path = await SearchGradlew(nowDir + "/");

      if (path === "error: `Gradlew` is not found in current directory") {
        return;
      }

      await vim.cmd(`cd ${path}`);

      await vim.cmd(`!./gradlew ${cmd}`);

      await vim.cmd(`cd ${nowDir}`);
    },
  });

  vim.execute(`
        command! InstallDebug :call denops#request("androidbuilder", "execute_androidbuilder", ["installDebug"])
        command! AssembleDebug :call denops#request("androidbuilder", "execute_androidbuilder", ["assembleDebug"])
        command! AndroidBuilderHello :call denops#request("androidbuilder", "hello", [])
    `);

  console.log("dps-androidbuilder has loaded!");
});
