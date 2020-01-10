const request = require("supertest");
const server = require("../../server.js");
const prepTestDB = require("../../helpers/prepTestDB.js");
const db = require("../../../database/dbconfig.js");

const authToken = require("../global-middleware/authtoken.js");
jest.mock("../global-middleware/authtoken.js");

// const validateChefId = require("../global-middleware/validateChefId.js");
// jest.mock("../global-middleware/validateChefId.js");

beforeEach(prepTestDB);
beforeEach(() => authToken.mockClear());

describe("POST /:chef_id/recipes", () => {
  it("successfully adds a recipe 201", async () => {
    const res = await request(server)
      .post(`/chef/1/recipes`)
      .send({
        title: "testing suite",
        servings: 25,
        instructions: "Here are some testing instructions",
        images: "no real image url"
      });

    expect(authToken).toBeCalled();
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("recipes");
  });
  it("fails to add recipe without a body 500", async () => {
    const res = await request(server).post("/chef/1/recipes");

    expect(authToken).toBeCalled();
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("error");
  });
});

describe("GET /chef/:chef_id/recipes", () => {
  it("successfully gets chefs recipes as array, 200", async () => {
    const res = await request(server).get("/chef/1/recipes");

    expect(res.status).toBe(200);
  });
});

describe("/PUT /chef/:chef_id/recipes/:recipe_id", () => {
  it("successfully updates a chefs recipe, 200 ok", async () => {
    const res = await request(server)
      .put("/chef/1/recipes/1")
      .send({
        title: "Testing Put Request",
        servings: 1000,
        instructions: "Testing Put Request"
      });

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
  });
});

describe("/DELETE /:chef_id/recipes/:recipe_id", () => {
  it('successfully deletes a chefs recipes, 200 ok',  async () => {
    const res = await request(server)
    .delete("/chef/1/recipes/1")

    expect(res.status).toBe(200)
    expect(authToken).toBeCalled()
  })
})
