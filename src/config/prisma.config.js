import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
}
main()
export default prisma;