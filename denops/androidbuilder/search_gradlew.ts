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
        console.log(path);
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

console.log(await SearchGradlew(new URL('./', import.meta.url).pathname))

export default SearchGradlew;
