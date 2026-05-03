import { jwtVerify } from 'jose/jwt/verify';

export async function verifyToken(token: string): Promise<{ id: number; email: string; name: string } | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: number; email: string; name: string };
  } catch {
    return null;
  }
}
