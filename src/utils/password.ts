import * as bcrypt from "bcryptjs";
export async function hash(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function compare(password: string, hashedPassword: string): Promise<boolean> {
  const isEqual = await bcrypt.compare(password, hashedPassword);
  return isEqual;
}
