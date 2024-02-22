const prisma = require("./prisma/prismaClient");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let cnt = 0;

function generateNewNumber() {
  if (typeof cnt === 'undefined') {
    cnt = 0;
  }
  cnt++;
  const newNumber = Number(`0000${cnt}`);
  return newNumber;
}
async function hashPass(password) {
  try {
    console.log("Password before hashing:", password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err.message);
    throw err; // Re-throw the error to handle it outside this function
  }
}
async function comparePass(password, hashPass) {
  try {
    return await bcrypt.compare(password, hashPass);
  } catch (err) {
    console.log(err.message);
  }
}

// async function createClassAndStudent(classId, name, email, password) {
//   try {
//     console.log(password);
//     const pass = await hashPass(password);
//     console.log(pass);
//     const studentData = await prisma.students.create({
//       data: {
//         name: name,
//         email: email,
//         password: pass,
//         classId: {
//           create: { classId: classId },
//         },

//       }
//     });
//     console.log(studentData);
//     console.log("Created student successfully");
//     return studentData;
//   } catch (err) {
//     console.log(err.message);
//     // Optionally, rethrow the error to handle it elsewhere
//     throw err;
//   }
// }
async function createClassAndStudent(classId, name, email, password) {
  try {
    // Create a new class if it doesn't exist already
    let classData = await prisma.classes.findUnique({
      where: {
        classId: classId
      }
    });

    if (!classData) {
      classData = await prisma.classes.create({
        data: {
          classId: classId
        }
      });
    }

    // Create the student with the obtained classId
    const pass = await hashPass(password);
    const studentData = await prisma.students.create({
      data: {
        name: name,
        email: email,
        password: pass,
        classId: classData.classId // Use the obtained classId
      }
    });

    console.log("Created student successfully:", studentData);
    return studentData;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
async function createClass() {
  try {
    const id = generateNewNumber();
    const classId = await prisma.classes.create({
      data: {
        classId: id
      }
    });
    return classId;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { createClassAndStudent, createClass, comparePass }