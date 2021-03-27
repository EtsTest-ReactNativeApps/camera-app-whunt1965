# camera-app-whunt1965
This repository contains a Camera application to help us scan products, track where we found them, and protect the privacy of people captured in photos. The Application will:
- Take a picture
- Detect faces and blur them
- Read barcodes and store them
- Capture Geotags and display images on a map

Notably: We will be connecting our application to Firebase to take advantage of cloud storage and authentication mechanism

## Phases 
In developing this project, we pursued a multi-phased approach. A description of individual phases is included below.

### Phase 1 - Setup REACT native environment
In this phase, we set up an environment to build and run a REACT native application by following this [tutorial](https://reactnative.dev/docs/environment-setup)

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

![snapshot](https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase1.png)

### Phase 2 - Go through REACT Native Tutorial
In this phase, we completed a simple [tutorial](https://reactnative.dev/docs/tutorial) to create a REACT native application that can record the number of times a button is pressed.

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

![snapshot](https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase2.png)

### Phase 3 - Develop Use Case to Display a Map
To add a map, I used the [react-native-maps](https://github.com/react-native-maps/react-native-maps) library as well as looked at several tutorials. Currently, I am able to display a map (with my current location) on my home screen (see image below), but I am not able to ensure that the map follows me as I move. In addition, thus far, I have not been able to separate my map component into a separate JS file and have it properly render. I've spent a good amount of time on this, but have not yet found a solution. This is something that I need to explore in greater detail in order to increase the functionality of my map. 

A snapshot of the map displaying on my ugly homescreen is included below (screenshot from my iPhone):

![snapshot](https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase3.jpeg)

### Phase 4 - Develop use case to take a picture 
To add a camera feature, I used the [react-native-camera](https://github.com/react-native-camera/react-native-camera) library and followed [this tutorial](https://www.fullstacklabs.co/blog/react-native-camera). Currently, I am able to take a picture, but am still working on the backend to have this picture save. 

A snapshot of the camera displaying on my ugly homescreen is included below (screenshot from my iPhone):

![snapshot](https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase4.jpeg)

### Phase 4.5 - Clean Up App for Extensibility
Before moving on to setting up Firebase, I wanted to take some time to clean up my App by separating the map and camera into separate components and add some navigation features (to make the components more visible). To do so, I followed the react navigation tutorial available [here](https://reactnavigation.org/docs/getting-started) to add basic navigation for my app between the homescreen, camera, and map. Notably, this solved my earlier issues with the map not rendering on my home screen when separating my map view into a separate file. 

Below, please find some photos of my slighly prettier (but still ugly!) app with the different components separated onto different screens (with a Navigation Stack used to navigate between them!).

<p float="left">
  <img src="https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase4_5_1.jpeg" width="250" />
  <img src="https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase_4_5_2.jpeg" width="250" /> 
  <img src="https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase_4_5_3.jpeg" width="250" /> 
  <img src="https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase_4_5_4.jpeg" width="250" /> 
</p>

### Phase 5 - SetUp Firebase
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

### Phase 6 - Store cloud data in the cloud and display as list on the phone
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

### Phase 7 - Detect Faces and blur them before you store them.
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

### Phase 8 - Scan barcodes and save the data per image.
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

### Phase 9 - Store images and barcode in Firebase
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.
