import { Router } from "express";
import {
  createMoviesController,
  deleteMovieByIdController,
  listAllMoviesController,
  updateMoviesController,
} from "../controllers/movies.controllers";
import {
  idExistsMiddleware,
  nameExistsMiddleware,
} from "../middlewares/verify.middlewares";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { moviesCreateSchema } from "../schemas/movies.schema";
import { updateSchema } from "../schemas/movies.schema";

const moviesRouter: Router = Router();

moviesRouter.post(
  "",
  validateBodyMiddleware(moviesCreateSchema),
  nameExistsMiddleware,
  createMoviesController
);

moviesRouter.get("", listAllMoviesController);

moviesRouter.patch(
  "/:id",
  idExistsMiddleware,
  validateBodyMiddleware(updateSchema),
  nameExistsMiddleware,
  updateMoviesController
);

moviesRouter.delete("/:id", idExistsMiddleware, deleteMovieByIdController);

export { moviesRouter };
