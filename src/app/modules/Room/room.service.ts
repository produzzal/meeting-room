import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find();
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};
const updateRoomIntoDB = async (payload: TRoom, id: string) => {
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
};
