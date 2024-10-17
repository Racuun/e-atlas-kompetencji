import { getContext } from '@keystone-6/core/context'
import config from './keystone';
import * as PrismaModule from '.prisma/client'





export async function queryDefinicje() {
    const context = getContext(config, PrismaModule);

    const data = await context.db.Definicja.findMany({
        where: {}
    })
}