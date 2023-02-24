import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
    const user = await prisma.user.create({
        data: {
            email: "asimata98@gmail.com",
            name: "Mukunde Shamirah",
            Post: {
                create: {
                    title: "Tomorrow Men:How wisdom will be scarce",
                    content: "This is our random post on the menace in the city that ....",
                    published: true,
                }
            }
        }
    })
    // const post = await prisma.post.create({
    //     data: {
    //         title: "Vampires Dairy Cameo",
    //         content: "This is our random post on the menace in the city that ....",
    //         published: true,
    //         authorId: 'be02cbd3-4404-4a39-a258-b902dc6f57f9'
    //     }
    // })
    console.log(user)
}
main().catch(e => console.log(e.message)).finally(async () => await prisma.$disconnect())
export default prisma;