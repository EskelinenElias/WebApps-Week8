import { Document, Schema, model } from "mongoose";

// Topic model for forum topics

interface ITopic extends Document {
  title: string; 
  content: string; 
  username: string;
  createdAt: Date;
}

const TopicSchema = new Schema<ITopic>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, require: true}, 
  createdAt: { type: Date, require: true}
});

const Topic = model<ITopic>("topic", TopicSchema);

export { Topic, ITopic };

// eof
