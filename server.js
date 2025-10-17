import express from "express";

const app = express();
const PORT = 8000 || process.env.PORT;

// Middleware to parse JSON requests
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hi from Olagunju Alameen");
});

app.get("/me", async (req, res) => {
  try {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
      throw new Error("Failed to fetch cat fact");
    }
    const data = await response.json();
    if (!data || !data.fact) {
      throw new Error("Invalid data from Cat Facts API");
    }
    res.json({
      status: "success",
      user: {
        email: "harliarmeen@gmail.com",
        name: "Olagunju Alameen",
        stack: "Node.js, Express.js",
      },
      timestamp: new Date().toISOString(),
      fact: data?.fact,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
