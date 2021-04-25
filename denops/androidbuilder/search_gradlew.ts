async function ExistGradlew(filepath: string): Promise<boolean> {
    for await (const dirEntry of Deno.readDir(filepath)) {
        if (dirEntry.name === "gradlew") {
            return true;
        }
    }

    return false;
}

async function SearchGradlew(pwd: string): Promise<string> {
    let path = pwd;

    let existGradlew: boolean = false;

    while (true) {
        if (await ExistGradlew(path)) {
            existGradlew = true;
            break;
        }

        if (new URL(path, import.meta.url).pathname === "/home/") {
            break;
        }

        path = path + "../";
    }

    if (existGradlew) {
        return new URL(path, import.meta.url).pathname;
    } else {
        return "error: `Gradlew` is not found in current directory";
    }
}

export default SearchGradlew;
