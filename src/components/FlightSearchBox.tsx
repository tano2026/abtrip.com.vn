"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlaneTakeoff, 
  PlaneLanding, 
  Calendar, 
  Users, 
  ArrowLeftRight, 
  Search, 
  Loader2, 
  ChevronDown, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Send, 
  ArrowLeft,
  Plane,
  Check,
  Trash2,
  PlusCircle,
  Shield,
  Car,
  FileText,
  Compass,
  Globe,
  Sparkles,
  BookOpen,
  Wifi,
  Hotel,
  Building2
} from "lucide-react";
import DatePickerWithLunar from "./DatePickerWithLunar";

import AIRPORTS_DATA from "../data/airports.json";

interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

// Deduplicate airports based on code (keeping the first occurrence, which is Vietnamese where applicable)
const uniqueAirports: Airport[] = [];
const seenCodes = new Set<string>();
for (const ap of AIRPORTS_DATA as Airport[]) {
  if (!seenCodes.has(ap.code)) {
    seenCodes.add(ap.code);
    uniqueAirports.push(ap);
  }
}

const AIRPORTS = uniqueAirports;

interface Leg {
  id: string;
  departure: Airport;
  arrival: Airport;
  departureDate: string;
  depQuery: string;
  arrQuery: string;
  showDepDropdown: boolean;
  showArrDropdown: boolean;
  isDepFocused: boolean;
  isArrFocused: boolean;
}

interface Flight {
  id: string;
  airline: string;
  logoColor: string;
  flightNo: string;
  depTime: string;
  arrTime: string;
  duration: string;
  price: number;
  class: string;
}

// Helper function to strip Vietnamese diacritics for smart autocomplete
function removeAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase();
}

// Helper function to format YYYY-MM-DD to ddMMyyyy
function formatDateToDDMMYYYY(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return "";
  const [year, month, day] = parts;
  return `${day}${month}${year}`;
}

const HOTEL_DESTINATIONS = [
  { city: "Nha Trang", name: "Nha Trang, Khánh Hòa" },
  { city: "Phú Quốc", name: "Phú Quốc, Kiên Giang" },
  { city: "Đà Nẵng", name: "Đà Nẵng" },
  { city: "Vũng Tàu", name: "Vũng Tàu, Bà Rịa - Vũng Tàu" },
  { city: "Đà Lạt", name: "Đà Lạt, Lâm Đồng" },
  { city: "Sa Pa", name: "Sa Pa, Lào Cai" },
  { city: "Hạ Long", name: "Hạ Long, Quảng Ninh" },
  { city: "Hà Nội", name: "Hà Nội" },
  { city: "Hồ Chí Minh", name: "Hồ Chí Minh" }
];

const VISA_COUNTRIES = [
  // Châu Á
  "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Đài Loan", "Hồng Kông (Hong Kong)", "Ma Cao (Macau)", 
  "Ấn Độ (India)", "Thái Lan", "Singapore", "Malaysia", "Indonesia", "Philippines", "Campuchia", 
  "Lào", "Myanmar", "Brunei", "Mông Cổ", "Nepal", "Bhutan", "Sri Lanka", "Maldives", 
  "Thổ Nhĩ Kỳ (Turkey)", "Các Tiểu vương quốc Ả Rập Thống nhất (UAE)", "Ả Rập Xê Út (Saudi Arabia)", "Qatar",
  // Châu Âu
  "Châu Âu (Schengen)", "Anh Quốc (UK)", "Pháp (France)", "Đức (Germany)", "Ý (Italy)", 
  "Tây Ban Nha (Spain)", "Hà Lan (Netherlands)", "Thụy Sĩ (Switzerland)", "Bỉ (Belgium)", 
  "Áo (Austria)", "Thụy Điển (Sweden)", "Na Uy (Norway)", "Đan Mạch (Denmark)", 
  "Phần Lan (Finland)", "Hy Lạp (Greece)", "Cộng hòa Séc (Czechia)", "Nga (Russia)", 
  "Bồ Đào Nha (Portugal)", "Ba Lan (Poland)", "Hungary", "Ireland",
  // Châu Mỹ
  "Mỹ (Hoa Kỳ)", "Canada", "Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Cuba", "Peru",
  // Châu Úc
  "Úc (Australia)", "New Zealand",
  // Châu Phi
  "Nam Phi (South Africa)", "Ai Cập (Egypt)", "Morocco (Ma-rốc)", "Kenya"
];

const SIM_COUNTRIES = [
  "Thái Lan", "Nhật Bản", "Hàn Quốc", "Singapore - Malaysia", "Trung Quốc", "Mỹ & Canada", "Châu Âu", "Đài Loan", "Úc",
  "Singapore", "Malaysia", "Indonesia", "Philippines", "Campuchia", "Lào", "Myanmar", "Ấn Độ (India)", 
  "Thổ Nhĩ Kỳ (Turkey)", "Các Tiểu vương quốc Ả Rập Thống nhất (UAE)", "Anh Quốc (UK)", "Pháp (France)", 
  "Đức (Germany)", "Ý (Italy)", "Tây Ban Nha (Spain)", "Hà Lan (Netherlands)", "Thụy Sĩ (Switzerland)"
];

const SERVICE_TABS = [
  { id: "flight", label: "Vé máy bay", icon: Plane },
  { id: "hotel", label: "Khách sạn", icon: Hotel },
  { id: "visa", label: "Visa - Hộ chiếu", icon: FileText },
  { id: "fasttrack", label: "Fastrack", icon: Shield },
  { id: "sim", label: "Sim du lịch", icon: Wifi },
  { id: "b2b", label: "Doanh nghiệp (B2B)", icon: Building2 },
];

export default function FlightSearchBox() {
  // Service Tab
  const [activeTab, setActiveTab] = useState<"flight" | "hotel" | "visa" | "fasttrack" | "sim" | "b2b">("flight");

  // Service form states
  const [serviceName, setServiceName] = useState("");
  const [servicePhone, setServicePhone] = useState("");
  const [serviceNote, setServiceNote] = useState("");
  const [isServiceSubmitting, setIsServiceSubmitting] = useState(false);
  const [isServiceSuccess, setIsServiceSuccess] = useState(false);

  // B2B specific states
  const [b2bCompanyName, setB2bCompanyName] = useState("");
  const [b2bDestination, setB2bDestination] = useState("");
  const [b2bPax, setB2bPax] = useState(5);

  // HOTEL SPECIFIC STATES
  const [hotelCity, setHotelCity] = useState("Nha Trang");
  const [hotelCityQuery, setHotelCityQuery] = useState("");
  const [isHotelCityFocused, setIsHotelCityFocused] = useState(false);
  const [showHotelCityDropdown, setShowHotelCityDropdown] = useState(false);
  const [hotelCheckIn, setHotelCheckIn] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split("T")[0];
  });
  const [hotelCheckOut, setHotelCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 8);
    return d.toISOString().split("T")[0];
  });
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelAdults, setHotelAdults] = useState(2);
  const [hotelChildren, setHotelChildren] = useState(0);
  const [showHotelGuestDropdown, setShowHotelGuestDropdown] = useState(false);

  // VISA SPECIFIC STATES
  const [visaType, setVisaType] = useState<"visa" | "passport">("visa");
  const [visaCountry, setVisaCountry] = useState("Hàn Quốc");
  const [visaCountryQuery, setVisaCountryQuery] = useState("");
  const [showVisaCountryDropdown, setShowVisaCountryDropdown] = useState(false);
  const [isVisaCountryFocused, setIsVisaCountryFocused] = useState(false);
  const [visaRegion, setVisaRegion] = useState("miền nam");
  const [passportSubtype, setPassportSubtype] = useState<"new" | "renew" | "lost">("new");
  const [passportSpeed, setPassportSpeed] = useState<"normal" | "urgent">("normal");
  const [visaPurpose, setVisaPurpose] = useState<"tourism" | "study" | "visit" | "reunion">("tourism");

  // FASTRACK SPECIFIC STATES
  const [fastrackType, setFastrackType] = useState<"arrival" | "departure">("arrival");
  const [fastrackAirport, setFastrackAirport] = useState("SGN");
  const [fastrackFlightNo, setFastrackFlightNo] = useState("");
  const [fastrackDate, setFastrackDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split("T")[0];
  });
  const [fastrackPax, setFastrackPax] = useState(1);

  // SIM SPECIFIC STATES
  const [simCountry, setSimCountry] = useState("Thái Lan");
  const [simCountryQuery, setSimCountryQuery] = useState("");
  const [showSimCountryDropdown, setShowSimCountryDropdown] = useState(false);
  const [isSimCountryFocused, setIsSimCountryFocused] = useState(false);
  const [simType, setSimType] = useState<"esim" | "physical">("esim");
  const [simDate, setSimDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split("T")[0];
  });
  const [simQty, setSimQty] = useState(1);
  const [selectedServiceOption, setSelectedServiceOption] = useState<any | null>(null);
  const [visaPax, setVisaPax] = useState(1);

  // Booking Type: "round-trip" | "one-way" | "multi-city"
  const [bookingType, setBookingType] = useState<"round-trip" | "one-way" | "multi-city">("round-trip");
  
  // Single City booking states
  const [departure, setDeparture] = useState<Airport>(AIRPORTS[0]); // SGN
  const [arrival, setArrival] = useState<Airport>(AIRPORTS[1]); // HAN
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split("T")[0];
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toISOString().split("T")[0];
  });
  
  // Single City Queries
  const [depQuery, setDepQuery] = useState("");
  const [arrQuery, setArrQuery] = useState("");
  const [isDepFocused, setIsDepFocused] = useState(false);
  const [isArrFocused, setIsArrFocused] = useState(false);
  const [showDepDropdown, setShowDepDropdown] = useState(false);
  const [showArrDropdown, setShowArrDropdown] = useState(false);

  // Multi-City Legs State
  const [legs, setLegs] = useState<Leg[]>(() => [
    {
      id: "leg-1",
      departure: AIRPORTS[0], // SGN
      arrival: AIRPORTS[1], // HAN
      departureDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 5);
        return d.toISOString().split("T")[0];
      })(),
      depQuery: "",
      arrQuery: "",
      showDepDropdown: false,
      showArrDropdown: false,
      isDepFocused: false,
      isArrFocused: false
    },
    {
      id: "leg-2",
      departure: AIRPORTS[1], // HAN
      arrival: AIRPORTS[2], // DAD
      departureDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 8);
        return d.toISOString().split("T")[0];
      })(),
      depQuery: "",
      arrQuery: "",
      showDepDropdown: false,
      showArrDropdown: false,
      isDepFocused: false,
      isArrFocused: false
    }
  ]);

  // Passenger & Class states
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showPassDropdown, setShowPassDropdown] = useState(false);

  const handleReduceAdults = () => {
    if (adults <= 1) return;
    const newAdults = adults - 1;
    setAdults(newAdults);
    if (infants > newAdults) {
      setInfants(newAdults);
    }
  };

  // Simulated search & results states
  const [searchState, setSearchState] = useState<"input" | "loading" | "results" | "contact" | "success">("input");
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [mockFlights, setMockFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  
  // Contact details
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Refs for closing dropdowns on click outside
  const depContainerRef = useRef<HTMLDivElement>(null);
  const arrContainerRef = useRef<HTMLDivElement>(null);
  const passContainerRef = useRef<HTMLDivElement>(null);
  const hotelCityContainerRef = useRef<HTMLDivElement>(null);
  const hotelGuestContainerRef = useRef<HTMLDivElement>(null);
  const visaCountryContainerRef = useRef<HTMLDivElement>(null);
  const simCountryContainerRef = useRef<HTMLDivElement>(null);

  const loadingTexts = [
    "Đang kết nối cổng đặt vé abtrip.vn...",
    "Đang chuẩn bị tìm kiếm chuyến bay...",
    "Đang đồng bộ hóa tham số hành khách...",
    "Đang chuyển hướng sang trang đặt vé chính thức..."
  ];

  // Cycle through loading texts
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (searchState === "loading") {
      const currentTexts = getLoadingTexts();
      interval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev + 1) % currentTexts.length);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [searchState, activeTab]);

  // Click outside to close suggestion dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Single city
      if (depContainerRef.current && !depContainerRef.current.contains(event.target as Node)) {
        setShowDepDropdown(false);
        setIsDepFocused(false);
        setDepQuery("");
      }
      if (arrContainerRef.current && !arrContainerRef.current.contains(event.target as Node)) {
        setShowArrDropdown(false);
        setIsArrFocused(false);
        setArrQuery("");
      }

      // Hotel city
      if (hotelCityContainerRef.current && !hotelCityContainerRef.current.contains(event.target as Node)) {
        setShowHotelCityDropdown(false);
        setIsHotelCityFocused(false);
        setHotelCityQuery("");
      }

      // Hotel guest
      if (hotelGuestContainerRef.current && !hotelGuestContainerRef.current.contains(event.target as Node)) {
        setShowHotelGuestDropdown(false);
      }

      // Visa country
      if (visaCountryContainerRef.current && !visaCountryContainerRef.current.contains(event.target as Node)) {
        setShowVisaCountryDropdown(false);
        setIsVisaCountryFocused(false);
        setVisaCountryQuery("");
      }

      // Sim country
      if (simCountryContainerRef.current && !simCountryContainerRef.current.contains(event.target as Node)) {
        setShowSimCountryDropdown(false);
        setIsSimCountryFocused(false);
        setSimCountryQuery("");
      }
      
      // Multi-city legs
      setLegs((prev) =>
        prev.map((leg) => {
          const legEl = document.getElementById(leg.id);
          if (legEl && !legEl.contains(event.target as Node)) {
            return {
              ...leg,
              showDepDropdown: false,
              showArrDropdown: false,
              isDepFocused: false,
              isArrFocused: false,
              depQuery: "",
              arrQuery: ""
            };
          }
          return leg;
        })
      );

      // Passengers popover
      if (passContainerRef.current && !passContainerRef.current.contains(event.target as Node)) {
        setShowPassDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Swap City (Round-trip / One-way)
  const handleSwap = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  // Multi-city Leg helpers
  const updateLeg = (id: string, fields: Partial<Leg>) => {
    setLegs((prev) =>
      prev.map((leg) => (leg.id === id ? { ...leg, ...fields } : leg))
    );
  };

  const handleSelectDepartureLeg = (legId: string, airport: Airport) => {
    updateLeg(legId, {
      departure: airport,
      showDepDropdown: false,
      isDepFocused: false,
      depQuery: ""
    });
  };

  const handleSelectArrivalLeg = (legId: string, index: number, airport: Airport) => {
    setLegs((prev) => {
      const updated = prev.map((leg) => (leg.id === legId ? {
        ...leg,
        arrival: airport,
        showArrDropdown: false,
        isArrFocused: false,
        arrQuery: ""
      } : leg));
      
      // Smart Connection: Departure of next leg automatically matches arrival of this leg
      if (index < updated.length - 1) {
        updated[index + 1].departure = airport;
      }
      
      return updated;
    });
  };

  const handleAddLeg = () => {
    if (legs.length >= 4) return; // limit to max 4 legs
    const lastLeg = legs[legs.length - 1];
    const newDepDate = new Date(lastLeg.departureDate);
    newDepDate.setDate(newDepDate.getDate() + 3);
    
    // Find next default destination in standard airports list
    const lastArrivalIdx = AIRPORTS.findIndex(ap => ap.code === lastLeg.arrival.code);
    const defaultArrival = AIRPORTS[(lastArrivalIdx + 1) % AIRPORTS.length];

    const newLeg: Leg = {
      id: `leg-${Date.now()}`,
      departure: lastLeg.arrival, // departure connects to previous arrival
      arrival: defaultArrival,
      departureDate: newDepDate.toISOString().split("T")[0],
      depQuery: "",
      arrQuery: "",
      showDepDropdown: false,
      showArrDropdown: false,
      isDepFocused: false,
      isArrFocused: false
    };

    setLegs((prev) => [...prev, newLeg]);
  };

  const handleDeleteLeg = (id: string) => {
    if (legs.length <= 2) return;
    setLegs((prev) => prev.filter((leg) => leg.id !== id));
  };

  // Autocomplete Filtering functions
  const getFilteredAirports = (query: string) => {
    const cleanQuery = removeAccents(query).trim();
    if (!cleanQuery) return AIRPORTS.slice(0, 6); // default to top 6 popular airports

    const matches = AIRPORTS.map(ap => {
      const codeLower = ap.code.toLowerCase();
      const cityLower = removeAccents(ap.city);
      const nameLower = removeAccents(ap.name);
      const countryLower = removeAccents(ap.country || "");

      let score = 0;

      if (codeLower === cleanQuery) {
        score = 100;
      } else if (codeLower.startsWith(cleanQuery)) {
        score = 90;
      } else if (cityLower.startsWith(cleanQuery)) {
        score = 80;
      } else if (nameLower.startsWith(cleanQuery)) {
        score = 70;
      } else if (cityLower.includes(cleanQuery)) {
        score = 60;
      } else if (nameLower.includes(cleanQuery)) {
        score = 50;
      } else if (codeLower.includes(cleanQuery)) {
        score = 40;
      } else if (countryLower.includes(cleanQuery)) {
        score = 30;
      }

      return { airport: ap, score };
    }).filter(item => item.score > 0);

    matches.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      
      // Prioritize Vietnam airports if scores are equal
      const aIsVN = a.airport.country === "Việt Nam" || a.airport.country === "VN";
      const bIsVN = b.airport.country === "Việt Nam" || b.airport.country === "VN";
      if (aIsVN && !bIsVN) return -1;
      if (!aIsVN && bIsVN) return 1;

      return a.airport.city.localeCompare(b.airport.city);
    });

    return matches.map(item => item.airport);
  };

  // Run Search
  const handleSearch = () => {
    // Validate inputs
    if (bookingType !== "multi-city") {
      if (departure.code === arrival.code) {
        setErrorMsg("Điểm đi và điểm đến không được trùng nhau!");
        setTimeout(() => setErrorMsg(""), 3000);
        return;
      }
    } else {
      // Validate multi-city legs
      for (let i = 0; i < legs.length; i++) {
        if (legs[i].departure.code === legs[i].arrival.code) {
          setErrorMsg(`Chặng ${i + 1}: Điểm đi và điểm đến không được trùng nhau!`);
          setTimeout(() => setErrorMsg(""), 4000);
          return;
        }
      }
    }
    
    setErrorMsg("");
    setSearchState("loading");
    setLoadingTextIndex(0);
    
    // Build redirect URL
    const searchParams = new URLSearchParams();
    searchParams.set("adults", adults.toString());
    searchParams.set("children", children.toString());
    searchParams.set("infants", infants.toString());
    searchParams.set("tripType", bookingType);

    if (bookingType !== "multi-city") {
      // Segment 0
      searchParams.set("segments[0][startPoint]", departure.code);
      searchParams.set("segments[0][endPoint]", arrival.code);
      searchParams.set("segments[0][departDate]", formatDateToDDMMYYYY(departureDate));

      if (bookingType === "round-trip") {
        // Segment 1
        searchParams.set("segments[1][startPoint]", arrival.code);
        searchParams.set("segments[1][endPoint]", departure.code);
        searchParams.set("segments[1][departDate]", formatDateToDDMMYYYY(returnDate));
      }
    } else {
      // Multi-city legs
      legs.forEach((leg, idx) => {
        searchParams.set(`segments[${idx}][startPoint]`, leg.departure.code);
        searchParams.set(`segments[${idx}][endPoint]`, leg.arrival.code);
        searchParams.set(`segments[${idx}][departDate]`, formatDateToDDMMYYYY(leg.departureDate));
      });
    }

    const targetUrl = `https://abtrip.vn/flight?${searchParams.toString()}`;

    // Redirect after 1.5 seconds to show the premium loading transition
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1500);
  };

  // Send request to API route
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlight) return;
    
    setIsSubmitting(true);

    let routeDetails = "";
    if (bookingType !== "multi-city") {
      routeDetails = `Hành trình: ${departure.city} (${departure.code}) -> ${arrival.city} (${arrival.code}) ngày ${departureDate}${bookingType === "round-trip" ? ` - Về ngày ${returnDate}` : ""}`;
    } else {
      routeDetails = `Hành trình nhiều chặng:\n` + legs.map((leg, idx) => 
        `  Chặng ${idx + 1}: ${leg.departure.city} (${leg.departure.code}) -> ${leg.arrival.city} (${leg.arrival.code}) ngày ${leg.departureDate}`
      ).join("\n");
    }
    
    const flightDetailNote = `Yêu cầu đặt vé máy bay Nhiều Chặng / Liên Tuyến: Hãng ${selectedFlight.airline} (${selectedFlight.flightNo}) - Hạng ${selectedFlight.class}.\n${routeDetails}.\nSố khách: ${adults} người lớn, ${children} trẻ em, ${infants} em bé.\nTổng tiền dự kiến: ${(selectedFlight.price * (adults + children) + selectedFlight.price * 0.1 * infants).toLocaleString("vi-VN")} ₫.\nEmail liên hệ: ${contactEmail}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          note: flightDetailNote,
          service: `Đặt Vé Máy Bay (${bookingType.toUpperCase()})`
        })
      });

      if (response.ok) {
        setSearchState("success");
      } else {
        alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLoadingTexts = () => {
    switch (activeTab) {
      case "flight":
        return [
          "Đang kết nối cổng đặt vé abtrip.vn...",
          "Đang chuẩn bị tìm kiếm chuyến bay...",
          "Đang đồng bộ hóa tham số hành khách...",
          "Đang chuyển hướng sang trang đặt vé chính thức..."
        ];
      case "hotel":
        return [
          "Đang tìm kiếm phòng trống trên toàn hệ thống...",
          "Đang đối soát giá Corporate ưu đãi nhất...",
          "Đang đồng bộ phòng với Agoda, Booking & Vinpearl...",
          "Đang chuyển hướng sang trang kết quả đặt phòng..."
        ];
      case "visa":
        return [
          "Đang phân tích hồ sơ visa của bạn...",
          "Đang đối soát điều kiện cấp phép của Lãnh sự quán...",
          "Đang chuẩn bị danh mục hồ sơ cần chuẩn bị...",
          "Đang kết nối chuyên viên tư vấn Visa - Hộ chiếu..."
        ];
      case "fasttrack":
        return [
          "Đang kiểm tra tình trạng chuyến bay...",
          "Đang điều phối chuyên viên đón tiễn tại sân bay...",
          "Đang đăng ký luồng thủ tục ưu tiên với Hải quan...",
          "Đang tạo yêu cầu dịch vụ đón tiễn VIP..."
        ];
      case "sim":
        return [
          "Đang kiểm tra kho Sim & eSIM quốc tế...",
          "Đang kết nối nhà mạng đối tác tại quốc gia đến...",
          "Đang tạo mã QR kích hoạt eSIM tự động...",
          "Đang chuyển hướng tới trang đặt mua Sim..."
        ];
      default:
        return ["Đang xử lý yêu cầu..."];
    }
  };

  const getFilteredHotelCities = (query: string) => {
    const cleanQuery = removeAccents(query).trim();
    if (!cleanQuery) return HOTEL_DESTINATIONS.slice(0, 6);
    return HOTEL_DESTINATIONS.filter(item => 
      removeAccents(item.city).includes(cleanQuery) || 
      removeAccents(item.name).includes(cleanQuery)
    );
  };

  const getFilteredVisaCountries = (query: string) => {
    const cleanQuery = removeAccents(query).trim();
    if (!cleanQuery) return VISA_COUNTRIES.slice(0, 6);
    return VISA_COUNTRIES.filter(country => 
      removeAccents(country).includes(cleanQuery)
    );
  };

  const getFilteredSimCountries = (query: string) => {
    const cleanQuery = removeAccents(query).trim();
    if (!cleanQuery) return SIM_COUNTRIES.slice(0, 6);
    return SIM_COUNTRIES.filter(country => 
      removeAccents(country).includes(cleanQuery)
    );
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchState("loading");
    setLoadingTextIndex(0);

    const searchParams = new URLSearchParams();
    searchParams.set("destination", hotelCity);
    searchParams.set("checkin", formatDateToDDMMYYYY(hotelCheckIn));
    searchParams.set("checkout", formatDateToDDMMYYYY(hotelCheckOut));
    searchParams.set("rooms", hotelRooms.toString());
    searchParams.set("adults", hotelAdults.toString());
    searchParams.set("children", hotelChildren.toString());

    const targetUrl = `/khach-san?${searchParams.toString()}`;

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1500);
  };

  const handleVisaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsServiceSubmitting(true);

    const detailNote = visaType === "visa"
      ? `Yêu cầu dịch vụ Visa (${visaPurpose === "tourism" ? "Du lịch" : visaPurpose === "study" ? "Du học" : visaPurpose === "visit" ? "Thăm thân" : "Đoàn tụ"}): Quốc gia đến: ${visaCountry}. Khu vực nộp hồ sơ: ${visaRegion === "miền bắc" ? "Miền Bắc (Hà Nội)" : visaRegion === "miền trung" ? "Miền Trung (Đà Nẵng)" : "Miền Nam (TP. HCM)"}.\nGhi chú thêm: ${serviceNote}`
      : `Yêu cầu dịch vụ Hộ chiếu (${passportSubtype === "new" ? "Làm mới" : passportSubtype === "renew" ? "Gia hạn" : "Mất hộ chiếu làm lại"}): Loại dịch vụ: ${passportSpeed === "normal" ? "Làm bình thường" : "Làm gấp"}. Khu vực hỗ trợ: ${visaRegion === "miền bắc" ? "Miền Bắc (Hà Nội)" : visaRegion === "miền trung" ? "Miền Trung (Đà Nẵng)" : "Miền Nam (TP. HCM)"}.\nGhi chú thêm: ${serviceNote}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          note: detailNote,
          service: visaType === "visa" ? "Dịch Vụ Làm Visa" : "Dịch Vụ Hộ Chiếu Trực Tuyến",
        }),
      });

      if (response.ok) {
        setIsServiceSuccess(true);
        setSearchState("success");
      } else {
        alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server.");
    } finally {
      setIsServiceSubmitting(false);
    }
  };

  const handleFastrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsServiceSubmitting(true);

    const detailNote = `Yêu cầu đặt dịch vụ Fastrack ${fastrackType === "arrival" ? "Đón VIP (Arrival)" : "Tiễn VIP (Departure)"} tại Sân bay ${fastrackAirport}.\nNgày bay: ${fastrackDate}, Số hiệu chuyến bay: ${fastrackFlightNo || "Chưa có"}.\nSố hành khách: ${fastrackPax} khách.\nGhi chú thêm: ${serviceNote}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          note: detailNote,
          service: "Dịch vụ Đón Tiễn VIP (Fastrack)",
        }),
      });

      if (response.ok) {
        setIsServiceSuccess(true);
        setSearchState("success");
      } else {
        alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server.");
    } finally {
      setIsServiceSubmitting(false);
    }
  };

  const handleSimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsServiceSubmitting(true);

    const detailNote = `Yêu cầu đặt mua SIM/eSIM quốc tế đi ${simCountry}.\nLoại SIM: ${simType === "esim" ? "eSIM (Kích hoạt QR sau 5 phút)" : "SIM vật lý (Giao nhận tận nơi)"}.\nNgày bắt đầu sử dụng: ${simDate}.\nSố lượng: ${simQty} bộ.\nGhi chú thêm: ${serviceNote}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          note: detailNote,
          service: "Dịch vụ Sim du lịch Quốc Tế",
        }),
      });

      if (response.ok) {
        setIsServiceSuccess(true);
        setSearchState("success");
      } else {
        alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server.");
    } finally {
      setIsServiceSubmitting(false);
    }
  };

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsServiceSubmitting(true);

    const detailNote = `Yêu cầu tư vấn giải pháp B2B Doanh nghiệp:\n` +
      `- Tên công ty: ${b2bCompanyName}\n` +
      `- Người liên hệ: ${contactName}\n` +
      `- Số điện thoại Zalo: ${contactPhone}\n` +
      `- Điểm đến dự kiến: ${b2bDestination || "Chưa rõ"}\n` +
      `- Số lượng khách: ${b2bPax} khách\n` +
      `- Chi tiết yêu cầu: ${serviceNote || "Chưa có ghi chú thêm"}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          note: detailNote,
          service: "Giải Pháp Doanh Nghiệp (B2B)",
        }),
      });

      if (response.ok) {
        setIsServiceSuccess(true);
        setSearchState("success");
      } else {
        alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối server.");
    } finally {
      setIsServiceSubmitting(false);
    }
  };

  const triggerServiceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchState("loading");
    setLoadingTextIndex(0);
    setSelectedServiceOption(null);

    let targetUrl = "";
    const searchParams = new URLSearchParams();

    if (activeTab === "visa") {
      targetUrl = "/visa-ho-chieu";
      searchParams.set("type", visaType);
      if (visaType === "visa") {
        searchParams.set("country", visaCountry);
        searchParams.set("purpose", visaPurpose);
      } else {
        searchParams.set("subtype", passportSubtype);
        searchParams.set("speed", passportSpeed);
      }
      searchParams.set("region", visaRegion);
      searchParams.set("pax", visaPax.toString());
    } else if (activeTab === "fasttrack") {
      targetUrl = "/dich-vu-san-bay";
      searchParams.set("type", "fasttrack");
      searchParams.set("airport", fastrackAirport);
      searchParams.set("fastrackType", fastrackType);
      searchParams.set("flight", fastrackFlightNo);
      searchParams.set("date", fastrackDate);
      searchParams.set("pax", fastrackPax.toString());
    } else if (activeTab === "sim") {
      targetUrl = "/sim";
      searchParams.set("country", simCountry);
      searchParams.set("simType", simType);
      searchParams.set("date", simDate);
      searchParams.set("qty", simQty.toString());
    }

    setTimeout(() => {
      if (targetUrl) {
        window.location.href = `${targetUrl}?${searchParams.toString()}`;
      } else {
        setSearchState("results");
      }
    }, 1500);
  };

  const getVisaOptions = () => {
    if (visaType === "passport") {
      if (passportSpeed === "urgent") {
        return [
          {
            name: "Hỗ trợ làm Hộ chiếu Khẩn (1-3 ngày)",
            price: 1500000,
            features: [
              "Nhận hộ chiếu nhanh từ 1 - 3 ngày làm việc",
              "Xử lý hồ sơ bị lỗi/trễ hẹn chuyên nghiệp",
              "Nhận trực tiếp tại Cục Quản lý Xuất nhập cảnh"
            ],
            description: "Dành cho khách hàng cần lấy hộ chiếu gấp để bay."
          },
          {
            name: "Hộ chiếu Siêu Khẩn (Hỏa tốc 24h)",
            price: 2500000,
            features: [
              "Nhận hộ chiếu nhanh trong vòng 24h làm việc",
              "Hỗ trợ trọn gói thủ tục nộp trực tuyến",
              "Giao tận nhà hoặc nhận tại sân bay"
            ],
            description: "Giải pháp nhanh nhất cho chuyến bay khẩn cấp đột xuất."
          }
        ];
      } else {
        return [
          {
            name: "Tư vấn Hộ chiếu Online (Bình thường)",
            price: 300000,
            features: [
              "Hướng dẫn đăng ký dịch vụ công quốc gia",
              "Hỗ trợ chuẩn hóa ảnh thẻ đạt chuẩn Lãnh sự",
              "Nhận hộ chiếu tại nhà sau 8 ngày làm việc"
            ],
            description: "Phù hợp cho khách hàng tự nộp hồ sơ công trực tuyến."
          },
          {
            name: "Hộ chiếu Thường (Trọn gói nộp thay)",
            price: 800000,
            features: [
              "Uỷ thác nộp hồ sơ trực tuyến hoàn chỉnh từ A-Z",
              "Hỗ trợ chuẩn bị hồ sơ cư trú và các giấy tờ liên quan",
              "Theo dõi và cập nhật mã vận đơn giao nhận hộ chiếu"
            ],
            description: "Phù hợp cho khách bận rộn muốn giao phó toàn bộ thủ tục."
          }
        ];
      }
    } else {
      const isHardCountry = ["mỹ (hoa kỳ)", "úc (australia)", "châu âu (schengen)", "anh quốc (uk)", "canada"].includes(visaCountry.toLowerCase());
      const purposeText = visaPurpose === "tourism" 
        ? "Du lịch" 
        : visaPurpose === "study" 
        ? "Du học" 
        : visaPurpose === "visit" 
        ? "Thăm thân" 
        : "Đoàn tụ";

      if (isHardCountry) {
        return [
          {
            name: `Visa ${visaCountry} (${purposeText} - Tự túc)`,
            price: 3500000,
            features: [
              `Khai đơn xin visa ${purposeText} chuẩn xác (DS-160/Schengen form)`,
              "Đặt lịch hẹn phỏng vấn/lăn tay nhanh nhất",
              "Tư vấn tối ưu hóa hồ sơ tài chính, công việc"
            ],
            description: `Dịch vụ dịch thuật & hoàn thiện hồ sơ xin visa ${purposeText.toLowerCase()} chuyên nghiệp.`
          },
          {
            name: `Visa ${visaCountry} (${purposeText} - Trọn gói VIP)`,
            price: 5500000,
            features: [
              "Bao gồm toàn bộ dịch thuật công chứng hồ sơ",
              "Khai đơn và nộp ủy thác qua Trung tâm Visa",
              "Luyện phỏng vấn 1-1 với cựu chuyên viên Lãnh sự"
            ],
            description: `Đại diện nộp hồ sơ, tối đa hóa tỉ lệ đậu visa diện ${purposeText.toLowerCase()}.`
          }
        ];
      } else {
        return [
          {
            name: `Visa ${visaCountry} ${purposeText} Tiêu chuẩn`,
            price: 1200000,
            features: [
              `Khai tờ khai xin visa ${purposeText.toLowerCase()} và đặt lịch hẹn nộp hồ sơ`,
              "Nhân viên hỗ trợ nộp hồ sơ tại KVAC/VFS",
              "Theo dõi tiến độ và nhận kết quả thay khách hàng"
            ],
            description: `Hỗ trợ chuẩn bị hồ sơ ${purposeText.toLowerCase()} nhanh, tỷ lệ đậu cao.`
          },
          {
            name: `Visa ${visaCountry} ${purposeText} Khẩn / VIP`,
            price: 2200000,
            features: [
              "Nộp hồ sơ khẩn lấy nhanh trong 3 - 5 ngày",
              "Hỗ trợ dịch thuật công chứng toàn bộ hồ sơ",
              "Giao nhận kết quả visa tận nhà miễn phí"
            ],
            description: `Xử lý nhanh hồ sơ ${purposeText.toLowerCase()} khó, cần bay gấp.`
          }
        ];
      }
    }
  };

  const getFastrackOptions = () => {
    return [
      {
        name: `${fastrackType === "arrival" ? "Đón" : "Tiễn"} VIP Tiêu chuẩn`,
        price: 350000,
        features: [
          `Đón tại cửa ống lồng (Arrival) hoặc cửa ga đi (Departure)`,
          "Dẫn đi lối ưu tiên làm thủ tục xuất nhập cảnh nhanh",
          "Hỗ trợ làm thủ tục hải quan nhanh chóng, không xếp hàng"
        ],
        description: "Bỏ qua thời gian chờ đợi xếp hàng tại sân bay."
      },
      {
        name: `${fastrackType === "arrival" ? "Đón" : "Tiễn"} VIP Trọn gói`,
        price: 750000,
        features: [
          `Bao gồm toàn bộ dịch vụ của gói Tiêu chuẩn`,
          "Nhân viên hỗ trợ nhận hành lý ký gửi tại băng chuyền",
          "Hỗ trợ vận chuyển hành lý và tiễn khách ra tận xe"
        ],
        description: "Trải nghiệm sang trọng và thảnh thơi tuyệt đối."
      }
    ];
  };

  const getSimOptions = () => {
    if (simType === "esim") {
      return [
        {
          name: `eSIM ${simCountry} (5GB Tốc độ cao)`,
          price: 190000,
          features: [
            "Kích hoạt bằng mã QR qua Email/Zalo sau 5 phút",
            "5GB dung lượng tốc độ cao 4G/5G mỗi ngày",
            "Tự động kết nối nhà mạng lớn của nước sở tại"
          ],
          description: "Tiện lợi, không cần tháo SIM vật lý ra vào."
        },
        {
          name: `eSIM ${simCountry} (Không giới hạn Data)`,
          price: 320000,
          features: [
            "Không giới hạn dung lượng tốc độ cao trong 10 ngày",
            "Hỗ trợ chia sẻ kết nối mạng (Hotspot) cho máy khác",
            "Kích hoạt tự động ngay khi hạ cánh ở nước ngoài"
          ],
          description: "Phù hợp cho chuyến đi dài ngày cần kết nối liên tục."
        }
      ];
    } else {
      return [
        {
          name: `SIM Vật Lý ${simCountry} - Nhận Tại Sân Bay`,
          price: 220000,
          features: [
            "Nhận trực tiếp tại quầy ABTRIP ở sân bay (SGN, HAN, DAD)",
            "Gói cước 10GB sử dụng trong 7 ngày",
            "Lắp vào dùng ngay, không cần đăng ký thông tin cá nhân"
          ],
          description: "Nhận SIM nhanh gọn ngay trước giờ cất cánh."
        },
        {
          name: `SIM Vật Lý ${simCountry} - Giao Tận Nhà`,
          price: 290000,
          features: [
            "Giao hàng nhanh toàn quốc trước ngày bay",
            "Gói cước không giới hạn dung lượng trong 15 ngày",
            "Tặng kèm que chọc SIM và khay đựng SIM du lịch"
          ],
          description: "Chuẩn bị sẵn sàng SIM từ nhà, yên tâm lên đường."
        }
      ];
    }
  };

  const totalPassengers = adults + children + infants;

  return (
    <div className="relative w-full max-w-2xl mx-auto pt-8 z-20">
      {/* Parent Service Tabs bar */}
      <div className="relative z-30 flex items-center bg-white/95 backdrop-blur-md border border-slate-200 rounded-full shadow-[0_10px_35px_rgba(0,91,150,0.12)] p-1.5 max-w-[98%] sm:max-w-[95%] overflow-x-auto scrollbar-none whitespace-nowrap w-max mx-auto">
        {SERVICE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchState("input");
                setIsServiceSuccess(false);
                setSelectedServiceOption(null);
                setSelectedFlight(null);
              }}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 scale-100 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap ${
                isActive 
                  ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20 font-extrabold" 
                  : "text-slate-655 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isActive ? "text-white" : "text-[var(--accent)]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Form Card */}
      <div className="glass-card w-full rounded-3xl shadow-[0_20px_50px_rgba(0,91,150,0.15)] relative border border-white/60 bg-white/95 overflow-visible -mt-6 pt-12 pb-6 px-6 md:px-8 z-10">
        {/* Visual Accent glow line */}
        <div className="absolute top-0 inset-x-0 h-[3.5px] bg-gradient-to-r from-[var(--accent)] to-[#4291b8] rounded-t-3xl"></div>
        
                <AnimatePresence mode="wait">
          {searchState === "input" ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* If activeTab is flight */}
              {activeTab === "flight" && (
                <motion.div
              key="input"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tabs including Multi-city */}
              <div className="flex space-x-6 border-b border-slate-200 pb-4 mb-6 relative">
                <button 
                  onClick={() => setBookingType("round-trip")}
                  className={`font-semibold pb-4 -mb-[17px] relative transition-colors cursor-pointer text-sm md:text-base ${bookingType === "round-trip" ? "text-[var(--accent)]" : "text-slate-500 hover:text-slate-800"}`}
                >
                  Khứ hồi
                  {bookingType === "round-trip" && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--accent)]" />
                  )}
                </button>
                <button 
                  onClick={() => setBookingType("one-way")}
                  className={`font-semibold pb-4 -mb-[17px] relative transition-colors cursor-pointer text-sm md:text-base ${bookingType === "one-way" ? "text-[var(--accent)]" : "text-slate-500 hover:text-slate-800"}`}
                >
                  Một chiều
                  {bookingType === "one-way" && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--accent)]" />
                  )}
                </button>
                <button 
                  onClick={() => setBookingType("multi-city")}
                  className={`font-semibold pb-4 -mb-[17px] relative transition-colors cursor-pointer text-sm md:text-base ${bookingType === "multi-city" ? "text-[var(--accent)]" : "text-slate-500 hover:text-slate-800"}`}
                >
                  Nhiều chặng
                  {bookingType === "multi-city" && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--accent)]" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm rounded-xl text-center font-medium">
                  {errorMsg}
                </div>
              )}

              {/* INPUT FIELDS AREA */}
              <div className="space-y-4">
                
                {/* 1. ROUND TRIP / ONE WAY INPUT FIELDS */}
                {bookingType !== "multi-city" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                      {/* Swap Button */}
                      <button 
                        onClick={handleSwap}
                        className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--primary)] border border-slate-200 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 hidden md:flex cursor-pointer"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                      </button>

                      {/* Departure City */}
                      <div className="relative" ref={depContainerRef}>
                        <label className="text-xs text-slate-600 uppercase tracking-wider mb-1 block pl-1 font-semibold">Điểm đi</label>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] transition-colors min-h-[54px]">
                          <PlaneTakeoff className="text-[var(--accent)] w-5 h-5 mr-3 shrink-0" />
                          
                          <div className="text-left w-full relative">
                            {isDepFocused ? (
                              <input 
                                type="text" 
                                autoFocus
                                placeholder="Gõ tìm thành phố, sân bay..."
                                value={depQuery}
                                onChange={(e) => setDepQuery(e.target.value)}
                                className="bg-transparent text-slate-800 font-semibold text-sm outline-none w-full border-none p-0 focus:ring-0 placeholder-slate-400"
                              />
                            ) : (
                              <div 
                                onClick={() => {
                                  setShowDepDropdown(true);
                                  setIsDepFocused(true);
                                  setShowArrDropdown(false);
                                  setShowPassDropdown(false);
                                }}
                                className="cursor-pointer select-none"
                              >
                                <div className="text-slate-800 font-semibold text-sm whitespace-nowrap truncate max-w-[170px] sm:max-w-none">
                                  {departure.city} ({departure.code})
                                </div>
                                <div className="text-[10px] text-slate-500 truncate max-w-[170px] sm:max-w-none">
                                  {departure.name}
                                </div>
                              </div>
                            )}
                          </div>
                          <ChevronDown className="text-slate-400 w-4 h-4 ml-2 shrink-0" />
                        </div>

                        {/* Dropdown Suggestions */}
                        {showDepDropdown && (
                          <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                            {getFilteredAirports(depQuery).length > 0 ? (
                              getFilteredAirports(depQuery).map((airport) => (
                                <div
                                  key={airport.code}
                                  onClick={() => {
                                    setDeparture(airport);
                                    setShowDepDropdown(false);
                                    setIsDepFocused(false);
                                    setDepQuery("");
                                  }}
                                  className={`p-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center border-b border-slate-100 ${departure.code === airport.code ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-slate-800"}`}
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="font-semibold text-sm text-slate-800 whitespace-nowrap truncate">{airport.city} ({airport.code})</div>
                                    <div className="text-[10px] text-slate-500 truncate">{airport.name}</div>
                                  </div>
                                  <span className="font-bold text-[var(--accent)] text-xs bg-slate-100 px-2 py-0.5 rounded shrink-0">{airport.code}</span>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-xs text-slate-500 text-center">Không tìm thấy sân bay phù hợp</div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Arrival City */}
                      <div className="relative" ref={arrContainerRef}>
                        <label className="text-xs text-slate-600 uppercase tracking-wider mb-1 block pl-1 font-semibold">Điểm đến</label>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] transition-colors min-h-[54px]">
                          <PlaneLanding className="text-[var(--accent)] w-5 h-5 mr-3 shrink-0" />
                          
                          <div className="text-left w-full relative">
                            {isArrFocused ? (
                              <input 
                                type="text" 
                                autoFocus
                                placeholder="Gõ tìm thành phố, sân bay..."
                                value={arrQuery}
                                onChange={(e) => setArrQuery(e.target.value)}
                                className="bg-transparent text-slate-800 font-semibold text-sm outline-none w-full border-none p-0 focus:ring-0 placeholder-slate-400"
                              />
                            ) : (
                              <div 
                                onClick={() => {
                                  setShowArrDropdown(true);
                                  setIsArrFocused(true);
                                  setShowDepDropdown(false);
                                  setShowPassDropdown(false);
                                }}
                                className="cursor-pointer select-none"
                              >
                                <div className="text-slate-800 font-semibold text-sm whitespace-nowrap truncate max-w-[170px] sm:max-w-none">
                                  {arrival.city} ({arrival.code})
                                </div>
                                <div className="text-[10px] text-slate-500 truncate max-w-[170px] sm:max-w-none">
                                  {arrival.name}
                                </div>
                              </div>
                            )}
                          </div>
                          <ChevronDown className="text-slate-400 w-4 h-4 ml-2 shrink-0" />
                        </div>

                        {/* Dropdown Suggestions */}
                        {showArrDropdown && (
                          <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                            {getFilteredAirports(arrQuery).length > 0 ? (
                              getFilteredAirports(arrQuery).map((airport) => (
                                <div
                                  key={airport.code}
                                  onClick={() => {
                                    setArrival(airport);
                                    setShowArrDropdown(false);
                                    setIsArrFocused(false);
                                    setArrQuery("");
                                  }}
                                  className={`p-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center border-b border-slate-100 ${arrival.code === airport.code ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-slate-800"}`}
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="font-semibold text-sm text-slate-800 whitespace-nowrap truncate">{airport.city} ({airport.code})</div>
                                    <div className="text-[10px] text-slate-500 truncate">{airport.name}</div>
                                  </div>
                                  <span className="font-bold text-[var(--accent)] text-xs bg-slate-100 px-2 py-0.5 rounded shrink-0">{airport.code}</span>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-xs text-slate-500 text-center">Không tìm thấy sân bay phù hợp</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dates Selection with Lunar Calendar */}
                    <div className="grid grid-cols-2 gap-4">
                      <DatePickerWithLunar 
                        label="Ngày đi"
                        selectedDate={departureDate}
                        onChange={setDepartureDate}
                        minDate={new Date().toISOString().split("T")[0]}
                      />
                      <DatePickerWithLunar 
                        label="Ngày về"
                        selectedDate={returnDate}
                        onChange={setReturnDate}
                        minDate={departureDate}
                        disabled={bookingType === "one-way"}
                      />
                    </div>
                  </>
                )}

                {/* 2. MULTI-CITY (NHIỀU CHẶNG) INPUT FIELDS */}
                {bookingType === "multi-city" && (
                  <div className="space-y-4">
                    {legs.map((leg, index) => (
                      <div 
                        key={leg.id} 
                        id={leg.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative space-y-3"
                      >
                        {/* Title of Leg and Delete Button */}
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-[var(--accent)] tracking-wider">CHẶNG {index + 1}</span>
                          {legs.length > 2 && (
                            <button 
                              onClick={() => handleDeleteLeg(leg.id)}
                              className="text-red-500 hover:text-red-650 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Xóa chặng
                            </button>
                          )}
                        </div>

                        {/* Leg Cities Autocomplete Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
                          
                          {/* Leg Departure */}
                          <div className="relative">
                            <label className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1 pl-1">Điểm đi</label>
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-2.5 min-h-[48px] focus-within:border-[var(--accent)] transition-colors">
                              <PlaneTakeoff className="text-[var(--accent)] w-4 h-4 mr-2 shrink-0" />
                              <div className="w-full relative text-left">
                                {leg.isDepFocused ? (
                                  <input 
                                    type="text" 
                                    autoFocus
                                    placeholder="Gõ tìm..."
                                    value={leg.depQuery}
                                    onChange={(e) => updateLeg(leg.id, { depQuery: e.target.value })}
                                    className="bg-transparent text-slate-800 font-semibold text-xs outline-none w-full border-none p-0 focus:ring-0 placeholder-slate-400"
                                  />
                                ) : (
                                  <div 
                                    onClick={() => {
                                      updateLeg(leg.id, { showDepDropdown: true, isDepFocused: true, showArrDropdown: false });
                                    }}
                                    className="cursor-pointer select-none"
                                  >
                                    <div className="text-slate-800 font-semibold text-xs truncate max-w-[170px] sm:max-w-none">
                                      {leg.departure.city} ({leg.departure.code})
                                    </div>
                                  </div>
                                )}
                              </div>
                              <ChevronDown className="text-slate-400 w-3 h-3 ml-1 shrink-0" />
                            </div>

                            {/* Dropdown Suggestions */}
                            {leg.showDepDropdown && (
                              <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                                {getFilteredAirports(leg.depQuery).length > 0 ? (
                                  getFilteredAirports(leg.depQuery).map((airport) => (
                                    <div
                                      key={airport.code}
                                      onClick={() => handleSelectDepartureLeg(leg.id, airport)}
                                      className={`p-2.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center border-b border-slate-100 text-xs ${leg.departure.code === airport.code ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-slate-800"}`}
                                    >
                                      <div className="min-w-0 pr-2">
                                        <div className="font-semibold text-slate-800 truncate">{airport.city} ({airport.code})</div>
                                        <div className="text-[9px] text-slate-500 truncate">{airport.name}</div>
                                      </div>
                                      <span className="font-bold text-[var(--accent)] text-[9px] bg-slate-100 px-1.5 py-0.5 rounded shrink-0">{airport.code}</span>
                                    </div>
                                  ))
                                ) : (
                                  <div className="p-3 text-[10px] text-slate-500 text-center">Không tìm thấy sân bay</div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Leg Arrival */}
                          <div className="relative">
                            <label className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1 pl-1">Điểm đến</label>
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-2.5 min-h-[48px] focus-within:border-[var(--accent)] transition-colors">
                              <PlaneLanding className="text-[var(--accent)] w-4 h-4 mr-2 shrink-0" />
                              <div className="w-full relative text-left">
                                {leg.isArrFocused ? (
                                  <input 
                                    type="text" 
                                    autoFocus
                                    placeholder="Gõ tìm..."
                                    value={leg.arrQuery}
                                    onChange={(e) => updateLeg(leg.id, { arrQuery: e.target.value })}
                                    className="bg-transparent text-slate-800 font-semibold text-xs outline-none w-full border-none p-0 focus:ring-0 placeholder-slate-400"
                                  />
                                ) : (
                                  <div 
                                    onClick={() => {
                                      updateLeg(leg.id, { showArrDropdown: true, isArrFocused: true, showDepDropdown: false });
                                    }}
                                    className="cursor-pointer select-none"
                                  >
                                    <div className="text-slate-800 font-semibold text-xs truncate max-w-[170px] sm:max-w-none">
                                      {leg.arrival.city} ({leg.arrival.code})
                                    </div>
                                  </div>
                                )}
                              </div>
                              <ChevronDown className="text-slate-400 w-3 h-3 ml-1 shrink-0" />
                            </div>

                            {/* Dropdown Suggestions */}
                            {leg.showArrDropdown && (
                              <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                                {getFilteredAirports(leg.arrQuery).length > 0 ? (
                                  getFilteredAirports(leg.arrQuery).map((airport) => (
                                    <div
                                      key={airport.code}
                                      onClick={() => handleSelectArrivalLeg(leg.id, index, airport)}
                                      className={`p-2.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center border-b border-slate-100 text-xs ${leg.arrival.code === airport.code ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-slate-800"}`}
                                    >
                                      <div className="min-w-0 pr-2">
                                        <div className="font-semibold text-slate-800 truncate">{airport.city} ({airport.code})</div>
                                        <div className="text-[9px] text-slate-500 truncate">{airport.name}</div>
                                      </div>
                                      <span className="font-bold text-[var(--accent)] text-[9px] bg-slate-100 px-1.5 py-0.5 rounded shrink-0">{airport.code}</span>
                                    </div>
                                  ))
                                ) : (
                                  <div className="p-3 text-[10px] text-slate-500 text-center">Không tìm thấy sân bay</div>
                                )}
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Leg Date Picker */}
                        <div className="w-full">
                          <DatePickerWithLunar 
                            label="Ngày bay"
                            selectedDate={leg.departureDate}
                            onChange={(dateStr) => updateLeg(leg.id, { departureDate: dateStr })}
                            minDate={index === 0 ? new Date().toISOString().split("T")[0] : legs[index - 1].departureDate}
                          />
                        </div>

                      </div>
                    ))}

                    {/* Add Leg Button */}
                    {legs.length < 4 && (
                      <button 
                        type="button"
                        onClick={handleAddLeg}
                        className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-200 hover:border-[var(--accent)] hover:text-[var(--accent)] text-slate-500 font-semibold py-3 rounded-xl transition-all cursor-pointer text-sm"
                      >
                        <PlusCircle className="w-4 h-4" /> Thêm chặng bay tiếp theo
                      </button>
                    )}
                  </div>
                )}

                {/* 3. PASSENGERS SELECTOR (Shared by all booking types) */}
                <div className="relative" ref={passContainerRef}>
                  <label className="text-xs text-slate-600 uppercase tracking-wider mb-1 block pl-1 font-semibold">Hành khách</label>
                  <div 
                    onClick={() => {
                      setShowPassDropdown(!showPassDropdown);
                      setShowDepDropdown(false);
                      setShowArrDropdown(false);
                    }}
                    className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] transition-colors cursor-pointer hover:bg-slate-100 min-h-[54px]"
                  >
                    <Users className="text-[var(--accent)] w-5 h-5 mr-3 shrink-0" />
                    <div className="text-slate-800 font-semibold text-sm whitespace-nowrap truncate">
                      {totalPassengers} Khách ({adults} Người lớn, {children} Trẻ em, {infants} Em bé)
                    </div>
                    <ChevronDown className="text-slate-400 w-4 h-4 ml-auto shrink-0" />
                  </div>

                  {showPassDropdown && (
                    <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 space-y-4">
                      {/* Adults count */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-800 text-sm whitespace-nowrap">Người lớn</div>
                          <div className="text-[10px] text-slate-500 whitespace-nowrap">&gt;= 12 tuổi</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            disabled={adults <= 1}
                            onClick={handleReduceAdults}
                            className="w-8 h-8 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-slate-800 font-bold w-4 text-center select-none text-sm">{adults}</span>
                          <button 
                            onClick={() => setAdults(adults + 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Children count */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-800 text-sm whitespace-nowrap">Trẻ em</div>
                          <div className="text-[10px] text-slate-500 whitespace-nowrap">2 - 11 tuổi</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            disabled={children <= 0}
                            onClick={() => setChildren(children - 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-slate-800 font-bold w-4 text-center select-none text-sm">{children}</span>
                          <button 
                            onClick={() => setChildren(children + 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Infants count */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-slate-800 text-sm whitespace-nowrap">Em bé</div>
                          <div className="text-[10px] text-slate-500 whitespace-nowrap">0 - 2 tuổi (Trên đùi)</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            disabled={infants <= 0}
                            onClick={() => setInfants(infants - 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-slate-800 font-bold w-4 text-center select-none text-sm">{infants}</span>
                          <button 
                            disabled={infants >= adults}
                            onClick={() => setInfants(infants + 1)}
                            className="w-8 h-8 rounded-full border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button 
                        onClick={() => setShowPassDropdown(false)}
                        className="w-full bg-[var(--accent)]/10 text-[var(--accent)] py-2 rounded-lg font-semibold hover:bg-[var(--accent)] hover:text-white transition-all text-sm cursor-pointer"
                      >
                        Áp Dụng
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleSearch}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-lg rounded-xl py-4 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] hover:scale-[1.01] transition-all cursor-pointer mt-2"
                >
                  <Search className="w-5 h-5 mr-2" /> Tìm Chuyến Bay
                </button>
              </div>
            </motion.div>
              )}

              {/* If activeTab is hotel */}
              {activeTab === "hotel" && (
                <form onSubmit={handleHotelSearch} className="space-y-4">
                  {/* Destination / Hotel Autocomplete */}
                  <div className="relative" ref={hotelCityContainerRef}>
                    <label className="text-xs text-slate-655 uppercase font-semibold block pl-1 mb-1">Điểm đến / Khách sạn</label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] transition-colors min-h-[50px]">
                      <Hotel className="text-[var(--accent)] w-5 h-5 mr-3 shrink-0" />
                      <div className="text-left w-full relative">
                        {isHotelCityFocused ? (
                          <input 
                            type="text"
                            autoFocus
                            placeholder="Nhập điểm đến (Ví dụ: Nha Trang, Phú Quốc...)"
                            value={hotelCityQuery}
                            onChange={(e) => setHotelCityQuery(e.target.value)}
                            className="bg-transparent text-slate-800 font-semibold text-xs outline-none w-full border-none p-0 focus:ring-0 placeholder-slate-400"
                          />
                        ) : (
                          <div 
                            onClick={() => {
                              setShowHotelCityDropdown(true);
                              setIsHotelCityFocused(true);
                            }}
                            className="cursor-pointer select-none"
                          >
                            <div className="text-slate-800 font-semibold text-xs">
                              {hotelCity}
                            </div>
                            <div className="text-[9px] text-slate-500">
                              Khách sạn, Resort, Căn hộ...
                            </div>
                          </div>
                        )}
                      </div>
                      <ChevronDown className="text-slate-400 w-4 h-4 ml-1 shrink-0" />
                    </div>

                    {showHotelCityDropdown && (
                      <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                        {getFilteredHotelCities(hotelCityQuery).length > 0 ? (
                          getFilteredHotelCities(hotelCityQuery).map((item) => (
                            <div
                              key={item.city}
                              onClick={() => {
                                setHotelCity(item.city);
                                setShowHotelCityDropdown(false);
                                setIsHotelCityFocused(false);
                                setHotelCityQuery("");
                              }}
                              className={`p-2.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-xs border-b border-slate-100 ${hotelCity === item.city ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-slate-800"}`}
                            >
                              <div>
                                <div className="font-semibold text-slate-855">{item.city}</div>
                                <div className="text-[9px] text-slate-505">{item.name}</div>
                              </div>
                              <span className="font-bold text-[var(--accent)] text-[9px] bg-slate-100 px-1.5 py-0.5 rounded shrink-0">Điểm đến</span>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-[10px] text-slate-500 text-center">Không tìm thấy địa điểm</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Dates Selection (Check-in & Check-out) */}
                  <div className="grid grid-cols-2 gap-3">
                    <DatePickerWithLunar 
                      label="Ngày nhận phòng"
                      selectedDate={hotelCheckIn}
                      onChange={setHotelCheckIn}
                      minDate={new Date().toISOString().split("T")[0]}
                    />
                    <DatePickerWithLunar 
                      label="Ngày trả phòng"
                      selectedDate={hotelCheckOut}
                      onChange={setHotelCheckOut}
                      minDate={hotelCheckIn}
                    />
                  </div>

                  {/* Rooms & Guests Selector */}
                  <div className="relative" ref={hotelGuestContainerRef}>
                    <label className="text-xs text-slate-655 uppercase font-semibold block pl-1 mb-1">Số phòng & Khách</label>
                    <div 
                      onClick={() => {
                        setShowHotelGuestDropdown(!showHotelGuestDropdown);
                        setShowHotelCityDropdown(false);
                      }}
                      className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] transition-colors cursor-pointer hover:bg-slate-100 min-h-[50px]"
                    >
                      <Users className="text-[var(--accent)] w-5 h-5 mr-3 shrink-0" />
                      <div className="text-slate-855 font-semibold text-xs whitespace-nowrap truncate">
                        {hotelRooms} Phòng, {hotelAdults} Người lớn, {hotelChildren} Trẻ em
                      </div>
                      <ChevronDown className="text-slate-400 w-4 h-4 ml-auto shrink-0" />
                    </div>

                    {showHotelGuestDropdown && (
                      <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 space-y-4">
                        {/* Rooms count */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-slate-800 text-xs">Số phòng</div>
                            <div className="text-[9px] text-slate-500">Tối đa 8 phòng</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              type="button"
                              disabled={hotelRooms <= 1}
                              onClick={() => setHotelRooms(hotelRooms - 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-705 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-slate-800 font-bold w-4 text-center select-none text-xs">{hotelRooms}</span>
                            <button 
                              type="button"
                              disabled={hotelRooms >= 8}
                              onClick={() => setHotelRooms(hotelRooms + 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-705 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                        {/* Adults count */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-slate-800 text-xs">Người lớn</div>
                            <div className="text-[9px] text-slate-500">Từ 12 tuổi</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              type="button"
                              disabled={hotelAdults <= 1}
                              onClick={() => setHotelAdults(hotelAdults - 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-705 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-slate-800 font-bold w-4 text-center select-none text-xs">{hotelAdults}</span>
                            <button 
                              type="button"
                              disabled={hotelAdults >= 16}
                              onClick={() => setHotelAdults(hotelAdults + 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-705 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                        {/* Children count */}
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-slate-800 text-xs">Trẻ em</div>
                            <div className="text-[9px] text-slate-500">0 - 11 tuổi</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button 
                              type="button"
                              disabled={hotelChildren <= 0}
                              onClick={() => setHotelChildren(hotelChildren - 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-705 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-slate-800 font-bold w-4 text-center select-none text-xs">{hotelChildren}</span>
                            <button 
                              type="button"
                              disabled={hotelChildren >= 8}
                              onClick={() => setHotelChildren(hotelChildren + 1)}
                              className="w-7 h-7 rounded-full border border-slate-200 text-slate-705 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                        <button 
                          type="button"
                          onClick={() => setShowHotelGuestDropdown(false)}
                          className="w-full bg-[var(--accent)]/10 text-[var(--accent)] py-2 rounded-lg font-semibold hover:bg-[var(--accent)] hover:text-white transition-all text-xs cursor-pointer"
                        >
                          Áp Dụng
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit Search button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-base rounded-xl py-3.5 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] transition-all cursor-pointer mt-2"
                  >
                    <Search className="w-5 h-5 mr-2" /> Tìm Phòng Khách Sạn
                  </button>
                </form>
              )}

              {/* If activeTab is visa */}
              {activeTab === "visa" && (
                <form onSubmit={triggerServiceSearch} className="space-y-4">
                  {/* Service Selector */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Dịch vụ yêu cầu</label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setVisaType("visa")}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${visaType === "visa" ? "bg-[var(--accent)] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        Dịch Vụ Visa
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisaType("passport")}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${visaType === "passport" ? "bg-[var(--accent)] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        Hộ Chiếu Trực Tuyến
                      </button>
                    </div>
                  </div>

                  {/* Country Autocomplete (Visa only) */}
                  {visaType === "visa" && (
                    <div className="relative" ref={visaCountryContainerRef}>
                      <label className="text-xs text-slate-655 uppercase font-semibold block pl-1 mb-1">Quốc gia cần đến</label>
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] transition-colors min-h-[50px]">
                        <Compass className="text-[var(--accent)] w-5 h-5 mr-2.5 shrink-0" />
                        <div className="text-left w-full relative">
                          {isVisaCountryFocused ? (
                            <input 
                              type="text"
                              autoFocus
                              placeholder="Nhập tên nước (Ví dụ: Hàn Quốc, Nhật Bản...)"
                              value={visaCountryQuery}
                              onChange={(e) => setVisaCountryQuery(e.target.value)}
                              className="bg-transparent text-slate-800 font-semibold text-xs outline-none w-full border-none p-0 focus:ring-0 placeholder-slate-400"
                            />
                          ) : (
                            <div 
                              onClick={() => {
                                setShowVisaCountryDropdown(true);
                                setIsVisaCountryFocused(true);
                              }}
                              className="cursor-pointer select-none text-xs text-slate-800 font-semibold"
                            >
                              {visaCountry}
                            </div>
                          )}
                        </div>
                        <ChevronDown className="text-slate-400 w-4 h-4 ml-1 shrink-0" />
                      </div>

                      {showVisaCountryDropdown && (
                        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                          {getFilteredVisaCountries(visaCountryQuery).length > 0 ? (
                            getFilteredVisaCountries(visaCountryQuery).map((country) => (
                              <div
                                key={country}
                                onClick={() => {
                                  setVisaCountry(country);
                                  setShowVisaCountryDropdown(false);
                                  setIsVisaCountryFocused(false);
                                  setVisaCountryQuery("");
                                }}
                                className={`p-2.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-xs border-b border-slate-100 ${visaCountry === country ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-slate-800"}`}
                              >
                                <span>{country}</span>
                                <span className="font-bold text-[var(--accent)] text-[9px] bg-slate-100 px-1.5 py-0.5 rounded shrink-0">Quốc gia</span>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 text-[10px] text-slate-500 text-center">Không tìm thấy quốc gia</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Visa Purpose Selector */}
                  {visaType === "visa" && (
                    <div className="space-y-1">
                      <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Mục đích xin visa</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { id: "tourism", label: "Du lịch" },
                          { id: "study", label: "Du học" },
                          { id: "visit", label: "Thăm thân" },
                          { id: "reunion", label: "Đoàn tụ" }
                        ].map((purpose) => (
                          <button
                            type="button"
                            key={purpose.id}
                            onClick={() => setVisaPurpose(purpose.id as any)}
                            className={`py-2 px-1 border rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${visaPurpose === purpose.id ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                          >
                            {purpose.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Passport Subtype Selector */}
                  {visaType === "passport" && (
                    <div className="space-y-1">
                      <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Yêu cầu hộ chiếu</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "new", label: "Làm mới" },
                          { id: "renew", label: "Gia hạn" },
                          { id: "lost", label: "Mất làm lại" }
                        ].map((sub) => (
                          <button
                            type="button"
                            key={sub.id}
                            onClick={() => setPassportSubtype(sub.id as any)}
                            className={`py-2 px-1 border rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${passportSubtype === sub.id ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Region Selector */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">
                      {visaType === "visa" ? "Khu vực nộp hồ sơ" : "Khu vực cư trú hỗ trợ"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["miền bắc", "miền trung", "miền nam"].map((region) => (
                        <button
                          type="button"
                          key={region}
                          onClick={() => setVisaRegion(region)}
                          className={`py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${visaRegion === region ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                        >
                          {region === "miền bắc" && "Miền Bắc (HN)"}
                          {region === "miền trung" && "Miền Trung (ĐN)"}
                          {region === "miền nam" && "Miền Nam (HCM)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={visaType === "passport" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
                    {/* Applicants Counter */}
                    <div className="space-y-1">
                      <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Số lượng khách cần làm</label>
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-2 justify-between h-[42px] w-full md:max-w-[200px]">
                        <button
                          type="button"
                          disabled={visaPax <= 1}
                          onClick={() => setVisaPax(visaPax - 1)}
                          className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-slate-800 font-bold text-xs">{visaPax} Khách</span>
                        <button
                          type="button"
                          onClick={() => setVisaPax(visaPax + 1)}
                          className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    {/* Passport Processing Speed (Only visible when visaType === "passport") */}
                    {visaType === "passport" && (
                      <div className="space-y-1">
                        <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Loại dịch vụ</label>
                        <div className="grid grid-cols-2 gap-2 h-[42px] items-center">
                          {[
                            { id: "normal", label: "Làm bình thường" },
                            { id: "urgent", label: "Làm gấp" }
                          ].map((speed) => (
                            <button
                              type="button"
                              key={speed.id}
                              onClick={() => setPassportSpeed(speed.id as any)}
                              className={`h-[42px] border rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                                passportSpeed === speed.id
                                  ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {speed.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Search button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-base rounded-xl py-3.5 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] transition-all cursor-pointer mt-2"
                  >
                    <Search className="w-5 h-5 mr-2" /> Kiểm Tra Dịch Vụ & Báo Giá
                  </button>
                </form>
              )}

              {/* If activeTab is fasttrack */}
              {activeTab === "fasttrack" && (
                <form onSubmit={triggerServiceSearch} className="space-y-4">
                  {/* Fastrack Type */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Hình thức phục vụ</label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setFastrackType("arrival")}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${fastrackType === "arrival" ? "bg-[var(--accent)] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        Đón VIP (Ga Đến)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFastrackType("departure")}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${fastrackType === "departure" ? "bg-[var(--accent)] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                      >
                        Tiễn VIP (Ga Đi)
                      </button>
                    </div>
                  </div>

                  {/* Airport & Flight Date Picker */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Sân bay áp dụng</label>
                      <select
                        value={fastrackAirport}
                        onChange={(e) => setFastrackAirport(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-[var(--accent)] text-xs h-[42px]"
                      >
                        <option value="SGN">Tân Sơn Nhất (SGN) - TP. HCM</option>
                        <option value="HAN">Nội Bài (HAN) - Hà Nội</option>
                        <option value="DAD">Đà Nẵng (DAD) - Đà Nẵng</option>
                        <option value="CXR">Cam Ranh (CXR) - Nha Trang</option>
                        <option value="PQC">Phú Quốc (PQC) - Kiên Giang</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <DatePickerWithLunar 
                        label="Ngày sử dụng"
                        selectedDate={fastrackDate}
                        onChange={setFastrackDate}
                        minDate={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  {/* Flight Number & Passengers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Số hiệu chuyến bay</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: SQ186, VN213..."
                        value={fastrackFlightNo}
                        onChange={(e) => setFastrackFlightNo(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs h-[42px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Số lượng khách</label>
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-2 justify-between h-[42px]">
                        <button
                          type="button"
                          disabled={fastrackPax <= 1}
                          onClick={() => setFastrackPax(fastrackPax - 1)}
                          className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-slate-800 font-bold text-xs">{fastrackPax} Khách</span>
                        <button
                          type="button"
                          onClick={() => setFastrackPax(fastrackPax + 1)}
                          className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Search button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-base rounded-xl py-3.5 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] transition-all cursor-pointer mt-2"
                  >
                    <Search className="w-5 h-5 mr-2" /> Tra Cứu Dịch Vụ Fastrack
                  </button>
                </form>
              )}

              {/* If activeTab is sim */}
              {activeTab === "sim" && (
                <form onSubmit={triggerServiceSearch} className="space-y-4">
                  {/* Destination Country Autocomplete */}
                  <div className="relative" ref={simCountryContainerRef}>
                    <label className="text-xs text-slate-655 uppercase font-semibold block pl-1 mb-1">Quốc gia du lịch</label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-[var(--accent)] transition-colors min-h-[50px]">
                      <Globe className="text-[var(--accent)] w-5 h-5 mr-2.5 shrink-0" />
                      <div className="text-left w-full relative">
                        {isSimCountryFocused ? (
                          <input 
                            type="text"
                            autoFocus
                            placeholder="Nhập tên nước cần đi (Ví dụ: Thái Lan, Nhật Bản...)"
                            value={simCountryQuery}
                            onChange={(e) => setSimCountryQuery(e.target.value)}
                            className="bg-transparent text-slate-800 font-semibold text-xs outline-none w-full border-none p-0 focus:ring-0 placeholder-slate-400"
                          />
                        ) : (
                          <div 
                            onClick={() => {
                              setShowSimCountryDropdown(true);
                              setIsSimCountryFocused(true);
                            }}
                            className="cursor-pointer select-none text-xs text-slate-800 font-semibold"
                          >
                            {simCountry}
                          </div>
                        )}
                      </div>
                      <ChevronDown className="text-slate-400 w-4 h-4 ml-1 shrink-0" />
                    </div>

                    {showSimCountryDropdown && (
                      <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                        {getFilteredSimCountries(simCountryQuery).length > 0 ? (
                          getFilteredSimCountries(simCountryQuery).map((country) => (
                            <div
                              key={country}
                              onClick={() => {
                                  setSimCountry(country);
                                  setShowSimCountryDropdown(false);
                                  setIsSimCountryFocused(false);
                                  setSimCountryQuery("");
                              }}
                              className={`p-2.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-xs border-b border-slate-100 ${simCountry === country ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-slate-800"}`}
                            >
                              <span>{country}</span>
                              <span className="font-bold text-[var(--accent)] text-[9px] bg-slate-100 px-1.5 py-0.5 rounded shrink-0">Điểm đến</span>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-[10px] text-slate-500 text-center">Không tìm thấy quốc gia</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Sim Type & Date Picker */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-655 uppercase font-semibold block pl-1">Loại Sim yêu cầu</label>
                      <div className="grid grid-cols-2 gap-1 p-1 bg-slate-50 border border-slate-200 rounded-xl h-[42px] items-center">
                        <button
                          type="button"
                          onClick={() => setSimType("esim")}
                          className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${simType === "esim" ? "bg-[var(--accent)] text-white shadow-sm" : "text-slate-655 hover:text-slate-900"}`}
                        >
                          eSIM (Mã QR)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSimType("physical")}
                          className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${simType === "physical" ? "bg-[var(--accent)] text-white shadow-sm" : "text-slate-655 hover:text-slate-900"}`}
                        >
                          SIM vật lý
                        </button>
                      </div>
                    </div>
                    <div className="w-full">
                      <DatePickerWithLunar 
                        label="Ngày kích hoạt Sim"
                        selectedDate={simDate}
                        onChange={setSimDate}
                        minDate={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Số lượng mua</label>
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-2 justify-between h-[42px] max-w-[200px]">
                      <button
                        type="button"
                        disabled={simQty <= 1}
                        onClick={() => setSimQty(simQty - 1)}
                        className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-slate-800 font-bold text-xs">{simQty} SIM</span>
                      <button
                        type="button"
                        onClick={() => setSimQty(simQty + 1)}
                        className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Submit Search button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-base rounded-xl py-3.5 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] transition-all cursor-pointer mt-2"
                  >
                    <Search className="w-5 h-5 mr-2" /> Tìm Kiếm Gói Cước SIM
                  </button>
                </form>
              )}

              {/* If activeTab is B2B */}
              {activeTab === "b2b" && (
                <form onSubmit={handleB2bSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Tên công ty / Tổ chức *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Công ty Cổ phần FPT / Vingroup..." 
                      value={b2bCompanyName}
                      onChange={(e) => setB2bCompanyName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Họ và tên người đại diện liên hệ *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Nguyễn Văn A" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Số điện thoại liên hệ *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="09xx xxx xxx" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Điểm đến dự kiến</label>
                      <input 
                        type="text" 
                        placeholder="Hà Nội, Phú Quốc, hoặc nước ngoài..." 
                        value={b2bDestination}
                        onChange={(e) => setB2bDestination(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Số lượng khách dự kiến</label>
                      <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 rounded-xl p-2 justify-between h-[42px]">
                        <button
                          type="button"
                          disabled={b2bPax <= 1}
                          onClick={() => setB2bPax(b2bPax - 1)}
                          className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-slate-800 font-bold text-xs">{b2bPax} khách</span>
                        <button
                          type="button"
                          onClick={() => setB2bPax(b2bPax + 1)}
                          className="w-7 h-7 rounded-full border border-slate-200 text-slate-707 flex items-center justify-center hover:bg-slate-50 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-655 uppercase font-semibold block pl-1">Yêu cầu chi tiết (chặng bay, loại dịch vụ...)</label>
                    <textarea 
                      rows={2}
                      placeholder="Ví dụ: Đặt vé đoàn đi Nha Trang khứ hồi 20 người, cần xuất hóa đơn công ty..."
                      value={serviceNote}
                      onChange={(e) => setServiceNote(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold resize-none"
                    />
                  </div>

                  {/* Submit B2B button */}
                  <button
                    type="submit"
                    disabled={isServiceSubmitting}
                    className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-base rounded-xl py-3.5 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] transition-all cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {isServiceSubmitting ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Đang gửi yêu cầu...</>
                    ) : (
                      <><Send className="w-5 h-5 mr-2" /> Gửi Yêu Cầu Báo Giá Doanh Nghiệp</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          ) : searchState === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[350px]"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Circular spinner */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/20 border-t-[var(--accent)]"
                />
                
                {/* Animated Pulsing Icon */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  {activeTab === "hotel" ? (
                    <Hotel className="w-8 h-8 text-[var(--accent)]" />
                  ) : activeTab === "visa" ? (
                    <FileText className="w-8 h-8 text-[var(--accent)]" />
                  ) : activeTab === "fasttrack" ? (
                    <Shield className="w-8 h-8 text-[var(--accent)]" />
                  ) : activeTab === "sim" ? (
                    <Wifi className="w-8 h-8 text-[var(--accent)]" />
                  ) : (
                    <Plane className="w-8 h-8 text-[var(--accent)] rotate-45" />
                  )}
                </motion.div>
              </div>

              <div className="space-y-2 max-w-sm">
                <h3 className="text-xl font-bold text-slate-800">
                  {activeTab === "hotel" 
                    ? "Đang tìm kiếm khách sạn" 
                    : activeTab === "visa"
                    ? "Đang chuẩn bị hồ sơ visa"
                    : activeTab === "fasttrack"
                    ? "Đang xử lý yêu cầu Fastrack"
                    : activeTab === "sim"
                    ? "Đang tìm kiếm SIM du lịch"
                    : "Đang tìm kiếm chuyến bay"
                  }
                </h3>
                <p className="text-slate-500 text-sm h-6 animate-pulse">
                  {getLoadingTexts()[loadingTextIndex]}
                </p>
              </div>
            </motion.div>
          ) : searchState === "results" ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              {activeTab === "flight" && (
                <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-2">
                <button 
                  onClick={() => setSearchState("input")}
                  className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Tìm kiếm khác
                </button>
                <div className="text-right min-w-0 pr-1">
                  {bookingType !== "multi-city" ? (
                    <>
                      <div className="text-sm font-bold text-slate-800 whitespace-nowrap truncate">{departure.code} &rarr; {arrival.code}</div>
                      <div className="text-[10px] text-slate-500 whitespace-nowrap">{departureDate}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm font-bold text-slate-800 whitespace-nowrap truncate">Multi-Leg Itinerary</div>
                      <div className="text-[10px] text-slate-500 whitespace-nowrap">{legs.length} chặng bay</div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {mockFlights.map((flight) => (
                  <div 
                    key={flight.id}
                    className="p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-xl flex items-center justify-between transition-all group gap-2"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      {/* Logo Mock */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 select-none ${flight.logoColor}`}>
                        {flight.airline.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-800 text-sm group-hover:text-[var(--accent)] transition-colors whitespace-nowrap truncate">{flight.airline}</div>
                        <div className="text-[10px] text-slate-500 whitespace-nowrap truncate">{flight.flightNo} • {flight.class}</div>
                      </div>
                    </div>

                    <div className="text-center hidden sm:block shrink-0">
                      <div className="font-bold text-slate-800 text-sm whitespace-nowrap">{flight.depTime} - {flight.arrTime}</div>
                      <div className="text-[10px] text-slate-500 whitespace-nowrap">{flight.duration}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-extrabold text-[var(--accent)] whitespace-nowrap">
                        {flight.price.toLocaleString("vi-VN")} ₫
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedFlight(flight);
                          setSearchState("contact");
                        }}
                        className="mt-1 bg-[var(--accent)] text-white font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-[#4291b8] transition-all cursor-pointer"
                      >
                        Chọn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-2">
                <span>* Giá vé đã bao gồm thuế phí dịch vụ đại lý</span>
              </div>
            </motion.div>
              )}

              {/* Visa, Fastrack, Sim results options */}
              {(activeTab === "visa" || activeTab === "fasttrack" || activeTab === "sim") && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-2">
                    <button 
                      onClick={() => setSearchState("input")}
                      className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> Tìm kiếm khác
                    </button>
                    <div className="text-right min-w-0 pr-1">
                      {activeTab === "visa" && (
                        <>
                          <div className="text-sm font-bold text-slate-800 whitespace-nowrap truncate font-be">
                            {visaType === "visa" ? `Visa đi ${visaCountry}` : `Hộ Chiếu (${passportSubtype === "new" ? "Làm mới" : passportSubtype === "renew" ? "Gia hạn" : "Mất làm lại"})`}
                          </div>
                          <div className="text-[10px] text-slate-500 whitespace-nowrap">
                            Khu vực: {visaRegion === "miền bắc" ? "Miền Bắc" : visaRegion === "miền trung" ? "Miền Trung" : "Miền Nam"} • {visaPax} khách
                          </div>
                        </>
                      )}
                      {activeTab === "fasttrack" && (
                        <>
                          <div className="text-sm font-bold text-slate-800 whitespace-nowrap truncate font-be">
                            Fastrack VIP tại sân bay {fastrackAirport}
                          </div>
                          <div className="text-[10px] text-slate-500 whitespace-nowrap">
                            Ngày: {fastrackDate} • {fastrackPax} khách
                          </div>
                        </>
                      )}
                      {activeTab === "sim" && (
                        <>
                          <div className="text-sm font-bold text-slate-800 whitespace-nowrap truncate font-be">
                            SIM/eSIM du lịch đi {simCountry}
                          </div>
                          <div className="text-[10px] text-slate-500 whitespace-nowrap">
                            Loại: {simType === "esim" ? "eSIM (Mã QR)" : "SIM vật lý"} • {simQty} SIM
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {(activeTab === "visa" ? getVisaOptions() : activeTab === "fasttrack" ? getFastrackOptions() : getSimOptions()).map((option) => (
                      <div 
                        key={option.name}
                        className="p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between transition-all group gap-4"
                      >
                        <div className="space-y-2 min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-slate-800 text-sm group-hover:text-[var(--accent)] transition-colors">{option.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-light">{option.description}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                            {option.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start text-[10px] text-slate-600 font-medium">
                                <Check className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                          <div className="text-sm font-black text-[var(--accent)]">
                            {option.price.toLocaleString("vi-VN")} ₫
                            <span className="text-[10px] text-slate-450 font-normal">
                              {activeTab === "visa" ? " / khách" : activeTab === "fasttrack" ? " / khách" : " / bộ"}
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              setSelectedServiceOption(option);
                              setSearchState("contact");
                            }}
                            className="mt-1 bg-[var(--accent)] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#4291b8] transition-all cursor-pointer h-[34px]"
                          >
                            Chọn gói
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : searchState === "contact" ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              {activeTab === "flight" && selectedFlight && (
                <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <button 
                  onClick={() => setSearchState("results")}
                  className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Đổi chuyến bay
                </button>
                <span className="text-[10px] font-semibold bg-slate-100 px-2.5 py-1 rounded-full text-slate-700 whitespace-nowrap">
                  {selectedFlight.airline} {selectedFlight.flightNo}
                </span>
              </div>

              {/* Selected Ticket Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm">
                <div className="flex justify-between font-bold text-slate-800 mb-2 gap-2 text-xs sm:text-sm">
                  {bookingType !== "multi-city" ? (
                    <span className="truncate">Vé Máy Bay: {departure.city} &rarr; {arrival.city}</span>
                  ) : (
                    <span className="truncate">Vé Máy Bay Nhiều Chặng ({legs.length} chặng)</span>
                  )}
                  <span className="text-[var(--accent)] shrink-0 whitespace-nowrap">{(selectedFlight.price * (adults + children) + selectedFlight.price * 0.1 * infants).toLocaleString("vi-VN")} ₫</span>
                </div>
                <div className="text-slate-600 space-y-1 text-xs">
                  <div>• Hãng: {selectedFlight.airline} ({selectedFlight.class})</div>
                  {bookingType !== "multi-city" ? (
                    <>
                      <div>• Khởi hành: {departureDate} lúc {selectedFlight.depTime}</div>
                      {bookingType === "round-trip" && <div>• Ngày về: {returnDate}</div>}
                    </>
                  ) : (
                    <div className="pl-2 border-l border-slate-200 space-y-0.5 mt-1">
                      {legs.map((leg, idx) => (
                        <div key={leg.id}>- Chặng {idx+1}: {leg.departure.city} &rarr; {leg.arrival.city} ({leg.departureDate})</div>
                      ))}
                    </div>
                  )}
                  <div>• Số hành khách: {totalPassengers} người ({adults} ADT, {children} CHD, {infants} INF)</div>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <h4 className="font-bold text-slate-800 text-sm">Thông tin liên hệ & Đặt chỗ</h4>
                
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-600 uppercase block pl-1">Họ và tên khách đại diện *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Nguyễn Văn A" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-600 uppercase block pl-1">Số điện thoại liên hệ *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="09xx xxx xxx" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-600 uppercase block pl-1">Email nhận vé điện tử</label>
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-lg rounded-xl py-4 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] disabled:opacity-50 transition-all cursor-pointer mt-4"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Đang xử lý giữ chỗ...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-2" /> Hoàn Tất Đặt Vé & Giữ Chỗ</>
                  )}
                </button>
              </form>
            </motion.div>
              )}

              {/* Service contact form (Visa, Fastrack, Sim) */}
              {(activeTab === "visa" || activeTab === "fasttrack" || activeTab === "sim") && selectedServiceOption && (
                <>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                    <button 
                      onClick={() => setSearchState("results")}
                      className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" /> Chọn gói khác
                    </button>
                    <span className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700 whitespace-nowrap">
                      {selectedServiceOption.name}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-sm">
                    <div className="flex justify-between font-extrabold text-slate-800 mb-2 gap-2 text-xs sm:text-sm">
                      <span>Dịch Vụ Chọn: {selectedServiceOption.name}</span>
                      <span className="text-[var(--accent)] whitespace-nowrap">
                        {activeTab === "visa" 
                          ? (selectedServiceOption.price * visaPax).toLocaleString("vi-VN") 
                          : activeTab === "fasttrack"
                          ? (selectedServiceOption.price * fastrackPax).toLocaleString("vi-VN")
                          : (selectedServiceOption.price * simQty).toLocaleString("vi-VN")
                        } ₫
                      </span>
                    </div>
                    <div className="text-slate-600 space-y-1.5 text-xs font-medium pl-1">
                      {activeTab === "visa" && (
                        <>
                          {visaType === "visa" ? (
                            <>
                              <div>• Quốc gia: {visaCountry}</div>
                              <div>• Mục đích xin visa: {visaPurpose === "tourism" ? "Du lịch" : visaPurpose === "study" ? "Du học" : visaPurpose === "visit" ? "Thăm thân" : "Đoàn tụ"}</div>
                            </>
                          ) : (
                            <>
                              <div>• Yêu cầu hộ chiếu: {passportSubtype === "new" ? "Làm mới" : passportSubtype === "renew" ? "Gia hạn" : "Mất hộ chiếu làm lại"}</div>
                              <div>• Loại dịch vụ: {passportSpeed === "normal" ? "Làm bình thường" : "Làm gấp"}</div>
                            </>
                          )}
                          <div>• Khu vực hỗ trợ: {visaRegion === "miền bắc" ? "Miền Bắc (Hà Nội)" : visaRegion === "miền trung" ? "Miền Trung (Đà Nẵng)" : "Miền Nam (TP. HCM)"}</div>
                          <div>• Số lượng: {visaPax} người đăng ký</div>
                        </>
                      )}
                      {activeTab === "fasttrack" && (
                        <>
                          <div>• Sân bay áp dụng: Sân bay {fastrackAirport}</div>
                          <div>• Loại hình đón tiễn: {fastrackType === "arrival" ? "Đón VIP (Ga Đến)" : "Tiễn VIP (Ga Đi)"}</div>
                          <div>• Ngày sử dụng: {fastrackDate} {fastrackFlightNo ? `• Chuyến bay: ${fastrackFlightNo.toUpperCase()}` : ""}</div>
                          <div>• Số lượng khách: {fastrackPax} người</div>
                        </>
                      )}
                      {activeTab === "sim" && (
                        <>
                          <div>• Quốc gia đi: {simCountry}</div>
                          <div>• Loại SIM: {simType === "esim" ? "eSIM (Nhận QR qua Email/Zalo)" : "SIM vật lý (Giao nhận/Giao tại quầy)"}</div>
                          <div>• Ngày kích hoạt: {simDate}</div>
                          <div>• Số lượng đặt mua: {simQty} SIM</div>
                        </>
                      )}
                    </div>
                  </div>

                  <form 
                    onSubmit={
                      activeTab === "visa" 
                        ? handleVisaSubmit 
                        : activeTab === "fasttrack"
                        ? handleFastrackSubmit
                        : handleSimSubmit
                    } 
                    className="space-y-4"
                  >
                    <h4 className="font-extrabold text-slate-800 text-sm">Thông tin liên hệ nhận tư vấn & đặt lịch</h4>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Họ và tên của bạn *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Nguyễn Văn A" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-650 uppercase font-semibold block pl-1">Số điện thoại liên hệ *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="09xx xxx xxx" 
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-600 uppercase font-semibold block pl-1">Email nhận vé điện tử / mã QR</label>
                        <input 
                          type="email" 
                          placeholder="name@company.com" 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-605 uppercase font-semibold block pl-1">Yêu cầu cụ thể hoặc Địa chỉ nhận SIM (nếu có)</label>
                      <textarea 
                        rows={2}
                        placeholder="Nhập ghi chú yêu cầu cụ thể của bạn..."
                        value={serviceNote}
                        onChange={(e) => setServiceNote(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-[var(--accent)] focus:bg-white text-xs font-semibold resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isServiceSubmitting}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-[var(--accent)] to-[#4291b8] text-white font-bold text-base rounded-xl py-3.5 hover:shadow-[0_0_20px_rgba(0,91,150,0.2)] disabled:opacity-50 transition-all cursor-pointer mt-4"
                    >
                      {isServiceSubmitting ? (
                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Đang gửi yêu cầu...</>
                      ) : (
                        <><Send className="w-4 h-4 mr-2" /> Hoàn Tất Đăng Ký Dịch Vụ</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          ) : searchState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center space-y-6"
            >
              {activeTab === "flight" && selectedFlight ? (
                <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">Giữ Chỗ Thành Công!</h3>
                <p className="text-green-700 text-xs max-w-md mx-auto">
                  Mã giữ chỗ (PNR) tạm thời của bạn là <strong className="text-[var(--accent)]">ABT{Math.floor(Math.random()*900000)+100000}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-left space-y-2 max-w-md mx-auto">
                <div className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-2">Thông tin chuyến bay:</div>
                <div className="grid grid-cols-2 gap-y-2 text-slate-600 text-xs">
                  <span>Hãng bay:</span> <span className="font-semibold text-slate-800 truncate">{selectedFlight.airline}</span>
                  <span>Mã hiệu:</span> <span className="font-semibold text-slate-800">{selectedFlight.flightNo}</span>
                  {bookingType !== "multi-city" ? (
                    <>
                      <span>Hành trình:</span> <span className="font-semibold text-slate-800 whitespace-nowrap">{departure.code} &rarr; {arrival.code}</span>
                      <span>Khởi hành:</span> <span className="font-semibold text-slate-800 whitespace-nowrap">{departureDate} • {selectedFlight.depTime}</span>
                    </>
                  ) : (
                    <>
                      <span>Hành trình:</span> <span className="font-semibold text-slate-800 whitespace-nowrap">{legs.length} chặng bay</span>
                      <span>Khởi hành:</span> <span className="font-semibold text-slate-800 whitespace-nowrap">{legs[0].departureDate} (Chặng 1)</span>
                    </>
                  )}
                  <span>Số khách:</span> <span className="font-semibold text-slate-800">{totalPassengers} người ({adults} ADT, {children} CHD, {infants} INF)</span>
                  <span>Người liên hệ:</span> <span className="font-semibold text-slate-800 truncate">{contactName} ({contactPhone})</span>
                </div>
              </div>

              <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                Yêu cầu giữ chỗ đã được đồng bộ với hệ thống. Chuyên viên chăm sóc khách hàng VIP của ABTRIP sẽ gọi điện xác nhận và hướng dẫn xuất vé chính thức trong vòng 5 phút.
              </p>

              <button 
                onClick={() => {
                  setSearchState("input");
                  setSelectedFlight(null);
                  setContactName("");
                  setContactPhone("");
                  setContactEmail("");
                  setInfants(0);
                  setLegs([
                    {
                      id: "leg-1",
                      departure: AIRPORTS[0],
                      arrival: AIRPORTS[1],
                      departureDate: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 5);
                        return d.toISOString().split("T")[0];
                      })(),
                      depQuery: "",
                      arrQuery: "",
                      showDepDropdown: false,
                      showArrDropdown: false,
                      isDepFocused: false,
                      isArrFocused: false
                    },
                    {
                      id: "leg-2",
                      departure: AIRPORTS[1],
                      arrival: AIRPORTS[2],
                      departureDate: (() => {
                        const d = new Date();
                        d.setDate(d.getDate() + 8);
                        return d.toISOString().split("T")[0];
                      })(),
                      depQuery: "",
                      arrQuery: "",
                      showDepDropdown: false,
                      showArrDropdown: false,
                      isDepFocused: false,
                      isArrFocused: false
                    }
                  ]);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-6 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                Về Trang Tìm Vé
              </button>
            </motion.div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">
                      {activeTab === "b2b" ? "Gửi Yêu Cầu Thành Công!" : "Đặt Dịch Vụ Thành Công!"}
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Cảm ơn quý khách đã tin dùng dịch vụ của <strong className="text-[var(--accent)]">abtrip.vn</strong>.
                    </p>
                    {activeTab === "b2b" ? (
                      <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                        Yêu cầu giải pháp doanh nghiệp cho <strong className="text-[var(--accent)]">{b2bCompanyName || "đơn vị của bạn"}</strong> đã được ghi nhận. Chuyên viên mảng B2B của chúng tôi sẽ liên hệ lại qua SĐT <strong className="text-slate-850 font-semibold">{contactPhone}</strong> trong vòng 5-10 phút để gửi báo giá chi tiết.
                      </p>
                    ) : (
                      <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                        Yêu cầu dịch vụ <strong className="text-[var(--accent)]">{selectedServiceOption?.name}</strong> đã được lưu nhận. Chuyên viên của chúng tôi sẽ liên hệ lại qua SĐT <strong className="text-slate-850 font-semibold">{contactPhone}</strong> trong vòng 10-15 phút để tư vấn hồ sơ và hoàn tất đặt chỗ.
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchState("input");
                      setIsServiceSuccess(false);
                      setSelectedServiceOption(null);
                      setContactName("");
                      setContactPhone("");
                      setContactEmail("");
                      setServiceNote("");
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Quay lại Tìm kiếm
                  </button>
                </>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
