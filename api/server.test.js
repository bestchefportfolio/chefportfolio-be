const request = require("supertest");
const server = require("./server.js");

describe("GET /", () => {
  it('has process.env.NODE_ENV as "testing"', () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
  it("returns 200 ok", done => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
