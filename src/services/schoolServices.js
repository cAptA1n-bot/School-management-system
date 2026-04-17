import pool from "../config/database.js";

export const addSchoolService = async (data) => {
    const { name, address, latitude, longitude } = data;

    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const [result] = await pool.execute(query, [name, address, latitude, longitude]);

    return result;
};

const toRadians = (value) => (value * Math.PI) / 180;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export const listSchoolsService = async (userLat, userLon) => {
    const [rows] = await pool.execute("SELECT * FROM schools");

    const schoolsWithDistance = rows.map((school) => {
        const distance = calculateDistance(
            userLat,
            userLon,
            school.latitude,
            school.longitude
        );

        return { ...school, distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    return schoolsWithDistance;
};