import express from "express";
import cors from "cors";
import * as model from "./model.js";

const app = express();
app.use(cors());
const port = 3011;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send(model.getApiInstructionsHtml());
});

app.get("/jobs", (req: express.Request, res: express.Response) => {
  res.json(model.getJobs());
});

app.get("/todos", (req: express.Request, res: express.Response) => {
  res.json(model.getTodos());
});

app.get("/totaledSkills", (req: express.Request, res: express.Response) => {
  res.json(model.getTotaledSkills());
});

// app.get("/test", (req: express.Request, res: express.Response) => {
//   //   res.send("Test from Server");
//   res.json(model.getTest());
// });

app.delete("/jobs/:id", async (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  const deletedObject = await model.deleteJob(id);
  if (deletedObject === undefined) {
    res.status(409).send({
      error: true,
      message: `job with id ${id} does not exist, deletion failed`,
    });
  } else {
    res.send("The job with id " + id + " Deleted!");
    res.status(200).json(deletedObject);
  }
  // const nextId = id + 1;
  // res.send(`will delete the Job with id: ${id} and the next Id is ${nextId}`);
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
