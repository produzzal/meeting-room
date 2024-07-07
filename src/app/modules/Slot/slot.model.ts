import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;

        const orderedRet = {
          _id: doc._id,
          room: doc.room,
          date: doc.date,
          startTime: doc.startTime,
          endTime: doc.endTime,
          isBooked: doc.isBooked,
        };
        return orderedRet;
      },
    },
  },
);

export const Slot = model<TSlot>('Slot', slotSchema);
