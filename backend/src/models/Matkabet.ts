import mongoose, { Document, Schema } from "mongoose";
import { ObjectId } from "mongoose";

// Define the TypeScript interface for an Operation
export interface IMatkabet extends Document {

  gamename: string;
  id: string;
  opentime: string;
  closetime: string;
  Date:Date;
  result:string;
  roundid:string;
  isActive:boolean;
  odds:number;
  betamount:number;
  bettype:string;
  userId:ObjectId;
  profitLoss:number;
  status:string;
  bet_on:string;
  parentStr?: Array<string>;
  parentId:ObjectId;
  selectionId:number;
  username:string;
  pl:number;

 



}

// Define the Mongoose schema
const MatkabetSchema: Schema = new Schema(
  {
    gamename:{
        type:String,
       
    },
     username:{
        type:String,
       
    },
    id:{
        type:String,
       
    },
    opentime:{
        type:String,
       
    },
    closetime:{
        type:String,
       
    },
    Date:{
        type:Date,
       
    },
    result:{
        type:String,
        default:"pending"
       
    },
    roundid:{
        type:String,
       
    },
    selectionId:{
        type:Number,
       
    },
    odds:{
        type:Number,
       
    },
    betamount:{
        type:Number,
       
    },
    bettype:{
        type:String,      
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    parentstr:{
        type:[String],
    },
    parentId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    bet_on:{
        type:String,
    },
    status:{
        type:String,
        default:"pending"
    },
    pl:{
        type:String,
        default:0
    }
  },
   {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
   }
);

// Export the model
export default mongoose.model<IMatkabet>("Matkabet", MatkabetSchema);
