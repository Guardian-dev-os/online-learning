/**
 * Auth Utilities - Supabase-backed authentication
 * All authentication should go through Supabase auth
 * Admin access is determined by is_admin flag in profiles table
 */

const SECRET_CODE_1 = process.env.NEXT_PUBLIC_ADMIN_CODE_1 || "Activate";
const SECRET_CODE_2 = process.env.NEXT_PUBLIC_ADMIN_CODE_2 || "Bankai";

/**
 * Verify secret admin codes for additional security layer
 */
export async function verifySecretAdminCodes(code1: string, code2: string) {
  const isCode1Valid = code1 === SECRET_CODE_1;
  const isCode2Valid = code2 === SECRET_CODE_2;
  return isCode1Valid && isCode2Valid;
}

/**
 * Check if user has admin access via Supabase
 * This should be called server-side with proper auth context
 */
export function isUserAdmin(userMetadata: Record<string, any> | undefined): boolean {
  return userMetadata?.is_admin === true;
}
