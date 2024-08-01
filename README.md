# Streaming with fetch

This repository is an example server that streams a response to a front-end. 

The front-end compares what it looks like to load the same endpoint all in one or progressively using streams.

## How to run

First clone the repository:

```sh
git clone https://github.com/philnash/fetch-streaming.git
cd fetch-streaming
```

Install the dependencies:

```sh
npm install
```

Run the server:

```sh
npm run dev
```

Then open the browser to http://localhost:3000/. Press the start button to stream the response from the server and see the difference between streaming and otherwise.

## The code

Check the JavaScript in `src/streaming.js` to see the difference and how to implement fetch with streams in your applications.

### Server-sent events

There is also an example of sending the data from the server in the format of server-sent events. This is then parsed in the client by the [eventsource-parser](https://www.npmjs.com/package/eventsource-parser) module. You can see this in action by running the server and visiting http://localhost:3000/event-stream.html.

The code for this version is available in `src/event-stream.js`.