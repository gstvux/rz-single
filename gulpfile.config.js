/** INFORMAÇÕES PARA EDITAR */
const project_name = "rz-single";

/** PATHS */
const path = {
    // general
    b: "./",
    m: "./node_modules",
    // dev
    js: "./assets/js",
    css: "./assets/css",
    img: "./assets/img",
    sass: "./scss"
};

/** FILE NAMES */
const fileName = {
    css: "main.css",
    cssmin: "main.min.css",
    js: "main.js",
    jsmin: "main.min.js"
};

const filesToWatch = [
    path.css + fileName.css,
    path.js + fileName.js,
    path.b + "/**/*.php",
    path.b + "/**/*.html"
];

/** TASKS */
const tasks = ["sass", "sync"];

const loads = {
    css: [],
    js: []
};

/** PROJECT INFO */
const project = {
    syncPort: 3001,
    loads: {
        html: false,
        copyFont: false,
        //legacy css
        css: [
            // {
            //     origin: path.modules,
            //     path: "/owl.carousel/dist/assets/owl.carousel.min.css"
            // },
            // {
            //     origin: path.modules,
            //     path: "/owl.carousel/dist/assets/owl.theme.default.css"
            // },
            // {
            //     origin: path.css,
            //     path: "/main.scss"
            // }
        ],
        js: [
            // {
            //     origin: path.modules,
            //     path: "/jquery/dist/jquery.min.js"
            // },
            // {
            //     origin: path.modules,
            //     path: "/popper.js/dist/umd/popper.min.js"
            // },
            // {
            //     origin: path.modules,
            //     path: "/bootstrap/dist/js/bootstrap.min.js"
            // },
            // {
            //     origin: path.modules,
            //     path: "/owl.carousel/dist/owl.carousel.js"
            // },
            // {
            //     origin: path.jsSrc,
            //     path: "/main.js"
            // }
        ]
    }
};

if (project.loads.copyFont) {
    tasks.push("copy.fonts");
}

if (project.loads.html) {
    tasks.push("html");
}

project.loads.css.map(item => {
    loads.css.push(item.origin + item.path);
});

project.loads.js.map(item => {
    loads.js.push(item.origin + item.path);
});

module.exports = {
    project_name,
    path,
    filesToWatch,
    tasks,
    project,
    loads
};
