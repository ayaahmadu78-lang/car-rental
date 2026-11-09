/* ============================================
   Car Rental Website - myFunctions.js
   جميع التوابع اللازمة في ملف واحد
   ============================================ */

/* ----- بيانات السيارات الإضافية ----- */
var carsDetails = {
    "CR-001": {
        fuel: "بنزين",
        transmission: "أوتوماتيك",
        seats: "5",
        mileage: "45000 كم",
        color: "أبيض"
    },
    "CR-002": {
        fuel: "ديزل",
        transmission: "أوتوماتيك",
        seats: "5",
        mileage: "62000 كم",
        color: "رمادي"
    },
    "CR-003": {
        fuel: "بنزين",
        transmission: "أوتوماتيك",
        seats: "5",
        mileage: "18000 كم",
        color: "أسود"
    },
    "CR-004": {
        fuel: "بنزين",
        transmission: "عادي",
        seats: "4",
        mileage: "89000 كم",
        color: "أحمر"
    },
    "CR-005": {
        fuel: "بنزين",
        transmission: "أوتوماتيك",
        seats: "7",
        mileage: "35000 كم",
        color: "أزرق"
    },
    "CR-006": {
        fuel: "هجين",
        transmission: "أوتوماتيك",
        seats: "5",
        mileage: "22000 كم",
        color: "فضي"
    }
};

/* ----- أسعار السيارات اليومية ----- */
var carsPrices = {
    "CR-001": 250000,
    "CR-002": 400000,
    "CR-003": 300000,
    "CR-004": 180000,
    "CR-005": 550000,
    "CR-006": 480000
};

/* ----- أسماء السيارات ----- */
var carsNames = {
    "CR-001": "Toyota Corolla",
    "CR-002": "Kia Sportage",
    "CR-003": "Hyundai Elantra",
    "CR-004": "Chevrolet Spark",
    "CR-005": "Toyota Land Cruiser",
    "CR-006": "Hyundai Tucson"
};

/* ============================================
   1. إظهار / إخفاء تفاصيل السيارة (jQuery)
   ============================================ */
function toggleDetails(carId) {
    var rowId = "#details-" + carId;
    $(rowId).slideToggle(300);
}

/* ============================================
   2. التحقق من الاسم (أحرف عربية فقط)
   ============================================ */
function validateName(name) {
    // يقبل الأحرف العربية والمسافات فقط
    var arabicPattern = /^[\u0600-\u06FF\s]+$/;
    if (name.trim() === "") {
        return "الاسم الكامل مطلوب";
    }
    if (!arabicPattern.test(name)) {
        return "الاسم يجب أن يحتوي على أحرف عربية فقط";
    }
    if (name.trim().length < 5) {
        return "الاسم قصير جداً";
    }
    return "";
}

/* ============================================
   3. التحقق من الرقم الوطني
   11 خانة، أول خانتين من 01 إلى 14
   ============================================ */
function validateNationalId(id) {
    if (id.trim() === "") {
        return "الرقم الوطني إلزامي";
    }
    if (!/^\d{11}$/.test(id)) {
        return "الرقم الوطني يجب أن يكون 11 رقماً";
    }
    var province = parseInt(id.substring(0, 2), 10);
    if (province < 1 || province > 14) {
        return "أول خانتين يجب أن ترمزا إلى محافظة (01-14)";
    }
    return "";
}

/* ============================================
   4. التحقق من التواريخ
   ============================================ */
function validateDates(startDate, endDate) {
    if (startDate === "") {
        return "تاريخ بداية التأجير إلزامي";
    }
    if (endDate === "") {
        return "تاريخ نهاية التأجير إلزامي";
    }

    var start = new Date(startDate);
    var end = new Date(endDate);
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "صيغة التاريخ غير صحيحة (yyyy-mm-dd)";
    }

    if (start < today) {
        return "تاريخ البداية لا يمكن أن يكون في الماضي";
    }

    if (end <= start) {
        return "تاريخ النهاية يجب أن يكون لاحقاً لتاريخ البداية";
    }

    return "";
}

/* ============================================
   5. التحقق من رقم الموبايل (Syriatel أو MTN)
   ============================================ */
function validateMobile(mobile) {
    if (mobile.trim() === "") {
        return ""; // اختياري
    }
    // شبكات سورية شائعة: 09xxxxxxxx
    // Syriatel: 093, 098, 099
    // MTN: 094, 095, 096
    var pattern = /^(093|098|099|094|095|096)\d{7}$/;
    if (!pattern.test(mobile)) {
        return "رقم الموبايل يجب أن يكون لشبكة Syriatel أو MTN (مثال: 093xxxxxxx)";
    }
    return "";
}

/* ============================================
   6. التحقق من البريد الإلكتروني
   ============================================ */
function validateEmail(email) {
    if (email.trim() === "") {
        return ""; // اختياري
    }
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
        return "صيغة البريد الإلكتروني غير صحيحة";
    }
    return "";
}

/* ============================================
   7. حساب عدد الأيام بين تاريخين
   ============================================ */
function calculateDays(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var diffTime = end - start;
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

/* ============================================
   8. إظهار نموذج الحجز بعد اختيار السيارات
   ============================================ */
function showBookingForm() {
    var selected = [];
    $("input[name='selectCar']:checked").each(function () {
        selected.push($(this).val());
    });

    if (selected.length === 0) {
        alert("يرجى اختيار سيارة واحدة على الأقل");
        return;
    }

    // حفظ السيارات المختارة مؤقتاً
    window.selectedCars = selected;

    $("#bookingForm").slideDown(400);
    $("#resultBox").hide();

    // التمرير إلى النموذج
    $("html, body").animate({
        scrollTop: $("#bookingForm").offset().top - 30
    }, 500);
}

/* ============================================
   9. التحقق الكامل من النموذج وإظهار النتيجة
   ============================================ */
function validateAndSubmit() {
    // مسح رسائل الخطأ السابقة
    $(".error-msg").hide();
    $("input").removeClass("error");

    var name = $("#fullName").val();
    var nationalId = $("#nationalId").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val();

    var hasError = false;

    // التحقق من الاسم
    var nameErr = validateName(name);
    if (nameErr !== "") {
        $("#nameError").text(nameErr).show();
        $("#fullName").addClass("error");
        hasError = true;
    }

    // التحقق من الرقم الوطني
    var idErr = validateNationalId(nationalId);
    if (idErr !== "") {
        $("#idError").text(idErr).show();
        $("#nationalId").addClass("error");
        hasError = true;
    }

    // التحقق من التواريخ
    var dateErr = validateDates(startDate, endDate);
    if (dateErr !== "") {
        $("#dateError").text(dateErr).show();
        $("#startDate").addClass("error");
        $("#endDate").addClass("error");
        hasError = true;
    }

    // التحقق من الموبايل
    var mobileErr = validateMobile(mobile);
    if (mobileErr !== "") {
        $("#mobileError").text(mobileErr).show();
        $("#mobile").addClass("error");
        hasError = true;
    }

    // التحقق من الإيميل
    var emailErr = validateEmail(email);
    if (emailErr !== "") {
        $("#emailError").text(emailErr).show();
        $("#email").addClass("error");
        hasError = true;
    }

    if (hasError) {
        return false;
    }

    // ----- حساب النتيجة -----
    var days = calculateDays(startDate, endDate);
    var total = 0;
    var rowsHtml = "";

    for (var i = 0; i < window.selectedCars.length; i++) {
        var code = window.selectedCars[i];
        var price = carsPrices[code];
        var carTotal = price * days;
        total += carTotal;

        rowsHtml += "<tr>" +
            "<td>" + code + "</td>" +
            "<td>" + carsNames[code] + "</td>" +
            "<td>" + days + "</td>" +
            "<td>" + price.toLocaleString() + " ل.س</td>" +
            "<td>" + carTotal.toLocaleString() + " ل.س</td>" +
            "</tr>";
    }

    var discount = 0;
    var finalTotal = total;
    var discountText = "";

    if (days > 7) {
        discount = total * 0.10;
        finalTotal = total - discount;
        discountText = "<p class='discount'>تم تطبيق خصم 10% لأن مدة التأجير تجاوزت 7 أيام: -" +
            discount.toLocaleString() + " ل.س</p>";
    }

    // بناء محتوى النتيجة
    var resultHtml = "<h2>تأكيد طلب الحجز</h2>" +
        "<p><strong>مقدم الطلب:</strong> " + name + "</p>" +
        "<p><strong>الرقم الوطني:</strong> " + nationalId + "</p>" +
        "<p><strong>فترة التأجير:</strong> من " + startDate + " إلى " + endDate + " (" + days + " يوم)</p>" +
        "<table>" +
        "<thead><tr>" +
        "<th>الرمز</th><th>الموديل</th><th>عدد الأيام</th><th>السعر اليومي</th><th>المجموع</th>" +
        "</tr></thead>" +
        "<tbody>" + rowsHtml + "</tbody>" +
        "</table>" +
        discountText +
        "<p class='total-line'>المبلغ الإجمالي النهائي: " + finalTotal.toLocaleString() + " ل.س</p>" +
        "<p style='margin-top:15px;color:#1e8449;'>تم استلام طلبك بنجاح. سيتم التواصل معك قريباً.</p>";

    $("#resultContent").html(resultHtml);
    $("#resultBox").slideDown(400);
    $("#bookingForm").slideUp(300);

    // التمرير إلى النتيجة
    $("html, body").animate({
        scrollTop: $("#resultBox").offset().top - 30
    }, 500);

    return false; // منع إرسال النموذج الحقيقي
}

/* ============================================
   تهيئة عند تحميل الصفحة
   ============================================ */
$(document).ready(function () {
    // ربط أزرار إظهار التفاصيل
    $(".show-details").on("change", function () {
        var carId = $(this).val();
        toggleDetails(carId);
    });

    // زر متابعة
    $("#btnContinue").on("click", function () {
        showBookingForm();
    });

    // زر إرسال النموذج
    $("#bookingForm").on("submit", function (e) {
        e.preventDefault();
        validateAndSubmit();
    });
});