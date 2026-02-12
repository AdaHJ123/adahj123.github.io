const modules = import.meta.glob("./*.json", { eager: true })
const entries = Object.entries(modules).sort(([a], [b]) => a.localeCompare(b, "en"))
const projects = entries.map(([, mod]) => mod.default ?? mod)

export default projects
