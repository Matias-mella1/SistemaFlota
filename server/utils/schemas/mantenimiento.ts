import {
  object, string, number, optional, union, transform, pipe, regex, minLength
} from 'valibot'

// YYYY-MM-DD
const YYYYMMDD = pipe(
  string('La fecha es obligatoria'),
  regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD')
)

const IntFromString = pipe(
  string(),
  regex(/^\d+$/, 'Debe ser un entero'),
  transform(v => parseInt(v, 10))
)

const NumFromString = pipe(
  string(),
  regex(/^\d+(\.\d+)?$/, 'Debe ser numérico'),
  transform(v => parseFloat(v))
)

// Crear
export const MantenimientoCreateSchema = object({
  id_bus:          union([number(), IntFromString]),
  id_taller:       union([number(), IntFromString]),
  id_tipo_mantenimiento: union([number(), IntFromString]),
  id_estado_mantenimiento: union([number(), IntFromString]),
  fecha: YYYYMMDD,
  costo: optional(union([number(), NumFromString])),
  observaciones: optional(pipe(string(), minLength(0))),
})

// Actualizar (todo opcional, pero requiere al menos 1 campo)
export const MantenimientoUpdateSchema = object({
  id_bus:          optional(union([number(), IntFromString])),
  id_taller:       optional(union([number(), IntFromString])),
  id_tipo_mantenimiento: optional(union([number(), IntFromString])),
  id_estado_mantenimiento: optional(union([number(), IntFromString])),
  fecha: optional(YYYYMMDD),
  costo: optional(union([number(), NumFromString])),
  observaciones: optional(pipe(string(), minLength(0))),
})

// Filtros GET
export const MantenimientoFiltersSchema = object({
  q: optional(string()),
  id_bus: optional(union([number(), IntFromString])),
  id_taller: optional(union([number(), IntFromString])),
  id_tipo_mantenimiento: optional(union([number(), IntFromString])),
  id_estado_mantenimiento: optional(union([number(), IntFromString])),
  from: optional(YYYYMMDD),
  to: optional(YYYYMMDD),
  page: optional(union([number(), IntFromString])),
  pageSize: optional(union([number(), IntFromString])),
})
