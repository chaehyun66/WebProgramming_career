/* 공통 검색 */
function matchesSearchText(text, keyword) {
    text = normalizeSearchEnglish(text);
    keyword = normalizeSearchEnglish(keyword);
    
    if (keyword === "") {
        return true;
    }

    for (let start = 0; start <= text.length - keyword.length; start++) {
        let matched = true;

        for (let i = 0; i < keyword.length; i++) {
            if (text[start + i] !== keyword[i]) {
                matched = false;
                break;
            }
        }

        if (matched) {
            return true;
        }
    }

    return false;
}


let commonSearchItems = [];
let commonSearchReady = false;
let commonSearchFailed = false;
let commonSearchRequested = false;

window.addEventListener("load", initializeCommonSearch);

/* 상단 검색창 연결, 데이터 준비 */
function initializeCommonSearch() {
    const input = document.querySelector(
        ".site-header .search-box input"
    );

    const button = document.querySelector(
        ".site-header .search-box button"
    );

    const closeButton = document.getElementById(
        "common-search-close"
    );

    const panel = document.getElementById(
        "common-search-results"
    );

    if (
        input === null ||
        button === null ||
        closeButton === null ||
        panel === null
    ) {
        return;
    }

    button.addEventListener("click", runCommonSearch);

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            runCommonSearch();
        }
    });

    closeButton.addEventListener("click", function() {
        panel.style.display = "none";
        commonSearchRequested = false;
    });

    fetch("8_29SM_search.json")
        .then(function(response) {
            if (!response.ok) {
                return null;
            }

            return response.json();
        })
        .then(function (data) {
            if (data === null) {
                return null;
            }

            commonSearchItems = data.items;

            return fetch("8_29SM_recruit.json")
                .then(function (response) {
                    if (!response.ok) {
                        return null;
                    }

                    return response.json();
                });
        })
        .then(function (data) {
            if (data === null) {
                showCommonSearchLoadError();
                return;
            }

            for (let i=0; i < data.recruit.length; i++) {
                const notice = data.recruit[i];

                let link = "8_29SM_recruit.html";

                if (notice.link !== "#") {
                    link = notice.link;
                }

                commonSearchItems.push({
                    kind: "취업공고",
                    title: notice.title,
                    organization: notice.company,
                    keywords: notice.jobs.join(" "),
                    link: link
                });
            }

            commonSearchReady = true;

            if (commonSearchRequested) {
                runCommonSearch();
            }
        })
        .catch(function (error) {
            console.error(error);

            showCommonSearchLoadError();
        });
}


/* 데이터 준비 실패 상태 기록 */
function showCommonSearchLoadError() {
    commonSearchFailed = true;
    commonSearchReady = false;

    if (commonSearchRequested) {
        const message = document.getElementById("common-search-message");
        
        message.innerText = "검색 데이터를 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.";
    }
}


/* 상단 검색 실행 */
function runCommonSearch() {
    const input = document.querySelector(
        ".site-header .search-box input"
    );

    const panel = document.getElementById(
        "common-search-results"
    );

    const message = document.getElementById(
        "common-search-message"
    );

    const list = document.getElementById(
        "common-search-list"
    );

    const keyword = input.value;

    panel.style.display = "block";
    list.innerHTML = "";

    if (keyword === "") {
        commonSearchRequested = false;
        message.innerText = "검색어를 입력해주세요.";
        return;
    }

    commonSearchRequested = true;

    if (commonSearchFailed) {
        message.innerText = 
            "검색 데이터를 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.";
        return;
    }

    if (!commonSearchReady) {
        message.innerText = "검색 데이터를 불러오는 중입니다.";
        return;
    }

    const results = commonSearchItems.filter(
        function (item) {
            const searchText = 
                item.kind + " " +
                item.title + " " +
                item.organization + " " +
                item.keywords;

            return matchesSearchText(searchText, keyword);
        }
    );

    if (results.length === 0) {
        message.innerText =
            "'" + keyword + "'에 대한 검색 결과가 없습니다.";

        return;
    }

    message.innerText =
        "'" + keyword + "' 검색 결과 " + results.length + "건";

    for (let i = 0; i < results.length; i++) {
        list.appendChild(
            createCommonSearchItem(results[i])
        );
    }
}


/* 검색 결과 한 항목 만들기 */
function createCommonSearchItem(item) {
    const article = document.createElement("article");
    const kindText = document.createElement("p");
    const title = document.createElement("h3");
    const link = document.createElement("a");

    article.setAttribute("class", "common-search-item");
    kindText.setAttribute("class", "common-search-kind");

    kindText.innerText = item.kind;

    if (item.organization !== "") {
        kindText.innerText = 
            item.kind + " · " + item.organization;
    }

    link.setAttribute("href", item.link);
    link.innerText = item.title;

    title.appendChild(link);

    article.appendChild(kindText);
    article.appendChild(title);

    return article;
}

/* 영문 대문자를 소문자로 통일 */
function normalizeSearchEnglish(text) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";

    let result = "";

    for (let i = 0; i < text.length; i++) {
        let letter = text[i];

        for (let j = 0; j < uppercase.length; j++) {
            if (letter === uppercase[j]) {
                letter = lowercase[j];
                break;
            }
        }

        result = result + letter;
    }

    return result;
}