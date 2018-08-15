#Coding Challenge

This is the implementation of a file uploader that shows a progress status.

The application behaves as follows:

1. When the user selects a file, it's upload starts;
2. A percentage on the file upload is shown below the file field;
3. Once the upload is complete, a link pointing to the file path on the server is presented;
4. The user can enter a description and save the upload;
5. Once the save button is clicked a page presents the original file name, a link to download it and the given  description.

## Requirements

The following requirements were considered during the development of the problem:

1. The solution must work on IE > 6, Firefox and Chrome;
2. The file upload progress should be updated at least every 2 seconds;
3. Only the port 80 should be used to communicate with the server;
4. Concurrent uploads should be supported;
5. A minimal set of dependencies should be used.

## How to execute

You will need to install (have installed):
1. nodejs 0.8.x
2. npm 1.1.x

Then execute the following:

1. git clone https://github.com/thiagotnunes/challenge.git
2. cd challenge
3. npm install
4. ./run.sh

## Demo

You can see a live example at [demo](http://nunesupload.herokuapp.com).

## How to execute the tests

* Server Side Unit testing: execute make
* Functional testing: make sure you have the server up (node app.js) and execute make functional
* Client side Unit testing: open in your browser the file test/ui/SpecRunner.html

## Solution

The whole solution was based upon AJAX file upload. Since one of the requirements was to support browser that do not implement HTML 5 features, the application was divided in 2 strategies:

1. HTML 5 FormData file upload and FormData progress tracking, for the browsers that support these features.
2. AJAX iframe file upload and AJAX progress pooling, for the browsers that do not support the previously mentioned HTML 5 features.

It is important to highlight that the later is used only when the browser does not support the HTML 5 FormData feature. If it does support it we use it since it provides almost real time progress tracking and easy (to develop) file uploading using AJAX.

## Technology

The solution was implemented using Javascript on the client and server side (the later using NodeJs).

### Dependencies

The dependencies used for the project were the following:

1. [JQuery](http://jquery.com/): only for manipulating DOM elements, the AJAX file uploading, FormData and iframe, was implemented using the raw XMLHttpRequest object.
2. [Express](http://expressjs.com/): web application framework for nodejs. Serves static and dynamic content.
3. [Formidable](https://github.com/felixge/node-formidable/): NodeJs form parser. It provides hooks to get warned when there is a chunk of data available. This was used to keep track of the file upload progress.
4. [Node-uuid](https://github.com/broofa/node-uuid/): unique universal identifier generator. This was used to identify an upload.
5. [Ejs](http://embeddedjs.com/): view engine for NodeJs.

### Test dependencies

The test dependencies used for the project were the following:

1. [Jasmine](https://jasmine.github.io/): BDD framework for javascript. Used on the client side testing.
2. [Mocha](http://visionmedia.github.com/mocha/): test framework for NodeJs. Used on the server side testing.
3. [Chai](http://chaijs.com/): BDD assertion library for NodeJs. Used on the server side testing.
4. [Sinon](http://sinonjs.org/): Spies, mocks and stubs for javascript. Used both on client and server sides testing.
5. [Request](https://github.com/mikeal/request/): HTTP request methods for javascript made easy. Used on the API functional testing for the server side.
