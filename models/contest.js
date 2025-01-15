import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  coverPhotoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  contestants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contestant",  
  }],
  isPublished: {
    type: Boolean,
    default: false,  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

contestSchema.methods.isActive = function() {
  const now = new Date();
  return this.isPublished && now >= this.startDate && now <= this.endDate;
};

const Contest = mongoose.model("Contest", contestSchema);
export default Contest;