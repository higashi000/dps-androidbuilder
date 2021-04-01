import { start } from "https://deno.land/x/denops_std@v0.2/mod.ts";
import SearchGradlew from "./search_gradlew.ts";

start(async (vim) => {
    vim.register({
        async AssembleDebug(): Promise<void> {
            const path = await SearchGradlew();

            if (path === "error: `Gradlew` is not found in current directory") {
                console.log("da;slkfja;klgjarg;lrkjg");
                return;
            }

            console.log("hogehoge");
        }
    })

    vim.execute(`
        command! AndroidBuilder :call denops#request("androidbuilder", "AssembleDebug", [])
    `)

    console.log("dps-androidbuilder has loaded!");
})
