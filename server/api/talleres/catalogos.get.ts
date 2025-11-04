import { prisma } from '../../utils/prisma'
export default defineEventHandler(async () => {
  const tipos = await prisma.tipoTaller.findMany({
    select: { id_tipo_taller:true, nombre_tipo:true },
    orderBy: { nombre_tipo:'asc' }
  })
  return { tipos }
})
