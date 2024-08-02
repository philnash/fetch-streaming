const Express = require("express");

const app = new Express();
module.exports = app;

app.use(Express.static("dist"));

app.get("/stream", async (_req, res) => {
  res.set("Content-Type", "text/plain");
  res.set("Transfer-Encoding", "chunked");

  const textChunks = text.replace(/\n/g, "<br>").split(/(?<=\.)/g);

  for (let chunk of textChunks) {
    res.write(chunk);
    await sleep(250);
  }

  res.end();
});

app.get("/event-stream", async (_req, res) => {
  res.set("Content-Type", "text/event-stream");
  res.set("Transfer-Encoding", "chunked");

  const textChunks = text.replace(/\n/g, "<br>").split(/(?<=\.)/g);

  for (let chunk of textChunks) {
    res.write(`event: message\ndata: ${chunk}\n\n`);
    await sleep(250);
  }

  res.end();
});

const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const text = `Lorem ipsum odor amet, consectetuer adipiscing elit. Diam faucibus ligula velit; id dui nostra rutrum porta. Lacinia leo finibus at ipsum velit elementum sagittis. Nascetur proin libero ac orci lectus tellus nibh. Aliquam libero justo praesent tincidunt leo vitae. Commodo fermentum penatibus quis magna vel!

Justo mattis euismod at lectus dignissim orci rhoncus. Nascetur imperdiet aenean felis aliquam senectus lobortis diam. Praesent consequat vel ex convallis donec enim leo. Ut tempus ex primis tristique morbi netus parturient; enim maximus. Mi maximus gravida vivamus mattis molestie. Elit congue tincidunt luctus maecenas ridiculus metus efficitur. Vivamus duis lobortis ipsum dui himenaeos vivamus ultrices tincidunt. Vivamus nec interdum lorem; suscipit efficitur nisl integer. Quis donec libero pretium quis vestibulum vel. Nam nunc sagittis amet mus cursus cursus nam metus.`;
