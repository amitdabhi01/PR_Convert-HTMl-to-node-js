import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

let studentList = [
  {
    id: 1,
    name: "amit",
  },
  {
    id: 2,
    name: "jayy",
  },
  {
    id: 3,
    name: "krunal",
  },
];

app.get("/", (req, res) => {
  res.render("index", { studentList });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { name } = req.body;

  const newStudent = {
    id: new Date().getTime(),
    name,
  };

  studentList.push(newStudent);

  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = studentList.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json("Student not found");
  }

  res.render("edit", { student });
});

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = studentList.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json("Student not found");
  }

  const { name } = req.body;

  student.name = name;

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = studentList.find((s) => s.id === id);

  if (!student) {
    res.status(404).json("Student not found");
  }

  studentList = studentList.filter((s) => s.id !== id);

  res.redirect("/");
});

const port = 5000;

app.listen(port, () => {
  console.log("Server run on this port", port);
});
