import httpStatus from 'http-status';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import AppError from '../../errors/AppError';

//create room
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

//get all rooms
const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

//get single room
const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findOne({ _id: id, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

//update room
const updateRoomIntoDB = async (payload: TRoom, id: string) => {
  const room = await Room.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

//delete room
const deleteRoomFromDB = async (id: string) => {
  const room = await Room.findOne({ _id: id, isDeleted: false });
  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
