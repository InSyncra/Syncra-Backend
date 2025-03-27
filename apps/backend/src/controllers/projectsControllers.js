import { prisma } from "@repo/db";
import { z } from "zod";

const projectSchema = z.object({
	title: z.string(),
	description: z.string(),
	githubUrl: z.string(),
	isPublic: z.boolean().optional(),
	thumbnailUrl: z.string().optional(),
});

// create a new project
export const createProject = async (req, res, next) => {
	const { error } = projectSchema.safeParse(req.body);
	if (error) {
		next(error);
		return;
	}
	try {
		const project = await prisma.project.create({
			data: req.body,
		});
		res.status(201).json(project);
	} catch (error) {
		next(error);
	}
};

// get all projects
export const getAllProjects = async (req, res, next) => {
	try {
		const projects = await prisma.project.findMany();
		res.json(projects);
	} catch (error) {
		next(error);
	}
};

// get project by id
export const getProjectById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const projectId = id;

		const project = await prisma.project.findUnique({
			where: { id: projectId },
		});
		if (!project) {
			return res.status(404).json({ error: "Project not found" });
		}
		res.json(project);
	} catch (error) {
		next(error);
	}
};

// update project
export const updateProjectById = async (req, res, next) => {
	const { id } = req.params;
	const projectId = id;
	const { error } = projectSchema.safeParse(req.body);
	if (error) {
		next(error);
		return;
	}
	try {
		const existingProject = await prisma.project.findUnique({
			where: { id: projectId },
		});
		if (!existingProject) {
			return res.status(404).json({ error: "Project not found" });
		}
		const updatedProject = await prisma.project.update({
			where: { id: projectId },
			data: req.body,
		});
		res.json(updatedProject);
	} catch (error) {
		next(error);
	}
};

// delete project
export const deleteProjectById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const projectId = id;

		const existingProject = await prisma.project.findUnique({
			where: { id: projectId },
		});
		if (!existingProject) {
			return res.status(404).json({ error: "Project not found" });
		}
		await prisma.project.delete({
			where: { id: projectId },
		});
		res.status(200).json({ message: "Project deleted successfully" });
	} catch (error) {
		next(error);
	}
};
