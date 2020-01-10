const request = require("supertest");
const server = require("../../server.js");
const prepTestDB = require("../../helpers/prepTestDB.js");

describe("POST /register", () => {
  beforeEach(prepTestDB);
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
    const res = await request(server)
      .post("/register")
      .send(null);

    expect(res.status).toBe(500);
  });
  it("should return a JSON object from the register route", async () => {
    const res = await request(server)
      .post("/register")
      .send({
        username: "bestchef",
        password: "bestchef1",
        email: "bestchef@gmail.com",
        name: "Best Chef"
      });
    expect(res.type).toEqual("application/json");
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
