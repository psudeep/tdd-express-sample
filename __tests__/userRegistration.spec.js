const request = require("supertest");
const app = require("../src/app");
const User = require("../src/user/User");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe("user registration", () => {
  const postValidUser = () => {
    return request(app).post("/api/v1/users").send({
      username: "user1",
      email: "easd@jsdf.sd",
      password: "pass322",
    });
  };

  it("returns 200 OK when signup request is valid", async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
    // .expect(200, done);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe("user created");
  });

  it("save the user to database", async () => {
    await postValidUser();
    // query the user table
    const userlist = await User.findAll();
    //   expect(userlist.length).toBe(1);
    expect(userlist.length).toBeGreaterThan(0);
  });

  it("it saves username and email to database", async () => {
    await postValidUser();
    // query the user table
    const userlist = await User.findAll();
    const savedUser = userlist[0];
    expect(savedUser.username).toBe("user1");
    expect(savedUser.email).toBe("easd@jsdf.sd");
  });

  it("it hashes the password in database", async () => {
    await postValidUser();
    // query the user table
    const userlist = await User.findAll();
    const savedUser = userlist[0];
    expect(savedUser.password).not.toBe("pass322");
  });
});
