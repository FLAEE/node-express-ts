"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
const courses = [
    { id: 1, name: 'Clean Room' },
    { id: 2, name: 'Wash Dishes' },
    { id: 3, name: 'Study Data Mining' }
];
app.get('/', (req, res) => {
    res.send('This is a To-Do List');
});
app.get('/api/list', (req, res) => {
    res.send(courses);
});
app.post('/api/list', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name required and min 3 chars');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
app.put('/api/list/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send(`Entry with ID ${req.params.id} does not exist`);
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send('Name required and min 3 chars');
        return;
    }
    if (course != undefined) {
        course.name = req.body.name;
    }
    res.send(course);
});
app.delete('/api/list/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send(`Entry with ID ${req.params.id} does not exist`);
    if (course != undefined) {
        const index = courses.indexOf(course);
        courses.splice(index, 1);
    }
    res.send(course);
});
app.get('/api/list/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send(`Entry with ID ${req.params.id} does not exist`);
    res.send(course);
});
app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});
