import { TRoom } from './room.interface';
import { Room } from './room.model';

//create room
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

//get all rooms
const getAllRoomsFromDB = async () => {
  const result = await Room.find();
  return result;
};

//get single room
const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

//update room
const updateRoomIntoDB = async (payload: TRoom, id: string) => {
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

//delete room
const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
