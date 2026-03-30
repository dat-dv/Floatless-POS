"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  XCircle,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  Box,
  Calculator,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WhyPage() {
  const [wrongInput, setWrongInput] = useState<number | string>("");
  const [rightInput, setRightInput] = useState<string>("");

  const [demoPrice, setDemoPrice] = useState<string>("9007199254740991");
  const [demoQty, setDemoQty] = useState<string>("5.5");

  const parseToBigIntScale = (valString: string) => {
    if (!valString) return BigInt(0);
    const [intPart, fracPart = ""] = valString.split(".");
    const paddedFrac = fracPart.padEnd(6, "0").slice(0, 6);
    return BigInt(intPart + paddedFrac);
  };

  const formatBigInt = (val: bigint) => {
    const strVal = val.toString();
    const isNeg = strVal.startsWith("-");
    const absStr = isNeg ? strVal.slice(1) : strVal;
    const padded = absStr.padStart(7, "0");
    const intPart = padded.slice(0, -6);
    const fracPart = padded.slice(-6).replace(/0+$/, "");
    return (isNeg ? "-" : "") + intPart + (fracPart ? "." + fracPart : "");
  };

  const demoWrongResult = Number(demoPrice) * Number(demoQty);

  const SCALE = BigInt(1000000);
  const demoBigPrice = parseToBigIntScale(demoPrice);
  const demoBigQty = parseToBigIntScale(demoQty);
  const demoRightResult = (demoBigPrice * demoBigQty) / SCALE;

  const handleRightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Ngăn chặn các ký tự không phải số, ngoài trừ dấu chấm
    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setRightInput(val);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-6 md:p-12 font-sans selection:bg-rose-500 selection:text-white">
      <Link href="/">
        <motion.div
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Quay lại ứng dụng
        </motion.div>
      </Link>

      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Xử lý số liệu tài chính trong JavaScript
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-2xl leading-relaxed">
            Khi làm việc với tiền tệ, từ khâu nhập liệu trên giao diện (UI) cho
            đến tính toán logic đều cần kiến trúc đặc biệt. Dưới đây là các sai
            lầm phổ biến và cách khắc phục định chuẩn quốc tế.
          </p>
        </header>

        {/* PHẦN 1: SHOWCASE INPUT */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold tracking-tight mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            1. Khâu Nhập liệu (UI Component)
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* INPUT SAI */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm flex flex-col transition-shadow hover:shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-1">
                    Cách làm sai
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Sử dụng {'<input type="number" />'}
                  </p>
                </div>
                <XCircle className="text-red-500" size={24} />
              </div>

              <div className="mb-6 space-y-2">
                <input
                  type="number"
                  value={wrongInput}
                  onChange={(e) =>
                    setWrongInput(e.target.valueAsNumber || e.target.value)
                  }
                  placeholder="Thử nhập 9999999999999999..."
                  className="w-full h-12 px-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
                <div className="text-xs text-zinc-500 flex items-center justify-between">
                  <span>Giá trị State (Browser Parse):</span>
                  <span className="font-mono text-red-600 dark:text-red-400 font-bold max-w-[200px] truncate">
                    {wrongInput.toString() || '""'}
                  </span>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-2xl font-mono flex flex-col gap-2 text-xs md:text-sm border border-red-100 dark:border-red-900/50 mb-6 overflow-x-auto">
                <div className="text-zinc-500">{`// Giao phó hoàn toàn cho Browser:`}</div>
                <div className="text-zinc-700 dark:text-zinc-300 whitespace-pre">
                  {`<input
  type="number"
  onChange={e => {
    // Giá trị đã bị ép tròn/biến đổi sai lệch
    setNum(e.target.valueAsNumber)
  }}
/>`}
                </div>
              </div>

              <ul className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow space-y-3 leading-relaxed">
                <li className="flex gap-2 items-start">
                  <AlertTriangle
                    className="text-red-500 shrink-0 mt-0.5"
                    size={14}
                  />{" "}
                  <span>
                    <strong>Trượt cuộn chuột:</strong> Vô tình lăn chuột trên
                    input làm nhảy số sai lệch.
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <AlertTriangle
                    className="text-red-500 shrink-0 mt-0.5"
                    size={14}
                  />{" "}
                  <span>
                    <strong>Giới hạn an toàn:</strong> Nhập số dài (VD: 16 chữ
                    số 9 khổng lồ), Browser tự ép tròn thành 10000000000000000
                    làm mất độ chính xác vĩnh viễn (Limit của Float64).
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <AlertTriangle
                    className="text-red-500 shrink-0 mt-0.5"
                    size={14}
                  />{" "}
                  <span>
                    Nhập thập phân: Trình duyệt có thể tự xoá luôn phần số 0 lẻ
                    phía sau (10.0 -&gt; 10).
                  </span>
                </li>
              </ul>
            </div>

            {/* INPUT ĐÚNG */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col transition-shadow hover:shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    Cách làm đúng
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Sử dụng {'<input type="text" inputMode="decimal" />'}
                  </p>
                </div>
                <CheckCircle2 className="text-emerald-500" size={24} />
              </div>

              <div className="mb-6 space-y-2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={rightInput}
                  onChange={handleRightInput}
                  placeholder="Nhập thoải mái số và thập phân..."
                  className="w-full h-12 px-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <div className="text-xs text-zinc-500 flex items-center justify-between">
                  <span>Giá trị State (String thô):</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold max-w-[200px] truncate">
                    {rightInput || '""'}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-2xl font-mono flex flex-col gap-2 text-xs border border-emerald-100 dark:border-emerald-900/50 mb-6 overflow-x-auto">
                <div className="text-zinc-500">{`// Giải pháp xử lý (Regex & String):`}</div>
                <div className="text-zinc-700 dark:text-zinc-300 whitespace-pre">
                  {`const handleChange = (e) => {
  const val = e.target.value;
  // Chỉ cho phép số và dấu chấm
  if (val === "" || /^[0-9]*\\.?[0-9]*$/.test(val)) {
    setStringValue(val);
  }
};

<input
  type="text"
  inputMode="decimal"
  onChange={handleChange}
/>`}
                </div>
              </div>

              <ul className="text-sm text-zinc-600 dark:text-zinc-400 flex-grow space-y-3 leading-relaxed">
                <li className="flex gap-2 items-start">
                  <CheckCircle2
                    className="text-emerald-500 shrink-0 mt-0.5"
                    size={14}
                  />{" "}
                  <span>
                    <strong>Kiểm soát hoàn toàn (Regex):</strong> Chặn mọi kí tự
                    lạ ngoài số và dấu chấm, miễn nhiễm việc cuộn chuột gây sai
                    lệch.
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2
                    className="text-emerald-500 shrink-0 mt-0.5"
                    size={14}
                  />{" "}
                  <span>
                    <strong>Hoàn hảo cho BigInt:</strong> Lưu trữ dữ liệu thô
                    dưới dạng String. Vượt qua giới hạn MAX_SAFE_INTEGER để sẵn
                    sàng convert sang chuỗi BigInt nguyên thủy.
                  </span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2
                    className="text-emerald-500 shrink-0 mt-0.5"
                    size={14}
                  />{" "}
                  <span>
                    <strong>UX trên Mobile:</strong>{" "}
                    <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                      inputMode=&quot;decimal&quot;
                    </code>{" "}
                    vẫn kích hoạt bàn phím số (Numpad) hệt như Number Input.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PHẦN 2: SHOWCASE PARSER */}
        <div className="flex flex-col gap-6 mt-8">
          <h2 className="text-xl font-bold tracking-tight mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            2. Khâu Chuyển đổi (Parser String -&gt; BigInt)
          </h2>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Bạn không được phép dùng{" "}
              <code className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-md font-mono">
                parseFloat()
              </code>{" "}
              hay{" "}
              <code className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-md font-mono">
                Number()
              </code>{" "}
              để ép chuỗi về số trước khi đổi qua BigInt, vì nó sẽ lại vướng vào
              sai số Float64. Cách duy nhất để biến Input String thành Số là{" "}
              <strong>cắt xén chuỗi (String Manipulation)</strong> và bù đắp các
              số 0 đằng sau theo hệ số Scaling ($10^6$).
            </p>

            <div className="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-2xl font-mono text-sm border border-slate-200 dark:border-slate-800/50 overflow-x-auto">
              <div className="text-zinc-500 mb-2">{`// Hàm an toàn tuyệt đối để Scale chuỗi "19.99" thành 19990000n`}</div>
              <div className="text-zinc-800 dark:text-zinc-300 whitespace-pre">
                {`const parseToBigIntScale = (valString) => {
  if (!valString) return 0n;

  // 1. Tách chuỗi thành 2 mảnh: phần nguyên và phần thập phân
  const [intPart, fracPart = ""] = valString.split(".");

  // 2. Cố định phần thập phân có đúng 6 chữ số (Scale 10^6)
  // Ví dụ: .99 -> .990000 (bù thêm 4 con số 0)
  const paddedFrac = fracPart.padEnd(6, "0").slice(0, 6);

  // 3. Ghép hai chuỗi lại với nhau và Parse trực tiếp
  // Bỏ qua hoàn toàn phép thập phân của Javascript!
  // "19" + "990000" -> 19990000n
  return BigInt(intPart + paddedFrac);
};`}
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-4 items-start text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 px-6 py-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 shrink-0 mt-0.5">
                <CheckCircle2 size={18} /> Điểm chốt:
              </div>
              <ul className="space-y-3 list-none">
                <li className="leading-relaxed">
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    1. Miễn nhiễm Float64:
                  </strong>{" "}
                  Vì mọi logic biến đổi chỉ dùng phép nối chữ (String
                  Concatenation), nên <strong>không bao giờ</strong> xuất hiện
                  dư âm thập phân dạng ngầm{" "}
                  <code className="text-xs bg-zinc-200/50 dark:bg-zinc-700/50 px-1 py-0.5 rounded font-mono">
                    0.000000000000004
                  </code>{" "}
                  như các hàm Parse số cổ điển.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    2. Bất tử trước MAX_SAFE_INTEGER:
                  </strong>{" "}
                  Nếu người dùng nhập{" "}
                  <code className="text-xs bg-zinc-200/50 dark:bg-zinc-700/50 px-1 py-0.5 rounded font-mono">
                    &quot;99999999999999999.99&quot;
                  </code>
                  , thao tác cắt ghép String chả hề hấn gì. Sau đó, việc chuyền
                  thẳng String vào mồm{" "}
                  <code className="text-xs bg-zinc-200/50 dark:bg-zinc-700/50 px-1 py-0.5 rounded font-mono">
                    BigInt()
                  </code>{" "}
                  sẽ giúp nuốt gọn lượng chữ số vô cực mà Number mặc định sẽ
                  khiến trình duyệt treo hoặc làm méo dữ liệu.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PHẦN 3: SHOWCASE TÍNH TOÁN */}
        <div className="flex flex-col gap-6 mt-8">
          <h2 className="text-xl font-bold tracking-tight mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
            3. Khâu Tính Toán (Logic)
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* CÁCH LÀM SAI */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm flex flex-col transition-shadow hover:shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-1">
                    Cách làm sai
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Sử dụng JavaScript Number tiêu chuẩn
                  </p>
                </div>
                <XCircle className="text-red-500" size={28} />
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 flex-grow leading-relaxed">
                JavaScript sử dụng số thực dấu phẩy động 64-bit (IEEE 754). Hệ
                nhị phân không thể biểu diễn chính xác các phân số thập phân
                (như 0.1), dẫn đến sai lệch làm tròn khi thực hiện tính toán.
              </p>

              <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-2xl font-mono text-sm border border-red-100 dark:border-red-900/50">
                <div className="text-zinc-400 dark:text-zinc-500 mb-4">{`// Ví dụ thực tế về sai số:`}</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      console.log(0.1 + 0.2);
                    </div>
                    <div className="text-red-600 dark:text-red-400 font-bold mt-1">
                      {"->"} 0.30000000000000004
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      const price = 19.99;
                    </div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      const tax = 0.0825; // 8.25%
                    </div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      console.log(price * (1 + tax));
                    </div>
                    <div className="text-red-600 dark:text-red-400 font-bold mt-1">
                      {"->"} 21.639175000000003
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100/50 dark:bg-red-900/20 px-5 py-4 rounded-xl">
                <span className="font-bold">Hậu quả:</span> Lỗi làm tròn tích
                luỹ gây thất thoát độ chính xác, dẫn đến sai lệch trên quy mô
                lớn của các giao dịch.
              </div>
            </div>

            {/* CÁCH LÀM ĐÚNG */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm flex flex-col transition-shadow hover:shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    Cách làm đúng
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Dùng BigInt với hệ số mở rộng (Scaling)
                  </p>
                </div>
                <CheckCircle2 className="text-emerald-500" size={28} />
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 flex-grow leading-relaxed">
                Để tránh sai số thập phân, thực tiễn tốt nhất là quy đổi số tiền
                về các đơn vị siêu nhỏ (micro-cents) thành số nguyên, sau đó sử
                dụng BigInt để đảm bảo hoàn toàn không bị mất mát dữ liệu.
              </p>

              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-2xl font-mono text-sm border border-emerald-100 dark:border-emerald-900/50">
                <div className="text-zinc-400 dark:text-zinc-500 mb-4">{`// Nhân với hệ số 10^6:`}</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      const SCALE = 1_000_000n;
                    </div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      const price = 19_990_000n;
                    </div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      const tax = 82_500n;
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-700 dark:text-zinc-300">
                      const total = (price * (SCALE + tax)) / SCALE;
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                      {"->"} 21_639_175n
                    </div>
                    <div className="text-zinc-500 mt-1 italic">
                      {"// Định dạng để hiển thị: 21.639175"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm font-medium text-emerald-800 dark:text-emerald-200 bg-emerald-100/50 dark:bg-emerald-900/20 px-5 py-4 rounded-xl">
                Kết quả: Tính toán nguyên vẹn, loại bỏ hoàn toàn khái niệm
                &quot;phần thập phân&quot;, đảm bảo hệ thống tài chính luôn
                chính xác tuyệt đối.
              </div>

              <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 px-5 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                  <Lightbulb size={16} className="text-amber-500" />
                  Tại sao là 10^6? Có thể dùng 10^10 không?
                </div>
                <p className="leading-relaxed">
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    Hoàn toàn được.
                  </strong>{" "}
                  Khác với{" "}
                  <code className="bg-zinc-200/50 dark:bg-zinc-700/50 px-1.5 py-0.5 rounded-md text-xs font-mono">
                    Number
                  </code>{" "}
                  bị giới hạn bởi MAX_SAFE_INTEGER,{" "}
                  <code className="bg-zinc-200/50 dark:bg-zinc-700/50 px-1.5 py-0.5 rounded-md text-xs font-mono">
                    BigInt
                  </code>{" "}
                  hỗ trợ số nguyên lớn với độ dài tuỳ ý. Bạn có thể dùng 10^10
                  hay 10^18 (được dùng nhiều trên Blockchain) mà không lo tràn
                  số. Tuy nhiên, 10^6 (6 chữ số thập phân) thường được chọn làm
                  tiêu chuẩn tối ưu vì nó vừa đủ dung sai cho các phép tính tỷ
                  giá vi mô, vừa không gây lãng phí dung lượng lưu trữ bộ nhớ dư
                  thừa trong Database.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PHẦN 4: VÍ DỤ THỰC TẾ & GỬI BACKEND */}
        <div className="flex flex-col gap-6 mt-8">
          <h2 className="text-xl font-bold tracking-tight mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <Lightbulb className="text-amber-500" />
            4. Thực chiến: Tính tổng tiền & Gửi API
          </h2>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Đơn giá (VND/USD) - Dạng String
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={demoPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val))
                      setDemoPrice(val);
                  }}
                  className="w-full h-12 px-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Số lượng (Quantity) - Dạng String
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={demoQty}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val))
                      setDemoQty(val);
                  }}
                  className="w-full h-12 px-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* JS CŨ */}
              <div className="bg-red-50/50 dark:bg-red-950/10 p-5 rounded-2xl border border-red-100 dark:border-red-900/30">
                <div className="flex gap-2 items-center mb-3">
                  <XCircle className="text-red-500" size={18} />
                  <h3 className="font-bold text-red-700 dark:text-red-400">
                    Phép nhân JS Number
                  </h3>
                </div>
                <div className="font-mono text-xs md:text-sm break-all text-zinc-600 dark:text-zinc-400 space-y-2">
                  <div>
                    {"// "}
                    {demoPrice} * {demoQty}
                  </div>
                  <div className="font-bold text-red-600 dark:text-red-400 text-base mt-2">
                    = {demoWrongResult}
                  </div>
                </div>
                {demoWrongResult > Number.MAX_SAFE_INTEGER && (
                  <div className="mt-3 text-xs bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg break-words leading-relaxed border border-red-200 dark:border-red-800/50">
                    ⚠️ <b>Kết quả bị sai:</b> Giá trị đã vượt{" "}
                    <b>MAX_SAFE_INTEGER</b> (9,007,199,254,740,991). Javascript
                    tự động cắt bỏ phần thập phân hoặc làm tròn sai lệch hàng
                    đơn vị.
                  </div>
                )}
              </div>

              {/* BIGINT TÍNH */}
              <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex gap-2 items-center mb-3">
                  <CheckCircle2 className="text-emerald-500" size={18} />
                  <h3 className="font-bold text-emerald-700 dark:text-emerald-400">
                    Phép nhân BigInt
                  </h3>
                </div>
                <div className="font-mono text-xs md:text-sm break-all text-zinc-600 dark:text-zinc-400 space-y-2">
                  <div>
                    {"// Big Price: "}
                    {demoBigPrice.toString()}n
                  </div>
                  <div>
                    {"// Big Qty: "}
                    {demoBigQty.toString()}n
                  </div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base mt-2">
                    = {formatBigInt(demoRightResult)}
                  </div>
                  <div className="text-[10px] md:text-xs text-zinc-500 mt-2 bg-emerald-100/50 dark:bg-emerald-900/40 px-2 py-1.5 rounded border border-emerald-200 dark:border-emerald-800/50 font-sans">
                    <strong>Trạng thái lưu trữ BigInt:</strong>{" "}
                    {demoRightResult.toString()}n
                  </div>
                </div>
              </div>
            </div>

            {/* GIẢI THÍCH BƯỚC TÍNH TOÁN */}
            <div className="bg-amber-50 dark:bg-amber-950/20 p-5 md:p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-4 flex items-center gap-2">
                <Calculator
                  size={18}
                  className="text-amber-600 dark:text-amber-400"
                />
                Giải mã luồng tính toán (Scale: 1.000.000)
              </h3>

              <div className="space-y-3 font-mono text-xs md:text-sm text-amber-900/80 dark:text-amber-200/80">
                <div className="flex flex-col gap-1 border-b border-amber-200/50 dark:border-amber-900/50 pb-3">
                  <strong className="text-amber-900 dark:text-amber-300 font-sans">
                    1. Chuyển String thành BigInt (Dịch mốc thập phân):
                  </strong>
                  <span className="pl-4 border-l-2 border-amber-300 dark:border-amber-700 ml-1 break-all">
                    &quot;{demoPrice}&quot; ➔ Ngậm 6 số thập phân ➔{" "}
                    <b className="text-indigo-600 dark:text-indigo-400">
                      {demoBigPrice.toString()}n
                    </b>
                  </span>
                  <span className="pl-4 border-l-2 border-amber-300 dark:border-amber-700 ml-1 break-all">
                    &quot;{demoQty}&quot; ➔ Ngậm 6 số thập phân ➔{" "}
                    <b className="text-indigo-600 dark:text-indigo-400">
                      {demoBigQty.toString()}n
                    </b>
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-b border-amber-200/50 dark:border-amber-900/50 pb-3">
                  <strong className="text-amber-900 dark:text-amber-300 font-sans">
                    2. Thực hiện nhân 2 số nguyên siêu lớn (An toàn 100%):
                  </strong>
                  <span className="pl-4 border-l-2 border-amber-300 dark:border-amber-700 ml-1 break-all">
                    {demoBigPrice.toString()}n{" "}
                    <span className="text-amber-600 dark:text-amber-500">
                      ×
                    </span>{" "}
                    {demoBigQty.toString()}n<br />={" "}
                    <b className="text-emerald-700 dark:text-emerald-400">
                      {(demoBigPrice * demoBigQty).toString()}n
                    </b>
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-b border-amber-200/50 dark:border-amber-900/50 pb-3">
                  <strong className="text-amber-900 dark:text-amber-300 font-sans">
                    3. Cân bằng lại tỷ lệ (Do dư 1 lần hệ số 10^6):
                  </strong>
                  <span className="pl-4 border-l-2 border-amber-300 dark:border-amber-700 ml-1 break-all">
                    Tích số / 1,000,000
                    <br />={" "}
                    <b className="text-blue-700 dark:text-blue-400">
                      {demoRightResult.toString()}n
                    </b>{" "}
                    <span className="text-[10px] uppercase bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-1 py-0.5 rounded ml-1 font-sans font-bold">
                      Lưu DB (Micro-cents)
                    </span>
                  </span>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <strong className="text-amber-900 dark:text-amber-300 font-sans">
                    4. Hiển thị lại thành Chuỗi (Parser -{">"} UI):
                  </strong>
                  <span className="pl-4 border-l-2 border-amber-300 dark:border-amber-700 ml-1 break-all flex flex-wrap items-center gap-2">
                    Lùi dấu chấm ảo 6 số ➔{" "}
                    <b className="text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded shadow-sm text-sm">
                      &quot;{formatBigInt(demoRightResult)}&quot;
                    </b>
                  </span>
                </div>
              </div>
            </div>

            {/* API PAYLOAD */}
            <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800 shadow-inner mt-2">
              <h3 className="font-bold text-slate-100 flex items-center gap-2 mb-3">
                <Box size={18} className="text-purple-400" /> Cấu trúc JSON Gửi
                API
              </h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                Tuyệt đối không gửi Data dạng Float Number. Hãy gửi JSON với các
                giá trị số dưới dạng{" "}
                <strong className="text-purple-300">String</strong> nhằm tránh
                việc JSON Parser mặc định của Backend phân tích sai mảng bộ nhớ.
                Hoặc an toàn hơn, gửi bằng hệ số nguyên{" "}
                <strong className="text-sky-300">Micro-cents</strong>.
              </p>

              <pre className="bg-[#0f111a] p-4 md:p-6 rounded-xl font-mono text-xs md:text-sm overflow-x-auto border border-slate-700/50 shadow-inner leading-normal">
                <code>
                  <span className="text-white">{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#89DDFF]">{'"orderId"'}</span>
                  <span className="text-[#89DDFF]">:</span>{" "}
                  <span className="text-[#C3E88D]">{'"ORD-001"'}</span>
                  <span className="text-white">,</span>
                  {"\n\n"}
                  <span className="text-[#546E7A] italic">
                    {"  // --- Cách 1: Gửi chuỗi chưa phân giải (Khuyên dùng)"}
                  </span>
                  {"\n"}
                  <span className="text-[#546E7A] italic">
                    {"  // Backend tự xử lý bằng thư viện Decimal gốc"}
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#89DDFF]">{'"price_str"'}</span>
                  <span className="text-[#89DDFF]">:</span>{" "}
                  <span className="text-[#C3E88D]">{`"${demoPrice}"`}</span>
                  <span className="text-white">,</span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#89DDFF]">{'"quantity_str"'}</span>
                  <span className="text-[#89DDFF]">:</span>{" "}
                  <span className="text-[#C3E88D]">{`"${demoQty}"`}</span>
                  <span className="text-white">,</span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#89DDFF]">{'"total_str"'}</span>
                  <span className="text-[#89DDFF]">:</span>{" "}
                  <span className="text-[#C3E88D]">{`"${formatBigInt(demoRightResult)}"`}</span>
                  <span className="text-white">,</span>
                  {"\n\n"}
                  <span className="text-[#546E7A] italic">
                    {"  // --- Cách 2: Gửi số nguyên siêu nhỏ (Micro-cents)"}
                  </span>
                  {"\n"}
                  <span className="text-[#546E7A] italic">
                    {"  // Map hoàn hảo với int64 Database / gRPC Protobuf"}
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#89DDFF]">{'"price_micro"'}</span>
                  <span className="text-[#89DDFF]">:</span>{" "}
                  <span className="text-[#F78C6C]">
                    {demoBigPrice.toString()}
                  </span>
                  <span className="text-white">,</span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#89DDFF]">{'"quantity_micro"'}</span>
                  <span className="text-[#89DDFF]">:</span>{" "}
                  <span className="text-[#F78C6C]">
                    {demoBigQty.toString()}
                  </span>
                  <span className="text-white">,</span>
                  {"\n"}
                  {"  "}
                  <span className="text-[#89DDFF]">{'"total_micro"'}</span>
                  <span className="text-[#89DDFF]">:</span>{" "}
                  <span className="text-[#F78C6C]">
                    {demoRightResult.toString()}
                  </span>
                  {"\n"}
                  <span className="text-white">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* PHẦN 5: FAQ & KIẾN TRÚC */}
        <div className="flex flex-col gap-6 mt-12 mb-20">
          <h2 className="text-xl font-bold tracking-tight mb-2 border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center gap-2">
            <HelpCircle className="text-indigo-500" />
            5. FAQ: Các câu hỏi cấu trúc thường gặp
          </h2>

          <div className="grid gap-4">
            {/* Q1 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-black text-lg">Q:</span>
                Backend sẽ lưu trữ Data trong Database dưới định dạng String
                (Chữ)?
              </h3>
              <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-emerald-500 font-black text-lg">A:</span>
                <div className="leading-relaxed">
                  <strong className="text-red-500 dark:text-red-400">
                    KHÔNG.
                  </strong>{" "}
                  String chỉ đóng vai trò như một{" "}
                  <strong>Lớp vận chuyển (Transport layer)</strong> trung gian
                  qua JSON Payload trên mạng, giúp che giấu con số khỏi bộ phận
                  biên dịch của trình duyệt (Browser Parser).
                  <br />
                  <br />
                  Khi Database hoặc Backend nhận chuỗi String đó, nó sẽ tự động
                  phân tích ra cấu trúc Decimal tiêu chuẩn (Ví dụ: Java phân
                  giải thành <code>BigDecimal</code>). Ghi vào Database
                  (MySQL/PostgreSQL), Data thường được khai báo với column type{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">
                    DECIMAL(19, 4)
                  </code>
                  .
                  <br />
                  <br />
                  <em>
                    *Lưu ý: Ở các dự án hệ thống lớn hoặc cổng thanh toán như
                    Stripe, xu hướng mới là lưu trực tiếp bằng Cents/Micro-cents
                    dưới dạng Data{" "}
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">
                      BIGINT
                    </code>{" "}
                    trên phần cứng Database.
                  </em>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-black text-lg">Q:</span>
                Sử dụng API lấy Data trả về (GET Request), cục số tiền trả về
                bắt buộc phải là String?
              </h3>
              <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-emerald-500 font-black text-lg">A:</span>
                <div className="leading-relaxed">
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    ĐÚNG! CHÍNH XÁC LÀ VẬY.
                  </strong>{" "}
                  Dù Backend lưu DB là DECIMAL hay FLOAT đi chăng nữa, thì
                  Endpoint JSON Response trả ngược về cho Client cũng bắt buộc
                  nên được đóng gói kiểu String (chuỗi).
                  <br />
                  <br />
                  Tại sao? Bởi vì khi frontend call API và thực thi hàm{" "}
                  <code>res.json()</code>, JSON Parser mặc định rất dở. Dù con
                  số <code>{`{"total": 9999999999999999.5}`}</code> do backend
                  cung cấp hoàn toàn đúng 100%, nhưng khi Javascript tự động
                  Parse Object, nó sẽ quét nhầm và ném bớt đi phần dư vì bị
                  vướng bẫy giới hạn <strong>Float64 Max Safe Integer</strong>!
                  <br />
                  <br />
                  Sự phá hoại xảy ra tận màng phân duyệt ngầm trước cả khi code
                  của bạn kịp đụng chạm tới dữ liệu. Vậy nên, ép Backend trả
                  chuỗi đóng gói dạng{" "}
                  <code>{`{"total": "9999999999999999.5"}`}</code> là phương
                  pháp bịt đường hở an toàn tuyệt đối.
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-black text-lg">Q:</span>
                Nhưng nếu dùng BigInt, làm sao xử lý phép chia lẻ? VD: Chia bill
                100đ cho 3 người thì BigInt làm mất phần lẻ thập phân?
              </h3>
              <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-emerald-500 font-black text-lg">A:</span>
                <div className="leading-relaxed">
                  BigInt vốn không cho phép thương số mang số thập phân (Nó sẽ
                  tự vứt bỏ phần dư). Tuy nhiên, nguyên tắc cốt lõi của Tài
                  chính/Kế toán chia chác là:{" "}
                  <strong>
                    Không bao giờ tự tiện thả trôi số dư làm thất thoát tiền của
                    hệ thống
                  </strong>
                  .
                  <br />
                  <br />
                  Trong ứng dụng tài chính thực, chúng ta vớt lại phần dư bằng
                  Cấu trúc Chia kết hợp Modulo:
                  <br />- Thương cứng chia 3:{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono">
                    100n / 3n = 33n
                  </code>
                  <br />- Số bạc lẻ dư thừa:{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-amber-600 dark:text-amber-500 font-mono">
                    100n % 3n = 1n
                  </code>
                  <br />
                  <br />
                  Thuật toán lúc này sẽ tự động gán 2 người đầu thanh toán 33đ,
                  còn người cuối cùng sẽ móc túi thanh toán nốt cục nợ{" "}
                  <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono">
                    33đ + 1đ = 34đ
                  </code>
                  . Bằng cách này, tổng cộng thu về vẫn là 100đ và không 1 đồng
                  nào bị biến mất do máy tính tự làm tròn. Trói buộc của BigInt
                  ép lập trình viên tuân thủ đạo luật giải quyết chia chác minh
                  bạch 100%.
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-black text-lg">Q:</span>
                Tại sao lại phải khổ sở viết cấu trúc xử lý chay thay vì
                download thư viện như decimal.js hay bignumber.js cho nhàn?
              </h3>
              <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-emerald-500 font-black text-lg">A:</span>
                <div className="leading-relaxed">
                  Thư viện thứ 3 cực kỳ tuyệt vời nếu bạn không màng đến Bundle
                  Size (hàng chục KB file nén tải xuống browser của người dùng).
                  Ngoài ra hệ mã của thư viện tạo hiệu năng chậm do liên tục nhả
                  các Object instance dư thừa lúc tính toán (Ví dụ:{" "}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                    new Decimal(x).add(new Decimal(y))
                  </code>
                  ).
                  <br />
                  <br />
                  Lý do tuyệt đối là{" "}
                  <strong>Lõi BigInt được tích hợp Native</strong> sâu trong V8
                  Engine của JS bằng C++ từ bản chuẩn hóa công nghệ năm 2020.
                  Bạn có thể tự do dùng các toán hạng tự nhiên{" "}
                  <code>a * b</code> hay <code>a / b</code> có sẵn mang tốc độ
                  chớp nhoáng mà không một thư viện NPM ngoài nào đua kịp.
                  <br />
                  <br />
                  Triển khai kiến trúc Wrapping tự Scale string{" "}
                  <code>10^6</code> vỏn vẹn 5 dòng code của chúng ta thay thế
                  thẳng tay toàn bộ gánh nặng của thư viện ngoài kia, được gọi
                  là định chuẩn thiết kế ứng dụng khắt khe:{" "}
                  <strong>Zero-dependency - High Performance</strong>.
                </div>
              </div>
            </div>

            {/* Q5 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-black text-lg">Q:</span>
                Vấn đề chia Modulo lấy phần dư ở trên (100n / 3n = 33n dư 1n),
                vậy Case thực tế mang đi ứng dụng vào Code của dự án thì viết
                thuật toán thế nào?
              </h3>
              <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-emerald-500 font-black text-lg">A:</span>
                <div className="leading-relaxed w-full min-w-0">
                  Trong các hệ thống sàn TMĐT (Shopee) hoặc ví điện tử (Stripe),
                  việc này sẽ được module hóa thành một thuật toán{" "}
                  <strong>
                    &quot;Phân bổ dư nợ ngang hàng&quot; (Greedy Remainder
                    Allocation)
                  </strong>{" "}
                  cực kỳ gọn gàng.
                  <br />
                  <br />
                  Thay vì loay hoay ép kiểu với hệ thống Float tự động làm tròn
                  sai lệch của thư viện, hệ thống sẽ chia sòng phẳng phần
                  nguyên, đếm tổng số phần lượng dư, và thả bù đắp từng 1 đồng
                  lẻ dư đó vào những người đầu tiên trong mảng để tổng quỹ tiền
                  tự động bảo toàn 100%. Tham khảo cấu trúc sau:
                  <br />
                  <br />
                  <pre className="bg-[#0f111a] p-4 md:p-6 rounded-xl font-mono text-xs md:text-sm overflow-x-auto border border-slate-700/50 shadow-inner">
                    <code>
                      <span className="text-[#546E7A] italic">
                        {
                          "// Thuật toán chia rẽ nhánh siêu tốc (Không rớt 1 Micro-cent)"
                        }
                      </span>
                      {"\n"}
                      <span className="text-[#82AAFF]">function</span>{" "}
                      <span className="text-[#82AAFF]">splitBill</span>
                      <span className="text-white">(</span>
                      <span className="text-[#F78C6C]">totalAmount</span>
                      <span className="text-white">: bigint, </span>
                      <span className="text-[#F78C6C]">peopleCount</span>
                      <span className="text-white">: bigint) {"{"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-[#B2CCD6]">baseSplit</span>{" "}
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#B2CCD6]">totalAmount</span>{" "}
                      <span className="text-[#89DDFF]">/</span>{" "}
                      <span className="text-[#B2CCD6]">peopleCount</span>
                      <span className="text-white">;</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-[#B2CCD6]">remainder</span>{" "}
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#B2CCD6]">totalAmount</span>{" "}
                      <span className="text-[#89DDFF]">%</span>{" "}
                      <span className="text-[#B2CCD6]">peopleCount</span>
                      <span className="text-white">;</span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-[#B2CCD6]">results</span>{" "}
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-white">[];</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#89DDFF]">for</span>{" "}
                      <span className="text-white">(</span>
                      <span className="text-[#82AAFF]">let</span>{" "}
                      <span className="text-[#B2CCD6]">i</span>{" "}
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#F78C6C]">0n</span>
                      <span className="text-white">; </span>
                      <span className="text-[#B2CCD6]">i</span>{" "}
                      <span className="text-[#89DDFF]">{"<"}</span>{" "}
                      <span className="text-[#B2CCD6]">peopleCount</span>
                      <span className="text-white">; </span>
                      <span className="text-[#B2CCD6]">i</span>
                      <span className="text-[#89DDFF]">++</span>
                      <span className="text-white">) {"{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#546E7A] italic">
                        {
                          "// Nếu thứ tự i thấp hơn bộ đếm phần dư, phân bổ bù +1đ. Cân bằng thì +0"
                        }
                      </span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-[#B2CCD6]">extra</span>{" "}
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#B2CCD6]">i</span>{" "}
                      <span className="text-[#89DDFF]">{"<"}</span>{" "}
                      <span className="text-[#B2CCD6]">remainder</span>{" "}
                      <span className="text-[#89DDFF]">?</span>{" "}
                      <span className="text-[#F78C6C]">1n</span>{" "}
                      <span className="text-[#89DDFF]">:</span>{" "}
                      <span className="text-[#F78C6C]">0n</span>
                      <span className="text-white">;</span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#B2CCD6]">results</span>
                      <span className="text-white">.</span>
                      <span className="text-[#82AAFF]">push</span>
                      <span className="text-white">(</span>
                      <span className="text-[#B2CCD6]">baseSplit</span>{" "}
                      <span className="text-[#89DDFF]">+</span>{" "}
                      <span className="text-[#B2CCD6]">extra</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#89DDFF]">return</span>{" "}
                      <span className="text-[#B2CCD6]">results</span>
                      <span className="text-white">;</span>
                      {"\n"}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      <span className="text-[#546E7A] italic">
                        {"// Ví dụ Case Study: 100n chia đều 3 người"}
                      </span>
                      {"\n"}
                      <span className="text-[#B2CCD6]">splitBill</span>
                      <span className="text-white">(</span>
                      <span className="text-[#F78C6C]">100n</span>
                      <span className="text-white">, </span>
                      <span className="text-[#F78C6C]">3n</span>
                      <span className="text-white">); </span>
                      <span className="text-[#546E7A] italic">
                        {
                          "// -> [34n, 33n, 33n] (Người đầu chịu bù 1n nợ dôi dư)"
                        }
                      </span>
                    </code>
                  </pre>
                  <br />
                  Không hề rối rắm phải không? Thuật toán tối giản dựa sức mạnh
                  lõi của Native JS BigInt này là đủ để chia chính xác hàng trăm
                  tỷ Transaction phân phối thanh toán (Settlements) của các
                  Enterprise Node hàng năm mà không hề lo sợ tràn biến hoặc thất
                  lạc tiền. Cắm logic chạy là ăn!
                </div>
              </div>
            </div>

            {/* Q6 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm transition-shadow hover:shadow-md">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-start gap-2 leading-relaxed">
                <span className="text-indigo-500 font-black text-lg">Q:</span>
                Việc tự gõ code quản lý phân tích BigInt và Scale String nhìn có
                vẻ khó và rườm rà. Bạn có thể viết 1 Class đơn giản bọc lại để
                dùng chung cho toàn dự án được không?
              </h3>
              <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-emerald-500 font-black text-lg">A:</span>
                <div className="leading-relaxed w-full min-w-0">
                  Câu hỏi rất tinh tế! Trong thực tế, không ai đi cày chay
                  Parser ở từng component cả. Team kỹ sư thường sẽ gom toàn bộ
                  chức năng vào đúng{" "}
                  <strong>1 file Class `Money` duy nhất</strong> cực kỳ gọn nhẹ
                  (Zero Dependency) rồi Import dùng xuyên suốt dự án.
                  <br />
                  <br />
                  Với Class này, anh/chị chỉ cần gọi mã{" "}
                  <code>
                    new Money(&quot;19.99&quot;).multiply(&quot;2&quot;)
                  </code>{" "}
                  vô cùng tường minh (OOP). Em xin tặng anh đoạn Code chuẩn mực
                  dưới đây:
                  <br />
                  <br />
                  <pre className="bg-[#0f111a] p-4 md:p-6 rounded-xl font-mono text-xs md:text-sm overflow-x-auto border border-slate-700/50 shadow-inner leading-normal">
                    <code>
                      <span className="text-[#89DDFF] italic">
                        {"// src/utils/Money.ts"}
                      </span>
                      {"\n"}
                      <span className="text-[#82AAFF]">export class</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>{" "}
                      <span className="text-white">{"{"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">private</span>{" "}
                      <span className="text-white">value: bigint;</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">
                        private static readonly
                      </span>{" "}
                      <span className="text-[#B2CCD6]">DECIMALS</span>{" "}
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#F78C6C]">6</span>
                      <span className="text-white">;</span>
                      {"\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">
                        private static readonly
                      </span>{" "}
                      <span className="text-[#B2CCD6]">SCALE</span>{" "}
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#F78C6C]">1_000_000n</span>
                      <span className="text-white">; </span>
                      <span className="text-[#546E7A] italic">
                        {"// 10^DECIMALS"}
                      </span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">constructor</span>
                      <span className="text-white">
                        (amount: string | bigint | Money) {"{"}
                      </span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#89DDFF]">if</span>{" "}
                      <span className="text-white">(amount </span>
                      <span className="text-[#89DDFF]">instanceof</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">) {"{"}</span>
                      {"\n"}
                      {"      "}
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value = amount.value;</span>
                      {"\n"}
                      {"    "}
                      <span className="text-white">{"}"} </span>
                      <span className="text-[#89DDFF]">else if</span>{" "}
                      <span className="text-white">(</span>
                      <span className="text-[#89DDFF]">typeof</span>{" "}
                      <span className="text-white">amount </span>
                      <span className="text-[#89DDFF]">===</span>{" "}
                      <span className="text-[#C3E88D]">&quot;bigint&quot;</span>
                      <span className="text-white">) {"{"}</span>
                      {"\n"}
                      {"      "}
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value = amount;</span>
                      {"\n"}
                      {"    "}
                      <span className="text-white">{"}"} </span>
                      <span className="text-[#89DDFF]">else</span>{" "}
                      <span className="text-white">{"{"}</span>
                      {"\n"}
                      {"      "}
                      <span className="text-[#546E7A] italic">
                        {"// Hàm scale String tự động chuẩn hoá khi khởi tạo"}
                      </span>
                      {"\n"}
                      {"      "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">[intPart = </span>
                      <span className="text-[#C3E88D]">&quot;0&quot;</span>
                      <span className="text-white">, fracPart = </span>
                      <span className="text-[#C3E88D]">&quot;&quot;</span>
                      <span className="text-white">] = amount.</span>
                      <span className="text-[#82AAFF]">split</span>
                      <span className="text-white">(</span>
                      <span className="text-[#C3E88D]">&quot;.&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      {"      "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">paddedFrac = fracPart.</span>
                      <span className="text-[#82AAFF]">padEnd</span>
                      <span className="text-white">(</span>
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">.DECIMALS, </span>
                      <span className="text-[#C3E88D]">&quot;0&quot;</span>
                      <span className="text-white">).</span>
                      <span className="text-[#82AAFF]">slice</span>
                      <span className="text-white">(</span>
                      <span className="text-[#F78C6C]">0</span>
                      <span className="text-white">, </span>
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">.DECIMALS);</span>
                      {"\n"}
                      {"      "}
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value = </span>
                      <span className="text-[#FFCB6B]">BigInt</span>
                      <span className="text-white">(intPart </span>
                      <span className="text-[#89DDFF]">+</span>{" "}
                      <span className="text-white">paddedFrac);</span>
                      {"\n"}
                      {"    "}
                      <span className="text-white">{"}"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">add</span>
                      <span className="text-white">
                        (other: string | Money): Money {"{"}
                      </span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#89DDFF]">return new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(</span>
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value </span>
                      <span className="text-[#89DDFF]">+</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(other).value);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">subtract</span>
                      <span className="text-white">
                        (other: string | Money): Money {"{"}
                      </span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#89DDFF]">return new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(</span>
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value </span>
                      <span className="text-[#89DDFF]">-</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(other).value);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">multiply</span>
                      <span className="text-white">
                        (other: string | Money): Money {"{"}
                      </span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#89DDFF]">return new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">((</span>
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value </span>
                      <span className="text-[#89DDFF]">* </span>
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(other).value) </span>
                      <span className="text-[#89DDFF]">/</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">.SCALE);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">divide</span>
                      <span className="text-white">
                        (other: string | Money): Money {"{"}
                      </span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#89DDFF]">return new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">((</span>
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value </span>
                      <span className="text-[#89DDFF]">* </span>
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">.SCALE) </span>
                      <span className="text-[#89DDFF]">/</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(other).value);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      {"  "}
                      <span className="text-[#82AAFF]">toString</span>
                      <span className="text-white">(): string {"{"}</span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">isNeg = </span>
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value </span>
                      <span className="text-[#89DDFF]">{"<"}</span>{" "}
                      <span className="text-[#F78C6C]">0n</span>
                      <span className="text-white">;</span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">absStr = (isNeg ? -</span>
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value : </span>
                      <span className="text-[#89DDFF]">this</span>
                      <span className="text-white">.value).</span>
                      <span className="text-[#82AAFF]">toString</span>
                      <span className="text-white">().</span>
                      <span className="text-[#82AAFF]">padStart</span>
                      <span className="text-white">(</span>
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">.DECIMALS </span>
                      <span className="text-[#89DDFF]">+</span>{" "}
                      <span className="text-[#F78C6C]">1</span>
                      <span className="text-white">, </span>
                      <span className="text-[#C3E88D]">&quot;0&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">intPart = absStr.</span>
                      <span className="text-[#82AAFF]">slice</span>
                      <span className="text-white">(</span>
                      <span className="text-[#F78C6C]">0</span>
                      <span className="text-white">, -</span>
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">.DECIMALS);</span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">fracPart = absStr.</span>
                      <span className="text-[#82AAFF]">slice</span>
                      <span className="text-white">(-</span>
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">.DECIMALS).</span>
                      <span className="text-[#82AAFF]">replace</span>
                      <span className="text-white">(</span>
                      <span className="text-[#89DDFF]">/</span>
                      <span className="text-[#C3E88D]">0+$</span>
                      <span className="text-[#89DDFF]">/</span>
                      <span className="text-white">, </span>
                      <span className="text-[#C3E88D]">&quot;&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      {"    "}
                      <span className="text-[#89DDFF]">return</span>{" "}
                      <span className="text-white">(isNeg ? </span>
                      <span className="text-[#C3E88D]">&quot;-&quot;</span>
                      <span className="text-white"> : </span>
                      <span className="text-[#C3E88D]">&quot;&quot;</span>
                      <span className="text-white">) </span>
                      <span className="text-[#89DDFF]">+</span>{" "}
                      <span className="text-white">intPart </span>
                      <span className="text-[#89DDFF]">+</span>{" "}
                      <span className="text-white">(fracPart ? </span>
                      <span className="text-[#C3E88D]">&quot;.&quot;</span>{" "}
                      <span className="text-[#89DDFF]">+</span>{" "}
                      <span className="text-white">fracPart : </span>
                      <span className="text-[#C3E88D]">&quot;&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      {"  "}
                      <span className="text-white">{"}"}</span>
                      {"\n"}
                      <span className="text-white">{"}"}</span>
                      {"\n\n"}
                      <span className="text-[#546E7A] italic">
                        {"// ------ CÁCH SỬ DỤNG TRONG THỰC TẾ ------"}
                      </span>
                      {"\n"}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">price </span>
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(</span>
                      <span className="text-[#C3E88D]">&quot;19.99&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">qty </span>
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(</span>
                      <span className="text-[#C3E88D]">&quot;5&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      <span className="text-[#546E7A] italic">
                        {
                          "// Tính thành tiền và in thẳng ra Chuỗi an toàn để đưa vào API"
                        }
                      </span>
                      {"\n"}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">total </span>
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-white">price.</span>
                      <span className="text-[#82AAFF]">multiply</span>
                      <span className="text-white">(qty);</span>
                      {"\n"}
                      <span className="text-[#B2CCD6]">console</span>
                      <span className="text-white">.</span>
                      <span className="text-[#82AAFF]">log</span>
                      <span className="text-white">(total.</span>
                      <span className="text-[#82AAFF]">toString</span>
                      <span className="text-white">()); </span>
                      <span className="text-[#546E7A] italic">
                        {'// -> "99.95"'}
                      </span>
                      {"\n\n"}
                      <span className="text-[#546E7A] italic">
                        {"// 1. Chữa vĩnh viễn lỗi dở khóc dở cười 0.1 + 0.2"}
                      </span>
                      {"\n"}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">num1 </span>
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(</span>
                      <span className="text-[#C3E88D]">&quot;0.1&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">num2 </span>
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(</span>
                      <span className="text-[#C3E88D]">&quot;0.2&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      <span className="text-[#B2CCD6]">console</span>
                      <span className="text-white">.</span>
                      <span className="text-[#82AAFF]">log</span>
                      <span className="text-white">(num1.</span>
                      <span className="text-[#82AAFF]">add</span>
                      <span className="text-white">(num2).</span>
                      <span className="text-[#82AAFF]">toString</span>
                      <span className="text-white">()); </span>
                      <span className="text-[#546E7A] italic">
                        {'// -> "0.3" (Không bao giờ xuất hiện 0.3000...4)'}
                      </span>
                      {"\n\n"}
                      <span className="text-[#546E7A] italic">
                        {
                          "// 2. Tính tiền áp dụng chiết khấu lẻ (Discount Percent)"
                        }
                      </span>
                      {"\n"}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">fund </span>
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-[#89DDFF]">new</span>{" "}
                      <span className="text-[#FFCB6B]">Money</span>
                      <span className="text-white">(</span>
                      <span className="text-[#C3E88D]">&quot;100&quot;</span>
                      <span className="text-white">);</span>
                      {"\n"}
                      <span className="text-[#82AAFF]">const</span>{" "}
                      <span className="text-white">discount </span>
                      <span className="text-[#89DDFF]">=</span>{" "}
                      <span className="text-white">fund.</span>
                      <span className="text-[#82AAFF]">multiply</span>
                      <span className="text-white">(</span>
                      <span className="text-[#C3E88D]">&quot;0.15&quot;</span>
                      <span className="text-white">); </span>
                      <span className="text-[#546E7A] italic">
                        {"// Phạt/Giảm giá 15%"}
                      </span>
                      {"\n"}
                      <span className="text-[#B2CCD6]">console</span>
                      <span className="text-white">.</span>
                      <span className="text-[#82AAFF]">log</span>
                      <span className="text-white">(fund.</span>
                      <span className="text-[#82AAFF]">subtract</span>
                      <span className="text-white">(discount).</span>
                      <span className="text-[#82AAFF]">toString</span>
                      <span className="text-white">()); </span>
                      <span className="text-[#546E7A] italic">
                        {'// -> "85"'}
                      </span>
                      {"\n"}
                    </code>
                  </pre>
                  <br />
                  Chỉ với một Class dài chưa tới 40 dòng Code mà dự án đã sở hữu
                  ngay một cỗ máy tính toán chuẩn mực: Không phụ thuộc thư viện
                  tải ngoài nào (Zero Dependency / Bundle Size 0KB), và tốc độ
                  xử lý nhanh như chớp.
                  <br />
                  <br />
                  Đội ngũ lập trình viên từ nay về sau chỉ cần gọi{" "}
                  <code>new Money()</code> rồi tha hồ bắn chuỗi `.add()` hoặc
                  `.multiply()`. Mọi lớp xử lý bóc tách String và Scale tự động
                  đều đã được Class này đóng gói giấu sâu dưới gầm!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
