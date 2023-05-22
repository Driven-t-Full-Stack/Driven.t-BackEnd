import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, listBooking, getBookingByRoomId } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', listBooking)
  .get('/getBooking/:roomId', getBookingByRoomId)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
