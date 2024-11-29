module.exports = [
  {
    full_name: "",
    email: "missing.name@example.com",
    error_reason: "Name is required",
  },
  {
    full_name: "John Doe",
    email: "invalid-email",
    error_reason: "Invalid email format",
  },
  { full_name: null, email: "null@example.com", error_reason: "Name is null" },
];
