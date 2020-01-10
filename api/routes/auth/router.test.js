const request = require("supertest");
const server = require("../../server.js");
const prepTestDB = require("../../helpers/prepTestDB.js");

const authToken = require("../global-middleware/authtoken.js");
jest.mock("../global-middleware/authtoken.js");

beforeEach(prepTestDB);
describe("POST /register", () => {
  it("creates a new user", async () => {
    const res = await request(server)
      .post("/register")
      .send({
        username: "bestchef",
        password: "bestchef1",
        email: "bestchef@gmail.com",
        name: "Best Chef"
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Thanks for joining the club!");
  });
  it("fails user creation", async () => {
    const res = await request(server).post("/register");

    expect(res.status).toBe(500);
  });
});

describe("POST /register/chef", () => {
  beforeEach(prepTestDB);
  it("creates a new chef", async () => {
    const res = await request(server)
      .post("/register/chef")
      .send({
        username: "bestchef",
        password: "bestchef1",
        email: "bestchef@gmail.com",
        name: "Best Chef",
        location: "Best Chef Town",
        phone_number: "8675309999",
        business_name: "bestchef.com"
      });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ chef: [3] });
  });
  it("fails chef creation", async () => {
    const res = await request(server)
      .post("/register/chef")
      .send(null);

    expect(res.status).toBe(500);
  });
});

describe("POST /login", () => {
  beforeEach(prepTestDB);
  it("gives a chef a token", async () => {
    const res = await request(server)
      .post("/login")
      .send({ username: "misunderstoodchef86", password: "password1234" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      "Logged in misunderstoodchef86 with chef_id: 1"
    );
    expect(res.body.chef_id).toBe(1);
    expect(res.body).toHaveProperty("token");
  });
  it("gives a user a token", async () => {
    const res = await request(server)
      .post("/login")
      .send({ username: "test2", password: "password1234", is_chef: false });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logged in test2");
    expect(res.body).toHaveProperty("token");
  });
  it("gives a message of invalid if user does not use correct password", async () => {
    const res = await request(server)
      .post("/login")
      .send({ username: "test2", password: "pass" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("invalid");
  });
  it("gives a message of invalid if chef does not use correct password", async () => {
    const res = await request(server)
      .post("/login")
      .send({ username: "misunderstoodchef86", password: "pass" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("invalid");
  });
    it("gives a message of invalid if chef does not use correct password", async () => {
      const res = await request(server)
        .post("/login")
        .send({ username: "misunderstoodchef86", password: "pass" });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("invalid");
    });
  it("fails logging in user or chef without body", async () => {
    const res = await request(server).post("/login");

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });
});

describe("PUT /user/:user_id/update", () => {
  beforeEach(prepTestDB);

  it("updates user successfully", async () => {
    const res = await request(server)
      .put("/user/2/update")
      .send({
        username: "B",
        password: "pass",
        email: "b@gmail.com",
        name: "B"
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("updatedUser");
  });

  it("fails with no body", async () => {
    const res = await request(server).put("/user/2/update");

    expect(res.status).toBe(500);
  });
});

// describe("DELETE /user/:user_id/delete", () => {
//   it("deletes user successfully", async () => {
//     const res = await request(server).delete("/user/2/delete");

//     auth({ username: "test2", password: "password1234" });
//     expect(authToken).toBeCalled();
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("success");
//     expect(res.body).toHaveProperty("user");
//   });
//   it("fails at deleting user", async () => {
//     const res = await request(server).delete("/user/undefined/delete");

//     auth({ username: "test2", password: "password1234" });
//     expect(authToken).toBeCalled();
//     expect(res.status).toBe(500);
//     expect(res.body).toHaveProperty("error");
//   });
// });

describe("GET /allusernames", () => {
  it("returns all usernames with 200 ok", async () => {
    const res = await request(server).get("/allusernames");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("users");
  });
});
