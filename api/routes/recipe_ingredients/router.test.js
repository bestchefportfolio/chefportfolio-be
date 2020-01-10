const request = require("supertest");
const server = require("../../server.js");
const prepTestDB = require("../../helpers/prepTestDB.js");
const db = require("../../../database/dbconfig.js");

const authToken = require("../global-middleware/authtoken.js");
jest.mock("../global-middleware/authtoken.js");

beforeEach(prepTestDB);
beforeEach(() => authToken.mockClear());

describe("POST /recipes/:recipe_id/ingredients", () => {
  it("success posts an ingredient to recipe", async () => {
    const res = await request(server)
      .post("/recipes/1/ingredients")
      .send({
        ingredient_name: "tofu",
        quantity_id: 3,
        quantity_value: 3
      });

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
    expect(res.body).toHaveProperty("recipe_ingredients");
  });
});
describe("POST /recipes/:recipe_id/meal-types", () => {
  it("success posts an ingredient to recipe", async () => {
    const res = await request(server)
      .post("/recipes/1/meal-types")
      .send({
        meal_type_name: "breakfast"
      });

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
    expect(res.body).toHaveProperty("recipe_meal_type");
  });
});

describe("PUT /recipes/:recipe_id/ingredients", () => {
  it("success posts an ingredient to recipe", async () => {
    const res = await request(server)
      .put("/recipes/1/ingredients/1")
      .send({
        quantity_id: 3,
        quantity_value: 3
      });

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
    expect(res.body).toHaveProperty("updated");
  });
});

describe("DELETE /recipes/:recipe_id/ingredients/:ingredient_id", () => {
  it("success posts an ingredient to recipe", async () => {
    const res = await request(server).delete("/recipes/1/ingredients/1");

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
    expect(res.body).toHaveProperty("currentRecipes");
  });
});

describe("GET /recipes/:recipe_id/ingredients", () => {
  it("success posts an ingredient to recipe", async () => {
    const res = await request(server).get("/recipes/1/ingredients");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("ingredients");
  });
});
