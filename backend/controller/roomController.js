import Hotel from "../models/Hotel.js";
import {v2 as cloudinary} from "cloudinary";
import Room from "../models/Room.js";
// API to create new room
export const createRoom = async (req,res)=>{
    try {
        const {roomType,pricePerNight,amenities} = req.body;
        const hotel = await Hotel.findOne({owner:req.auth.userId});

        if(!hotel){
            return res.json({success: false,message:"No Hotel Found"});
        }
        //for storing image we use cloudinary
        // upload img to cloudinary
        const uploadImages = req.files.map(async (file)=>{
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })
        // wait for all uploads to complete
        const images = await Promise.all(uploadImages);
        // store in database
        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        })
        res.json({success:true,message:"Room created successfully"});
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
// API to get all room
export const getRoom = async (req,res)=>{
    
}
// API to get room for a specific hotel
export const getOwnerRoom = async (req,res)=>{

}
// API to toggle availability of room
export const toggleRoomAvailability = async (req,res)=>{

}