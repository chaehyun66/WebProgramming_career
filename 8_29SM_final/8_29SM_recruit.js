let allRecruitNotices = [];
let filteredRecruitNotices = [];

let recruitCurrentPage = 1;
const recruitPageSize = 10;

let recruitHeartHTML = "";

window.addEventListener("load", initializeRecruit);

function initializeRecruit() {
    const message = document.getElementById("recruit-message");
    const resetButton = document.getElementById("recruit-reset");

    recruitHeartHTML = document.querySelector(
        "#recruit-heart-template"
    ).innerHTML;

    message.innerText = "공고를 불러오는 중입니다.";
    
    fetch("8_29SM_recruit.json")
        .then(function (response) {
            if (!response.ok) {
                message.innerText =
                "공고 데이터를 불러오지 못했습니다. 파일과 실행 주소를 확인해주세요.";

                return null;
            }

            return response.json();
        })
        .then(function (data) {
            if (data === null) {
                return;
            }

            allRecruitNotices = data.recruit;
            allRecruitNotices.forEach(notice => {
                notice.status = Favorites.daysLeft(notice.deadline) < 0 ? "마감" : "진행 중";
            });

            const groups = document.querySelectorAll(".filter-group");
            
            for (let i = 0; i < groups.length; i++) {
                const inputs = groups[i].querySelectorAll("input");

                for (let j = 0; j < inputs.length; j++) {
                    inputs[j].addEventListener(
                        "change",
                        applyRecruitFilters
                    );
                }
            }

            resetButton.addEventListener(
                "click",
                resetRecruitFilters
            );

            const searchInput = document.getElementById("recruit-search");
            const searchButton = document.querySelector(".filter-search-box button");

            searchButton.addEventListener("click", applyRecruitFilters);

            searchInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();

                    applyRecruitFilters();
                }
            });

            applyRecruitFilters();

            resetButton.disabled = false;
        })
        .catch(function (error) {
            message.innerText = 
                "공고 데이터를 처리하지 못했습니다. 파일과 실행 주소를 확인해주세요.";

            console.error(error);
        });
}

function createRecruitRow(notice, heartHTML) {
    const row = document.createElement("tr");

    row.setAttribute("id", notice.id);

    if (notice.status === "마감") {
        row.setAttribute("class", "recruit-closed-row");
    }

    const companyCell = document.createElement("td");
    const companyBox = document.createElement("div");
    const companyImage = document.createElement("img");
    const companyName = document.createElement("span");

    companyBox.setAttribute("class", "company-cell");

    companyImage.setAttribute(
        "src",
        notice.image.replace("8_images/", "8_images_recruit/")
    );
    companyImage.setAttribute("alt", notice.company + " 로고");

    companyName.innerText = notice.company;

    companyBox.appendChild(companyImage);
    companyBox.appendChild(companyName);
    companyCell.appendChild(companyBox);


    const noticeCell = document.createElement("td");
    const titleLink = document.createElement("a");
    const jobText = document.createElement("p");

    noticeCell.setAttribute("class", "notice-cell");

    titleLink.setAttribute("href", notice.link);
    titleLink.innerText = notice.title;

    jobText.innerText = notice.jobs.join(", ");

    noticeCell.appendChild(titleLink);
    noticeCell.appendChild(jobText);


    const typeCell = document.createElement("td");
    typeCell.innerText = notice.types.join(", ");

    const regionCell = document.createElement("td");
    regionCell.innerText = notice.regions.join(", ");

    const dateCell = document.createElement("td");
    dateCell.innerText = notice.deadline;

    {
        const statusText = document.createElement("span");

        statusText.setAttribute(
            "class",
            notice.status === "마감" ? "recruit-closed-label" : "recruit-open-label"
        );

        statusText.innerText = Favorites.dday(notice.deadline);

        dateCell.appendChild(statusText);
    }

    const heartCell = document.createElement("td");
    heartCell.setAttribute("class", "heart");
    heartCell.innerHTML = heartHTML;

    const heartInput = heartCell.querySelector("input");

    heartInput.setAttribute(
        "id",
        "favorite-" + notice.id
    );
    Favorites.bind(heartInput, notice.id);

    row.appendChild(companyCell);
    row.appendChild(noticeCell);
    row.appendChild(typeCell);
    row.appendChild(regionCell);
    row.appendChild(dateCell);
    row.appendChild(heartCell);

    return row;
    
}

function getRecruitSelections(groupIndex) {
    const groups = document.querySelectorAll(".filter-group");
    const inputs = groups[groupIndex].querySelectorAll("input");
    const selected = [];

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            selected.push(inputs[i].value);
        }
    }

    return selected;
}

function matchesRecruitGroup(noticeValues, selectedValues) {
    if (selectedValues.length === 0) {
        return true;
    }

    for (let i = 0; i < selectedValues.length; i++) {
        for (let j = 0; j < noticeValues.length; j++) {
            if (selectedValues[i] === noticeValues[j]) {
                return true;
            }
        }
    }

    return false;
}

function applyRecruitFilters() {
    const selectedTypes = getRecruitSelections(0);
    const selectedJobs = getRecruitSelections(1);
    const selectedRegions = getRecruitSelections(2);

    const keyword = document.getElementById("recruit-search").value;

    filteredRecruitNotices = allRecruitNotices.filter(
        function (notice) {

            const searchText =
                notice.company + " " +
                notice.title + " " +
                notice.jobs.join(" ");

            const keywordMatches = matchesSearchText(
                searchText,
                keyword
            );

            const typeMatches = matchesRecruitGroup(
                notice.types,
                selectedTypes
            );

            const jobMatches = matchesRecruitGroup(
                notice.jobs,
                selectedJobs
            );

            const regionMatches = matchesRecruitGroup(
                notice.regions,
                selectedRegions
            );

            return keywordMatches&& typeMatches && jobMatches && regionMatches;
        }
    );

    const ongoingNotices = filteredRecruitNotices.filter(
        function (notice) {
            return notice.status !== "마감";
        }
    );

    const closedNotices = filteredRecruitNotices.filter(
        function (notice) {
            return notice.status === "마감";
        }
    );

    filteredRecruitNotices = ongoingNotices.concat(
        closedNotices
    );

    recruitCurrentPage = 1;

    renderRecruitPage();
}

function resetRecruitFilters() {

    document.getElementById("recruit-search").value = "";

    const groups = document.querySelectorAll(".filter-group");

    for (let i = 0; i < groups.length; i++) {
        const inputs = groups[i].querySelectorAll("input");

        for (let j = 0; j < inputs.length; j++) {
            inputs[j].checked = false;
        }
    }

    applyRecruitFilters();
}

function renderRecruitPage() {
    const tableBody = document.querySelector(".notice-table tbody");
    const countText = document.querySelector(".list-heading p");
    const message = document.getElementById("recruit-message");

    const startIndex = 
        (recruitCurrentPage - 1) * recruitPageSize;

    const endIndex = startIndex + recruitPageSize;

    const pageNotices = filteredRecruitNotices.slice(
        startIndex,
        endIndex
    );

    const rows = [];

    for (let i = 0; i < pageNotices.length; i++) {
        rows.push(
            createRecruitRow(pageNotices[i], recruitHeartHTML)
        );
    }

    tableBody.innerHTML = "";

    for (let i = 0; i < rows.length; i++) {
        tableBody.appendChild(rows[i]);
    }

    countText.innerText =
        "전체" + filteredRecruitNotices.length + "건";
    
    message.innerText = "";

    if (filteredRecruitNotices.length === 0) {
        const emptyRow = document.createElement("tr");
        const emptyCell = document.createElement("td");

        emptyCell.setAttribute("colspan", "6");
        emptyCell.setAttribute("class", "recruit-empty");

        emptyCell.innerText = "검색어와 선택한 조건에 맞는 공고가 없습니다.";

        emptyRow.appendChild(emptyCell);
        tableBody.appendChild(emptyRow);
    }

    renderRecruitPagination();

    /* 찜하기 연결 */
}


function renderRecruitPagination() {
    const pagination = document.querySelector(".pagination");

    pagination.innerHTML = "";

    if (filteredRecruitNotices.length === 0) {
        return;
    }

    const totalPages = Math.ceil(
        filteredRecruitNotices.length / recruitPageSize
    );

    pagination.appendChild(
        createRecruitPageLink(
            "<",
            recruitCurrentPage - 1,
            totalPages,
            "page-prev"
        )
    );

    for (let page = 1; page <= totalPages; page++) {
        let className = "";

        if (page === recruitCurrentPage) {
            className = "current-page";
        }

        pagination.appendChild(
            createRecruitPageLink(
                page,
                page,
                totalPages,
                className
            )
        );
    }

    pagination.appendChild(
        createRecruitPageLink(
            ">",
            recruitCurrentPage + 1,
            totalPages,
            "page-next"
        )
    );
}

function createRecruitPageLink(
    text,
    pageNumber,
    totalPages,
    className
) {
    let element;

    if (
        pageNumber < 1 ||
        pageNumber > totalPages ||
        pageNumber === recruitCurrentPage
    ) {
        element = document.createElement("span");
    } else {
        element = document.createElement("a");
        element.setAttribute("href", "#");

        element.addEventListener("click", function (event) {
            event.preventDefault();

            recruitCurrentPage = pageNumber;

            renderRecruitPage();
        });
    }

    element.innerText = text;

    if (className !== "") {
        element.setAttribute("class", className);
    }

    return element;
}
