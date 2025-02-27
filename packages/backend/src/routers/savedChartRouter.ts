import express from 'express';
import {
    isAuthenticated,
    unauthorisedInDemo,
} from '../controllers/authentication';
import { projectService, savedChartsService } from '../services/services';

export const savedChartRouter = express.Router();

savedChartRouter.get(
    '/:savedQueryUuid',
    isAuthenticated,
    async (req, res, next) => {
        savedChartsService
            .get(req.params.savedQueryUuid)
            .then((results) => {
                res.json({
                    status: 'ok',
                    results,
                });
            })
            .catch(next);
    },
);

savedChartRouter.get(
    '/:savedQueryUuid/availableFilters',
    isAuthenticated,
    async (req, res, next) =>
        projectService
            .getAvailableFiltersForSavedQuery(
                req.user!,
                req.params.savedQueryUuid,
            )
            .then((results) => {
                res.json({
                    status: 'ok',
                    results,
                });
            })
            .catch(next),
);

savedChartRouter.delete(
    '/:savedQueryUuid',
    isAuthenticated,
    unauthorisedInDemo,
    async (req, res, next) => {
        savedChartsService
            .delete(req.user!, req.params.savedQueryUuid)
            .then(() => {
                res.json({
                    status: 'ok',
                    results: undefined,
                });
            })
            .catch(next);
    },
);

savedChartRouter.patch(
    '/:savedQueryUuid',
    isAuthenticated,
    unauthorisedInDemo,
    async (req, res, next) => {
        savedChartsService
            .update(req.user!, req.params.savedQueryUuid, req.body)
            .then((results) => {
                res.json({
                    status: 'ok',
                    results,
                });
            })
            .catch(next);
    },
);

savedChartRouter.post(
    '/:savedQueryUuid/version',
    isAuthenticated,
    unauthorisedInDemo,
    async (req, res, next) => {
        savedChartsService
            .createVersion(req.user!, req.params.savedQueryUuid, req.body)
            .then((results) => {
                res.json({
                    status: 'ok',
                    results,
                });
            })
            .catch(next);
    },
);
