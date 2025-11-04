import {
  object, string, boolean, optional, array, minLength, maxLength, regex,
  pipe, transform
} from 'valibot'

const RUT_REGEX = /^[0-9]{7,8}-[0-9kK]$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/
const PHONE_REGEX = /^[0-9()+\-\s]*$/

const trim = () => transform<string, string>((v) => (v ?? '').trim())
const toUpper = () => transform<string, string>((v) => (v ?? '').toUpperCase())
const toLower = () => transform<string, string>((v) => (v ?? '').toLowerCase())

export const UsuarioCreateSchema = object({
  rut: pipe(string('Rut es obligatorio'), trim(), regex(RUT_REGEX, 'Rut inválido. Formato 12345678-9')),
  nombre: pipe(string('Nombre es obligatorio'), trim(), minLength(2), maxLength(100)),
  apellido: pipe(string('Apellido es obligatorio'), trim(), minLength(2), maxLength(100)),
  email: pipe(string('Email es obligatorio'), trim(), toLower(), regex(EMAIL_REGEX, 'Email inválido')),
  username: pipe(string('Usuario es obligatorio'), trim(), regex(USERNAME_REGEX, 'Usuario inválido'), maxLength(100)),
  telefono: optional(pipe(string(), trim(), regex(PHONE_REGEX, 'Teléfono inválido'), maxLength(50))),
  licencia: optional(pipe(string(), trim(), maxLength(100))),
  activo: optional(boolean()),
  roles: optional(array(pipe(string('Rol inválido'), trim(), toUpper(), minLength(2), maxLength(100)))),
})

export const UsuarioUpdateSchema = object({
  rut: optional(pipe(string(), trim(), regex(RUT_REGEX, 'Rut inválido. Formato 12345678-9'))),
  nombre: optional(pipe(string(), trim(), minLength(2), maxLength(100))),
  apellido: optional(pipe(string(), trim(), minLength(2), maxLength(100))),
  email: optional(pipe(string(), trim(), toLower(), regex(EMAIL_REGEX, 'Email inválido'))),
  username: optional(pipe(string(), trim(), regex(USERNAME_REGEX, 'Usuario inválido'), maxLength(100))),
  telefono: optional(pipe(string(), trim(), regex(PHONE_REGEX, 'Teléfono inválido'), maxLength(50))),
  licencia: optional(pipe(string(), trim(), maxLength(100))),
  activo: optional(boolean()),
  roles: optional(array(pipe(string('Rol inválido'), trim(), toUpper(), minLength(2), maxLength(100)))),
  password: optional(pipe(string(), trim(), minLength(8, 'La contraseña debe tener al menos 8 caracteres'))),
})
