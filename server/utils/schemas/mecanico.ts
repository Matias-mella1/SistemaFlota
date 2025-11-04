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

// === Validaciones base ===
const NonEmptyTrimmed = pipe(
  string('Campo requerido'),
  minLength(1, 'No puede estar vacío')
)

const OnlyLetters = regex(
  /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/u,
  'Sólo se permiten letras y espacios'
)

// === Crear mecánico ===
// id_mecanico es autoincrement → NO se incluye aquí.
export const MecanicoCreateSchema = object({
  id_taller: pipe(
    union([
      pipe(string(), regex(/^\d+$/, 'id_taller inválido'), transform(v => parseInt(v, 10))),
      number('id_taller debe ser numérico')
    ]),
    minValue(1, 'id_taller debe ser mayor a 0')
  ),
  nombre: pipe(NonEmptyTrimmed, minLength(2, 'El nombre es demasiado corto'), OnlyLetters),
  apellido: pipe(NonEmptyTrimmed, minLength(2, 'El apellido es demasiado corto'), OnlyLetters),
})

// === Actualizar mecánico ===
// Todos los campos opcionales (id_mecanico se toma de la ruta)
export const MecanicoUpdateSchema = object({
  id_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, 'id_taller inválido'), transform(v => parseInt(v, 10))),
        number('id_taller debe ser numérico')
      ]),
      minValue(1, 'id_taller debe ser mayor a 0')
    )
  ),
  nombre: optional(pipe(NonEmptyTrimmed, minLength(2, 'El nombre es demasiado corto'), OnlyLetters)),
  apellido: optional(pipe(NonEmptyTrimmed, minLength(2, 'El apellido es demasiado corto'), OnlyLetters)),
})

// === Filtros de búsqueda (GET) ===
export const MecanicoQuerySchema = object({
  id_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, 'id_taller inválido'), transform(v => parseInt(v, 10))),
        number('id_taller debe ser numérico')
      ]),
      minValue(1, 'id_taller debe ser mayor a 0')
    )
  ),
  q: optional(string()),
})

// Export para usar en los controladores
export { safeParse }
