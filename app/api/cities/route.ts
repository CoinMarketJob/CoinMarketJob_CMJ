import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    // GET: Retrieve all cities or a single city by ID
    case "GET":
      try {
        if (req.query.id) {
          // Fetch city by ID
          const city = await prisma.cities.findUnique({
            where: { id: parseInt(req.query.id as string) },
          });
          if (!city) {
            return res.status(404).json({ error: "City not found" });
          }
          return res.status(200).json(city);
        } else {
          // Fetch all cities
          const cities = await prisma.cities.findMany();
          return res.status(200).json(cities);
        }
      } catch (error) {
        return res.status(500).json({ error: "Failed to fetch cities" });
      }

    // POST: Create a new city
    case "POST":
      try {
        const { name, country, admin1, lat, lon, pop } = req.body;
        if (!name) {
          return res.status(400).json({ error: "City name is required" });
        }

        const newCity = await prisma.cities.create({
          data: {
            name,
            country,
            admin1,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            pop: parseInt(pop, 10),
          },
        });
        return res.status(201).json(newCity);
      } catch (error) {
        return res.status(500).json({ error: "Failed to create city" });
      }

    // PUT: Update an existing city
    case "PUT":
      try {
        const { id, name, country, admin1, lat, lon, pop } = req.body;
        if (!id) {
          return res.status(400).json({ error: "City ID is required" });
        }

        const updatedCity = await prisma.cities.update({
          where: { id: parseInt(id, 10) },
          data: {
            name,
            country,
            admin1,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            pop: parseInt(pop, 10),
          },
        });
        return res.status(200).json(updatedCity);
      } catch (error) {
        return res.status(500).json({ error: "Failed to update city" });
      }

    // DELETE: Delete a city by ID
    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "City ID is required" });
        }

        await prisma.cities.delete({
          where: { id: parseInt(id as string, 10) },
        });
        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({ error: "Failed to delete city" });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
