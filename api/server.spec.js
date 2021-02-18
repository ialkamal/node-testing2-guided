const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("hobbits").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("tests for server.js", () => {
  //tests here
  //are we in testing environment?
  test("we are in the testing enviornment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    //is the return code value right?
    let res;
    beforeEach(async () => {
      res = await request(server).get("/");
    });
    test("the return code value", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
    test("return 200 ok async", async () => {
      expect(res.statusCode).toBe(200);
    });
    //is the return data of the correct type?
    test("return json type", async () => {
      expect(res.type).toBe("application/json");
    });

    //is the return data of the correct value?
    test("returns {api:'up'}", async () => {
      expect(res.body).toEqual({ api: "up" });
    });
  });

  //is the return code value right?
  //is the return data of the correct type?
  //is the return data of the correct value?
});
