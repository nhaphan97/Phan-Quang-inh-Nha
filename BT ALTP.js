const listQuestion = [
    {
      question: "Thủ đô của Việt Nam là gì?",
      answers: ["A. Hà Nội", "B. TP. Hồ Chí Minh", "C. Đà Nẵng", "D. Hải Phòng"],
      correctAnswer: "A. Hà Nội",
    },
    {
      question: "Ngọn núi cao nhất thế giới là gì?",
      answers: [
        "A. Núi Everest",
        "B. Núi Phú Sĩ",
        "C. Núi Kilimanjaro",
        "D. Núi Elbrus",
      ],
      correctAnswer: "A. Núi Everest",
    },
    {
      question: "Tác giả của tác phẩm 'Truyện Kiều' là ai?",
      answers: [
        "A. Nguyễn Du",
        "B. Nguyễn Trãi",
        "C. Hồ Xuân Hương",
        "D. Phan Bội Châu",
      ],
      correctAnswer: "A. Nguyễn Du",
    },
    {
      question: "Hành tinh nào gần Mặt Trời nhất?",
      answers: ["A. Sao Thủy", "B. Sao Kim", "C. Sao Hỏa", "D. Sao Mộc"],
      correctAnswer: "A. Sao Thủy",
    },
    {
      question: "Châu lục nào có diện tích lớn nhất?",
      answers: ["A. Châu Á", "B. Châu Âu", "C. Châu Phi", "D. Châu Mỹ"],
      correctAnswer: "A. Châu Á",
    },
    {
      question: "Ai là người sáng lập ra Phật giáo?",
      answers: [
        "A. Thích Ca Mâu Ni",
        "B. Khổng Tử",
        "C. Lão Tử",
        "D. Chúa Giê-su",
      ],
      correctAnswer: "A. Thích Ca Mâu Ni",
    },
    {
      question: "Nước nào có dân số đông nhất thế giới?",
      answers: ["A. Trung Quốc", "B. Ấn Độ", "C. Hoa Kỳ", "D. Indonesia"],
      correctAnswer: "A. Trung Quốc",
    },
    {
      question:
        "Thành phố nào được mệnh danh là 'Thành phố ngàn hoa' ở Việt Nam?",
      answers: ["A. Đà Lạt", "B. Hội An", "C. Huế", "D. Nha Trang"],
      correctAnswer: "A. Đà Lạt",
    },
    {
      question:
        "Loại trái cây nào được coi là vua của các loại trái cây ở Đông Nam Á?",
      answers: ["A. Sầu riêng", "B. Măng cụt", "C. Chuối", "D. Xoài"],
      correctAnswer: "A. Sầu riêng",
    },
    {
      question: "Nhà bác học nào đã phát minh ra bóng đèn điện?",
      answers: [
        "A. Thomas Edison",
        "B. Nikola Tesla",
        "C. Alexander Graham Bell",
        "D. Albert Einstein",
      ],
      correctAnswer: "A. Thomas Edison",
    },
  ];
  
  const quizContainer = document.getElementById("quiz-container");
  let currentQuestionIndex = 0;
  let skipUsed = false;
  let hideUsed = false;
  
  function skipQuestion() {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
    document.querySelector(".questions.active").classList.remove("active");
    document
      .querySelectorAll(".questions")
      [currentQuestionIndex].classList.add("active");
    document.querySelector("#skip-question").style.display = "none";
  }
  function hideWrongAnswers() {
    const currentQuestion = listQuestion[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const answers = currentQuestion.answers;
    const wrongAnswers = answers.filter((answer) => answer !== correctAnswer);
  
    let countHidden = 0;
    const activeAnswers = document.querySelectorAll(
      ".questions.active .item-answers"
    );
    activeAnswers.forEach((item) => {
      if (!item.innerText.includes(correctAnswer) && countHidden < 2) {
        item.style.display = "none";
        countHidden++;
      }
    });
    document.querySelector("#hide-wrong-answers").style.display = "none";
  }
  
  function renderQuestion(index) {
    const q = listQuestion[index];
    const questionDiv = document.createElement("div");
    questionDiv.className = "questions";
  
    if (index === 0) {
      questionDiv.classList.add("active");
    }
  
    const titleQuestionDiv = document.createElement("div");
    titleQuestionDiv.className = "title-question";
  
    const line1 = document.createElement("div");
    line1.className = "line";
    line1.innerText = `Question ${index + 1}:`;
  
    const line2 = document.createElement("div");
    line2.className = "line";
    line2.innerText = q.question;
  
    titleQuestionDiv.appendChild(line1);
    titleQuestionDiv.appendChild(line2);
  
    const answersGroupDiv = document.createElement("div");
    answersGroupDiv.className = "answers-group";
  
    q.answers.map((answer) => {
      const answerDiv = document.createElement("div");
      answerDiv.className = "item-answers";
      answerDiv.innerText = answer;
      answerDiv.onclick = () => {
        document.querySelectorAll(".item-answers").forEach((item) => {
          item.classList.remove("selected");
        });
        answerDiv.classList.add("selected");
      };
      answersGroupDiv.appendChild(answerDiv);
    });
  
    const buttonCheckDiv = document.createElement("div");
    buttonCheckDiv.className = "button-check";
    buttonCheckDiv.innerText = "Check";
    buttonCheckDiv.onclick = () => {
      const selectedAnswer = document.querySelector(".item-answers.selected");
      if (selectedAnswer) {
        if (selectedAnswer.innerText === q.correctAnswer) {
          alert("Trả lời đúng");
          if (currentQuestionIndex < listQuestion.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
            document
              .querySelector(".questions.active")
              .classList.remove("active");
            document
              .querySelectorAll(".questions")
              [currentQuestionIndex].classList.add("active");
          } else {
            endGame(true);
          }
        } else {
          endGame(false);
        }
      } else {
        alert("Xin hãy chọn một câu trả lời!.");
      }
    };
  
    questionDiv.appendChild(titleQuestionDiv);
    questionDiv.appendChild(answersGroupDiv);
    questionDiv.appendChild(buttonCheckDiv);
    quizContainer.appendChild(questionDiv);
  }
  
  function isValidName(name) {
    return /^[a-zA-Z]{5,10}$/.test(name);
  }
  function startGame() {
    playerName = prompt(
      "Nhập tên của bạn (từ 5 đến 10 ký tự, không có số hoặc ký tự đặc biệt):"
    );
    if (playerName === null) {
      alert("Bạn đã hủy bỏ trò chơi.");
      return;
    }
    if (isValidName(playerName)) {
      alert(`Chào mừng ${playerName} đến với trò chơi!`);
      renderQuestion(currentQuestionIndex);
    } else {
      alert("Tên không hợp lệ. Vui lòng nhập lại.");
      startGame();
    }
  }
  function endGame(isCompleted) {
    if (isCompleted) {
      alert("Chúc mừng bạn là người chiến thắng!");
    } else {
      alert("Bạn thua rồi!");
    }
    location.reload();
  }
  
  startGame();