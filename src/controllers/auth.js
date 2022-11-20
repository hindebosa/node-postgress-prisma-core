const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const signup = async (req, res, next) => {
  try {
    const { name, password, email } = req.body;

    const hashedpassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email,
        password: hashedpassword,
      },
    });

    console.log(user);

    res.status(200).send("ok");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { signup };
