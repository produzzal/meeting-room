import { TGetAvailableSlots, TSlot } from './slot.interface';
import { Slot } from './slot.model';

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

    const slot = new Slot({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });

    slots.push(slot);
  }

  const result = await Slot.insertMany(slots);
  return result;
};

export const getAvailableSlotsFromDB = async (
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
  return slots;
};

export const SlotsServices = {
  createSlotsIntoDB,
  getAvailableSlotsFromDB,
};
