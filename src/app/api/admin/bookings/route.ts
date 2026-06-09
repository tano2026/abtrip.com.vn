import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// Helper check auth
async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function GET() {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ message: "Chưa đăng nhập quản trị" }, { status: 401 });
    }

    let bookings = [];
    
    // Check if database URL is set and we can query
    if (process.env.DATABASE_URL) {
      try {
        bookings = await prisma.booking.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
      } catch (dbError) {
        console.error("Lỗi khi truy vấn bookings từ Database:", dbError);
        // Fallback to empty or simple message
        return NextResponse.json(
          { message: "Lỗi kết nối cơ sở dữ liệu. Hãy chạy prisma migrations.", error: String(dbError) },
          { status: 500 }
        );
      }
    } else {
      // Return a helpful mock list so dashboard can be previewed locally
      bookings = [
        {
          id: "mock-1",
          service: "Dịch Vụ VIP Fastrack Sân Bay - Gói Ga Đến",
          name: "Nguyễn Hoàng Nam",
          phone: "0987654321",
          note: "Tôi muốn đặt dịch vụ đón ống lồng bay chuyến VN220 hạ cánh 14:30 chiều nay.",
          status: "PENDING",
          createdAt: new Date().toISOString(),
          adminNotes: "Chưa liên hệ",
        },
        {
          id: "mock-2",
          service: "Dịch Vụ Làm Visa Trọn Gói - Châu Âu",
          name: "Trần Thị Bé",
          phone: "0912345678",
          note: "Tư vấn hồ sơ làm Visa đi Pháp du lịch tự túc cho 2 người.",
          status: "PROCESSING",
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          adminNotes: "Đã gọi điện tư vấn, đang chuẩn bị hồ sơ dịch thuật",
        }
      ];
    }

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Lỗi API Bookings GET:", error);
    return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ message: "Chưa đăng nhập quản trị" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ message: "Thiếu ID booking" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ message: "DATABASE_URL chưa cấu hình, không thể cập nhật." }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status: status,
        adminNotes: adminNotes,
      },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("Lỗi API Bookings PUT:", error);
    return NextResponse.json({ message: "Lỗi hệ thống khi cập nhật" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ message: "Chưa đăng nhập quản trị" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Thiếu ID booking" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ message: "DATABASE_URL chưa cấu hình, không thể xóa." }, { status: 400 });
    }

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Đã xóa yêu cầu thành công" });
  } catch (error) {
    console.error("Lỗi API Bookings DELETE:", error);
    return NextResponse.json({ message: "Lỗi hệ thống khi xóa" }, { status: 500 });
  }
}
