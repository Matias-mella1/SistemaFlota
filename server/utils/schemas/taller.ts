import {
  object,
  string,
  number,
  optional,
  pipe,
  minLength,
  minValue,
  regex,
  union,
  transform,
  safeParse,
} from 'valibot'

// Helpers
const NonEmptyTrimmed = pipe(
  string('Campo requerido'),
  minLength(1, 'No puede estar vacío')
)

const EmailRegex = regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  'Formato de email inválido'
)

// --- Crear Taller ---
export const TallerCreateSchema = object({
  nombre: pipe(NonEmptyTrimmed, minLength(2, 'El nombre es muy corto')),
  id_tipo_taller: pipe(
    union([
      pipe(string(), regex(/^\d+$/, 'id_tipo_taller inválido'), transform(v => parseInt(v, 10))),
      number('id_tipo_taller debe ser numérico'),
    ]),
    minValue(1, 'id_tipo_taller debe ser mayor a 0')
  ),
  contacto: optional(string()),
  direccion: optional(string()),
  email: optional(pipe(string(), EmailRegex)),
})

// --- Actualizar Taller (todo opcional) ---
export const TallerUpdateSchema = object({
  nombre: optional(pipe(NonEmptyTrimmed, minLength(2, 'El nombre es muy corto'))),
  id_tipo_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, 'id_tipo_taller inválido'), transform(v => parseInt(v, 10))),
        number('id_tipo_taller debe ser numérico'),
      ]),
      minValue(1, 'id_tipo_taller debe ser mayor a 0')
    )
  ),
  contacto: optional(string()),
  direccion: optional(string()),
  email: optional(pipe(string(), EmailRegex)),
})

// --- Filtros GET ---
export const TallerQuerySchema = object({
  id_tipo_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, 'id_tipo_taller inválido'), transform(v => parseInt(v, 10))),
        number('id_tipo_taller debe ser numérico'),
      ]),
      minValue(1, 'id_tipo_taller debe ser mayor a 0')
    )
  ),
  q: optional(string()),
})

export { safeParse }
