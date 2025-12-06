# Salamander Tracker

## Set Up Instructions

### Required Programs
- Docker
- A working web browser
- PC's Command line

### Set Up
Have Docker running and use the DockerImage from [GitHub](https://github.com/users/AAshGray/packages/container/package/salamander) or the one from the [Centroid-Finder Project](https://github.com/Gabby-Moon/centroid-finder) to build and run the container using port 3000 and mounting two volumes (pathways) for a results and videos folder  
For right now, make sure to download the current repo for the front-end to have it work on your local machine.  
Make sure to install all the dependencies for the ```run dev``` script works. Then put in ```run dev``` in the terminal from the folder location of the program.  
Lastly, go into your web browser and type in ```http://localhost:3001``` or click [here](http://localhost:3001).  
Congratulations! The page is set up for you to use!

## How To Use
[Placeholder for front page]  
On the starting page you can click the ```See Videos``` button to see a list of videos and ```[Process]``` text next to each, clicking on it will take you to the processing page for that video.  
[Placeholder for videos page]  
If you already had processed a video you will see ```Download CSV``` text that will let you download the latest processed version.  
[Placeholder for processing page]  
On the process page you will see two images, one from the video and the other a binarized version of that image with the given color and threshold. You can click on the color box to input a color or use the eyedropper to color pick from the first photo. There is also a threshold slider, making it larger will give more room for like colors to be found, and smaller will do the opposite.  
Once you are satisfied, you can press the button labeled ```Start Processing```. Once clicked it will show you the status of that video, and when it's done, will give you the option to download the ```.csv``` file that has been made.  
[Placeholder for processing page with .csv made]  
Under the ```Start Processing``` button is either text saying ```No files available``` or, if a video has been processed on that page, the download link.  
The nav bar at the top can take you back to either the home or video page.  

### Basic Use

### Modifying for Development/Other Projects
