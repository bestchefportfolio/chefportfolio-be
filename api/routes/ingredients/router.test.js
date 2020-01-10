const request = require("supertest");
const server = require("../../server.js");
const prepTestDB = require("../../helpers/prepTestDB.js");
const db = require("../../../database/dbconfig.js");

const authToken = require("../global-middleware/authtoken.js");
jest.mock("../global-middleware/authtoken.js");

beforeEach(prepTestDB);
beforeEach(() => authToken.mockClear());
describe("GET /ingredients", () => {
  it("successfully gets all ingredients 200 ok", async () => {
    const res = await request(server).get("/ingredients");

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
    expect(res.body).toHaveProperty("ingredients");
  });
});

describe("GET /ingredients/meal-types", () => {
  it("successfully gets all quantites, 200 ok", async () => {
    const res = await request(server).get("/ingredients/quantities");

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
    expect(res.body).toHaveProperty("types");
  });
});

describe("GET /ingredients/meal-types", () => {
  it("successfully gets all meal-types, 200 ok", async () => {
    const res = await request(server).get("/ingredients/meal-types");

    expect(res.status).toBe(200);
    expect(authToken).toBeCalled();
    expect(res.body).toHaveProperty("mealtypes");
  });
});
