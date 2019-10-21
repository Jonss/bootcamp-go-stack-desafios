const express = require('express');
const app = express();

app.use(express.json());

const route = '/projects';
const projects = [];
let counter = 0;

const handleProject = (req, res, next) => {
  const { id } = req.params;
  const projectFound = findProjectById(id);

  if(!projectFound) {
    res.status(400).json({ message: 'Project not found'});
  }

  req.project = projectFound[0];

  return next();
}

const findProjectById = id => projects.filter(project => project.id === id);

const count = (req, res, next) => {
  counter++;
  console.log(`Requests quantity: ${counter}`);
  return next();
}

app.use(count);




app.get('/', (req, res) => res.json({ message: 'Hello world!'}))

app.post(route, (req, res) => {
  const project = req.body;
  projects.push(project);

  res.status(201).json(project);
});

app.get(route, (req, res) => {
  res.json(projects)
});

app.delete(`${route}/:id`, handleProject, (req, res) => {
  const project = req.project

  projects.splice(project, 1);

  return res.status(204).json('');
});

app.put(`${route}/:id`, handleProject, (req, res) => {
  const project = req.project

  const { title } = req.body;

  project.title = title;

  return res.json(project);
});

app.post(`${route}/:id/tasks`, handleProject, (req, res) => {
  const project = req.project
  const { title } = req.body

  project.tasks.push(title)

  return res.json(project);
})

app.listen(3000, () => {
  console.log('Server is running!')
});