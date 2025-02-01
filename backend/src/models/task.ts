import { model, Schema, ValidatorProps } from 'mongoose';

const allowedStatuses = ['Pending', 'In process', 'Completed'];

const TaskSchema = new Schema(
  {
    user: {
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    limitDate: { type: Date, default: null },
    priority: { type: Boolean, default: false },
    status: {
      type: String,
      validate: {
        validator: function (value: string) {
          return allowedStatuses.includes(value);
        },
        message: (props: ValidatorProps) =>
          `'${
            props.value
          }' is not a valid status. Allowed values are: ${allowedStatuses.join(
            ', '
          )}.`,
      },
      default: 'Pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('task', TaskSchema);
