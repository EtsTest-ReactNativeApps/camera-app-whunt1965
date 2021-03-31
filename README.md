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
In Phase 5, I set up and connected my application to Firebase. To do so, I followed a couple different tutorials including this [tutorial](https://www.instamobile.io/mobile-development/react-native-firebase-storage/) on uploading images to Firebase. In addition, because I needed an authorization mechanism to upload images from the app to Firebase, I followed this other [tutorial](https://blog.logrocket.com/how-to-set-up-email-authentication-with-react-native-react-navigation-and-firebase/) on implementing sign/login mechanisms to verify a user with Firebase. Admittedly, this led to a lot of restructuring of my App, but ultimately it makes it much more extensible (and I used a few of the styles as well that this tutorial provided).

Rather than upload a bunch of photos of the app, I recorded the below video of the app running on my phone and uploading a photo to Firebase. 

[Link to Demo](https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/Phase5_demo.mp4)

### Phase 6 - Store cloud data in the cloud and display as list on the phone
In Phase 6, I added the ability to retrieve images stored in Firebase and display them in a list format as well as display the locations in which the images were taken as markers on a map.

For displaying the images as a list, I first updated my photo upload component to both store the photo in the Firebase cloud storage as well as store the image name, URI in firebase, and latitude/longitude in the Cloud Firestore (a NoSQL db). To ensure that a user can only view their own photos (and not anyone else's), I created a collection unique to each user (using the unique UID assigned by my firebase login) as the collection title. To get the latitude and longitude, I imstalled the @react-native-community/geolocation package and followed a few different stack overflow posts (such as [this one](https://stackoverflow.com/questions/43176862/get-current-location-latitude-and-longitude-in-reactnative-using-react-native-m)) to capture the latitude and longitude. I then needed to figure out how to loop through all the documents in the user's collection and display the photos. I reviewed [this tutorial](https://medium.com/@sultanbutt820/react-native-image-upload-retrieve-delete-from-firebase-cloud-storage-ios-android-e05c7cdbf1d2), a few [stack overflow posts](https://stackoverflow.com/questions/46632367/firebase-firestore-collection-retrieval-in-react-native) as well the [documentation for cloud storage](https://rnfirebase.io/storage/usage). Ultimately, this required looping through all documents in the firestore collection and then downloading a URL from firebase storage to display the image.

Unfortunately, my solution ended being far from perfect as the asynchronous methods needed to retrieve all this info cause lags in the display. I therefore had to add a refresh button to force the screen to refresh and display the image. In production I would need a different solution, but it works for now!

For displaying the markers on a map, I first followed [this tutorial](https://medium.com/@arvind.chak128/how-to-auto-zoom-into-your-current-location-using-react-native-maps-88f9b3063fe7) to make my map auto-zoom on my current location, which was a problem I had previously. Then, I used the method as above to loop through my firestore collection for a given user and retrieve the latitude and longitude (as well as image title) for each photo. I then used [this stackoverflow post](https://stackoverflow.com/questions/58936356/dynamically-rendering-mapview-marker-react-native) for help in rendering markers dynamically. For now, my markers just contain the image name, but with some more tweaking, I could probably have the picture render as well (though this would obviously create more slowdown issues). 

A short demo video of Phase 6 in action is linked below. Notably, I tried to take some photos with my phone disconnected from Metro/my computer, but ran into some issues with the live deployment crashing. Certainly a bug that would need to be fixed for production!

[Link to Demo](https://github.com/BUEC500C1/camera-app-whunt1965/blob/main/Photos/phase6_demo.mp4)

### Phase 7 - Detect Faces and blur them before you store them.
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

### Phase 8 - Scan barcodes and save the data per image.
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.

### Phase 9 - Store images and barcode in Firebase
TODO

After completing the tutorial, we produced a simple REACT native application on an IOS emulator which is displayed below.
