import { addSchoolService, listSchoolsService } from "../services/schoolServices.js";

export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const result = await addSchoolService({ name, address, latitude, longitude });

        res.status(201).json({ message: "School added", id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Coordinates required" });
        }

        const schools = await listSchoolsService(parseFloat(latitude), parseFloat(longitude));

        res.json(schools);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};