import { EventSourceParserStream } from "eventsource-parser/stream";

const startButton = document.getElementById("start");
const output = document.getElementById("output");
const streamOutput = document.getElementById("stream-output");
const loaderBase = document.createElement("div");
loaderBase.classList.add("loader");

startButton.addEventListener("click", async () => {
  startButton.setAttribute("disabled", "disabled");
  output.innerHTML = "";
  streamOutput.innerHTML = "";

  const loader = loaderBase.cloneNode(false);
  const streamLoader = loaderBase.cloneNode(false);
  output.appendChild(loader);
  streamOutput.append(streamLoader);

  const response = await fetch("/stream");
  if (response.ok) {
    // Normal fetch
    response.text().then((text) => {
      output.innerHTML = text;
      startButton.removeAttribute("disabled");
    });
  }

  const streamResponse = await fetch("/event-stream");
  if (streamResponse.ok) {
    // Streaming the response through a TextDecoderStream and to a WritableStream.
    const decoderStream = new TextDecoderStream("utf-8");
    const parserStream = new EventSourceParserStream();
    const writer = new WritableStream({
      start() {
        streamLoader.parentNode.removeChild(streamLoader);
      },
      write(event) {
        console.log(event);
        streamOutput.innerHTML += event.data;
      },
      close() {
        startButton.removeAttribute("disabled");
      },
      abort(reason) {
        startButton.removeAttribute("disabled");
      },
    });

    streamResponse.body
      .pipeThrough(decoderStream)
      .pipeThrough(parserStream)
      .pipeTo(writer)
      .catch((error) => {
        console.log("Unexpected end of stream");
      });
  }
});
