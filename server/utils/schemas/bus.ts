import {
  object, string, number, optional, union, picklist, transform, pipe, regex,
  minLength, minValue, maxValue, boolean
} from 'valibot'

// Alinea tus estados con el FE:
export const EstadoBusEnum = picklist(['OPERATIVO', 'MANTENIMIENTO', 'FUERA DE SERVICIO'])
export const CombustibleEnum = picklist(['DIESEL','GASOLINA','GAS','ELECTRICO'])

const EnteroFromString = pipe(
  string(),
  regex(/^\d+$/, 'Debe ser un número entero'),
  transform(v => parseInt(v, 10))
)

const YYYYMMDD = pipe(
  string(),
  regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD')
)

// 📘 Crear
export const BusCreateSchema = object({
  patente: pipe(
    string('La patente es obligatoria'),
    regex(/^[A-Z0-9-]+$/i, 'La patente solo puede contener letras, números y guiones')
  ),
  modelo: pipe(
    string('El modelo es obligatorio'),
    minLength(2, 'El modelo debe tener al menos 2 caracteres')
  ),

  // FE envía "annio"; lo convertiremos a number
  annio: union([
    pipe(string(), regex(/^\d{4}$/, 'El año debe tener 4 dígitos'), transform(v => parseInt(v, 10))),
    pipe(number('El año debe ser un número'), minValue(1900, 'El año no puede ser menor que 1900'), maxValue(new Date().getFullYear()+1, 'El año no puede ser mayor que el actual+1')),
  ]),

  km: optional(union([EnteroFromString, number('El kilometraje debe ser numérico')]), 0),
  estado: EstadoBusEnum,

  // ⬇️ nuevos campos (opcionales, cambia a requeridos si lo necesitas)
  marca: optional(string()),
  combustible: optional(CombustibleEnum),
  capacidad: optional(union([EnteroFromString, number()])),
  fecha_revision_tecnica: optional(YYYYMMDD),
  fecha_extintor: optional(YYYYMMDD),
})

// 📗 Actualizar (todos opcionales)
export const BusUpdateSchema = object({
  patente: optional(pipe(string(), regex(/^[A-Z0-9-]+$/i, 'Formato de patente inválido'))),
  modelo: optional(string('El modelo debe ser texto')),
  annio: optional(number('El año debe ser numérico')),
  km: optional(number('El kilometraje debe ser numérico')),
  estado: optional(EstadoBusEnum),

  marca: optional(string()),
  combustible: optional(CombustibleEnum),
  capacidad: optional(number()),
  fecha_revision_tecnica: optional(YYYYMMDD),
  fecha_extintor: optional(YYYYMMDD),
})
