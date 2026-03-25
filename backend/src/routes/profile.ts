// TODO: Review - NEW ENDPOINT ADDED
// Purpose: Update recipient/hospital profile
// import { Router, Request, Response } from 'express';
// import Joi from 'joi';
// import { UserRepo } from '@database/repository/UserRepo';
// import { RecipientRepo } from '@database/repository/RecipientRepo';
// import { HospitalRepo } from '@database/repository/HospitalRepo';
// import { ApiError } from '@core/ApiError';
// import { ApiResponse } from '@core/ApiResponse';
// import { asyncHandler } from '@helpers/asyncHandler';
// import { validateRequest } from '@helpers/validateRequest';
// import { authenticate } from '@middlewares/authenticate';
// import { UserRole } from '@database/model/User';

// const router = Router();

// const updateUserSchema = Joi.object({
//   body: Joi.object({
//     firstName: Joi.string().trim(),
//     lastName: Joi.string().trim(),
//     phone: Joi.string()
//   })
// });

// router.patch(
//   '/',
//   authenticate,
//   validateRequest(updateUserSchema),
//   asyncHandler(async (req: Request, res: Response) => {
//     try {
//       if (!req.user) {
//         throw ApiError.unauthorized();
//       }

//       const { firstName, lastName, phone } = req.body;

//       await UserRepo.updateProfile(req.user.userId, { firstName, lastName, phone });

//       const role = req.roles?.[0];

//       if (role === UserRole.RECIPIENT) {
//         await RecipientRepo.updateProfile(req.user.userId, req.body);
//       } else if (role === UserRole.HOSPITAL) {
//         await HospitalRepo.updateProfile(req.user.userId, req.body);
//       }

//       const updatedUser = await UserRepo.findById(req.user.userId);
//       const profileData = role === UserRole.RECIPIENT 
//         ? await RecipientRepo.findByUserId(req.user.userId)
//         : role === UserRole.HOSPITAL
//           ? await HospitalRepo.findByUserId(req.user.userId)
//           : null;

//       ApiResponse.ok(res, 'Profile updated successfully', {
//         user: updatedUser,
//         profile: profileData
//       });
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
