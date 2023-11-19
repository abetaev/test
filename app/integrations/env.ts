// @ts-expect-error vite hack import.meta.env
export default (key: string) => import.meta.env[`CFG_${key}`]