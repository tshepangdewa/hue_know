```
# HueKnow: Project Description and Technical Overview

## 1. Introduction

HueKnow is a web application that extracts the three dominant colours from an image. It helps users identify the main colours in photographs, graphics, and other images without having to select them manually. The application displays the extracted colours in a palette, including each colour's name, HEX code, RGB values, and approximate percentage of the image it represents.

The main goal of HueKnow is to provide a simple, fast, and accessible tool for people who need colour information for website design, graphic design, digital art, and other creative projects. Users do not need to create an account or install additional software to use the application.

## 2. How the Application Works

The process begins when a user opens HueKnow and selects an image from their device. They can click the upload button or drag and drop an image into the upload area. The application supports common image formats, including JPG, PNG, WebP, and GIF. Once an image is selected, HueKnow displays a preview and begins processing it.

The application uses JavaScript and the browser's Canvas API to analyse the image. First, it loads the image and creates a smaller version with a maximum dimension of 600 pixels. This reduces the amount of data that must be processed, helping the application work faster and use less memory. The image is then drawn onto a canvas, allowing JavaScript to access its individual pixel values.

Each pixel contains red, green, blue, and alpha values. HueKnow samples a limited number of pixels rather than examining every pixel individually. It groups similar colours together, calculates the relative weight of each group, and selects up to three dominant colour groups. The algorithm uses colour conversion and colour-distance calculations to help identify similar shades.

After extraction, the application converts the selected colours into useful formats. These include HEX codes, RGB values, HSL values, and approximate human-readable colour names. It also calculates the estimated percentage represented by each colour group.

The results are displayed in two visual formats. The bubble view uses circles of different sizes to represent the relative importance of each colour. The bar view uses horizontal bars to communicate the same information. Users can switch between the views and copy HEX codes to their clipboard.

## 3. Technology Stack

HueKnow uses several technologies that work together to provide the complete experience.

- HTML: Provides the basic structure of the webpage.
- CSS: Controls the design, layout, colours, typography, spacing, responsiveness, and interactive states.
- JavaScript: Handles image processing, colour calculations, file validation, and clipboard operations.
- React: Builds the interface using reusable components and manages application state.
- Vite: Provides the development server and creates the optimised production build.
- D3.js: Creates the bubble and bar charts using SVG graphics.
- Canvas API: Allows the application to draw images and read their pixel data.
- Browser File and Clipboard APIs: Support local image handling and copying HEX codes.

These technologies allow HueKnow to operate primarily within the user's browser without requiring a dedicated application server.

## 4. Project Folder Structure

The project is organised into folders to make the code easier to understand, maintain, and expand.

```
hue_know/
├── public/
│   ├── favicon.svg
│   └── icons/
│       ├── github.svg
│       ├── instagram.svg
│       └── linkedin.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── Results.jsx
│   │   ├── BubbleChart.jsx
│   │   ├── BarChart.jsx
│   │   ├── ColorDetails.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Features.jsx
│   │   ├── FAQ.jsx
│   │   └── Footer.jsx
│   ├── utils/
│   │   ├── imageToPixels.js
│   │   ├── colorExtractor.js
│   │   ├── colorUtils.js
│   │   ├── paletteUtils.js
│   │   └── clipboard.js
│   ├── App.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

The `components` folder contains the different parts of the interface. For example, `ImageUploader.jsx` manages image selection, `Results.jsx` controls the results display, and the chart components visualise the extracted colours.

The `utils` folder contains the main processing functions. `imageToPixels.js` converts images into pixel data, while `colorExtractor.js` identifies dominant colours. `colorUtils.js` calculates colour formats and names, `paletteUtils.js` prepares the results, and `clipboard.js` handles copying HEX codes.

`App.jsx` brings the components together, while `index.css` contains the application's styling. The `public` folder stores static assets, including the favicon and social media icons.

## 5. Hosting and Deployment

HueKnow is designed for deployment on Vercel, a platform that hosts web applications. During development, the command `npm run dev` starts the local development server. When the application is ready, `npm run build` creates an optimised production version inside the `dist` folder.

Vercel can build the project and serve these static files to website visitors. The expected configuration uses `npm run build` as the build command and `dist` as the output directory.

Because HueKnow does not currently require a backend, database, authentication system, or external colour-analysis API, its hosting requirements are relatively simple. A successful local build should still be followed by checking the deployed website, its assets, and its functionality.

## 6. Privacy and Future Improvements

HueKnow processes images locally in the browser. The selected image does not need to be sent to a HueKnow server, which reduces infrastructure requirements and improves privacy. However, the application still needs an internet connection to load the hosted website and any externally hosted assets.

Future improvements could include automated testing, more accurate colour grouping, better handling of very large images, and options to export or save palettes.

Overall, HueKnow combines frontend development, image processing, colour analysis, and interactive visualisation to make discovering and reusing image colours straightforward.
```
