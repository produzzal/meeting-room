import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
      },
    ],

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    isConfirmed: {
      type: String,
      default: 'unconfirmed',
      enum: ['confirmed', 'unconfirmed'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;

        const orderedRet = {
          _id: ret._id,
          date: ret.date,
          slots: ret.slots,
          room: ret.room,
          user: ret.user,
          totalAmount: ret.totalAmount,
          isConfirmed: ret.isConfirmed,
          isDeleted: ret.isDeleted,
        };
        return orderedRet;
      },
    },
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
