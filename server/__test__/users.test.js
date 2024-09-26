const request = require("supertest");
const app = require("../src/app");

const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcryptJsHelper");
const { queryInterface } = sequelize;

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert("Users", [
      {
        username: "moom",
        email: "moom@gmail.com",
        password: hashPassword("moom123"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}, null);

afterAll(async () => {
  try {
    await queryInterface.bulkDelete(
      "Users",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

describe("POST /login", () => {
  test("Success 200", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "moom@gmail.com",
      password: "moom123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  // test("Failed 400 - missing email", async () => {
  //   const response = await request(app).post("/api/users/login").send({
  //     email: "",
  //     password: "moom123",
  //   });
  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty("message", "")
  // });
});
