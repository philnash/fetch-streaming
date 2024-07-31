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
npm start
```

Then open the browser to http://localhost:3000/. Press the start button to stream the response from the server and see the difference between streaming and otherwise.

## The code

Check the JavaScript in `public/index.html` to see the difference and how to implement fetch with streams in your applications.