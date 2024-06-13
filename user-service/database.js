import { PrismaClient } from "@prisma/client";


class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async disconnect(){
    await this.prisma.$disconnect();
  }

  async  createUser(data) {
    const newUser = await this.prisma.user.create({data: data});
    return newUser
  }

  async updateUser(id, data){
    const updateUser = await this.prisma.user.update({
      where: {
        id: +id 
      },
      data: data
    })
    return updateUser
  }

  async getUsers(){
    const users = await this.prisma.user.findMany()
    return users
  }
}

export default PrismaService;