var yearlen = 365.24;
var dayinms = 86400000; // No. seconds in a day = 24h*60m*60s = 86400s = 86400000ms

// Utility functions

function calcExpectedDeathDate(birthday, expectancyNow) {
  var result = new Date(birthday);
  result.setDate(result.getDate() + expectancyNow * yearlen);
  return result;
}

function calcLifeFraction(birthday, deathday) {
  var birthTime = birthday.getTime();
  var deathTime = deathday.getTime();
  return (new Date().getTime() - birthTime) / (deathTime - birthTime);
}

function calcLifeDays(birthday) {
  var birthTime = birthday.getTime();
  var now = Date.now();
  var timezoneOffset = birthday.getTimezoneOffset() * 60 * 1000; // Timezone offset in ms
  var timediff = now - birthTime - timezoneOffset;
  return timediff / dayinms;
}

function calcDaysLeft(deathday) {
  var now = Date.now();
  var timezoneOffset = deathday.getTimezoneOffset() * 60 * 1000; // Timezone offset in ms
  var timediff = deathday.getTime() - now - timezoneOffset;
  return timediff / dayinms;
}

function supportsLocalStorage() {
  return typeof Storage !== "undefined";
}

// Rendering

function renderNoOutput() {
  $("#predictions").text("");
}

function renderOutput1(lifeDays, deathday, daysLeft, lifePercentage) {
  var rand =
    Math.random() * 100;
    if(rand >= 99){
      var textHtml3 = "上上上吉！隐藏机制被你发现！流星极光争相为钱钱出场表演的程度！";
    }
    else if(rand < 99 && rand >= 60){
      var textHtml3 = "上上吉！今天会非常幸运！钱钱的生活工作都顺风顺水就像开挂！";
    }
    else if(rand < 60 && rand >= 20){
      var textHtml3 = "上吉！会有很多小小惊喜等着钱钱！";
    }
    else if(rand < 20 && rand >= 5){
      var textHtml3 = "中吉！虽然平凡充实，但是是积极向上无忧无虑的一天！";
    }
    else{
      var textHtml3 = "下吉！多多留意生活，操子桐和neinei会在钱钱身边！"
    }
  var textHtml1 =
    "这个日期距此刻<h2>" +
    lifeDays.toFixed(5) +
    " 天</h2>" + textHtml3;
  $("#predictions").html(textHtml1);
}

function renderOutput2() {
  var textHtml2 =
    "这个数字...";
  $("#predictions").append(textHtml2);
}

function renderOutput3() {
  var rand =
    Math.random() * 100;
    if(rand >= 99){
      var textHtml3 = "上上上吉！隐藏机制被你发现！流星极光争相为钱钱出场表演的程度！";
    }
    else if(rand < 99 && rand >= 60){
      var textHtml3 = "上上吉！今天会非常幸运！钱钱的生活工作都顺风顺水就像开挂！";
    }
    else if(rand < 60 && rand >= 20){
      var textHtml3 = "上吉！会有很多小小惊喜等着钱钱！";
    }
    else if(rand < 20 && rand >= 5){
      var textHtml3 = "中吉！虽然平凡充实，但是是积极向上无忧无虑的一天！";
    }
    else{
      var textHtml3 = "下吉！多多留意生活，操子桐和neinei会在钱钱身边！"
    }
  $("#predictions").append(textHtml3);
}

function calculateAndRender() {
  // Obtain input
  var birthdayStr = $("#birthdayInput").val();
  var expectancyNow = $("#lifeExpectancyInput").val();
  var birthday = birthdayStr ? new Date(birthdayStr) : null;

  // Save input
  if (supportsLocalStorage()) {
    localStorage.setItem("birthdayStr", birthdayStr);
    localStorage.setItem("expectancyNow", expectancyNow);
  }

  // Abort if input is bad
  if (!birthday || !expectancyNow || expectancyNow <= 0) {
    renderNoOutput();
    return;
  }

  // Calculate
  var deathday = calcExpectedDeathDate(birthday, expectancyNow);
  var lifePercentage = calcLifeFraction(birthday, deathday) * 100;
  var lifeDays = calcLifeDays(birthday);
  var daysLeft = calcDaysLeft(deathday);

  // Abort if output is bad
  if (!deathday || !lifePercentage || !lifeDays || !daysLeft) {
    renderNoOutput();
    return;
  }

  // Display
  renderOutput1(lifeDays, deathday, daysLeft, lifePercentage);
  renderOutput2();
}

// Initializers and watchers

if (supportsLocalStorage()) {
  $("#birthdayInput").val(localStorage.getItem("birthdayStr"));
  $("#lifeExpectancyInput").val(localStorage.getItem("expectancyNow"));
}

calculateAndRender(); // Initial render for when data was stored

$("#birthdayInput").on("input", calculateAndRender);
$("#lifeExpectancyInput").on("input", calculateAndRender);
setInterval(calculateAndRender, dayinms); // Every 0.00001 day in ms
