import { useEffect } from "react";
import { useNavigate } from "react-router";
import { TERMS, type TermsKey } from "../../data/terms";
import TermsDetail from "../auth/TermsDetail";

export default function MyPageDetails({ view }: { view: TermsKey }) {
  const navigate = useNavigate();
  const terms = TERMS.find(({ key }) => key === view);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return terms ? <TermsDetail terms={terms} onBack={() => navigate("/mypage")} /> : null;
}
