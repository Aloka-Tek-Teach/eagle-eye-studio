/**
 * Utility functions for parsed dates and automatic reservation expiration.
 */

/**
 * Checks if a time slot on a specific date has already ended.
 * @param dateStr Date in YYYY-MM-DD format
 * @param slotStr Time slot e.g., "08:00 AM - 10:00 AM" or "08:30 PM - 10:30 PM"
 * @returns true if the slot is in the past, false otherwise
 */
export function isSlotExpired(dateStr: string, slotStr: string): boolean {
  try {
    if (!dateStr || !slotStr) return false;
    
    // Split slot to get the key end time piece
    const parts = slotStr.split(' - ');
    if (parts.length < 2) return false;
    const endTimeStr = parts[1].trim(); // e.g. "10:00 AM" or "10:30 PM"
    
    // Parse hours, minutes and AM/PM
    const timeMatch = endTimeStr.match(/^(\d+):(\d+)\s+(AM|PM)$/i);
    if (!timeMatch) return false;
    
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3].toUpperCase();
    
    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
    
    // Parse key calendar digits (YYYY-MM-DD format matches)
    const dateParts = dateStr.split('-');
    if (dateParts.length !== 3) return false;
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-indexed
    const day = parseInt(dateParts[2], 10);
    
    // Build slot end timestamp
    const slotEndTime = new Date(year, month, day, hours, minutes, 0);
    
    return slotEndTime.getTime() < Date.now();
  } catch (error) {
    console.error("Error evaluating slot expiration details:", error);
    return false;
  }
}
