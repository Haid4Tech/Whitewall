import { getProperties, updateProperty } from "../firebase/properties";
import { generateSlug, generateUniqueSlug } from "../lib/utils";

/**
 * Migration script to add slugs to existing properties
 * Run this once to update all existing properties with slugs
 */
export async function migratePropertiesToSlugs() {
  try {
    console.log("Starting migration to add slugs to existing properties...");

    // Get all existing properties
    const properties = await getProperties();
    console.log(`Found ${properties.length} properties to migrate`);

    const existingSlugs: string[] = [];
    let updatedCount = 0;
    let errorCount = 0;

    for (const property of properties) {
      try {
        // Skip if already has a slug
        if (property.slug) {
          existingSlugs.push(property.slug);
          continue;
        }

        // Generate unique slug
        const baseSlug = generateSlug(property.title);
        const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs);

        // Update property with slug
        const success = await updateProperty(property.id, {
          slug: uniqueSlug,
        });

        if (success) {
          existingSlugs.push(uniqueSlug);
          updatedCount++;
          console.log(
            `✓ Updated property "${property.title}" with slug: ${uniqueSlug}`
          );
        } else {
          errorCount++;
          console.error(`✗ Failed to update property "${property.title}"`);
        }
      } catch (error) {
        errorCount++;
        console.error(`✗ Error updating property "${property.title}":`, error);
      }
    }

    console.log(`\nMigration completed!`);
    console.log(`✓ Successfully updated: ${updatedCount} properties`);
    console.log(`✗ Errors: ${errorCount} properties`);
    console.log(
      `- Skipped (already had slugs): ${
        properties.length - updatedCount - errorCount
      } properties`
    );
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Uncomment the line below to run the migration
// migratePropertiesToSlugs();
