import mysql2 from "mysql2";

export const db = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin123",
  database: "blog",
});


export function connectToDb() {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database!");
  });
}