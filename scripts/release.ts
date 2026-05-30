import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const args = process.argv.slice(2)
const isCI = args.includes("--ci")
const bumpType = (args.find(a => ["patch","minor","major"].includes(a)) || "patch") as "patch" | "minor" | "major"

const pkgPath = resolve(ROOT, "package.json")
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"))
const [major, minor, patch] = (pkg.version as string).split(".").map(Number)

let newVersion: string
if (bumpType === "major") newVersion = `${major + 1}.0.0`
else if (bumpType === "minor") newVersion = `${major}.${minor + 1}.0`
else newVersion = `${major}.${minor}.${patch + 1}`

pkg.version = newVersion
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")

if (isCI) {
  execSync(`git add package.json`, { cwd: ROOT, stdio: "inherit" })
  execSync(`git commit -m "chore: bump version to ${newVersion}"`, { cwd: ROOT, stdio: "inherit" })
  execSync(`git tag v${newVersion}`, { cwd: ROOT, stdio: "inherit" })
  execSync(`git push --follow-tags`, { cwd: ROOT, stdio: "inherit" })
}

console.log(`[vibeOSmcp] Version bumped to ${newVersion}`)
