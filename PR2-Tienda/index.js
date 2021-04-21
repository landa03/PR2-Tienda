const express = require("express");
const createError = require("http-errors");
const app = express();
const port = 3000;

// Configurar motor de templates (en este caso usamos ejs)
app.set("view engine", "ejs");

// Variables
let tiposDeCucharas = [
    "ALGEBRA I",
    "FISICA",
    "INTRODUCCION AL DISEÑO DIGITAL",
    "PRINCIPIOS DE PROGRAMACION",
    "INTRODUCCION A LA MULTIMEDIA",
    "METODOLOGIA DE LA INVESTIGACION",
    "INGLES I",
];

let desechables = [
    {
        // nombre de la propiedad: valor
        id: 'a',
        nombre: "Cucharas grandes",
        materias: [
            {
                id: 1,
                nombre: "Cucharon",
                imgs: "/public/cucharon-de-acero-inoxidable-.jpg",
                docente: "Como su nombre lo indica, esta es una cuchara mas grande de lo comun, esta cuchara es usualmente para usada para servir: salsa, sopa y/o caldo"
            },
        ]
    },
];
    

let noDesechables = [
    {
        // nombre de la propiedad: valor
        id: 'a',
        nombre: "Cucharas grandes",
        materias: [
            {
                id: 1,
                nombre: "Cucharon",
                imgs: "/public/cucharon-de-acero-inoxidable-.jpg",
                docente: "Como su nombre lo indica, esta es una cuchara mas grande de lo comun, esta cuchara es usualmente para usada para servir: salsa, sopa y/o caldo"
            },
            {
                id: 2,
                nombre: "Cuchara sopera",
                imgs: [],
                docente: "Esta cuchara es mas comunmente conosida como cuchara para arroz, esta cuchara es comunmente utilisada para servir comidas solidas como: arros, pollo, etc."
            },
            {
                id: 3,
                nombre: "Cucharon con pico ",
                imgs: [],
                docente: "Esta cuchara es similar al cucharon, mas sin embargo, esta tiene un pico el cual se usa para servir lichidos con mayor presision, asi evitando el riesgo de algun accidente a la hora de servir"
            },
            {
                id: 4,
                nombre: "Cucharon colador ",
                imgs: [],
                docente: "Esta cuchara es similar al cucharon, mas sin embargo esta pose un colador el cual esta unido a un lado del cucharon, esto sirve para pider separar solidos de liquidos sin remover por completo dichos liquidos"
            },
            {
                id: 5,
                nombre: "Cuchara de mango largo de corte de agitasion",
                imgs: "/public/cuchara_mezcladora.jpg",
                docente: "Esta cuchara pose un mango largo retorsido en espiral, esta es espesificamente usada para mesclar bebidas"
            },
            {
                id: 6,
                nombre: "Cuchara para helado",
                imgs: [],
                docente: "to do"
            },
            {
                id: 7,
                nombre: "Cuchara para buffet",
                imgs: [],
                docente: "to do"
            },
            {
                id: 8,
                nombre: "Cuchara para espageti",
                imgs: [],
                docente: "to do"
            },
            {
                id: 9,
                nombre: "Cuchara espumadera",
                imgs: [],
                docente: "to do"
            },
            
        ]
    },
    {
        id: 'b',
        nombre: "Cucharas medianas",
        materias: [
            {
                nombre: "Cuchara legumbrera",
                imgs: [],
                docente: "M. Ochoa"
            },
            {
                nombre: "Cuchara para cremas y postres",
                imgs: [],
                docente: "M. Ochoa"
            },
        ]
    },
    {
        nombre: "Cucharas pequenas",
        materias: [
            {
                nombre: "MATEMATICAS II",
                imgs: [],
                docente: "M. Ochoa"
            },
            
        ]
    }
];

// Rutas
app.use(express.static("public"));

app.get("/", (req, res) => {
    // render -> mostrar una vista/html/ejs
    res.render("pages/index");
});

app.get("/multimedia", (req, res) => {
    res.render("pages/carrera", {
        primero: tiposDeCucharas,
        semestres: noDesechables,
    });
});

app.get("/artes", (req, res) => {
    res.render("pages/artes",{
        primero: tiposDeCucharas,
        semestres: desechables,
    });
});

// /multimedia/a/1  =>  en el primer semestre, la primer materia
app.get("/multimedia/:idSemestre/:idMateria", (req, res, next) => {
    let idSemestre = req.params.idSemestre;
    let idMateria = req.params.idMateria;

    let materiaEncontrada = false;

    noDesechables.forEach((semestre) => {
        if (semestre.id === idSemestre) {
            // Encontramos el semestre solicitado

            semestre.materias.forEach((materia) => {
                if (materia.id && materia.id.toString() === idMateria) {
                    // Encontramos la materia solicitada
                    materiaEncontrada = true;

                    res.render("pages/materia", {
                        semestre: semestre,
                        materia: materia,

                        // semestre,
                        // materia,
                    });
                }
            });
        }
    });

    if (!materiaEncontrada) {
        next();
    }
});

// Not Found
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});