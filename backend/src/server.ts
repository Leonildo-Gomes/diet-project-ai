
import Fastify from "fastify";
import cors from "@fastify/cors";
import { planRoutes } from "./routes/plan";

const app = Fastify(
    {
        logger: true,
    }
);

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST"],
});


app.get("/", async (request, reply) => {
    reply.send({ hello: "world" });
    //return { hello: "world" };
});

app.register(planRoutes);

app.listen({ port: Number(process.env.PORT) || 3333, host: "0.0.0.0"})
.then(() => {
    console.log("HTTP server running on http://localhost:3333");
})
.catch((err) => {
    app.log.error(err);
    console.error(err);
    process.exit(1);
});




