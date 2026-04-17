import express from "express";
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", schoolRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});