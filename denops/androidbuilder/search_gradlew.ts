async function ExistGradlew(filepath: string): Promise<boolean> {
    for await (const dirEntry of Deno.readDir(filepath)) {
        if (dirEntry.name === "Gradlew") {
            return true;
        }
    }

    return false;
}

async function SearchGradlew(): Promise<string> {
    let path = "./";


    let existGradlew: boolean = false;

    let currentDir = new URL(path, import.meta.url).pathname;
    while (true) {

        if (await ExistGradlew(currentDir)) {
            existGradlew = true;
            break;
        }

        if (currentDir === "/home/") {
            break;
        }

        path = path + "../";
        currentDir = new URL(path, import.meta.url).pathname;
    }

    if (existGradlew) {
        return currentDir;
    } else {
        return "error: `Gradlew` is not found in current directory";
    }
}

export default SearchGradlew;
