import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, note, service } = body;

    // Validate inputs basic
    const customerName = name || "Khách ẩn danh";
    const customerPhone = phone || "Chưa cung cấp";
    const serviceName = service || "Dịch vụ chung";
    const detailNote = note || "";

    console.log("=== NEW CONTACT INQUIRY ===");
    console.log(`Service: ${serviceName}`);
    console.log(`Name: ${customerName}`);
    console.log(`Phone: ${customerPhone}`);
    console.log(`Note: ${detailNote}`);
    console.log("===========================");

    let bookingId = "local-session";
    let dbSaved = false;

    // Try to save to database via Prisma
    try {
      if (process.env.DATABASE_URL) {
        const newBooking = await prisma.booking.create({
          data: {
            name: customerName,
            phone: customerPhone,
            service: serviceName,
            note: detailNote,
            status: "PENDING",
          },
        });
        bookingId = newBooking.id;
        dbSaved = true;
        console.log(`Saved to Database successfully. ID: ${bookingId}`);
      } else {
        console.warn("DATABASE_URL is not set. Skipped saving to database.");
      }
    } catch (dbError) {
      console.error("Lỗi khi ghi nhận dữ liệu vào Database:", dbError);
    }

    // Try to send Telegram notification if configured
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        const timeString = new Date().toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        });

        const telegramMessage = `🔔 <b>YÊU CẦU ĐẶT DỊCH VỤ MỚI</b>
──────────────────
👤 <b>Khách hàng:</b> ${customerName}
📞 <b>Số điện thoại:</b> <code>${customerPhone}</code>
✈️ <b>Dịch vụ:</b> ${serviceName}
📝 <b>Chi tiết yêu cầu:</b>
${detailNote}
──────────────────
📊 <b>Database:</b> ${dbSaved ? `Đã lưu (ID: ${bookingId.substring(0, 8)}...)` : "Chưa lưu (Cấu hình offline)"}
📅 <b>Thời gian:</b> ${timeString}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        });
        console.log("Sent Telegram alert notification successfully.");
      } catch (tgError) {
        console.error("Lỗi khi gửi thông báo Telegram Bot:", tgError);
      }
    }

    return NextResponse.json(
      { 
        message: "Yêu cầu tư vấn đã được gửi thành công!",
        bookingId,
        saved: dbSaved
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi API Contact:", error);
    return NextResponse.json(
      { message: "Đã có lỗi xảy ra khi gửi thông tin." },
      { status: 500 }
    );
  }
}
