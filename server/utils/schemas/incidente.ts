// src/incidentes/dto.ts
import * as v from 'valibot';

// Crear incidente
export const CrearIncidenteDto = v.object({
  id_bus: v.number('id_bus es requerido'),
  id_usuario: v.number('id_usuario es requerido'),

  descripcion: v.optional(
    v.pipe(
      v.string('descripcion debe ser texto'),
      v.maxLength(5000, 'Máximo 5000 caracteres')
    )
  ),

  // string | Date  ->  Date  ->  chequeo Date válida
  fecha: v.pipe(
    v.union([v.string(), v.date()]),
    v.transform<string | Date, Date>((x) => (x instanceof Date ? x : new Date(x))),
    v.check((d) => d instanceof Date && !isNaN(d.getTime()), 'Fecha inválida')
  ),

  urgencia: v.optional(
    v.pipe(
      v.string('urgencia debe ser texto'),
      v.maxLength(20, 'Máximo 20 caracteres')
    )
  ),
  ubicacion: v.optional(
    v.pipe(
      v.string('ubicacion debe ser texto'),
      v.maxLength(200, 'Máximo 200 caracteres')
    )
  ),
  id_estado_incidente: v.optional(v.number()),
  id_tipo_incidente: v.number('id_tipo_incidente es requerido'),
});

// Actualizar incidente (todos opcionales)
export const ActualizarIncidenteDto = v.partial(CrearIncidenteDto);

// Cambiar estado
export const CambiarEstadoDto = v.object({
  id_estado_incidente: v.number('id_estado_incidente es requerido'),
});

// Filtros + paginación (querystring)
export const ListaQueryDto = v.object({
  // string -> number -> min
  page: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, number>((x) => Number(x)),
      v.check((n) => Number.isFinite(n), 'page debe ser número'),
      v.minValue(1, 'page >= 1')
    )
  ),

  pageSize: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, number>((x) => Number(x)),
      v.check((n) => Number.isFinite(n), 'pageSize debe ser número'),
      v.minValue(1, 'pageSize >= 1'),
      v.maxValue(100, 'pageSize <= 100')
    )
  ),

  sortBy: v.optional(v.picklist(['fecha', 'id_incidente'] as const)),
  sortOrder: v.optional(v.picklist(['asc', 'desc'] as const)),

  // enteros desde querystring
  id_bus: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, number>((x) => Number(x)),
      v.check((n) => Number.isFinite(n), 'id_bus debe ser número')
    )
  ),
  id_usuario: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, number>((x) => Number(x)),
      v.check((n) => Number.isFinite(n), 'id_usuario debe ser número')
    )
  ),
  id_estado_incidente: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, number>((x) => Number(x)),
      v.check((n) => Number.isFinite(n), 'id_estado_incidente debe ser número')
    )
  ),
  id_tipo_incidente: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, number>((x) => Number(x)),
      v.check((n) => Number.isFinite(n), 'id_tipo_incidente debe ser número')
    )
  ),

  urgencia: v.optional(v.string()),

  // string -> Date -> chequeo
  desde: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, Date>((x) => new Date(x)),
      v.check((d) => !isNaN(d.getTime()), 'Fecha inválida')
    )
  ),
  hasta: v.optional(
    v.pipe(
      v.string(),
      v.transform<string, Date>((x) => new Date(x)),
      v.check((d) => !isNaN(d.getTime()), 'Fecha inválida')
    )
  ),

  q: v.optional(
    v.pipe(
      v.string('q debe ser texto'),
      v.maxLength(200, 'Máximo 200 caracteres')
    )
  ),
});
