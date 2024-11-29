const request = require("supertest");
const app = require("./app.js");
const db = require("./db/connection.js");
const seed = require("./db/seeds/seed.js");
const { validData, invalidData } = require("./db/data/index.js");

beforeAll(() => {
  return seed({ validData, invalidData });
});

afterAll(() => {
  return db.end();
});

describe("", () => {
  describe("POST /api/validData", () => {
    test("Should add a valid record to the database", async () => {
      const validRecord = {
        full_name: "Alice Johnson",
        email: "alice.john@example.com",
      };

      const res = await request(app).post("/api/validData").send(validRecord);

      expect(res.statusCode).toBe(201); 
      expect(res.body.full_name).toBe(validRecord.full_name); 
      expect(res.body.email).toBe(validRecord.email); 
    });
  });

  describe("POST /api/invalidData", () => {
    test("Should add an invalid record to the database with error reason", async () => {
      const invalidRecord = {
        full_name: "",
        email: "invalid-email",
        error_reason: "Invalid email format",
      };

      const res = await request(app)
        .post("/api/invalidData")
        .send(invalidRecord);

      expect(res.statusCode).toBe(201); 
      expect(res.body.full_name).toBe(invalidRecord.full_name); 
      expect(res.body.email).toBe(invalidRecord.email); 
      expect(res.body.error_reason).toBe(invalidRecord.error_reason); 
    });
  });

  describe("GET /api/validData", () => {
    test("Should fetch all valid records from the database", async () => {
      const res = await request(app).get("/api/validData");

      expect(res.statusCode).toBe(200); 
      expect(Array.isArray(res.body)).toBe(true); 
      res.body.forEach((record) => {
        expect(record).toHaveProperty("full_name");
        expect(record).toHaveProperty("email");
      });
    });
  });

  describe("GET /api/invalidData", () => {
    test("Should fetch all invalid records from the database", async () => {
      const res = await request(app).get("/api/invalidData");

      expect(res.statusCode).toBe(200); 
      expect(Array.isArray(res.body)).toBe(true); 
      res.body.forEach((record) => {
        expect(record).toHaveProperty("full_name");
        expect(record).toHaveProperty("email");
        expect(record).toHaveProperty("error_reason");
      });
    });
  });

  describe("PATCH /api/validData/:id", () => {
    test("Should update a valid record in the database", async () => {
      const updates = { full_name: "Updated Alice", email: "updatedemail@email.com", };

      const res = await request(app)
        .patch("/api/validData/1")
        .send(updates);

      expect(res.statusCode).toBe(200); 
      expect(res.body.full_name).toBe(updates.full_name); 
    });
  });

  describe("PATCH /api/invalidData/:id", () => {
    test("Should update an invalid record in the database", async () => {
      const updates = { error_reason: "Updated reason for error" };

      const res = await request(app)
        .patch("/api/invalidData/1")
        .send(updates);

      expect(res.statusCode).toBe(200); 
      expect(res.body.error_reason).toBe(updates.error_reason); 
    });
  });

  describe("DELETE /api/validData/:id", () => {
    test("Should delete a valid record from the database", async () => {
      const res = await request(app).delete("/api/validData/1");

      expect(res.statusCode).toBe(204);
    });
  });

  describe("DELETE /api/invalidData/:id", () => {
    test("Should delete an invalid record from the database", async () => {
      const res = await request(app).delete("/api/invalidData/1");

      expect(res.statusCode).toBe(204); 
    });
  });
});
