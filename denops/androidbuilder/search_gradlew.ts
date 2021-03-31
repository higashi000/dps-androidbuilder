async function GetCurrentDirFiles(): Promise<boolean> {
    for await (const dirEntry of Deno.readDir('./')) {
        if (dirEntry.name === "Gradlew") {
            return true;
        }
    }

    return false;
}

console.log(await GetCurrentDirFiles());
