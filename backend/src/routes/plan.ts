
import type { FastifyInstance } from "fastify";
import { generateDietPlan } from "../agent";
import { DietPlanRequestSchema } from "../types";


export async function planRoutes(app: FastifyInstance) {
    app.post("/plan", async (request, reply) => {
        reply.raw.setHeader("Access-Control-Allow-Origin", "*");
        reply.raw.setHeader("Content-Type", "text/plain; charset=utf-8");
        reply.raw.setHeader("Content-Type", "text/event-stream");
        reply.raw.setHeader("Cache-Control", "no-cache");
        reply.raw.setHeader("Connection", "keep-alive");
       


        const parse=DietPlanRequestSchema.safeParse(request.body);
        if(!parse.success){
            return reply.status(400).send({
                error: "ValidatorsError",
                details: parse.error.flatten(issue => issue.message),
            });
        }
       try {
        for await (const data of generateDietPlan(parse.data)) {
            //request.log.debug(data);
            reply.raw.write(data);
        }
        reply.raw.end();
        //return reply.send(data);

           
       } catch (error: any) {
        request.log.error(error);
        reply.raw.write(`event: error\n${JSON.stringify(error.message)}\n\n`);
        reply.raw.end();
           
       }
       return reply;
    });
}