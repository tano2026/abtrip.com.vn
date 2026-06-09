"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Lock, 
  LogOut, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Phone, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Edit3, 
  Check, 
  RefreshCw, 
  Database,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface Booking {
  id: string;
  service: string;
  name: string;
  phone: string;
  note: string;
  status: string; // PENDING, PROCESSING, COMPLETED
  createdAt: string;
  adminNotes: string | null;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // holds id of actioning booking
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [serviceFilter, setServiceFilter] = useState<string>("ALL");
  
  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");

  // Auto-clear toast messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Check auth status
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchBookings();
      }
    } catch (error) {
      console.error("Lỗi kiểm tra auth:", error);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch all bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      } else {
        const data = await res.json();
        setMessage({ text: data.message || "Lỗi tải danh sách đặt dịch vụ", type: "error" });
      }
    } catch (error) {
      console.error("Lỗi tải danh sách bookings:", error);
      setMessage({ text: "Lỗi kết nối API", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchBookings();
      } else {
        setAuthError(data.message || "Mật khẩu không hợp lệ");
      }
    } catch (error) {
      setAuthError("Lỗi kết nối máy chủ");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setBookings([]);
      setPassword("");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Start editing a booking
  const startEdit = (booking: Booking) => {
    setEditingId(booking.id);
    setEditNotes(booking.adminNotes || "");
    setEditStatus(booking.status);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditNotes("");
    setEditStatus("");
  };

  // Update Booking Status & Notes
  const handleUpdate = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: editStatus,
          adminNotes: editNotes
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: "Cập nhật trạng thái thành công!", type: "success" });
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: editStatus, adminNotes: editNotes } : b));
        setEditingId(null);
      } else {
        setMessage({ text: data.message || "Lỗi cập nhật", type: "error" });
      }
    } catch (error) {
      console.error("Lỗi cập nhật booking:", error);
      setMessage({ text: "Lỗi kết nối máy chủ", type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  // Quick update status directly from list
  const handleQuickStatusUpdate = async (id: string, newStatus: string) => {
    setActionLoading(id);
    const booking = bookings.find(b => b.id === id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          adminNotes: booking?.adminNotes || ""
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: `Đã chuyển sang trạng thái ${newStatus === "COMPLETED" ? "Đã Xử Lý Xong" : newStatus === "PROCESSING" ? "Đang Xử Lý" : "Chờ Xử Lý"}`, type: "success" });
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      } else {
        setMessage({ text: data.message || "Lỗi cập nhật nhanh", type: "error" });
      }
    } catch (error) {
      console.error("Lỗi cập nhật nhanh:", error);
      setMessage({ text: "Lỗi kết nối máy chủ", type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Booking
  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa yêu cầu đặt dịch vụ này không? Hành động này không thể hoàn tác.")) {
      return;
    }
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: "Đã xóa yêu cầu thành công!", type: "success" });
        setBookings(prev => prev.filter(b => b.id !== id));
      } else {
        setMessage({ text: data.message || "Lỗi khi xóa", type: "error" });
      }
    } catch (error) {
      console.error("Lỗi xóa booking:", error);
      setMessage({ text: "Lỗi kết nối máy chủ", type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  // Filter and Search logic
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm) ||
      (booking.note && booking.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.adminNotes && booking.adminNotes.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || booking.status === statusFilter;
    
    // Group categories from service title
    let matchesService = true;
    if (serviceFilter !== "ALL") {
      const serviceLower = booking.service.toLowerCase();
      if (serviceFilter === "FLIGHT") {
        matchesService = serviceLower.includes("vé") || serviceLower.includes("bay") || serviceLower.includes("hãng");
      } else if (serviceFilter === "HOTEL") {
        matchesService = serviceLower.includes("khách sạn") || serviceLower.includes("hotel") || serviceLower.includes("phòng");
      } else if (serviceFilter === "VISA") {
        matchesService = serviceLower.includes("visa") || serviceLower.includes("hộ chiếu") || serviceLower.includes("passport");
      } else if (serviceFilter === "AIRPORT") {
        matchesService = serviceLower.includes("fastrack") || serviceLower.includes("sân bay") || serviceLower.includes("phòng chờ") || serviceLower.includes("ưu tiên");
      } else if (serviceFilter === "SIM") {
        matchesService = serviceLower.includes("sim");
      } else if (serviceFilter === "OTHER") {
        matchesService = !serviceLower.includes("vé") && !serviceLower.includes("bay") && !serviceLower.includes("hãng") &&
                         !serviceLower.includes("khách sạn") && !serviceLower.includes("hotel") && !serviceLower.includes("phòng") &&
                         !serviceLower.includes("visa") && !serviceLower.includes("hộ chiếu") && !serviceLower.includes("passport") &&
                         !serviceLower.includes("fastrack") && !serviceLower.includes("sân bay") && !serviceLower.includes("phòng chờ") &&
                         !serviceLower.includes("sim");
      }
    }

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "PENDING").length,
    processing: bookings.filter(b => b.status === "PROCESSING").length,
    completed: bookings.filter(b => b.status === "COMPLETED").length,
  };

  // Helper date formatter
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateString;
    }
  };

  // Check initial state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 text-[var(--accent)] animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Đang tải cấu hình bảo mật...</p>
        </div>
      </div>
    );
  }

  // Not authenticated: Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        <div className="w-full max-w-md glass-card p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[var(--accent)] to-cyan-500"></div>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--accent)] mb-4 shadow-sm border border-blue-100">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Hệ Thống Quản Trị</h1>
            <p className="text-slate-500 text-sm mt-1">Đăng nhập để xem danh sách yêu cầu đặt dịch vụ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Mật Khẩu Quản Trị
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu truy cập..."
                  className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] text-sm transition-all"
                  required
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              {authError && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 font-medium rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                "Xác Nhận Đăng Nhập"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Mật khẩu mặc định trong môi trường cục bộ: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-medium text-slate-600">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated: Admin Dashboard view
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Toast Alert */}
      {message && (
        <div className={`fixed bottom-5 right-5 z-50 px-5 py-4 rounded-xl shadow-xl flex items-center gap-3 transition-all transform animate-bounce ${
          message.type === "success" 
            ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {message.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
            Quản Lý Booking Dịch Vụ
          </h1>
          <p className="text-slate-500 mt-1 flex items-center gap-1.5 text-sm font-medium">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Kết nối cơ sở dữ liệu: Supabase DB Online
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer text-sm shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Tải Lại
          </button>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-red-50 border border-red-100 text-red-600 hover:bg-red-100/60 font-medium rounded-xl transition-all flex items-center gap-2 cursor-pointer text-sm"
          >
            <LogOut className="h-4 w-4" />
            Đăng Xuất
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur border border-slate-100 rounded-2xl p-5 shadow-sm">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Tổng Đơn Đặt</div>
          <div className="text-3xl font-extrabold text-slate-800 mt-1">{stats.total}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Từ trước đến nay</div>
        </div>

        <div className="bg-amber-50/70 backdrop-blur border border-amber-100/60 rounded-2xl p-5 shadow-sm">
          <div className="text-amber-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Chờ Xử Lý
          </div>
          <div className="text-3xl font-extrabold text-amber-700 mt-1">{stats.pending}</div>
          <div className="text-xs text-amber-600/70 mt-1 font-medium">Cần liên hệ khách gấp</div>
        </div>

        <div className="bg-blue-50/70 backdrop-blur border border-blue-100/60 rounded-2xl p-5 shadow-sm">
          <div className="text-blue-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Đang Xử Lý
          </div>
          <div className="text-3xl font-extrabold text-blue-700 mt-1">{stats.processing}</div>
          <div className="text-xs text-blue-600/70 mt-1 font-medium">Nhân viên đang chăm sóc</div>
        </div>

        <div className="bg-emerald-50/70 backdrop-blur border border-emerald-100/60 rounded-2xl p-5 shadow-sm">
          <div className="text-emerald-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" /> Hoàn Thành
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">{stats.completed}</div>
          <div className="text-xs text-emerald-600/70 mt-1 font-medium">Đã xuất vé/hoàn tất DV</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Filters and Search Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/40 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search */}
            <div className="relative md:col-span-6">
              <input
                type="text"
                placeholder="Tìm tên khách, số điện thoại, ghi chú..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/15 focus:border-[var(--accent)] text-sm transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>

            {/* Filter Status */}
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase whitespace-nowrap hidden sm:inline">Trạng thái:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2.5 pl-3 pr-8 bg-white border border-slate-200 rounded-xl focus:outline-none text-sm cursor-pointer"
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="PENDING">Chờ xử lý (Mới)</option>
                <option value="PROCESSING">Đang xử lý</option>
                <option value="COMPLETED">Đã hoàn thành</option>
              </select>
            </div>

            {/* Filter Service */}
            <div className="md:col-span-3 flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase whitespace-nowrap hidden sm:inline">Dịch vụ:</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full py-2.5 pl-3 pr-8 bg-white border border-slate-200 rounded-xl focus:outline-none text-sm cursor-pointer"
              >
                <option value="ALL">Tất cả dịch vụ</option>
                <option value="FLIGHT">Vé máy bay & Hãng bay</option>
                <option value="HOTEL">Khách sạn & Nghỉ dưỡng</option>
                <option value="VISA">Visa & Hộ chiếu</option>
                <option value="AIRPORT">Ưu tiên sân bay / VIP</option>
                <option value="SIM">Sim du lịch toàn cầu</option>
                <option value="OTHER">Dịch vụ khác</option>
              </select>
            </div>

          </div>

          {/* Table Stats Summary */}
          <div className="text-xs text-slate-500 font-medium">
            Hiển thị <span className="text-slate-800 font-bold">{filteredBookings.length}</span> trên tổng số <span className="text-slate-800 font-bold">{bookings.length}</span> yêu cầu đặt chỗ.
          </div>
        </div>

        {/* Bookings Table / Grid List */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
            <RefreshCw className="h-8 w-8 text-[var(--accent)] animate-spin" />
            <p className="text-sm text-slate-500 font-medium">Đang truy vấn cơ sở dữ liệu Supabase...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4 border border-slate-100">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-700">Không tìm thấy yêu cầu nào</h3>
            <p className="text-slate-500 text-sm mt-1 px-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Khách Hàng / Thời gian</th>
                  <th className="py-4 px-6">Dịch Vụ Đặt Chỗ</th>
                  <th className="py-4 px-6">Ghi Chú Khách Hàng</th>
                  <th className="py-4 px-6">Trạng Thế</th>
                  <th className="py-4 px-6">Ghi Chú Nội Bộ (Admin Notes)</th>
                  <th className="py-4 px-6 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBookings.map((booking) => {
                  const isEditing = editingId === booking.id;
                  const isActioning = actionLoading === booking.id;

                  return (
                    <tr 
                      key={booking.id} 
                      className={`hover:bg-slate-50/30 transition-all ${
                        booking.status === "PENDING" ? "bg-amber-50/10" : ""
                      }`}
                    >
                      {/* Customer Info */}
                      <td className="py-5 px-6 align-top">
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            {booking.name}
                          </div>
                          
                          <a 
                            href={`tel:${booking.phone}`} 
                            className="text-xs text-slate-500 hover:text-[var(--accent)] flex items-center gap-1.5 transition-all w-fit"
                          >
                            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <code>{booking.phone}</code>
                          </a>

                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                            <Calendar className="h-3 w-3 shrink-0" />
                            {formatDate(booking.createdAt)}
                          </div>
                        </div>
                      </td>

                      {/* Service Name */}
                      <td className="py-5 px-6 align-top">
                        <span className="inline-block bg-blue-50/70 border border-blue-100/50 text-[var(--accent)] text-xs font-semibold px-2.5 py-1 rounded-lg">
                          {booking.service}
                        </span>
                      </td>

                      {/* Client Note */}
                      <td className="py-5 px-6 align-top max-w-xs">
                        <div className="text-xs text-slate-600 line-clamp-3 whitespace-pre-line" title={booking.note}>
                          {booking.note || <span className="text-slate-400 italic">Không có lời nhắn</span>}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6 align-top">
                        {isEditing ? (
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                            className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-[var(--accent)] font-semibold"
                          >
                            <option value="PENDING">Chờ xử lý</option>
                            <option value="PROCESSING">Đang xử lý</option>
                            <option value="COMPLETED">Hoàn thành</option>
                          </select>
                        ) : (
                          <div className="flex flex-col gap-1">
                            {booking.status === "PENDING" && (
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 w-fit">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span>
                                CHỜ XỬ LÝ
                              </span>
                            )}
                            {booking.status === "PROCESSING" && (
                              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 w-fit">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                ĐANG XỬ LÝ
                              </span>
                            )}
                            {booking.status === "COMPLETED" && (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 w-fit">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                ĐÃ XONG
                              </span>
                            )}

                            {/* Quick Action buttons */}
                            {booking.status === "PENDING" && (
                              <button
                                onClick={() => handleQuickStatusUpdate(booking.id, "PROCESSING")}
                                disabled={isActioning}
                                className="text-[10px] text-slate-500 hover:text-[var(--accent)] underline font-medium text-left mt-1 cursor-pointer"
                              >
                                Tiếp nhận xử lý
                              </button>
                            )}
                            {booking.status === "PROCESSING" && (
                              <button
                                onClick={() => handleQuickStatusUpdate(booking.id, "COMPLETED")}
                                disabled={isActioning}
                                className="text-[10px] text-slate-500 hover:text-emerald-600 underline font-medium text-left mt-1 cursor-pointer"
                              >
                                Hoàn thành đơn
                              </button>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Admin Notes */}
                      <td className="py-5 px-6 align-top max-w-xs">
                        {isEditing ? (
                          <textarea
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            placeholder="Ghi chú nội bộ: kết quả liên hệ, hẹn lịch..."
                            rows={2}
                            className="w-full text-xs p-1.5 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:bg-white transition-all focus:ring-1 focus:ring-[var(--accent)]"
                          />
                        ) : (
                          <div className="text-xs text-slate-500 italic whitespace-pre-line">
                            {booking.adminNotes ? (
                              <span className="text-slate-700 font-medium not-italic">{booking.adminNotes}</span>
                            ) : (
                              "Chưa có ghi chú nội bộ"
                            )}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right align-top">
                        {isActioning ? (
                          <div className="inline-block h-5 w-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
                        ) : isEditing ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleUpdate(booking.id)}
                              className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all shadow-sm shadow-emerald-500/10 cursor-pointer"
                              title="Lưu thay đổi"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all cursor-pointer"
                              title="Hủy bỏ"
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => startEdit(booking)}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all cursor-pointer"
                              title="Chỉnh sửa chi tiết"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all cursor-pointer border border-red-100"
                              title="Xóa booking này"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-12 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} ABTRIP Travel System &bull; Hệ thống quản trị an toàn SSL
      </div>
    </div>
  );
}
