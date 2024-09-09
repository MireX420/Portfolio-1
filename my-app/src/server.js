
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from 'node:fs/promises'

const app = new Hono()

app.use("/*", cors())

app.use("/static/*", serveStatic({ root: "./" }))

const projects = [
  {
      id: 1,
      name: "Car Tinder",
      description: "Tinder for car enthusiasts.",
      date: '2024-09-01',
  },
  {
    "id": 2,
    "name": "Fitness Tracker",
    "description": "Tracker for workouts and planner.",
    "date": "2024-10-01"
  },
  {
    "id": 3,
    "name": "2d game",
    "description": "game in 2d.",
    "date": "2024-11-01"
  }
]

app.get("/json", async (c) => {
  const data = await fs.readFile('./static/projects.json', 'utf8')
  const dataAsJson = JSON.parse(data)
  return c.json(dataAsJson)
})

app.post("/add", async (c) => {
  const newProject = await c.req.json()
  console.log('New project', newProject)

  projects.push({ id: projects.length+1, date: new Date(), ...newProject })

  return c.json(projects, { status: 201 })
})

app.get("/", (c) => {
	console.log(projects.length)
  return c.json(projects)
})

const port = 3999;

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})