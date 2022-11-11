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
  it("returns 200 OK when signup request is valid", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: "user1",
        email: "easd@jsdf.sd",
        password: "pass322",
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
    // .expect(200, done);
  });

  it("returns success message when signup request is valid", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: "user1",
        email: "easd@jsdf.sd",
        password: "pass322",
      })
      .then((response) => {
        expect(response.body.message).toBe("user created");
        done();
      });
  });

  it("save the user to database", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: "user1",
        email: "easd@jsdf.sd",
        password: "pass322",
      })
      .then(() => {
        // query the user table
        User.findAll().then((userlist) => {
          //   expect(userlist.length).toBe(1);
          expect(userlist.length).toBeGreaterThan(0);
          done();
        });
      });
  });

  it("it saves username and email to database", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: "user1",
        email: "easd@jsdf.sd",
        password: "pass322",
      })
      .then(() => {
        // query the user table
        User.findAll().then((userlist) => {
          const savedUser = userlist[0];
          expect(savedUser.username).toBe("user1");
          expect(savedUser.email).toBe("easd@jsdf.sd");
          done();
        });
      });
  });

  it("it hashes the password in database", (done) => {
    request(app)
      .post("/api/v1/users")
      .send({
        username: "user1",
        email: "easd@jsdf.sd",
        password: "pass322",
      })
      .then(() => {
        // query the user table
        User.findAll().then((userlist) => {
          const savedUser = userlist[0];
          expect(savedUser.password).not.toBe("pass322");
          done();
        });
      });
  });
});
