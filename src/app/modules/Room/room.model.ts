import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;

        const orderedRet = {
          _id: doc._id,
          name: doc.name,
          roomNo: doc.roomNo,
          floorNo: doc.floorNo,
          capacity: doc.capacity,
          pricePerSlot: doc.pricePerSlot,
          amenities: doc.amenities,
          isDeleted: doc.isDeleted,
        };
        return orderedRet;
      },
    },
  },
);

export const Room = model<TRoom>('Room', roomSchema);
