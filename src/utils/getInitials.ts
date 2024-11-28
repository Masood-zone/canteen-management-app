/**
 * Generates initials from a name or email.
 *
 * @param name - The full name of the user.
 * @param email - The email address of the user.
 * @returns A string containing the initials.
 */
export function getInitials(name?: string, email?: string): string {
  if (name) {
    // Extract initials from the name (e.g., "John Doe" -> "JD")
    const initials = name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials.substring(0, 2); // Return max 2 characters
  }

  if (email) {
    // Fallback to the email's first two letters before "@"
    const [localPart] = email.split("@");
    return localPart.substring(0, 2).toUpperCase();
  }

  return "NA"; // Default fallback if both name and email are unavailable
}
