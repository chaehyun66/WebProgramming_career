/* 10월~12월의 시험 일정 */
const officialCalendarEvents = [
    {
        "id": 1,
        "date": "2026-10-12",
        "title": "SQLD 제63회 접수 시작",
        "kind": "접수",
        "description": "SQLD 제63회 접수가 시작되는 일정입니다. 응시 정보와 준비 사항을 확인하세요."
    },
    {
        "id": 2,
        "date": "2026-10-16",
        "title": "SQLD 제63회 접수 마감",
        "kind": "접수",
        "description": "SQLD 제63회 접수가 마감되는 일정입니다. 신청 내용과 접수 완료 여부를 확인해주세요."
    },
    {
        "id": 3,
        "date": "2026-10-17",
        "title": "한국사 제80회 시험",
        "kind": "시험",
        "description": "한국사 제80회 시험 일정입니다. 수험표와 신분증 등 준비물을 확인하세요."
    },
    {
        "id": 4,
        "date": "2026-10-18",
        "title": "기사 3회 실기 빈자리 접수",
        "kind": "접수",
        "description": "기사 3회 실기 빈자리 접수 일정입니다. 응시 지역과 남은 접수 자리를 확인하세요."
    },
    {
        "id": 5,
        "date": "2026-10-19",
        "title": "TOEIC(10/31) 접수 마감",
        "kind": "접수",
        "description": "10월 31일 TOEIC 시험의 접수 마감 일정입니다. 신청 정보와 시험장을 확인하세요."
    },
    {
        "id": 6,
        "date": "2026-10-24",
        "title": "기사 3회 실기 시험 시작",
        "kind": "시험",
        "description": "기사 3회 실기 시험 기간이 시작되는 일정입니다. 개인별 시험일과 장소를 확인하세요."
    },
    {
        "id": 7,
        "date": "2026-10-26",
        "title": "TESAT 제109회 접수 마감",
        "kind": "접수",
        "description": "TESAT 제109회 접수 마감 일정입니다. 접수 내역과 응시 정보를 확인하세요."
    },
    {
        "id": 8,
        "date": "2026-10-26",
        "title": "TOEIC(11/8) 접수 마감",
        "kind": "접수",
        "description": "11월 8일 TOEIC 시험의 접수 마감 일정입니다. 신청 정보와 시험장을 확인하세요."
    },
    {
        "id": 9,
        "date": "2026-10-26",
        "title": "빅데이터분석기사 실기 접수 시작",
        "kind": "접수",
        "description": "빅데이터분석기사 실기 접수가 시작되는 일정입니다. 응시 자격과 접수 정보를 확인하세요."
    },
    {
        "id": 10,
        "date": "2026-10-28",
        "title": "GTQ 제11회 접수 시작",
        "kind": "접수",
        "description": "GTQ 제11회 접수가 시작되는 일정입니다. 응시 급수와 시험장을 확인하세요."
    },
    {
        "id": 11,
        "date": "2026-10-30",
        "title": "한국사 제80회 발표",
        "kind": "발표",
        "description": "한국사 제80회 결과 발표 일정입니다. 성적과 합격 여부를 확인하세요."
    },
    {
        "id": 12,
        "date": "2026-10-30",
        "title": "빅데이터분석기사 실기 접수 마감",
        "kind": "접수",
        "description": "빅데이터분석기사 실기 접수가 마감되는 일정입니다. 접수 완료 여부를 확인하세요."
    },
    {
        "id": 13,
        "date": "2026-10-31",
        "title": "TOEIC 정기시험",
        "kind": "시험",
        "description": "TOEIC 정기시험 일정입니다. 시험장 위치와 입실 시간을 확인하세요."
    },
    {
        "id": 14,
        "date": "2026-10-31",
        "title": "ADsP 제51회 시험",
        "kind": "시험",
        "description": "ADsP 제51회 시험 일정입니다. 시험장 위치와 준비물을 확인하세요."
    },
    {
        "id": 15,
        "date": "2026-11-04",
        "title": "제34회 청소년지도사 필기 합격자 발표",
        "kind": "발표",
        "description": "제34회 청소년지도사 필기 합격자 발표 일정입니다.\n오전 9시에 발표 예정이고 큐넷 합격자 발표조회에서 2027년 1월 2일(토) 오후 11시 59분까지 확인할 수 있습니다.\n이후 면접 및 최종 발표 일정은 큐넷 청소년 지도사 홈페이지에서 확인해주시기 바랍니다."
    },
    {
        "id": 16,
        "date": "2026-11-06",
        "title": "청소년상담사 면접 원서 접수 마감",
        "kind": "접수",
        "description": "청소년상담사 면접 원서 접수 마감 일정입니다. 필기시험 합격과 별도로 면접 원서를 따로 접수해야하며 면접 위원 3인의 평정점수 합계가 모두 15점 이상이어야 합격입니다.\n원서접수 및 시험 전반은 한국산업인력공단 HRD 고객센터, 응시자격 서류 심사 및 면접 관련 문의는 한국청소년상담복지개발원에 해주시기 바랍니다."
    },
    {
        "id": 17,
        "date": "2026-11-07",
        "title": "제21회 한국어교육능력검정시험 면접",
        "kind": "면접",
        "description": "제21회 한국어교육능력검정시험 면접 일정입니다. 합격자는 11월 25일 큐넷 한국어교육능력검정시험 사이트에서 확인 가능합니다.\n한국어학, 한국어교육론, 한국 문화 등 이론을 실제 외국인 학습자 지도 상황에 적용하는 능력을 중요시합니다. 만족스러운 면접 보고 오시길 바랍니다!"
    },
    {
        "id": 18,
        "date": "2026-11-11",
        "title": "제62회 변리사 1차 합격자 발표",
        "kind": "발표",
        "description": "제62회 변리사 1차 합격자 발표 일정입니다.\n최종 점수 및 합격 조회는 큐넷에 로그인 후 '마이페이지-원서접수관리-시험 결과보기-개인별 득점 조회'에서 가능합니다. 추가합격자는 큐넷 회원정보 연락처로 개별 유선 통지되며 점수 변동자에게는 SMS가 발송됩니다."
    },
    {
        "id": 19,
        "date": "2026-11-15",
        "title": "기사 제3회 실기시험",
        "kind": "시험",
        "description": "기사 제3회 실기시험 일정입니다. 현지채점 종목은 1차 발표일에, 중앙채점 종목은 2차 발표일에 공개됩니다.\n공단 인정 신분증과 허용 기종 공학용 계산기(초기화 후 사용)를 지참해야하며, 주관식 답안은 검은색 필기구만 사용할 수 있습니다."
    },
    {
        "id": 20,
        "date": "2026-11-18",
        "title": "제35회 공인노무사 2차 합격자 발표",
        "kind": "발표",
        "description": "제35회 공인노무사 2차 합격자 발표 일정입니다. 큐넷 공인노무사 홈페이지에서 합격자 수험번호 및 개인별 시험 성적 조회가 가능합니다.\n제3차 합격자 발표일은 12월 9일(수)로 예정되어있습니다."
    },
    {
        "id": 21,
        "date": "2026-11-21",
        "title": "제28회 경비지도사 1차",
        "kind": "시험",
        "description": "제28회 경비지도사 1차 일정입니다. 합격자 발표는 12월 31일로 예정되어있으며 자세한 공고와 기출문제는 큐넷 경비지도사 홈페이지를 통해 확인할 수 있습니다."
    },
    {
        "id": 22,
        "date": "2026-11-25",
        "title": "제21회 한국어교육능력검정시험 면접 합격자 발표",
        "kind": "발표",
        "description": "제21회 한국어교육능력검정시험 면접 합격자 발표 일정입니다. 오전 9시에 발표될 예정이며 합격자 조회는 큐넷 합격자 발표조회 사이트 또는 큐넷 한국어교육능력검정시험 사이트에서 가능합니다."
    },
    {
        "id": 23,
        "date": "2026-11-27",
        "title": "제35회 공인노무사 3차",
        "kind": "시험",
        "description": "제35회 공인노무사 3차 일정입니다. 최종 합격자는 12월 9일(수) 오전 9시에 발표되는 것으로 예정되어있습니다.\n상세 수험사항은 큐넷 공인노무사 공지사항에서 확인할 수 있으며 최종 합격 여부는 큐넷 합격자 발표조회에서 조회할 수 있습니다."
    },
    {
        "id": 24,
        "date": "2026-11-30",
        "title": "제25회 청소년상담사 면접",
        "kind": "면접",
        "description": "제25회 청소년상담사 면접 일정입니다. 면접위원 3인의 평정점수 합계가 모두 15점 이상일 때 합격합니다.\n응시자격 서류심사 기간 내 서류를 제출하지 않거나 기준에 미달하면 1,2차 모두 무효처리됩니다. 면접에 불합격했더라도 서류를 제출, 승인 받아야 다음 회차 1차 시험 면제 혜택이 적용됩니다."
    },
    {
        id: 25,
        date: "2026-12-02",
        title: "기능사 제4회 실기시험",
        kind: "시험",
        description:
            "기능사 제4회 실기시험 일정입니다. 개인별 시험 시간과 장소, 준비물을 확인하세요."
    },
    {
        id: 26,
        date: "2026-12-02",
        title: "제37회 공인중개사 1차 합격자 발표",
        kind: "발표",
        description:
            "제37회 공인중개사 1차 합격자 발표 일정입니다. 성적과 합격 여부를 확인하세요."
    },
    {
        id: 27,
        date: "2026-12-05",
        title: "제25회 청소년상담사 면접",
        kind: "면접",
        description:
            "제25회 청소년상담사 면접 일정입니다. 개인별 면접 시간과 장소, 준비물을 확인하세요."
    },
    {
        id: 28,
        date: "2026-12-09",
        title: "제35회 공인노무사 3차 합격자 발표",
        kind: "발표",
        description:
            "제35회 공인노무사 3차 합격자 발표 일정입니다. 합격 여부와 후속 안내를 확인하세요."
    },
    {
        id: 29,
        date: "2026-12-11",
        title: "제25회 사회복지사 1급 필기 원서접수 마감",
        kind: "접수",
        description:
            "제25회 사회복지사 1급 필기 원서접수 마감 일정입니다. 신청 정보와 접수 완료 여부를 확인하세요."
    },
    {
        id: 30,
        date: "2026-12-12",
        title: "제26회 호텔관리사 면접",
        kind: "면접",
        description:
            "제26회 호텔관리사 면접 일정입니다. 개인별 면접 시간과 장소, 준비물을 확인하세요."
    },
    {
        id: 31,
        date: "2026-12-16",
        title: "제14회 행정사 2차 합격자 발표",
        kind: "발표",
        description:
            "제14회 행정사 2차 합격자 발표 일정입니다. 성적과 합격 여부를 확인하세요."
    },
    {
        id: 32,
        date: "2026-12-18",
        title: "기사 제3회 실기시험 2차 합격자 발표",
        kind: "발표",
        description:
            "기사 제3회 실기시험 2차 합격자 발표 일정입니다. 성적과 합격 여부를 확인하세요."
    },
    {
        id: 33,
        date: "2026-12-30",
        title: "제26회 호텔관리사 면접 합격자 발표",
        kind: "발표",
        description:
            "제26회 호텔관리사 면접 합격자 발표 일정입니다. 합격 여부와 후속 안내를 확인하세요."
    },
    {
        id: 34,
        date: "2026-12-31",
        title: "제28회 경비지도사 1차 합격자 발표",
        kind: "발표",
        description:
            "제28회 경비지도사 1차 합격자 발표 일정입니다. 성적과 합격 여부를 확인하세요."
    },
    {
        id: 35,
        date: "2026-11-07",
        title: "TESAT 제109회(경제이해력)",
        kind: "시험",
        description:
            "TESAT 제109회 시험 일정입니다. 시험장과 준비물을 확인하세요."
    },
    {
        id: 36,
        date: "2026-11-08",
        title: "TOEIC 정기시험",
        kind: "시험",
        description:
            "2026년 11월 8일 TOEIC 정기시험입니다. 시험장과 입실 시간을 확인하세요."
    },
    {
        id: 37,
        date: "2026-11-13",
        title: "TESAT 제109회 성적 발표",
        kind: "발표",
        description:
            "2026년 11월 7일에 시행한 TESAT 제109회 성적 발표 일정입니다."
    },
    {
        id: 38,
        date: "2026-11-15",
        title: "TOEIC 정기시험",
        kind: "시험",
        description:
            "2026년 11월 15일 TOEIC 정기시험입니다. 시험장과 입실 시간을 확인하세요."
    },
    {
        id: 39,
        date: "2026-11-17",
        title: "TOEIC 성적 발표",
        kind: "발표",
        description:
            "2026년 11월 8일에 시행한 TOEIC 시험의 성적 발표 일정입니다."
    },
    {
        id: 40,
        date: "2026-11-24",
        title: "TOEIC 성적 발표",
        kind: "발표",
        description:
            "2026년 11월 15일에 시행한 TOEIC 시험의 성적 발표 일정입니다."
    },
    {
        id: 41,
        date: "2026-11-29",
        title: "TOEIC 정기시험",
        kind: "시험",
        description:
            "2026년 11월 29일 TOEIC 정기시험입니다. 시험장과 입실 시간을 확인하세요."
    }
];

let calendarYear;
let calendarMonth;
let calendarSelectedDate = "";
let calendarSelectedEventId = 0;

window.addEventListener("load", initializeCalendar);

function initializeCalendar() {
    const today = new Date();
    calendarYear = today.getFullYear();
    calendarMonth = today.getMonth();
    calendarSelectedDate = makeCalendarDateKey(
        calendarYear, calendarMonth, today.getDate()
    );

    const buttons = document.querySelectorAll(
        ".calendar .month-nav .btn-month"
    );
    buttons[0].addEventListener("click", function () {
        moveCalendarMonth(-1);
    });
    buttons[1].addEventListener("click", function () {
        moveCalendarMonth(1);
    });
    document.getElementById("calendar-today")
        .addEventListener("click", showCalendarToday);

    renderCalendar();
    renderCalendarDetails();
}

function makeCalendarDateKey(year, month, day) {
    let m = "" + (month + 1);
    let d = "" + day;
    if (month + 1 < 10) m = "0" + m;
    if (day < 10) d = "0" + d;
    return year + "-" + m + "-" + d;
}

function getCalendarEvents(dateKey) {
    return officialCalendarEvents.filter(function (item) {
        return item.date === dateKey;
    });
}

function selectCalendarDate(dateKey) {
    calendarSelectedDate = dateKey;
    calendarSelectedEventId = 0;
    renderCalendar();
    renderCalendarDetails();
}

function moveCalendarMonth(amount) {
    const date = new Date(calendarYear, calendarMonth + amount, 1);
    calendarYear = date.getFullYear();
    calendarMonth = date.getMonth();
    selectCalendarDate(makeCalendarDateKey(calendarYear, calendarMonth, 1));
}

function renderCalendar() {
    const body = document.querySelector(".calendar-table tbody");
    document.querySelector(".calendar .month").innerText = 
        calendarYear + ". " + (calendarMonth + 1);
    const first = new Date(calendarYear, calendarMonth, 1).getDay();
    const last = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const count = Math.ceil((first + last) / 7) * 7;
    body.innerHTML = "";
    let row;
    for (let i = 0; i < count; i++) {
        if (i % 7 === 0) {
            row = document.createElement("tr");
            body.appendChild(row);
        }
        const day = i - first + 1;
        let cell;
        if (day < 1 || day > last) {
            cell = document.createElement("td");
            cell.setAttribute("class", "empty");
        } else {
            cell = createCalendarDateCell(day, i % 7);
        }
        row.appendChild(cell);
    }
}

function createCalendarDateCell(day, weekday) {
    const cell = document.createElement("td");
    const button = document.createElement("button");
    const dateKey = makeCalendarDateKey(calendarYear, calendarMonth, day);
    const today = new Date();
    const todayKey = makeCalendarDateKey(
        today.getFullYear(), today.getMonth(), today.getDate()
    );
    let className = "calendar-date";
    if (weekday === 0) className += " sun";
    if (weekday === 6) className += " sat";
    if (dateKey === todayKey) className += " today";
    if (dateKey === calendarSelectedDate) className += " calendar-selected";
    cell.setAttribute("class", className);

    button.setAttribute("type", "button");
    button.setAttribute("class", "calendar-day-button");
    const number = document.createElement("span");
    number.setAttribute("class", "day");
    number.innerText = day;
    button.appendChild(number);
    if (dateKey === todayKey) {
        const label = document.createElement("span");
        label.setAttribute("class", "today-text");
        label.innerText = "오늘";
        button.appendChild(label);
    }
    button.addEventListener("click", function () {
        selectCalendarDate(dateKey);
    });
    cell.appendChild(button);

    const events = getCalendarEvents(dateKey);
    for (let i = 0; i < events.length; i++) {
        const item = events[i];
        const eventButton = document.createElement("button");
        let eventClass = "event ev-exam";
        if (item.kind === "접수") eventClass = "event ev-apply";
        if (item.kind === "발표") eventClass = "event ev-result";
        if (item.id === calendarSelectedEventId) {
            eventClass += " calendar-event-selected";
        }
        eventButton.setAttribute("type", "button");
        eventButton.setAttribute("class", eventClass);
        eventButton.setAttribute("title", item.title + " 상세 보기");
        eventButton.innerText = item.title;
        eventButton.addEventListener("click", function () {
            calendarSelectedDate = item.date;
            calendarSelectedEventId = item.id;
            renderCalendar();
            renderCalendarDetails();
        });
        cell.appendChild(eventButton);
    }
    return cell;
}

function renderCalendarDetails() {
    const heading = document.getElementById("calendar-selected-title");
    const list = document.getElementById("calendar-selected-list");
    list.innerHTML = "";
    let selected = null;
    for (let i = 0; i < officialCalendarEvents.length; i++) {
        if (officialCalendarEvents[i].id === calendarSelectedEventId) {
            selected = officialCalendarEvents[i];
            break;
        }
    }
    if (selected === null) {
        heading.innerText = calendarSelectedDate + " 일정 안내";
        const message = document.createElement("p");
        message.setAttribute("class", "calendar-empty-message");
        if (getCalendarEvents(calendarSelectedDate).length === 0) {
            message.innerText = "이 날짜에는 등록된 시험 일정이 없습니다.";
        } else {
            message.innerText = "달력에서 일정 이름을 누르면 상세 내용을 볼 수 있습니다.";
        }
        list.appendChild(message);
        return;
    }
    heading.innerText = selected.title;
    appendCalendarDetail(list, "날짜", selected.date);
    appendCalendarDetail(list, "종류", selected.kind);
    appendCalendarDetail(list, "안내", selected.description);
}

function appendCalendarDetail(list, label, text) {
    const line = document.createElement("p");
    const strong = document.createElement("strong");
    const content = document.createElement("span");
    line.setAttribute("class", "calendar-detail-row");
    strong.innerText = label;
    content.innerText = text;
    line.appendChild(strong);
    line.appendChild(content);
    list.appendChild(line);
}

function showCalendarToday() {
    const today = new Date();

    calendarYear = today.getFullYear();
    calendarMonth = today.getMonth();

    selectCalendarDate(
        makeCalendarDateKey(
            calendarYear,
            calendarMonth,
            today.getDate()
        )
    );
}