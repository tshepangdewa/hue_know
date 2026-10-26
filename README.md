HueKnow: Project Description and Technical Overview

Introduction

HueKnow is a web application that extracts the three most dominant colours from an uploaded image. It is designed for people who need to identify colours for website development, graphic design, photography, art, and other creative projects. Users can upload an image, view its main colours, explore their colour codes, and copy those codes for use elsewhere. The application does not require users to create an account or log in.

How the Application Works

When a user opens HueKnow, they see an upload area where they can select an image from their device or drag and drop it into the application. Supported image formats include JPEG, PNG, WebP, and GIF, subject to the implementation.

After an image is selected, HueKnow creates a preview and prepares the image for processing. JavaScript loads the image into an HTML Canvas element. Canvas allows the application to access the image's individual pixels and their colour values. Large images are resized before analysis to reduce processing time and memory use.

The application samples pixels from the image instead of analysing every pixel in a large image. It groups similar colours together and estimates which colours appear most frequently. It then identifies the three dominant colours and calculates their approximate percentages in the sampled image.

The results appear in an interactive palette. Users can switch between bubble and bar chart views. The bubble chart represents colours with circles, while the bar chart uses bars to show their relative proportions. Selecting a colour displays information such as its name, HEX code, RGB values, and estimated percentage. Users can copy HEX codes using the browser's Clipboard API and paste them into code editors or design applications.

Technology Stack

HueKnow uses HTML, CSS, JavaScript, React, Vite, and D3.js. HTML defines the page structure, while CSS controls the layout, colours, spacing, typography, and responsive design. JavaScript handles image processing and the application's functionality.

React divides the interface into reusable components. It also manages application state, allowing the results to update when a user uploads another image or changes the chart view. Vite provides the development server and builds the application files for production. D3.js creates the interactive charts. The Canvas API reads image pixels, and browser file and clipboard APIs support image selection, previews, and copying colour codes.

Actual Project Folder Structure

The following is the intended source structure based on the project details. It should be compared with the current local project folder to confirm every filename.

hue_know/
    public/
        favicon.svg
        icons/
            github.svg
            instagram.svg
            linkedin.svg
    src/
        components/
            Header.jsx
            Hero.jsx
            ImageUploader.jsx
            Results.jsx
            BubbleChart.jsx
            BarChart.jsx
            ColorDetails.jsx
            HowItWorks.jsx
            Features.jsx
            FAQ.jsx
        utils/
            imageToPixels.js
            colorExtractor.js
            colorUtils.js
            paletteUtils.js
            clipboard.js
        App.jsx
        index.css
    index.html
    package.json
    vite.config.js

The public folder contains static resources, including the favicon and social media icons. The src folder contains the main application code. Its components folder holds the different interface sections, including the uploader, charts, results, and colour information. The utils folder contains helper functions for reading image pixels, extracting colours, converting colour values, preparing the palette, and copying text.

App.jsx connects the main components and manages shared state. The index.css file contains the application's styling. The index.html file provides the webpage entry point and metadata. The package.json file defines dependencies and scripts, while vite.config.js contains Vite's configuration.

Hosting and Deployment

HueKnow can be deployed using Vercel, a platform for hosting frontend applications. The project can be connected to a Git repository, allowing Vercel to build and deploy the website. With the appropriate configuration, updates pushed to the repository can trigger new deployments.

Since the main image-processing work happens in the browser, HueKnow does not need a dedicated backend server or database for its core features. Vercel serves the application files, and the user's browser runs the JavaScript. The actual build command, output directory, and deployment status should be verified in the project's Vercel settings.

Privacy and Limitations

HueKnow is designed to process images locally in the browser rather than sending them to a remote colour-analysis service. This reduces the need to transfer image data elsewhere. Its accuracy depends on pixel sampling and colour grouping, so the results are estimates rather than guaranteed exact measurements.

Conclusion

HueKnow combines image processing, colour analysis, and interactive visualisation in a simple web application. React manages the interface, JavaScript analyses image pixels, D3.js displays the results, and Vite prepares the project for deployment. Hosting through Vercel makes the application accessible through a web browser without requiring users to install software.
