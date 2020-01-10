const request = require("supertest");
const db = require("../database/dbconfig.js");
const server = require("./server.js");

describe("GET /", () => {
  it("returns 200 ok", done => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
