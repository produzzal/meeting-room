import httpStatus from 'http-status';
import { TGetAvailableSlots, TSlot } from './slot.interface';
import { Slot } from './slot.model';
import AppError from '../../errors/AppError';

const createSlotsIntoDB = async (param: TSlot): Promise<TSlot[]> => {
  const { room, date, startTime, endTime } = param;

  const startMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const endMinutes =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

  const slotDuration = 60;
  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / slotDuration;

  const slots: TSlot[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * slotDuration;
    const slotEndMinutes = slotStartMinutes + slotDuration;

    const slotStartTime = `${Math.floor(slotStartMinutes / 60)
      .toString()
      .padStart(
        2,
        '0',
      )}:${(slotStartMinutes % 60).toString().padStart(2, '0')}`;
    const slotEndTime = `${Math.floor(slotEndMinutes / 60)
      .toString()
      .padStart(2, '0')}:${(slotEndMinutes % 60).toString().padStart(2, '0')}`;

    const slot = {
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    };

    slots.push(slot);
  }

  const existingSlots = await Slot.find({
    date,
    startTime: { $in: slots.map((slot) => slot.startTime) },
    endTime: { $in: slots.map((slot) => slot.endTime) },
    room,
  });

  if (existingSlots.length > 0) {
    // If slots already exist, handle the error or return without inserting
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Slots already exist for the given time',
    );
  }

  try {
    const result = await Slot.insertMany(slots, { ordered: true });
    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create slot');
  }
};

const getAvailableSlotsFromDB = async (
  queries: TGetAvailableSlots,
): Promise<TSlot[]> => {
  const { date, roomId } = queries;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = { isBooked: false };
  if (date) {
    query.date = date;
  }
  if (roomId) {
    query.room = roomId;
  }

  const slots = await Slot.find(query).populate('room');
  if (slots.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return slots;
};

export const SlotsServices = {
  createSlotsIntoDB,
  getAvailableSlotsFromDB,
};
