import { start } from "https://deno.land/x/denops_std@v0.2/mod.ts";
import SearchGradlew from "./search_gradlew.ts";

start(async (vim) => {
    vim.register({
        async install_debug(): Promise<void> {
            const nowDir = await vim.call('getcwd') as string;

            const path = await SearchGradlew(nowDir + "/");

            if (path === "error: `Gradlew` is not found in current directory") {
                console.log("da;slkfja;klgjarg;lrkjg");
                return;
            }


            console.log("a");
            await vim.cmd('cd ' + path);

            await vim.cmd('!./gradlew installDebug')

            await vim.cmd('cd ' + nowDir);

        },

        async hello(): Promise<void> {
            console.log("hogehogejfa;ldkjas;dkljbva");
        },
    });

    vim.execute(`
        command! AndroidBuilder :call denops#request("androidbuilder", "install_debug", [])
        command! AndroidBuilderHello :call denops#request("androidbuilder", "hello", [])
    `)

    console.log("dps-androidbuilder has loaded!");
})
