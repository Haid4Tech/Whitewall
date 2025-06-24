import { createProperty } from "../firebase/properties";
import { properties } from "../common/data";

/**
 * Script to seed the Firebase Firestore database with properties data
 * Run this script once to populate your database with the existing properties
 */
/* export const seedProperties = async () => {
  console.log("Starting to seed properties...");
  
  try {
    for (const property of properties) {
      const { id, ...propertyData } = property;
      const newId = await createProperty(propertyData);
      
      if (newId) {
        console.log(`✅ Property "${property.title}" created with ID: ${newId}`);
      } else {
        console.error(`❌ Failed to create property "${property.title}"`);
      }
    }
    
    console.log("🎉 Properties seeding completed!");
  } catch (error) {
    console.error("Error seeding properties:", error);
  }
}; */

// Uncomment the line below to run the seeding script
// seedProperties();
