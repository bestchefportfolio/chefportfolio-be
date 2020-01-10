const request = require("supertest");
const server = require("../../server.js");
const prepTestDB = require("../../helpers/prepTestDB.js");

beforeEach(prepTestDB);

describe("GET /recipes", () => {
  it("success posts an ingredient to recipe", async () => {
    const res = await request(server).get("/recipes");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("all_recipes");
  });
});
