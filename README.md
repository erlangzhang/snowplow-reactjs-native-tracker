# React Native tracker for Snowplow

This tracker is an extension of the [Snowplow Node.js Tracker](https://github.com/snowplow/snowplow-nodejs-tracker) 
implementation for React Native.

## Install

```
npm install @ringierag/snowplow-reactjs-native-tracker --save
```

## Usage

The tracker provides the same tracking methods like the Snowplow Node.js tracker ([documentaion](https://github.com/snowplow/snowplow/wiki/node.js-tracker))
plus the additional methods mentioned below in this README.

Example how to use the tracker:

```js
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Tracker, Emitter } from 'snowplow-reactjs-native-tracker';

export default class App extends React.Component {
  
  exampleTrackView() {
      
    // create emitter which will send events to a collector  
    let em = new Emitter(
      'in.collector.endpoint.com', // collector endpoint 
      'https', // protocol
      443, // port
      'GET', // method
      1, // Only send events once n are buffered.
      function (error, response) { // Callback called for each request
        if (error) {
          console.error(error);
        }
        console.log(response.status);
      }
    );

    // create a tracker
    let t = new Tracker(
      [em], // one or more emitter instances
      'myTracker', // the namespace of the tracker
      'myApp', // the application ID
      false // base64 encode unstructured events (default: true)
    );

    // track a screen view
    t.trackScreenView('/sandbox/demo/');
  }
  
  render() {
    // some example app
  }
}

```

## Extensions

### Methods

```
setDomainUserId(duid)
```

## Adaptions for React

* browserify the `crypto` package, as `uuid` is used by Snowplow Core
* replace the `request` package with the react `fetch` method
