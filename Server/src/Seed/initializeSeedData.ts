import { NextFunction, Request, Response } from "express";
import { config } from "../config/config"
import Admin from "../models/Admin";
import adminData from "./Data/AdminData";

const initializeSeedData = async () => {
    try {
        if(config.addSeedData){
            console.log("Adding Admin Data..")
            let adminExist;
            if(config.adminEmail){
                const admin = await Admin.findOne({ email: config.adminEmail })
                if(admin){
                    console.warn("Admin Data Already Exists..")
                    adminExist = true
                }
            }
            if(!adminExist) await Admin.create(adminData)
            console.log("Seed Data Added Successfully")
        } else {
            console.log("Skipping Seed Data")
        }
    } catch (error) {
        console.error(error)
    }
}

export default initializeSeedData