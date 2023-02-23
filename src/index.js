import "./styles.css";
import $ from "jquery";
// document.getElementById("app").innerHTML = ``;

$(function () {
  // Elements List
  var ballElement = $("#ball");
  var rod1Element = $("#rod1");
  var rod2Element = $("#rod2");
  var rodElement = $(".rod");
  // Doc Dimension Variables
  var docWidth = $(document).width();
  var docHeight = $(document).height() - 2;
  // Interval Variables
  var intervalId;
  var intervalTime = 10;
  // Location reset Variables
  var isStart = true;
  var halfPoint;
  if (docWidth % 2 === 0) {
    halfPoint = docWidth / 2;
  } else {
    halfPoint = (docWidth - 1) / 2;
  }
  // Current Score Variables
  var rod1Score = 0;
  var rod2Score = 0;
  // localStorage Variables Create
  var createLSV = () => {
    if (localStorage.getItem("mpMaxScore") === undefined) {
      localStorage.setItem("mpMaxScore", "0");
    }
    if (localStorage.getItem("mpMaxRod") === undefined) {
      localStorage.setItem("mpMaxRod", "0");
    }
  };
  var updateLSV = (wRod) => {
    let tempMaxScore = Number(localStorage.getItem("mpMaxScore"));
    let tempMaxRod = Number(localStorage.getItem("mpMaxRod"));
    if (wRod === 1) {
      rod1Score += 100;
      if (rod1Score > tempMaxScore) {
        tempMaxScore = rod1Score;
        localStorage.setItem("mpMaxScore", String(tempMaxScore));
        localStorage.setItem("mpMaxRod", String(wRod));
      } else if (rod1Score === tempMaxScore && wRod !== tempMaxRod) {
        localStorage.setItem("mpMaxRod", "0");
      }
      alert(
        `Rod ${wRod} wins with a score of ${rod1Score}. Max Score is ${tempMaxScore}`
      );
    } else {
      rod2Score += 100;
      if (rod2Score > tempMaxScore) {
        tempMaxScore = rod2Score;
        localStorage.setItem("mpMaxScore", String(tempMaxScore));
        localStorage.setItem("mpMaxRod", String(wRod));
      } else if (rod2Score === tempMaxScore && wRod !== tempMaxRod) {
        localStorage.setItem("mpMaxRod", "0");
      }
      alert(
        `Rod ${wRod} wins with a score of ${rod2Score}. Max Score is ${tempMaxScore}`
      );
    }
  };
  var startingAlert = () => {
    let tempMaxScore = Number(localStorage.getItem("mpMaxScore"));
    let tempMaxRod = Number(localStorage.getItem("mpMaxRod"));
    if (tempMaxScore === 0) {
      alert("This is your first time");
    } else {
      if (tempMaxRod === 1) {
        alert(`Rod 1 has the Max Score of ${tempMaxScore}`);
      } else if (tempMaxRod === 2) {
        alert(`Rod 2 has the Max Score of ${tempMaxScore}`);
      } else {
        alert(`Rod 1&2 are tied with the Max Score of ${tempMaxScore}`);
      }
    }
  };
  var resetLSV = () => {
    localStorage.setItem("mpMaxScore", "0");
    localStorage.setItem("mpMaxRod", "0");
  };

  var positionReset = (isRod1) => {
    rod1Element.css({
      "margin-left": `${halfPoint - 50}px`,
      "margin-top": `0px`
    });
    rod2Element.css({
      "margin-left": `${halfPoint - 50}px`,
      "margin-top": `${docHeight - 10}px`
    });
    ballElement.css("margin-left", `${halfPoint - 5}px`);
    if (isRod1) {
      ballElement.css("margin-top", "10px");
    } else {
      ballElement.css("margin-top", `${docHeight - 20}px`);
    }
    isStart = true;
  };
  var getRightOffset = (el) => {
    return docWidth - (el.offset().left + el.width());
  };
  var getDownOffset = (el) => {
    return docHeight - (el.offset().top + el.height());
  };
  var isContact = () => {
    return (
      rodElement.offset().left <= ballElement.offset().left &&
      rodElement.offset().left + 90 >= ballElement.offset().left
    );
  };

  var moveUpLeft = () => {
    if (ballElement.offset().left <= 0 && ballElement.offset().top <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownRight, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    } else if (ballElement.offset().left <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveUpRight, intervalTime);
      return;
    } else if (ballElement.offset().top <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownLeft, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left - 1}px`,
      "margin-top": `${ballElement.offset().top - 1}px`
    });
  };
  var moveUpRight = () => {
    if (getRightOffset(ballElement) <= 0 && ballElement.offset().top <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownLeft, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    } else if (getRightOffset(ballElement) <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveUpLeft, intervalTime);
      return;
    } else if (ballElement.offset().top <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveDownRight, intervalTime);
        return;
      } else {
        updateLSV(2);
        positionReset(true);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left + 1}px`,
      "margin-top": `${ballElement.offset().top - 1}px`
    });
  };
  var moveDownLeft = () => {
    if (ballElement.offset().left <= 0 && getDownOffset(ballElement) <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpRight, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    } else if (ballElement.offset().left <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveDownRight, intervalTime);
      return;
    } else if (getDownOffset(ballElement) <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpLeft, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left - 1}px`,
      "margin-top": `${ballElement.offset().top + 1}px`
    });
  };
  var moveDownRight = () => {
    if (getRightOffset(ballElement) <= 0 && getDownOffset(ballElement) <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpLeft, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    } else if (getRightOffset(ballElement) <= 0) {
      clearInterval(intervalId);
      intervalId = setInterval(moveDownLeft, intervalTime);
      return;
    } else if (getDownOffset(ballElement) <= 10) {
      clearInterval(intervalId);
      if (isContact()) {
        intervalId = setInterval(moveUpRight, intervalTime);
        return;
      } else {
        updateLSV(1);
        positionReset(false);
      }
    }
    ballElement.css({
      "margin-left": `${ballElement.offset().left + 1}px`,
      "margin-top": `${ballElement.offset().top + 1}px`
    });
  };
  // Initial Set Position
  positionReset(true);
  createLSV();
  startingAlert();
  $(document).on("keypress", function (e) {
    if (e.which === 114) {
      clearInterval(intervalId);
      positionReset(true);
      resetLSV();
    }
    if (isStart) {
      if (e.which === 13) {
        isStart = false;
        intervalId = setInterval(moveUpLeft, intervalTime);
      }
    } else {
      if (e.which === 100) {
        if (getRightOffset(rodElement) <= 10) {
          rodElement.css("margin-left", `${docWidth - 100}px`);
        } else {
          rodElement.css("margin-left", `${rodElement.offset().left + 10}px`);
        }
      } else if (e.which === 97) {
        if (rodElement.offset().left <= 10) {
          rodElement.css("margin-left", `0px`);
        } else {
          rodElement.css("margin-left", `${rodElement.offset().left - 10}px`);
        }
      }
    }
  });
});
