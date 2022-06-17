import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		customer: {
			type: String,
			required: true,
			maxlength: 60,
		},
		address: {
			type: String,
			required: true,
			maxlength: 200,
		},
		total: {
			type: Number,
			required: true,
			maxlength: 200,
		},
		status: {
			type: Number,
			default: 0,
		},
		method: {
			// if use pau wuth cash payment method is '0' , if user pay with credit card  payment method is  '1'
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
