import { BrowserRouter, Route, Routes } from "react-router";
import AppShell from "./layouts/AppShell";
import TabLayout from "./layouts/TabLayout";
import HomeScreen from "./pages/home/HomeScreen";
import InterestScreen from "./pages/interest/InterestScreen";
import NotificationsView from "./pages/notifications/NotificationsView";
import LoginScreen from "./pages/auth/LoginScreen";
import TermsAgreementScreen from "./pages/auth/TermsAgreementScreen";
import VerifyMethodScreen from "./pages/auth/VerifyMethodScreen";
import PhoneVerifyScreen from "./pages/auth/PhoneVerifyScreen";
import EmailVerifyScreen from "./pages/auth/EmailVerifyScreen";
import AccountFormScreen from "./pages/auth/AccountFormScreen";
import NicknameScreen from "./pages/auth/NicknameScreen";
import SignupCompleteScreen from "./pages/auth/SignupCompleteScreen";
import MyPageScreen from "./pages/mypage/MyPageScreen";
import MyPageDetails from "./pages/mypage/MyPageDetails";
import AlertSettingsScreen from "./pages/mypage/AlertSettingsScreen";
import AccountManagementScreen from "./pages/mypage/AccountManagementScreen";
import SubscriptionManagementScreen from "./pages/mypage/SubscriptionManagementScreen";
import Placeholder from "./pages/Placeholder";
import RequireSignIn from "./auth/RequireSignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          {/* 하단 탭이 있는 화면 */}
          <Route element={<TabLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<Placeholder label="검색" />} />
            <Route element={<RequireSignIn />}>
              <Route path="/wishlist" element={<InterestScreen />} />
              <Route path="/mypage" element={<MyPageScreen />} />
              <Route path="/mypage/subscription" element={<SubscriptionManagementScreen />} />
            </Route>
          </Route>

          {/* 탭 없이 전체 화면으로 뜨는 화면 */}
          <Route path="/notifications" element={<NotificationsView />} />
          <Route element={<RequireSignIn />}>
            <Route path="/mypage/account" element={<AccountManagementScreen />} />
            <Route path="/mypage/alerts" element={<AlertSettingsScreen />} />
            <Route path="/mypage/terms" element={<MyPageDetails view="service" />} />
            <Route path="/mypage/privacy" element={<MyPageDetails view="privacy" />} />
          </Route>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<TermsAgreementScreen />} />
          <Route path="/signup/method" element={<VerifyMethodScreen />} />
          <Route path="/signup/verify/phone" element={<PhoneVerifyScreen />} />
          <Route path="/signup/form" element={<AccountFormScreen />} />
          <Route path="/signup/profile" element={<NicknameScreen />} />
          <Route path="/signup/complete" element={<SignupCompleteScreen />} />
          <Route path="/signup/verify/email" element={<EmailVerifyScreen />} />

          <Route path="*" element={<Placeholder label="찾을 수 없는" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
