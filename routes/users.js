const router = require('express').Router();
const prisma = require('./../prisma/prismaClient');
const lib = require('../lib')
const jwtGenerator = require("../controllers/jwtGenerator")


router.post('/users/:id', async (req, res) => {
  const { name, email, password } = req.body
  const id = parseInt(req.params.id);
  try {
    const data = await lib.createClassAndStudent(id, name, email, password)
    return res.status(200).json({ data })
  }
  catch (err) {
    console.log(err)
  }
})


router.get("/classes", async (req, res) => {
  try {
    const classes = await prisma.class.findMany();

    res.status(200).json({ classes })
  } catch (err) {
    console.log(err.message);
  }
})

router.post('/register', async (req, res) => {
  try {
    const { classId, name, email, password } = req.body;
    if (!classId || !name || !email || !password) {
      return res.status(400).json({ error: 'Please provide class name, name, email, and password' });
    }
    const studentData = await lib.createClassAndStudent(classId, name, email, password);
    const token = jwtGenerator(email);
    res.json({ token, studentData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }
    const user = await prisma.students.findUnique({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await lib.comparePass(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwtGenerator(email);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router