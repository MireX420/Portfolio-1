import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/projects", (c) => {
    const projects = [
      {
        id: 1,
        title: "Portfolio Website",
        description: "A personal portfolio to showcase my projects.",
        createdAt: new Date("2023-09-01"),
        category: "Web Development",
      },
      {
        id: 2,
        title: "E-commerce Platform",
        description: "An online store for selling products.",
        createdAt: new Date("2023-08-15"),
        category: "Web Development",
      },
      {
        id: 3,
        title: "Blog Platform",
        description: "A blog platform for sharing articles.",
        createdAt: new Date("2023-07-20"),
        category: "Content Creation",
      },
    ];
  
    return c.json(projects);
  });

export default app;