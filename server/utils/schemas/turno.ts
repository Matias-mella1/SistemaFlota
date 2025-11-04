// server/utils/schemas/turno.ts
import {
  object, number, string, optional, minLength, transform, pipe, union
} from 'valibot'

/**
 * Para POST creamos Turno con strings 'inicio' y 'fin' (datetime-local o ISO).
 * El backend los convierte a Date con toDateTimeOrNull.
 */
export const TurnoCreateSchema = object({
  id_usuario: number('id_usuario debe ser numérico'),
  id_bus: number('id_bus debe ser numérico'),
  inicio: pipe(
    string('inicio es requerido'),
    minLength(10, 'inicio inválido') // ej. ‘2025-10-30T10:00’
  ),
  fin: pipe(
    string('fin es requerido'),
    minLength(10, 'fin inválido')
  ),
  titulo: optional(string()),
  descripcion: optional(string())
})

/**
 * Para PUT todo es opcional.
 */
export const TurnoUpdateSchema = object({
  id_bus:    optional(number()),
  inicio:    optional(string()),
  fin:       optional(string()),
  titulo:    optional(string()),
  descripcion: optional(string()),
  id_estado_turno: optional(number()),
})

/**
 * Filtros GET (opcionales)
 */
export const TurnoQuerySchema = object({
  usuarioId:  optional(number()),
  busId:      optional(number()),
  estadoId:   optional(number()),
  from:       optional(string()), // datetime-local o ISO
  to:         optional(string()),
  q:          optional(string()),
})
