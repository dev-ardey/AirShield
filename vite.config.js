// vite.config.js
export default {
    // other configuration options

    build: {
        rollupOptions: {
            input: {
                index: './index.html',
                home: './home.html'
            }
        },
        assetsInclude: [
            // Add any existing asset paths here
            "images/red-arrow.svg",
            "images/red-cloud.svg",
            "images/green-cloud.svg",
            "images/activated-shield.svg",
            "images/map-135.png",
            "images/map-180.png",
            "images/map-270.png",
            "images/map-90.png",
            "images/map-45.png",
            "images/map-225.png",
            "images/map-315.png",
            "images/map-0.png",
            // home images
            "images/home/f1.png",
            "images/home/f2.png",
            "images/home/f3.png",
            "images/home/f4.png",
            "images/home/f4.png",
            "images/home/f5.png",
            "images/home/f6.png",
            "images/home/f7.png",
            "images/home/f8.png",
            "images/home/healthy-lung.png",
            "images/home/time.png",
            "images/home/lung.png",
            "images/home/child.png",
            "images/home/phone-14.png",
            "images/home/phone-14-b.png",
            "images/home/wind-data.png",



            // paths for home.html, home.css, and home.js
            "home.html",
            "home.css",
            "home.js"
        ]
    }
};
