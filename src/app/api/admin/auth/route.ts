import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (session?.value === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;
    
    // Default fallback password if none set in .env
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      return NextResponse.json({ success: true, message: "Đăng nhập thành công" });
    }

    return NextResponse.json(
      { success: false, message: "Mật khẩu quản trị không chính xác" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Lỗi Auth API:", error);
    return NextResponse.json(
      { success: false, message: "Đã có lỗi hệ thống xảy ra" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true, message: "Đăng xuất thành công" });
}
