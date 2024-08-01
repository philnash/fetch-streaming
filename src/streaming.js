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
    // Clone the response so that we can compare.
    const streamResponse = response.clone();

    // Normal fetch
    response.text().then((text) => {
      output.innerHTML = text;
      startButton.removeAttribute("disabled");
    });

    // Streaming the response through a TextDecoderStream and to a WritableStream.
    const decoderStream = new TextDecoderStream("utf-8");
    const writer = new WritableStream({
      start() {
        streamLoader.parentNode.removeChild(streamLoader);
      },
      write(chunk) {
        streamOutput.innerHTML += chunk;
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
      .pipeTo(writer)
      .catch((error) => {
        console.log("Unexpected end of stream");
      });

    // Stream as an async iterable (doesn't work in Safari)
    // const decoder = new TextDecoder();
    // for await (const chunk of streamResponse.body) {
    //   const text = decoder.decode(chunk, { stream: true });
    //   streamOutput.innerHTML += text;
    // }
  }
});
