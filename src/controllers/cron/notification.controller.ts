import { Request, Response } from 'express';

import {
  dynamicResponse,
  successResponse,
} from '../../libs/expressResponses.lib';

import * as notificationService from '../../services/notification.service';

export const checkForSending = async (req: Request, res: Response) => {
  const result = await notificationService.checkRequiredToSendNotifications();

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};
