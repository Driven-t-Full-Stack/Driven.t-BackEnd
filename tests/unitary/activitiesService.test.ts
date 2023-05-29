import { getActivitiesReturn } from '../factories';
import activityService from '@/services/activities-service';

describe('getTicketTypes function', () => {
  it('should get the activities list', async () => {
    const activityList = getActivitiesReturn();

    jest.spyOn(activityService, 'getActivityList').mockResolvedValue(activityList);

    const result = await activityService.getActivityList();

    expect(result).toEqual(activityList);
  });
});
