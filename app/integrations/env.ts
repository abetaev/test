export default (key: string) => {
  const value = import.meta.env[`APP_${key}`]
  if (value === undefined)
    throw new Error(`APP_${key} is not set`)
  return value
}