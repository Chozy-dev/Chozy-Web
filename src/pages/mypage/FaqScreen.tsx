import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { FAQ_ITEMS } from "../../data/faq";
import { ManagementHeader } from "./MyPageComponents";

export default function FaqScreen() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-dvh bg-back pb-10 text-black1">
      <ManagementHeader title="자주 묻는 질문" />

      <div className="px-4 pt-4">
        <ul aria-label="자주 묻는 질문 목록" className="space-y-7 rounded-2xl bg-white p-5">
          {FAQ_ITEMS.map(({ id, question, answer }) => {
            const open = openId === id;
            const questionId = `faq-question-${id}`;
            const answerId = `faq-answer-${id}`;

            return (
              <li key={id}>
                <h2 className="text-sm leading-[17px] font-medium">
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setOpenId(open ? null : id)}
                    className="relative flex w-full items-center justify-between gap-3 text-left before:absolute before:-inset-y-3"
                  >
                    <span>{question}</span>
                    <ChevronRight
                      size={12}
                      strokeWidth={2.5}
                      className={`shrink-0 text-graytext1 transition-transform ${open ? "rotate-90" : ""}`}
                      aria-hidden
                    />
                  </button>
                </h2>
                <div id={answerId} role="region" aria-labelledby={questionId} hidden={!open}>
                  <p className="mt-3 text-xs leading-[18px] font-normal text-graytext1">{answer}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 text-center font-medium">
          <p className="text-sm leading-[17px]">찾으시는 답변이 없나요?</p>
          <Link
            to="/mypage/support"
            state={{ fromFaq: true }}
            className="mt-1.5 inline-block text-xs leading-[14px] text-graytext1 underline"
          >
            고객센터 문의하기
          </Link>
        </div>
      </div>

    </main>
  );
}
