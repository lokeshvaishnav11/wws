"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the Mongoose schema
const MatkabetSchema = new mongoose_1.Schema({
    gamename: {
        type: String,
    },
    id: {
        type: String,
    },
    opentime: {
        type: String,
    },
    closetime: {
        type: String,
    },
    Date: {
        type: Date,
    },
    result: {
        type: String,
        default: "pending"
    },
    roundid: {
        type: String,
    },
    odds: {
        type: Number,
    },
    betamount: {
        type: Number,
    },
    bettype: {
        type: String,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    parentstr: {
        type: [String],
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    bet_on: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});
// Export the model
exports.default = mongoose_1.default.model("Matkabet", MatkabetSchema);
//# sourceMappingURL=Matkabet.js.map