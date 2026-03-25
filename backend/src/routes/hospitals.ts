// TODO: Review - NEW ENDPOINT ADDED
// Purpose: List verified hospitals for recipient dropdown
// import { Router, Request, Response } from 'express';
// import { HospitalRepo } from '@database/repository/HospitalRepo';
// import { ApiError } from '@core/ApiError';
// import { ApiResponse } from '@core/ApiResponse';
// import { asyncHandler } from '@helpers/asyncHandler';

// const router = Router();

// router.get(
//   '/',
//   asyncHandler(async (req: Request, res: Response) => {
//     try {
//       const hospitals = await HospitalRepo.findAllVerified();
//       ApiResponse.ok(res, 'Hospitals retrieved', { hospitals });
//     } catch (error) {
//       if (error instanceof ApiError) {
//         res.status(error.getHttpStatus()).json(error.toResponse());
//       } else {
//         throw error;
//       }
//     }
//   })
// );

// export default router;
