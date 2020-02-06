db.createUser({
  user: "shsangha",
  pwd: "test",
  roles: [
    {
      role: "readWrite",
      db: "saledadmin"
    }
  ]
});

db.admins.drop();

db.admins.insertMany([
  {
    _id: "8c2c1250-9f51-400e-b7a3-5e609d13a27e",
    employeeId: "Stuart",
    email: "stuart@gmail.com",
    password: "$2b$10$fp6ShByV7eix5Jefjei5be56b9hVsKJql5PWIzcucD2nhueFqjxtC;"
  },
  {
    _id: "96d2545d-2469-44f7-b219-6982e9080f6e",
    employeeId: "Meg",
    email: "meg@gmail.com",
    password: "$2b$10$fp6ShByV7eix5Jefjei5be56b9hVsKJql5PWIzcucD2nhueFqjxtC;"
  }
]);
