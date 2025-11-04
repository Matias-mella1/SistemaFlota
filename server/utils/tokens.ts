import crypto from 'crypto'

export function makeRandomToken(bytes: number = 32) {
  return crypto.randomBytes(bytes).toString('hex') // -> codigo_token
}

export function minutesFromNow(mins: number) {
  const d = new Date()
  d.setMinutes(d.getMinutes() + mins)
  return d
}

export function makeTempPassword(length = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'
  let pw = ''
  for (let i = 0; i < length; i++) pw += chars[Math.floor(Math.random() * chars.length)]
  return pw
}
