import { useState } from "react";
import "./TodayAiTerm.css";

// AI 용어 데이터 타입 정의
interface AITerm {
  term: string;
  emoji: string;
  visualEmoji: string;
  keywords: string[];
  description: string;
  detailedExplanation: string;
}

// 샘플 AI 용어 데이터
const aiTerms: { today: AITerm } = {
  today: {
    term: "Transformer",
    emoji: "🤖",
    visualEmoji: "🎨",
    keywords: [
      "자연어처리",
      "어텐션",
      "BERT",
      "GPT",
      "인코더-디코더",
      "셀프어텐션",
    ],
    description:
      "Transformer는 2017년 'Attention is All You Need' 논문에서 소개된 혁신적인 딥러닝 아키텍처입니다.",
    detailedExplanation: `
      <h3 style="margin-bottom: 15px; color: #667eea;">🔍 핵심 개념</h3>
      <p style="margin-bottom: 15px;">Transformer는 순환 신경망(RNN)이나 합성곱 신경망(CNN) 없이 순전히 어텐션 메커니즘만을 사용하여 시퀀스 데이터를 처리합니다.</p>
      
      <h3 style="margin-bottom: 15px; color: #667eea;">⚙️ 주요 구성 요소</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 10px;">✅ <strong>Multi-Head Attention</strong>: 여러 관점에서 정보를 병렬 처리</li>
        <li style="margin-bottom: 10px;">✅ <strong>Positional Encoding</strong>: 시퀀스 내 위치 정보 제공</li>
        <li style="margin-bottom: 10px;">✅ <strong>Feed-Forward Networks</strong>: 각 위치에서 독립적으로 적용</li>
      </ul>
      
      <h3 style="margin-bottom: 15px; color: #667eea;">🚀 활용 분야</h3>
      <p>BERT, GPT, T5 등 현재 대부분의 최신 언어 모델들이 Transformer 아키텍처를 기반으로 합니다. 번역, 요약, 질의응답, 텍스트 생성 등 다양한 NLP 작업에서 뛰어난 성능을 보입니다.</p>
    `,
  },
};

type ModalType =
  | "discover"
  | "visual"
  | "term"
  | "keywords"
  | "explanation"
  | "all"
  | null;

function TodayAiTerm() {
  //   const [activeView, setActiveView] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  //   const switchView = (viewNumber: number) => {
  //     setActiveView(viewNumber);
  //   };

  const showTermDetail = (type: ModalType) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  //   const viewPDF = () => {
  //     showTermDetail("all");
  //   };

  //   const downloadPDF = () => {
  //     alert(
  //       "📥 PDF 다운로드가 시작됩니다!\n\n실제 구현 시 PDF 생성 및 다운로드 기능이 추가됩니다."
  //     );
  //   };

  const getModalContent = () => {
    if (!modalType) return { title: "", icon: "🤖", content: "" };

    const term = aiTerms.today;
    let content = "";
    let title = "";
    let icon = term.emoji;

    switch (modalType) {
      case "discover":
      case "all":
        title = term.term;
        content = `
          <div class="term-image">${term.emoji}</div>
          <div class="term-keywords">
            ${term.keywords
              .map((k) => `<span class="keyword-tag">${k}</span>`)
              .join("")}
          </div>
          ${term.detailedExplanation}
        `;
        break;

      case "visual":
        title = "시각적 이해";
        icon = term.visualEmoji;
        content = `
          <div class="term-image" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
            ${term.emoji}
          </div>
          <p class="term-description">
            Transformer 아키텍처는 입력 시퀀스의 각 요소가 다른 모든 요소와 직접 상호작용할 수 있도록 합니다.
            이를 통해 장거리 의존성을 효과적으로 포착합니다.
          </p>
        `;
        break;

      case "term":
        title = `오늘의 용어: ${term.term}`;
        content = `
          <div class="term-image" style="font-size: 80px;">${term.emoji}</div>
          <h3 style="color: #667eea; margin-bottom: 10px;">${term.term}</h3>
          <p class="term-description">${term.description}</p>
        `;
        break;

      case "keywords":
        title = "핵심 키워드";
        icon = "🔑";
        content = `
          <div class="term-keywords" style="margin-top: 0;">
            ${term.keywords
              .map(
                (k) =>
                  `<span class="keyword-tag" style="font-size: 15px; padding: 10px 16px;">${k}</span>`
              )
              .join("")}
          </div>
          <p class="term-description" style="margin-top: 20px;">
            이러한 키워드들은 Transformer를 이해하는 데 필수적인 개념들입니다.
            각 키워드는 서로 연결되어 전체 아키텍처를 구성합니다.
          </p>
        `;
        break;

      case "explanation":
        title = "상세 설명";
        icon = "📖";
        content = term.detailedExplanation;
        break;
    }

    return { title, icon, content };
  };

  const modalData = getModalContent();

  return (
    <>
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-orb orb1"></div>
        <div className="floating-orb orb2"></div>
        <div className="floating-orb orb3"></div>
      </div>

      <div className="container">
        {/* Header */}
        <header className="app-header">
          <div className="app-title">AI Daily Terms</div>
          <div className="app-subtitle">오늘의 AI 용어</div>
        </header>

        {/* Navigation */}
        {/* <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeView === 1 ? "active" : ""}`}
            onClick={() => switchView(1)}
          >
            ✨ Discover
          </button>
          <button
            className={`nav-tab ${activeView === 2 ? "active" : ""}`}
            onClick={() => switchView(2)}
          >
            📚 Learn
          </button>
          <button
            className={`nav-tab ${activeView === 3 ? "active" : ""}`}
            onClick={() => switchView(3)}
          >
            📄 Docs
          </button>
        </nav> */}

        {/* View 1 - Interactive Discovery */}
        {/* <div id="view1" className={`card ${activeView === 1 ? "active" : ""}`}> */}
        <div id="view1" className={`card active`}>
          <div className="view1-content">
            <h1 className="card-title">오늘의 AI 용어</h1>
            <div
              className="interactive-circle"
              onClick={() => showTermDetail("discover")}
            >
              <div className="circle-content">
                <div className="circle-icon">🧠</div>
                <div className="circle-text">
                  터치해서
                  <br />
                  발견하기
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View 2 - Learning Cards */}
        {/* <div id="view2" className={`card ${activeView === 2 ? "active" : ""}`}>
          <h1 className="card-title">학습하기</h1>
          <div className="view2-content">
            <div
              className="feature-card"
              onClick={() => showTermDetail("visual")}
            >
              <div className="feature-icon">🎨</div>
              <div className="feature-text">
                <div className="feature-title">시각적 이해</div>
                <div className="feature-desc">
                  이미지와 다이어그램으로 쉽게 이해
                </div>
              </div>
            </div>

            <div
              className="feature-card"
              onClick={() => showTermDetail("term")}
            >
              <div className="feature-icon">💡</div>
              <div className="feature-text">
                <div className="feature-title">핵심 용어</div>
                <div className="feature-desc">오늘의 AI 용어와 정의</div>
              </div>
            </div>

            <div
              className="feature-card"
              onClick={() => showTermDetail("keywords")}
            >
              <div className="feature-icon">🔑</div>
              <div className="feature-text">
                <div className="feature-title">키워드 탐색</div>
                <div className="feature-desc">관련 핵심 키워드와 개념</div>
              </div>
            </div>

            <div
              className="feature-card"
              onClick={() => showTermDetail("explanation")}
            >
              <div className="feature-icon">📖</div>
              <div className="feature-text">
                <div className="feature-title">상세 설명</div>
                <div className="feature-desc">깊이 있는 이해를 위한 설명</div>
              </div>
            </div>

            <button
              className="explore-btn"
              onClick={() => showTermDetail("all")}
            >
              🚀 전체 내용 탐색하기
            </button>
          </div>
        </div> */}

        {/* View 3 - PDF Documentation */}
        {/* <div id="view3" className={`card ${activeView === 3 ? "active" : ""}`}>
          <h1 className="card-title">문서 보기</h1>
          <div className="view3-content">
            <div className="pdf-container">
              <div className="pdf-icon">📑</div>
              <div className="pdf-title">PDF 문서</div>
              <div className="pdf-subtitle">상세 학습 자료</div>
              <div className="pdf-actions">
                <button className="pdf-btn" onClick={viewPDF}>
                  미리보기
                </button>
                <button className="pdf-btn primary" onClick={downloadPDF}>
                  다운로드
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className={`modal ${modalOpen ? "active" : ""}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                <span>{modalData.icon}</span>
                <span>{modalData.title}</span>
              </h2>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div
              className="modal-body"
              dangerouslySetInnerHTML={{ __html: modalData.content }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TodayAiTerm;
