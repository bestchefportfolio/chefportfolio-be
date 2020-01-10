const request = require("supertest");
const server = require("../../server.js");
const prepTestDB = require("../../helpers/prepTestDB.js");
const db = require("../../../database/dbconfig.js");

const validateToken = require("../global-middleware/authtoken.js");
jest.mock("../global-middleware/authtoken.js");

// const validateChefId = require("../global-middleware/validateChefId.js");
// jest.mock("../global-middleware/validateChefId.js");

describe("POST /:chef_id/recipes", () => {
  beforeEach(prepTestDB);
  it("successfully adds a recipe", async done => {
    const testUser = {
      username: "misunderstoodchef86",
      password: "password1234"
    };
    const loginRes = await request(server)
      .post("/login")
      .send(testUser);

    const res = request(server)
      .post(`/chef/${loginRes.body.chef_id}/recipes`)
      .set("authorization", loginRes.body.token)
      .send({
        title: "testing suite",
        servings: 25,
        instructions: "Here are some testing instructions",
        images: "no real image url"
      });

    // expect(validateToken).toBeCalled();
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("chef");
    expect(res.body).toHaveProperty("recipes");
    done();
  });
  it("fails to add recipe without a body", done => {
    const res = request(server).post("/chef/1/recipes");
    // expect(validateToken).toBeCalled();
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("error");
    done();
  });
});
